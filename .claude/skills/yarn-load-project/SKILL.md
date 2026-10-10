---
name: yarn-load-project
description: Load an existing yarn TypeScript project (CLI tool, library, service, extension, or application; Yarn Berry; Phase 5 complete) from its specs, README, and source - detect its use case and whether Salesforce coupling was confirmed, then bring the generator rules to bear on already-delivered code. Invoke from the target project root.
model: sonnet
---

# /yarn-load-project - Load an existing project

## Role
Onboarding analyst - take charge of a delivered TypeScript codebase under the generator rules.

## Goal
Understand the project's use case and layered structure and confirm the rules apply to any later change.

## Deliverable
A one-block confirmation (in the user's language) of the loaded project.

---

Prerequisite: invoked from the target project root - `.claude/` and `docs/specs/04-architect.md` present.

> If the project root has not been provided in this flow, first ask (plain text, non-enumerable): `Project root to load? (folder path)`. Read everything below relative to that root.

Use the native Claude Code tools (no shell - Windows-compatible):

1. **Read the source of truth in priority order:**
   - `docs/specs/04-architect.md` (the locked contract - most reliable). If present, it is authoritative for the file tree and the registry (entry → service → (sf) → output, depending on the use case).
   - Other `docs/specs/*` for the scoping / featuring / interface decisions. `docs/specs/01-scoping.md` records the **use case** and the **Salesforce decision**.
   - `README.md` at the root. If both specs and README are absent: offer `/yarn-generate-readme` and stop.
2. **Detect the use case**: read it from `docs/specs/01-scoping.md`, then confirm it against the entry point in `src/`:
   - `src/cli.ts` → CLI tool · `src/index.ts` → library · `src/server.ts` → service · `src/extension.ts` → extension · `src/main.tsx` → application (with UI).
   - If the specs and the entry point disagree, the code is what shipped: report the divergence in the confirmation block.
3. **Detect the Salesforce coupling**: confirmed if `docs/specs/01-scoping.md` records it as confirmed, or if `src/sf/` exists in the source. If confirmed, detect the coupling mode: `sfdx-project` if `src/sf/project.ts` and a root `sfdx-project.json` are present, else `standalone` (@rules/sfdx-project.md). If neither the specs nor the source mention Salesforce: no coupling, nothing Salesforce-related is loaded or reported.
4. **Detect tests** via `Glob` `test/**/*.test.*` → count the files for the Tests line.
5. Read `package.json` (scripts, `engines`, `packageManager`) and `.yarnrc.yml`, then walk `src/` to confirm the layered structure for the detected use case (entry point · `services/` · shared `config`/`logger`/`types`/`errors`, plus `commands/` · `output/` for a CLI tool, `sf/` when coupling is confirmed, the UI layers for an application), the registered entries (commands, public API, endpoints, contributions, screens), and, for a CLI tool, the wired output formats.
6. Confirm take-over with this exact format (in the user's language):

Project loaded: [PROJECT_NAME] v[VERSION]

Use case : [CLI tool | library | service | extension | application]
Stack : Node.js 24+ · TypeScript strict · Yarn Berry [version from packageManager] · [commander (CLI tool) | Vite + React (UI) | -]
Entries detected : [commands / public API / endpoints / contributions / screens, depending on the use case]
Services : [count]
Output formats : [the shipped formats: json · table, plus csv · xlsx if shipped] (CLI tool only, omit the line otherwise)
Salesforce : [coupling confirmed - [standalone | sfdx-project] - sf v2, runner src/sf/runner.ts | no coupling]
Tests : [present ([N] files) | absent]
Changelog : [present (top vX.Y.Z, [N] unreleased entries) | absent (init offered)]
Specs : [docs/specs present: yes/no]

Generator rules applied. Ready for: add-feature | fix-issue | refactor-code | run-tests | trace-feature.

6b. **Changelog / versioning check (retroactive init).** Look for `docs/release/CHANGELOG.md`. If **present**, read the top released version and count the `## [Unreleased]` entries for the confirmation block. If **absent** (project predates the versioning system), propose **once**, right after the confirmation block: initialize it with `/yarn-release`'s format via a seed - read the current version from `package.json` `"version"` (the canonical source; `src/config.ts` `APP_VERSION` is derived from it), create `docs/release/CHANGELOG.md` (create `docs/release/`) with the Keep a Changelog preamble, an empty `## [Unreleased]`, and a `## [<current-version>] - <YYYY-MM-DD>` block noting the baseline (`### Added` / `- Baseline (changelog started).`). Proposed, not imposed; if the user declines, do not re-propose (only on explicit request). Follow `@rules/versioning.md` for the shape.
7. Read and apply all rules to any later change (not auto-imported - read them before touching code): `CLAUDE.md`, @rules/use-cases.md · @rules/architecture.md · @rules/errors.md · @rules/config.md · @rules/security.md · @rules/logging.md · @rules/tests.md (if tests present) · @rules/versioning.md · @rules/distribution.md · @rules/verification.md · @rules/readme.md. Conditional rules:
   - CLI tool only: @rules/cli.md · @rules/output.md · @rules/progress.md.
   - Project with UI (application, extension webview) only: @rules/ui.md.
   - Salesforce coupling confirmed only: @rules/sf-cli.md, and @rules/sfdx-project.md if coupling = sfdx-project.
8. Any structural, layering, or security deviation detected between the code and the rules (or vs `docs/specs/04-architect.md`): report it, do not fix without a request (hand off to `/yarn-fix-issue` or `/yarn-refactor-code`).
