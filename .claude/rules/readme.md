# README synchronization rule

> The generated project's `README.md` is a **derived** document - its source of truth is the code plus `docs/specs/04-architect.md`. After any post-delivery change, the README must keep reflecting what shipped. This is the single, shared definition of when and how to refresh it. Referenced by `/yarn-add-feature`, `/yarn-fix-issue`, `/yarn-refactor-code`.

## Language - English

**Language - English.** The generated `README.md` is always written in English, regardless of the user's interface language. It is the public-facing entry document (rendered on the repository page). Specs under `docs/specs/` stay in the user's language; the README does not.

## What the README documents

The common sections are always present: objective · stack & dependencies · file tree · config keys (`.env` variables, plus CLI flags for a CLI) · install & build (`yarn install`, `yarn build`) · version. The remaining sections depend on the **use case** fixed in Phase 1 (`@rules/use-cases.md`):

| Use case    | Sections specific to the use case                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI tool    | commands & subcommands (the CLI surface: args / flags, exit codes) · output formats (the shipped ones: `json` / `table`, plus `csv` / `xlsx` when selected in Phase 1) · **runtime progress display** (step spinner on `stderr`, plus a bar only if the project has a known-total operation, auto-on a TTY, `--no-progress` to disable - `@rules/progress.md`) · run (`yarn dev ...` or `node dist/cli.js ...` for a personal tool, or the `bin` name once installed from the registry when external publication was chosen) · scheduling note (Windows Task Scheduler / cron, where the progress display is auto-off) |
| Library     | installation as a dependency · public API (exports of `src/index.ts`, signatures, `@throws` or `Result` style) · usage examples · logger injection · supported Node.js version (`engines.node >=24`) · ESM/types entry points |
| Service     | endpoints (method, path, request/response, status mapping) · run (`yarn dev`, `node dist/server.js`) · environment variables · health check · distribution note (personal local run by default; the external target and artifact format only if Phase 1 recorded them) |
| Extension   | contributions (commands, views, settings) · activation · install and debug in VS Code · packaging (`.vsix` built with `vsce`, installed by hand; marketplace only if Phase 1 recorded it) |
| Application | screens and routes · run (`yarn dev`, `yarn build`, `yarn preview`) · build output · environment variables (non-secret) · supported browsers                                    |

> The Extension row assumes host = VS Code (chosen in Phase 1). Another host follows the same boundary with its own notification and log mechanism; its install and packaging lines come from what the user stated in Phase 1.

For a **CLI**, build and run use `yarn build` then `node dist/cli.js ...`. For any use case with tests enabled, add `yarn test`; always list `yarn typecheck`, `yarn lint`, `yarn format` when the scripts exist. Exact sections: `/yarn-generate-readme`.

The **Salesforce prerequisite is documented only when Salesforce coupling is confirmed in Phase 1** (`@rules/sf-cli.md`): the `sf` v2 CLI must be reachable (PATH or `SF_CLI_PATH`), and the README states the coupling mode the project was generated for (`standalone` or `sfdx-project`). Without Salesforce coupling, the README mentions neither `sf`, nor `SF_CLI_PATH`, nor a coupling mode.

## When to refresh (trigger)

Regenerate the README **iff** the change touched a documented aspect above:
- a dependency added/removed, or a stack change,
- the file tree changed (a file / command / service / formatter / endpoint / screen added, renamed, moved, or deleted),
- the surface of the use case changed: a command or subcommand added or renamed, or its flags / exit codes changed (CLI); an export or signature of the public API changed (library); an endpoint added, renamed or its response changed (service); a contribution changed (extension); a screen or route changed (application),
- a config key changed (a `.env` variable or a CLI flag added, renamed, or removed),
- when Salesforce is confirmed: the coupling mode or the `sf` / `SF_CLI_PATH` prerequisite changed,
- build or install/run steps changed (including the scheduling note for a CLI).

A purely internal change (a private helper, the body of an existing service, a bug fix with no structural impact) does **not** trigger a refresh.

A **version bump** does not trigger a regeneration either: `/yarn-release` itself updates the README **title line** (`# [PROJECT_NAME] - v[VERSION]`) as a targeted edit of that single line (its Step 4 - Apply the release), so the public page never shows a stale version next to an up-to-date changelog.

## How to refresh

Regenerate the README via the logic of `/yarn-generate-readme` (reads specs + code), in the same delivery, without asking. Full regeneration - the README is derived, so hand edits are not preserved. No manual "offer" step.

## Read-only skills

Verification/analysis skills (`/yarn-run-tests`, `/yarn-trace-feature`) never rewrite the README. At most they flag it as stale; refreshing is done by the write skills above.
