---
name: yarn-save-session
description: Save the full state of the generation session of a yarn TypeScript project (CLI tool, library, service, extension, application; Yarn Berry) into docs/sessions/SESSION_[project]_S[N].md - phase, batches, locked decisions, open points, referencing the specs. Invoke at the end of a session.
model: haiku
---

# /yarn-save-session - Session save

## Role

Session archivist.

## Goal

Persist enough state to resume the project exactly where it stopped.

## Deliverable

`docs/sessions/SESSION_[project]_S[N].md` (in the user's language).

---

Use the native Claude Code tools (Windows-compatible):

1. **Create** the `docs/sessions/` folder at the project root if it does not exist.
2. Determine `[N]`: list `docs/sessions/SESSION_*_S*.md` via `Glob`, extract the integers (`S(\d+)\.md$`), `[N] = max + 1` (or `1` if none). `[project]` = exact project name from `package.json` / `src/config.ts` (no spaces).

> `S0` is reserved for the delivery baseline written automatically at the end of Phase 5 (`/yarn-p5-development`). Manual saves therefore start at `S1` - the `max + 1` rule above already yields `1` when only `S0` exists.

3. **Write** `docs/sessions/SESSION_[project]_S[N].md` via `Write`:

# SESSION_S[N] - [PROJECT_NAME] · [completed phase]

## Status

Completed phase: [N - name]
Next phase: [N+1 - name]
Next batch: [X+1/total] (if Phase 5)

## Locked decisions

- Use case: [CLI tool | library | service | extension | application]
- Target: Node.js 24+ · ESM · TypeScript strict · Yarn Berry 4.x [· commander (CLI tool) | · Vite + React (UI)]
- Salesforce coupling: [none | confirmed - standalone | confirmed - sfdx-project] (decided in Phase 1)
- Output formats: [the shipped formats: json · table, plus csv · xlsx if shipped] (CLI tool only, omit otherwise)
- Execution shape: [commands only | + standalone scripts] (CLI tool only, omit otherwise)
- Tests: [Yes (Vitest) / No]
- Calibration: [Small 3 batches / Medium-Large 4 batches] (+1 test batch if tests enabled)
- Selected features: [list]
- Out of scope: [list]
- Validated libraries: [list]

## Specs

Reference: docs/specs/01-scoping.md · 02-featuring.md · 03-surfaces.md · 04-architect.md
(the locked contract in 04-architect.md is authoritative - do not duplicate it here)

## Delivered batches

- [x] Batch 1/[total] - [content]
- [ ] Batch 2/[total] - [content]
- ...

## Open points

[list or "none"]

> If `docs/specs/04-architect.md` exists, reference it instead of duplicating the file tree + registry. Only summarize the locked decisions here.

4. Confirm: `Session saved: docs/sessions/SESSION_[project]_S[N].md`
5. Do not append the `/yarn-save-session` · `/yarn-show-state` · `/yarn-show-contract` reminder after this reply.

> Resuming from a SESSION file is handled by `/yarn-app` (option 2 or a pasted SESSION block) - not by this skill.
