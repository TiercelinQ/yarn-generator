# CLI surface rules - yarn

> **Applies only to the CLI use case** (entry point `src/cli.ts`, fixed in Phase 1). For a library, service, extension or application, this file is not loaded.
> The command-line surface of the generated tool: the `commander` program in `cli.ts`, the thin-command pattern, the flag conventions, the exit-code contract, and the stdout/stderr discipline that makes the tool safe to pipe and to schedule (cron, Windows Task Scheduler). Error escalation and the `Result<T>` contract: `@rules/errors.md`. Layering: `@rules/architecture.md`.
> Examples use a neutral `project list` / `config show` surface. Salesforce variants (`org list`, `data query`, `--target-org`, `sf` helpers) are flagged "when Salesforce is confirmed" and apply only when Salesforce coupling is confirmed in Phase 1.

## The program - `src/cli.ts`

`cli.ts` is the **only** composition root. It pre-parses the global flags, builds one `commander` `program`, registers each command group, installs the global error handlers, and owns the exit-code mapping. It is the **only** place `process.exit` is called.

- Parser default: **`commander`**. `node:util parseArgs` is the fallback only for a 1-2 script project (Phase 1) - no third-party parser otherwise.
- `program.name(...)`, `.description(...)`, `.version(...)` set the identity; `--help` and `--version` are **auto-provided** by commander (do not hand-roll them).
- Subcommands are grouped: `program.command("<group>")` returns a group command, on which each `commands/<group>.ts` registers its own `.command("<verb>")`. So the surface reads `mytool project list`, `mytool config show`. (When Salesforce is confirmed: `mytool org list`, `mytool data query ...`.)
- `.exitOverride()` hands control back to the boundary instead of letting commander call `process.exit` itself - the boundary maps usage errors to exit `2` and help/version to `0`.
- **Global flags need a pre-parse.** In commander, `program.opts()` is empty until `parseAsync`, so `resolveConfig(...)` cannot read the flags from the real program before parsing. `withGlobalOptions(cmd)` declares the global options **once**; a throwaway `new Command().allowUnknownOption().allowExcessArguments().helpOption(false).exitOverride()` is passed through it and `.parse(process.argv).opts()` yields the flags. Then `resolveConfig(flags)`, `configureLogger`, `configureProgress`; then the real program is built with the same `withGlobalOptions` (so `--help` lists the flags), the services are constructed with the resolved config, the commands registered, and `parseAsync` runs. Never write `resolveConfig(program.opts())` before parsing.
- After `resolveConfig()` (and `configureLogger`), `cli.ts` decides progress activation and calls `configureProgress({ enabled })` - auto-on when `stderr` is a TTY, off under `--no-progress` / `CI` / debug logging - and raises the `pino` level to `warn` while it is active so log lines do not garble the animation (`@rules/progress.md`).

```ts
// src/cli.ts - pre-parse of the global flags + bootstrap + composition (services -> command groups) + global error handler + exit-code mapping.
import { Command, CommanderError, Option } from "commander";
import { log, configureLogger, debugEnabled } from "./logger";
import { configureProgress } from "./progress";
import { APP_NAME, APP_VERSION, LOG_LEVELS, resolveConfig } from "./config";
import type { CliFlags } from "./config";
import { ValidationError } from "./errors";
import { ProjectService } from "./services/project.service";
import { ConfigService } from "./services/config.service";
import { registerProjectCommands } from "./commands/project";
import { registerConfigCommands } from "./commands/config";

/** The single mapping point for a *thrown* failure: usage/validation → 2, everything else → 1. */
export function toExitCode(err: unknown): 1 | 2 {
  if (err instanceof ValidationError) return 2;   // bad flags / invalid input
  if (err instanceof CommanderError) return 2;    // unknown option, missing argument (usage)
  return 1;                                       // runtime failure (IO, unexpected)
}

process.on("uncaughtException", (err) => { log.error({ err }, "uncaughtException"); process.exit(1); });
process.on("unhandledRejection", (reason) => { log.error({ err: reason }, "unhandledRejection"); process.exit(1); });

interface GlobalOpts extends CliFlags {
  /** False under `--no-progress`. */
  progress: boolean;
}

/** Declare the global flags ONCE, for the real program (help) and for the pre-parse. */
function withGlobalOptions(cmd: Command): Command {
  return cmd
    .option("--export-dir <dir>", "base directory for exports (EXPORT_DIR)")
    .addOption(new Option("--log-level <level>", "log level (LOG_LEVEL)").choices(LOG_LEVELS))
    .option("--no-progress", "disable the live progress display");
}

async function main(): Promise<void> {
  try {
    process.loadEnvFile();                          // non-secret .env; throws if absent (@rules/config.md)
  } catch {
    // no .env file: rely on the real environment and the defaults
  }

  // The services need the resolved config at construction, before commander parses the command line:
  // read the global flags with a throwaway parse of the same options (program.opts() is empty before parseAsync).
  const flags = withGlobalOptions(
    new Command().allowUnknownOption().allowExcessArguments().helpOption(false).exitOverride(),
  )
    .parse(process.argv)
    .opts<GlobalOpts>();
  const config = resolveConfig({ exportDir: flags.exportDir, logLevel: flags.logLevel }); // resolve once - @rules/config.md

  // Progress: auto-on on a stderr TTY, off under --no-progress / CI / debug logging (@rules/progress.md).
  const wantsDebug = debugEnabled() || config.logLevel === "debug" || config.logLevel === "trace";
  const progressEnabled = flags.progress && !!process.stderr.isTTY && !process.env.CI && !wantsDebug;
  configureLogger(progressEnabled ? "warn" : config.logLevel);   // keep log lines out of the animation
  configureProgress({ enabled: progressEnabled });

  const program = withGlobalOptions(new Command())
    .name(APP_NAME)
    .description("Command-line tool")
    .version(APP_VERSION, "-v, --version")
    .configureOutput({ writeErr: (s) => process.stderr.write(s) })  // usage errors → stderr, never stdout
    .exitOverride();                                                // do not let commander own the exit

  // composition: services → command groups (unidirectional - @rules/architecture.md)
  registerProjectCommands(program, { projectService: new ProjectService(config), exportDir: config.exportDir });
  registerConfigCommands(program, { configService: new ConfigService(config) });

  await program.parseAsync(process.argv);
}

try {
  await main();
} catch (err) {
  if (err instanceof CommanderError) process.exit(err.exitCode === 0 ? 0 : 2); // --help / --version → 0; commander already wrote its usage message
  if (err instanceof ValidationError) log.warn(err.message);                    // a user mistake: no stack trace
  else log.error({ err }, "command failed");
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(toExitCode(err));
}
```

The sample keeps two global flags; a project declares every global flag of its `CliFlags` (`@rules/config.md`) once in `withGlobalOptions`, and `--page-size`-style numeric flags are coerced before `resolveConfig`. `debugEnabled` is the `[TOOL]_DEBUG` helper of `@rules/logging.md`.

When Salesforce is confirmed, the composition chain gains the `sf/` layer (runner → helpers → services):

```ts
// Variant, when Salesforce is confirmed: add to the imports of cli.ts
import { SfRunner } from "./sf/runner";
import { SfHelpers } from "./sf/helpers";
import { OrgService } from "./services/org.service";
import { DataService } from "./services/data.service";
import { registerOrgCommands } from "./commands/org";
import { registerDataCommands } from "./commands/data";

// composition, inside main() after resolveConfig: runner → helpers → services → command groups (unidirectional - @rules/architecture.md)
const sf = new SfHelpers(new SfRunner());              // SfRunner default resolves SF_CLI_PATH || "sf" - @rules/sf-cli.md
registerOrgCommands(program, { orgService: new OrgService(sf), exportDir: config.exportDir });
registerDataCommands(program, { dataService: new DataService(sf), exportDir: config.exportDir });
```

## Thin-command pattern - `src/commands/<group>.ts`

A command is an **adapter**, not a place for logic. Each group file exports a `register<Group>Commands(program)` that declares its subcommands and delegates. The `.action`:

1. reads its flags (validate → raise `ValidationError` on bad input, `@rules/errors.md`),
2. calls **one** service (which owns the business rule and any external call),
3. on success hands the returned data to an `output/` formatter (data → stdout/file); on a failed `Result` writes the human message to **stderr** and sets the exit code.

No business logic, no direct external-process call (no `sf`/`cross-spawn` call from a command when Salesforce is confirmed), no `console.log`, no `process.exit`.

```ts
// src/commands/project.ts - thin adapter: parse/validate flags → call a service → format output. No business logic.
import type { Command } from "commander";
import { log } from "../logger";
import { ValidationError } from "../errors";
import { resolveWithin } from "../config";     // confine a user --output path under exportDir - @rules/security.md §3
import { formatOutput } from "../output";
import type { OutputFormat, OutputDestination, Row } from "../output";
import type { ProjectService } from "../services/project.service";

const FORMATS: readonly OutputFormat[] = ["table", "json"];      // only the shipped formatters (+ "csv", "xlsx" when selected in Phase 1) - @rules/output.md
function parseFormat(v: string): OutputFormat {                    // bad value → ValidationError → exit 2
  if ((FORMATS as readonly string[]).includes(v)) return v as OutputFormat;
  throw new ValidationError(`Unknown --format '${v}' (expected: ${FORMATS.join(" | ")}).`);
}

export function registerProjectCommands(program: Command, deps: { projectService: ProjectService; exportDir: string }): void {
  const project = program.command("project").description("Manage projects");

  project
    .command("list")
    .description("List projects")
    .option("-f, --format <format>", `output format: ${FORMATS.join(" | ")}`, "table")
    .option("-o, --output <file>", "write to a file instead of stdout")
    .action(async (opts: { format: string; output?: string }) => {
      const format = parseFormat(opts.format);
      // Usage errors are raised BEFORE any work (service call, file write): exit 2.
      // (When xlsx ships: if (format === "xlsx" && !opts.output) throw new ValidationError("xlsx requires a file destination (--output <file>).");)
      // Confine a user --output path under exportDir (no traversal / absolute escape) before any write - @rules/security.md §3.
      const destination: OutputDestination = opts.output
        ? { kind: "file", path: resolveWithin(deps.exportDir, opts.output) }
        : { kind: "stdout" };
      const result = await deps.projectService.listProjects();     // service owns the logic
      if (!result.ok) {
        if (result.error.kind === "error") {                       // "warning" is non-fatal → exit stays 0
          process.exitCode = 1;
          log.error({ detail: result.error.detail }, result.error.message);
        } else {
          log.warn({ detail: result.error.detail }, result.error.message);
        }
        process.stderr.write(`${result.error.message}\n`);         // human message → stderr, never stdout
        return;
      }
      // An empty dataset is SUCCESS: the formatter prints a valid empty document and the exit code stays 0 - @rules/output.md.
      const rows: Row[] = result.data.map((p) => ({ name: p.name, path: p.path, status: p.status ?? "" }));
      const written = await formatOutput(rows, { format, destination }); // data → stdout / file - @rules/output.md
      if (!written.ok) {                                           // e.g. a file write error (backstop guards included)
        process.exitCode = 1;
        log.error({ detail: written.error.detail }, written.error.message);
        process.stderr.write(`${written.error.message}\n`);
      }
    });
}
```

When Salesforce is confirmed, the same pattern applies to an `org` group (`program.command("org").description("Manage authenticated Salesforce orgs")`, `.command("list")` calling `deps.orgService.listOrgs()` and mapping each org to `{ alias, username, status }`). The service owns the `sf` call, never the command.

## Flags & arguments conventions

- **Long flags are kebab-case**: `--api-version`, `--output`, `--config-file`. Provide a short alias only for the frequent ones (`-o` for `--output`, `-f` for `--format`).
- **`--target-org`** (when Salesforce is confirmed) selects the org (matches the `sf` `-o, --target-org` convention); it is passed down to the service and on to the `sf` helper, never spliced into a command string (`@rules/security.md`). Other `sf`-specific flags (`--api-version`, ...) follow the same rule and are conditional on Salesforce being confirmed.
- **`--format <table|json|...>`** picks the `output/` formatter; the `choices` list **only the shipped formats** (`json` and `table` always, `csv` / `xlsx` only when selected in Phase 1), and an unknown value is a `ValidationError` → exit `2`; **`--output, -o <file>`** redirects the data to a file instead of stdout. The command maps them to `{ format, destination }` (no `--output` → `{ kind: "stdout" }`, `--output <path>` → `{ kind: "file"; path }`) and passes them to `formatOutput` (`@rules/output.md`). When `xlsx` ships, the command checks **before any work** that a file destination was given (`xlsx` is binary, never written to stdout) and raises a `ValidationError` otherwise (exit `2`); the writer keeps its own `Result` error guard as a backstop.
- **Prefer `--format json` over a raw `--json` passthrough.** Exposing a wrapped tool's own `--json` envelope (for example `sf`'s, when Salesforce is confirmed) leaks the CLI-version-specific shape to the user; the tool's own `--format json` emits the tool's stable DTO. Keep `--json` out of the public surface unless a command explicitly documents an escape hatch.
- **`--help` / `--version` are auto** (commander) - never re-implement them. `--version` reads `APP_VERSION` from `config.ts`.
- **`--no-progress`** (global, boolean) disables the live progress display; the display is otherwise auto-on when `stderr` is a TTY (and off under `CI` or debug logging). It is a runtime UI toggle, not part of the config cascade - see `@rules/progress.md`.
- Validate a flag's value in the command before calling the service; an out-of-range/unknown value is a `ValidationError` → exit `2`.

## Exit-code contract

Three codes, mapped at the boundary - never scattered as magic numbers across commands.

| Code | Meaning                    | Source                                                                 |
| ---- | -------------------------- | ---------------------------------------------------------------------- |
| `0`  | Success                    | a command completed; a dataset command (list, query, export) with an empty result is a success (valid empty output); also a `Result` failure of `kind: "warning"` (non-fatal, nothing was done, e.g. `clear` on an already empty store) |
| `1`  | Runtime error              | a `Result` failure of `kind: "error"`, an external-tool failure (an `sf` failure when Salesforce is confirmed), an unexpected throw, `uncaughtException`/`unhandledRejection` |
| `2`  | Usage / validation error   | `ValidationError` (bad flags/input) or a commander usage error (unknown option, missing argument) |

- **A *thrown* failure** (a `ValidationError`, a commander usage error, an unexpected error) is mapped by the single `toExitCode` helper in the `cli.ts` catch. Named-error → exit code is the one mapping point.
- **A returned `Result` failure** is handled by the command: `kind: "error"` → `process.exitCode = 1`; `kind: "warning"` → exit stays `0`. The command sets the code; it never calls `process.exit` (only `cli.ts` does, in the boundary and the global handlers).
- Set `process.exitCode` rather than `process.exit(n)` inside a command so stdout/stderr flush before the process ends.

## stdout = data · stderr = logs + messages

The discipline that makes the tool pipeable and scriptable:

- **`stdout` carries data only** - the `output/` formatter's bytes (JSON/table, plus CSV/xlsx when shipped), nothing else. `mytool project list --format json | jq ...` must see clean JSON with no log line mixed in.
- **`stderr` carries everything human**: `pino` log lines (file + `stderr`, `@rules/logging.md`) and the one-line human error/warning messages a command writes on a failed `Result`.
- A formatter writes to **stdout or the `--output` file**; it never writes to stderr. A log/message never goes to stdout.
- The **progress reporter** (`src/progress.ts`) is the sanctioned live-UI surface on **`stderr`** (`step` spinner, plus `bar` when an operation has a known total), TTY-gated and silent when piped/cron/CI - it never touches stdout, so a piped run stays clean. The reporter and `pino` are the only `stderr` writers (`@rules/progress.md`).
- Zero `console.log` in delivered code - data goes through `output/`, diagnostics through `log.*` (`@rules/logging.md`).

This separation is what makes the tool **cron- and Windows Task Scheduler-friendly**: a scheduled run redirects `stdout` to a data file and `stderr` to a log, and the exit code drives success/failure alerting - no interactive prompt, no banner on stdout.

## Non-interactive by default · `@clack/prompts` opt-in

- The tool is **non-interactive by default**: args in → run → exit. This is the contract for cron/CI. A command must be fully drivable by flags.
- Interactive prompts (`@clack/prompts`) are **opt-in per project** (Phase 1) and only for a genuinely interactive invocation. **Guard every prompt**: test `process.stdin.isTTY` **and** `process.stderr.isTTY` (never `process.stdout.isTTY`: stdout may be piped for data while the user is still at a terminal), and write the prompt to **stderr** so stdout stays data-only. Never prompt when a `--yes` / non-interactive flag is set. A non-TTY run without `--yes` refuses the destructive action with a `ValidationError` (exit `2`, message telling to re-run with `--yes`) rather than blocking.

```ts
// A prompt must never block a scheduled / piped run. Prompts go to stderr; stdout stays data-only.
import { confirm, isCancel } from "@clack/prompts";
import { ValidationError } from "../errors";

async function confirmDestructive(message: string, yes: boolean): Promise<boolean> {
  if (yes) return true;                                          // explicit consent → proceed
  if (!process.stdin.isTTY || !process.stderr.isTTY) {           // non-interactive (cron/pipe/CI) → safe default: refuse
    throw new ValidationError("Confirmation impossible hors terminal interactif : relancer avec --yes.");
  }
  const answer = await confirm({ message, output: process.stderr }); // prompt on stderr, never stdout
  return !isCancel(answer) && answer === true;
}
```

## Anti-patterns - what NOT to do

- **Do not** put business logic or an external-process call in a command (when Salesforce is confirmed: no `sf`/`cross-spawn` call) - parse, delegate to a service, format (`@rules/architecture.md`).
- **Do not** call `process.exit` outside `cli.ts` - a command sets `process.exitCode`; the boundary and the global handlers call `process.exit`.
- **Do not** hardcode an exit code as a magic number in a command - the thrown-error mapping is the single `toExitCode` helper; the `Result` mapping is the fixed `warning → 0 / error → 1` rule.
- **Do not** write data to stderr or a log/human message to stdout - stdout is data only, stderr is logs + messages.
- **Do not** `console.log` a dataset - route it through an `output/` formatter (`@rules/output.md`).
- **Do not** expose a wrapped tool's raw `--json` envelope as the public output (when Salesforce is confirmed: `sf`'s) - emit the tool's stable DTO via `--format json`.
- **Do not** prompt (`@clack/prompts`) when `stdin` or `stderr` is not a TTY or `--yes` is set - it would hang a cron/CI run. **Do not** test `process.stdout.isTTY` for this guard (stdout may be piped for data) and **do not** let a prompt write to stdout.
- **Do not** re-implement `--help` / `--version` - commander provides them.
- **Do not** let a raw exception or a stack trace reach stdout - the global handlers log it and exit `1` (`@rules/errors.md`).

## Integrity verification

Detailed in `@rules/verification.md`. Key points: `cli.ts` is the only composition root and the only place `process.exit` is called (commands set `process.exitCode`); exit codes mapped at the boundary only - `toExitCode` for thrown errors, the fixed `warning → 0 / error → 1` rule for `Result` failures, never a scattered magic number; `stdout` carries data only and `stderr` carries logs + human messages, zero `console.log`; commands stay thin adapters (validate flags → one service → `output/` formatter), no business logic and, when Salesforce is confirmed, no direct `sf` call; `--help`/`--version` auto-provided by commander, never re-implemented; prompts (if opted in) guarded on `stdin` + `stderr` TTY and `--yes`, written to stderr; an empty dataset is a success; the global flags are read by a pre-parse, never from `program.opts()` before `parseAsync`. Run silently; report only on a discrepancy.
