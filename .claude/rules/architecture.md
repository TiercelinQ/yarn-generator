# Architecture rules - yarn (layered, one composition root per use case)

The generated project is a **TypeScript / Node.js project of one of five use cases** (CLI tool, library, service, extension, application), fixed in Phase 1. It is layered, not MVC: thin adapters on top, business logic under them, optional process execution and formatting at the bottom, and a single composition root. Use case detail: `@rules/use-cases.md`.

> **Use case callout.** All use cases share the same **common core** (`src/`, `test/` mirroring `src/`, shared files `config.ts`, `logger.ts` where imposed, `types.ts`, `errors.ts`). Only the entry point (the composition root) and the adapter layer above the services change.
>
> | Use case    | Composition root | Adapter layer (thin)                        |
> | ----------- | ---------------- | ------------------------------------------- |
> | CLI tool    | `src/cli.ts`     | `src/commands/` (+ `src/output/`)           |
> | Library     | `src/index.ts`   | the public exports of `index.ts` itself     |
> | Service     | `src/server.ts`  | `src/routes/` (endpoints)                   |
> | Extension   | `src/extension.ts` | `src/contributions/` (commands, views...) |
> | Application | `src/main.tsx`   | `src/ui/` (screens, components) - `@rules/ui.md` |
>
> Folder names of the adapter layer follow `@rules/use-cases.md`. The sections below keep the CLI layering as the detailed reference; the other use cases apply the same principle (adapter -> services -> optional bottom layers, composition root only at the entry point).
>
> **Salesforce callout.** The `src/sf/` layer, `SfHelpers`, the `sfdx-project` files, and every `@rules/sf-cli.md` / `@rules/sfdx-project.md` pointer below apply **only when Salesforce coupling is confirmed in Phase 1**. Without coupling, `src/sf/` does not exist and services take no `SfHelpers`.

## Layer -> folder mapping

| Layer            | Location            | Content                                                                 |
| ---------------- | ------------------- | ----------------------------------------------------------------------- |
| Adapters         | `src/commands/` (CLI) · `src/routes/` (service) · `src/contributions/` (extension) · `src/ui/` (application) | Thin adapters: parse input -> call one service -> format/return the result |
| Services         | `src/services/`     | Business logic - orchestrates `sf/` (if any), shapes DTOs, returns `Result<T>` |
| Salesforce       | `src/sf/`           | **Salesforce only.** Process execution - `cross-spawn` `sf ...`, defensive parse - `@rules/sf-cli.md` |
| Output           | `src/output/`       | **CLI only.** Formatters - `json` · `table` always, `csv` · `xlsx` only when selected in Phase 1 -> stdout / file - `@rules/output.md` |
| Composition root | `src/cli.ts` · `src/index.ts` · `src/server.ts` · `src/extension.ts` · `src/main.tsx` | One per use case. CLI: `commander` bootstrap, registers commands, maps `Result`/errors -> exit code - `@rules/cli.md` |
| Shared           | `src/config.ts`, `src/logger.ts`, `src/progress.ts` (CLI only), `src/types.ts`, `src/errors.ts` | Defaults, `pino` (where imposed), progress reporter, `Result<T>` + DTOs, named errors - importable by all |

## Responsibilities

### Adapters - `src/commands/` (CLI)
- Applies to the CLI use case as written; the other use cases keep the same rule with their own adapter (route handler, extension contribution, UI screen): read/validate input, call **one** service, hand the result back.
- One file per command group: `<group>.ts` (starter scaffold: Salesforce coupling gives `org.ts`, `data.ts`; otherwise the starter group comes from Phase 3). Each exports a `register<Group>Commands(program)` that declares its subcommands (`.command`, `.description`, `.option`, `.action`).
- The `.action` does three things only: read/validate flags (raise `ValidationError` on bad input - `@rules/errors.md`), call **one** service, then hand the returned data to an `output/` formatter (data -> stdout/file) or report the failed `Result` to stderr and set the exit code.
- **Forbidden**: business logic, a direct `sf`/`cross-spawn` call (go through a service), `console.log`, and `process.exit` (set `process.exitCode` or let a thrown named error reach the `cli.ts` boundary). CLI surface detail: `@rules/cli.md`.

### Services - `src/services/`
- One file per domain: `<domain>.service.ts`. Pure Node + TypeScript business logic. A class (or functions) that, with Salesforce coupling, receives the injected `SfHelpers` (`@rules/sf-cli.md`), orchestrates them, applies the domain rules, and returns `Result<T>` (or raises a named error from `src/errors.ts`).
- **Forbidden**: importing `commander`, touching `process.exit` / `process.argv` / `process.stdout`, and formatting output. A service returns typed DTOs; the adapter formats them. Tolerated: importing `sf/` (if any), `config`, `logger`, `progress` (CLI), `types`, `errors`.

### Salesforce - `src/sf/` (Salesforce coupling only)
- `runner.ts`: the `SfRunner` class - the single `sf` entry point and the **only place the whole project spawns a process**. `run<T>(args)` calls `cross-spawn(bin, [...args, "--json"])`, parses the envelope defensively, and returns `Result<T>` (mapping `ENOENT`/non-zero status to a `Result` error, or a named `SfCliNotFoundError`/`SfCommandError` where a caller prefers to raise). Never a concatenated shell string, never `node:child_process` directly. `helpers.ts`: the `SfHelpers` class - typed helpers (`listOrgs`, `query`, ...) on top of the runner, each `argv` **verified against `salesforce-cli-reference/`**, never invented; injected into the services. `project.ts`: `sfdx-project` mode only - `@rules/sfdx-project.md`.
- **Forbidden**: any entry-point concern (no `commander`, no `process.exit`, no reading `process.argv`, no formatting). `sf/` is reusable outside its host use case. Detail + the full runner: `@rules/sf-cli.md`.
- Without Salesforce coupling, any process spawn still follows `@rules/security.md` (args array, no shell) and lives in one dedicated module declared in the Phase 4 contract.

### Output - `src/output/` (CLI use case only)
- `index.ts` dispatches on the chosen format to the shipped formatters: `json.ts` · `table.ts` always, `csv.ts` · `xlsx.ts` only when selected in the Phase 1 "Output formats" question (an unknown format is a `ValidationError`, exit `2`), writing to an explicit destination (`stdout` | a file path). Every user-facing dataset goes through here - no ad-hoc `console.log(JSON.stringify(...))` in a command.
- **Forbidden**: any `sf`/business dependency. `output/` imports only `types` (the DTOs it renders). It is a pure presentation layer. Detail: `@rules/output.md`.

### Composition root - `src/cli.ts` (CLI) · `src/index.ts` · `src/server.ts` · `src/extension.ts` · `src/main.tsx`
- The **only** place that wires the layers together for its use case. CLI: the bin entry (shebang, bundled to `dist/cli.js` by tsup) that bootstraps `commander`, registers every command group, installs the global `uncaughtException`/`unhandledRejection` handlers, owns the exit-code mapping (`0`/`1`/`2`), and is the **only** place `process.exit` is called. Detail: `@rules/cli.md` · `@rules/errors.md`.
- Library: `index.ts` is the public API barrel (explicit named exports, no side effect on import). Service: `server.ts` builds and starts the HTTP server, installs the global handlers, owns the startup/shutdown. Extension: `extension.ts` exports the host activation entry. Application: `main.tsx` mounts the React tree. Detail per use case: `@rules/use-cases.md`.

### Shared - `config.ts` · `logger.ts` · `progress.ts` (CLI only) · `types.ts` · `errors.ts`
- `types.ts`: `Result<T>` (owned + quoted by `@rules/errors.md`) and the DTOs (with Salesforce: `OrgInfo`, `QueryResult`; always: `OutputFormat` for a CLI, ...). Zero logic.
- `errors.ts`: named error classes, each with a fixed `name` (`ValidationError`, plus with Salesforce `SfCliNotFoundError`, `SfCommandError`, `ProjectNotFoundError`). Zero IO.
- `config.ts`: typed defaults + `resolveConfig()` (cascade `defaults < .env < CLI flags` for a CLI, non-secret only) - `@rules/config.md`.
- `logger.ts`: the `pino` instance (file + `stderr`) where the use case imposes it (CLI, service) - `@rules/logging.md`.
- `progress.ts` (CLI only): the progress reporter singleton (`progress` - `step` always, `bar` only when an operation with a known total exists; on `stderr`, TTY-gated, degrades to `log` when disabled) - `@rules/progress.md`. Imports only `logger`. Ships in Batch 1 with `logger.ts` because services import it (`progress.step`).
- All of them are importable by **every** layer and import nothing from the adapters/`services`/`sf`/`output` (zero upward import).

## Unidirectional imports

```
src/cli.ts  (composition root - the only commander bootstrap, the only process.exit)
   └─▶ commands/ ──▶ services/ ──▶ sf/          business logic -> process execution (sf/ only with Salesforce)
              └───▶ output/                     commands format the returned data -> stdout / file (CLI only)

config.ts · logger.ts · progress.ts · types.ts · errors.ts    ◀── importable by ALL layers (never import upward)
```

- The same shape holds for every use case: `server.ts -> routes/ -> services/`, `extension.ts -> contributions/ -> services/`, `main.tsx -> ui/ -> services/`, `index.ts -> services/`. Only the root and the adapter names change.
- The chain is strict: `cli -> commands -> services -> sf`. Commands additionally import `output/` to render a service's returned DTOs. No layer skips another (a command never calls `sf/` directly; a service never formats).
- `output/` depends only on `types` (no `sf`, no service). `sf/` depends only on `config`/`logger`/`types`/`errors` (no CLI). `services/` never import `commander` and never call `process.exit`.
- The `Result<T>` contract flows **upward**: `sf/` and `services/` return it (or raise a named error); the adapters read `result.ok`; the composition root maps a failure (for a CLI, to an exit code). Definition and escalation: `@rules/errors.md`.
- One domain = one service + one adapter group at most. Any constant reused across files lives in `config.ts`; any shared type in `types.ts`.

## Generated reference tree

CLI tool (reference tree; the Salesforce lines apply only when coupling is confirmed):

```
<project>/
├── package.json            # "type":"module", "packageManager", bin, scripts (dev/build/typecheck/lint/format/test)
├── yarn.lock               # committed
├── .yarnrc.yml             # nodeLinker: node-modules - @rules/config.md
├── tsconfig.json           # strict, moduleResolution "bundler"
├── tsup.config.ts          # bundle src/cli.ts -> dist/cli.js (shebang)
├── eslint.config.mjs · .prettierrc · .prettierignore   # .prettierignore: .yarn, yarn.lock, dist
├── .env.example  .gitignore
├── README.md · CLAUDE.md · .claude/settings.json
├── docs/specs/             # 01-scoping ... 04-architect
├── src/
│   ├── cli.ts              # bin entry: commander program, registers commands, maps Result->exit code
│   ├── config.ts           # typed defaults + resolveConfig() - @rules/config.md
│   ├── logger.ts           # pino - @rules/logging.md
│   ├── progress.ts         # progress reporter (stderr, TTY-gated) - @rules/progress.md
│   ├── types.ts            # Result<T>, DTOs (Salesforce: OrgInfo, QueryResult...)
│   ├── errors.ts           # named error classes
│   ├── sf/                 # SALESFORCE ONLY
│   │   ├── runner.ts       # cross-spawn sf [...args,--json] -> Result<T> - @rules/sf-cli.md
│   │   ├── helpers.ts      # typed helpers (verified vs salesforce-cli-reference/) - @rules/sf-cli.md
│   │   └── project.ts      # sfdx-project mode - @rules/sfdx-project.md
│   ├── services/           # <domain>.service.ts - business logic
│   ├── commands/           # <group>.ts - thin adapters (Salesforce starter: org.ts, data.ts)
│   └── output/             # index.ts (dispatch) + json.ts + table.ts (+ csv.ts, xlsx.ts if selected) - @rules/output.md
├── scripts/                # standalone one-off scripts (if execution shape includes them)
└── test/                   # vitest (if enabled), mirrors src/
```

Library:

```
src/
├── index.ts                # public API barrel (named exports) - the only entry
├── config.ts · types.ts · errors.ts  (logger.ts per @rules/use-cases.md)
├── services/               # business logic
└── sf/                     # SALESFORCE ONLY
```

Service:

```
src/
├── server.ts               # builds + starts the server, global handlers, shutdown
├── config.ts · logger.ts · types.ts · errors.ts
├── routes/                 # thin endpoint handlers
├── services/               # business logic
└── sf/                     # SALESFORCE ONLY
```

Extension:

```
src/
├── extension.ts            # activation entry (VS Code `main`, composition root)
├── config.ts · types.ts · errors.ts
├── contributions/          # commands, views, handlers declared to the host
├── services/               # business logic
└── sf/                     # SALESFORCE ONLY
```

> The Extension tree assumes host = VS Code (`main` entry, chosen in Phase 1). Another host follows the same boundary with its own activation entry and notification and log mechanism.

Application (Vite + React, `@rules/ui.md`):

```
src/
├── main.tsx                # mounts the React tree
├── config.ts · types.ts · errors.ts
├── ui/                     # screens + components - @rules/ui.md
├── services/               # business logic (no DOM)
└── sf/                     # SALESFORCE ONLY, requires a Node-side process (a browser bundle cannot spawn sf)
```

- `project.ts` ships only in `sfdx-project` coupling mode (`@rules/sfdx-project.md`); in `standalone` mode `src/sf/` is `runner.ts` + `helpers.ts`.
- `scripts/` exists only when the execution shape (Phase 3) includes standalone one-off scripts; `test/` only when tests were enabled in Phase 1.
- Root config files per use case (tsup vs Vite, `index.html` for an application): `@rules/config.md`.

## `cli.ts` composition sequence (non-negotiable, CLI use case only)

Structural skeleton only - the **complete bootstrap** (`.env` load, global-flag pre-parse, `resolveConfig()`, `configureLogger()`, progress activation via `configureProgress()`, `exitOverride` / `configureOutput`, exit-code mapping via `toExitCode`, `exportDir` threading) is owned by `@rules/cli.md`; write `cli.ts` from it, not from this sketch. The Salesforce lines apply only with coupling confirmed.

```ts
// src/cli.ts - STRUCTURAL ORDER only; full bootstrap: @rules/cli.md.
// 1. Global handlers first - a throw during a command never crashes silently (@rules/errors.md).
process.on("uncaughtException", ...); process.on("unhandledRejection", ...);
// 2. Bootstrap (@rules/cli.md): .env load -> pre-parse the global flags (throwaway commander through withGlobalOptions)
//    -> resolveConfig(flags) -> configureLogger() -> configureProgress().
//    program.opts() is empty until parseAsync, so the flags cannot be read from the real program yet.
// 3. Build the real program (same withGlobalOptions), then compose, unidirectional: runner -> helpers -> services -> command groups.
const sf = new SfHelpers(new SfRunner());                            // Salesforce only: the single owner of the runner
registerOrgCommands(program, { orgService: new OrgService(sf), exportDir: config.exportDir });
registerDataCommands(program, { dataService: new DataService(sf), exportDir: config.exportDir });
// 4. Parse; the boundary maps the outcome to an exit code (toExitCode) - @rules/cli.md.
await program.parseAsync(process.argv);
```

- The global handlers are installed **first** (before parsing) so a throw during a command never crashes silently or leaks a stack to stdout. The services need the resolved config at construction, so the global flags are read by a pre-parse before the real program is built. Composition is unidirectional: `SfRunner` -> `SfHelpers` -> services -> command groups. Full bootstrap (exit-code mapping, `exitOverride`, stdout/stderr discipline): `@rules/cli.md`.
- The other composition roots follow the same order (global handlers first, bootstrap, composition, start): `@rules/use-cases.md`.

## Batch delivery

Sizing is frozen after Phase 2 (`## CALIBRATION` in `CLAUDE.md`). The layered order ships the core (types/errors/config/`logger`/`progress`/`sf`/`output`) first, the business layers next, the composition root last. The tables below are written for the CLI; for another use case, swap `commands/` for its adapter layer, drop `output/`, `progress.ts` and the CLI-only items (`logger.ts` stays in the core where the use case imposes it), and ship its composition root where `cli.ts` ships.

**Small project (3 batches):**

| Batch | Content                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------- |
| 1     | `src/types.ts` + `src/errors.ts` + `src/config.ts` + `src/logger.ts` + `src/progress.ts` (CLI) + `src/sf/` (Salesforce only: runner + helpers, `project.ts` if sfdx) + `src/output/` (CLI) |
| 2     | `src/services/` + adapter layer (CLI: `src/commands/`, Salesforce starter `org.ts`, `data.ts`)             |
| 3     | composition root (`src/cli.ts`) + root configs (`tsconfig.json`, `tsup.config.ts`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `.env.example`, `.gitignore`, `.yarnrc.yml`) + `package.json` + README + `CLAUDE.md` + `.claude/settings.json` + install instructions |

**Medium / Large project (4 batches):** split the business layers so each ships on its own (services are the core, the adapters wire them).

| Batch | Content                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------- |
| 1     | `src/types.ts` + `src/errors.ts` + `src/config.ts` + `src/logger.ts` + `src/progress.ts` (CLI) + `src/sf/` (Salesforce only) + `src/output/` (CLI) |
| 2     | `src/services/`                                                                                            |
| 3     | adapter layer (CLI: `src/commands/`)                                                                       |
| 4     | composition root + root configs (incl. `.yarnrc.yml`, `.prettierignore`) + `package.json` + README + `CLAUDE.md` + `.claude/settings.json` + install instructions |

> **Salesforce integration (only when coupling is confirmed)** - no dedicated batch. `src/sf/runner.ts` + `src/sf/helpers.ts` (the runner and the starter set of typed `sf`-command helpers) ship in **Batch 1** - they are the core the services build on. The starter CLI command group `commands/org.ts` (+ `data.ts`) and their thin services ship with the services/adapter batch (Batch 2 Small · Batch 2-3 Medium/Large). The coupling mode (`standalone` | `sfdx-project`), the CLI `output/` formatters, and the UI add files and push the size up. See `@rules/sf-cli.md` · `@rules/sfdx-project.md`.

### Tests batch (only if Phase 1 tests = Yes)
Add a final dedicated batch - `test/` (mirroring `src/`) + `vitest.config.ts` + dev dependencies (`vitest`; with UI also `jsdom` + `@testing-library/react`) + the `"test"` script. -> Small 4 batches / Medium-Large 5 batches. Patterns and coverage: `@rules/tests.md`.

### Delivery format
- Announcement: `Batch N/[total] - [content]`.
- Files written directly to disk, complete and self-contained blocks.
- Automatic chaining between batches without confirmation.
- Last batch: install/run instructions (`yarn install`, `yarn dev`, `yarn typecheck`, `yarn lint`, `yarn build`) + the `sf` v2 prerequisite note when Salesforce is confirmed (`@rules/sf-cli.md`) + `README.md` at the root (`@rules/readme.md`).

## Anti-patterns - what NOT to do

- **Do not** put business logic in an adapter (command, route, contribution, screen) or a formatter. Adapters parse + delegate + format; services own the logic; `sf/` owns the process (Salesforce); `output/` renders (CLI).
- **Do not** (Salesforce) call `sf`/`cross-spawn` from a command or a service module other than `src/sf/` - every `sf` call goes through `src/sf/runner.ts` (`@rules/sf-cli.md`).
- **Do not** import `commander`, read `process.argv`, or call `process.exit` from a `service`, `sf`, or `output` module - those are CLI concerns owned by `commands/` (set the exit code) and `cli.ts` (call `process.exit`).
- **Do not** let `output/` import `sf/` or a service, or let `sf/` import an entry-point concern - keep the bottom layers dependency-clean.
- **Do not** skip a layer (an adapter reaching into `sf/`, a service formatting output) - the chain is `root -> adapters -> services -> sf`, with `commands -> output` for rendering in a CLI.
- **Do not** (CLI) `console.log` a dataset - route every user-facing dataset through an `output/` formatter with an explicit destination (`@rules/output.md`).
- **Do not** (CLI) emit a progress/status line to `stdout` or from `output/` - the progress reporter (`src/progress.ts`) writes to `stderr` only; a command brackets a file write with a `progress.step`, `output/` stays pure (`@rules/progress.md`).
- **Do not** spread one domain across more files than `service + adapter group`. If it grows, that is a contract change -> declare the deviation (Phase 4 protocol).
- **Do not** put a shared constant in a single layer - promote it to `config.ts`; a shared type to `types.ts`.
- **Do not** (Salesforce) invent an `sf` command or flag from memory - verify against `salesforce-cli-reference/` (`@rules/sf-cli.md`).
- **Do not** write an `npm`, `npx` or `pnpm` command anywhere - every command goes through `yarn` (`@rules/config.md`).

## Anomaly resolution - cleanup protocol

When an anomaly needs several attempts, once the definitive fix is delivered produce a mandatory cleanup report:

```
Anomaly resolved. Elements to remove from the previous attempts:

File [name]:
- [line / block / import / flag / service call / exit-code branch to delete]
- ...
```

- List only the elements added during the failed attempts that are no longer needed.
- Cover all affected files: TS sources, root configs, `package.json`.
- Deliver the complete cleaned files if the user confirms.
- Then offer: "Do you want to remember this point? `/yarn-save-memory`"

## Deletions

Total deletion across all files: code, imports, a command/subcommand or endpoint (its registration + handler + the service it called if now orphaned), flags, types, exit-code branches. Forbidden: commented-out code, empty implementations, residue. Deliver the complete modified files.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: layer responsibilities respected (thin adapters, logic in `services/`, process execution in `sf/` with Salesforce, rendering in `output/` for a CLI) with no layer skipped; unidirectional imports and no entry-point concern (`commander`, `process.argv`, `process.exit`) below the adapters; `Result<T>` flow and exit-code mapping held at the CLI boundary; `stdout`/`stderr` discipline respected (CLI); every command group registered in `cli.ts`; architectural contract (`docs/specs/04-architect.md`) respected. Run silently every batch; cross-file checks on the last batch.
