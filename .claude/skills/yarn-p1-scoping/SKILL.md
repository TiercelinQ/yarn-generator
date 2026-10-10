---
name: yarn-p1-scoping
description: Phase 1 of the yarn TypeScript generation cycle (Yarn Berry, Node.js) - scoping with use-case selection (CLI tool, library, service, extension, application), 3-case Salesforce detection (clear, absent, ambiguous), a few user-facing questions that depend on the use case, stated framework defaults (overridable on request), calibration announcement (number of batches), and writing of the scoping spec.
model: sonnet
---

# /yarn-p1-scoping - Scoping

## Role
Project scoper - turn a vague project idea into a bounded, validated scope.

## Goal
Lock the project parameters (use case, Salesforce context, tests, and the use-case-specific parameters, plus execution shape, distribution, config strategy) before any analysis.

## Deliverable
`docs/specs/01-scoping.md` (written in the user's language) + on-screen summary.

---

## 1. Questions

**Phase banner (show first)** - on a new project, first list the 5 phases once (overview in `## PIPELINE` of `CLAUDE.md`). Then output the phase banner as plain Markdown in the user's language, **never inside a code block or fenced block**. Three blocks, each on its own line: (1) H2 heading: Phase 1/5 - Scoping; (2) progress line: ▶ Scoping · Features · Surfaces · Architecture · Development; (3) intent in italics: Destination folder, project parameters, use case, Salesforce context.

Start with the objective, then establish the project name and root (name → location → creation), then fix the **use case** (for an extension, then its **host**) and the **Salesforce context**, then ask the closed parameters with `AskUserQuestion` (one call, split in two when more than 4 questions apply; clickable options, the recommended one first, one plain-language consequence per option). Anything the user cannot decide without seeing its consequence is **auto-detected or a stated default** (§2), never a question - Phase 1 asks only what genuinely needs the user's input.

1. **Objective** - plain text, **not** `AskUserQuestion` (free-form, non-enumerable): "Project objective? (free description - what it does, who uses it)".

### Project name and root (name → location → creation)

> Skip this block if a project root is already established for this flow.

- **Project name** - propose 2-4 candidate names derived from the objective, **in kebab-case** (e.g. `sf-export`, `invoice-api`), the recommended one first, with `AskUserQuestion` (the **Other** option carries a custom name as free-form text). This **single name** is used for the project directory and, for a CLI tool, for the `bin` - no second naming question. Phase 2 confirms it and lets the user adjust the `bin` only if they want it to differ from the folder.
- **Location** - free-form text: `Parent folder where to create the project? (path, e.g. C:\projects)`.
- **Create the folder** - project root = `[parent]\[name]`. Create it, then confirm: `Project root: [path]`. If it already exists and is not empty, warn and ask the user to confirm reuse or pick another name. Store this path as the project root - all generated files and specs (`docs/specs/`) are written there.

### Use case (first closed question, own `AskUserQuestion` call)

The use case is a fixed property of the project, locked in the Phase 4 contract (see `## USE CASES` in `CLAUDE.md` and @rules/use-cases.md). From the objective, propose the most pertinent one as the recommended option and state the one-line rationale before the call. One question, options with a one-line consequence each (the tool takes 2-4 options: put the 4 most plausible for the objective, the **Other** option covers the fifth):

- `CLI tool` - run from a terminal, args in, data out on `stdout` (entry `src/cli.ts`, bundled executable).
- `Library` - imported by other code (entry `src/index.ts`, ESM + types).
- `Service` - long-running Node.js process answering requests (entry `src/server.ts`).
- `Extension` - plugs into a host application (entry `src/extension.ts`).
- `Application` - web UI built with Vite + React (entry `src/main.tsx`, @rules/ui.md).

### Extension host (only if the use case is `Extension`, own `AskUserQuestion` call right after the use case)

The host is a real question, never a fixed value. One closed question "Extension host" (this call is separate from the closed-parameters calls below, so it does not change their question count). If the objective names a host, mark that host as recommended and state the one-line rationale before the call; otherwise recommend `VS Code`. Options:

- `VS Code` (recommended) - documented in this framework; host-specific rules (manifest, webview CSP and messaging, state, packaging) live in the dedicated `vscode` generator framework.
- `Browser extension (Chrome, Firefox)` - this framework prescribes only the common core.
- `JetBrains IDE` - this framework prescribes only the common core.
- the built-in **Other** option covers any other host.

For any host other than VS Code:
1. State in one line (user's language): this framework prescribes only the common core for that host (composition root `src/extension.ts`, `src/contributions/`, services without host import, typed and validated messages, `Result` and named errors).
2. Ask in **plain text** (free-form, not `AskUserQuestion`): the host's manifest or activation contract and its packaging command, or a path to its documentation.
3. Record the answers in `docs/specs/01-scoping.md`. Invent nothing: no manifest field, no packaging or publish command that the user did not state or that is not in the supplied documentation.

### Salesforce detection (before the closed parameters)

Salesforce coupling is **optional and never assumed**. Scan the objective for the Salesforce cluster and resolve it in one of three cases, then state the outcome in one line:

- **Unambiguous terms**: `Salesforce`, `SOQL`, `Apex`, `sObject`, `sfdx-project`, `sfdx-project.json`, `package.xml`, `.forceignore`, `2GP`, `permission set`, `Dev Hub`, `scratch org`, `sf` used as the Salesforce CLI.
- **Generic terms** (not enough alone): `org`, `sandbox`, `metadata`, `deploy`, `retrieve`, `source`, `CRM`, `records`, `admin tooling`.

1. **Clear** (at least one unambiguous term): coupling is **confirmed**. Load `salesforce-cli-reference/` (read `index.md` first, then only the topic file needed - @rules/sf-cli.md), apply @rules/sf-cli.md, and ask the **coupling mode** in the closed-parameters call (below). `sfdx-project` mode also applies @rules/sfdx-project.md.
2. **Absent** (nothing Salesforce-related, no generic cue): **no coupling**. State it in one line. `salesforce-cli-reference/`, @rules/sf-cli.md and @rules/sfdx-project.md stay unloaded, no `src/sf/` layer is planned, no coupling-mode question.
3. **Ambiguous** (only generic terms, or the objective could involve Salesforce without saying): ask the user with `AskUserQuestion` (never decide silently), in the same call as the use case when possible. One question, two options, the one best supported by the objective marked recommended:
   - `Yes` - a Salesforce need exists and the Salesforce CLI reference commands apply (coupling confirmed, as in case 1).
   - `No` - no Salesforce need (no coupling, as in case 2).

The Salesforce CLI is `sf` v2 only, never legacy `sfdx`. Record the resolved case and its source (objective wording or user answer) in the spec.

### Closed parameters

2. **`AskUserQuestion` - at most 4 questions per call** (each with a recommended option and a one-line consequence). The question set **depends on the use case and the Salesforce outcome**; ask only the ones in the row of the chosen use case, drop the rows that do not apply, split into a second call if more than 4 remain (a CLI tool with Salesforce confirmed has 5, so it takes two calls):

   | Question | Applies to | Source |
   | -------- | ---------- | ------ |
   | Coupling mode | any use case, only if Salesforce is confirmed | @rules/sfdx-project.md · @rules/sf-cli.md |
   | Output formats | CLI tool only | @rules/output.md |
   | Runtime interactivity | CLI tool only | @rules/cli.md |
   | UI choices | application, and extension with a webview only | @rules/ui.md |
   | Automated tests | all use cases | @rules/tests.md |
   | Distribution | all use cases | @rules/distribution.md |

   - **Coupling mode** (only if Salesforce is confirmed): `standalone` - reach the org via `sf`, no project folder (recommended unless the objective needs a source tree) · `sfdx-project` - the project runs inside an `sfdx-project.json` folder and gains deploy / retrieve / source features. Recommend `sfdx-project` if the objective mentions a **local source tree** (project / source / deploy / retrieve / `sfdx-project.json` / `package.xml` / `.forceignore`), else `standalone`. State the one-line rationale before the call. If `sfdx-project` is chosen, **afterwards** ask the SFDX project folder path as free-form text (`SFDX project folder? (the one holding sfdx-project.json)`), or detect an `sfdx-project.json` under the chosen root.
   - **Output formats** (CLI tool only, @rules/output.md): ask with `multiSelect`. Options: `JSON + table` (recommended - JSON to pipe into `jq`/CI, table to read on screen) · `JSON only` · `CSV`; the **Other** option covers `xlsx` or a custom combination. **The selection decides which formatters ship**, not only the default: `json.ts` and `table.ts` always ship; `csv.ts` (+ the `csv-stringify` dependency) ships only if CSV is selected; `xlsx.ts` (+ `exceljs`) only if xlsx is selected. `--format` choices, `--help` and the README list only the shipped formats, and the default `--format` is one of them. A later `/yarn-add-feature` that adds a format adds the file and its dependency.
   - **Runtime interactivity** (CLI tool only, @rules/cli.md): `Non-interactive` (recommended - args in → run → exit, safe for cron/CI) · `Interactive prompts` (`@clack/prompts`, always guarded against a non-TTY / `--yes` run).
   - **UI choices** (application, and extension with a webview only, @rules/ui.md): ask only the UI choices that @rules/ui.md designates as Phase 1 questions, each with its recommended option from that file. Library, service, CLI tool: no UI question, no palette, no design system, no i18n.
   - **Automated tests** (`vitest`, @rules/tests.md): `Yes` (recommended - a `test/` suite and one extra delivery batch) · `No` (no test files, one fewer batch). A project with UI adds `jsdom` + `@testing-library/react`; a headless CLI never does.
   - **Distribution** (all use cases, @rules/distribution.md): `Personal use only` (recommended - local build and local run, no external publication) · `External publication` (opt-in). If the user picks `External publication`, ask in **plain text** (free-form, not `AskUserQuestion`) the target (container image, host, installer, archive, GitHub Releases, marketplace, registry...) and the artifact format, and record both in `docs/specs/01-scoping.md`. Assume nothing beyond what the user states. For a CLI tool or a library the usual external target is the npm registry (@rules/distribution.md): propose it in the plain-text question, the user confirms or overrides it. For an extension the usual external target is the store of its host (the VS Code marketplace when host = VS Code); for another host, the publish command comes only from what the user stated in the host questions above. Never write a deployment or publish command that is not verified or given by the user.

## 2. Framework-fixed defaults (stated, not asked)

State these once so the user knows what is non-negotiable - do **not** ask them:
- **Language / module** = TypeScript strict + ESM (`"type": "module"`), Node.js 24+ (`engines.node >=24`).
- **Package manager** = Yarn Berry 4.x only (`package.json` + `yarn.lock` + `.yarnrc.yml`, `nodeLinker: node-modules`, no zero-install, version pinned by `packageManager` - @rules/config.md). Scripts run with `yarn <script>`.
- **Build / dev** = `tsup` (Node bundle) · `tsx` (dev) · `tsc --noEmit` (typecheck). The browser UI (application, extension webview) builds with Vite.
- **Error contract** = `Result<T>` + named errors (@rules/errors.md). CLI tool adds: `stdout` = data / `stderr` = logs, exit codes `0`/`1`/`2` (@rules/cli.md).
- **CLI tool only**: **CLI parser** = `commander` (`node:util parseArgs` only for a 1-2 script project) · **Runtime feedback** = progress reporter (`src/progress.ts`) on `stderr`, auto-on a TTY, `--no-progress` to disable (@rules/progress.md).
- **CLI tool and service**: **Logger** = `pino` (file + `stderr`, `pino-pretty` in dev - @rules/logging.md). Other use cases follow @rules/use-cases.md.
- **Application and extension webview**: Vite + React + TypeScript strict (@rules/ui.md).
- **Salesforce (only if confirmed)** = **`sf` v2 only** (never legacy `sfdx`); `cross-spawn` runner in `src/sf/`; the project never handles tokens - `sf` owns the OS keychain (@rules/sf-cli.md · @rules/security.md).

### Project-shape defaults (stated, not asked - overridable on request)

These were previously questions. Each has one sensible default per use case, and the user rarely has the context to choose meaningfully up front - so **state the default, do not ask**. The user overrides only by saying so.

- **Execution shape** (@rules/architecture.md · @rules/use-cases.md) = fixed by the use case: CLI tool = single CLI with subcommands (`mytool org list`, `mytool data query ...`); library = one public entry `src/index.ts`; service = one process, composition root `src/server.ts`; extension = one bundle, composition root `src/extension.ts`; application = one Vite app, root `src/main.tsx`. CLI override on request: `+ standalone yarn scripts` (adds `scripts/` for one-off jobs) or `library + bins` (also a programmatic API - `tsup` emits `.d.ts`, @rules/config.md).
- **Distribution** (@rules/distribution.md) is **asked** (closed question `Distribution`, above), not a stated default: personal by default for every use case (CLI tool: `yarn dev` / `node dist/cli.js`; service: `yarn node dist/server.js` from the built bundle; extension: when host = VS Code, `.vsix` built with `vsce` and installed by hand, for another host the packaged artifact installed by hand per the contract the user stated; application: `yarn build` then `yarn preview` or the built `dist/`). External publication is opt-in. Override on request for a CLI tool: `bundled single-file exe`.
- **Config strategy** (@rules/config.md) = full cascade `config.ts < .env < flags` (the complete `resolveConfig()`; the flags layer applies to a CLI tool only, the others stop at `config.ts < .env`). Override on request: `.env + flags` or `flags + config.ts only` (CLI tool).

State them in **one line** (user's language), e.g.: "Défauts appliqués - CLI à sous-commandes, usage personnel, config en cascade `config.ts < .env < flags`. Pour en changer (scripts autonomes, paquet publié/exe, config réduite), dis-le maintenant ; sinon on continue." Only if the user asks to change one do you turn it into an `AskUserQuestion`.

## 3. Provisional calibration - announced at the end of Phase 1

Apply the CALIBRATION table in `CLAUDE.md` (canonical source) - it holds the size thresholds, the batch counts, and the +1 batch when tests are enabled; do not restate them here. The core (`types`, `errors`, `config`, `logger`, and for a CLI `progress` + `output/`) ships in Batch 1 (with the `sf` runner when Salesforce is confirmed) and the composition root ships in the last batch; the `output/` formatters (CLI), the Salesforce `sf/` layer, the UI and the coupling mode add files and push the size up (no dedicated batch).

Announce (in the user's language):

Provisional calibration: [Small | Medium/Large] - [N] batches (incl. 1 test batch if enabled)

The real feature count is not known yet (features are elicited in Phase 2). The calibration is **confirmed and locked at the end of Phase 2**, on the v1.0 feature count.

## 4. Libraries

Any library outside the validated stack is proposed and validated **here** - none can be added later without the deviation protocol (Phase 4). Candidates tied to the answers above:
- a schema/validation lib (`zod`) - otherwise data crossing a trust boundary is validated with hand-written TS type guards (@rules/security.md).
- `@clack/prompts` - only if **Runtime interactivity = Interactive** (CLI tool).
- `csv-stringify` / `exceljs` - only if CSV / xlsx was selected in **Output formats** (CLI tool).
- UI dependencies - only for a project with UI (application, extension webview): `vite`, `@vitejs/plugin-react`, `react`, `react-dom`, and, if tests are enabled, `jsdom` + `@testing-library/react`. No version number here: the validated ranges of `@rules/config.md` are used as written at generation (re-confirm with `yarn npm info <package>` only when that file's maintenance note calls for a refresh).

State the resolved library list (it may be "none beyond the fixed stack").

## 5. Write the spec

Write `docs/specs/01-scoping.md` (in the user's language) capturing: objective, **use case** (+ `host = <answer>` if `Extension`, and for a host other than VS Code the manifest or activation contract and the packaging command, or the documentation path, stated by the user), **Salesforce context** (case: clear / absent / ambiguous-resolved, and the decision), **coupling mode** (+ the SFDX project path if `sfdx-project`; omitted when no Salesforce), the use-case-specific parameters (output formats + default `--format` and runtime interactivity for a CLI tool; UI choices for an application / extension webview), tests (Yes/No), execution shape, distribution (`Personal use only`, or `External publication` with the target and artifact format stated by the user), config strategy, the framework-fixed defaults, the validated libraries, and the provisional calibration (size + number of batches - confirmed in Phase 2). If `docs/specs/` does not exist yet, create it (it lives in the generated project root).

→ Chain to `/yarn-p2-featuring` after validation.
