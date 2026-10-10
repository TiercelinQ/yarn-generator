---
name: yarn-show-contract
description: Show the complete validated architectural contract (Phase 4) of a yarn TypeScript project (CLI tool, library, service, extension, application; optional Salesforce) - the file tree with each file's role and the registry (entry → service → (sf) → output, depending on the use case). Reads docs/specs/04-architect.md.
model: haiku
---

# /yarn-show-contract - Validated architectural contract

## Role

Contract reporter.

## Goal

Display the locked contract from the source of truth.

## Deliverable

The contract on screen (in the user's language).

---

Read `docs/specs/04-architect.md` (the locked source of truth) and display:

- the use case (CLI tool | library | service | extension | application);
- the complete validated file tree with the role of each file;
- the registry table, generalized as **entry → service → (sf) → output**, with columns that depend on the use case:
  - CLI tool: command → service → sf helper (if Salesforce) → output format
  - Library: public export → service → sf helper (if Salesforce) → returned type
  - Service: endpoint (method + path) → service → sf helper (if Salesforce) → response
  - Extension: contribution (command, view, setting) → service → sf helper (if Salesforce) → effect or UI output
  - Application: screen / route → service → sf helper (if Salesforce) → rendered output
- the Salesforce decision: no coupling, or confirmed with its coupling mode (standalone | sfdx-project); the `sf helper` column and the `sf/` layer appear only when coupling is confirmed;
- (if tests) the source → test mapping.

If `docs/specs/04-architect.md` does not exist and no contract has been validated in session yet: `No validated contract - Phase 4 not reached.`

Do not append the `/yarn-save-session` · `/yarn-show-state` · `/yarn-show-contract` reminder after this reply.
