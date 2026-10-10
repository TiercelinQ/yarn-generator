# Verification rules - single source of truth

> Centralized, reusable verification for the whole framework. Referenced by `/yarn-p5-development`, `/yarn-add-feature`, `/yarn-fix-issue`, and `/yarn-run-tests` - never duplicated in those skills.
> Two parts: **executable verification** (run real commands) and **static integrity** (read the code). Run silently; report only on a discrepancy.
> Every `yarn` command below is verified against `yarn-berry-cli-reference/` (`yarn-install.md`, `yarn-run.md`). Never `npm`, `npx`, or `pnpm`.

---

## A. Executable verification (run the commands)

When the environment allows it (Node 24 LTS+ and Yarn Berry available through the `packageManager` field), these commands are **mandatory** and a failure is **blocking** - do not mark work as done while any of them fails. Run them in order:

```
yarn install                 # dependencies resolve
yarn typecheck               # tsc --noEmit - MUST be clean
yarn lint                    # eslint (flat config) - clean
yarn build                   # tsup (Node targets) or vite build (application) - produces dist/
yarn test                    # vitest run - only if tests were enabled (Phase 1); else skip - do NOT scaffold a suite
<smoke for the use case>     # see the table below
```

Smoke by use case:

| Use case    | Smoke command(s)                                                                                       | What it proves |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------- |
| CLI tool    | `node dist/cli.js --help` (prints usage, exit 0) and `node dist/cli.js --version` (prints the version, exit 0) | CLI wiring: commander parse, composition root, exit-0 path |
| Library     | `node --input-type=module -e "import('./dist/index.js').then((m) => console.log(Object.keys(m)))"`    | The built entry imports and exposes the declared public API |
| Service     | Start `node dist/server.js` in the background, query the health endpoint with a Node `fetch` one-liner, then stop the process | The server boots, binds, and answers its health check |
| Extension   | `yarn build` clean; loading the `.vsix` in VS Code is manual | The extension bundle builds |
| Application | `yarn build` (Vite) clean, `dist/index.html` present                                                   | The browser bundle builds |

> The Extension row assumes host = VS Code (chosen in Phase 1). Another host follows the same boundary with its own notification and log mechanism; loading the packaged artifact in that host is manual too.

Rules:
- A non-zero exit or any reported error is a failure -> fix the root cause, do not silence the rule. Re-run until clean.
- **Lockfile check**: `yarn install --immutable` exits in error if `yarn.lock` would change (`yarn-install.md`) - use it once on the final run to prove the committed lockfile is complete.
- **Smoke scope**: the CLI `--help` / `--version` exercise the CLI wiring **without an org**. With Salesforce coupling, the **full** smoke of real `sf` operations (a live `sf data query`, `sf project deploy`) needs an **authenticated org** reachable through `sf` - that is **out of automatic scope**. State it explicitly to the user; never fake it.
- If tests are enabled, `yarn test` is part of the blocking chain (exit 0). If not, skip it - do **not** scaffold a suite to satisfy the step (`@rules/tests.md`).
- If Node/Yarn is **not** available in the environment, say so explicitly, fall back to the static checks below, and tell the user which commands they must run themselves before considering the work verified. **Never claim a clean typecheck / build you could not run.**
- Quote the relevant command output as proof when reporting completion.

---

## B. Static integrity (read the code)

### Every batch / every change
1. TypeScript compiles (`tsc --noEmit` mentally, then confirmed by §A when the env is available).
2. Imports: all used, none missing, **unidirectional** - composition root -> adapters -> services -> `sf` (Salesforce) / `output` (CLI). `output/` imports no `sf/` and no business/service module; `sf/` imports nothing from the adapters or the entry point (no `commander`); `services/` imports no `commander` and never calls `process.exit`. `types.ts` / `config.ts` / `errors.ts` are importable by all layers. See `@rules/architecture.md`.
3. Layer responsibilities: adapters (`commands/`, `routes/`, `contributions/`, `ui/`) are thin (parse input -> call a service -> format) with **no business logic**; `services/` hold the logic with **no formatting** and **no `commander`**; with Salesforce, process **spawn lives only in `src/sf/runner.ts`**; `process.exit` **only in `cli.ts`** (CLI). See `@rules/architecture.md` / `@rules/cli.md` anti-patterns.
4. Zero `// TODO`, zero unjustified empty implementation, zero unjustified `any`, zero `console.log` (logging goes through `src/logger.ts` where the use case imposes it - `@rules/logging.md`).
5. A global `process.on("uncaughtException")` **and** `process.on("unhandledRejection")` handler is present in the Node.js entry point (`src/cli.ts`, `src/server.ts`) (`@rules/errors.md`).
6. **CLI I/O contract** (CLI): `stdout` carries **data only** (pipeable); `stderr` carries logs and human messages - respected everywhere (`@rules/cli.md`).
7. Exit-code mapping present at the CLI boundary (CLI): `0` success · `1` runtime error · `2` usage/validation error (`@rules/cli.md` / `@rules/errors.md`).
8. **Yarn Berry** (`@rules/config.md`): `package.json` carries the `packageManager` field (`yarn@4.x`) and `"type": "module"`; `.yarnrc.yml` has `nodeLinker: node-modules`; `yarn.lock` is present and committed (not gitignored); **no npm artifact** (`package-lock.json`, `npm-shrinkwrap.json`) and no `npm` / `npx` / `pnpm` command in scripts, README, or docs.
9. **UI** (projects with UI only, `@rules/ui.md`): `vite.config.ts` and `index.html` present, `src/main.tsx` is the only mount point, `jsx: "react-jsx"` set in `tsconfig.json`, no secret in the bundle, and UI dependencies carry no unvalidated library (Phase 1).

### Last batch only - cross-file
10. Every `Result` is surfaced correctly end-to-end: a failed `Result` / named error reaches the boundary of the use case (CLI: `cli.ts` -> `stderr` message + the right exit code; service: the error response) - none is swallowed or thrown raw at the user.
11. Adapters ↔ services ↔ (CLI) `output/` formatters wired: every registered command / route / contribution dispatches to a service and renders its result; no orphan adapter, no service unreachable from an adapter.
12. Architectural contract (`docs/specs/04-architect.md`) respected - every file, command/endpoint/contribution/screen, and library matches the locked contract, or a declared+validated deviation exists.
13. `docs/specs/` present and consistent with the delivered code.
14. `docs/release/CHANGELOG.md` present, Keep a Changelog-shaped (English), and its top released version equals `package.json` `"version"` (and therefore the derived `src/config.ts` `APP_VERSION` - no separate mirror to check). See `@rules/versioning.md`.
15. `.gitignore` present at the project root and correct (`@rules/config.md §.gitignore`): ignores `.yarn/*` (with the `!.yarn/patches`, `!.yarn/plugins`, `!.yarn/releases`, `!.yarn/sdks`, `!.yarn/versions` negations), `.pnp.*`, `node_modules/`, the anchored build output (`/dist/`), `logs/` (service started from its project directory; a CLI logs under `~/.<tool>/logs`), `.env`, `exports/`, `tasks/`, `.claude/settings.local.json` + `.claude/agent-memory/`, and `docs/specs/`; **never** ignores `yarn.lock`, `.yarnrc.yml`, `.prettierignore`, `docs/release/CHANGELOG.md`, `.claude/settings.json`, the generated `CLAUDE.md`, `test/`, or `scripts/`. Verify with `git add -A` + `git status`, not only `git check-ignore` (the negation rules mislead it).
16. `.prettierignore` present at the project root with `.yarn`, `yarn.lock`, `dist` (`@rules/config.md §.prettierignore`): `yarn format` must never rewrite the Yarn bundle or the lockfile.

### Per-domain (conditional - see the matching rule for detail)
- **sf-cli** (Salesforce coupling only, `@rules/sf-cli.md`): every `sf` call goes through `src/sf/runner.ts` via **`cross-spawn`** with an **args array** (no `node:child_process` direct, no shell, no spawn from an adapter or `services`); the binary is resolved from PATH or the `SF_CLI_PATH` / `sfPath` config (cross-OS, no platform branch); `ENOENT` -> a clear error pointing to install / `SF_CLI_PATH`; no token read/stored/logged; every helper's command/flags are traceable to a `salesforce-cli-reference/` topic file (no invented `sf` flag); a large text argument (SOQL/SOSL) is routed through `runWithLargeArg` (inline when it fits, temp `--file`/`--query-file` when it would overflow the Windows ~8191-char command line, temp file always removed), and `run()` guards the assembled length, returning a clear error rather than the opaque "Réponse sf illisible".
- **sfdx-project** (Salesforce coupling only, `@rules/sfdx-project.md`): if the coupling mode is `sfdx-project`, the project is detected and validated (`sfdx-project.json` read via `src/sf/project.ts`), `.forceignore` respected, and a mode guard prevents `sfdx-project`-only paths from running under `standalone`.
- **config** (`@rules/config.md`): the cascade resolves in order **defaults < `.env` < flags** in a single `resolveConfig()`; no secret in `.env` or `config.ts`.
- **logging** (`@rules/logging.md`): `src/logger.ts` present and conforming (pino -> file + `stderr`) where the use case imposes it (CLI, service); zero `console.log` in delivered `src/`; no secret/token logged.
- **progress** (CLI only, `@rules/progress.md`): `src/progress.ts` present, a shared singleton (`progress`) importing only `logger`, shipped in Batch 1, with `step` always and `bar` only when an operation with a known total exists, writing **only** to `stderr`; animation gated on `stderr.isTTY && !CI && !debug && --no-progress` unset, degrading to `log.info`/`log.warn` otherwise; `stdout` stays clean when piped (no ANSI/animation leaks); `cli.ts` raises the `pino` level to `warn` while progress is active and auto-disables it under debug logging; the spinner interval is `unref`-ed and the reporter never calls `process.exit`; `output/` does not import `progress`; no new dependency; no `console.*`.
- **output** (CLI only, `@rules/output.md`): every user-facing dataset goes through an `output/` formatter; only the formatters selected in Phase 1 ship (`json` + `table` always, `csv` / `xlsx` and their dependencies only when selected), `--format` choices list only those; an empty dataset prints a valid empty document and exits `0`; `xlsx` (when shipped) is written to a **file only** - the command raises a `ValidationError` (exit `2`) before any work, never dumped to `stdout`.
- **security** (`@rules/security.md`): any spawn uses an args array (no injectable shell); with Salesforce, `cross-spawn` from `src/sf/runner.ts`; any export / output path built from input is resolved and confined (no traversal), a user-chosen storage path is `path.resolve`d and declared as a deviation; secrets stay out of files, logs, and the browser bundle - with Salesforce they stay in the `sf` OS keychain and the project stores at most a non-secret alias; `yarn npm audit` reviewed (`yarn-npm-audit.md`).
- **tests** (`@rules/tests.md`): if enabled, each source module has a matching test (Phase 4 mapping) and `yarn test` exits 0.
- **versioning** (`@rules/versioning.md`): `docs/release/CHANGELOG.md` present and English; top released version == `package.json` `"version"` (`APP_VERSION` is derived from it - no separate mirror to check); maintenance changes recorded under `[Unreleased]` in the right category; after `/yarn-release`, `[Unreleased]` reset empty and the cut block carries the right version + date.

---

## C. Reporting

- All clean -> one short confirmation line in the user's language (no full recap of the checklist).
- Any discrepancy -> name the file, the failing check (§A command output or §B item number), and the fix applied or proposed.
- Verification that could not be run (no Node/Yarn, the host-dependent extension load, or the org-dependent `sf` smoke) -> state it plainly and list the commands the user must run.
