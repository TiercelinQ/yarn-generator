# Security rules - TypeScript / Node.js (all use cases) - NON-NEGOTIABLE

> Applied to 100% of generated projects. Any deviation requires the contract declaration protocol (stop -> declare -> validate). The attack surface is **process execution**, **untrusted input**, **file paths**, and **secrets**. With Salesforce coupling, `sf` owns all Salesforce credentials - the project never handles a token.
>
> **Salesforce callout.** Section 1 is split in two: the general spawn rule applies to **every** use case; the `sf` runner, `cross-spawn`, and the Windows command-line parts apply **only when Salesforce coupling is confirmed in Phase 1**. Salesforce lines in the other sections are marked the same way.

## 1. Process execution

### 1a. Any process spawn (every use case)

- **Any process spawn uses an argument ARRAY, never a shell.** No `shell: true` with interpolated input, no concatenated command string, no `exec(...)` of a built string.
- **User-provided values (names, file paths, flag values, request fields) are separate array elements** - never spliced into a string. This is the command-injection guard.
- A project that spawns processes keeps them in **one dedicated module** declared in the Phase 4 contract (`@rules/architecture.md`); no spawn from an adapter (command, route, contribution, screen) or from `output/`.
- A spawn failure (`ENOENT`, non-zero status) is mapped to a `Result<T>` error (`@rules/errors.md`), never thrown raw at the user.
- A project with no external process needs none of this; do not add a spawn module speculatively.

### 1b. The `sf` runner only (Salesforce coupling only)

- **Every `sf` (and any external-CLI) invocation spawns with an argument ARRAY via `cross-spawn`, from `src/sf/runner.ts` only.** No other module spawns a process (`@rules/architecture.md`, `@rules/sf-cli.md`).
- **Never `node:child_process.spawn("sf", ...)` directly.** On Windows the binary is a `sf.cmd` shim; a bare spawn fails with `ENOENT` (Node's security fix blocks running a `.cmd` without a shell). `cross-spawn` resolves the shim **and escapes arguments** on every OS.
- **Never `shell: true` with interpolated input, never a concatenated command string.** `cross-spawn` never spawns through a shell, so there is no injectable command line.

```ts
// GOOD - args array, no shell, each user value a discrete element (src/sf/runner.ts)
spawn(bin, [
  "data",
  "query",
  "--query",
  soql,
  "--target-org",
  orgAlias,
  "--json",
]);

// BAD - never: an injectable shell string. `soql` = 'x"; rm -rf ~ #' would run.
spawn(`sf data query --query "${soql}"`, { shell: true });
```

- The binary is resolved from **`config.sfPath`** (populated by `SF_CLI_PATH` / `--sf-cli-path`) or the bare `sf` on `PATH` - cross-OS, no `if (win32)` (`@rules/sf-cli.md`).
- The runner returns **`Result<T>`** (`@rules/errors.md`): it maps `ENOENT` -> a clear "sf not found" error and a non-zero `sf` status / unparseable `--json` -> an error - it never throws a raw spawn error at the user.
- **Windows command-line limit**: `sf` is a `.cmd` shim run via cmd.exe (~8191-char line). A large argument (e.g. a many-field SOQL) is passed via a **temp file** (`runWithLargeArg` -> `--file` / `--query-file`) instead of a huge inline flag; the runner also guards the assembled length and fails clearly if it would still overflow. The temp file holds **non-secret** SOQL, lives under the OS temp dir with a generated name (no path from user input), and is **always removed** (`finally`) - `@rules/sf-cli.md`.

## 2. Input validation - external data is `unknown` then validated

- **All data crossing a trust boundary is typed `unknown`, then validated before use**: CLI args/flags, HTTP request bodies/params/headers (service), messages from the host or a webview (extension), form and URL input (application), imported file contents (CSV/JSON to load), and env values. With Salesforce: the `sf --json` envelope and `sfdx-project.json`.
- Validate with dedicated **TS type guards** (shape, required fields, bounds, enum membership). A schema library (`zod`...) is used **only if validated in Phase 1** - otherwise hand-written guards.
- Salesforce only: the **`sf --json` envelope is parsed defensively**: field names drift across `sf` versions; read `status` / `result`, guard missing fields, never assume an exact shape (`@rules/sf-cli.md`).
- Numeric/enum **env values** (`SF_PAGE_SIZE`, `LOG_LEVEL`) are parsed and validated in `resolveConfig()` (`@rules/config.md`), never trusted raw.
- **No `any` on external data** - `unknown` then narrow. An `any` that lets an unvalidated field flow into logic is a defect.

## 3. File paths - resolve and confine

- **Paths WRITTEN as exports / outputs** (`--output` / `EXPORT_DIR` destinations, an upload name) and every other path derived from user input that the tool reads or writes on the user's behalf (an `--input` file to import, an Apex `--file`) are resolved with `path.resolve` and **verified to stay under the allowed base directory** (`resolveWithin`) before any read/write. No traversal (`..`), no absolute escape.
- **Exception - the tool's own storage path.** A path the user **chooses as the tool's own storage** (a data file, a config file, e.g. `--data-file`, `NOTES_FILE`) is **not** confined: it is resolved with `path.resolve` only (in `resolveConfig`), because the user legitimately points the tool at a file anywhere. This choice is a **documented deviation**, declared in the Phase 3 / Phase 4 specs (the contract), never silent. Confinement stays mandatory for everything the tool writes as an export.

```ts
// src/config.ts - exported alongside the config cascade, co-located with the exportDir it confines against (@rules/config.md).
import { resolve, relative, isAbsolute, sep } from "node:path";
import { ValidationError } from "./errors"; // bad input -> exit 2 for a CLI (@rules/errors.md)

/** Resolve `candidate` and confirm it stays under `baseDir`; raise ValidationError otherwise. */
export function resolveWithin(baseDir: string, candidate: string): string {
  const base = resolve(baseDir);
  const target = resolve(base, candidate);
  const rel = relative(base, target);
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new ValidationError(
      `Path escapes the allowed directory: ${candidate}`,
    );
  }
  return target;
}
```

- The `output/` layer (CLI) writes only **under the resolved `exportDir`**; an import reads only the explicitly provided file. Create parent dirs with `recursive: true` **under the base**, never outside it.
- On Windows, `relative` returns an **absolute** path for a cross-drive target, so `isAbsolute(rel)` catches a `E:\...` escape; `path.resolve` collapses `..` segments so a `../../etc/passwd` candidate is caught by the `..` prefix.

## 4. Secrets - never in a file, a log, or a commit

- **No secret ever in a file, in config, in logs, or in a commit.** With Salesforce, `sf` owns all credentials (OAuth access/refresh tokens) in the **OS keychain**; the project never reads, writes, or logs a token.
- Salesforce only: the project persists at most a **non-secret** org alias (`SF_TARGET_ORG` in `.env`, or a config default). An alias is a handle to a keychain entry, not a credential.
- **`.env` holds non-secret configuration only and is gitignored**; only `.env.example` (placeholder values) is committed (`@rules/config.md`).
- **Never echo a token / password / session id** to stdout, stderr, or the log file (`@rules/logging.md`). The `Result` error `message` (stderr) and `detail` (log) must never carry a secret. If a real secret ever has to be handled, defer to the OS keychain / the platform secret store - never plain `.env` or `config.ts`.
- **Application (browser)**: everything bundled by Vite ships to the browser. No secret in the bundle, in an env value exposed to the client, or in the source (`@rules/ui.md`).
- **Generated data exports can contain org / PII data** - the export directory is gitignored (or lives outside the repo); never commit exported records (`@rules/config.md`).

## 5. Misc

- **No `eval`, `new Function`, or `node:vm`** on any untrusted input (env, file contents, `sf` output, CLI args, request data). No dynamic `import()` of a path built from user input.
- **Dependency audit**: `yarn npm audit --recursive` is part of the last-batch install instructions (`@rules/architecture.md` batch delivery). It checks direct and transitive dependencies against the npm registry advisories and exits non-zero when a report is found; `--severity <level>` limits the table to a minimum severity, `--environment production` limits it to `dependencies` (`yarn-npm-audit.md`). Keep dependencies on supported versions (`@rules/config.md`).
- **`sf` is a documented runtime prerequisite** (Salesforce coupling only), not a bundled dependency; the README states the cross-OS install + the `SF_CLI_PATH` fallback and the coupling mode (`@rules/sf-cli.md`, `@rules/readme.md`).
- CLI only: `stdout` carries **data only** (pipeable); a diagnostic, a path, or an error detail never leaks into piped output - the human message goes to stderr, the detail to the log file (`@rules/cli.md`, `@rules/logging.md`).
- Service only: an HTTP error response carries a short message and a code, never a stack trace, a path, or a secret; the detail goes to the log (`@rules/errors.md`, `@rules/logging.md`).

## Anti-patterns - what NOT to do

- **Do not** build any command as a concatenated string or use `shell: true` with interpolated input - pass an args array.
- **Do not** (Salesforce) call `node:child_process.spawn("sf", ...)` directly - on Windows it fails to resolve the `sf.cmd` shim (`ENOENT`). Use `cross-spawn`.
- **Do not** spawn a process from an adapter (`commands/`, `routes/`, `contributions/`, `ui/`), `services/`, or `output/` - with Salesforce only `src/sf/runner.ts` spawns (`@rules/sf-cli.md`); otherwise the single dedicated module of the contract.
- **Do not** use external data (`sf --json`, files, args, env, request data) without validating it from `unknown` first - no `any` shortcut.
- **Do not** write an export / output path built from user input without the under-base-dir check - no traversal, no absolute escape. (A user-chosen storage path is the declared exception: `path.resolve`, no confinement, documented in the specs - section 3.)
- **Do not** put a token / password / secret in `.env`, `config.ts`, a log line, a `Result` message/detail, a browser bundle, or a commit - with Salesforce, `sf` keychain only and a non-secret alias is the most the project stores.
- **Do not** commit `.env` or exported data files - only `.env.example`.
- **Do not** `eval` / `new Function` / `vm` untrusted input, nor dynamic-`import()` a user-supplied path.
- **Do not** (Salesforce) target `sfdx` (legacy) - `sf` v2 only.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: every process spawn uses an args array (no shell, no concatenated command) and lives in its dedicated module - with Salesforce, in `src/sf/runner.ts` via `cross-spawn`, never in an adapter, `services`, or `output`; all external data (files, args, env, request data, and with Salesforce the `sf --json` envelope) is typed `unknown` then validated by type guards; every export / output path built from user input is resolved and confined under the base directory (`resolveWithin` - no traversal, no absolute escape), while a user-chosen storage path is `path.resolve`d and declared as a deviation in the specs; no secret in `.env`, config, logs, a browser bundle, or commits - with Salesforce `sf` keychain only, at most a non-secret alias stored; `.env` and export directories gitignored (only `.env.example` committed); no `eval` / `new Function` / `vm` / dynamic `import()` on untrusted input; `yarn npm audit` reviewed. Run silently; report only on a discrepancy.
