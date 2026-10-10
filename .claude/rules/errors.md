# Error handling rules - yarn

> This rule **owns** the `Result<T>` contract (defined below) and the service → boundary escalation. The contract is kept for **every use case**; only the **boundary mapping** depends on the use case (next section). CLI exit-code mapping and the stdout/stderr surfaces: `@rules/cli.md` (CLI use case only). Logging: `@rules/logging.md`. Use-case guide: `@rules/use-cases.md`.
> Salesforce named errors (`SfCliNotFoundError`, `SfCommandError`, `ProjectNotFoundError`) and the `sf` runner `Result` apply **only when Salesforce coupling is confirmed in Phase 1** (`@rules/sf-cli.md`).

## `Result<T>` contract

The single type, in `src/types.ts`. Library layers return it; the adapter of the use case reads it; the boundary maps a failure to the outcome of the use case.

```ts
// src/types.ts
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { kind: "error" | "warning"; message: string; detail?: string } };
```

- `ok: true` → `data` present, the adapter delivers it (CLI: formats it, exit `0`).
- `ok: false`, `kind: "error"` → a fatal failure; the adapter reports `message` through the channel of its use case (CLI: stderr + exit `1`).
- `ok: false`, `kind: "warning"` → a non-fatal outcome where **nothing was done** and no dataset exists to deliver (e.g. `clear` on an already empty store); the adapter reports `message` but the outcome stays a success (CLI: stderr and exit `0`, a scheduled job treats it as success).
- **An empty dataset is not a warning.** A command that returns a dataset (list, query, export) treats an empty result as **success**: the service returns `{ ok: true, data: [] }`, the formatter prints a valid empty document (`@rules/output.md`), the exit code is `0`, and the adapter may add an optional human note on stderr. A downstream `| jq` or a scheduled export must always receive valid output.
- `message` is the human-facing summary; `detail` is the diagnostic (log file). Never put a stack trace or a secret in `message`.

## Boundary mapping per use case

The `Result<T>` contract and the named errors do not change. What changes is where a failure stops and how it is shown.

| Use case    | Boundary                                                | Mapping of a failed `Result` / caught named error                                                       |
| ----------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| CLI tool    | `cli.ts` (`parseAsync` catch + global handlers)         | message on stderr, exit code `0` / `1` / `2` via `toExitCode` (`@rules/cli.md`)                          |
| Library     | the public API in `src/index.ts`                        | either **documented thrown named errors** (listed in TSDoc `@throws`) or `Result<T>` returned at the public API; pick one per project in Phase 1 and apply it to the whole API. No `process.exit`, no stdout/stderr write, no logging imposed. |
| Service     | the HTTP/transport layer in `server.ts`                 | `kind: "error"` → `5xx`, `ValidationError` → `4xx` (`400`/`422`), a not-found named error → `404`, `kind: "warning"` → `2xx` with the message in the body; an error body carries `message` only, never `detail` or a stack |
| Extension   | `extension.ts` (activation + command handlers)          | VS Code notification (error / warning message API of the `vscode` module) with `message`, `detail` to the extension output channel. |
| Application | the UI error state (error boundary + per-view state)    | `kind: "error"` → visible error state with `message`, `kind: "warning"` → inline notice, `detail` to the logger wrapper only (`@rules/ui.md`) |

> The Extension row assumes host = VS Code (chosen in Phase 1). Another host follows the same boundary with its own notification and log mechanism.

- Whatever the use case, the layers below the boundary (`services/`, `output/`, `sf/` when present) stay free of any boundary concern: no `process.exit`, no HTTP status, no notification call, no UI state.
- The global `uncaughtException` / `unhandledRejection` handler is mandatory in every Node.js entry point (CLI, service, library demo scripts excluded, extension host process). The browser application installs `window.onerror` / `unhandledrejection` equivalents that route to the logger wrapper and the error state.

## Service → command → boundary escalation

- **Service / external-call / library layers** (`services/`, `output/`, and `sf/` when Salesforce is confirmed): return `Result<T>` **or** raise a **named error** from `src/errors.ts` (a class extending `Error` with a fixed `name`). They **never** call `process.exit` and **never** write to stdout/stderr for an error - they hand the failure upward.
- **Adapter** (CLI: `commands/<group>.ts`): reads `result.ok`. On failure it logs the detail via `pino`, writes `error.message` to **stderr**, and sets the exit code (`kind: "error"` → `process.exitCode = 1`; `kind: "warning"` → stays `0`). It never throws a raw exception to the user.
- **Boundary** (CLI: `cli.ts`): the global `uncaughtException` / `unhandledRejection` handlers plus the top-level `try/catch` around `parseAsync`. Any **thrown** named error (a `ValidationError` from a flag guard, an unexpected throw) is logged via `pino` and mapped to an exit code by the single `toExitCode` helper (`ValidationError` → `2`, else `1` - `@rules/cli.md`).

The two CLI paragraphs above are the CLI use case as in the reference; the other use cases apply the table of the previous section at their own boundary.

## Named errors - `src/errors.ts`

```ts
// src/errors.ts - each error carries a fixed `name`. Raised by library layers, mapped at the boundary.
export class ValidationError extends Error {          // bad flags / invalid input → CLI exit code 2, HTTP 4xx, UI field error
  constructor(message: string) { super(message); this.name = "ValidationError"; }
}
```

When Salesforce is confirmed, add the Salesforce named errors:

```ts
// src/errors.ts (when Salesforce is confirmed)
export class SfCliNotFoundError extends Error {
  constructor(message: string) { super(message); this.name = "SfCliNotFoundError"; }
}
export class SfCommandError extends Error {
  constructor(message: string, readonly detail?: string) { super(message); this.name = "SfCommandError"; }
}
export class ProjectNotFoundError extends Error {     // sfdx-project mode - @rules/sfdx-project.md
  constructor(message: string) { super(message); this.name = "ProjectNotFoundError"; }
}
```

- When Salesforce is confirmed, the `sf` runner **returns** a `Result` error (`kind: "error"`) on `ENOENT` (a clear "sf not found" message), on a non-zero `sf` status, and when the assembled command line would overflow the Windows ~8191-char limit (a clear "command line too long" message, not the opaque "Réponse sf illisible" - `@rules/sf-cli.md`) - it never throws a raw spawn error across a layer. `Result.error` is a **plain object** (`{ kind, message, detail? }`), not a named-error instance. The named `SfCliNotFoundError` / `SfCommandError` classes exist for a layer that prefers to **raise** (throw) instead of return (`@rules/sf-cli.md`).
- A service raises `ValidationError` for a business-rule violation it cannot express as data; a flag guard in a command raises it for bad input. Both surface as exit `2` in a CLI (and as the matching `4xx` / field error in the other use cases).

## Service returning `Result`

```ts
// src/services/project.service.ts - business logic: returns Result, never touches commander / process.exit / stdout.
import type { Result, ProjectInfo } from "../types";
import type { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {
  constructor(private readonly repository: ProjectRepository) {}   // injected at the composition root

  async listProjects(): Promise<Result<ProjectInfo[]>> {
    const res = await this.repository.listProjects();
    if (!res.ok) return res;                       // propagate the failure unchanged
    return { ok: true, data: res.data };           // empty is a SUCCESS: `data: []` flows to the formatter (@rules/output.md)
  }
}
```

When Salesforce is confirmed, the same shape sits on the `sf` helpers:

```ts
// src/services/org.service.ts - business logic: returns Result, never touches commander / process.exit / stdout.
import type { Result, OrgInfo } from "../types";
import type { SfHelpers } from "../sf/helpers";

export class OrgService {
  constructor(private readonly sf: SfHelpers) {}   // the typed sf helpers, injected in cli.ts - @rules/sf-cli.md

  async listOrgs(): Promise<Result<OrgInfo[]>> {
    const res = await this.sf.listOrgs();          // sf/ owns the spawn; the helper merges the org lists
    if (!res.ok) return res;                       // propagate the sf failure unchanged
    return { ok: true, data: res.data };           // no authenticated org = `{ ok: true, data: [] }`, a success - never a warning
  }
}
```

## Command mapping a failed `Result` (CLI)

```ts
// src/commands/project.ts (excerpt) - read result.ok, log detail, write the summary to stderr, set the exit code.
const result = await projectService.listProjects();            // the service injected via registerProjectCommands(program, deps)
if (!result.ok) {
  if (result.error.kind === "error") {
    process.exitCode = 1;                                       // fatal → exit 1
    log.error({ detail: result.error.detail }, result.error.message);
  } else {
    log.warn({ detail: result.error.detail }, result.error.message); // warning → exit stays 0
  }
  process.stderr.write(`${result.error.message}\n`);            // human summary → stderr, never stdout
  return;
}
// success → format result.data through the output/ layer (@rules/output.md · full adapter in @rules/cli.md)
```

For a service use case, the equivalent adapter is the route handler: it maps the failed `Result` to the status of the table above and answers with `{ message }` only. For an application, it is the view hook that stores the failed `Result` in the error state.

## Global handler - `cli.ts` (CLI)

The safety net for anything that escaped the `Result` path (installed before parsing, `@rules/architecture.md`):

```ts
// src/cli.ts
process.on("uncaughtException", (err) => { log.error({ err }, "uncaughtException"); process.exit(1); });
process.on("unhandledRejection", (reason) => { log.error({ err: reason }, "unhandledRejection"); process.exit(1); });
```

A thrown named error that reaches the top-level `catch` is logged, its `message` written to stderr, and the process exits via `toExitCode(err)` (`@rules/cli.md`). A service entry point (`server.ts`) installs the same two handlers, logs, and shuts down gracefully before exiting `1`.

## Rules

- **Never throw a raw exception to the user.** Library layers return `Result` or raise a **named** error; the adapter maps it to the message channel of the use case; the boundary maps any escaped throw to the outcome of the use case (CLI: an exit code). A stack trace never reaches stdout (CLI), an HTTP body (service) or the UI.
- **`process.exit` only in `cli.ts`** (the boundary + the global handlers; a service entry point may exit after a graceful shutdown). A command sets `process.exitCode`; a service/`sf`/`output` module does neither.
- **Every non-re-throwing `catch` logs via `log.error`** (or `log.warn`; in a library without an injected logger, the error is returned or re-thrown, never swallowed) so the detail lands in the log file - never swallow an error silently (`catch { /* nothing */ }`).
- Build the user-facing wording at the adapter/boundary, not in the model - a service raises a typed error / returns `Result`; the adapter decides the message shown.
- The `message` is a concise summary for the user channel; the `detail` (and any stack) goes to the log - do not dump a stack trace to the user (`@rules/logging.md`).
- **An empty dataset is success, not a warning** - `kind: "warning"` is reserved for a non-dataset command where nothing was done (`@rules/output.md`).
- Error handling on every fallible operation: file IO (`--output`, `sfdx-project` reads when Salesforce is confirmed), JSON parsing, config resolution, network calls, and the `sf` spawn when Salesforce is confirmed (`@rules/sf-cli.md`).
- Never log a token, secret, or password (`@rules/security.md`).

## Anti-patterns - what NOT to do

- **Do not** throw a raw exception out of a service module for a known failure - return `{ ok: false, error: {...} }` or raise a named error.
- **Do not** call `process.exit` outside `cli.ts` - a command sets `process.exitCode`.
- **Do not** write an error message to stdout (CLI) - the human summary goes to stderr, the detail to the `pino` log; stdout is data only (`@rules/cli.md`).
- **Do not** build the user-facing message inside a service - the service raises a typed error / returns `Result`; the adapter owns the wording.
- **Do not** return a `kind: "warning"` for an empty list / query / export result - return `{ ok: true, data: [] }` so the output stays a valid empty document.
- **Do not** swallow a `catch` that does not re-throw without a `log.error(...)`.
- **Do not** dump a stack trace or a secret into the user-facing summary (stderr, HTTP body, UI) - `detail` → log only.
- **Do not** forget the global `uncaughtException` / `unhandledRejection` handlers in a Node.js entry point (`cli.ts`, `server.ts`, `extension.ts`) - both are mandatory.
- **Do not** map a failure to an exit code with a scattered magic number - thrown errors go through `toExitCode`, `Result` failures through the fixed `warning → 0 / error → 1` rule (CLI). Likewise a service maps to HTTP status at one place only.
- **Do not** mix the two library styles in one public API (some functions throw, others return `Result`) - one style per project, fixed in Phase 1.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: library layers (`services`, `output`, and `sf` when Salesforce is confirmed) return `Result<T>` or raise a named error from `src/errors.ts` - never a raw exception at the user; the boundary of the use case maps the failure (CLI: commands log the detail, write `error.message` to stderr, and set `process.exitCode`, `warning` → 0, `error` → 1, an empty dataset is a success; service: one status mapping; library: one documented style; extension: host notification; application: UI error state); the global `uncaughtException` / `unhandledRejection` handlers are present in every Node.js entry point; no non-re-throwing `catch` without a `log.error(...)`; no stack trace or secret in the user-facing summary (detail goes to the log). Run silently; report only on a discrepancy.
