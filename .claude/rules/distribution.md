# Release and distribution rules - explanatory guide per release channel

> Each use case ships through one release channel, fixed in Phase 1. This guide explains what "release" and "distribution" mean, then walks through each channel step by step. Referenced by `/yarn-release`, `/yarn-p1-scoping`, `/yarn-p4-architect`, `/yarn-p5-development`. Version and changelog rules: `@rules/versioning.md`. Use cases: `@rules/use-cases.md`.
>
> Every Yarn command below is verified against `yarn-berry-cli-reference/` (the file is named at each use). A step with no verified command says so and gives no improvised one.

## What release and distribution mean

Two separate acts, always in this order.

| Act          | Meaning                                                                                  | Output                                                    | Owner                                   |
| ------------ | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------- |
| Release      | A version becomes official: SemVer number chosen, `package.json` bumped, changelog cut, git tag created | `package.json` `"version"`, `docs/release/CHANGELOG.md` block, tag `vX.Y.Z` | `/yarn-release`, `@rules/versioning.md` |
| Distribution | The built artifact is published where users get it                                      | a package on a registry, an image, a marketplace listing, a release asset | the channel, this guide                 |

- Release answers "which version is this?". Distribution answers "where do people download it?".
- Distribution always uses the **released** commit: the one that carries the new version and the tag. Never publish from uncommitted or untagged work.
- Maintenance skills (`add-feature`, `fix-issue`, `refactor-code`) only append to `[Unreleased]`. Only `/yarn-release` bumps the version (`@rules/versioning.md`).
- `yarn version <strategy>` changes the version in `package.json` (strategies `major`, `minor`, `patch`, the pre-release ones, or an exact semver; `yarn-version.md`). The catalog documents no git commit or tag creation for it: create the commit and the tag with `git`.
- Yarn also offers deferred versioning (`yarn version <strategy> --deferred`, then `yarn version apply`). This framework does not use it: the changelog is the record of what changes, and `/yarn-release` bumps once.

### Before any channel: the same gate

1. `git status` is clean, and you are on the branch the release is cut from.
2. `yarn install --immutable` succeeds: the lockfile matches `package.json` (`yarn-install.md`; no network surprises, no lockfile rewrite).
3. `/yarn-run-tests`: typecheck, lint, build, tests (if enabled) all pass.
4. `docs/release/CHANGELOG.md` has the pending entries under `[Unreleased]`.

## Use case -> channel

| Use case    | Channel                      | Artifact                          | Built by                       | Published with                                | Rollback                                               |
| ----------- | ---------------------------- | --------------------------------- | ------------------------------ | --------------------------------------------- | ------------------------------------------------------ |
| Library     | npm registry                 | npm tarball (`dist/` + manifest)  | `yarn build`                   | `yarn npm publish`                            | move `latest` back with `yarn npm tag add`; fix forward |
| CLI tool    | personal: local run; external (opt-in): npm registry | npm tarball with a `bin` (registry only) | `yarn build` | registry: `yarn npm publish`; personal: `yarn dev` or `node dist/cli.js` | same as library                                        |
| Service     | personal: local run; external (opt-in): target chosen in Phase 1 | bundle `dist/server.js` + runtime deps | `yarn build`   | personal: `yarn node dist/server.js`; external: the target recorded in `docs/specs/01-scoping.md` | personal: rebuild the previous tag; external: redeploy the previous tag |
| Extension   | personal: packaged artifact installed by hand in the host; external (opt-in): the host's own store | host = VS Code: `.vsix`; another host: the artifact the user stated in Phase 1 | `yarn build` (+ Vite webview), then `vsce` (VS Code) or the packaging command the user stated | personal: manual install; external: VS Code publish command defined by the `vscode` framework, other host: the command the user stated in Phase 1 | personal: reinstall the previous artifact; external: store-specific |
| Application | personal: local build; external (opt-in): target chosen in Phase 1 | `dist/` (archive, installer or image if external) | `yarn build` | personal: `yarn preview` or open `dist/`; external: the target recorded in `docs/specs/01-scoping.md` | personal: rebuild the previous tag; external: publish a fixed version, keep the old release |

Distribution is **personal by default** for every use case. External publication is an opt-in choice made in Phase 1 (`yarn-p1-scoping`, question "Distribution") and recorded in `docs/specs/01-scoping.md`. The npm registry stays the channel of a library (that is its purpose) and is an opt-in for a CLI tool.

---

## Channel 1 - npm registry (library and CLI tool)

### What it is
The public npm registry (or a private one). Consumers get the package with `yarn add <package>`. A CLI package can also be run without installing it, with `yarn dlx <package>` (`yarn-dlx.md`).

### When to use it
- Library: always.
- CLI tool: when other people or machines must install the command. For a tool used only by its author or kept inside one team's repository, the local run below is enough.

### `package.json` fields that decide what users get

| Field            | Rule                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | Unique on the registry. A scoped name (`@scope/name`) needs `--access public` to be public (see step 8).                              |
| `version`        | Bumped only by `/yarn-release`. Never edit by hand.                                                                                   |
| `private`        | Must be absent (or `false`) to publish. A package marked `"private": true` is not meant to be published.                              |
| `type`           | `"module"` (ESM).                                                                                                                     |
| `files`          | Allowlist of what ships: `dist` plus anything the package needs at run time. Everything else stays out. Prove it with `yarn pack --dry-run`. |
| `exports`        | Library: the public entry map. List `types` first, then `import`, for the `"."` entry. Blocks deep imports into `dist/`.             |
| `bin`            | CLI: `{ "<command>": "dist/cli.js" }`. The file needs the shebang `tsup` writes (`@rules/cli.md`).                                    |
| `engines.node`   | `>=24`.                                                                                                                               |
| `publishConfig`  | `registry` (publish to another registry) and `provenance` (supply-chain attestation, see step 8). Both verified in `yarn-npm-publish.md` and `yarn-npm-auth.md`. |

```jsonc
{
  "name": "@scope/my-lib",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist"],
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" }
  },
  "engines": { "node": ">=24" }
}
```
For a CLI replace `exports` with `"bin": { "mytool": "dist/cli.js" }`. Dependency versions are pinned at generation (`@rules/config.md`).

### Steps

Run the common gate first (above), then:

1. **Release**: `/yarn-release` infers the increment from `[Unreleased]`, asks you to confirm, runs the bump, cuts the changelog block. Manual equivalent of the bump: `yarn version patch` (or `minor`, `major`, an exact semver). Preview without changing anything: `yarn version minor --dry-run`.
2. **Commit and tag** with `git` (the version commit, then tag `vX.Y.Z`).
3. **Build**: `yarn build`. Do not rely on a hidden pack hook; the build is an explicit step.
4. **Inspect the archive**: `yarn pack --dry-run` prints the files that would ship (`yarn-pack.md`). Check: `dist/` is there, no `src/`, no `test/`, no `.env`, no secrets, no stray `*.tgz`.
5. **Try the real archive** in a scratch consumer project:
   - create it with `yarn pack --out ../my-pkg-%v.tgz` (`%v` is replaced by the version; `%s` by the name);
   - install it: `yarn add my-pkg@file:../my-pkg-1.0.0.tgz` (a tarball path is supported, `yarn-add.md`);
   - import the library, or run the CLI bin, exactly as a user would.
6. **Authenticate**: `yarn npm whoami` shows the current user. If it fails, `yarn npm login` (add `--scope <scope>` for a scoped registry, `--publish` for the registry in `publishConfig`). Credentials land in the home configuration, never in the project (`yarn-npm-auth.md`). The project never stores a token (`@rules/security.md`).
7. **Dry run**: `yarn npm publish --dry-run` shows what would be published without publishing.
8. **Publish**: `yarn npm publish`, with the flags the case needs:

   | Case                                   | Flag                                                       |
   | -------------------------------------- | ---------------------------------------------------------- |
   | Scoped package that must be public     | `--access public` (default for scoped packages is `restricted`; or set `npmPublishAccess`) |
   | Pre-release (`1.2.0-beta.0`)           | `--tag beta`: without it the pre-release takes the `latest` tag and becomes what everyone installs |
   | Two-factor code required               | `--otp <code>`                                             |
   | Re-running a CI job after a success    | `--tolerate-republish`: warns and exits instead of failing |
   | Build provenance (GitHub Actions or GitLab CI only) | `--provenance`, or `publishConfig.provenance`  |
   | Approval step before it goes live      | `--staged`, then `yarn npm stage list` and `yarn npm stage approve <stageId>` (or `reject`) |

9. **Verify**: `yarn npm info <package> --fields versions` lists the published versions; `yarn npm tag list <package>` shows where `latest` (and any other tag) points (`yarn-npm-info.md`, `yarn-npm-tag.md`).
10. **Smoke test** from a clean directory. CLI: `yarn dlx <package> --version`. Library: install it in a scratch project and import it.

Pre-release flow: `yarn version preminor --prerelease=beta.%n` creates `1.1.0-beta.1`-style versions (pattern syntax in `yarn-version.md`), published with `--tag beta`. Promote later by publishing the final version normally.

### Rollback and deprecation (only what the catalog verifies)

- **A published version cannot be replaced.** The registry refuses to publish the same version twice. A bad release is fixed forward: a new PATCH release with a `Fixed` changelog entry.
- **Point users back to the last good version** by moving the tag: `yarn npm tag add <package>@<good-version> latest` (an existing tag is overwritten, `yarn-npm-tag.md`). Verify with `yarn npm tag list <package>`.
- **Remove a tag**: `yarn npm tag remove <package> <tag>`.
- **Reject a staged version** before it goes live: `yarn npm stage reject <stageId>` (`yarn-npm-stage.md`).
- The catalog has no command to deprecate or unpublish a version. Do not improvise one: fix forward and say so in the changelog.

---

## Channel 2 - Local run (CLI tool, personal)

### What it is
The default for a personal CLI: no publication. The tool runs from its own project folder, and it installs no command on the global PATH.

### Steps
1. Common gate (above), then `/yarn-release`, commit, tag.
2. Run from source while developing: `yarn dev <args>` (`tsx src/cli.ts`, `yarn-run.md`).
3. Or build once (`yarn build`) and run the bundle: `node dist/cli.js <args>` (or `yarn node dist/cli.js <args>`, `yarn-node.md`). Rebuild after each change.
4. Verify: `--version` prints the released version. For the exact end-user experience of an installed command, use the tarball test in step 5 of Channel 1.

### Trying it from a consumer project (`yarn link`)
Only for the case where **another project** must import or call this one before publishing. It is **not** how a CLI is run locally, and it is **not** a distribution channel.
- `yarn link <path>` is run from the **consumer** project. It adds a `resolutions` entry to the consumer's manifest that points a dependency to the workspace at `<path>`, even if it belongs to another project (`yarn-link.md`). It does not install a command on the global PATH.
- The consumer project must already depend on the CLI package (declare it with `yarn add`, or link by its name). The bin it exposes points to `dist/cli.js` of the linked project, so **build first** (`yarn build`) and rebuild after each change.
- In the consumer: `yarn link <path-to-cli-project>` (add `--relative` for a relative path), then `yarn install`, then run the bin with `yarn <command>` (`yarn run` resolves binaries exposed by the project's dependencies, `yarn-run.md`).
- Undo: `yarn unlink <path-to-cli-project>`, then `yarn install` (`yarn-unlink.md`). Do not commit the `resolutions` entry.

---

## Channel 3 - Extension (host chosen in Phase 1)

The host is chosen in Phase 1 (`@rules/use-cases.md`) and recorded in `docs/specs/01-scoping.md`. The sections "What it is", "Personal (default)", "External (opt-in)" and "Notes" below apply **when host = VS Code**; the last section covers another host.

### What it is
**When host = VS Code**: the extension is a `package.json` manifest (`engines.vscode`, `main`, `contributes`, `activationEvents`) plus a bundle that uses the `vscode` API. It is packaged as a `.vsix` built with `vsce`. The detailed host rules (manifest, webview CSP and messaging, state, packaging flags) belong to the dedicated `vscode` generator framework: use the dedicated `vscode` generator framework for host-specific rules. This guide gives only the host-independent steps, and no `vsce` flag is invented here.

### Personal (default)
1. Common gate (above), then `/yarn-release`, commit, tag.
2. `yarn build`: host-side bundle `dist/extension.js` (`tsup`), plus the webview bundle built by Vite if the extension has one (`@rules/ui.md`).
3. Check that the manifest version equals `package.json` `"version"`; do not maintain two numbers by hand.
4. Build the `.vsix` with `vsce` (exact packaging command and flags: defined by the `vscode` framework) and install it by hand in VS Code.
5. Check activation, every contribution, and the webview. Nothing is published.

### External (opt-in)
Only when Phase 1 recorded an external publication in `docs/specs/01-scoping.md`. The channel is the VS Code marketplace.
1. Same steps 1 to 4 as the personal flow, then install the `.vsix` in a clean VS Code profile and check it.
2. Publish from the tagged commit. The exact publish command is defined by the `vscode` framework; do not write one from memory.
3. Verify the listing shows the new version and the changelog text (English, from `docs/release/CHANGELOG.md`).

### Notes
- `yarn npm publish` is **not** the marketplace channel.
- Rollback and deprecation depend on the marketplace. No Yarn command applies. Personally installed: reinstall the previous `.vsix`.
- Publisher credentials follow the same rule as any token: stored by the tool in the user's profile or in the CI secret store, never in the project (`@rules/security.md`).

### Another host (browser extension, JetBrains IDE, other)
- Personal flow: common gate, `/yarn-release`, commit, tag, `yarn build`, then the host's own manual install of the packaged artifact. Nothing is published.
- External channel (opt-in, only when Phase 1 recorded it): the host's own store.
- The packaging and publish commands are taken from what the user stated in Phase 1 (recorded in `docs/specs/01-scoping.md`), never invented. If one is missing, stop and ask.
- Rollback depends on the host's store. No Yarn command applies. Personally installed: reinstall the previous artifact.

---

## Channel 4 - Local run or external target (service)

### What it is
The service is a long-running process. By default it is personal: built once and run locally from the bundle. An external target is an opt-in choice made in Phase 1.

### Personal (default)
1. Common gate (above), then `/yarn-release`, commit, tag.
2. `yarn install --immutable`, then `yarn build`: `tsup` writes `dist/server.js`.
3. Run locally: `yarn node dist/server.js` (`yarn-node.md`), with the configuration from environment variables or a local `.env` read natively (`@rules/config.md`).
4. Verify: the health route answers, the version reported equals the released one, logs show a clean start. Nothing is published.

### External (opt-in)
Only when Phase 1 recorded an external publication. Phase 1 asks the user, in plain text, the target (container image, host, archive...) and the artifact format, and records both in `docs/specs/01-scoping.md`. Assume nothing beyond what the user states, and never write a deployment command that is not verified or given by the user. The host-independent steps:
1. Common gate (above), then `/yarn-release`, commit, tag.
2. `yarn install --immutable`, then `yarn build`: `tsup` writes `dist/server.js`.
3. Assemble the runtime artifact from three things: `dist/`, `package.json`, and the runtime dependencies. Install only runtime dependencies in the artifact with `yarn workspaces focus --production` (`yarn-workspaces.md`), because `tsup` leaves dependencies external.
4. Use the Yarn version pinned in `packageManager`. Corepack is the mechanism (`yarn-set-version.md`).
5. Run on Node.js `>=24` (matches `engines.node`). Start command: `yarn node dist/server.js`.
6. Configuration comes from environment variables set by the platform. Do not copy `.env` into the artifact (`@rules/config.md`).
7. Wire the health route (`@rules/use-cases.md`, Service) as the platform's liveness check, and make sure `SIGTERM` triggers the graceful shutdown.
8. Tag the artifact with the release version (the git tag `vX.Y.Z`), never only `latest`.
9. Verify after deployment: health check passes, the version reported by the service equals the released one, logs show a clean start.

### Rollback
Personal: check out the previous tag, rebuild, run again. External: redeploy the previous tagged artifact. Because artifacts are tagged by version, rollback is "run version N-1". No Yarn command is involved; the exact mechanism belongs to the target recorded in `docs/specs/01-scoping.md`.

---

## Channel 5 - Local build or external target (application)

### What it is
The application is a static bundle. By default it is personal: built locally and used from the build output. An external target is an opt-in choice made in Phase 1.

### Personal (default)
1. Common gate (above), then `/yarn-release`, commit, tag.
2. `yarn build`: `tsc --noEmit` then `vite build`, output in `dist/`.
3. Check the `base` option of `vite.config.ts` against how the files will be opened. A build opened from a folder needs the matching `base`, or assets return 404 (`@rules/ui.md`).
4. Use it: `yarn preview` (Vite preview, serves `dist/` locally) or open the built `dist/`. Nothing is published.

### External (opt-in)
Only when Phase 1 recorded an external publication. Phase 1 asks the user, in plain text, the target (host, installer, archive, GitHub Releases...) and the artifact format, and records both in `docs/specs/01-scoping.md`. Assume nothing beyond what the user states, and never write a deployment command that is not verified or given by the user. The host-independent steps:
1. Common gate (above), then `/yarn-release`, commit, tag.
2. `yarn build`: `tsc --noEmit` then `vite build`, output in `dist/`.
3. Check the `base` option of `vite.config.ts` against where the files will be served (`@rules/ui.md`).
4. Archive `dist/` under a name that carries the version (for example `my-app-1.2.0.zip`).
5. If the recorded target is GitHub Releases: create the release for the tag `vX.Y.Z`, use the English changelog block of that version as notes, and attach the archive (on the GitHub page, or with the command the user gives).
6. If the recorded target is an installer or another host, it is produced or deployed from the same `dist/` with the tool and command the user states in Phase 1.
7. Verify: fetch the artifact from where it was published, serve it, and open the app once.

### Rollback
Personal: check out the previous tag and rebuild. External: publish a fixed version as a new release and keep the previous one downloadable; if the app is served from a host, restore the previous archive there. No Yarn command is involved.

---

## Sequence with `/yarn-release`

1. `/yarn-load-project` (the project and its use case are loaded from `docs/specs/04-architect.md`).
2. `/yarn-run-tests` passes (install, typecheck, lint, build, tests).
3. `/yarn-release`:
   - reads `[Unreleased]` and infers MAJOR / MINOR / PATCH (`@rules/versioning.md`);
   - asks you to confirm the increment (MAJOR is never silent);
   - bumps `package.json` `"version"`;
   - cuts the changelog: the `[Unreleased]` entries move into a dated version block, `[Unreleased]` is reset empty;
   - looks up the channel of the project's use case in this guide. A personal-only service or application has nothing to publish: the skill tags after the bump and stops. The external channel runs only if Phase 1 recorded it, asking before any step that publishes (registry, marketplace, deployment, GitHub release).
4. Verify per the channel ("Verify" step), then `/yarn-save-session` if the work stops there.

A publish is irreversible in practice (a registry never reuses a version, a marketplace keeps history). The dry run (`yarn npm publish --dry-run`, `yarn pack --dry-run`) is the last checkpoint.

---

## Anti-patterns - what NOT to do

- **Do not** publish from a dirty or untagged working tree, or from a branch that is not the release commit.
- **Do not** publish before `yarn pack --dry-run` has been read: a missing `files` entry ships `src/`, a missing `dist/` ships an empty package.
- **Do not** publish a pre-release without `--tag`: it becomes `latest`.
- **Do not** skip `--access public` for a public scoped package: it is published as `restricted` and the command fails or the package stays private.
- **Do not** commit or paste a registry token, an OTP, or a publisher key. `yarn npm login` writes to the home configuration, not the project.
- **Do not** edit `version` by hand, or keep a second version number (manifest, constants) that `package.json` does not drive.
- **Do not** use `yarn npm publish` for a service, an application, or an extension whose host has its own channel.
- **Do not** commit the `resolutions` entry that `yarn link` adds, or leave a link in place when publishing.
- **Do not** invent a deprecation or unpublish command: the catalog has none; fix forward.
- **Do not** use the npm, npx, or pnpm command-line tools anywhere (docs, scripts, CI): Yarn only.
- **Do not** write a deployment or publish command for an external target that the user did not state in Phase 1 or that is not verified.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: the release channel recorded in the Phase 4 contract matches the use case (table above); for the npm channels `package.json` has `files`, `exports` (library) or `bin` (CLI), `engines.node >=24`, no `"private": true`, and `yarn pack --dry-run` lists only intended files; the top released block of `docs/release/CHANGELOG.md` equals `package.json` `"version"` and the git tag; every command in the docs and scripts is a Yarn command present in the catalog; no token, OTP, or `.env` is in the project or in an archive; `[Unreleased]` is empty after a release; a deployment artifact (service) contains no `.env`; the application `base` matches where it is served; an external service or application target and its artifact format are recorded in `docs/specs/01-scoping.md`, not guessed.
