---
name: yarn-p3-surfaces
description: Phase 3 of the yarn TypeScript generation cycle (Yarn Berry, Node.js) - map each validated v1.0 feature onto the interface surface of the use case (CLI commands, library public API, service endpoints, extension contributions, application screens and flows), grouped confirmation, validated synthesis written to the interface spec before Phase 4.
model: sonnet
---

# /yarn-p3-surfaces - Surfaces (interface contract of the use case)

## Role
Interface designer - map the validated features onto the concrete surface of the use case (`commander` commands, public API, endpoints, contributions, screens).

## Goal
Define, per feature, the exact interface contract of the use case: for a CLI tool, the full command name, args, flags, input source, output format + destination and the `0`/`1`/`2` exit conditions; for a library, the exports, signatures, types and errors; for a service, the routes, payloads and status codes; for an extension, the activation, commands and settings; for an application, the screens and flows. Plus the cross-cutting conventions that make the project consistent.

## Deliverable
`docs/specs/03-surfaces.md` (written in the user's language) + on-screen synthesis.

---

## 1. Proposal

**Phase banner (show first)** - before anything else, output the phase banner as plain Markdown in the user's language, **never inside a code block or fenced block**. Three blocks, each on its own line: (1) H2 heading: Phase 3/5 - Surfaces; (2) progress line: Scoping ✓ · Features ✓ · ▶ Surfaces · Architecture · Development; (3) intent in italics: Map the validated features onto the interface of the use case. Use the label `Surfaces` in the progress map. See `## PIPELINE` in `CLAUDE.md`.

Read `docs/specs/01-scoping.md` (use case, Salesforce context and coupling mode, use-case-specific parameters, tests) and `docs/specs/02-featuring.md` (the validated v1.0 features) for the decisions this phase builds on. **Read the rules of the use case first** (not auto-imported), then follow only the matching sub-section below:

| Use case | Rules to read | Sub-section |
| -------- | ------------- | ----------- |
| CLI tool | `@rules/cli.md`, `@rules/output.md`, `@rules/config.md` | 1.A |
| Library | `@rules/use-cases.md`, `@rules/errors.md` | 1.B |
| Service | `@rules/use-cases.md`, `@rules/errors.md`, `@rules/config.md`, `@rules/security.md` | 1.C |
| Extension | `@rules/use-cases.md` (+ `@rules/ui.md` if it has a webview) | 1.D |
| Application | `@rules/ui.md`, `@rules/use-cases.md` | 1.E |

Based on the features validated in Phase 2, propose the surface of the use case (in the user's language). **Applies only when Salesforce coupling is confirmed in Phase 1**: the baseline `sf` features of the starter scaffold (org access, data query / export, and deploy / retrieve in `sfdx-project` mode, @rules/sf-cli.md) are always part of the surface; without coupling, none of them appears.

### 1.A CLI tool - command surface

Propose a **command tree** (groups → verbs) plus a **per-command spec**. When Salesforce is confirmed, the starter `org` group and the `data query` / `data export` demo commands are always part of the tree (`@rules/sf-cli.md`). Produce:

## Proposed command surface - [APP_NAME]

**Command tree**

```
[APP_NAME]
├── org                          # only if Salesforce is confirmed
│   ├── list                 # list authenticated orgs (default + status)
│   ├── use <alias>          # set the default target-org
│   ├── login <alias>        # sf opens the browser OAuth flow
│   └── logout <alias>       # revoke a local auth
├── data                         # only if Salesforce is confirmed
│   ├── query <soql>         # SOQL → output formatter
│   └── export <soql>        # bulk export → file
└── <group> <verb> ...           # one line per validated v1.0 feature
```

Then, for **each** command, a spec block (template below - repeat it for every command in the tree):

### `<group> <verb>` - [purpose in one line]
- **Positional args**: `<soql>` (required) · `<alias>` (required) · ... - or *none*.
- **Flags** (per-command, on top of the global flags):

  | Flag | Type | Default | Required |
  | ---- | ---- | ------- | -------- |
  | `-f, --format <fmt>` | enum of the **shipped** formats (`table\|json`, plus `csv` / `xlsx` only if selected in Phase 1) | *(per-command default, chosen in §2)* | no |
  | `-o, --output <file>` | path | stdout | no |
  | `--<flag> <value>` | ... | ... | ... |

- **Input source**: flags (primary) · env/config (global settings) · stdin (piped input / NDJSON to import) · file (`--file`). State which the command reads.
- **Output**: default `--format` = *(§2 choice)*; `-o, --output <file>` → file under `exportDir`, else `stdout` (data). `stderr` carries logs + human messages. If `xlsx` ships, it requires a file destination: the command rejects a missing `-o` with a `ValidationError` (exit `2`) before any work.
- **Exit conditions** (`@rules/cli.md`): `0` success - **including an empty result set** of a command that returns a dataset (list, query, export): the formatter prints a valid empty document (json `[]`, table `(0 rows)`, csv header-only or empty, xlsx placeholder sheet), with an optional human note on `stderr`; `kind: "warning"` (non-fatal, stays `0`) is kept for non-dataset commands where nothing was done; `1` runtime failure (IO error, `sf` error when coupled, unexpected throw); `2` usage/validation (bad flag value, missing/invalid argument, unknown `--format`).
- **Interactive prompt**: n/a - non-interactive (fully flag-driven). *(Only if interactivity was enabled in Phase 1:)* the guarded prompt + its safe default - never prompt when `stdin` or `stderr` is not a TTY (prompts are written to `stderr`, `stdout` stays data) or `--yes` is set; a non-TTY run without `--yes` takes the safe default (abort a destructive action). See `@rules/cli.md`.

**Global flags** (every command inherits - resolved once by `resolveConfig()`, cascade `defaults < .env < flags`, `@rules/config.md`):

| Flag | Config field | Type | Default | `.env` key |
| ---- | ------------ | ---- | ------- | ---------- |
| `--export-dir <dir>` | `exportDir` | string | `exports` | `EXPORT_DIR` |
| `--log-level <lvl>` | `logLevel` | pino level | `info` | `LOG_LEVEL` |
| `--no-progress` | - (UI toggle, not in the cascade) | boolean | progress auto-on a TTY | - |
| `--target-org <alias>` | `targetOrg` | string | `sf` default org | `SF_TARGET_ORG` |
| `--api-version <v>` | `apiVersion` | string | `sf` default | `SF_API_VERSION` |
| `--page-size <n>` | `pageSize` | positive int | `2000` | `SF_PAGE_SIZE` |
| `--sf-cli-path <path>` | `sfPath` | absolute path | resolved from `PATH` | `SF_CLI_PATH` |

The four `sf` rows (`--target-org`, `--api-version`, `--page-size`, `--sf-cli-path`) exist **only when Salesforce coupling is confirmed**.

- A global flag or config key that points to the tool's **own storage** (a data file, a config file chosen by the user, e.g. `--data-file`) is resolved with `path.resolve`, not confined under `exportDir`. State it in the spec as a **documented deviation** (reason: user-chosen storage path); paths *written* as exports (`-o`) stay confined (`@rules/security.md` section 3).
- `--help` / `--version` are **auto-provided** by commander - never re-specified. `--version` reads `APP_VERSION` from `config.ts`.
- `--no-progress` disables the live progress display (steps/spinner on `stderr`); the display is auto-on when `stderr` is a TTY and off when piped / `CI` / debug logging - a runtime UI toggle, not a config-cascade key (`@rules/progress.md`).

**Output convention** (`@rules/output.md`, `@rules/cli.md`) - the same across every command:
- `-f, --format <fmt>` picks the `output/` formatter among the shipped ones (`table`, `json`, plus `csv` / `xlsx` only if selected in Phase 1); an unknown format is a usage error (exit `2`); the per-command default is confirmed in §2.
- `-o, --output <file>` redirects the dataset to a file (resolved + confined under `exportDir`, `@rules/security.md`); absent → `stdout`. `-o` is `--output`, **not** a short alias for `--target-org`.
- `stdout` carries **data only** (pipeable: `... --format json | jq ...`); `stderr` carries logs + human messages. With Salesforce, prefer the tool's own `--format json` over exposing `sf`'s raw `--json` envelope.

> **If the coupling mode is `sfdx-project` (Phase 1)** - add the project-scoped command surface on top of the org/data groups (`@rules/sfdx-project.md`), each with its own spec block. Verify each `sf` command and flag in `salesforce-cli-reference/cli_reference_project.md` before writing it:
> - `deploy` → `sf project deploy start`: flags `--source-dir` / `--metadata` / `--manifest`, `--target-org`, `--dry-run`, `--wait`.
> - `retrieve` → `sf project retrieve start`: flags `--source-dir` / `--metadata` / `--manifest`, `--target-org`, `--wait`.
>
> In `standalone` mode, no `deploy` / `retrieve` command exists.

### 1.B Library - public API

Propose the **public API** exposed by `src/index.ts` (the only entry, `@rules/use-cases.md`) plus a **per-export spec**:

## Proposed public API - [PACKAGE_NAME]

**Export list** - one line per exported symbol (function, class, type), grouped by feature. Nothing outside this list is importable.

For **each** export:

### `<symbol>` - [purpose in one line]
- **Signature**: parameters (name, type, optional/required, default) and return type (`Result<T>` or a plain value, per `@rules/errors.md`).
- **Types**: the exported types / interfaces / options objects it uses (all public types are re-exported from `index.ts`; `tsup` emits `.d.ts`).
- **Errors**: the named errors it can return or raise (`src/errors.ts`), and when. Never a raw exception.
- **Side effects**: none (pure) · IO (files, network, `sf` when coupled) - state which.
- **Stability**: public (SemVer-bound) · internal (not exported).

**Conventions**: ESM only, named exports (no default export), no `console.log`, no `process.exit`, no global state, options objects over long positional lists.

### 1.C Service - endpoints and handlers

Propose the **route table** (the process is composed in `src/server.ts`, `@rules/use-cases.md`) plus a **per-endpoint spec**:

## Proposed endpoint surface - [APP_NAME]

**Route table**

| Method | Path | Handler | Purpose |
| ------ | ---- | ------- | ------- |
| GET | `/health` | `health` | liveness probe |
| ... | ... | ... | one line per validated v1.0 feature |

For **each** endpoint:

### `<METHOD> <path>` - [purpose in one line]
- **Request**: path params · query params · body (shape + validation, data crossing the trust boundary is `unknown` then validated, `@rules/security.md`).
- **Response**: success payload shape + status code (`200` / `201` / `204`).
- **Errors**: status codes mapped from named errors (`400` validation · `401`/`403` auth · `404` not found · `409` conflict · `500` unexpected), body shape of an error (`code`, `message`). Mapping follows `@rules/errors.md`.
- **Auth**: none · token · other (never a secret in a file, `@rules/security.md`).
- **Service called**: the `services/` function the handler delegates to (adapters stay thin).

**Cross-cutting**: config fields (host, port, log level via `resolveConfig()`, `@rules/config.md`), request logging with `pino`, graceful shutdown, a global `uncaughtException` / `unhandledRejection` handler.

### 1.D Extension - contributions

Propose the **contributions** of the extension (composed in `src/extension.ts`, `@rules/use-cases.md`).

The host is the one recorded in `docs/specs/01-scoping.md`. When host = VS Code: contributions map to `contributes` entries of the `package.json` manifest and to `activationEvents`; for host-specific rules, use the dedicated `vscode` generator framework. Another host follows the same boundary with its own notification and log mechanism; map the contributions to the manifest or activation contract the user stated in Phase 1, and invent nothing.

## Proposed contributions - [EXTENSION_NAME]

- **Activation**: the event(s) that start the extension and what `activate` does (and `deactivate`, if the host has one).
- **Commands**: id · title · handler (the `services/` function it calls) · where it appears (palette, menu, shortcut).
- **Settings**: key · type · default · description (user-facing, non-secret, `@rules/config.md`).
- **Views / webview** (only if the extension has one): the UI follows `@rules/ui.md` (Vite + React) - list the screens as in 1.E.
- **Events**: the host events the extension listens to, and the handler of each.

For **each** command, a block: purpose · input (prompt, selection, setting) · output (message, view update, file) · failure mapping (named error → host notification).

### 1.E Application - screens and flows

Propose the **screens** and the **flows** (composed in `src/main.tsx`, Vite + React, `@rules/ui.md`).

## Proposed screens - [APP_NAME]

**Screen map**

```
[APP_NAME]
├── <Screen A>        # entry screen
│   └── <Panel / dialog>
└── <Screen B>
```

For **each** screen:

### `<Screen>` - [purpose in one line]
- **Route / entry**: how the user reaches it.
- **Content**: the data shown, the components, the actions available.
- **Data**: where it comes from (`services/`, local state), loading / empty / error states (named error → message).
- **Navigation**: the screens it leads to.

**Flows**: one numbered flow per validated v1.0 feature (start screen → steps → end state). Palette, design system, i18n and accessibility choices follow `@rules/ui.md`.

## 2. Customization - questions via `AskUserQuestion`

For each question, mark the recommended option `(recommended)`, chosen from the validated feature context. Ask with `AskUserQuestion` (clickable options, 2-4 each, built-in **Other** for a custom value; ≤ 4 questions per call - split into several calls). Ask in the user's language. Show only the questions relevant to the use case and the validated features.

Grouped confirmations (first call, ≤ 4 questions), by use case:

- **CLI tool**
  1. **Command grouping** - keep the proposed tree (`org`, `data`, `<group>` ...)? `Keep as proposed (recommended)` · `Adjust` (**Other** → free-form rename/regroup).
  2. **Tool-wide default output format** (the fallback for a command that sets none): `table` (recommended - human-readable) · `json` · `csv` (only if CSV was selected in Phase 1).
  3. **Default destination for an export-style command**: `stdout` (recommended for a query) · a file under `exportDir` (recommended for an export / bulk command).
  4. **[Only if interactivity was enabled in Phase 1]** which destructive command(s) prompt for confirmation (always guarded - non-TTY / `--yes` → safe default): the enumerated destructive commands. If interactivity is off, skip this - every command is fully flag-driven.
- **Library**
  1. **Export grouping** - keep the proposed export list? `Keep as proposed (recommended)` · `Adjust` (**Other**).
  2. **Error style** of the public API: `Result<T>` return (recommended, `@rules/errors.md`) · named errors raised.
  3. **Single entry or sub-path exports** (`exports` map in `package.json`): `Single entry (recommended)` · `Sub-path exports`.
- **Service**
  1. **Route grouping / prefix** - keep the proposed table? `Keep as proposed (recommended)` · `Adjust` (**Other**).
  2. **Error body shape**: `{ code, message }` (recommended) · other (**Other**).
  3. **Authentication on the routes**: `None` · `Token` · other (**Other**); recommend the most pertinent for the objective.
- **Extension**
  1. **Contribution grouping** - keep the proposed commands / settings? `Keep as proposed (recommended)` · `Adjust` (**Other**).
  2. **Activation event**: the recommended one for the validated features · another (**Other**).
- **Application**
  1. **Screen map** - keep the proposed screens? `Keep as proposed (recommended)` · `Adjust` (**Other**).
  2. **Navigation style**: the option recommended by `@rules/ui.md` · another (**Other**).

**CLI tool only** - per-command default format (next call(s), one question per data-producing command, batched ≤ 4 per call, split as needed): among the formats shipped (`table` · `json`, plus `csv` / `xlsx` only if selected in Phase 1). Recommend `table` for interactive reads, and `csv` / `xlsx` to a file for a query written out. (A bulk export uses the Bulk API - `csv` / `json` only, always to a file - not the `output/` formatters, so `xlsx` does not apply there.)

Renames and wording beyond the enumerable choices are handled free-form at the synthesis validation, not via `AskUserQuestion`.

## 3. Synthesis

Produce the complete synthesis of the validated interface (in the user's language), per use case:
- **CLI tool**: the command tree, each command's spec block (positional args, per-command flags, input source, output format + destination, exit conditions, interactive prompt), the global flags table, the `--format`/`--output` convention, and, in `sfdx-project` mode, the `deploy` / `retrieve` surface.
- **Library**: the export list and each export's spec block (signature, types, errors, side effects, stability).
- **Service**: the route table and each endpoint's spec block (request, response, errors, auth, service called) + cross-cutting.
- **Extension**: activation, commands, settings, views, events.
- **Application**: the screen map, each screen's block, the flows.

Note any deviation from the starter scaffold.

**→ Explicit validation required before Phase 4.**

## 4. Write the spec

Once validated, write the synthesis to `docs/specs/03-surfaces.md` (in the user's language).

→ Chain to `/yarn-p4-architect` after validation.
