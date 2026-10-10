# Automated tests rules - Node / TypeScript (Yarn Berry)

## Activation

Conditional - enabled if Phase 1 tests = `Yes`.

If enabled:
- Test setup mandatory in the architectural contract (Phase 4).
- Dedicated extra batch in Phase 5 (Small: 4 batches · Medium/Large: 5 batches - `## CALIBRATION` in `CLAUDE.md`).
- Dev dependency added: `vitest` (plus the UI test dependencies below for a project with UI).

If disabled:
- No test files, no extra batch. Batch count unchanged (Small: 3 · Medium/Large: 4). `/yarn-run-tests` never scaffolds a suite unasked.

---

## Non-negotiable stack

- `vitest ^5.0.3` (unit + integration; native mocking via `vi`) - no other test framework. Fallback `^4.1.11` if a pattern below breaks on 5 (see the `vitest` note in `@rules/config.md`). Re-confirm the current minor at generation, same maintenance note as `@rules/config.md`.
- Default **`node`** test environment (vitest's default) for the **CLI, library, and service** use cases - no `@testing-library`, no `jsdom` (headless: there is no DOM to render). Never set `jsdom` for these use cases.

`package.json` scripts: `"test": "vitest run"` (+ `"test:watch": "vitest"`). Run with `yarn test` / `yarn test:watch` (`yarn-berry-cli-reference/yarn-run.md`).
`vitest.config.ts` is **optional**: the `node` environment is the default, and Vite's resolver already handles TS/ESM extensionless imports under the `moduleResolution: "bundler"` tsconfig. Add a config only to set `test.include` or coverage.

### Project with UI (application, extension webview)

> Applies only to a project with UI (`@rules/ui.md`). The `node` default above stays the rule for every non-UI use case.

- Environment **`jsdom`** (the browser DOM is rendered) + **`@testing-library/react`** for components. Dev dependencies: `jsdom`, `@testing-library/react`. Pin the current minor at generation, confirm with `yarn npm info <package>` (`yarn-berry-cli-reference/yarn-npm-info.md`).
- The vitest config lives in the **Vite config** (`vite.config.ts`, `test` block set through `defineConfig` imported from `vitest/config`), so tests share the aliases and the React plugin with the build: `test: { environment: "jsdom" }`. No second config file.
- Test file layout **mirrors `src/`** like everywhere else: `test/ui/components/Button.test.tsx` for `src/ui/components/Button.tsx`, `test/main.test.tsx` for `src/main.tsx`. Pure logic (services, config, types) of a UI project stays testable without rendering.
- Render with `render` from `@testing-library/react`, query by role/text (what the user sees), never by implementation detail. Call `cleanup` in `afterEach`.
- Still `vitest` only: no second test framework.

---

## What to test, per layer

| Layer | Target | What to test |
| ----- | ------ | ------------ |
| `src/*` pure (`types.ts` guards, `config.ts` `resolveConfig`) | Logic | the precedence cascade (`defaults < .env < flags`); the validators / type guards |
| `src/index.ts` (library) | Public API | the exported surface: imports only from the entry point, asserts the exported names and the documented behavior of each (see "Library test pattern") |
| `src/output/*` (CLI) | Formatters | the shape of each **shipped** format (`json` / `table`, plus `csv` / `xlsx` when selected) from sample rows, **including an empty dataset** (json `[]`, table `(0 rows)`, csv header-only or empty, xlsx placeholder sheet - success, no error); for `xlsx` (when shipped), write to a temp file then re-read it with `exceljs` and assert the header row, a data cell, and a set column width (native table + autofit) |
| `src/progress.ts` (CLI) | Reporter (disabled path) | tests are **not a TTY**, so `configureProgress` is never enabled: `step().succeed()` (and `bar().done()` when `bar` ships) maps to a `log` line and **write nothing to `stdout`** - spy on `log`/`process.stdout.write` and assert no progress content reaches `stdout`. Do **not** assert on animation frames |
| `src/sf/runner.ts` (when Salesforce is confirmed) | Parsing + length handling | **mock `cross-spawn`**: the args array passed ends with `--json`; envelope `status !== 0` → `Result` error (`kind: "error"`); `ENOENT` → `Result` error with a clear "sf not found" message; unparseable output → `Result` error. With a small injected `cmdLineBudget`: an over-budget `run()` returns a clear "command line too long" error **without spawning**, and `runWithLargeArg` **spills** the value to a temp `--file` (mock `node:fs/promises`) instead of inline `--query` |
| `src/sf/helpers.ts` (when Salesforce is confirmed) | Envelope mapping | inject a **fake `SfRunner`**: the args array a helper builds (user values discrete); the `sf` envelope mapped to the DTO (e.g. `nonScratchOrgs` + `scratchOrgs` merged into `OrgInfo[]`) |
| `src/sf/project.ts` (Salesforce confirmed + `sfdx-project` mode) | sfdx-project | **mock the fs read** of `sfdx-project.json`: valid → parsed; missing / invalid → `Result` error |
| `src/services/*` | Business logic | inject **fake dependencies** (a fake `SfHelpers` when Salesforce is confirmed, any injected port otherwise); assert the business rule + `Result` flow (a dataset command returns `{ ok: true, data: [] }` on empty - success with an empty list, never a warning; a dependency failure propagated unmasked) |
| `src/commands/*` (CLI) | Wiring | invalid flags rejected (the exit-2 usage path, including an unknown `--format` and `xlsx` without a file destination when `xlsx` ships); success maps to the right formatter; the service is mocked |
| `src/server.ts` handlers (service) | Handler | call the handler with injected dependencies (see "Service test pattern"): input validated, the service called, the response mapped; no real port, no real network |
| `src/ui/components/*` (UI) | Components | rendered with `@testing-library/react` under `jsdom`: what the user sees and the interactions (click, input), services mocked |

`Result<T>` and the named errors are owned by `@rules/architecture.md` / `@rules/errors.md` (`src/types.ts` + `src/errors.ts`) - the patterns below assume that shape.

---

## Conventions

- File naming: `[module].test.ts` (`.test.tsx` for a React component) under `test/`, **mirroring `src/`** (`test/sf/runner.test.ts`, `test/services/org.service.test.ts`, `test/output/json.test.ts`, `test/config.test.ts`).
- Test names: explicit French behavior - **always French**, independent of the user's interface language - e.g. `rejette_un_alias_vide`, `mappe_un_status_non_zero_en_erreur`.
- No `expect(true).toBe(true)`, no empty test, no `it.skip` left behind, no `any` in test code without justification.
- **No real network, no real `sf`, no real org, no real filesystem** - mock `cross-spawn` (runner) and the fs read (`project.ts`) with `vi.mock`. A test must never spawn a `sf` process.
- No arbitrary `setTimeout` waits - `await` the operation, or drive the mocked child's events synchronously (below).

---

## Runner test pattern (when Salesforce is confirmed, mandatory)

> Applies only when Salesforce coupling is confirmed in Phase 1 (`@rules/sf-cli.md`).

Mock `cross-spawn`; drive a fake child (an `EventEmitter` with `stdout` / `stderr` sub-emitters) to exercise each parse branch. No process is spawned.

```ts
import { EventEmitter } from "node:events";
import { describe, it, expect, vi, beforeEach } from "vitest";
import spawn from "cross-spawn";
import { SfRunner } from "../../src/sf/runner";

vi.mock("cross-spawn");

/** Fake child process: no real spawn, events driven by the test. */
function fakeChild() {
  const child = new EventEmitter() as EventEmitter & { stdout: EventEmitter; stderr: EventEmitter };
  child.stdout = new EventEmitter();
  child.stderr = new EventEmitter();
  return child;
}

describe("sf/runner", () => {
  beforeEach(() => vi.mocked(spawn).mockReset());

  it("passe un tableau d'arguments terminé par --json", async () => {
    const child = fakeChild();
    vi.mocked(spawn).mockReturnValue(child as never);
    const p = new SfRunner(() => "sf").run(["org", "list"]);
    child.stdout.emit("data", JSON.stringify({ status: 0, result: [] }));
    child.emit("close", 0);
    const res = await p;
    expect(res.ok).toBe(true);
    expect(spawn).toHaveBeenCalledWith("sf", ["org", "list", "--json"]);
  });

  it("mappe un status non zero en erreur", async () => {
    const child = fakeChild();
    vi.mocked(spawn).mockReturnValue(child as never);
    const p = new SfRunner(() => "sf").run(["data", "query", "--query", "SELECT Id FROM Account"]);
    child.stdout.emit("data", JSON.stringify({ status: 1, name: "InvalidQuery", message: "MALFORMED" }));
    child.emit("close", 1);
    const res = await p;
    expect(res.ok).toBe(false);
    // the runner returns a plain Result error (kind/message), not a named-error instance
    if (!res.ok) { expect(res.error.kind).toBe("error"); expect(res.error.message).toBe("MALFORMED"); }
  });

  it("mappe un ENOENT en SfCliNotFoundError", async () => {
    const child = fakeChild();
    vi.mocked(spawn).mockReturnValue(child as never);
    const p = new SfRunner(() => "sf").run(["org", "list"]);
    const enoent: NodeJS.ErrnoException = new Error("spawn sf ENOENT");
    enoent.code = "ENOENT";
    child.emit("error", enoent);
    const res = await p;
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error.message).toMatch(/introuvable|not found/i); // ENOENT → clear "sf not found" Result error
  });

  it("mappe une sortie illisible en erreur", async () => {
    const child = fakeChild();
    vi.mocked(spawn).mockReturnValue(child as never);
    const p = new SfRunner(() => "sf").run(["org", "list"]);
    child.stdout.emit("data", "not json");
    child.emit("close", 0);
    expect((await p).ok).toBe(false);
  });

  it("garde une commande trop longue sans lancer sf", async () => {
    // small injected budget forces the guard; the platform default (win32 6000 / else 100000) is not needed for the test
    const res = await new SfRunner(() => "sf", 50).run(["data", "query", "--query", "SELECT " + "Id,".repeat(50)]);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error.message).toMatch(/trop longue|too long/i);
    expect(spawn).not.toHaveBeenCalled();   // the guard returns before spawning
  });
});
```

For the spill path, add `vi.mock("node:fs/promises", () => ({ mkdtemp: vi.fn(async () => "/tmp/yarn-x"), writeFile: vi.fn(async () => {}), rm: vi.fn(async () => {}) }))` at file top, then:

```ts
it("bascule une SOQL trop longue sur --file (fichier temporaire)", async () => {
  const child = fakeChild();
  vi.mocked(spawn).mockReturnValue(child as never);
  const runner = new SfRunner(() => "sf", 50);   // tiny budget → force the spill
  const p = runner.runWithLargeArg(["data", "query"],
    { inlineFlag: "--query", fileFlag: "--file", value: "SELECT " + "Id,".repeat(50), ext: ".soql" });
  child.stdout.emit("data", JSON.stringify({ status: 0, result: { records: [] } }));
  child.emit("close", 0);
  await p;
  const passed = vi.mocked(spawn).mock.calls[0][1] as string[];
  expect(passed).toContain("--file");     // spilled to a file, not inline --query
  expect(passed).not.toContain("--query");
});
```

## Helpers test pattern (when Salesforce is confirmed, fake runner)

> Applies only when Salesforce coupling is confirmed in Phase 1.

Inject a **fake `SfRunner`**: assert the args array a helper builds and how it maps the `sf` envelope to the DTO. No `cross-spawn`, no process.

```ts
import { describe, it, expect } from "vitest";
import type { SfRunner } from "../../src/sf/runner";
import { SfHelpers } from "../../src/sf/helpers";

/** Fake runner: records the args it received, returns a canned envelope result. */
function fakeRunner(data: unknown, calls: string[][] = []): SfRunner {
  return { run: async (args: string[]) => { calls.push(args); return { ok: true, data }; } } as unknown as SfRunner;
}

describe("sf/helpers", () => {
  it("fusionne nonScratchOrgs et scratchOrgs en une seule liste", async () => {
    const helpers = new SfHelpers(fakeRunner({ nonScratchOrgs: [{ username: "a@b.c" }], scratchOrgs: [{ username: "s@b.c" }] }));
    const res = await helpers.listOrgs();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data).toHaveLength(2);
  });

  it("passe la SOQL comme un seul élément d'argv", async () => {
    const calls: string[][] = [];
    await new SfHelpers(fakeRunner({ records: [] }, calls)).query("SELECT Id FROM Account");
    expect(calls[0]).toEqual(["data", "query", "--query", "SELECT Id FROM Account"]);
  });
});
```

## Service test pattern (when Salesforce is confirmed, fake helpers)

> Applies only when Salesforce coupling is confirmed in Phase 1. Without Salesforce, the same pattern applies with whatever dependency the service receives (see "Service test pattern, handler with injected deps" below).

Inject a **fake `SfHelpers`**: the service owns the business rule, not the `sf` envelope. Assert the domain decision and that a helper failure propagates unmasked.

```ts
import { describe, it, expect } from "vitest";
import type { SfHelpers } from "../../src/sf/helpers";
import { OrgService } from "../../src/services/org.service";

/** Minimal fake helpers returning a canned Result - the service never spawns and never parses an envelope. */
function helpersReturning(res: Awaited<ReturnType<SfHelpers["listOrgs"]>>): SfHelpers {
  return { listOrgs: async () => res } as unknown as SfHelpers;
}

describe("services/org.service", () => {
  it("renvoie un succès avec une liste vide quand aucune org n'est authentifiée", async () => {
    const res = await new OrgService(helpersReturning({ ok: true, data: [] })).listOrgs();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data).toEqual([]); // empty dataset → success, not a warning - @rules/errors.md
  });

  it("propage une erreur du helper sans la masquer", async () => {
    const res = await new OrgService(helpersReturning({ ok: false, error: { kind: "error", message: "échec" } })).listOrgs();
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error.kind).toBe("error");
  });

  it("mappe la liste des orgs renvoyée par le helper", async () => {
    const res = await new OrgService(helpersReturning({ ok: true, data: [{ username: "a@b.c" }] })).listOrgs();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data).toHaveLength(1);
  });
});
```

## Library test pattern (public API)

> Applies to the library use case (`src/index.ts`).

Test the package as a consumer sees it: import **only from the entry point** (`../src/index`), never from an internal module. One test file per public export group, plus one test that pins the exported surface so an accidental removal or leak fails the suite.

```ts
import { describe, it, expect } from "vitest";
import * as api from "../src/index";

describe("index (API publique)", () => {
  it("expose exactement les exports documentés", () => {
    expect(Object.keys(api).sort()).toEqual(["parseThing", "ThingError"]);   // replace with the documented exports
  });

  it("renvoie une erreur nommée sur une entrée invalide", () => {
    expect(() => api.parseThing("")).toThrow(api.ThingError);
  });
});
```

## Service test pattern, handler with injected deps

> Applies to the service use case (`src/server.ts`).

The composition root builds the dependencies and passes them to the handler factory; the test passes **fakes** instead. The handler is called as a plain function: no listening port, no real network. Assert the validation, the service call, and the response mapping (status + body from the `Result`).

```ts
import { describe, it, expect, vi } from "vitest";
import { makeCreateThingHandler } from "../../src/handlers/create-thing";

describe("handlers/create-thing", () => {
  it("rejette un corps invalide sans appeler le service", async () => {
    const service = { create: vi.fn() };
    const res = await makeCreateThingHandler({ service })({ body: {} });
    expect(res.status).toBe(400);
    expect(service.create).not.toHaveBeenCalled();
  });

  it("mappe un Result en échec vers une réponse d'erreur", async () => {
    const service = { create: vi.fn(async () => ({ ok: false as const, error: { kind: "error" as const, message: "échec" } })) };
    const res = await makeCreateThingHandler({ service })({ body: { name: "x" } });
    expect(res.status).toBe(500);
  });
});
```

The handler signature, the factory name, and the status codes above are illustrative: use the ones fixed in the Phase 3 contract (`docs/specs/03-surfaces.md`). The framework used by `src/server.ts` is the one validated in Phase 1; the test stays framework-free by testing the handler function, not the HTTP stack.

---

## Anti-patterns - what NOT to do

- **Do not** write `expect(true).toBe(true)`, an empty test, or a left-over `it.skip`.
- **Do not** spawn the real `sf` CLI, reach an org, or hit the network (when Salesforce is confirmed: mock `cross-spawn` and the fs read).
- **Do not** read or write a real `sfdx-project.json` on disk - mock the fs read in `project.ts` tests.
- **Do not** use an arbitrary `setTimeout` wait - `await` the call or drive the fake child's events.
- **Do not** assert on `stdout` / `process.exit` from inside a service or runner test - the stream split and exit-code mapping are `cli.ts`'s job (CLI use case); test the returned `Result`, not the process.
- **Do not** add `@testing-library` / `jsdom` to a CLI, library, or service project, or a second framework: `vitest` only, `node` environment. `jsdom` + `@testing-library/react` are reserved for a project with UI.
- **Do not** listen on a real port in a service test: call the handler directly.
- **Do not** create a test suite when Phase 1 tests = No (`/yarn-run-tests` never scaffolds one unasked).

## Integrity verification

Detailed in `@rules/verification.md`. Key points (if enabled): `test/` mirrors `src/`, vitest only (`node` environment for CLI / library / service, `jsdom` + `@testing-library/react` only for a project with UI, configured in the Vite config; no second framework); no real network, `sf` process, org, or filesystem: `cross-spawn` and fs reads mocked, a test never spawns `sf`; test names in explicit French; when Salesforce is confirmed, runner tests cover the `--json` args array, non-zero status, `ENOENT`, unparseable output, and the length-guard / temp-file spill paths; services and helpers tested with injected fakes (`Result` flow asserted, not `stdout`/`process.exit`); library tests import only from `src/index.ts`; service tests call handlers directly with injected dependencies; `yarn test` exits 0 as part of the blocking chain; no suite scaffolded when Phase 1 tests = No. Run silently; report only on a discrepancy.
