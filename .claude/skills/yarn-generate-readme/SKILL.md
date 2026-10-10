---
name: yarn-generate-readme
description: Analyze the specs and source of an existing yarn TypeScript project (CLI tool, library, service, extension, application; Yarn Berry; optional Salesforce) and generate its README.md (objective, interface of the use case, stack, tree, config keys, Salesforce prerequisite only if coupling is confirmed, install and run with yarn). Invoke from the target project root.
model: sonnet
---

# /yarn-generate-readme - Generate the README.md

## Role
Technical writer - produce an accurate project README from specs + code.

## Goal
Write a README that reflects what was actually built.

## Deliverable
`README.md` at the project root (full regeneration - the README is derived, hand edits are not preserved).

---

Prerequisite: invoked from the target project root. Follows @rules/readme.md.

Use the native Claude Code tools (no shell - Windows-compatible):

1. **Sources, in priority**: `docs/specs/*` (especially `01-scoping.md` for the use case and the Salesforce decision, `04-architect.md` - the contract) for the intended structure, then the real code:
   - List source files via `Glob` `src/**/*` (exclude `node_modules/`, `dist/`).
   - Read `package.json` (scripts, `bin`, `exports`, `engines`, `packageManager`) and `.yarnrc.yml`.
   - Detect the **use case** from `docs/specs/01-scoping.md`, confirmed by the entry point: `src/cli.ts` (CLI tool), `src/index.ts` (library), `src/server.ts` (service), `src/extension.ts` (extension), `src/main.tsx` (application).
   - Read the entry point and the layers above it for that use case:
     - CLI tool: `src/cli.ts` (registered commands + exit-code mapping), `src/commands/` (subcommands, args/flags), `src/output/` (wired formats).
     - Library: `src/index.ts` (public API: exports, signatures, types).
     - Service: `src/server.ts` (endpoints, port and host config), `src/routes/` or the equivalent adapter layer from `04-architect.md`.
     - Extension: `src/extension.ts` (activation, contributions), the manifest fields of `package.json`.
     - Application: `src/main.tsx`, `src/` screens/routes (per `rules/ui.md`).
   - Read `src/services/`, `src/config.ts` + `.env.example` (config keys), `src/logger.ts` where present.
   - Detect the **Salesforce coupling**: confirmed only if `docs/specs/01-scoping.md` records it as confirmed or `src/sf/` exists. Then read `src/sf/` and detect the coupling mode: `sfdx-project` if `src/sf/project.ts` + a root `sfdx-project.json`, else `standalone`. Otherwise no Salesforce content anywhere in the README.
   - Detect `test/` via `Glob` `test/**/*.test.*`.
   - When specs and code disagree, the code is what shipped - describe the code and note the divergence.
2. Generate `README.md` at the root via `Write`. Write the README in English (public-facing document) - see `@rules/readme.md`. Sections depend on the use case and on the Salesforce decision (rules in the notes under the template):

```markdown
# [PROJECT_NAME] - v[VERSION]

## Objective
[Inferred from docs/specs, config.ts and the structure - 2 sentences max]

## [Interface section, title depends on the use case]
[CLI tool - "Commands": per command group → subcommand: purpose · args / flags · exit codes (0 success · 1 runtime · 2 usage/validation). Inferred from src/commands/ + src/cli.ts]
[Library - "Public API": exports, signature and purpose of each, usage example. Inferred from src/index.ts]
[Service - "Endpoints": method · path · purpose · request/response shape. Inferred from src/server.ts and the adapter layer]
[Extension - "Contributions": commands, views, settings contributed to the host. Inferred from src/extension.ts and the manifest]
[Application - "Screens": route · purpose of each screen. Inferred from src/main.tsx and the screens layer]

## Stack & dependencies
- OS: cross-OS (Windows-first) · Runtime: Node.js 24+ · ESM · TypeScript strict · Package manager: Yarn Berry 4.x
- [CLI tool only] CLI parser: commander
- [Application / extension webview only] UI: Vite + React
- [Salesforce confirmed only] Salesforce CLI: sf v2 (mandatory) · Coupling mode: [standalone | sfdx-project]
- [CLI tool and service] Logging: pino (file + stderr)
- [CLI tool only] Output: [json · table, plus csv · xlsx when shipped - inferred from src/output/]
- Tests: [Yes (Vitest) | No - inferred from the presence of test/]
- Runtime dependencies: [inferred from package.json]

## File tree
[Actual src/ tree with the role of each file - entry point of the use case · services/ · shared config/logger/types/errors · plus the layers the use case adds (commands/, output/, sf/, UI folders...)]

## Configuration
[Config keys resolved through the cascade defaults < .env < CLI flags (flags: CLI tool only): the .env variables (.env.example) and, for a CLI tool, the flags that override them. Non-secret only - with Salesforce, secrets stay in the sf OS keychain.]

## Salesforce prerequisite
[Section present ONLY when Salesforce coupling is confirmed. Otherwise omit the whole section.]
The `sf` v2 CLI is **required**. Install it and make it reachable: on the PATH, or point the project at the binary via the `SF_CLI_PATH` environment variable (`sfPath` config). Cross-OS install via the official standalone installer (ships its own Node, avoids the npm `.cmd` shim) - Windows / macOS / Linux. Coupling mode: **[standalone | sfdx-project]** - standalone: any org authenticated through `sf`; sfdx-project: run from inside an SFDX project folder (`sfdx-project.json` read, `.forceignore` respected). The project never handles OAuth tokens - `sf` owns the auth flow and the OS keychain.

## Output formats
[Section present ONLY for the CLI tool.]
Emitted formats: [the formats shipped in src/output/: json · table always, csv · xlsx only if shipped]. xlsx (when shipped) is written to a file only. stdout carries data (pipeable); stderr carries logs and human messages.

## Install & run
yarn install
[Per use case, scripts verified in package.json:]
[CLI tool]
yarn build                    # tsup - produces dist/cli.js
node dist/cli.js --help       # usage
node dist/cli.js <command> [flags]
[Library]
yarn build                    # tsup - produces dist/ (ESM + types)
[Service]
yarn dev                      # dev server (tsx)
yarn build                    # tsup - produces dist/server.js
yarn node dist/server.js      # personal use: run locally from the built bundle
[Extension]
yarn build                    # extension bundle
[.vsix built with vsce and installed by hand in VS Code; the exact packaging command comes from the `vscode` framework. This line assumes host = VS Code; another host follows the same boundary with its own notification and log mechanism, and its packaging and install lines come from `docs/specs/01-scoping.md`]
[Application]
yarn dev                      # Vite dev server
yarn build                    # Vite production build
yarn preview                  # personal use: serve the built dist/ locally

[CLI tool only] Scheduling (unattended runs): Windows Task Scheduler or cron - invoke `node dist/cli.js <command>` with the required flags; data on stdout, logs on stderr.

## Tests
[Section included only if test/ detected]
yarn test
```

Notes for the template:
- Replace every bracketed block by the content of the detected use case only; never leave a bracketed alternative the use case does not need. For a service or application, write the external target only if `docs/specs/01-scoping.md` records it; otherwise document the personal run only.
- Run commands are the scripts that exist in `package.json`; never write a script that is not there. Never write `npm`, `npx`, or `pnpm`.
- Yarn commands outside `yarn <script>` and `yarn install` (`yarn pack`, `yarn version`, `yarn npm publish`...) are verified in `yarn-berry-cli-reference/` before being written.

3. Write the file via `Write` (never `cat`/heredoc - Windows-incompatible).
4. If anything is undeterminable from specs + code (use case, Salesforce decision): ask the closed questions with `AskUserQuestion` (clickable options) before writing.

Confirm with: `README.md generated at the project root.`
