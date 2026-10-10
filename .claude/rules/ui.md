# UI rules - Vite + React + TypeScript strict (application and extension webview)

> Binding for any project **with UI**: the application use case (`src/main.tsx`) and the webview of an extension. Referenced by `/yarn-p3-surfaces`, `/yarn-p4-architect`, `/yarn-p5-development`, `/yarn-add-feature`. Layering: `@rules/architecture.md`. Use cases: `@rules/use-cases.md`. Tests: `@rules/tests.md`.

## When it applies

| Project                         | Applies                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| Application                     | Always. The whole project is a Vite + React bundle.                                             |
| Extension with a webview        | For the webview only. The host-side code (`src/extension.ts`) stays a Node bundle built by `tsup`. |
| CLI tool · library · service    | Never. No React, no Vite, no DOM, no `jsdom` (`@rules/use-cases.md`).                           |

Phase 3 (`/yarn-p3-surfaces`) is the visual contract of a project with UI: screens, their states (loading, empty, error, success), and the actions on each. It is not a design system and this framework does not provide one.

## Project structure

Application:

```
<project>/
├── index.html              # root page: <div id="root"> + <script type="module" src="/src/main.tsx">
├── vite.config.ts · tsconfig.json
├── src/
│   ├── main.tsx            # composition root: services, global listeners, mount
│   ├── config.ts · types.ts · errors.ts
│   ├── services/           # business logic, plain TypeScript, no React, no DOM
│   └── ui/
│       ├── App.tsx         # top-level layout and screen switching
│       ├── screens/        # one file per screen
│       ├── components/     # reusable presentational pieces
│       ├── hooks/          # glue between React state and services
│       ├── services-context.tsx   # React context that carries the services
│       └── styles/         # stylesheets (approach: see "Styling")
└── test/                   # mirrors src/ (+ setup.ts)
```

Extension webview (same folders, different entry):

```
<project>/
├── src/
│   ├── extension.ts        # host side, built by tsup - @rules/use-cases.md
│   ├── protocol.ts         # message types + validators shared by both sides (no Node, no DOM import)
│   └── ui/
│       ├── main.tsx        # webview composition root
│       ├── App.tsx · screens/ · components/ · hooks/ · styles/
├── webview.html            # webview page
└── vite.config.ts · tsconfig.webview.json
```

- `protocol.ts` is a file of the Phase 4 contract for an extension with a webview (see "Extension webview").
- One component per file, named export, file name equals component name (`UserTable.tsx`). Hooks start with `use` (`useOrders.ts`).
- `src/ui/` imports `services/` through the context only (see "Separation"). `services/` never imports `ui/`.

## Dependencies (no version numbers here)

The validated version ranges live in one place, `@rules/config.md` (section "Dependency versioning", caret ranges checked on the registry on 2026-10-10). This file never repeats a version number. Re-confirm the current release at generation with `yarn npm info <package>` (`yarn-npm-info.md`), then add the packages with `yarn add` (`yarn-add.md`).

| Group          | Packages                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------- |
| Runtime        | `react`, `react-dom`                                                                              |
| Build          | `vite`, `@vitejs/plugin-react` (dev)                                                              |
| Types          | `typescript`, `@types/react`, `@types/react-dom` (dev)                                            |
| Tests          | `vitest`, `jsdom`, `@testing-library/react` (dev)                                                 |
| Lint (optional)| `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`: only if validated in Phase 1               |

- `@testing-library/react` requires `@testing-library/dom` (peer `^10`) and `@types/react` / `@types/react-dom`: add them as dev dependencies. If `yarn install` still reports a missing peer, `yarn explain peer-requirements` shows who asks for what (`yarn-explain.md`).
- Commands: `yarn add react react-dom`, then `yarn add -D vite @vitejs/plugin-react ...` (`yarn-add.md`). With tests and `jsdom 30`, set `engines.node` to `>=24.15` (`@rules/config.md`).
- Any other library (router, state manager, data-fetching library, CSS framework, component library, form library) is **not included** unless Phase 1 validated it.

## Vite configuration

```ts
// vite.config.ts - application (Vite and Vitest share this file)
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist", sourcemap: true },
  test: {
    environment: "jsdom",
    include: ["test/**/*.test.{ts,tsx}"],
    setupFiles: ["test/setup.ts"],
  },
});
```

- `@vitejs/plugin-react` enables the JSX transform and fast refresh in dev. TSX compiles through Vite, so `tsup` is **not** used for the browser bundle.
- `defineConfig` comes from `vitest/config` so the `test` block is typed. Without tests (Phase 1), import it from `vite` and drop the `test` block.
- Webview build: set `base: "./"` (relative asset URLs, because the host serves the page from its own origin), `build.outDir` to `dist/webview`, and `build.rollupOptions.input` to `webview.html`. If the host needs stable file names, set `build.rollupOptions.output.entryFileNames`.

`tsconfig.json` for the browser code:

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "types": ["vite/client"],
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src", "test", "vite.config.ts"]
}
```

- In an extension, `tsconfig.json` stays the Node config for the host side and `tsconfig.webview.json` carries the block above for `src/ui/` and `src/protocol.ts`. `yarn typecheck` runs both (`tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.webview.json`). Keeping the DOM lib out of the host config stops host code from touching `window` by accident.

`package.json` scripts (application):

| Script      | Command                       | Note                                                             |
| ----------- | ----------------------------- | ---------------------------------------------------------------- |
| `dev`       | `vite`                        | dev server with hot reload                                       |
| `build`     | `tsc --noEmit && vite build`  | `vite build` alone does not typecheck                            |
| `preview`   | `vite preview`                | serves `dist/` locally to check the production build             |
| `typecheck` | `tsc --noEmit`                |                                                                  |
| `lint`      | `eslint .`                    |                                                                  |
| `format`    | `prettier --write .`          |                                                                  |
| `test`      | `vitest run`                  | one run, no watch                                                |

Run any of them with `yarn <script>` (`yarn-run.md`). Extension: `build` is `yarn build:host && yarn build:webview` (`tsup` for the host, `vite build` for the webview).

## Separation of UI and logic

Three roles, no overlap:

| Role       | Location          | Does                                                             | Never                                                         |
| ---------- | ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| Component  | `ui/components/`, `ui/screens/` | renders props and state, calls handlers                | business rule, `fetch`, data parsing, `process`/host calls    |
| Hook       | `ui/hooks/`       | calls a service, holds loading/data/error state                  | business rule, direct `fetch`                                 |
| Service    | `services/`       | business logic, data access, returns `Result<T>`                 | imports `react`, `react-dom`, or touches `document`/`window`  |

Services are **injected**, built once in `main.tsx` and carried by a context. No component creates a service.

```tsx
// src/ui/services-context.tsx
import { createContext, useContext } from "react";
import type { OrderService } from "../services/order.service";

export interface Services { orders: OrderService }

const ServicesContext = createContext<Services | null>(null);
export const ServicesProvider = ServicesContext.Provider;

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) throw new Error("ServicesProvider manquant");
  return services;
}
```

```tsx
// src/main.tsx - composition root
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { resolveConfig } from "./config";
import { OrderService } from "./services/order.service";
import { App } from "./ui/App";
import { ServicesProvider } from "./ui/services-context";

window.addEventListener("error", (e) => { /* show a generic message, never the stack */ });
window.addEventListener("unhandledrejection", (e) => { /* same */ });

const config = resolveConfig();
const services = { orders: new OrderService(config) };

const container = document.getElementById("root");
if (!container) throw new Error("Element #root introuvable");

createRoot(container).render(
  <StrictMode>
    <ServicesProvider value={services}>
      <App />
    </ServicesProvider>
  </StrictMode>,
);
```

```tsx
// src/ui/hooks/useOrders.ts - hook: state around one service call
import { useEffect, useState } from "react";
import type { Order } from "../../types";
import { useServices } from "../services-context";

type State =
  | { status: "loading" }
  | { status: "ready"; orders: Order[] }
  | { status: "error"; message: string };

export function useOrders(): State {
  const { orders } = useServices();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let active = true;
    void orders.list().then((res) => {
      if (!active) return;
      setState(res.ok
        ? { status: "ready", orders: res.data }
        : { status: "error", message: res.error.message });
    });
    return () => { active = false; };
  }, [orders]);

  return state;
}
```

- The `active` flag drops a result that arrives after the component unmounted (or after the effect re-ran).
- A screen handles **every** state of the hook: loading, empty, error, ready. Phase 3 lists them.
- Data from outside (a `fetch` response, `localStorage`, a host message) is `unknown` until a validator in `services/` parses it into a typed value. No `as` cast on external data, no `any`.

## Errors and logging

- Services return `Result<T>` (`@rules/errors.md`); hooks turn a failure into a state; the screen shows `error.message`. Messages are in the user's language (French by default). A stack trace, a raw server body, or a secret never reaches the screen.
- A React error boundary at the root of `App` catches render errors and shows a generic recovery screen. The `error` and `unhandledrejection` listeners in `main.tsx` are the browser counterpart of the Node global handlers.
- No `console.log`. Diagnostics, if Phase 1 asks for any, go through an injected `Logger` (interface in `types.ts`) implemented once in `main.tsx`. Never log a token or personal data.

## Configuration

- `src/config.ts` reads `import.meta.env`. **Every variable whose name starts with `VITE_` is copied into the public bundle**: anyone can read it. Only non-secret values (a public API base URL, a feature flag) go there. A secret in a `VITE_*` variable is a leak (`@rules/security.md`, `@rules/config.md`).
- A browser bundle has no `.env` cascade and no `process.env`. Secrets and credentials live on the server side (a Service project).

## State management

- Start with React: `useState` and `useReducer` for local state, context for what is truly shared (the services, the current user, a theme).
- Lift state up before reaching for a global store. Derive values during render instead of storing them.
- No state library, no data-fetching library, no router unless Phase 1 validated it. With several screens and no router, `App.tsx` switches on a state value.
- Server data is fetched by hooks through services; cache only what a screen proves it needs.

## Styling

- The styling approach is **validated in Phase 1** (plain CSS files, CSS Modules which Vite supports natively, or a library the user names). This file does not choose one.
- Until Phase 1 says otherwise, use plain CSS files in `src/ui/styles/`, imported where used, with class names scoped by component.
- Do not invent a palette, a design system, or a component library. Colors, spacing, and typography come from the user's Phase 1 answer or from a minimal neutral stylesheet.
- Never convey information by color alone (see accessibility).

## Accessibility basics

- Use semantic elements: `button` for actions, `a` for navigation, `label` for fields, `table` for tabular data, `h1`-`h3` in order. A clickable `div` is a defect.
- Every input has a visible `label` tied with `htmlFor`/`id`. Errors are linked to their input with `aria-describedby`.
- Images carry an `alt` (empty `alt=""` when decorative). Icon-only buttons carry an `aria-label`.
- Everything works with the keyboard alone, in a logical order, with a visible focus ring. Never remove `outline` without a replacement.
- Announce asynchronous status (loading finished, save failed) in a `role="status"` or `aria-live="polite"` region.
- Set `lang` on the root page (`<html lang="fr">` by default).
- Use ARIA attributes only when no native element does the job.
- Contrast between text and background is sufficient, and state is never shown by color alone.
- Test through roles and labels (`getByRole`, `getByLabelText`): if the test cannot find the element that way, a user with assistive technology cannot either.

## Typecheck and lint rules for TSX

- `strict: true`, no unjustified `any`, no `!` non-null assertion on DOM lookups (check and raise, as in `main.tsx`), no `@ts-ignore`.
- ESLint flat config applies `typescript-eslint` to `**/*.{ts,tsx}`. Add `eslint-plugin-react-hooks` (`rules-of-hooks`, `exhaustive-deps`) and `eslint-plugin-jsx-a11y` only if validated in Phase 1. Treat `exhaustive-deps` as an error: silencing it hides stale closures.
- `no-console` is an error. Prettier formats TSX.
- Function components only. Props typed with an `interface <Name>Props`. No default export for components.
- Do not define a component inside another component's body (it remounts on every render).
- Give every list item a stable `key` from the data (an id), never the array index of a list that reorders or filters.
- TSDoc on exported hooks and on components with non-obvious props.

## Tests (if enabled in Phase 1)

- `vitest` + `jsdom` + `@testing-library/react`, `test/` mirroring `src/` (`@rules/tests.md`). Files end in `.test.ts` or `.test.tsx`.
- Services are tested without React. Hooks and components are tested with a **fake service** passed through `ServicesProvider`.
- Testing Library only cleans up automatically when Vitest globals are on. This framework keeps globals off, so `test/setup.ts` registers the cleanup:

```ts
// test/setup.ts
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());
```

```tsx
// test/ui/screens/OrdersScreen.test.tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ServicesProvider } from "../../../src/ui/services-context";
import { OrdersScreen } from "../../../src/ui/screens/OrdersScreen";

it("affiche une alerte quand le chargement échoue", async () => {
  const fake = { orders: { list: async () => ({ ok: false as const, error: { kind: "error" as const, message: "Échec" } }) } };
  render(<ServicesProvider value={fake as never}><OrdersScreen /></ServicesProvider>);
  expect(await screen.findByRole("alert")).toBeTruthy();
});
```

- `as never` on the fake is allowed in tests only, to skip the unused members of a service. Prefer a small typed fake when the service is small.
- Do not test React or Vite. Test what the user sees and what the services return.

## Extension webview

The webview is a React page that runs in an isolated context of the host. It reuses the same base as the application (this file), and talks to the host side of the extension only through **messages**.

The webview transport API and the content security policy are host-specific: when host = VS Code, use the dedicated `vscode` generator framework for host-specific rules. This framework prescribes only the common rules below.

> The VS Code examples here assume host = VS Code (chosen in Phase 1). Another host follows the same boundary with its own notification and log mechanism.

Common rules:

- **One protocol, two sides.** `src/protocol.ts` declares the messages as a discriminated union and one validator per direction. It imports nothing from Node, the DOM, or the host SDK, so both bundles can import it.
- **Typed.** Each message has a `type` string literal and a typed payload.
- **Validated from `unknown`.** A received message is `unknown`. It is parsed by the validator before any use. An invalid message is dropped and logged; it never throws into the UI or the host.
- **Thin transport.** A single small module on each side wraps the host's send and receive mechanism (the `HostBridge` below). Components and services never call the host's transport directly. Tests replace the bridge with a fake.
- **The webview holds no privilege.** It cannot read files, call the network, or reach the host API on its own: it asks the host side by message, and the host side calls a service.
- **No inline script, no remote script.** The host may restrict both. The Vite production build emits external module files, which is why the webview is built for production and never loads the Vite dev server inside the host.

```ts
// src/protocol.ts - shared, no Node / DOM / host import
export type ToWebview =
  | { type: "orders"; items: { id: string; label: string }[] }
  | { type: "error"; message: string };

export type ToHost =
  | { type: "ready" }
  | { type: "refresh" }
  | { type: "open"; id: string };

export function parseToWebview(raw: unknown): ToWebview | null {
  if (typeof raw !== "object" || raw === null) return null;
  const m = raw as { type?: unknown; items?: unknown; message?: unknown };
  if (m.type === "error" && typeof m.message === "string") {
    return { type: "error", message: m.message };
  }
  if (m.type === "orders" && Array.isArray(m.items) && m.items.every(isItem)) {
    return { type: "orders", items: m.items };
  }
  return null;
}

function isItem(v: unknown): v is { id: string; label: string } {
  if (typeof v !== "object" || v === null) return false;
  const o = v as { id?: unknown; label?: unknown };
  return typeof o.id === "string" && typeof o.label === "string";
}

// parseToHost(raw: unknown): ToHost | null is written the same way, for the other direction.
```

```ts
// src/ui/host-bridge.ts - the only module that touches the host transport
import type { ToHost, ToWebview } from "../protocol";

export interface HostBridge {
  send(message: ToHost): void;
  onMessage(handler: (message: ToWebview) => void): () => void;
}
// The implementation wraps the host's send/receive API and runs every incoming value
// through parseToWebview before calling the handler.
```

- A schema library for validation is allowed only if Phase 1 validated it. Hand-written guards, as above, need no dependency.
- Version the protocol when a message changes shape on only one side: both bundles ship in the same extension, so they change together, but a persisted message (stored state) must stay readable.

## Anti-patterns - what NOT to do

- **Do not** put business logic, `fetch`, or data parsing in a component or a hook: they belong to `services/`.
- **Do not** import `react`, `react-dom`, `window`, or `document` in `services/`.
- **Do not** create a service inside a component: it is built in `main.tsx` and injected through the context.
- **Do not** add a state library, router, data-fetching library, CSS framework, or component library that Phase 1 did not validate.
- **Do not** invent a design system, a palette, or a theme layer.
- **Do not** read secrets from a `VITE_*` variable, or put one there: the whole bundle is public.
- **Do not** trust external data (`fetch`, storage, host message): parse from `unknown`, never `as` or `any`.
- **Do not** use `dangerouslySetInnerHTML` with data that is not sanitized, or build HTML strings from user input.
- **Do not** rely on `vite build` for type safety: `tsc --noEmit` runs first in `build`.
- **Do not** disable `react-hooks/exhaustive-deps`, or use an array index as a `key` on a list that changes.
- **Do not** make a clickable `div` or `span`; use `button` or `a`.
- **Do not** hardcode a version number in this file's dependency list, in generated docs, or in a recommendation: versions are pinned at generation.
- **Do not** let a webview component call the host transport directly or accept a message without validating it.
- **Do not** use the npm, npx, or pnpm command-line tools: `yarn` only (`yarn add`, `yarn dlx`, `yarn run`).

## Integrity verification

Detailed in `@rules/verification.md`. Key points: the UI dependencies are present without version numbers in this guide and pinned in `package.json` at generation; `vite.config.ts` uses `@vitejs/plugin-react` and `build` runs `tsc --noEmit` before `vite build`; `tsconfig` has `strict: true`, `jsx: "react-jsx"`, the DOM lib only for browser code; `src/main.tsx` is the only place that builds services and installs the global listeners; `services/` has no `react`, `react-dom`, `window`, or `document` import; components contain no business logic and no `fetch`; every screen handles loading, empty, error, and ready states from Phase 3; no `VITE_*` variable holds a secret; no `any`, no `@ts-ignore`, no `console.log` in `src/`; accessibility basics hold (semantic elements, labels, keyboard path, `lang`); tests, when enabled, use `jsdom` and `@testing-library/react` with the cleanup in `test/setup.ts`; for a webview, `src/protocol.ts` exists, its messages are typed, every incoming message goes through a validator from `unknown`.
