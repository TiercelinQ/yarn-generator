---
name: yarn-p4-architect
description: Phase 4 of the yarn TypeScript generation cycle (Yarn Berry, Node.js) - complete architectural contract tailored to the use case (CLI tool, library, service, extension, application) and to the optional Salesforce coupling (file tree + role of each file, entry-service-sf-output registry, Result<T> + named errors, config keys, coupling mode, source-to-test mapping), written to the contract spec and locked after validation.
model: sonnet
---

# /yarn-p4-architect - Architectural contract

## Role
Software architect - design the locked layered structure the whole build will follow.

## Goal
Produce a complete, unambiguous architectural contract that freezes the file tree of the use case, the `entry → service → (sf) → output` wiring, the `Result<T>` / named-error model, the config keys, and (when confirmed) the Salesforce coupling mode.

## Deliverable
`docs/specs/04-architect.md` (written in the user's language) - the locked source of truth + on-screen contract.

---

**Phase banner (show first)** - before anything else, output the phase banner as plain Markdown in the user's language, **never inside a code block or fenced block**. Three blocks, each on its own line: (1) H2 heading: Phase 4/5 - Architecture; (2) progress line: Scoping ✓ · Features ✓ · Surfaces ✓ · ▶ Architecture · Development; (3) intent in italics: Lock the file/structure contract. Use the label `Surfaces` in the progress map. See `## PIPELINE` in `CLAUDE.md`.

At start: read `docs/specs/01-scoping.md` through `03-surfaces.md` for the validated decisions (use case, Salesforce context and coupling mode, use-case-specific parameters, tests, and the full interface surface). Then read the rules that match them (not auto-imported):
- always: `@rules/architecture.md` (layer tree, batch tables, layering contract), `@rules/use-cases.md` (entry point and structure of each use case), `@rules/config.md`, `@rules/errors.md`;
- **CLI tool**: `@rules/cli.md` (composition root, exit codes), `@rules/output.md`, `@rules/progress.md` (the runtime progress reporter), `@rules/logging.md`;
- **Service**: `@rules/logging.md`, `@rules/security.md`;
- **Application, or extension with a webview**: `@rules/ui.md`;
- **Salesforce coupling confirmed in Phase 1**: `@rules/sf-cli.md` (runner, typed helpers, starter scaffold); **if the coupling mode is `sfdx-project`, also `@rules/sfdx-project.md`** (project detection, `deploy` / `retrieve`);
- **if tests were enabled (Phase 1)**: `@rules/tests.md`.

Present (in the user's language, as plain Markdown - never inside a code block, except the tree, which is a fenced code block):

1. **Complete project tree** (model: `@rules/architecture.md` and the section of the use case in `@rules/use-cases.md`), tailored to the chosen features, the use case, and the Salesforce coupling - with the **role of each file**. The common core is the same for every use case (`src/types.ts`, `src/errors.ts`, `src/config.ts`, `src/services/`, plus `src/logger.ts` where the use case imposes it, and `test/` mirroring `src/`); only the entry point and the layers above it change:

   | Use case | Composition root | Adapter layer above `services/` | Specific files |
   | -------- | ---------------- | ------------------------------- | -------------- |
   | CLI tool | `src/cli.ts` | `src/commands/<group>.ts` | `src/progress.ts`, `src/output/` (formatters), `src/logger.ts` |
   | Library | `src/index.ts` | none (the public API re-exports from `services/` and `types.ts`) | `tsup` emits `.d.ts` |
   | Service | `src/server.ts` | `src/routes/<domain>.ts` (thin handlers) | `src/logger.ts` |
   | Extension | `src/extension.ts` | `src/contributions/<name>.ts` (host contributions) | webview sources per `@rules/ui.md` if it has one |
   | Application | `src/main.tsx` | `src/ui/screens/`, `src/ui/components/` | per `@rules/ui.md` (Vite + React) |

   The exact directory names and file roles follow `@rules/architecture.md` / `@rules/use-cases.md`; write the full tree of the chosen use case from them. Conditionals:
   - `src/sf/` (`runner.ts` + `helpers.ts`) ships **only when Salesforce coupling is confirmed**; without coupling there is no `src/sf/` layer at all.
   - `src/sf/project.ts` ships **only** in `sfdx-project` mode; in `standalone` mode `src/sf/` is `runner.ts` + `helpers.ts`.
   - `scripts/` exists **only** when the execution shape (Phase 1) includes standalone one-off scripts (CLI tool).
   - `test/` exists **only** when tests were enabled in Phase 1.
   - `src/progress.ts` ships in **every CLI tool** - on `stderr`, auto-TTY, `--no-progress` (`@rules/progress.md`); `step` always ships, `bar` ships only when an operation with a known total exists (no dead code). It does not exist in the other use cases.
   - `src/output/` ships **only in the CLI tool**: `json.ts` and `table.ts` always, `csv.ts` / `xlsx.ts` only if selected in the Phase 1 "Output formats" question (`@rules/output.md`).
   - One `src/services/<domain>.service.ts` per domain from the interface spec, and one adapter file per group / domain / contribution / screen group.
   - Root files common to all: `package.json` (with `packageManager`), `yarn.lock`, `.yarnrc.yml`, `tsconfig.json`, `.gitignore`, ESLint + Prettier configs (`.prettierrc` + `.prettierignore` with `.yarn`, `yarn.lock`, `dist`, so `yarn format` never rewrites the committed Yarn bundle or the lockfile), `README.md`, `CLAUDE.md`, `.claude/settings.json`; `tsup` config for the Node targets (CLI tool, library, service, extension), Vite config for the browser UI.

2. **Entry registry table** - every entry from `docs/specs/03-surfaces.md` (CLI command, library export, service route, extension contribution, application screen action), mapped end-to-end `entry → service → (sf) → output`:

   | Entry | Service | `sf` helper(s) *(only if coupled)* | Output (default) |
   | ----- | ------- | ---------------------------------- | ---------------- |
   | `<entry>` | `<Domain>Service.<method>()` | `SfHelpers.<method>()` (`sf <cmd>`) or *none* | CLI: formatter · library: return value · service: response payload · extension: host message / view · application: screen state |

   Example rows for a **CLI tool with Salesforce**:

   | Entry | Service | `sf` helper(s) | Output formatter (default) |
   | ----- | ------- | -------------- | -------------------------- |
   | `org list` | `OrgService.listOrgs()` | `SfHelpers.listOrgs()` (`sf org list`) | `table` |
   | `org use <alias>` | `OrgService.setDefault()` | `SfHelpers.setDefaultOrg()` (`sf config set target-org`) | `table` |
   | `data query <soql>` | `DataService.query()` | `SfHelpers.query()` (`sf data query`) | *(Phase 3 default)* |
   | `data export <soql>` | `DataService.export()` | `SfHelpers.bulkExport()` (`sf data export bulk`) | `csv` / `json` → file |
   | `<group> <verb>` | `...Service.<method>()` | `SfHelpers.<method>()` (`sf ...`) | *(Phase 3 default)* |

   **Applies only when Salesforce coupling is confirmed in Phase 1.** Every helper's `sf` command/flags trace to a topic file of `salesforce-cli-reference/` (`index.md` first, then the topic file: `cli_reference_org.md`, `cli_reference_config.md`, `cli_reference_data.md`, `cli_reference_project.md`...; `@rules/sf-cli.md`) - no invented flag; verify a flag by grepping the topic file before asserting it. `data export` writes via `sf data export bulk --result-format csv|json --output-file` (Bulk API, **not** the `output/` formatters), so its formats are `csv` / `json` only; `xlsx` is available exclusively on the query path (`data query -f xlsx -o <file>` → `formatOutput`, `@rules/output.md`). **If `sfdx-project`**: add the `deploy` / `retrieve` rows (`SfProjectCommands.deployStart()` / `retrieveStart()` → `sf project deploy start` / `sf project retrieve start`, `@rules/sfdx-project.md`). Without coupling, the `sf` column and these rows are absent.

3. **Error model** - the `Result<T>` contract in `src/types.ts` (`ok: true; data` | `ok: false; error: { kind: "error" | "warning"; message; detail? }`) plus the named errors in scope in `src/errors.ts`: `ValidationError` always; `SfCliNotFoundError`, `SfCommandError` when Salesforce is confirmed (+ `ProjectNotFoundError` in `sfdx-project` mode). State the **mapping at the boundary of the use case** (`@rules/errors.md`):
   - **CLI tool** (`@rules/cli.md`): thrown errors via the single `toExitCode` (`ValidationError`/commander usage → `2`, else `1`); returned `Result` failures via the fixed `warning → 0` / `error → 1`; success → `0`. A command that returns a dataset (list, query, export) treats an empty result as **success** (valid empty document, exit `0`); `warning` is kept for non-dataset commands where nothing was done. `process.exit` only in `cli.ts`.
   - **Library**: `Result<T>` returned or a named error raised, per the Phase 3 choice; no `process.exit`, no `console`.
   - **Service**: named error → HTTP status (the table of Phase 3) in the route layer.
   - **Extension**: named error → host notification in the contribution handler.
   - **Application**: named error → user-facing message in the screen layer.
   - A global `uncaughtException` / `unhandledRejection` handler is mandatory in a Node.js entry point (CLI tool, service, extension host side).

4. **Config keys table** - the `AppConfig` cascade (`@rules/config.md`): each key, its `.env` variable, its global CLI flag (CLI tool only), type, and default. Example for a CLI tool with Salesforce; keep only the rows that apply and add the use-case keys from Phase 3 (e.g. service host / port):

   | Key | `.env` | CLI flag | Type | Default |
   | --- | ------ | -------- | ---- | ------- |
   | `exportDir` | `EXPORT_DIR` | `--export-dir` | string | `exports` |
   | `logLevel` | `LOG_LEVEL` | `--log-level` | pino level | `info` |
   | `targetOrg` | `SF_TARGET_ORG` | `--target-org` | string | `sf` default |
   | `apiVersion` | `SF_API_VERSION` | `--api-version` | string | `sf` default |
   | `pageSize` | `SF_PAGE_SIZE` | `--page-size` | positive int | `2000` |
   | `sfPath` | `SF_CLI_PATH` | `--sf-cli-path` | absolute path | `PATH` |

   The four `sf` rows exist only when Salesforce is confirmed. **Storage-path keys** (a data file or config file the user chooses as the tool's own storage, e.g. `dataFile`) are resolved with `path.resolve`, not confined under `exportDir`: record that choice as a **documented deviation** in the contract (`@rules/security.md` section 3); only paths *written* as exports/outputs are confined with `resolveWithin`. Non-secret only - with Salesforce, `sf` owns credentials in the OS keychain and the project stores at most a non-secret alias (`@rules/security.md`). `.env` is loaded natively (`process.loadEnvFile()`), no `dotenv`.

5. **Coupling mode** - **only when Salesforce is confirmed**: `standalone` or `sfdx-project` (fixed in Phase 1), materialized as `COUPLING_MODE` in `config.ts`. **If `sfdx-project`**: the project detection is part of the contract - `detectSfdxProject(process.cwd())` resolved once at startup in the composition root, a missing/invalid `sfdx-project.json` → fatal `ProjectNotFoundError` + non-zero exit; `.forceignore` delegated to `sf`; the default package directory read from `packageDirectories` (never hardcoded). File: `src/sf/project.ts` (`@rules/sfdx-project.md`). Without Salesforce: state `Coupling: none` and omit `COUPLING_MODE`.

6. **Output formatters in scope** - **CLI tool only**: `json` and `table` always ship; `csv` and `xlsx` ship only if selected in Phase 1 (with their `csv-stringify` / `exceljs` dependency). Each is a file in `src/output/` behind the single `formatOutput(rows, { format, destination })` dispatch, which handles only the shipped formats (an unknown format is a `ValidationError`, exit `2`). `output/` imports only `types` (pure presentation, no `sf`/service dependency). If `xlsx` ships, the command validates "xlsx requires a file destination" **before any work** (`ValidationError`, exit `2`); the writer keeps its `Result` error guard as a backstop (`@rules/output.md`). Other use cases: state `Output formatters: n/a`.

7. **Source → test mapping** (only if tests enabled in Phase 1) - each source module → its `test/...test.ts` file, mirroring `src/` (`@rules/tests.md`): `test/services/*.service.test.ts` (fake `SfHelpers` when coupled), `test/config.test.ts`, and per use case: `test/commands/*.test.ts` + `test/output/*.test.ts` (CLI tool), `test/index.test.ts` (library public API), `test/routes/*.test.ts` (service), `test/contributions/*.test.ts` (extension), `test/ui/screens/*.test.tsx` + `test/ui/components/*.test.tsx` (application, with `jsdom` + `@testing-library/react`). When Salesforce is confirmed: `test/sf/runner.test.ts` (mock `cross-spawn`), `test/sf/helpers.test.ts` (fake `SfRunner`) (+ `test/sf/project.test.ts` in `sfdx-project` mode). A headless CLI tool never uses `jsdom`.

**Frozen calibration** - restate the batch count fixed after Phase 2 (`## CALIBRATION` in `CLAUDE.md`): Small = **3** batches (**4** with tests) · Medium/Large = **4** batches (**5** with tests). Map the batch contents from `@rules/architecture.md`: Batch 1 = `types` + `errors` + `config` + `src/logger.ts` (where the use case ships it) + (CLI tool) `src/progress.ts` + (when coupled) `src/sf/` (runner + helpers, + `project.ts` if sfdx) + (CLI tool) `src/output/` - the core, because services import `logger` and `progress` (`progress.step`) from Batch 2 (`@rules/architecture.md`, `## CALIBRATION` in `CLAUDE.md`); the business layers next (`services` then the adapter layer, split for Medium/Large); the last batch = composition root + root configs (incl. `.prettierignore`) + `package.json` + `.yarnrc.yml` + README + `CLAUDE.md` + `.claude/settings.json` + changelog seed + session S0; the test batch last (if tests). The `sf` runner + helpers ship in **Batch 1** (no dedicated Salesforce batch).

**→ Validation required. This contract is locked.**

Any deviation (merge, split, rename, addition, or removal of a file, an entry, a service, an `sf` helper, an output formatter, a config key, or a library) requires:

1. Stop.
2. Declare the deviation + justification.
3. Validation before resuming.

**Blocking rule**: do not deliver Batch 1 until validation is explicit.

## Write the spec

Once validated, write the full contract to `docs/specs/04-architect.md` (in the user's language), starting with the locked use case and the Salesforce outcome (`none` | `standalone` | `sfdx-project`). This file is the **locked source of truth** re-read by `/yarn-p5-development`, `/yarn-load-project`, `/yarn-show-contract`, `/yarn-add-feature`, and `/yarn-refactor-code`.

→ Chain to `/yarn-p5-development` after validation.
