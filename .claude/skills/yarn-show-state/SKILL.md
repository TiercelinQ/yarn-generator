---
name: yarn-show-state
description: Show the current state of the yarn TypeScript generation project (CLI tool, library, service, extension, application) - phase, batch, next action, locked decisions, open points.
model: haiku
---

# /yarn-show-state - Current state

## Role

Status reporter.

## Goal

Give a one-glance state of the project.

## Deliverable

The status block (in the user's language).

---

Show only (in the user's language):

Phase: [name] | Batch: [X/total] | Next: [expected action]
Locked decisions: [use case · Salesforce coupling (none | standalone | sfdx-project) · output formats and execution shape (CLI tool only) · tests · calibration]
Open points: [list or "none"]

For a delivered project (Phase 5 complete), add a version line when `docs/release/CHANGELOG.md` exists:
Version: [X.Y.Z] | Unreleased: [N entries pending - run /yarn-release to cut a version | none]

If no project is active: "No active project. Type /yarn-app to start."

Do not append the `/yarn-save-session` · `/yarn-show-state` · `/yarn-show-contract` reminder after this reply.
