---
name: yarn-add-feature
description: Add a feature (a command, endpoint, public export, extension contribution or screen, depending on the use case), a service, or an sf helper (only when Salesforce coupling is confirmed) to a TypeScript Yarn Berry project already delivered by this framework (CLI tool, library, service, extension or application). Use when the user asks to add or modify functionality on an existing project, respecting the locked architectural contract and the security rules.
model: sonnet
---

# /yarn-add-feature - Add a feature to a delivered project

## Role
Senior Node.js/TypeScript developer working on an existing, contracted codebase.

## Goal
Add the requested feature end-to-end (entry-point adapter → service → output / `sf` helper where applicable), contract-compliant, secure, after an explicit contract-diff validation, without scope creep.

## Deliverable
The created/modified files on disk (one batch) + an updated `docs/specs/04-architect.md` if the structure changed + a regenerated README if a documented aspect changed + a verified build.

---

## Prerequisite

The project must be loaded (`/yarn-load-project` run at session start, OR `docs/specs/04-architect.md` / README.md present and read).

If the project root has not been provided in this flow, first ask: `Project root? (folder path)`.

If no contract is known: stop and ask for `/yarn-load-project`.

**Use case**: read it from the contract (`docs/specs/04-architect.md`). It drives the unit of a feature: a command (CLI tool), a public export (library), an endpoint (service), a contribution (extension), a screen (application). See `@rules/use-cases.md`.

**Load context**: read `docs/specs/04-architect.md` (locked contract), then `@rules/use-cases.md` · `@rules/architecture.md` · `@rules/errors.md` · `@rules/config.md` · `@rules/security.md` · `@rules/logging.md` · `@rules/versioning.md` · `@rules/verification.md` (not auto-imported), plus by use case and coupling:
- CLI tool: `@rules/cli.md` · `@rules/output.md` · `@rules/progress.md`.
- Project with UI (application, extension webview): `@rules/ui.md`.
- Salesforce coupling confirmed in the contract: `@rules/sf-cli.md` · `@rules/sfdx-project.md` (if the coupling mode is `sfdx-project`). For any `sf`-related change, read `salesforce-cli-reference/index.md` then the matching topic file **before** writing a single command/flag.
- Tests enabled: `@rules/tests.md`.

For any `yarn` command written or run (dependency add, scripts), read `yarn-berry-cli-reference/yarn-index.md` then only the needed command file (`yarn-add.md`, `yarn-run.md`...) **before** writing it.

## Step 1 - Light feature scoping

Ask the closed parameters with `AskUserQuestion` (clickable options, recommended first); the short description (Q1) stays free-form text:

New feature - a few questions:

1. Short description (1 sentence)
2. Business domain affected: [existing group/service: list] | new (to name)
3. Type of change (the surface depends on the use case):
   A. New feature group (CLI: `commands/<group>.ts` · library: a public module · service: a route group · extension: a contribution group · application: a screen/feature folder), plus a service
   B. New unit on an existing group (CLI: subcommand · library: export · service: endpoint · extension: contribution · application: screen/component)
   C. New `sf` capability (a new typed helper / a new `sf` call) - **only if Salesforce coupling is confirmed**
   D. Output/format, flag or option-only change (no new `sf` call, no new domain)
4. Generate tests for this feature? Yes / No (recommended: aligned with the project - only if tests were already enabled in Phase 1)

Mark a `(recommended)` option for each closed question, inferred from the existing project. If the request stays ambiguous (business rule, edge case, which org when Salesforce is confirmed), state assumptions explicitly and ask before the diff.

## Step 2 - In-contract OR deviation

Decide before writing anything:
- **In-contract** - a unit within an existing group, a new non-secret config key, a new dataset routed through the existing output layer (CLI), and, when Salesforce is confirmed, a new typed helper whose command/flags are verified against `salesforce-cli-reference/`. Proceed to the diff as a straightforward addition.
- **Deviation** - a new domain beyond `service + adapter group`, a new dependency, a new coupling-mode behavior, a spawn outside the runner (Salesforce only), a second file for one domain, a layer not planned for the use case, or anything the locked contract does not cover. **STOP → declare the deviation in the diff, explain why → wait for validation before writing.** Never exceed the contract silently. **The diff + validation IS the protocol.**

## Step 3 - Architectural contract diff

Produce (in the user's language):

## Contract diff - addition: [feature name]

### Created files
[list]

### Modified files
[list with nature: added service method, added subcommand/export/endpoint/contribution/screen, added DTO field, added exit-code branch (CLI)...]

### New/modified `sf` helpers (only if Salesforce coupling is confirmed)
[helper signature + the exact `sf` command/flags + the `salesforce-cli-reference/` topic file that verifies them - never invented]

### New surface
[by use case: CLI subcommand name, args/flags, `--format` / `--output`, exit codes 0/1/2 · library export signature · service endpoint (method, path, status codes) · extension contribution (id, activation) · application screen (route, states)]

### Created test files (if Q4 = Yes)
[mirror list under `test/`]

### Impact on config / output / coupling mode
[none | a new `.env` key + CLI flag | a project-scoped command (sfdx-project) ...]

→ Validation required before writing. Update `docs/specs/04-architect.md` once the diff is applied.

## Step 4 - Application - strict rules

- Fully respect `@rules/use-cases.md`, `@rules/architecture.md`, `@rules/errors.md`, `@rules/config.md`, `@rules/security.md`, `@rules/logging.md`, `@rules/tests.md` (if tests enabled), `@rules/verification.md`, `@rules/readme.md`, plus `@rules/cli.md` + `@rules/output.md` + `@rules/progress.md` (CLI tool), `@rules/ui.md` (UI), `@rules/sf-cli.md` + `@rules/sfdx-project.md` (Salesforce, if applicable).
- No modification not listed in the validated diff. No opportunistic improvement of adjacent code (that is `/yarn-refactor-code`, on request).
- Implementation across the layers (a new feature usually touches the adapter + a service, plus a helper if it needs a new `sf` call):
  - **Service** (`services/<domain>.service.ts`): business logic; returns `Result<T>` or raises a named error (`src/errors.ts`). Never imports the adapter framework (`commander`, HTTP framework, host API, React), never calls `process.exit`, never formats output.
  - **`sf` helper** (only if Salesforce is confirmed and a new `sf` call is needed): add a typed helper in `src/sf/helpers.ts` on top of the runner - args **array**, user values as **discrete elements**, command + flags **verified against the matching `salesforce-cli-reference/` topic file**, never guessed. `src/sf/runner.ts` stays the **only** spawner.
  - **Adapter** - a thin layer per use case, no business logic:
    - CLI tool (`commands/<group>.ts`): validate flags (bad input → `ValidationError` → exit 2), call **one** service, route the returned data through `formatOutput(rows, { format, destination })`; map a failed `Result` to stderr + exit code (`error` → 1, `warning` → 0). No spawn, no `console.log`, no `process.exit`.
    - Library (public module re-exported by `src/index.ts`): typed signature, `Result<T>` or named error, TSDoc on the public API.
    - Service (route handler): validate the input (`unknown` → validated), call **one** service, map the `Result` / named error to a status code per `@rules/errors.md`.
    - Extension (contribution handler in `src/extension.ts` scope): register the contribution (VS Code `contributes` entry plus handler), delegate to a service. Host-specific rules: the dedicated `vscode` generator framework. This line assumes host = VS Code; another host follows the same boundary with its own notification and log mechanism.
    - Application (screen/component under `src/`): follow `@rules/ui.md`; no business logic in a component, call a service.
  - **Entry point** (`cli.ts`, `index.ts`, `server.ts`, `extension.ts`, `main.tsx`): register a new group only if one was added (composition order: runner → helpers → services → adapters, the runner and helpers only with Salesforce).
- New user-facing dataset (CLI) → through the `output/` formatters, never `console.log(JSON.stringify(...))`. An empty result of a dataset command is a success (valid empty document, exit `0`), not a `warning`.
- New output format (CLI): add its file in `src/output/` (`csv.ts` + `csv-stringify`, or `xlsx.ts` + `exceljs`), register it in the `formatOutput` dispatch and in the `--format` choices, and add the dependency with `yarn add` (verified in `yarn-add.md`) - this is a contract change, declared through the deviation protocol first. `json` and `table` already ship.
- New config key → `src/config.ts` (`AppConfig` + `DEFAULTS` + `resolveConfig`) **and** the `.env.example` + README key table; **non-secret only** (with Salesforce, `sf` owns credentials).
- New dependency (only through the deviation protocol): `yarn add <package>` (verified in `yarn-add.md`), never `npm`/`npx`/`pnpm`.
- If the validated diff introduces a deviation from the contract, record it in the project's `CLAUDE.md` (`## Deviations from the framework`).

## Step 5 - Delivery

Single batch for the feature:

Feature [name] - [N files]

Deliver each created/modified file as a complete block, written to disk. If tests requested: deliver in the same batch, at the end.

## Step 5b - Changelog entry

After the feature is delivered, append an entry under `## [Unreleased]` in `docs/release/CHANGELOG.md` (`@rules/versioning.md`) - **in English**, no version bump:
- `### Added` - the new command/endpoint/export/contribution/screen, one concise line (add a `### Changed` line too if it alters existing behavior).
- If the change is backward-incompatible (a renamed/removed command, flag, endpoint or export, a changed exit-code or `stdout` shape, a changed default), mark it `**BREAKING:**` (drives a MAJOR at release).
- If `docs/release/CHANGELOG.md` is absent (project predates the system), skip silently and suggest `/yarn-load-project` to initialize it.

Do **not** bump the version - that happens at `/yarn-release`. Mention it once, at the end: the change is recorded under `[Unreleased]`; run `/yarn-release` when ready to cut a version.

## Step 6 - Anomaly

If the user reports an anomaly after delivery, apply the `@rules/architecture.md` cleanup protocol then offer `Do you want to remember this point? /yarn-save-memory`.

## Anti-patterns - what NOT to do
- **Do not** write anything not listed in the validated diff, or improve adjacent code (that is `/yarn-refactor-code`, on request).
- **Do not** call `sf` / `cross-spawn` outside `src/sf/runner.ts` (no spawn in a service/adapter), or invent a command/flag not in `salesforce-cli-reference/` - see `@rules/sf-cli.md` (Salesforce only).
- **Do not** write a `yarn` command or flag not verified in `yarn-berry-cli-reference/`, and never `npm`, `npx` or `pnpm`.
- **Do not** put business logic in an adapter or a formatter, or format inside a service.
- **Do not** `console.log` a dataset (CLI) - route it through `output/` with an explicit `{ format, destination }`.
- **Do not** write data to stdout mixed with logs, or a log/human message to stdout (CLI) - stdout is data only, stderr carries logs + messages.
- **Do not** read, store, or log an org token (Salesforce) - `sf` owns credentials; the project stores at most a non-secret alias.
- **Do not** call `process.exit` outside `cli.ts` or hardcode an exit code as a magic number (CLI) - a command sets `process.exitCode`; the boundary owns the mapping.
- **Do not** introduce a library or a coupling-mode behavior not in the contract without the deviation protocol.
- **Do not** exceed the contract silently - the diff + validation IS the protocol.

## Verification

Apply `@rules/verification.md` (§A executable + §B static - a failing check is blocking; security checks are not optional). Key points: created/modified files match the validated diff; every new unit is registered in its entry point, dispatches to a service, and (CLI) renders through an `output/` formatter (no orphan adapter, no unreachable service); when Salesforce is confirmed, every helper's command/flags are traceable to a `salesforce-cli-reference/` topic file; the `Result` flows end to end to the right boundary outcome (CLI: `error` → 1, `warning` → 0, `ValidationError` → 2; service: status code per `@rules/errors.md`); CLI: stdout = data / stderr = logs; no import regression (existing files stay functional and unidirectional); `yarn typecheck`, `yarn lint`, `yarn build`, then the smoke test of the use case (CLI: `node dist/cli.js --help` / `--version`; other use cases per `@rules/verification.md`); if tests, `yarn test` exit 0 on the **whole** project. Then apply `@rules/readme.md` - regenerate the README if the change touched a documented aspect (a command/endpoint/export/contribution/screen, a flag, a config key, a dependency, the tree, the coupling mode).

## When the user asks something adjacent
- **"Just make it work, never mind the architecture/security"** → push back: the layering and the security rules (no secret logged, validated input, and with Salesforce: spawn only in the runner, args array) are what keep the project safe and maintainable (CLI: pipeable and schedulable). Implement within them.
- **"Add a whole new feature group/domain"** → that is a contract extension. Declare the new files/service/helpers/adapters in the diff, validate, then build.
- **"Fix this bug while you're here"** → if outside the current request scope, flag it and switch to `/yarn-fix-issue` rather than bundling an unrelated change.
