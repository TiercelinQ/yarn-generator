---
name: yarn-p5-development
description: Phase 5 of the yarn TypeScript generation cycle (Yarn Berry, Node.js) - development and batch delivery of a CLI tool, library, service, extension or application (optional Salesforce coupling), files written directly to disk, executable verification with yarn (install/typecheck/lint/build/smoke), final README + CLAUDE.md + .claude/settings.json + Yarn Berry files.
model: sonnet
---

# /yarn-p5-development - Batch development

## Role

Senior Node.js/TypeScript developer - build the contracted project to a clean, buildable state.

## Goal

Deliver the project in batches, each typecheck/lint/build-clean and contract-compliant, ending with install/run instructions and a verified build.

## Deliverable

The full project source on disk + `README.md` + `CLAUDE.md` + `.claude/settings.json` + the Yarn Berry files + a verified build.

---

**Phase banner (show first)** - before anything else, output the phase banner as plain Markdown in the user's language, **never inside a code block or fenced block**. Three blocks, each on its own line: (1) H2 heading: Phase 5/5 - Development; (2) progress line: Scoping ✓ · Features ✓ · Surfaces ✓ · Architecture ✓ · ▶ Development; (3) intent in italics: Deliver the project in batches. Use the label `Surfaces` in the progress map. See `## PIPELINE` in `CLAUDE.md`.

## Code rules

At start, read and fully apply: `@rules/architecture.md` · `@rules/use-cases.md` · `@rules/errors.md` · `@rules/config.md` · `@rules/security.md` · `@rules/versioning.md` · `@rules/verification.md` (not auto-imported), plus the rules of the use case: `@rules/cli.md` · `@rules/output.md` · `@rules/progress.md` (CLI tool) · `@rules/logging.md` (CLI tool and service) · `@rules/ui.md` (application, extension webview) · `@rules/distribution.md` (library, extension, service, application: release channel). **Applies only when Salesforce coupling is confirmed in Phase 1**: `@rules/sf-cli.md`, and `@rules/sfdx-project.md` (if coupling mode = `sfdx-project`). `@rules/tests.md` (if tests). Read `docs/specs/04-architect.md` - the **locked contract** this build follows. Verify every `yarn` command and flag against `yarn-berry-cli-reference/` (`yarn-index.md` first, then the matching command file) and, when coupled, every `sf` command/flag against `salesforce-cli-reference/` **by topic** (`index.md` first, then the matching `cli_reference_<topic>.md`) - never invent one.

Critical reminders:

- ESLint clean · Prettier · TypeScript strict · TSDoc on classes and public API. Zero `// TODO`, zero unjustified empty implementation, zero unjustified `any` (external data - `sf --json`, files, args, env, request bodies - is `unknown` then validated).
- **Layering** (`@rules/architecture.md`): adapter layer (`commands` for a CLI tool / extension, `routes` for a service, `screens` for an application, the public API for a library: thin, parse/validate input → call one service → present) → `services` (business logic, returns `Result<T>`) → `sf` (process execution, only when coupled) + `output` (formatting, CLI tool); the composition root of the use case (`cli.ts`, `index.ts`, `server.ts`, `extension.ts`, `main.tsx`) is the only place that wires layers. No layer skips another; an adapter never spawns `sf`, a service never formats.
- **`sf` runner** (only when Salesforce is confirmed, `@rules/sf-cli.md`): every `sf` call via `src/sf/runner.ts` using **`cross-spawn`** with an args array (`--json` appended) - never `node:child_process`, never a concatenated shell string, never a spawn from an adapter/`services`. Binary resolved from `SF_CLI_PATH` / `sfPath` else `PATH` (cross-OS, no platform branch); `ENOENT` → a clear "sf not found" error. `sf` v2 only, never `sfdx`. Large text args (SOQL/SOSL) go through `runWithLargeArg` (temp `--file` / `--query-file` when they would overflow the Windows ~8191-char command line); `run()` guards the length and fails clearly, never the opaque "Réponse sf illisible".
- **Error contract** (`@rules/errors.md`): library layers return `Result<T>` or raise a named error; the boundary of the use case maps a failed `Result` to a user-facing message (CLI tool: `stderr` + exit code, `error → 1`, `warning → 0`, thrown errors via `toExitCode`). Global `uncaughtException` / `unhandledRejection` handlers mandatory in a Node.js entry point.
- **CLI I/O (CLI tool)** (`@rules/cli.md`): `stdout` = data only (pipeable); `stderr` = logs + human messages. Exit codes `0`/`1`/`2` mapped at the boundary; `process.exit` only in `cli.ts` (a command sets `process.exitCode`).
- **Output (CLI tool)** (`@rules/output.md`): every dataset through `formatOutput(...)`; no `console.log(JSON.stringify(...))`. Ship `json.ts` + `table.ts` always, `csv.ts` / `xlsx.ts` (+ `csv-stringify` / `exceljs`) only if selected in Phase 1; `formatOutput` and the `--format` choices cover only the shipped formats, an unknown format is a `ValidationError` (exit `2`). An empty dataset is a **success** (valid empty document, exit `0`). If `xlsx` ships, the command rejects a missing file destination with a `ValidationError` before any work (the writer keeps its `Result` guard as a backstop).
- **Logging** (`@rules/logging.md`): `src/logger.ts` (pino → file + `stderr`) for the CLI tool and service, the log file at `~/.<tool>/logs/app.log` for a CLI tool (it runs from any folder) and `process.cwd()/logs/app.log` only for a service started from its project directory; zero `console.log`/`console.error` in delivered code; never log a token/secret; pino order is `(object, message)`. Other use cases follow `@rules/use-cases.md`.
- **Runtime feedback (CLI tool)** (`@rules/progress.md`): every CLI tool ships `src/progress.ts` (`step` always, `bar` only when an operation with a known total exists, no dead code); services wrap each long operation with `progress.step` (a count on success), commands bracket the file write. The reporter writes **only** to `stderr`, auto-on a TTY, `--no-progress` disables it; `cli.ts` raises the `pino` level to `warn` while it is active. `output/` never imports `progress`; no `console.*`; no new dependency.
- **UI (application, extension webview)** (`@rules/ui.md`): Vite + React + TypeScript strict, conventions of that file.
- **Secrets** (`@rules/security.md`): with Salesforce, `sf` owns credentials in the OS keychain; a non-secret alias at most in `.env`; a path **written** as an export/output is resolved + confined under `exportDir` (`resolveWithin`); a path the user **chooses as the tool's own storage** (data file, config file) is resolved with `path.resolve`, not confined, and is declared as a documented deviation in the Phase 3/4 specs and the generated `CLAUDE.md`; no `eval`/`vm` on untrusted input.
- **Yarn Berry** (`@rules/config.md`): scripts run with `yarn <script>`; dependencies added with `yarn add` (dev: see `yarn-add.md`); never `npm`, `npx`, `pnpm`, `package-lock.json`.
- No library that was not validated in Phase 1.

## Anti-patterns - what NOT to do

- **Do not** deviate from `docs/specs/04-architect.md` silently - any structural change triggers the deviation protocol (stop, declare, validate) from `@rules/architecture.md`.
- **Do not** weaken a security rule to make something work (`@rules/security.md`) - args array via `cross-spawn`, validated `unknown` input, confined export paths, no token stored/logged.
- **Do not** (when coupled) spawn `sf` from an adapter or a service, build the `sf` args as a shell string, or expose `sf`'s raw `--json` as the public output (emit the project's own DTO / `--format json`).
- **Do not** call `process.exit` outside `cli.ts`, write data to `stderr` or a log to `stdout`, or `console.log` a dataset.
- **Do not** run `npm`, `npx` or `pnpm`, create a `package-lock.json`, or commit `.yarn/cache`.
- **Do not** leave a `// TODO`, an empty body, or a placeholder. Each batch is complete and self-contained.
- **Do not** introduce a library, a `yarn` command/flag, or an `sf` command/flag not in the contract / not traceable to the reference catalogs.
- **Do not** mark the work done while `@rules/verification.md §A` is failing (see Verification).

## Delivery

- Write to the project root chosen at the start of the flow (via `/yarn-app` or `/yarn-p1-scoping`); if it was not set in this flow, ask for it once: `Destination folder for the files? (e.g. C:\projects\my-project)`.
- Create the folders and write the files **directly to disk** - no manual action required.
- Announcement (in the user's language): `Batch N/[total] - [content]`.
- Automatic chaining between batches without confirmation.
- After each delivered batch, if the session is running long or the context is heavily loaded, offer `/yarn-save-session` before starting the next batch - the automatic chaining above stays the default.
- Batch split: the tables in `@rules/architecture.md` (Small 3 / Medium-Large 4, frozen in Phase 2; +1 test batch if tests). **When Salesforce is confirmed**, the **`sf` runner + helpers ship in Batch 1** (the core the services build on); the starter `org` / `data` groups (CLI tool) or their equivalents in the interface of the use case ship with the services/adapters batch. In `sfdx-project` mode, `src/sf/project.ts` ships in Batch 1 and the `deploy` / `retrieve` features with the adapters batch. **`src/logger.ts` and (CLI tool) `src/progress.ts` ship in Batch 1** (the core): services import them from Batch 2 (`progress.step`). The composition root ships in the last batch, after the services and adapters it registers, with the root configs, `package.json`, README, `CLAUDE.md`, `.claude/settings.json`, the changelog seed and session S0 (`@rules/architecture.md`, `## CALIBRATION` in `CLAUDE.md`).

## Verification

Apply `@rules/verification.md` - both the executable commands (§A, blocking when the env is available) and the static integrity checks (§B). Silent - reported only on a discrepancy. Cross-file checks run on the last batch.

## Last batch - mandatory extra deliverables

- **The composition root of the use case**, written with every registered group / export / route / contribution / screen (`@rules/architecture.md` batch tables), following the strict composition order of `@rules/architecture.md` and `@rules/use-cases.md` (`src/logger.ts` and, for a CLI tool, `src/progress.ts` were delivered in Batch 1; the root only configures them). For the **CLI tool** (`src/cli.ts`, `@rules/cli.md`): global `uncaughtException` / `unhandledRejection` handlers first → `process.loadEnvFile()` (guarded) → **pre-parse the global flags** (commander option values are empty until `parseAsync`, and the services need the resolved config at construction): one `withGlobalOptions(cmd)` function declares the global options once, a throwaway `new Command().allowUnknownOption().allowExcessArguments().helpOption(false).exitOverride()` is passed through it and `.parse(process.argv).opts()` gives the flags → `resolveConfig()` from those flags → `configureLogger()` → decide progress activation + `configureProgress()` (auto-on a TTY, off under `--no-progress` / `CI` / debug; raises the `pino` level to `warn` while active) → build the real `commander` program with the same `withGlobalOptions` (`.name` / `.description` / `.version(APP_VERSION)` / `.exitOverride()` / `configureOutput` errors → `stderr`) → (when coupled) `SfRunner` → `SfHelpers` → services constructed with the resolved config → register command groups → `parseAsync` in a `try/catch` mapping the outcome to an exit code. `APP_VERSION` in `config.ts` is `import pkg from "../package.json" with { type: "json" }` then `export const APP_VERSION = pkg.version;` (a named import from a JSON module is invalid). **If `sfdx-project`**: `detectSfdxProject(process.cwd())` at startup, fatal `ProjectNotFoundError` if absent. The other roots follow the same order adapted to their use case (library: re-exports only, no side effect at import; service: config → logger → services → routes → listen + graceful shutdown; extension: `activate` / `deactivate`; application: `main.tsx` mounts the app).
- **`package.json`** + the Yarn Berry files + the root configs per `@rules/config.md`:
  - `package.json`: `"type": "module"`, `"engines": { "node": ">=24" }`, **`"packageManager": "yarn@4.x.y"`** (pin the exact version with `yarn set version 4.x`, see `yarn-set-version.md`), `"version": "1.0.0"`, scripts `dev` / `build` / `typecheck` / `lint` / `format` (+ `test` only if tests enabled), caret-pinned dependencies matching the Phase 1 selection - the **validated ranges of `@rules/config.md` are written as they stand** (for example `eslint ^10.12.0`, not `^10`); never loosen or re-derive a range there. CLI tool: `bin → dist/cli.js`. Library: `exports` / `types` / `"files": ["dist"]`. Other use cases: fields per `@rules/use-cases.md` and `@rules/distribution.md`. Distribution is personal by default; an external target and artifact format exist only if Phase 1 recorded them in `docs/specs/01-scoping.md`.
  - **`.yarnrc.yml`** (no zero-install, `.yarn/cache` not committed):

    ```yaml
    nodeLinker: node-modules
    ```

  - **`yarn.lock`** generated by `yarn install` and committed.
  - `tsconfig.json` (strict, `moduleResolution: "bundler"`, extensionless imports), `tsup.config.ts` for the Node targets (CLI tool: bundle `src/cli.ts` → `dist/cli.js`, esm, `target: node24`, shebang, `clean`; library / service / extension: their entry, esm, `dts` for a library), `vite.config.ts` for the browser UI (application, extension webview, `@rules/ui.md`), `eslint.config.mjs` (flat config), `.prettierrc`, **`.prettierignore`** (`.yarn`, `yarn.lock`, `dist`: Yarn Berry commits `.yarn/releases/*.cjs`, and `yarn format` runs `prettier --write .`, which would otherwise rewrite the Yarn bundle and the lockfile), `.env.example` (non-secret keys only).
  - **`.gitignore`** (the completed template in `@rules/config.md §.gitignore` - the common Claude Code socle + the Yarn Berry additions below; ignores `tasks/`, `.claude/settings.local.json` + `.claude/agent-memory/`, and `docs/specs/`, while keeping `docs/release/CHANGELOG.md`, `.claude/settings.json`, the generated `CLAUDE.md`, `test/`, and `scripts/` tracked):

    ```gitignore
    .yarn/*
    !.yarn/patches
    !.yarn/plugins
    !.yarn/releases
    !.yarn/sdks
    !.yarn/versions
    .pnp.*
    node_modules/
    /dist/
    .env
    logs/
    exports/
    ```

    `logs/` covers a service started from its project directory; a CLI tool logs under the user's home (`~/.<tool>/logs/app.log`), outside the repository.

- **`README.md`** at the root (`@rules/readme.md`): objective · the interface of the use case (CLI: commands & subcommands with positional args / flags / exit codes; library: public API; service: endpoints; extension: contributions; application: screens) · stack & dependencies · file tree · config keys (`.env` variables + CLI flags for a CLI tool) · **Salesforce prerequisite, only when coupled** (cross-OS `sf` v2 install + `SF_CLI_PATH` fallback + the coupling mode this project was generated for: `standalone` or `sfdx-project`) · output formats (CLI tool: the formats shipped, `json` + `table` always, `csv` / `xlsx` if selected) · runtime progress display (CLI tool: auto-on a TTY, `--no-progress`) · install & run (`yarn install`, `yarn build`, then the run command of the use case, e.g. `node dist/cli.js ...` for a CLI tool) · for a CLI tool, a **scheduling note** (cron / Windows Task Scheduler: redirect `stdout` → a data file, `stderr` → a log, the exit code drives success/failure alerting) · the release channel of the use case (`@rules/distribution.md`) · the `yarn npm audit` reminder.
- **`docs/release/CHANGELOG.md`** written at the project root (create `docs/release/`), seeded per `@rules/versioning.md` - **in English**, Keep a Changelog shape: the preamble, an empty `## [Unreleased]`, and the initial `## [1.0.0] - <YYYY-MM-DD>` block with `### Added` / `- Initial release.`. The `1.0.0` matches the project version in `package.json` (and therefore `APP_VERSION`, which is derived from it - `@rules/config.md`). Later releases are cut with `/yarn-release`.
- **`CLAUDE.md`** at the generated project root (in the user's language), recording the project's identity for future sessions:

  ```markdown
  # [project-name]

  ## Origin

  Framework: yarn v1.0.0

  ## Business context

  [What the project does - synthesized from docs/specs/02-featuring.md: objective + key features. Use case: CLI tool | library | service | extension | application. Salesforce coupling: none | standalone | sfdx-project.]

  ## Deviations from the framework

  - None

  ## Maintenance

  - Load the project first: `/yarn-load-project`
  - Change it: `/yarn-add-feature` · `/yarn-fix-issue` · `/yarn-refactor-code` (each records the change under `[Unreleased]` in `docs/release/CHANGELOG.md`; the version does not move)
  - Verify: `/yarn-run-tests`
  - Publish a version: `/yarn-release` (turns the accumulated `[Unreleased]` changelog into a dated version and raises the version number)
  ```

  `[project-name]` = the project name (`APP_NAME`). The version here is the **framework** version declared at the top of the framework `CLAUDE.md` (currently 1.0.0) - not the project's own version (which starts at 1.0.0 in `package.json` / `docs/release/CHANGELOG.md`). Replace the `Deviations` list with every deviation validated via the Phase 4/5 deviation protocol (`- [deviation] - reason: [justification]`); if none, keep `- None`.

- **`.claude/settings.json`** at the generated project root so the project stays self-enforced in later maintenance sessions:

  ```json
  {
    "permissions": {
      "allow": [
        "Bash(yarn:*)",
        "Bash(node:*)",
        "Bash(tsx:*)",
        "Bash(sf:*)",
        "Read",
        "Write",
        "Edit"
      ],
      "deny": [
        "Read(**/.env)",
        "Read(**/.env.*)",
        "Read(**/secrets/**)",
        "Write(**/.env)",
        "Write(**/.env.*)",
        "Write(**/secrets/**)",
        "Edit(**/.env)",
        "Edit(**/.env.*)",
        "Edit(**/secrets/**)",
        "Write(**/node_modules/**)",
        "Write(**/dist/**)"
      ]
    },
    "hooks": {
      "Stop": [{ "hooks": [{ "type": "command", "command": "yarn lint" }] }]
    }
  }
  ```

  The `Stop` hook runs the fast static check (`yarn lint`) at the end of each turn. **`Bash(sf:*)` is present only when Salesforce coupling is confirmed** (it lets a maintenance session verify flags with `sf <command> --help`); drop that line otherwise. Note in the README that the user can tune or remove the hook.

  **Deny anchoring (deliberate):** no deny pattern may ever match `docs/release/CHANGELOG.md` (written at delivery and by the maintenance/release skills). A build-output deny whose folder name could collide with it (e.g. `release/`) is **anchored to the project root** - `Write(release/**)`, never the unanchored `Write(**/release/**)`. Keep this anchoring when adding deny patterns.

- **`docs/sessions/SESSION_[project]_S0.md`** written at the project root (create `docs/sessions/`) - the **delivery baseline** session, produced automatically here, no user action. Apply the `/yarn-save-session` template as-is (that skill stays the single source of the format) with `[N]` **forced to `0`**: `Completed phase: 5 - Development`, `Next phase: - (delivered - maintenance via /yarn-load-project)`, every delivered batch checked, locked decisions and open points filled. **Overwrite** it if it already exists (Phase 5 replayed). `S0` is reserved for this baseline; manual `/yarn-save-session` saves keep numbering from `1`.
- Confirm `docs/specs/` is present and consistent with the delivered code.

## Test batch - only if Phase 1 tests = Yes

Add a final dedicated batch: announce `Batch [final]/[total] - test/ + dev dependencies`. Deliver `test/` mirroring `src/` (per `@rules/tests.md`: when coupled, mock `cross-spawn` in the runner test, a fake `SfRunner` for the helpers, a fake `SfHelpers` for the services; formatter shape tests (CLI tool); the `resolveConfig` cascade test; for a project with UI, `jsdom` + `@testing-library/react` component tests - **French test names**, no real `sf` / network / filesystem), the optional `vitest.config.ts`, the dev dependency `vitest` (+ `jsdom` and `@testing-library/react` for a project with UI), and the `"test": "vitest run"` script. Append the `yarn test` instruction to the README.

## Executable verification (last batch - blocking when the env allows)

Run `@rules/verification.md §A` in order and quote the relevant output as proof:

```
yarn install                 # dependencies resolve, yarn.lock written
yarn typecheck               # tsc --noEmit - clean
yarn lint                    # eslint (flat config) - clean
yarn build                   # tsup (or Vite for the UI) → dist/
yarn test                    # vitest run - only if tests enabled; else skip (do NOT scaffold a suite)
node dist/cli.js --help      # smoke (CLI tool) - prints usage, exit 0
node dist/cli.js --version   # smoke (CLI tool) - prints the version, exit 0
```

- The smoke step depends on the use case, as defined in `@rules/verification.md §A`: the two commands above for a CLI tool; for the other use cases, the smoke defined in that file.
- A non-zero exit or any reported error is **blocking** - fix the root cause (never silence the rule), re-run until clean.
- **Smoke scope**: `--help` / `--version` exercise the commander wiring and the composition root **without an org**. When coupled, the **full** smoke of real `sf` operations (a live `sf data query`, `sf project deploy`) needs an **authenticated org** reachable through `sf` - that is **out of automatic scope**. State it explicitly to the user; never fake it.
- If Node/Yarn is **not** available, say so plainly, fall back to the static checks (§B), and list the commands the user must run before considering the work verified. Never claim a clean typecheck/build you could not run.

## Final delivery summary

Once the last batch (plus the test batch if any) is delivered, close Phase 5 with a **delivery summary** in the user's language. **Make every file and the project folder a clickable Markdown link** `[label](path)`, each path pointing to the real on-disk location under the project root (relative to the project root, or absolute if the project root lies outside the current workspace). **Valid link syntax (mandatory)**: a Markdown link destination cannot contain spaces unless wrapped in angle brackets - when the path contains spaces (typical of absolute Windows paths), wrap the destination in `<...>` and use forward slashes, e.g. `[README.md](<E:/Informatique/1-projects/.../my-project/README.md>)`. Without spaces, a plain relative path is fine. List:

- **Project folder** - the project root (clickable).
- **README.md** - how to run, stack, tree, config keys, the Salesforce prerequisite when coupled (clickable).
- **Generated `CLAUDE.md`** - the project identity for future sessions (clickable).
- **Documentation - phase specs** - one clickable link each: `docs/specs/01-scoping.md`, `docs/specs/02-featuring.md`, `docs/specs/03-surfaces.md`, `docs/specs/04-architect.md`, plus the delivery baseline `docs/sessions/SESSION_[project]_S0.md`.
- **How to run** - the key commands (also in the README):

  ```
  yarn install
  yarn build
  node dist/cli.js --help
  ```

  (CLI tool shown; use the run command of the use case otherwise. + `yarn test` if tests enabled.) Plus, when coupled, the **`sf` v2 prerequisite** (reachable via `PATH` or `SF_CLI_PATH`) and the coupling mode; for a CLI tool, the scheduling note.

- **Maintenance & release** - after delivery: `/yarn-load-project` first, then `/yarn-add-feature` · `/yarn-fix-issue` · `/yarn-refactor-code` to change it, `/yarn-run-tests` to verify, and `/yarn-release` to publish a version (it turns the accumulated `[Unreleased]` changelog into a dated version and raises the number). The same reminder is recorded in the generated `CLAUDE.md`.

The summary points to the documents; it does not restate them.

## Post-delivery adjustments

Isolated fix on the affected file + its direct dependencies. Deliver the complete fixed file. If the change touched a documented aspect (a command, a flag, a config key, the tree, the use case surface, the coupling mode, the stack), refresh the README via the logic of `/yarn-generate-readme` in the same delivery (`@rules/readme.md`).
After resolving an anomaly: cleanup report (`@rules/architecture.md`) then offer `Do you want to remember this point? /yarn-save-memory`.
