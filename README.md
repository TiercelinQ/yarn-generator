# TypeScript Yarn Project Generator (`yarn`) - Unified

> Claude Code generator for **TypeScript projects on Node.js and Yarn Berry**, for five use cases: CLI tool, library, service, extension, application (with UI). **Salesforce** coupling (`sf` v2 CLI) is optional and detected in Phase 1.

Part of a family of Claude Code generators. See also [dotnet-wpf-app-generator](https://github.com/TiercelinQ/dotnet-wpf-app-generator), [electron-app-generator](https://github.com/TiercelinQ/electron-app-generator), [flutter-app-generator](https://github.com/TiercelinQ/flutter-app-generator), [local-webapp-generator](https://github.com/TiercelinQ/local-webapp-generator), [python-app-generator](https://github.com/TiercelinQ/python-app-generator), [sf-node-generator](https://github.com/TiercelinQ/sf-node-generator), and [vscode-ext-generator](https://github.com/TiercelinQ/vscode-ext-generator). Where those generate one fixed kind of app, `yarn` generates the TypeScript project of your choice (headless tool, package, long-running process, host extension, web UI) on a single package manager: Yarn Berry.

Unified edition: the full generation pipeline **plus** post-delivery maintenance skills, an explicit role per skill, persisted specs, centralized executable verification, and native memory.

---

## What it does

A structured prompt system that generates complete, production-ready TypeScript projects through a 5-phase cycle, then maintains them:

1. **Scoping** - destination folder, project parameters, **use case** (CLI tool, library, service, extension, application; for an extension, the **host** is asked too, VS Code recommended), **Salesforce context** (detected from your objective: confirmed, absent, or asked when ambiguous), output formats and runtime interactivity (CLI only), tests. Each option comes with a plain-language consequence. Execution shape, distribution, and config strategy are stated framework defaults (overridable on request), not questions.
2. **Featuring** - feature elicitation (commands for a CLI), MoSCoW prioritization, locked sizing.
3. **Surfaces** - map each validated feature onto the interface of the use case: CLI commands (positional args, flags, input source, output format + destination, exit codes), public API of a library, endpoints of a service, contributions of an extension, screens of an application.
4. **Architecture** - full file tree for the use case (and the Salesforce layer when confirmed), `Result<T>` + named errors, config keys - locked before any code is written.
5. **Development** - auto-chained batch delivery, executable verification (install, typecheck, lint, build, smoke).

Each phase writes a spec in the user's language to `docs/specs/` (`01-scoping` ... `04-architect`); the contract is the source of truth.

**Maintenance commands**: `/yarn-add-feature` (add a feature, contract-compliant, explicit contract-diff validation before writing), `/yarn-trace-feature` (trace behavior across the layers), `/yarn-fix-issue` (root-cause debugging), `/yarn-refactor-code` (validated, behavior-preserving), `/yarn-release` (cut a SemVer release from the accumulated changelog, then follow the release channel of the use case), `/yarn-run-tests` (executable verification). Plus `/yarn-load-project` and `/yarn-generate-readme` for existing projects.

Every generated project enforces the same layered architecture, the `Result<T>` + named errors contract, and secret-safe handling. When Salesforce is confirmed, it also gets the `cross-spawn` `sf` runner (tokens stay in the `sf` OS keychain, never in a file).

---

## Use cases

Fixed in Phase 1, locked in the Phase 4 contract. Detail and selection guide: `rules/use-cases.md`.

| Use case    | Entry point        | Typical output                      | Release channel (`rules/distribution.md`) |
| ----------- | ------------------ | ----------------------------------- | ----------------------------------------- |
| CLI tool    | `src/cli.ts`       | executable bin bundled by `tsup`    | npm registry, or local run (`yarn dev`, `node dist/cli.js`) |
| Library     | `src/index.ts`     | importable package (ESM, types)     | npm registry                              |
| Service     | `src/server.ts`    | long-running Node.js process        | run locally, or external target (opt-in)  |
| Extension   | `src/extension.ts` | extension bundle for its host (VS Code recommended; host asked in Phase 1) | packaged artifact installed by hand (`.vsix` for VS Code), or host store (opt-in) |
| Application | `src/main.tsx`     | web UI built by Vite (React)        | local build, or external target (opt-in)  |

Common core for all five: `src/`, `test/` mirroring `src/`, shared files `config.ts`, `logger.ts` (where the use case imposes it), `types.ts`, `errors.ts`. Only the entry point and the layers above it change.

---

## Generated project stack

| Element          | Value                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Target           | TypeScript project: CLI tool, library, service, extension, or application (cross-OS, Windows-first)    |
| Runtime          | Node.js 24+ (`engines.node >=24`) · ESM (`"type": "module"`)                                           |
| Language         | TypeScript strict                                                                                      |
| Package manager  | **Yarn Berry 4.x** only · `package.json` + `yarn.lock` + `.yarnrc.yml` · `packageManager` pinned · `nodeLinker: node-modules`, no zero-install |
| Architecture     | Common core + one composition root per use case · `commands` / `services` / `output` layers for a CLI |
| CLI parser       | `commander` (default) · `node:util parseArgs` (small-project fallback) - CLI use case only             |
| Salesforce CLI   | `sf` v2, **only if confirmed in Phase 1** · `cross-spawn` runner + typed helpers                       |
| Coupling mode    | `standalone` (org via `sf`) or `sfdx-project` (inside an SFDX folder), only when Salesforce is confirmed |
| UI               | Vite + React + TypeScript strict - projects with UI only (`rules/ui.md`)                               |
| Config           | Cascade `config.ts` < `.env` (native) < CLI flags (CLI) · non-secret only                              |
| Secrets          | Never in a file (with Salesforce: held by the `sf` OS keychain)                                        |
| Logging          | `pino` (file + stderr, `pino-pretty` in dev) for CLI and service                                       |
| Runtime feedback | Hand-rolled progress reporter - steps/spinner on stderr (bar only for a known total), auto-TTY, `--no-progress` - CLI only |
| Output           | Formatters - JSON · console table always; CSV (`csv-stringify`) · xlsx (`exceljs`) only if selected in Phase 1 - CLI only |
| Error contract   | `Result<T>` + named errors + exit-code mapping (0/1/2) at the CLI boundary                             |
| Build            | `tsup` (Node bundle, shebang for a CLI) · `tsx` (dev) · `tsc --noEmit` · Vite for the browser UI       |
| Tests            | `vitest` (opt-in) · `jsdom` + `@testing-library/react` for a project with UI                          |
| Quality          | ESLint (flat config) + Prettier · TSDoc                                                                |

---

## Salesforce (optional)

Decided in Phase 1 by `/yarn-p1-scoping`, in three cases:

- **Clear Salesforce context** (objective names Salesforce, an org, SOQL, Apex, metadata, `sf`...): coupling confirmed, `salesforce-cli-reference/` loaded, `rules/sf-cli.md` applied (plus `rules/sfdx-project.md` for the `sfdx-project` mode).
- **Clear absence**: no coupling. None of the Salesforce material is loaded, no `src/sf/` layer.
- **Ambiguity**: the user is asked, with `AskUserQuestion`, whether a Salesforce need and the use of the Salesforce CLI reference commands apply. Never decided silently.

---

## Requirements

```bash
claude --version    # Claude Code CLI - installed and authenticated
node --version      # Node.js 24+
yarn --version      # Yarn Berry 4.x
sf --version        # Salesforce CLI v2 - only when Salesforce coupling is confirmed
```

---

## Getting started

```bash
git clone https://github.com/TiercelinQ/yarn-generator.git
cd yarn-generator
claude
```

Then in Claude Code:

```
/yarn-app
```

---

## Commands

| Command                    | Action                                                                |
| -------------------------- | --------------------------------------------------------------------- |
| `/yarn-app`                | Start menu (4 entry points incl. maintenance)                         |
| `/yarn-p1-scoping`         | Scoping - use case, Salesforce context, output, tests, execution      |
| `/yarn-p2-featuring`       | Featuring - feature sheet + locked sizing                             |
| `/yarn-p3-surfaces`        | Surfaces - the interface contract of the use case                     |
| `/yarn-p4-architect`       | Architect - locked architecture contract                              |
| `/yarn-p5-development`     | Auto-chained batch delivery                                           |
| `/yarn-add-feature`        | Add a feature to a shipped project (contract diff first)              |
| `/yarn-trace-feature`      | Trace a feature across the layers                                     |
| `/yarn-fix-issue`          | Fix a bug - decision tree, root cause                                 |
| `/yarn-refactor-code`      | Refactor under explicit validation only                               |
| `/yarn-release`            | Cut a SemVer release from the accumulated changelog                   |
| `/yarn-run-tests`          | Executable verification (install, typecheck, lint, build, smoke)      |
| `/yarn-load-project`       | Load an existing project from its specs/README                        |
| `/yarn-generate-readme`    | Generate README.md for an existing project                            |
| `/yarn-save-session`       | Save current session state                                            |
| `/yarn-show-state`         | Current project status                                                |
| `/yarn-show-contract`      | Display locked architecture contract                                  |
| `/yarn-save-memory`        | Persist a note in Claude Code native memory                           |

---

## Generated project structure

Example for the CLI use case with Salesforce coupling. The other use cases swap the entry point and the layers above the common core (see `rules/use-cases.md` and `rules/architecture.md`).

```
mytool/
├── package.json · yarn.lock · .yarnrc.yml · tsconfig.json · tsup.config.ts · eslint.config.mjs · .prettierrc
├── .prettierignore · .env.example · .gitignore · README.md
├── CLAUDE.md                      # Project identity (origin, business context, deviations)
├── .claude/settings.json          # Guardrails + Stop verification hook (self-enforced project)
├── docs/specs/                    # Generation specs (user's language): 01-scoping ... 04-architect
├── docs/release/CHANGELOG.md       # SemVer changelog (Keep a Changelog, English) - cut by /yarn-release
├── docs/sessions/SESSION_<Project>_S0.md  # Delivery baseline session (auto, end of Phase 5)
├── test/                          # Mirrors src/ (when tests are enabled)
└── src/
    ├── cli.ts                     # bin entry: commander program, exit-code mapping (index.ts, server.ts, extension.ts or main.tsx for the other use cases)
    ├── config.ts · logger.ts · progress.ts · types.ts · errors.ts   # shared - importable by all layers
    ├── sf/                        # Salesforce only: runner.ts (cross-spawn) · helpers.ts · project.ts (sfdx mode)
    ├── services/                  # business logic - returns Result<T>
    ├── commands/                  # CLI only: thin adapters
    └── output/                    # CLI only: index.ts (dispatch) · json.ts · table.ts (+ csv.ts · xlsx.ts if selected)
```

A project without Salesforce has no `src/sf/` folder. A project with UI follows `rules/ui.md`.

---

## Versioning & changelog

Every generated project carries a SemVer version and a changelog at `docs/release/CHANGELOG.md` (Keep a Changelog format, written in English). Maintenance skills (`add-feature`, `fix-issue`, `refactor-code`) accumulate entries under `## [Unreleased]`; `/yarn-release` freezes them into a dated version block and bumps the version source (`package.json` version; `APP_VERSION` is derived from it, nothing to sync), then follows the release channel of the use case (`rules/distribution.md`). Distribution is personal by default; external publication is an opt-in choice made in Phase 1. The version is never bumped silently. See `rules/versioning.md`.

The `CHANGELOG.md` at the root of this repository is the changelog of the generator itself, distinct from the `docs/release/CHANGELOG.md` of each generated project.

---

## CLI contract (CLI use case, in place of a design system)

A CLI is headless, so instead of a visual design system it enforces a **CLI contract** (`rules/cli.md`):

- **`stdout` carries data only** (the `output/` formatter's bytes) - pipeable to `jq` and friends.
- **`stderr` carries logs and human messages** - `pino` writes there and to a log file (`~/.<tool>/logs/app.log`, since a CLI runs from any folder); `stdout` is never a log destination.
- **Exit codes**: `0` success · `1` runtime error · `2` usage/validation error - mapped once at the `cli.ts` boundary, never scattered.
- **`Result<T>`** flows up from `services`/`sf`/`output`; the command reads `result.ok`; the boundary maps a failure to an exit code.
- **Non-interactive by default** (cron / Windows Task Scheduler friendly); interactive prompts (`@clack/prompts`) are opt-in and guarded against a non-TTY run.
- **Runtime progress** on `stderr` (steps/spinner, bar only when a total is known) shows the operations a command performs - auto-on a TTY, silent when piped / cron / CI, `--no-progress` to disable; `stdout` stays clean.

Library, service, extension, and application projects follow the contract of their own use case (`rules/use-cases.md`); projects with UI follow `rules/ui.md`.

---

## Salesforce coupling (when confirmed)

Applies only when Salesforce coupling is confirmed in Phase 1. The generated project then integrates the `sf` v2 CLI (never `sfdx` legacy):

- All `sf` calls go through `src/sf/runner.ts` via **`cross-spawn`** with an argument array (resolves the Windows `sf.cmd` shim, no injectable shell).
- The project **never handles OAuth tokens** - `sf` owns the auth flow and the OS keychain; the project stores at most a non-secret org alias.
- The binary is resolved cross-OS via `SF_CLI_PATH` / the `sfPath` config (no platform branch); `ENOENT` maps to a clear "sf not found" error.
- Every `sf` command/flag is verified against `.claude/salesforce-cli-reference/` (loaded by topic) - never invented from memory.

---

## Yarn Berry

Every install, script, and release command goes through `yarn` (`yarn install`, `yarn dev`, `yarn build`, `yarn typecheck`, `yarn lint`, `yarn format`, `yarn test`; release: `yarn version`, `yarn pack`, `yarn npm publish`). Never `npm`, `npx`, or `pnpm`. Every `yarn` command and flag is verified against `.claude/yarn-berry-cli-reference/` (index first, then only the needed command file) - never invented from memory.

---

## Security

`.claude/rules/security.md` is non-negotiable, applied to 100% of generated projects: external data validated from `unknown`, export paths resolved and confined under the base directory (no traversal; a user-chosen storage path is resolved, not confined, and declared as a documented deviation), **no secret in `.env` / config / logs / commits**. With Salesforce: `cross-spawn` argument array (no `shell: true`, no concatenated command string), `sf` keychain only. `/yarn-fix-issue` and `/yarn-add-feature` route through it.

---

## Documentation

- [GUIDE.md](GUIDE.md) - full usage guide
- `.claude/rules/` - domain rules:
  - `use-cases.md` · `architecture.md` · `cli.md` · `errors.md` · `config.md` · `security.md` · `sf-cli.md` · `sfdx-project.md` · `output.md` · `logging.md` · `progress.md` · `ui.md` · `tests.md` · `versioning.md` · `distribution.md`
  - `verification.md` - single source of truth for executable + static checks
  - `readme.md` - README synchronization rule
- `.claude/yarn-berry-cli-reference/` - Yarn Berry command/flag catalog (index first, then one file per command)
- `.claude/salesforce-cli-reference/` - `sf` v2 command/flag catalog (index first, then one file per topic), loaded only when Salesforce coupling is confirmed

---

## Generator family

| Generator | Stack | Target |
| --------- | ----- | ------ |
| [python-app-generator](https://github.com/TiercelinQ/python-app-generator) | Python · PySide6 · QSS | Windows desktop |
| [electron-app-generator](https://github.com/TiercelinQ/electron-app-generator) | Node.js · Electron · React · TS | Windows desktop |
| [dotnet-wpf-app-generator](https://github.com/TiercelinQ/dotnet-wpf-app-generator) | .NET 10 · C# · WPF · MVVM | Windows desktop |
| [flutter-app-generator](https://github.com/TiercelinQ/flutter-app-generator) | Flutter · Dart · Riverpod | Android |
| [sf-node-generator](https://github.com/TiercelinQ/sf-node-generator) | Node.js · TypeScript · Salesforce CLI | Headless CLI |
| [vscode-ext-generator](https://github.com/TiercelinQ/vscode-ext-generator) | TypeScript · esbuild · native theming | VS Code extension |
| [local-webapp-generator](https://github.com/TiercelinQ/local-webapp-generator) | Node.js · Express · TS | Local web app |
| [yarn-generator](https://github.com/TiercelinQ/yarn-generator) | Node.js · TypeScript · Yarn Berry (optional Salesforce CLI) | CLI · library · service · extension · application |

---

## License

MIT
