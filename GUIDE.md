# Usage guide - TypeScript Yarn Project Generator (`yarn`)

> Claude Code generator for **TypeScript projects on Node.js and Yarn Berry**, for five use cases: CLI tool, library, service, extension, application (with UI). Optional **Salesforce** (`sf` v2) coupling, detected in Phase 1. Unified version: generation pipeline + maintenance skills, explicit role per skill, persisted specs, executable verification, native memory.

---

## Framework structure

```
yarn/
├── CLAUDE.md                 # Core instructions (EN): persona, communication, use cases, pipeline, stack, rules, command index, sizing
├── GUIDE.md                  # This file
├── README.md                 # Repo overview (EN)
├── CHANGELOG.md              # Generator changelog (separate from the changelog of generated projects)
├── LICENSE
├── .gitignore / .gitattributes
└── .claude/
    ├── yarn-berry-cli-reference/   # Yarn Berry 4.x command/flag catalog: yarn-index.md, then one file per command (never read in full)
    ├── salesforce-cli-reference/   # sf v2 catalog: index.md, then cli_reference_<topic>.md (loaded ONLY if Salesforce coupling is confirmed)
    ├── rules/
    │   ├── use-cases.md      # Guide to the five use cases: when to choose, entry point, structure, watch points
    │   ├── architecture.md   # Common core + composition root per use case, layers, batch delivery
    │   ├── cli.md            # (CLI) commander program, exit codes 0/1/2, stdout=data / stderr=logs
    │   ├── errors.md         # Result<T> contract, named errors, escalation service → boundary
    │   ├── config.md         # config.ts (cascade), package.json, .yarnrc.yml, tsup, tsconfig, dependency versions
    │   ├── security.md       # Validation, confined paths, secrets; with Salesforce: cross-spawn args array, keychain
    │   ├── sf-cli.md         # (Salesforce confirmed) Runner + typed helpers + org/data starter
    │   ├── sfdx-project.md   # (Salesforce, sfdx-project mode) sfdx-project.json detection, .forceignore, deploy/retrieve
    │   ├── output.md         # (CLI) json / table formatters, csv / xlsx if selected, stdout / file destination
    │   ├── logging.md        # pino (file + stderr) for CLI and service, zero console.log
    │   ├── progress.md       # (CLI) Runtime reporter: steps/spinner on stderr (bar for a known total), auto-TTY, --no-progress
    │   ├── ui.md             # (project with UI) Vite + React + strict TypeScript
    │   ├── tests.md          # vitest opt-in, coverage per layer, jsdom + Testing Library if UI
    │   ├── distribution.md   # Delivery channel per use case (personal by default; npm, marketplace or external target opt-in)
    │   ├── versioning.md     # SemVer, Keep a Changelog changelog, bump by /yarn-release
    │   ├── verification.md   # Centralized EXECUTABLE verification + static integrity
    │   └── readme.md         # Post-delivery README sync (auto regeneration)
    ├── skills/
    │   ├── yarn-app/            # Start / resume / maintenance menu (4 options)
    │   ├── yarn-p1-scoping/     # Scoping (use case, Salesforce context) → docs/specs/01-scoping.md
    │   ├── yarn-p2-featuring/   # Feature sheet → docs/specs/02-featuring.md
    │   ├── yarn-p3-surfaces/    # Use case interface contract → docs/specs/03-surfaces.md
    │   ├── yarn-p4-architect/   # Locked architecture contract → docs/specs/04-architect.md
    │   ├── yarn-p5-development/ # Batch delivery (automatic chaining)
    │   ├── yarn-add-feature/    # Add a feature to a delivered project
    │   ├── yarn-trace-feature/  # Trace a feature through the layers
    │   ├── yarn-fix-issue/      # Fix a bug: decision tree, root cause
    │   ├── yarn-refactor-code/  # Restructure under explicit validation only
    │   ├── yarn-release/        # Freeze a SemVer version (accumulated changelog), then follow the delivery channel
    │   ├── yarn-run-tests/      # Executable verification (install, typecheck, lint, build, smoke)
    │   ├── yarn-load-project/   # Load an existing project
    │   ├── yarn-generate-readme/ # Generate README.md of an existing project
    │   ├── yarn-save-session/   # Session save
    │   ├── yarn-show-state/     # Current project state
    │   ├── yarn-show-contract/  # Tree of the validated contract
    │   └── yarn-save-memory/    # Persist into Claude Code native memory
    ├── settings.json         # Execution permissions (yarn, node, tsx, sf) + deny guardrails (.env, secrets)
    └── settings.local.json   # Local overrides (not versioned)
```

> `design-system.md` and `layout.md` do not exist: for a project without UI (CLI, library, service), the visual contract is replaced by the use case interface contract. A project with UI (application, extension webview) follows `rules/ui.md`.

---

## Framework specifics

| Point | Detail |
| ----- | ------ |
| **Five use cases** | CLI tool (`src/cli.ts`), library (`src/index.ts`), service (`src/server.ts`), extension (`src/extension.ts`), application with UI (`src/main.tsx`). Chosen in Phase 1, locked in Phase 4. Guide: `rules/use-cases.md`. |
| **Optional Salesforce** | Detected in Phase 1 in three cases (see below). `sf` v2 only, never legacy `sfdx`. Without coupling: no Salesforce file loaded, no `src/sf/` layer. |
| **Yarn Berry only** | Install, scripts and release go through `yarn`. Never `npm`, `npx` or `pnpm`. `package.json` + `yarn.lock` + `.yarnrc.yml` (`nodeLinker: node-modules`, no zero-install), version pinned by `packageManager`. |
| **Two binding catalogs** | `yarn-berry-cli-reference/` (always) and `salesforce-cli-reference/` (only if Salesforce is confirmed). No command or flag invented from memory. |
| **Common core** | `src/`, `test/` mirroring `src/`, shared files `config.ts`, `logger.ts` (where the use case requires it), `types.ts`, `errors.ts`. |
| **Rich output (CLI)** | JSON / table formatters always; CSV / xlsx only if selected in Phase 1. stdout or file destination. |
| **Process security** | With Salesforce: every `sf` call goes through `cross-spawn` (args array, no shell) from `src/sf/runner.ts` only. Secrets in the `sf` keychain, never in a file. |

---

## The five use cases

| Use case | Entry point | Typical output | Delivery channel (`rules/distribution.md`) |
| -------- | ----------- | -------------- | ------------------------------------------ |
| CLI tool    | `src/cli.ts`   | executable binary bundled by `tsup` | npm registry, or local run (`yarn dev`, `node dist/cli.js`) |
| Library | `src/index.ts` | importable package (ESM, types) | npm registry |
| Service     | `src/server.ts` | long-running Node.js process | run locally, or external target (opt-in) |
| Extension   | `src/extension.ts` | extension bundle for its host (VS Code recommended; host asked in Phase 1) | packaged artifact installed by hand (`.vsix` for VS Code), or host store (opt-in) |
| Application | `src/main.tsx` | web UI built by Vite (React) | local build, or external target (opt-in) |

- Build: `tsup` for Node targets (CLI, library, service), Vite for browser UI (application, extension webview).
- CLI-specific rules (`cli.md`, `output.md`, `progress.md`): apply only to the CLI use case.
- `jsdom` + `@testing-library/react`: projects with UI only. A headless CLI does not use `jsdom`.

---

## Salesforce context (detection in Phase 1)

`/yarn-p1-scoping` decides on coupling from the objective, never settling it silently:

1. **Clear Salesforce context** (the objective names Salesforce, an org, SOQL, Apex, metadata, `sf`...): coupling confirmed. `salesforce-cli-reference/` is loaded, `rules/sf-cli.md` applies (plus `rules/sfdx-project.md` for the `sfdx-project` mode). Phase 1 then sets the coupling mode (`standalone` or `sfdx-project`).
2. **Clear absence**: no coupling. Neither the `sf` catalog, nor `rules/sf-cli.md`, nor `rules/sfdx-project.md` is loaded; no `src/sf/` layer.
3. **Ambiguity**: question to the user via `AskUserQuestion` (Salesforce need and use of the Salesforce CLI reference commands: yes / no, recommended option first).

---

## Installation

```bash
# Start Claude Code from the framework folder (or copy it into the target project).
claude
```

### Prerequisites

```bash
claude --version      # Claude Code CLI installed and logged in
node --version        # Node.js 24+ (to run the generated projects)
yarn --version        # Yarn Berry 4.x
sf --version          # Salesforce CLI v2 (only if Salesforce coupling is confirmed)
```

### Enable memory (once per machine)

```
/config → Memory → Enable auto memory → On
```

---

## Start a new project

```
/yarn-app → 1
```

### Phase 1 - Scoping

Objective (free text), then project name + root (a single kebab-case name, used for the folder AND for the `bin` of a CLI; location; creation), then the closed parameters via `AskUserQuestion` (4 questions maximum per call, several calls if needed), each option carrying a one-line consequence:

- **use case** (CLI tool / library / service / extension / application; for an extension, the **host**, VS Code recommended) · **Salesforce context** (per the three cases above; if confirmed: `standalone` / `sfdx-project` mode, and folder path if `sfdx-project`) · tests (`vitest`) · for a CLI: output formats (JSON + table, plus CSV / xlsx if wanted: only the selected formats ship) and interactivity (non-interactive / prompts).

Framework defaults not asked: strict TypeScript + ESM, Yarn Berry, `tsup` build (Node) or Vite (UI), `commander` parser and progress reporter (CLI only), `pino` logger (CLI and service). **Project shape defaults, overridden on request only**: execution shape, distribution (use case channel), config strategy = cascade `config.ts < .env < flags`. Salesforce/SFDX detection on the objective: `deploy`/`retrieve`/`source`/`sfdx-project` recommends `sfdx-project`, otherwise `standalone`.

**Internal** sizing (not announced in Phase 1, determined in Phase 2; drives the batch split of Phase 5):

| Size          | Batches (no tests) | Batches (with tests) |
| ------------- | ------------------ | -------------------- |
| Small         | 3                  | 4                    |
| Medium / Large | 4                 | 5                    |

Writes `docs/specs/01-scoping.md`.

### Phase 2 - Featuring

Name confirmation (from Phase 1, adjustable only if the `bin` must differ from the folder for a CLI). Elicitation of the **features** (commands for a CLI), MoSCoW, v1.0 scope. Sizing determined internally from the v1.0 feature count (drives the batches, not a separate validated step). Blocking validation on the features / scope. Writes `docs/specs/02-featuring.md`.

### Phase 3 - Surfaces

Each validated feature is mapped onto the use case interface. Blocking validation. Writes `docs/specs/03-surfaces.md`.

| Use case | Described surface |
| -------- | ----------------- |
| CLI tool | For each command: full name (`group verb`), positional args, flags/options (type, default, required), input source, output format + destination, exit conditions (0/1/2), interactive prompt (if enabled). Global flags (`--format`, `--output`, `--log-level`, ... ; `--target-org` if Salesforce). |
| Library | Public API: exports, signatures, types, errors. |
| Service | Endpoints: routes, inputs, outputs, error codes. |
| Extension | Contributions: commands, views, settings, activation events. Host: asked in Phase 1 (VS Code recommended; host-specific rules for VS Code: the dedicated `vscode` generator framework; another host gets only the common core plus what the user supplies). |
| Application | Screens, navigation, states, per `rules/ui.md`. |

### Phase 4 - Architect

Tree per use case (and the `src/sf/` layer if Salesforce is confirmed) + role of each file + **registry** (for a CLI: command → service → `sf` helper → formatter) + `Result<T>` + named errors + config key table + use case and coupling mode. **Locked after validation.** Writes `docs/specs/04-architect.md` (source of truth).

### Phase 5 - Development

Files written directly to disk. Announces `Batch N/[total] - [content]`. Automatic chaining. Batch 1 is the core (`types`, `errors`, `config`, `logger`, and for a CLI `progress` + `output/`; plus the `sf` runner and helpers when Salesforce is confirmed), because services import `logger` and `progress` from batch 2. The composition root (entry point) goes in the last batch. Last batch: `package.json` + `.yarnrc.yml` + configs (including `.prettierignore`, so `yarn format` never touches the Yarn bundle or the lockfile), `README.md`, project `CLAUDE.md` (identity), `.claude/settings.json` (deny + `Stop` hook). Executable verification applied.

---

## Resume a session

```
/yarn-save-session            # save at end of session (docs/sessions/)
/yarn-app → 2                # resume: provide the path of the SESSION file
```

Resuming is handled by `/yarn-app` (option 2, or a SESSION block pasted directly in the message, resume without menu): full read of the SESSION file, reply `Resuming [project] - [next phase] | Batch [X/total] | Open points: ...`, then immediate chaining without re-asking resolved questions.

At the end of Phase 5, the generator automatically writes `docs/sessions/SESSION_[ProjectName]_S0.md`: the reference session of the delivery (overwritten if Phase 5 is replayed). Manual `/yarn-save-session` runs are numbered from S1.

---

## Work on a delivered project

```
/yarn-app → 3     # or directly /yarn-load-project from the project root
```

Claude reads `docs/specs/04-architect.md` (priority), otherwise the README, otherwise the code, then confirms the load in one block in the unified format (`Project loaded: [name] v[version]`, stack, use case, features, Salesforce context and coupling mode if applicable, tests, specs, `Generator rules applied. Ready for: development · fixes · improvements · adjustments.`) and applies all the rules. Project without README: `/yarn-generate-readme`.

### Maintenance (`/yarn-app → 4`)

| Need                                        | Command                 |
| ------------------------------------------- | ----------------------- |
| Add a feature                               | `/yarn-add-feature`     |
| Understand / trace the code                 | `/yarn-trace-feature`   |
| Fix a bug                                   | `/yarn-fix-issue`       |
| Restructure (under validation)              | `/yarn-refactor-code`   |
| Freeze a SemVer version (accumulated changelog) | `/yarn-release`     |
| Check the build / the checks                | `/yarn-run-tests`       |

---

## Executable verification

`rules/verification.md` is the single source. Commands (failure is blocking when the environment allows it):

```bash
yarn install                 # dependency resolution
yarn typecheck               # tsc --noEmit
yarn lint                    # eslint (flat config)
yarn build                   # tsup → dist/cli.js (shebang, executable) for a CLI
yarn test                    # vitest run (if tests enabled)
node dist/cli.js --help      # CLI smoke: usage, exit 0
node dist/cli.js --version   # CLI smoke: version, exit 0
```

> The smoke test varies by use case (library import, service startup, Vite build of the application): see `rules/verification.md`. With Salesforce, the full smoke of real `sf` operations (query, deploy) needs an org authenticated via `sf`: outside the scope of automatic verification.

`/yarn-run-tests` runs this ladder; `/yarn-fix-issue` points back to it to confirm a fix.

---

## Security

`rules/security.md` is non-negotiable and applied at 100%: external data validated from `unknown`; paths written as exports resolved and confined under the base folder (no traversal), while a storage path the user chooses (data file, config file) is resolved but not confined and declared as a documented deviation; **no secret** in `.env` / config / logs / commits. With Salesforce: every `sf` call through `cross-spawn` (args array, no `shell: true`) from `src/sf/runner.ts` only; `sf` keychain, non-secret alias at most. `/yarn-fix-issue` and `/yarn-add-feature` point back to it.

---

## Issue handling and memory

After a fix (`/yarn-fix-issue` or Phase 5), Claude produces a cleanup report, then offers `Do you want to remember this point? /yarn-save-memory`. `/yarn-save-memory` categorizes and writes into **Claude Code native memory** (+ `MEMORY.md`).

Prerequisite: auto memory must be enabled (`/config → Memory → Enable auto memory → On`). Without it, `/yarn-save-memory` drafts the notes but does not persist them between sessions.

---

## Reference commands

| Command                   | Model  | Action                                                  |
| ------------------------- | ------ | ------------------------------------------------------- |
| `/yarn-app`               | Haiku  | Start / resume / maintenance menu                       |
| `/yarn-p1-scoping`        | Sonnet | Scoping (use case, Salesforce context, tests, ...)      |
| `/yarn-p2-featuring`      | Sonnet | Feature sheet + locked sizing                           |
| `/yarn-p3-surfaces`       | Sonnet | Use case interface contract                             |
| `/yarn-p4-architect`      | Sonnet | Locked architecture contract                            |
| `/yarn-p5-development`    | Sonnet | Batch delivery - automatic chaining                     |
| `/yarn-add-feature`       | Sonnet | Add a feature to a delivered project                    |
| `/yarn-trace-feature`     | Sonnet | Trace a feature through the layers                      |
| `/yarn-fix-issue`         | Sonnet | Fix a bug - root cause                                  |
| `/yarn-refactor-code`     | Sonnet | Restructure under validation                            |
| `/yarn-release`           | Sonnet | Freeze a SemVer version from the accumulated changelog  |
| `/yarn-run-tests`         | Sonnet | Executable verification                                 |
| `/yarn-load-project`      | Sonnet | Load an existing project                                |
| `/yarn-generate-readme`   | Sonnet | Generate README.md of an existing project               |
| `/yarn-save-session`      | Haiku  | Save the session                                        |
| `/yarn-show-state`        | Haiku  | Current state                                           |
| `/yarn-show-contract`     | Haiku  | Validated architecture contract                         |
| `/yarn-save-memory`       | Haiku  | Persist into native memory                              |

---

## Structure of a generated project

Example for the CLI use case with Salesforce coupling. The other use cases change the entry point and the layers above the common core (`rules/use-cases.md`, `rules/architecture.md`).

```
mon-projet/
├── package.json · yarn.lock · .yarnrc.yml · tsconfig.json · tsup.config.ts · eslint.config.mjs · .prettierrc
├── .prettierignore · .env.example · .gitignore · README.md
├── CLAUDE.md                      # Project identity (origin, context, deviations) - generated at the end of Phase 5
├── .claude/settings.json          # Guardrails + Stop hook (self-checking project)
├── docs/specs/                    # Generation specs (user language)
├── docs/release/CHANGELOG.md       # SemVer changelog (Keep a Changelog, English) - frozen by /yarn-release
├── test/                          # Mirror of src/ (if tests enabled)
└── src/
    ├── cli.ts                     # bin: commander program, Result → exit code mapping (index.ts, server.ts, extension.ts or main.tsx for the other use cases)
    ├── config.ts · logger.ts · progress.ts · types.ts · errors.ts   # shared - importable by all layers
    ├── sf/                        # Salesforce only: runner.ts (cross-spawn) · helpers.ts · project.ts (sfdx mode)
    ├── services/                  # business logic - returns Result<T>
    ├── commands/                  # CLI only: thin adapters
    └── output/                    # CLI only: index.ts (dispatch) · json.ts · table.ts (+ csv.ts · xlsx.ts if selected)
```

---

### Versioning & changelog

Each generated project carries a SemVer version and a changelog `docs/release/CHANGELOG.md` (Keep a Changelog format, written in English). The maintenance skills (`add-feature`, `fix-issue`, `refactor-code`) accumulate their entries under `## [Unreleased]`; `/yarn-release` freezes them into a dated version block and bumps the version source (`package.json`; `APP_VERSION` is derived from it, nothing to sync), then follows the use case delivery channel (`rules/distribution.md`). The version is never bumped silently. See `rules/versioning.md`.

---

## Watch points

- Yarn Berry only: never `npm`, `npx` or `pnpm`. Every `yarn` command and flag is checked in `yarn-berry-cli-reference/` (index first, then the command file).
- The use case is set in Phase 1 and locked in Phase 4. Changing the use case means a new project, not a tweak.
- Salesforce is **optional**: detection in Phase 1 (clear / absent / ambiguous, hence a question). Once confirmed: `sf` v2 only, never legacy `sfdx`, every call through `src/sf/runner.ts` (cross-spawn, args array), commands checked in `salesforce-cli-reference/`.
- CLI: `stdout` = data only (pipeable), `stderr` = logs + messages. `pino` never writes to stdout. Exit codes mapped once at the `cli.ts` boundary (0/1/2), never hardcoded elsewhere.
- CLI: the progress reporter (`src/progress.ts`, `step` always, `bar` only for a known total) shows steps on `stderr`, auto-enabled in a terminal (TTY), silent in pipe/cron/CI; `--no-progress` turns it off. `stdout` stays data.
- The contract (`docs/specs/04-architect.md`) is locked. Any structural change goes through `/yarn-add-feature` or the deviation declaration protocol.
- No secret in a file: with Salesforce, `sf` holds the tokens in the OS keychain; the project stores only a non-secret alias.
- `/yarn-load-project`, `/yarn-generate-readme` and the maintenance skills are invoked from the root of the target project.
