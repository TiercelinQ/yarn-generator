# Logging rules - yarn (pino)

> The logger depends on the use case (`@rules/use-cases.md`). The `pino` setup below is imposed for the **CLI** and **service** use cases. The other use cases follow the section "Logging per use case". The `Coexistence with the progress reporter` section applies to the CLI use case only.

## Logging per use case

| Use case    | Logger                                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| CLI tool    | `pino` (file + `stderr`), `src/logger.ts` as below. Mandatory.                                                                          |
| Service     | `pino`, `src/logger.ts` as below. Mandatory. `configureLogger()` is called once in `server.ts`. The service runs locally by default, so the file and `stderr` sinks apply; an external target, if Phase 1 records one, may restrict the sink to process output. |
| Library     | **No logging dependency imposed.** The library never configures a global logger and never writes to `stdout`/`stderr`. It accepts an **optional injected logger** (a minimal interface such as `{ debug, info, warn, error }`) and does nothing when none is given. |
| Extension   | Use a **VS Code output channel** (a dedicated channel created at activation with the `vscode` API) through a thin wrapper in `src/logger.ts`. No `pino` file sink, no `console.log`. |
| Application (UI) | **No `pino` in the browser.** `src/logger.ts` is a thin wrapper (levels `debug` / `info` / `warn` / `error`, `(object, message)` order kept for parity) over a swappable sink; **no `console.log` in delivered code** - the wrapper is the single place allowed to reach the sink, and `debug` is off in a production build (`@rules/ui.md`). |

> The Extension row assumes host = VS Code (chosen in Phase 1). Another host follows the same boundary with its own notification and log mechanism.

Common to every use case: never log a token, secret, password, session id, or PII (`@rules/security.md`); the `(object, message)` call order and the level conventions below apply to every logger wrapper.

### Library: optional injected logger

```ts
// src/types.ts - the library accepts a logger, it never owns one.
export interface Logger {
  debug(obj: object, msg?: string): void;
  info(obj: object, msg?: string): void;
  warn(obj: object, msg?: string): void;
  error(obj: object, msg?: string): void;
}

// src/index.ts - public API: the logger is an option, a no-op by default.
export interface ClientOptions { logger?: Logger; }
const noop = (): void => {};
export const silentLogger: Logger = { debug: noop, info: noop, warn: noop, error: noop };
export function createClient(opts: ClientOptions = {}): Client {
  return new Client(opts.logger ?? silentLogger);
}
```

### Application (UI): thin logger wrapper

```ts
// src/logger.ts - browser: no pino, no console.log in delivered code. The sink is the single swappable point.
type Level = "debug" | "info" | "warn" | "error";
type Sink = (level: Level, obj: object, msg?: string) => void;

let sink: Sink = () => {};                               // production default: silent
export function setLogSink(next: Sink): void { sink = next; }

export const log = {
  debug: (obj: object, msg?: string): void => { if (import.meta.env.DEV) sink("debug", obj, msg); },
  info:  (obj: object, msg?: string): void => sink("info", obj, msg),
  warn:  (obj: object, msg?: string): void => sink("warn", obj, msg),
  error: (obj: object, msg?: string): void => sink("error", obj, msg),
};
```

---

## Principle (CLI and service)

- **`pino` (^10)** - mandatory runtime dependency in a generated CLI or service (fast structured JSON logger; Node has no stdlib equivalent with a file sink).
- **pino writes to a log file AND to `stderr`** - `stdout` stays **data-only** (pipeable) in a CLI, per the CLI I/O contract (`@rules/cli.md`). A log line never reaches stdout in a CLI.
- **`pino-pretty` (runtime dependency)** is the human-readable transport, enabled **only in dev** (`NODE_ENV !== "production"` or `[TOOL]_DEBUG=1`). Production writes raw JSON to stderr. It is a **runtime `dependency`** (not a devDependency): `logger.ts` imports it at module load, and **tsup bundles devDependencies** - a bundled `pino-pretty` breaks the ESM output with `Dynamic require of "tty" is not supported` (`@rules/config.md`).
- Level comes from `config.logLevel` (the cascade, `@rules/config.md`); `[TOOL]_DEBUG=1` forces `debug`.
- When the **progress reporter** is active (CLI only), `cli.ts` raises the `stderr` level to `warn` (the reporter owns the `info` narrative); debug logging auto-disables the reporter - see "Coexistence with the progress reporter" below and `@rules/progress.md`.
- **Zero `console.log` / `console.error`** in delivered code - only `log.*`.
- **Never log a token, secret, password, session id, or PII** (`@rules/security.md`).

---

## Centralized setup - `src/logger.ts`

Single setup point. `log` is exported as a ready `pino` instance and imported directly by every layer (`log.info(...)`, `log.error(...)`). The entry point (`cli.ts` or `server.ts`) calls `configureLogger(config.logLevel)` once, right after `resolveConfig()`, to apply the resolved level.

```ts
// src/logger.ts
import { homedir } from "node:os";
import { join } from "node:path";
import pino, { multistream, type Logger, type LevelWithSilent } from "pino";
import pretty from "pino-pretty";
import { APP_NAME } from "./config";

// CLI: runs from any folder, so the log lives in the user home: ~/.<tool>/logs/app.log.
// Service started from its project directory: resolve(process.cwd(), "logs", "app.log") instead (gitignored, @rules/security.md).
const LOG_FILE = join(homedir(), `.${APP_NAME}`, "logs", "app.log");

/** e.g. tool `my-export` → env var `MY_EXPORT_DEBUG`. Non-alphanumerics normalized so the name is shell-usable. Exported: cli.ts reads it to gate the progress reporter. */
export function debugEnabled(): boolean {
  const key = `${APP_NAME.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_DEBUG`;
  return process.env[key] === "1";
}

const dev = process.env.NODE_ENV !== "production" || debugEnabled();

// File sink: structured JSON, sync so the final line survives process.exit(1); the log directory is created on demand.
const fileStream = pino.destination({ dest: LOG_FILE, mkdir: true, sync: true });
// stderr keeps stdout data-only (@rules/cli.md): pretty in dev, raw JSON in prod.
const errStream = dev ? pretty({ destination: 2, colorize: true, translateTime: "SYS:standard" }) : process.stderr;

/** The single pino instance - imported directly as `log` by every layer. */
export const log: Logger = pino(
  {
    level: debugEnabled() ? "debug" : "info", // bootstrap level; configureLogger() applies the resolved cascade level
    base: undefined,                           // drop pid/hostname noise from log lines
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  multistream([
    { stream: fileStream, level: "trace" },    // permissive: the logger's own `level` is the single gate
    { stream: errStream, level: "trace" },
  ]),
);

/** Apply the resolved config level (cascade defaults < .env < flags). Called once in the entry point after resolveConfig(). */
export function configureLogger(level: LevelWithSilent): void {
  log.level = debugEnabled() ? "debug" : level; // [TOOL]_DEBUG=1 forces debug regardless of config
}
```

- **File + stderr, split by role.** **CLI**: the file is `~/.<tool>/logs/app.log` (user home, because a CLI runs from any folder; created on demand, outside any repo so nothing to gitignore). **Service** started from its project directory: `process.cwd()/logs/app.log`, gitignored (`@rules/security.md`). The sink uses `sync: true` so the last line is flushed even on `process.exit(1)`; stderr carries the same events for the operator. In a CLI, `stdout` is never a destination (`@rules/cli.md`). Keep the single-file-sink shape.
- **`pino-pretty` is an inline stream on stderr, dev-only** - not a worker transport (`transport: { target: 'pino-pretty' }` spawns a worker; the inline stream is simpler and synchronous for a CLI). Prod stderr gets raw JSON.
- **Level is the single gate.** The two multistream sinks are permissive (`trace`); the logger's own `level` decides what is emitted. `configureLogger()` sets it from `config.logLevel`, with `[TOOL]_DEBUG=1` forcing `debug`.
- `APP_NAME` (used for the debug env var) lives in `config.ts` (`@rules/config.md`).

---

## Usage in modules

```ts
// src/services/project.service.ts
import { log } from "../logger";

export async function exportProjects(filter: string): Promise<Result<ExportSummary>> {
  log.debug({ filter }, "Running project export"); // pino order: (mergingObject, message)
  // ...
}
```

When Salesforce is confirmed, a query service logs the same way, for example `log.debug({ soql, org }, "Running export query")` (never a secret).

- **pino call order is `(object, message)`** - the context object first, the message second: `log.info({ count }, "Exported records")`. This is the deviation from `console.log(msg, ...args)` - do not put the message first.
- Structured context (`{ filter, count }`) lands as JSON fields in the file and is pretty-printed on stderr in dev.

### Level conventions

| Level | Usage                                                                 |
| ----- | --------------------------------------------------------------------- |
| debug | Detailed traces, intermediate values, the `sf` args array and query text when Salesforce is confirmed (never a secret) |
| info  | Important business steps (command start/finish, N records exported)   |
| warn  | Unexpected but non-blocking (a retried external call, a no-op `clear` on an empty store); an empty dataset from list/query/export is a success, not a warning |
| error | A caught named error (`ValidationError`, `SfCommandError` when Salesforce is confirmed...) or an uncaught error |

### Errors always logged

In a `catch` that does **not** re-throw (it returns a `Result` error or writes to stderr), call `log.error({ err }, message)` so the stack lands in the file - pino's standard `err` serializer records the name/message/stack:

```ts
try {
  return await this.repository.fetchAll();
} catch (err) {
  log.error({ err }, "Fetch failed");                    // stack → log file via the std `err` serializer
  return { ok: false, error: { kind: "error", message: "Fetch failed." } }; // @rules/errors.md
}
```

Never swallow a non-re-throwing `catch` without a `log.error(...)` (`@rules/errors.md`). The `Result` failure a command surfaces is logged there too: `error.detail` → the log, `error.message` → stderr (`@rules/cli.md`).

---

## Activation + global handlers - `src/cli.ts`

The composition root installs the global handlers **first** (before parsing argv) and applies the resolved level right after `resolveConfig()`. A service does the same in `server.ts` before it starts listening.

```ts
// src/cli.ts - order matters: handlers and level before any command runs.
import { log, configureLogger } from "./logger";
// (inside main(), after the global flags are read by the pre-parse - @rules/cli.md)

process.on("uncaughtException", (err) => { log.error({ err }, "uncaughtException"); process.exit(1); });
process.on("unhandledRejection", (reason) => { log.error({ err: reason }, "unhandledRejection"); process.exit(1); });

const config = resolveConfig(flags);     // flags = the pre-parse result, never program.opts() before parseAsync
configureLogger(config.logLevel);        // apply the cascade level ([TOOL]_DEBUG=1 forces debug)
log.info({ tool: APP_NAME }, "Starting");
```

- The global `uncaughtException` / `unhandledRejection` handlers log via pino, then **exit 1** - the tool never crashes silently or leaks a stack to stdout (`@rules/errors.md`, `@rules/cli.md`). With the file sink in `sync: true` mode, the fatal line is persisted before the process ends.
- `process.exit` lives **only** in `cli.ts` (the boundary + the global handlers), never in a service/`sf`/`output`/command module (`@rules/cli.md`).

---

## Coexistence with the progress reporter (CLI only)

`src/progress.ts` also writes to `stderr` (`@rules/progress.md`). To keep log lines from garbling the live animation:
- **Progress active (TTY)** - `cli.ts` raises the `pino` level to **`warn`** (`configureLogger("warn")`); the reporter carries the `info` narrative on `stderr`. Warnings/errors still print. The **log file** gets `warn+` for that run - an accepted trade-off (the operator is watching the live steps).
- **Progress disabled** (piped / cron / `CI` / `--no-progress`) - `pino` behaves exactly as documented above (`info` → file + `stderr`); the reporter degrades to `log.info` / `log.warn` lines (the enriched-logs view).
- **Debug logging** (`[TOOL]_DEBUG=1` or `--log-level debug` / `trace`) - the reporter is **auto-disabled** so a debugging run keeps full logs; the animation never hides diagnostics.

---

## Anti-patterns - what NOT to do

- **Do not** use `console.log` / `console.error` in delivered code - only `log.*` (CLI, service, application wrapper) or the host output channel (extension).
- **Do not** write a log line to `stdout` in a CLI - stdout is **data only**; pino goes to the file + stderr (`@rules/cli.md`).
- **Do not** emit progress via `console.*` - the progress reporter (`src/progress.ts`) is the only sanctioned direct-`stderr` writer besides `pino` (`@rules/progress.md`).
- **Do not** log a token, secret, password, session id, or PII (`@rules/security.md`).
- **Do not** configure pino outside `src/logger.ts` (single setup point; `configureLogger()` called once in the entry point).
- **Do not** silence a non-re-throwing `catch` without `log.error({ err }, ...)`.
- **Do not** put the message before the context object - pino is `(mergingObject, message)`: `log.info({ count }, "…")`.
- **Do not** spin up a `pino-pretty` worker transport in prod - pretty is dev-only, inline on stderr; prod stderr is raw JSON.
- **Do not** forget the global `uncaughtException` / `unhandledRejection` handlers in `cli.ts` and `server.ts` - both are mandatory (`@rules/errors.md`).
- **Do not** add `pino` (or any logging dependency) to a library or to the browser bundle of an application - a library accepts an injected logger, the UI uses the thin wrapper.
- **Do not** let a library create a global logger or write to `stdout`/`stderr` on its own.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: CLI and service: `src/logger.ts` is the single setup point (pino → file + stderr, `configureLogger()` called once in the entry point); library: no logging dependency, optional injected logger; extension: host output channel; application: thin wrapper, no `pino` in the browser; zero `console.log` / `console.error` in delivered code and stdout never a log destination in a CLI; pino call order `(object, message)`; `pino` and `pino-pretty` both runtime `dependencies` where used (pretty dev-only, inline on stderr); no token, secret, or PII logged; in a CLI the level is raised to `warn` while the progress reporter is active and `[TOOL]_DEBUG=1` forces `debug`. Run silently; report only on a discrepancy.
