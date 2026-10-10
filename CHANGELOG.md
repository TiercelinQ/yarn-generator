# Changelog

All notable changes to this generator are documented in this file.
The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.
(This is the changelog of the **generator** itself, distinct from the `docs/release/CHANGELOG.md` of each generated project.)

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
