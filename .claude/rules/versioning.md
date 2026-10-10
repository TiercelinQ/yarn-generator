# Versioning & changelog rules - yarn (all use cases)

> The generated project keeps a human-readable changelog and a SemVer version. This rule defines the changelog format, where the version lives, how each maintenance operation feeds the changelog, and how `/yarn-release` cuts a version. Referenced by `/yarn-p5-development`, `/yarn-add-feature`, `/yarn-fix-issue`, `/yarn-refactor-code`, `/yarn-load-project`, and `/yarn-release`. Publication after the bump (npm registry, container, marketplace, GitHub Releases) follows the release channel of the use case: `@rules/distribution.md`.

## Canonical file - `docs/release/CHANGELOG.md`

- The changelog lives at **`docs/release/CHANGELOG.md`** (create the `docs/release/` folder if absent). This is the single source of truth for the project's release history.
- **Written in English**, regardless of the user's language - it is a deploy artifact meant to be pasted into a GitHub release. (Specs stay in the user's language; the README and the changelog are English.)
- Format: **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)** + **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

Seed written at generation (Phase 5):

```markdown
# Changelog

All notable changes to this project are documented in this file.
The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

## [1.0.0] - <YYYY-MM-DD>
### Added
- Initial release.
```

## Entry categories

Under `## [Unreleased]`, group entries in these sections (Keep a Changelog), in this order, omitting empty ones:

- `### Added` - a new command/endpoint/export/contribution/screen/capability (backward compatible).
- `### Changed` - a change to existing behavior, an internal refactor.
- `### Fixed` - a bug fix.
- `### Removed` - a removed command/flag/endpoint/export/capability.
- `### Security` - a security fix.

A **breaking change** (incompatible with the previous version) is marked with a leading `**BREAKING:**` in its entry (usually under `Changed` or `Removed`). This marker drives the MAJOR inference at release.

## Version source - single source, `APP_VERSION` auto-derived

- **Canonical**: `package.json` `"version"`.
- **Derived (nothing to mirror)**: `src/config.ts` `APP_VERSION` is read from `package.json` (`import pkg from "../package.json" with { type: "json" }` then `export const APP_VERSION = pkg.version;` - a named import from a JSON module is invalid), so it **always equals** the canonical version automatically. `/yarn-release` bumps `package.json` `"version"` **only** - there is no second location to write and nothing to keep in sync (`@rules/config.md`). `--version` (CLI) reads `APP_VERSION`, i.e. the same literal.
- The version at the **top released block** of `docs/release/CHANGELOG.md` must match the canonical version. Between releases, `[Unreleased]` sits above it and carries the pending entries.

### The Yarn bump command

The bump is done with **`yarn version <strategy>`** (`yarn-version.md`), where `<strategy>` is `major`, `minor`, `patch`, a prerelease strategy (`premajor`, `preminor`, `prepatch`, `prerelease`), or an exact semver. What the catalog documents for it:

- It changes the version of the **current workspace** (`package.json` `"version"`); a single-package project needs no `--all` / `--recursive`.
- By default the change is **immediate**. `--deferred` (or the `preferDeferredVersions` setting) only **records** the strategy, to be applied later with `yarn version apply`; `--immediate` forces the immediate mode when that setting is on. `/yarn-release` uses the immediate mode.
- `--dry-run` prints the new version without writing anything: use it to show the proposed bump to the user before applying it.
- A downgrade raises an error unless `--force` is passed. `/yarn-release` never passes `--force` silently.
- The catalog documents **no** changelog edit, git commit, or git tag for this command. Cutting the `docs/release/CHANGELOG.md` block, the commit, and the tag are steps of `/yarn-release`, not of Yarn.

```
yarn version patch --dry-run    # preview the increment, writes nothing
yarn version patch              # apply: package.json "version" -> next patch
```

## SemVer mapping (per maintenance operation)

Operations **accumulate** entries under `[Unreleased]` - they do **not** bump the version. The bump happens once, at `/yarn-release`. The mapping below is what each operation contributes, and what the release inference reads:

| Operation | Changelog section | Release effect |
| --------- | ----------------- | -------------- |
| `add-feature` | `Added` (+ `Changed` if it alters existing behavior) | MINOR |
| `fix-issue` | `Fixed` | PATCH |
| `refactor-code` | `Changed` (internal) | PATCH |
| breaking change (any op) | `**BREAKING:**` marker (`Changed`/`Removed`) | MAJOR |

## Release inference (`/yarn-release`)

From the accumulated `[Unreleased]` entries, infer the increment:

1. Any `**BREAKING:**` marker or a `Removed` entry -> **MAJOR**.
2. Else any `Added` entry -> **MINOR**.
3. Else (only `Fixed` / internal `Changed`) -> **PATCH**.

The inferred increment is **proposed** to the user (`AskUserQuestion`, inferred option preselected as recommended); the user can override - notably to force a MAJOR the inference cannot detect. MAJOR is never applied silently.

### What counts as breaking (MAJOR), per use case

The **public contract of the use case** is what a caller depends on. A change is breaking when it breaks a caller written against the previous version.

**CLI tool** - the CLI contract is the public API (anything a script, a pipe, or a scheduled job depends on):

- A **command or flag renamed or removed** (a downstream `mytool org list ...` invocation stops working).
- A change to **exit-code semantics** (`0` success · `1` runtime error · `2` usage/validation) - a scheduler's success/failure alerting is keyed on the code (`@rules/cli.md`).
- A change to the **`stdout` data format/shape** (a renamed/removed field, a different JSON/CSV structure) that breaks a downstream pipe (`... --format json | jq ...`).
- A change to an **existing command's default behavior** (a default flag value, the default output format/destination, and with Salesforce the default org resolution).
- A **removed or renamed config key** (`.env` variable / CLI flag) a caller relied on (`@rules/config.md`).

**Library** - the public API is what `index.ts` exports and what `package.json` `"exports"` exposes:

- An **export removed or renamed**, or a **function signature / type** changed incompatibly (parameter removed, return shape changed, a type narrowed for inputs or widened for outputs).
- A change to the **behavior** documented for an exported function (thrown error type, `Result<T>` shape, default option value).
- A **removed `"exports"` subpath**, a changed module format, or a raised `engines.node` floor.

**Service** - the contract is the endpoints and the runtime configuration:

- An **endpoint removed or renamed**, an HTTP method or status code changed, a request/response field removed or retyped, an authentication requirement added.
- A **removed or renamed config key** (env variable, port, default value) an operator relied on.
- A change to the **health/readiness** contract or the exit behavior on shutdown that an orchestrator keys on.

**Extension** - the contract is what the host and the user see declared:

- A **contribution removed or renamed** (command id, view id, setting key, keybinding) that a user, a keybinding, or another extension referenced.
- A **setting key removed** or its meaning changed; a raised minimum host version.
- A raised `engines.vscode` minimum, or a changed `activationEvents` entry that stops the extension from activating where it did before.

**Application** - the contract is the observable behavior:

- A **removed screen, route, or feature**, a changed URL scheme a user bookmarked, a changed persisted-data format that breaks existing user data, a removed export/import format.
- A **removed or renamed config key** (build-time or runtime) an operator relied on.

## Anti-patterns - what NOT to do

- **Do not** put the changelog at the project root - it lives in `docs/release/CHANGELOG.md`. (The project's root `CHANGELOG.md`, if any, is a separate concern; this system owns `docs/release/CHANGELOG.md`.)
- **Do not** write the changelog in the user's language - English only.
- **Do not** bump `package.json` `"version"` (no `yarn version ...`) in a maintenance operation - only `/yarn-release` bumps.
- **Do not** hand-write `APP_VERSION` in `src/config.ts` - it is derived from `package.json` (`pkg.version`, default import of the JSON module); bumping `package.json` is enough. A hardcoded duplicate is exactly the desync this removes.
- **Do not** apply a MAJOR bump without explicit user confirmation.
- **Do not** leave stale entries under `[Unreleased]` after a release - they move into the cut version block, and `[Unreleased]` is reset empty.
- **Do not** use `--force` on `yarn version` to push through a downgrade without the user asking for it.
- **Do not** use `npm version` - every release command goes through `yarn` (`@rules/config.md`).

## Integrity verification

Detailed in `@rules/verification.md`. Key points: `docs/release/CHANGELOG.md` present and Keep a Changelog-shaped (English); the top released version matches `package.json` `"version"` (and therefore `src/config.ts` `APP_VERSION`, which is derived from it - no separate mirror to check); every maintenance change added an `[Unreleased]` entry in the right category (no silent change); after a release, `[Unreleased]` is reset empty and the cut block carries the correct version + date.
