# Use cases - explanatory guide (CLI tool, library, service, extension, application)

> Phase 1 fixes **one** use case per project and `docs/specs/04-architect.md` locks it. This guide explains each use case: what it is, when to pick it, where the code starts, what the tree looks like, how to build and run it with Yarn, how errors and logs behave, how to test it, how it ships, and what goes wrong. Referenced by `/yarn-p1-scoping`, `/yarn-p3-surfaces`, `/yarn-p4-architect`, `/yarn-p5-development`, `/yarn-add-feature`. Layering detail: `@rules/architecture.md`. Release channels: `@rules/distribution.md`.

## Which use case?

Answer the questions in order. The first "yes" is the use case. If two answers are "yes", the project has two deliverables: pick the primary one now and treat the other as a separate project or a later phase (see "When two use cases fit" below).

| Question                                                                                          | If yes             |
| ------------------------------------------------------------------------------------------------- | ------------------ |
| Does a person (or a scheduler) start it, it does one job, and it exits?                           | CLI tool           |
| Do other developers import it into their own code, with no process of its own?                    | Library            |
| Must it keep running and answer requests (HTTP, jobs, messages) without a person at the keyboard? | Service            |
| Does it plug into another program (editor, browser, platform) through that program's plugin API?  | Extension          |
| Does a person use it through screens in a window or a browser tab?                                | Application        |

Comparison (same table as `CLAUDE.md`, kept here so this guide stands alone):

| Use case    | Entry point        | Typical output                        | Release channel (see `@rules/distribution.md`) |
| ----------- | ------------------ | ------------------------------------- | ---------------------------------------------- |
| CLI tool    | `src/cli.ts`       | executable bin bundled by `tsup`      | npm registry, or local run of `dist/cli.js`    |
| Library     | `src/index.ts`     | importable package (ESM, types)       | npm registry                                   |
| Service     | `src/server.ts`    | long-running Node.js process          | run locally, or external target (opt-in)       |
| Extension   | `src/extension.ts` | extension bundle for its host         | packaged artifact installed by hand, or the host's store (opt-in) |
| Application | `src/main.tsx`     | web UI built by Vite (React)          | local build, or external target (opt-in)       |

What changes and what does not:

- **Common core** (all five): `src/`, `test/` mirroring `src/`, shared files `config.ts`, `types.ts`, `errors.ts`, plus `logger.ts` where the use case imposes it. Business logic lives in `src/services/` and returns `Result<T>` (`@rules/errors.md`).
- **Changes per use case**: the entry point (the single composition root), the thin adapter layer above the services, the build tool (`tsup` for Node, Vite for browser UI), and the release channel.

### When two use cases fit

- **Library plus a small CLI on top**: the library is the product. Pick Library. A CLI wrapper is a second project that depends on the published library (that keeps the library free of `process.argv` and `process.exit`).
- **Application that needs a backend**: the application is the UI project. The backend is a Service project. Phase 1 records the HTTP contract between them; the application never embeds server code.
- **Extension with a settings screen**: still an Extension. The screen is a webview built with the same React base (`@rules/ui.md`).
- **CLI that is also run on a schedule**: still a CLI. The scheduler only needs the exit codes (`@rules/cli.md`).

## Salesforce coupling and the use case

Salesforce is optional and independent of the use case. Phase 1 decides it (clear, absent, or ask). When it is confirmed, `src/sf/` is added to the tree and `@rules/sf-cli.md` applies; the use case does not change.

| Use case    | Fit with Salesforce coupling                                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI tool    | Typical. `sf` runs on the same machine as the user, who is already logged in through `sf`. Add `src/sf/` and the starter groups from Phase 3. |
| Service     | Typical. The machine running the service needs `sf` installed and an authenticated org. The service never handles OAuth tokens itself (`@rules/security.md`). |
| Library     | Possible but heavy: every consumer inherits the `sf` runtime prerequisite. Confirm it explicitly in Phase 1 and document the prerequisite in the README. |
| Extension   | Only on the host-process side, if the host runs extension code in Node. Never in a webview.                                                  |
| Application | Never in the browser bundle: a browser cannot spawn `sf`. A UI that needs Salesforce data calls a Service project that owns `src/sf/`.       |

- `src/sf/` sits **below** `services/`, exactly as in `@rules/architecture.md`. Adapters never call it.
- Without coupling, nothing Salesforce-related is loaded or scaffolded. Do not add a `src/sf/` "just in case".

---

## 1. CLI tool

### What it is
A program a person runs in a terminal (or a scheduler runs unattended). It reads arguments, does a job, writes its result to `stdout`, writes logs and messages to `stderr`, and exits with a code.

### When to pick it
- The work is a command with a start and an end: export data, run a check, call an API and print the result.
- The output must be pipeable into other tools (`... --format json | jq ...`).
- A scheduler (Task Scheduler, cron, CI job) will run it and react to the exit code.

Pick something else if it must stay alive between calls (Service) or show screens (Application).

### Entry point and composition root
- `src/cli.ts` is the bin entry, bundled to `dist/cli.js` by `tsup` with a shebang. It is the **only** place that bootstraps `commander`, registers command groups, installs the global `uncaughtException` / `unhandledRejection` handlers, and calls `process.exit`.
- Composition order: global handlers -> `.env` load -> pre-parse the global flags (`program.opts()` is empty before `parseAsync`) -> `resolveConfig()` -> `configureLogger()` -> `configureProgress()` -> build the real program and the services -> register command groups -> `parseAsync`. The full bootstrap is owned by `@rules/cli.md`.

### Source tree
```
src/
├── cli.ts                 # composition root
├── config.ts · logger.ts · progress.ts · types.ts · errors.ts
├── commands/              # thin adapters: parse flags -> one service -> format
├── services/              # business logic, returns Result<T>
├── output/                # json · table always; csv · xlsx only when selected in Phase 1
└── sf/                    # Salesforce coupling only
```

### Build and run with Yarn
| Goal                         | Command                                  |
| ---------------------------- | ---------------------------------------- |
| Install dependencies         | `yarn install`                           |
| Run from source (dev)        | `yarn dev <args>` (`tsx src/cli.ts`)     |
| Typecheck / lint / format    | `yarn typecheck` · `yarn lint` · `yarn format` |
| Bundle                       | `yarn build` (`tsup` -> `dist/cli.js`)   |
| Run the bundle               | `yarn node dist/cli.js <args>`           |
| Tests (if enabled)           | `yarn test`                              |

- `yarn dev <args>` runs the script `dev` of `package.json`; the arguments after it reach the script (`yarn run <scriptName> ...`, verified in the Yarn catalog).
- `yarn node` starts Node with the same version as Yarn; arguments go to Node (`yarn-node.md`).
- Add a dependency with `yarn add <package>` (runtime) or `yarn add -D <package>` (dev). Only libraries validated in Phase 1.

### Errors and logging
- Services return `Result<T>` or raise a named error. `cli.ts` maps the outcome to the exit code: `0` success, `1` runtime error, `2` usage or validation error (`@rules/cli.md`, `@rules/errors.md`).
- `stdout` carries data only. Logs and human messages go to `stderr` through `src/logger.ts` (pino). A progress reporter shows long operations on `stderr` (`@rules/progress.md`).
- Datasets leave through `output/` formatters (`@rules/output.md`), never through `console.log`. An empty dataset (list, query, export) is a success: valid empty output, exit `0` (`@rules/errors.md`).

### Tests
- `vitest`, `test/` mirrors `src/`. Test services with fake dependencies, and commands by calling the registered action with a fake service.
- **No `jsdom`** for a headless CLI: there is no DOM. Patterns: `@rules/tests.md`.

### Release channel
Personal by default: run locally with `yarn dev` or `node dist/cli.js` (after `yarn build`). `yarn link` installs no global command; it is run from another (consumer) project and is not the way to use the tool. External publication (opt-in, Phase 1): the npm registry, the `bin` field exposes the command. Steps: `@rules/distribution.md`, sections "npm registry" and "Local run".

### Pitfalls
- Writing a log line or a progress message to `stdout`: it corrupts the data a pipe reads.
- Calling `process.exit` from a command or a service: the process dies before logs flush and tests cannot assert. Set `process.exitCode` or raise a named error.
- Forgetting the shebang: the bundled `dist/cli.js` then is not executable as a bin.
- Changing an exit code, a flag name, or the `stdout` shape without a MAJOR version: scripts depend on them (`@rules/versioning.md`).

---

## 2. Library

### What it is
A package other developers import. It has no process of its own: no `main`, no `process.argv`, no global handlers, no `.env` reading. The consumer decides how it is run, configured, and logged.

### When to pick it
- The value is reusable code: a client for an API, a parser, a set of helpers, domain logic shared by several projects.
- Consumers are developers, and the interface is function and type signatures.

### Entry point and composition root
- `src/index.ts` is the **public API barrel**: explicit named exports, no side effect on import. It is also the composition root: a factory such as `createX(options)` builds the services and returns the public object.
- Everything not exported from `index.ts` is private. The `package.json` `exports` field blocks deep imports into `dist/` (`@rules/distribution.md`).
- Configuration arrives as **function arguments**, never from `process.env` or a `.env` file.

```ts
// src/index.ts - public API barrel and composition root (no side effect on import)
import { GreetingService } from "./services/greeting.service";
import type { Logger } from "./types";

export type { Logger, Result } from "./types";
export { ValidationError } from "./errors";

export interface LibraryOptions {
  /** Optional sink for diagnostics. Default: no output. */
  logger?: Logger;
}

// Intentional no-op: a library is silent unless the consumer injects a logger.
const silentLogger: Logger = { debug() {}, info() {}, warn() {}, error() {} };

export function createLibrary(options: LibraryOptions = {}) {
  const greeting = new GreetingService(options.logger ?? silentLogger);
  return { greet: (name: string) => greeting.greet(name) };
}
```

### Source tree
```
src/
├── index.ts               # public API barrel + factory
├── config.ts · types.ts · errors.ts
├── services/              # business logic
└── sf/                    # Salesforce coupling only (see the table above)
```
No `logger.ts`, no `commands/`, no `output/`.

### Build and run with Yarn
| Goal                         | Command                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| Install dependencies         | `yarn install`                                              |
| Rebuild on change (dev loop) | `yarn dev` (`tsup --watch`)                                 |
| Typecheck / lint / format    | `yarn typecheck` · `yarn lint` · `yarn format`              |
| Build                        | `yarn build` (`tsup` -> `dist/index.js` + `dist/index.d.ts`) |
| Inspect what would ship      | `yarn pack --dry-run`                                       |
| Tests (if enabled)           | `yarn test`                                                 |

- A library has nothing to "run". The loop is `yarn test` plus `yarn build`. To try the built package in a real consumer, install the tarball (`@rules/distribution.md`, "npm registry").
- `yarn pack --dry-run` (verified in `yarn-pack.md`) lists the files of the archive without creating it: use it to prove `files` and `exports` are right.

### Errors and logging
- The public API chooses **one** style in Phase 3 and keeps it: return `Result<T>`, or throw named errors. Document it in TSDoc on every exported function.
- Export the named error classes so consumers can use `instanceof`. Never throw a bare `Error` with a message to parse.
- No `process.exit`. No `uncaughtException` / `unhandledRejection` handler: the global handler rule applies to process entry points (`cli.ts`, `server.ts`); a library must never take over its host process.
- No `logger.ts`, no pino, no `console.*`. Diagnostics go through an **optional injected `Logger`** (interface in `types.ts`); the default is silent. The consumer plugs in its own logger.

### Tests
- `vitest`, `test/` mirrors `src/`. Test through the public API (`index.ts`) for behavior, and `services/` directly for edge cases.
- Add one check that the built package exposes what `exports` promises (after `yarn build`, import the entry from a test or a smoke script).

### Release channel
npm registry. Steps: `@rules/distribution.md`, section "npm registry".

### Pitfalls
- Exporting a service class that is really internal: it becomes public API and a later change is a MAJOR bump.
- Reading `process.env` inside the library: behavior then depends on the consumer's environment.
- Shipping `src/` or test files because `files` is missing: check with `yarn pack --dry-run`.
- Declaring a runtime dependency under `devDependencies`: it works locally and fails in the consumer's install.
- Forgetting the `types` entry in `exports`: TypeScript consumers lose all types.

---

## 3. Service

### What it is
A long-running Node.js process that answers requests (HTTP most often) or consumes jobs. Nobody types commands into it: a platform starts it, restarts it, and stops it.

### When to pick it
- Other programs or a UI call it over the network.
- It must hold state or connections between calls, or react to events and schedules.
- It is the backend of an Application project, and the only place where Salesforce coupling can live for a browser UI.

### Entry point and composition root
- `src/server.ts` builds and starts the server. It is the **only** place that installs the global handlers, reads the configuration, wires the services, starts listening, handles shutdown signals, and calls `process.exit`.
- Order: global handlers -> `resolveConfig()` -> `configureLogger()` -> build services -> build routes -> listen -> install `SIGTERM` / `SIGINT` handlers.
- The HTTP layer (`node:http` or a framework) is a Phase 1 decision. Nothing in this guide depends on that choice.

```ts
// src/server.ts - STRUCTURAL ORDER only
process.on("uncaughtException", ...);   // log fatal, then exit non-zero
process.on("unhandledRejection", ...);  // log fatal, then exit non-zero
const config = resolveConfig();
configureLogger(config);
// build services, then routes that receive them, then start listening
// on SIGTERM / SIGINT: stop accepting, let in-flight requests finish, then exit
```

### Source tree
```
src/
├── server.ts              # composition root: start, shutdown, global handlers
├── config.ts · logger.ts · types.ts · errors.ts
├── routes/                # thin endpoint handlers: validate input -> one service -> respond
├── services/              # business logic, returns Result<T>
└── sf/                    # Salesforce coupling only
```
Include a `routes/health.ts` (liveness) from the first batch: platforms need it to know the process is alive.

### Build and run with Yarn
| Goal                         | Command                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| Install dependencies         | `yarn install` (`yarn install --immutable` in CI)                |
| Run from source (dev)        | `yarn dev`                                                       |
| Typecheck / lint / format    | `yarn typecheck` · `yarn lint` · `yarn format`                   |
| Bundle                       | `yarn build` (`tsup` -> `dist/server.js`)                        |
| Run the bundle               | `yarn node dist/server.js`                                       |
| Run the bundle with a `.env` | `yarn node --env-file=.env dist/server.js` (local only)          |
| Tests (if enabled)           | `yarn test`                                                      |

- `.env` is a local-development convenience. In production the platform injects environment variables; nothing secret is in a file (`@rules/config.md`, `@rules/security.md`).
- Production installs only runtime dependencies: `yarn workspaces focus --production` (verified in `yarn-workspaces.md`). The bundle externalizes dependencies by default, so they must be present at run time.

### Errors and logging
- Services return `Result<T>` or raise named errors. The boundary (the route layer plus a top-level error handler) maps them to responses: validation error -> client error status with a clear message, anything unexpected -> generic server error status. A stack trace never reaches the client.
- The HTTP status table is the service equivalent of the CLI exit codes: define it once in `routes/` and keep it stable (changing it is a breaking change).
- `src/logger.ts` (pino) is mandatory. Destinations and fields: `@rules/logging.md`. Never log a token, a secret, or a full request body.
- A fatal error logs, then exits with a non-zero code so the platform restarts the process.

### Tests
- `vitest`, `test/` mirrors `src/`. Test services with fake dependencies. Test routes by calling handlers with fake services, or by starting the server on an ephemeral port and sending real requests.
- No `jsdom`. Close the server in an `afterEach` or the test run hangs.

### Release channel
Personal by default: run locally from the built bundle (`yarn node dist/server.js`). External publication (container image, host, archive...) is an opt-in choice made in Phase 1, with the target and artifact format recorded in `docs/specs/01-scoping.md`. Steps: `@rules/distribution.md`, section "Local run or external target (service)".

### Pitfalls
- Business logic in a route handler: it cannot be reused or tested without HTTP.
- Calling `process.exit` in the middle of a request, or ignoring `SIGTERM`: in-flight requests are cut and deploys look like crashes.
- Baking a `.env` into the artifact: secrets then travel with the image.
- No health route, or a health route that calls a slow dependency: the platform kills a healthy process or never marks it ready.
- Unbounded input: validate every body and parameter from `unknown` before it reaches a service.

---

## 4. Extension

### What it is
Code that runs inside another program (the **host**) and adds capabilities through the host's plugin API: commands, menus, panels, event handlers. The host loads it, calls its activation entry, and owns its lifecycle. The host is chosen in Phase 1 (closed question "Extension host"): **VS Code** is the recommended host and the one documented here; for any other host this framework prescribes only the common core plus what the user supplies in Phase 1.

### When to pick it
- The users already work inside the host and want the feature there, not in a separate window.
- The feature needs host data or events (current document, selection, tabs, workspace).

### Host (chosen in Phase 1)

**When host = VS Code:**
- The extension has a `package.json` manifest (`engines.vscode`, `main`, `contributes`, `activationEvents`) and uses the `vscode` API. It is packaged as a `.vsix` built with `vsce`.
- For the detailed host rules (manifest, webview CSP and messaging, state, packaging flags), use the dedicated `vscode` generator framework for host-specific rules. This framework prescribes only the common core below: composition root `src/extension.ts`, `src/contributions/`, services, typed and validated webview messages, `Result` and named errors.

**Another host (browser extension, JetBrains IDE, other):**
- This framework prescribes only the common core below (same list as above). Nothing host-specific is assumed: no manifest field, no API name, no packaging or publish command.
- The host's manifest or activation contract and its packaging command (or a path to its documentation) are what the user stated in Phase 1, recorded in `docs/specs/01-scoping.md`. Use only those; if one is missing, ask, never invent.
- The VS Code specifics in the rest of this section (the `.vsix`, the `vscode` API, the output channel) are examples of the host mechanism: another host follows the same boundary with its own equivalents.

### Entry point and composition root
- `src/extension.ts` exports the activation entry the host calls (name and signature come from the host). It is the composition root: it receives the host API, wraps it once in an adapter, builds the services, and registers the contributions.
- Services **never import the host SDK**. They receive what they need through interfaces declared in `types.ts` (for example a `HostApi` with `showMessage`, `getSelection`, `log`). Only `extension.ts` implements those interfaces.

### Source tree
```
src/
├── extension.ts           # activation entry + composition root
├── config.ts · types.ts · errors.ts      # types.ts holds the HostApi and Logger interfaces
├── contributions/         # commands, views, handlers declared to the host: thin adapters
├── services/              # business logic, returns Result<T>, no host import
├── ui/                    # only if the extension shows a React webview (own entry main.tsx) - @rules/ui.md
└── sf/                    # Salesforce coupling only, host-process side
```

### Build and run with Yarn
| Goal                         | Command                                                           |
| ---------------------------- | ----------------------------------------------------------------- |
| Install dependencies         | `yarn install`                                                    |
| Typecheck / lint / format    | `yarn typecheck` · `yarn lint` · `yarn format`                    |
| Bundle the host-side code    | `yarn build` (`tsup` -> `dist/extension.js`)                      |
| Bundle a webview (if any)    | built by Vite, see `@rules/ui.md`                                 |
| Tests (if enabled)           | `yarn test`                                                       |

- Manual testing: when host = VS Code, package the `.vsix` and install it by hand in VS Code (packaging flags: the `vscode` framework). Another host: package and install per the contract the user stated in Phase 1.
- The host often provides the APIs at run time, so the bundle must treat them as external, not bundle them.

### Errors and logging
- Contributions catch named errors and `Result` failures and show them through the host's notification mechanism, in the user's language. A throw must never escape an activation or a command handler: the host may disable the whole extension.
- No pino, no `logger.ts`. Logs go through an injected `Logger` (interface in `types.ts`) that `extension.ts` implements with the host's log channel. Zero `console.log`.
- Activation must be fast and must not fail on missing optional data.

### Tests
- `vitest`, `test/` mirrors `src/`. Services are tested with fake `HostApi` / `Logger`. The real host is not available in unit tests: keep contributions thin so there is little to miss.
- Webview components: `jsdom` + `@testing-library/react` (`@rules/ui.md`).

### Release channel
Personal by default: build the packaged artifact and install it by hand in the host (when host = VS Code: the `.vsix`). Publication to the host's store is an external, opt-in channel chosen in Phase 1 and recorded in `docs/specs/01-scoping.md`; when host = VS Code the exact publish command is defined by the `vscode` framework, for another host it is the one the user stated in Phase 1. Steps: `@rules/distribution.md`, section "Extension (host chosen in Phase 1)".

### Pitfalls
- Importing the host SDK from a service: tests then need the host and the logic is locked to it.
- Doing heavy work at activation: the host start-up slows down and the host may flag the extension.
- Assuming a browser or a full Node environment: the host decides which APIs exist.
- Bundling host-provided modules into `dist/`: version clashes at run time.
- Letting the webview call host or network APIs directly: messages go through a typed, validated protocol (`@rules/ui.md`).

---

## 5. Application (with UI)

### What it is
A web UI built with Vite, React, and TypeScript strict. It runs in a browser tab or in a shell that embeds a browser. It is a static bundle: no Node process at run time.

### When to pick it
- A person works through screens, forms, tables, or dashboards.
- The logic is mostly presentation and interaction, with data coming from an API (often a Service project) or from local state.

### Entry point and composition root
- `index.html` (project root) loads `src/main.tsx`. `main.tsx` is the composition root: it creates the services, installs the global `error` / `unhandledrejection` listeners, and mounts the React tree with the services provided through context.
- Components render and dispatch. Hooks connect React state to services. Services are plain TypeScript with no React or DOM import. Detail: `@rules/ui.md`.

### Source tree
```
index.html · vite.config.ts · tsconfig.json
src/
├── main.tsx               # composition root: services, global listeners, mount
├── config.ts · types.ts · errors.ts
├── ui/                    # App.tsx, screens/, components/, hooks/, styles/ - @rules/ui.md
├── services/              # business logic, no DOM, returns Result<T>
└── sf/                    # not in a browser bundle: Salesforce data comes from a Service project
```

### Build and run with Yarn
| Goal                         | Command                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| Install dependencies         | `yarn install`                                                  |
| Dev server with hot reload   | `yarn dev` (`vite`)                                             |
| Typecheck / lint / format    | `yarn typecheck` · `yarn lint` · `yarn format`                  |
| Production build             | `yarn build` (`tsc --noEmit` then `vite build` -> `dist/`)      |
| Preview the production build | `yarn preview` (`vite preview`)                                 |
| Tests (if enabled)           | `yarn test` (`vitest`, `jsdom`)                                 |

- `vite build` does **not** typecheck. The `build` script runs `tsc --noEmit` first, or type errors ship.
- Do not scaffold with `yarn dlx create-vite`: the structure comes from the Phase 4 contract, and `yarn dlx` keeps no trace of what it ran (`yarn-dlx.md`).

### Errors and logging
- Services return `Result<T>`. Hooks turn a failed `Result` into a state the screen can show (message in the user's language, French by default). A React error boundary at the root catches render errors. The global `error` / `unhandledrejection` listeners in `main.tsx` are the equivalent of the Node global handlers.
- No pino, no `logger.ts`. Diagnostics, if Phase 1 asks for any, go through an injected `Logger` implemented in `main.tsx`. Zero `console.log` elsewhere.
- Never show a stack trace or a raw server message to the user.

### Tests
- `vitest` with `jsdom` and `@testing-library/react`; `test/` mirrors `src/`. Services are tested without React. Components are tested through roles and labels the way a user reads them (`@rules/ui.md`, `@rules/tests.md`).

### Release channel
Personal by default: `yarn build`, then `yarn preview` (Vite preview) or open the built `dist/`. External publication (host, installer, archive, GitHub Releases...) is an opt-in choice made in Phase 1, with the target and artifact format recorded in `docs/specs/01-scoping.md`. Steps: `@rules/distribution.md`, section "Local build or external target (application)".

### Pitfalls
- Putting a secret in a `VITE_*` variable: Vite copies those into the public bundle (`@rules/ui.md`, `@rules/config.md`).
- Fetching in a component with an inline `fetch` and no validation: server data is `unknown` until parsed.
- Business rules inside components: they cannot be tested without rendering.
- Trusting a green `vite build`: it does not mean the code typechecks.
- Adding a state library, router, or CSS framework that Phase 1 did not validate.

---

## Anti-patterns - what NOT to do

- **Do not** mix use cases in one project: one locked use case, one entry point, one release channel. A second deliverable is a second project.
- **Do not** start a project from a generator (`yarn dlx create-...`, a template): the tree comes from the Phase 4 contract.
- **Do not** put business logic in an adapter (command, route, contribution, UI component): services own it.
- **Do not** call `process.exit` anywhere except the composition root of a process (`cli.ts`, `server.ts`).
- **Do not** read `process.env` or `.env` in a library, an extension service, or a browser bundle: configuration is passed in, or comes from `import.meta.env` for a UI (`@rules/config.md`).
- **Do not** add a logging library to a library, an extension, or an application: inject a `Logger`.
- **Do not** add `src/sf/` without a confirmed Salesforce coupling, or put it in a browser bundle.
- **Do not** use the npm, npx, or pnpm command-line tools in any command, script, or README: Yarn only.
- **Do not** pick a release channel that does not match the use case (for example `yarn npm publish` for a service).

## Integrity verification

Detailed in `@rules/verification.md`. Key points: the use case recorded in `docs/specs/01-scoping.md` and `docs/specs/04-architect.md` matches the entry point that exists (`cli.ts`, `index.ts`, `server.ts`, `extension.ts`, or `main.tsx`) and there is only one; the tree matches the use case (no `commands/` or `output/` outside a CLI, no `routes/` outside a service, no `ui/` outside an application or a webview); the composition root is the only place that wires layers, installs global handlers (process entries), and calls `process.exit` (CLI, service); a library has no `process.*`, no `.env`, no global handler, and an explicit `exports` map; an extension service imports no host SDK; an application bundle contains no `src/sf/` and no secret in a `VITE_*` variable; `src/sf/` exists only with a confirmed Salesforce coupling; the release channel in `@rules/distribution.md` matches the use case.
