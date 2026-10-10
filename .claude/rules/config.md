# Config, package.json, build & dependency rules - yarn (Yarn Berry)

> This rule **owns** `src/config.ts`: the typed defaults and the single `resolveConfig()` cascade (`defaults < .env < CLI flags` for a CLI, **non-secret only**). It also owns the root build/quality files - `package.json`, `.yarnrc.yml`, `.prettierignore`, `tsup.config.ts`, `tsconfig.json`, and for a project with UI `vite.config.ts` - and the dependency pinning discipline. Secrets never live here (`@rules/security.md`); with Salesforce coupling, `sf` holds credentials in the OS keychain and the project stores at most a non-secret alias. Layering: `@rules/architecture.md`.
>
> **Yarn commands are verified against `yarn-berry-cli-reference/`.** Every `yarn` command and flag written in this file or generated into a project comes from that catalog (`yarn-index.md`, then the command file). Never `npm`, `npx`, `pnpm`, or `package-lock.json`.
>
> **Salesforce callout.** The Salesforce env keys (`SF_TARGET_ORG`, `SF_API_VERSION`, `SF_PAGE_SIZE`, `SF_CLI_PATH`), the matching `AppConfig` fields, `COUPLING_MODE`, and the `cross-spawn` dependencies apply **only when Salesforce coupling is confirmed in Phase 1**. Lines marked `SALESFORCE ONLY` below are dropped otherwise.

## Package manager - Yarn Berry 4.x

| File | Rule |
| ---- | ---- |
| `package.json` | Carries the `packageManager` field (`"packageManager": "yarn@4.18.1"`, re-confirm the current 4.x at generation). Set it with `yarn set version <version>` (`yarn-set-version.md`: by default it only writes `packageManager`, resolved through Corepack) |
| `.yarnrc.yml` | Committed. Contains `nodeLinker: node-modules` (classic `node_modules/` layout, no Plug'n'Play) |
| `yarn.lock` | **Committed** - the single lockfile. Never hand-edited |
| `.yarn/cache` | **Not committed** (no zero-install). `node_modules/` is gitignored |

```yaml
# .yarnrc.yml - committed
nodeLinker: node-modules
```

- Install with `yarn install` (`yarn-install.md`). In automation and in the verification chain use `yarn install --immutable`: it exits in error if `yarn.lock` would change, which catches an uncommitted lockfile.
- Run scripts with `yarn <script>` (`yarn dev`, `yarn build`, `yarn typecheck`, `yarn lint`, `yarn format`, `yarn test` - `yarn-run.md`).
- No npm artifact in the repo: no `package-lock.json`, no `npm-shrinkwrap.json`, no `.npmrc` written by the generator.
- If Yarn is pinned with a release file (`yarnPath` in `.yarnrc.yml`), the file under `.yarn/releases/` is committed (see the `.gitignore` negations below).

## `src/config.ts` - the config cascade

```ts
// src/config.ts
import type { LevelWithSilent } from "pino";
import pkg from "../package.json" with { type: "json" }; // single source for APP_VERSION (see "Version - single source" below)

// --- Static identity (not part of the runtime cascade) ----------------------
export const APP_NAME = "mytool";        // project name - the `bin` (CLI), the log context, the [TOOL]_DEBUG var (@rules/logging.md)
export const APP_VERSION = pkg.version;  // derived from package.json (single source) - surfaced by `--version` (@rules/cli.md)
export const COUPLING_MODE: "standalone" | "sfdx-project" = "standalone"; // SALESFORCE ONLY - fixed in Phase 1 - @rules/sfdx-project.md

// --- Typed configuration ----------------------------------------------------
/** Fully-resolved, non-secret configuration - the single object the composition root threads down. */
export interface AppConfig {
  /** SALESFORCE ONLY. Default org alias/username; used when a command omits `--target-org`. Passed to `sf` as a discrete arg (@rules/security.md). */
  targetOrg?: string;
  /** Base directory for file exports (CLI); each output path is resolved + traversal-checked under it (@rules/security.md, @rules/output.md). */
  exportDir: string;
  /** SALESFORCE ONLY. Salesforce API version pinned on `sf` calls (e.g. "62.0"); unset -> the CLI default. */
  apiVersion?: string;
  /** SALESFORCE ONLY. Page size for batched SOQL reads (@rules/output.md). */
  pageSize: number;
  /** pino level (@rules/logging.md). */
  logLevel: LevelWithSilent;
  /** SALESFORCE ONLY. Absolute path to the `sf` binary; unset -> resolved from PATH by cross-spawn (@rules/sf-cli.md). */
  sfPath?: string;
}

/** Lowest cascade layer - typed, non-secret defaults. */
export const DEFAULTS: AppConfig = {
  exportDir: "exports",
  pageSize: 2000,
  logLevel: "info",
};

/** Parsed global CLI flags (read by the pre-parse in cli.ts, @rules/cli.md); every field optional - only the flags the user passed
 *  are present. cli.ts coerces `--page-size` to a number before calling resolveConfig. CLI use case only. */
export interface CliFlags {
  targetOrg?: string;
  exportDir?: string;
  apiVersion?: string;
  pageSize?: number;
  logLevel?: LevelWithSilent;
  sfPath?: string;
}

const LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;

/** Validate an enum env value; unknown -> undefined (falls back to the lower cascade layer). */
function toLevel(v: string | undefined): LevelWithSilent | undefined {
  return v !== undefined && (LEVELS as readonly string[]).includes(v) ? (v as LevelWithSilent) : undefined;
}

/** Validate a positive-integer env value; invalid -> undefined. */
function toPositiveInt(v: string | undefined): number | undefined {
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : undefined;
}

/** Drop `undefined` keys so a later cascade layer never clobbers an earlier value with a hole. */
function prune<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/** The env layer - non-secret keys only, each parsed and validated. `.env` is loaded natively (below); real env vars feed it too. */
function fromEnv(): Partial<AppConfig> {
  const e = process.env;
  return prune<Partial<AppConfig>>({
    targetOrg: e.SF_TARGET_ORG,          // SALESFORCE ONLY
    exportDir: e.EXPORT_DIR,
    apiVersion: e.SF_API_VERSION,        // SALESFORCE ONLY
    pageSize: toPositiveInt(e.SF_PAGE_SIZE), // SALESFORCE ONLY
    logLevel: toLevel(e.LOG_LEVEL),
    sfPath: e.SF_CLI_PATH,               // SALESFORCE ONLY
  });
}

/** Resolve the effective config: DEFAULTS < .env / env < CLI flags. Called once, in the composition root (cli.ts for a CLI). */
export function resolveConfig(flags: CliFlags = {}): AppConfig {
  return { ...DEFAULTS, ...fromEnv(), ...prune(flags) };
}
```

- **One resolution, threaded down.** `resolveConfig()` runs **once** in the composition root (`cli.ts`, `server.ts`, `extension.ts`...); the resulting `AppConfig` is passed to the services/`sf`/`output` layers. Modules never read `process.env` directly (`@rules/architecture.md`). With Salesforce, the `sf` binary path comes from `SF_CLI_PATH` / `--sf-cli-path` (surfaced as `config.sfPath`); the runner uses it or falls back to `PATH` (`@rules/sf-cli.md`).
- **Use case shape.** The sample is the CLI shape (flags layer `CliFlags`). Library, service, and extension drop the flags layer (`resolveConfig()` is `DEFAULTS < env`) and keep only the keys their Phase 1 contract needs. A browser application has no `process.env`: its config comes from Vite (`@rules/ui.md`).
- **Pure merge.** The cascade is `DEFAULTS` (typed) < the env layer (validated non-secret keys) < global CLI flags. `prune` drops `undefined` so a higher layer overrides only the keys it actually sets - a missing flag never blanks a default.
- **Validated at the boundary.** Env values are parsed/validated (`toLevel`, `toPositiveInt`) - external input is never trusted raw (`@rules/security.md`). An invalid `SF_PAGE_SIZE` / `LOG_LEVEL` silently falls back to the lower layer.
- **Non-secret only.** No token/password/session id ever lives in `config.ts` or `.env`. With Salesforce, `sf` owns credentials in the OS keychain; the project stores at most a non-secret org alias (`@rules/security.md`).
- **Path confinement.** `config.ts` also exports **`resolveWithin(baseDir, candidate)`** (impl + rationale in `@rules/security.md §3`), co-located with the `exportDir` it confines against: every command resolves a user `--output` path under `config.exportDir` with it before writing, so a traversal (`..`) or absolute escape is rejected (`@rules/output.md`, `@rules/cli.md`). Applies to every path the project **writes** as an export or output. A path the user chooses as the tool's own **storage** (data file, config file) is different: it is resolved with `path.resolve`, not confined, and declared as a deviation in the Phase 3/4 specs (`@rules/security.md §3`).
- **Version - single source.** `APP_VERSION` is read from `package.json` with a default import (`import pkg from "../package.json" with { type: "json" }` then `export const APP_VERSION = pkg.version;`). A named import (`import { version } from ...`) is invalid with import attributes: a JSON module has only a default export. So the version is bumped in **one** place (`@rules/versioning.md`). `resolveJsonModule` is on (`tsconfig.json` below) and tsup/esbuild inline the JSON at build (`--version` reads the inlined literal; the file need not ship at runtime); `tsx` resolves it in dev too. Never also hardcode the version in `config.ts` - that duplicate is exactly the desync this removes.
- Any constant reused in more than one file lives here (identity + `DEFAULTS`); a shared **type** lives in `src/types.ts` (`@rules/architecture.md`).

## Environment keys (`.env`, non-secret only)

| Env key (`.env`) | `AppConfig` field | Parsed as | Default | Global CLI flag | Applies |
| ---------------- | ----------------- | --------- | ------- | --------------- | ------- |
| `SF_TARGET_ORG`  | `targetOrg` | string            | - (sf default) | `--target-org` | Salesforce only |
| `EXPORT_DIR`     | `exportDir` | string (base dir) | `exports`      | `--export-dir` | CLI |
| `SF_API_VERSION` | `apiVersion`| string            | - (sf default) | `--api-version` | Salesforce only |
| `SF_PAGE_SIZE`   | `pageSize`  | positive int      | `2000`         | `--page-size` | Salesforce only |
| `LOG_LEVEL`      | `logLevel`  | pino level        | `info`         | `--log-level` | CLI, service |
| `SF_CLI_PATH`    | `sfPath`    | string (abs path) | - (PATH)       | `--sf-cli-path` | Salesforce only |

- These are the **global** config flags read by `resolveConfig`. The **per-command** output flags `--format` / `--output` (`-f` / `-o`) are a separate concern, handled by the command and mapped to `{ format, destination }` (`@rules/output.md`, `@rules/cli.md`). `-o` is `--output`, not a short alias for `--target-org`.
- **`--no-progress`** is also a **global** flag but **not part of the cascade**: it is a runtime UI toggle (no `.env` key, not in `AppConfig`), read directly in `cli.ts` to gate the progress reporter (`@rules/progress.md`, `@rules/cli.md`).
- Additional keys of a service (port, host...) or extension are declared in the Phase 4 contract following the same pattern: typed field, validator, default, one env key.

## `.env` - native load, no `dotenv`

`.env` is read with **Node's native loader**, so there is **no `dotenv` dependency**. For a CLI, `cli.ts` loads it before resolving config (a service does the same in `server.ts`):

```ts
// src/cli.ts (excerpt) - load the non-secret .env before resolving config.
try {
  process.loadEnvFile();          // Node >= 20.12 / 24 - same parser as `node --env-file=.env`; throws if .env is absent
} catch {
  /* no .env file - rely on the real environment + DEFAULTS */
}
// then read the global flags with the pre-parse (@rules/cli.md), never from the real program's opts() (empty before parseAsync):
const config = resolveConfig(flags); // resolve once; thread `config` down (@rules/architecture.md)
```

- `process.loadEnvFile()` is used (rather than only the `node --env-file` flag) so the packaged `bin` (shebang, no node flags) and `tsx` dev both load `.env` with no launch ceremony. Equivalent alternative for a direct node run: `node --env-file=.env dist/cli.js`.
- A key already set in the **real environment** takes precedence over `.env` (Node's `--env-file` semantics) - `fromEnv()` reads whatever ends up in `process.env`.
- **`.env.example` is committed; `.env` is gitignored** (`@rules/security.md`).

```bash
# .env.example - committed. Copy to .env (gitignored). NON-SECRET values only.
# NEVER put a secret, token, or password here (@rules/security.md).
EXPORT_DIR=exports
LOG_LEVEL=info
# --- SALESFORCE ONLY (sf owns credentials in the OS keychain) ---
SF_TARGET_ORG=my-org-alias
SF_API_VERSION=62.0
SF_PAGE_SIZE=2000
# SF_CLI_PATH=/absolute/path/to/sf   # only if `sf` is not on PATH
```

## .gitignore

Delivered at the project root in the last batch (`@rules/architecture.md` batch table · `/yarn-p5-development`). Single source of truth for what stays out of the repo. Comments in English (the authoring language). The socle common to every stack + the Yarn Berry (no zero-install) and runtime/build additions on top:

```gitignore
# --- Yarn Berry (nodeLinker: node-modules, no zero-install) -----------------
# .yarn/cache is NOT committed. Keep only the shared Yarn assets.
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.pnp.*

# --- Dependencies, build & runtime -----------------------------------------
# node_modules + the /dist bundle; logs/ = the pino log file of a service started from its project directory
# (@rules/logging.md; a CLI logs under ~/.<tool>/logs, outside the repo);
# .env = non-secret machine-local config; exports/ = generated exports, may hold org/PII data (@rules/security.md).
node_modules/
/dist/
logs/
.env
exports/

# --- Claude Code -----------------------------------------------------------
# Personal, never committed.
.claude/settings.local.json
.claude/agent-memory/
# NOTE: .claude/settings.json IS a delivered asset - do NOT ignore it.

# Local work plan - never committed.
tasks/

# Private specs. Only the published changelog is committed.
docs/*
!docs/release/
docs/release/*
!docs/release/CHANGELOG.md

# OS noise.
.DS_Store
Thumbs.db
desktop.ini
```

- **Build output is anchored** (`/dist/`) - the leading slash confines the pattern to the repo root, so it never masks a nested path (an unanchored build pattern such as `release/` would hide `docs/release/`). `logs/` and `exports/` are runtime directories, not build outputs; `logs/` matters only for a service started from its project directory (a CLI logs under `~/.<tool>/logs`). A project without exports (no CLI export, no Salesforce data) may drop `exports/`.
- **Never ignored** (delivered assets): `yarn.lock`, `.yarnrc.yml`, `.prettierignore`, `docs/release/CHANGELOG.md` (the negated pattern above), `.claude/settings.json`, the generated root `CLAUDE.md`, `test/`, and `scripts/`.
- **Never committed**: `.yarn/cache`, `.yarn/install-state.gz`, `node_modules/`, `.pnp.*` (all covered by the template).
- Verify the template with `git add -A` + `git status`, **not** only `git check-ignore` - the negation rules make `check-ignore` misleading.

## .prettierignore

Delivered at the project root in the last batch (CLI and every other use case). Yarn Berry commits `.yarn/releases/*.cjs`, and `yarn format` (`prettier --write .`) would otherwise rewrite the Yarn bundle and the lockfile:

```
.yarn
yarn.lock
dist
```

## `package.json` - scripts, `type`, `packageManager`, entry fields

```json
{
  "name": "mytool",
  "version": "1.0.0",
  "type": "module",
  "packageManager": "yarn@4.18.1",
  "bin": { "mytool": "dist/cli.js" },
  "files": ["dist"],
  "engines": { "node": ">=24" },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsup",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run"
  }
}
```

- **`"type": "module"`** - the project is ESM. Relative imports are **extensionless** (`import { resolveConfig } from "./config"`, never `./config.js`) - `moduleResolution: "bundler"` for typecheck, `tsx` in dev, and `tsup` for the bundle all resolve them; no extension ever reaches Node's ESM resolver.
- **`"packageManager"`** pins the Yarn Berry release (`yarn set version`, `yarn-set-version.md`). Scripts run with `yarn <script>`; there is no `npm run`.
- **Per use case** (the sample above is the CLI):
  - **CLI**: `"bin"` maps the tool name to the built `dist/cli.js` (shebang added by tsup); `dev` is `tsx src/cli.ts`. Locally the tool runs with `yarn dev` or `node dist/cli.js`. `yarn link` is run from **another** (consumer) project: it adds a `resolutions` entry there and installs no global command (`yarn-link.md`). Publication: `@rules/distribution.md`.
  - **Library**: no `bin`; add `"main"`, `"types"` and an `"exports"` map pointing at `dist/index.js` and `dist/index.d.ts` (tsup `dts: true`); `dev` is a watch build or a `tsx` example script. The exports map is the public API contract (`@rules/versioning.md`).
  - **Service**: no `bin`/`files`; `dev` is `tsx src/server.ts`, the start script runs `node dist/server.js`. Distribution is personal by default (local run); an external target is an opt-in recorded in Phase 1 (`@rules/distribution.md`).
  - **Extension** (when host = VS Code, chosen in Phase 1): the `package.json` manifest carries `engines.vscode`, `main`, `contributes` and `activationEvents`; the detailed manifest rules belong to the dedicated `vscode` generator framework (`@rules/use-cases.md`). Another host follows the same boundary with its own manifest or activation contract, taken from what the user stated in Phase 1.
  - **Application**: `dev` is `vite`, `build` is `vite build` (plus `tsc --noEmit` in `typecheck`); no `bin`.
- **`"files": ["dist"]`** - only if publishing to the npm registry (whitelist the built output; `yarn pack` builds the tarball, `yarn-pack.md`). Omit for a private/internal project.
- **`"test"`** is present only when tests were enabled in Phase 1 (`@rules/tests.md`); otherwise drop the script.
- `dev` runs the TS entry directly with `tsx` (no build step); `.env` is loaded programmatically by the composition root (above), so dev and the built output behave the same.

## `tsup.config.ts` (CLI, library, service, extension)

```ts
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],                 // CLI. Library: src/index.ts · service: src/server.ts · extension: src/extension.ts
  format: ["esm"],                       // "type": "module" - ESM only
  target: "node24",                      // match the Node LTS line (see dependency table)
  platform: "node",
  clean: true,                           // wipe dist/ before each build
  dts: false,                            // CLI/service: no .d.ts. Library -> true (note below)
  sourcemap: true,
  banner: { js: "#!/usr/bin/env node" }, // CLI only: shebang -> dist/cli.js is directly executable (the `bin`)
});
```

- One entry -> one output file in `dist/`. **tsup externalizes `dependencies` / `peerDependencies` by default** (they resolve from `node_modules` at runtime) and bundles only your `src/` (+ any imported `devDependency`). So every runtime-imported package (pino, pino-pretty, commander, cross-spawn, and exceljs / csv-stringify when shipped) must be a `dependency`. For **local** and **npm-package** distribution `node_modules` is present at runtime, so external deps are correct. The **bundled single-file exe** mode (Phase 1) is a separate advanced build (bundle deps in, or Node SEA / `@vercel/ncc`) and must special-case `pino`/`pino-pretty`, which resist ESM bundling.
- **Library**: entry `src/index.ts`, no shebang banner, set **`dts: true`** to emit declarations. **Lib+bins mode** (a CLI that also exposes a programmatic API): `entry: ["src/cli.ts", "src/index.ts"]` and `dts: true`.
- **Service**: no shebang banner; the entry is `src/server.ts`.
- **Extension**: entry `src/extension.ts`; when host = VS Code, `vscode` is provided by the host at run time and stays external, and the other bundle options come from the dedicated `vscode` generator framework. Another host follows the same boundary: its host-provided modules stay external, and its bundle options come from what the user stated in Phase 1.
- **Application**: not built by tsup, see the Vite section below.

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "moduleResolution": "bundler",       // extensionless relative imports (tsup bundles)
    "types": ["node"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,             // default import of CJS deps (cross-spawn, pino-pretty)
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "noEmit": true                       // tsc is typecheck-only; tsup owns emit - no rootDir/outDir (avoids TS6059)
    // "verbatimModuleSyntax": true      // optional - enforces `import type`. Leave OFF if a CJS dep imported
    //                                   // via `export =` (cross-spawn / pino-pretty) fights the default import.
  },
  "include": ["src", "tsup.config.ts", "eslint.config.mjs"],
  "exclude": ["node_modules", "dist"]
}
```

- **`moduleResolution: "bundler"`** + tsup -> **extensionless relative imports**; never write `./config.js`.
- **`strict: true`** plus `noUnusedLocals` / `noUnusedParameters`; no unjustified `any` - external data (`sf --json`, files, args, env, HTTP bodies) is `unknown` then validated (`@rules/security.md`).
- Typecheck is **`tsc --noEmit`**; the shipped bundle comes from tsup/esbuild (or Vite), not `tsc`.
- **No `rootDir` / `outDir`** - `tsc` is typecheck-only and `include` lists the root-level `tsup.config.ts`; a `rootDir: "src"` raises `TS6059` ("file not under rootDir"). Use `noEmit: true` and omit `rootDir`/`outDir`.
- **Project with UI**: set `"lib": ["ES2023", "DOM", "DOM.Iterable"]`, `"jsx": "react-jsx"`, add `"vite/client"` to `types`, and add `vite.config.ts` to `include`.

## `eslint.config.mjs` (flat config)

```js
// eslint.config.mjs - ESLint 10 flat config with typescript-eslint (self-contained: bundles parser + plugin).
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**"] },
  ...tseslint.configs.recommended,
  {
    rules: {
      // Match tsconfig's noUnusedParameters convention: an intentionally-unused arg/var is prefixed `_`.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
);
```

- **`argsIgnorePattern: "^_"` is mandatory.** `typescript-eslint`'s `no-unused-vars` does **not** honor the `_` prefix by default, whereas `tsconfig`'s `noUnusedParameters` does - without this override a deliberately-unused `_dest` / `_e` parameter (e.g. `output/table.ts`) fails `eslint` while passing `tsc`. Keep the two in sync.
- `recommended` (non-type-checked) is enough for a CLI. Add `recommendedTypeChecked` only if type-aware lint is needed (it requires `parserOptions.project`).
- No `@eslint/js` dependency needed - `typescript-eslint`'s shared config is self-contained.
- **Project with UI**: the same config applies; React-specific lint plugins are added only if validated in Phase 1 (`@rules/ui.md`).

## `vite.config.ts` and UI dependencies (projects with UI only)

Applies only to the **application** use case (and the webview of an extension). The browser bundle is built by Vite, not tsup.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist", sourcemap: true },
});
```

- `index.html` at the project root loads `/src/main.tsx` (the composition root of the application).
- Scripts: `"dev": "vite"`, `"build": "vite build"`; `typecheck` stays `tsc --noEmit`.
- With tests enabled: `vitest` runs with the `jsdom` environment and `@testing-library/react` (`@rules/tests.md`). The `jsdom` ban of a headless CLI does not apply here.
- Conventions (structure, state, styling, accessibility): `@rules/ui.md`.

## Dependency versioning

`package.json`: caret versions (`^`), pinned to the minor validated in Phase 1. `yarn.lock` committed.

```json
"dependencies":    { "commander": "^15.0.0", "cross-spawn": "^7.0.6", "pino": "^10.4.0",
                     "pino-pretty": "^13.2.0", "exceljs": "^4.4.0", "csv-stringify": "^6.9.0" },   // exceljs / csv-stringify: only when xlsx / csv is shipped
"devDependencies": { "typescript": "^6.0.3", "tsup": "^8.5.1", "tsx": "^4.23.15",
                     "@types/node": "^24", "@types/cross-spawn": "^6.0.6",
                     "eslint": "^10.12.0", "typescript-eslint": "^8.71.1",
                     "prettier": "^3.9.9" }
```

The sample is the CLI with Salesforce. Keep per use case only what the contract needs: `commander` (CLI only), `cross-spawn` + `@types/cross-spawn` (Salesforce only), `exceljs` (only when the `xlsx` format is selected) and `csv-stringify` (only when `csv` is selected) - `json` and `table` need no dependency, `pino` + `pino-pretty` (CLI and service; other use cases per `@rules/logging.md`).

Conditional (added only when the matching Phase 1 option is on):
- **Interactive prompts** (opt-in, CLI): `@clack/prompts ^1.7.0` in `dependencies`. Not added by default - a headless CLI takes its input from flags/env, and prompts must be guarded against a non-TTY / `--yes` run (`@rules/cli.md`).
- **Tests** (Phase 1): `vitest ^5.0.3` in `devDependencies` + the `"test": "vitest run"` script (`@rules/tests.md`).
- **UI** (projects with UI only): `vite ^8.3.4` and `@vitejs/plugin-react ^6.1.2` in `devDependencies`; `react ^19.3.0` and `react-dom ^19.3.0` in `dependencies`, with `@types/react ^19.3.0` and `@types/react-dom ^19.3.0` in `devDependencies`; with tests, `jsdom ^30.1.2`, `@testing-library/react ^16.3.3` and its peer `@testing-library/dom ^10.4.2` in `devDependencies`. `@vitejs/plugin-react` 6 requires `vite ^8`. Re-confirm at generation with `yarn npm info <package>` (`yarn-npm-info.md`).

Versioning notes:
- **`@types/node`**: match the **target Node LTS line** - `^24` for Node 24 (the registry `latest` is `26.x`, do not take it for a Node 24 target). Targeting current (Node 26) -> `^26`. Keep it in sync with the `tsup` `target` and `engines.node`.
- **`typescript ^6.0.3` + `typescript-eslint ^8.71.1`**: typescript-eslint 8's TypeScript peer range is `>=4.8.4 <6.1.0`. **TypeScript 6.0.x shipped stable** (`6.0.2`, `6.0.3`), so pin `^6.0.3` - it resolves to the highest 6.0.x, inside that range. Caveat: the registry `latest` tag is now **7.x** (`7.0.2`, the native/Go-port line), which typescript-eslint 8 does **not** support (peer `<6.1.0`), so a bare `yarn add typescript` would pull an unsupported 7.x - the `^6.0.3` pin is deliberate. Checked on the registry on 2026-10-10: `typescript` `latest` is `7.0.2` and `typescript-eslint 8.71.1` still declares `typescript >=4.8.4 <6.1.0`. Do **not** take `latest` / `^7.x` until a typescript-eslint major widens its peer range. Confirm at generation: `yarn npm info typescript` and `yarn npm info typescript-eslint --fields peerDependencies` (`yarn-npm-info.md`).
- **`yarn up` ignores the manifest range**: `yarn up <package>` moves to the latest release (`yarn-up.md`), which would break the TypeScript pin above. Update `typescript` with an explicit target (`yarn up typescript@<6.0.x version>`).
- **`eslint ^10.12.0`**: **flat config only** (`eslint.config.mjs`); its engines are `^20.19.0 || ^22.13.0 || >=24`. **`commander ^15.0.0`** needs **Node >= 22.12**. Both are satisfied by the Node 24 target.
- **`vitest ^5.0.3`**: peers `vite ^6.4 || ^7 || ^8` and `@types/node ^22 || >=24`, engines `^22.12 || ^24 || >=26`, so it fits Node 24 and `vite ^8`. It is a major step above the `^4.1.x` line (last `4.1.11`) and the test patterns of `@rules/tests.md` are not yet validated on it: run the first `yarn test` as the check, and fall back to `^4.1.11` if a pattern breaks.
- **`jsdom ^30.1.2`** (projects with UI and tests): its engines are `^22.22.2 || ^24.15.0 || >=26`, stricter than `engines.node >=24`. For such a project set `engines.node` to `>=24.15` (or pin an older `jsdom`).
- **`csv-stringify ^6.9.0`** (conditional: only when the `csv` format ships): the **standalone package from the `csv` project** (`csv-stringify`, not the umbrella `csv` bundle) - import `csv-stringify` / `csv-stringify/sync` for the sync API (`@rules/output.md`).
- **`exceljs ^4.4.0`** (conditional: only when the `xlsx` format ships): the maintained **xlsx** choice. **Avoid SheetJS / `xlsx`** (supply-chain / security history) - do not substitute it (`@rules/output.md`).
- **`pino ^10.4.0`** + **`pino-pretty ^13.2.0`** - **both runtime `dependencies`** (the mandatory logging pair for CLI and service, `@rules/logging.md`). `pino-pretty` is imported at module load by `src/logger.ts` (used whenever `NODE_ENV !== "production"`), so it must be a `dependency`, **not** a devDependency: **tsup externalizes `dependencies` but bundles `devDependencies`**, and a bundled `pino-pretty` throws `Dynamic require of "tty" is not supported` in the ESM output. Rule of thumb: every package imported by shipped `src/` goes in `dependencies`.
- **`cross-spawn ^7.0.6`** (runtime) + **`@types/cross-spawn ^6.0.6`** (dev), **Salesforce only**: the only correct way to spawn `sf` cross-OS (`@rules/sf-cli.md`, `@rules/security.md`).

> **Version maintenance**: this table and these notes reflect the registry state checked on 2026-10-10 (Yarn Classic `yarn info`, same registry as `yarn npm info`). Before pinning in a new project, re-confirm the current minors (`yarn upgrade-interactive` lists the outdated packages against the registry - `yarn-upgrade-interactive.md`; `yarn npm info <package>` for one package; the release notes) - they age. The caret rule and the structure stay; the numbers and notes are refreshed per project in Phase 1. Once refreshed and validated, the ranges are used **as written** when `package.json` is written (for example `eslint ^10.12.0`, never a loosened `^10`).

## Anti-patterns - what NOT to do

- **Do not** use `npm`, `npx`, `pnpm`, or commit a `package-lock.json` - Yarn Berry only (`yarn.lock` is the single lockfile).
- **Do not** enable Plug'n'Play or zero-install: `nodeLinker: node-modules` stays, `.yarn/cache` is never committed.
- **Do not** write a `yarn` command or flag that is not in `yarn-berry-cli-reference/`.
- **Do not** add `dotenv` - `.env` is read natively (`process.loadEnvFile()` / `--env-file`).
- **Do not** add a spinner/progress dependency (`ora`, `nanospinner`, `cli-progress`) - the progress reporter is hand-rolled, zero-dependency (`@rules/progress.md`), same rationale as the `table` formatter.
- **Do not** read `process.env` scattered across the code - the env layer is read **once** in `resolveConfig()`; modules receive the resolved `AppConfig`.
- **Do not** put a token/password/secret in `.env` or `config.ts` - non-secret only (`@rules/security.md`).
- **Do not** commit `.env` - only `.env.example` (placeholder values).
- **Do not** let a later cascade layer's `undefined` clobber an earlier value - `prune` before merge.
- **Do not** trust an env value raw - validate it (`toLevel`, `toPositiveInt`); an invalid value falls back to the lower layer.
- **Do not** add a `.js` extension to a relative import - `moduleResolution: "bundler"` + tsup use extensionless imports.
- **Do not** hardcode a constant reused in more than one file - promote it to `config.ts`; a shared type to `src/types.ts`.
- **Do not** bump a dependency major without re-checking the compatibility notes above (peer ranges, Node floor, flat config).

## Integrity verification

Detailed in `@rules/verification.md`. Key points: `package.json` carries `packageManager` and `"type": "module"`, `.yarnrc.yml` has `nodeLinker: node-modules`, `yarn.lock` committed, no npm artifact; a single `resolveConfig()` cascade `DEFAULTS < .env/env < flags`, resolved once in the composition root and threaded down (no scattered `process.env` reads); env values parsed and validated (`toLevel`, `toPositiveInt`), `prune` applied so a later layer's `undefined` never clobbers an earlier value; `.env` non-secret only, loaded natively (no `dotenv`), gitignored with `.env.example` committed; `APP_VERSION` imported from `package.json` (never hand-written); relative imports extensionless (`moduleResolution: "bundler"`); dependency pins re-confirmed at generation within the documented peer ranges. Run silently; report only on a discrepancy.
