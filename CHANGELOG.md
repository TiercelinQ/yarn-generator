# Changelog

All notable changes to this generator are documented in this file.
The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.
(This is the changelog of the **generator** itself, distinct from the `docs/release/CHANGELOG.md` of each generated project.)

## [1.1.0] - 2026-11-04

### Added
- Phase 1 asks **Execution modes** (`Flags only` | `Flags + guided assistant`) in place of the former "Runtime interactivity" question, for the CLI tool only (same place, same question count). The recommendation comes from the objective, not from a fixed default. With the assistant, the generated tool started with no argument in a terminal asks a series of questions and runs one or several commands; with flags given, it asks only the missing values (hybrid).
- Phase 2 Step 4b "Execution flows" (CLI tool with the assistant): which v1.0 commands are multi-step flows, their ordered steps, step selection, repeat, dry run. The synthesis sheet gains an "Execution flows" table.
- Phase 3 specifies, per command, the assistant's question table (type, default, validation, equivalent flag, required outside a terminal) and, per flow, `--only` / `--skip` / `--dry-run`, the failure rule, and the global `--yes` flag. Phase 3 questions 4 and 5 choose the commands with an assistant and the destructive ones that confirm first.
- `rules/cli.md` section "Execution modes": entry rules (terminal or not), single `canPrompt()` guard in `src/prompts/guard.ts`, prompts on `stderr`, equivalent command line printed at the end, cancel handling, flows. `rules/architecture.md`: `src/prompts/` layer and the documented flow-service exception. Matching updates in `use-cases`, `config`, `tests`, `verification`, `security`, `readme` and the Phase 4/5, add-feature, generate-readme, show-state and save-session skills.

### Changed
- The "Non-interactive by default" section of `rules/cli.md` becomes "Execution modes", which keeps the existing guard (`stdin` and `stderr` TTY, never `stdout`; prompts written to `stderr`) and now adds `CI` to it, behind a single `canPrompt()` function.
- A destructive command without `--yes` outside a terminal is still refused with a `ValidationError` (exit `2`); the sample now goes through `canPrompt()`.

## [1.0.1] - 2026-10-26

### Fixed
- Distribution is a closed Phase 1 question for the CLI tool, service, extension and application; the stale "stated default" wording is removed from `yarn-p1-scoping`, `README.md` and `GUIDE.md`. A library is not asked: its channel is always the npm registry.
- The provisional calibration announced at the end of Phase 1 (decision A-1) is now described as such in `GUIDE.md`.
- `src/logger.ts` exists for the CLI tool and the service only. Library, extension and application use an injected `Logger` (`rules/logging.md`, `rules/errors.md`, `rules/architecture.md`, `rules/use-cases.md`, `rules/verification.md`).
- Global `uncaughtException` / `unhandledRejection` handlers are mandatory in `cli.ts` and `server.ts` only; a library and an extension install none, the application installs `window` listeners in `main.tsx` (`rules/errors.md` and every rule, skill and doc that mentioned them).
- The Phase 1 UI choices now name what `rules/ui.md` leaves to Phase 1 (styling approach, UI libraries); `yarn-p3-surfaces` no longer refers to a palette, a design system or i18n questions that `rules/ui.md` forbids.
- `yarn npm audit --recursive` is written the same way in `rules/architecture.md`, `rules/security.md`, `rules/verification.md`, `rules/readme.md`, `yarn-p5-development` and the README template, as an advisory step outside the blocking verification chain.
- The debug variable is `[PROJECT]_DEBUG` (was `[TOOL]_DEBUG`); "tool" becomes "project" in the use-case-neutral wording; the library error style is fixed in Phase 3, as `yarn-p3-surfaces` asks.

### Changed
- Extension (host = VS Code): the bundle is CommonJS `dist/extension.cjs` with every dependency embedded except `vscode` and a target aligned with `engines.vscode`; the project keeps `"type": "module"` (`rules/config.md`, `rules/use-cases.md`, `rules/distribution.md`, `rules/verification.md` bundle check). For another host, Phase 1 now asks the module format and the host-provided modules.
- Phase 1 asks whether an extension has a webview (closed Yes/No question next to the host); `yarn-p3-surfaces` and `yarn-p4-architect` follow it.
- `yarn-p4-architect` records the distribution and the release channel in the contract; `yarn-show-state` and `yarn-save-session` list host, UI choices, distribution and the calibration announcement.
- The `vitest ^4.1.11` fallback is documented as the only exception to "never loosen a validated range".

## [1.0.0] - 2026-10-10

### Added
- First stable release. No functional change over 0.2.0: the framework is versioned 1.0.0 like the other generators, and the versions 0.1.0 and 0.2.0 below stay as its history.

## [0.2.0] - 2026-10-10

### Changed
- Batch tables: `src/logger.ts` and `src/progress.ts` ship in Batch 1 (the core), because services import them from Batch 2. The composition root stays in the last batch.
- Output formats (CLI): `json` and `table` always ship; `csv` (`csv-stringify`) and `xlsx` (`exceljs`) and their dependencies ship only when selected in Phase 1. A format that is not shipped is a `ValidationError` (exit 2).
- Empty datasets (list, query, export) are a success with a valid empty document (`[]`, `(0 rows)`...), exit 0; `warning` is kept for non-dataset commands where nothing was done. The `xlsx` file-destination check runs in the command before any work.
- CLI log file defaults to `~/.<tool>/logs/app.log`; `process.cwd()/logs/app.log` stays for a service. `progress.ts` ships `bar` only when an operation has a known total.
- Security section 3 separates a user-chosen storage path (resolved, not confined, declared as a deviation) from export paths (confined with `resolveWithin`).
- Local run of a CLI is `yarn dev` or `node dist/cli.js`; `yarn link` is documented as a consumer-project command that installs no global command.
- Dependency ranges validated in `rules/config.md` are written as they are in `package.json`.

### Fixed
- `APP_VERSION`: the named import `import { version } from "../package.json" with { type: "json" }` fails the build; the rule now uses a default import and `pkg.version`.
- Global flags: `program.opts()` is empty before `parseAsync`; the `cli.ts` sequence now pre-parses the global flags with a throwaway `Command` that shares `withGlobalOptions` with the real program.
- Destructive-action prompts test `stdin` and `stderr` TTY and write to `stderr`, instead of testing `stdout`, which may carry piped data.
- `.prettierignore` (`.yarn`, `yarn.lock`, `dist`) is part of the root configs, so `yarn format` does not rewrite the committed Yarn bundle.

## [0.1.0] - 2026-10-10
### Added
- Five use cases fixed in Phase 1 and locked in the Phase 4 contract: CLI tool (`src/cli.ts`), library (`src/index.ts`), service (`src/server.ts`), extension (`src/extension.ts`), application with UI (`src/main.tsx`, Vite + React). Common core shared by all: `src/`, `test/` mirror, `config.ts`, `logger.ts` (where imposed), `types.ts`, `errors.ts`. Explanatory guide in `rules/use-cases.md`.
- Optional Salesforce coupling detected in Phase 1 `/yarn-p1-scoping` in three cases: clear context (coupling confirmed), clear absence (nothing Salesforce loaded, no `src/sf/` layer), ambiguity (the user is asked with `AskUserQuestion`). When confirmed: `sf` v2 only, `cross-spawn` runner, `standalone` or `sfdx-project` coupling mode.
- Yarn Berry 4.x as the only package manager: `package.json` + `yarn.lock` + `.yarnrc.yml` (`nodeLinker: node-modules`, no zero-install), version pinned by `packageManager`. Generated `.gitignore` and `.claude/settings.json` follow Yarn Berry conventions (`Bash(yarn:*)`).
- Two binding command catalogs loaded on demand, index first: `.claude/yarn-berry-cli-reference/` (Yarn Berry commands and flags) and `.claude/salesforce-cli-reference/` (`sf` v2 topics, only when Salesforce is confirmed).
- Rules: `use-cases.md`, `architecture.md`, `cli.md`, `errors.md`, `config.md`, `security.md`, `sf-cli.md`, `sfdx-project.md`, `output.md`, `logging.md`, `progress.md`, `ui.md`, `tests.md`, `versioning.md`, `distribution.md`, `verification.md`, `readme.md`. `cli.md`, `output.md`, and `progress.md` apply to the CLI use case only; `ui.md` applies to projects with UI.
- 18 skills `/yarn-*`: 5-phase pipeline (`app`, `p1-scoping`, `p2-featuring`, `p3-surfaces`, `p4-architect`, `p5-development`), maintenance (`add-feature`, `trace-feature`, `fix-issue`, `refactor-code`, `release`, `run-tests`), state and utilities (`load-project`, `generate-readme`, `save-session`, `show-state`, `show-contract`, `save-memory`).
- Personal distribution by default for every use case, external publication as an opt-in `Distribution` question in Phase 1 (`rules/distribution.md`): npm registry for a CLI or a library, an installed package or the host store for an extension (host chosen by a closed Phase 1 question: VS Code recommended, browser extension, JetBrains IDE, or another host), local run or external target for a service, local build or external target for an application. `/yarn-release` follows the channel recorded in Phase 1 after the SemVer bump.
- Build and quality stack: `tsup` (Node bundle) + `tsx` (dev) + `tsc --noEmit`, Vite for the browser UI, `vitest` (opt-in) with `jsdom` + `@testing-library/react` for projects with UI, ESLint flat config + Prettier.
- Persisted specs per phase in `docs/specs/`, delivery baseline session, executable verification, native memory, and a SemVer changelog seeded in each generated project at `docs/release/CHANGELOG.md`.
