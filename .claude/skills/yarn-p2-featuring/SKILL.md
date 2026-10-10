---
name: yarn-p2-featuring
description: Phase 2 of the yarn TypeScript generation cycle (Yarn Berry, Node.js) - feature elicitation for the chosen use case (CLI tool, library, service, extension, application), MoSCoW prioritization, v1.0 scope, calibration confirmed here, blocking validation before Phase 3, written to the featuring spec.
model: sonnet
---

# /yarn-p2-featuring - Requirements analysis

## Role
Requirements analyst - elicit the project's features, prioritize them (MoSCoW), and bound the v1.0 scope.

## Goal
Produce a prioritized feature list, set the v1.0 perimeter, confirm the calibration, and get explicit sign-off before any interface work.

## Deliverable
`docs/specs/02-featuring.md` (written in the user's language) + on-screen sheet.

---

## Instructions - Phase 2: Requirements analysis

**Phase banner (show first)** - before anything else, output the phase banner as plain Markdown in the user's language, **never inside a code block or fenced block**. Three blocks, each on its own line: (1) H2 heading: Phase 2/5 - Features; (2) progress line: Scoping ✓ · ▶ Features · Surfaces · Architecture · Development; (3) intent in italics: Elicit features, prioritize (MoSCoW), and bound the v1.0 scope. See `## PIPELINE` in `CLAUDE.md`.

Read `docs/specs/01-scoping.md` first (objective + locked parameters: use case, Salesforce context and coupling mode if any, use-case-specific parameters, tests, execution shape, distribution, config). Work in the user's language. Each closed/enumerable choice uses `AskUserQuestion`; open input (feature ideas, custom name) stays free-form text.

### Step 1 - Confirm the project name (and the `bin` for a CLI tool)

The project name was already chosen in Phase 1 (it named the project folder). **By default the `bin` (CLI tool) = that same name** - do not re-ask it. For a CLI tool, state it in one line: `Tool name / bin: [name] (from Phase 1). Keep it, or set a different bin name?` Only if the user wants the `bin` to differ from the folder do you offer candidates with `AskUserQuestion` (kebab-case; **Other** carries a custom name as free-form text - no recommended mark, the name is the user's call). For the other use cases there is no `bin`: state `Project name: [name] (from Phase 1)` and confirm it the same way (it becomes the package name). The resolved name feeds the sheet, the spec, and `APP_NAME` / the `bin` downstream (`src/config.ts`, `package.json`).

**Identifier vs display name - no spaces in the identifier.** The candidates are already **space-free** (kebab-case, the `bin` convention). A free-typed name with spaces is **normalized** into the space-free technical identifier (spaces removed or replaced with a hyphen) before it feeds `APP_NAME` / the `bin` downstream - the `SESSION_[project]_S[N].md` filename, the `[PROJECT]_DEBUG` env var (`@rules/logging.md`), and log/export file names all assume it. When a display name with spaces matters (README title), record both in the sheet and the spec.

### Step 2 - Feature elicitation (iterative)

A **feature** is a unit of user-visible work of the use case. Its shape depends on the use case (the interface that exposes it is designed in Phase 3):
- **CLI tool**: an action the user runs (`org list`, `data export`, `deploy`, `apex run`...).
- **Library**: a capability the consumer calls (parse, validate, convert, query...).
- **Service**: a capability the service offers to its clients (create an order, list invoices, receive a webhook...).
- **Extension**: a capability the user triggers or receives inside the host (a command, a view, a reaction to an event).
- **Application**: a task the user completes in the UI (browse, edit, export, configure...).

From the objective, propose a base set of candidate features. Then loop, asking as free-form text: "Other features to add? (free description, or 'done')". Maintain the running candidate list; stop when the user signals no more ideas.

> **Applies only when Salesforce coupling is confirmed in Phase 1.** The **starter scaffold** already ships baseline `sf` features - present them as included, and elicit only the features built on top:
> - CLI tool: the **`org` group** (`list` / `use` / `login` / `logout`) + the **`data query` / `data export`** command (@rules/sf-cli.md), and the **`deploy` / `retrieve`** group additionally when the coupling mode is `sfdx-project` (@rules/sfdx-project.md).
> - Other use cases: the same baseline capabilities (org access, data query / export, and deploy / retrieve in `sfdx-project` mode), exposed through the interface of the use case (@rules/use-cases.md).
>
> Without Salesforce coupling, no baseline is added: every feature comes from the objective.

### Step 3 - MoSCoW prioritization

Propose a reasoned classification of every candidate feature into **Must / Should / Could / Won't**, shown as a table. Then: "Confirm or list the adjustments." Apply the user's moves.

### Step 4 - v1.0 perimeter

Default derivation: **Must + Should = included in v1.0**; **Could + Won't = excluded**. Present the included/excluded split and ask the user to confirm or move individual features either way.

### Step 5 - Synthesis sheet

Produce the sheet (in the user's language):

## Requirements - [PROJECT_NAME]

**Project name**
[PROJECT_NAME] (chosen by the user; candidates proposed: [c1], [c2], [c3]) - the `bin` for a CLI tool, the package name otherwise.

**Use case**
[CLI tool | Library | Service | Extension | Application] (from Phase 1)

**Objective**
[Concise description, from Phase 1]

**Features by priority (MoSCoW)**
| Priority | Feature | v1.0 |
| -------- | ------- | ---- |
| Must     | ...     | ✓    |
| Should   | ...     | ✓    |
| Could    | ...     | -    |
| Won't    | ...     | -    |

**v1.0 perimeter**
- Included (Must + Should): [list]
- Deferred - Could (possible in a later version): [list]
- Dropped - Won't (out of scope, deliberate): [list]

**Technical constraints**
- Runtime: Node 24+ · TypeScript strict · ESM · Yarn Berry 4.x · `tsup`/`tsx` (+ `commander` · `pino` for a CLI tool, `pino` for a service, Vite + React for an application / extension webview)
- Salesforce: [none | standalone | sfdx-project] (+ SFDX project path if sfdx-project) - `sf` v2 only when confirmed
- Output formats: [Phase 1 selection = the formats that ship, `json` + `table` always] (default `--format`: [value]) - CLI tool only
- Tests: [Yes/No] - `vitest`
- Interactivity: [Non-interactive | Interactive] - `@clack/prompts` if interactive - CLI tool only
- UI choices: [Phase 1 selection] - application / extension webview only
- Execution shape: [Phase 1]
- Distribution: [Phase 1]
- Config strategy: [Phase 1]
- Validated libraries: [Phase 1 list]

**Calibration (confirmed here, from the v1.0 feature count)**
- v1.0 features counted: [N] · size: [Small | Medium / Large] · batches: [N] (incl. 1 test batch if enabled)

Apply the CALIBRATION table in `CLAUDE.md` (canonical source). **The calibration is confirmed here, from the v1.0 feature count, and locked upon validation** (it refines the provisional announcement of Phase 1). Count only the included v1.0 features (deferred/dropped excluded); when Salesforce is confirmed, the starter baseline features (the `org` group + `data` command, and the `deploy`/`retrieve` group in `sfdx-project` mode) are part of the scaffold, so count them. Record it in the spec - it fixes the Phase 5 batch split.

End with:

→ Validation required before Phase 3.
  Confirm the features / MoSCoW / v1.0 perimeter, or list the adjustments.
  (The calibration follows from the validated count - not a separate confirmation.)

**Blocking rule**: do not move to Phase 3 until validation is explicit. If partial validation: list the open points, block until full resolution.

## Write the spec

Once validated, write the sheet to `docs/specs/02-featuring.md` (in the user's language), including the project name, the use case, the MoSCoW table with the v1.0 column, and the **two distinct exclusion sections (Deferred - Could / Dropped - Won't)**.

→ Chain to `/yarn-p3-surfaces` after validation.
