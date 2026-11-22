// Role: run the executable verification ladder (verification.md section A) and the smoke of the use case.
// Inputs: <root> [--use-case cli|library|service|extension|application] [--health-url <url>] [--immutable]
//   Commands: yarn install (yarn install --immutable with --immutable), yarn typecheck, yarn lint, yarn build,
//   yarn test (only if package.json declares a "test" script), then the smoke of the use case:
//     cli          node dist/cli.js --help, node dist/cli.js --version
//     library      the built entry imports and exposes its public API
//     service      start node dist/server.js, query --health-url, stop it (needs --health-url)
//     extension    dist/extension.cjs exists and its only non built-in require is "vscode"
//     application  dist/index.html exists
//   Without --use-case it is inferred from package.json and the source tree and the choice is printed.
//   Stops at the first failing step.
// Outputs: stdout = step / status / duration table, then the first error lines of the failure.
// Exit codes: 0 all green, 1 a step failed, 4 invalid argument.
// Not covered: smoke of real sf operations (needs an authenticated org), loading an extension in its host.
// Command replaced: /yarn-run-tests, step 1 (interpreting a failure stays with the model).
// Example: node .claude/scripts/run-verification.mjs C:\projects\my-project --use-case cli

import { spawn, spawnSync } from "node:child_process";
import { builtinModules } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : "";
};
const useCaseArg = opt("--use-case");
const healthUrl = opt("--health-url");
const immutable = args.includes("--immutable") ? (args.splice(args.indexOf("--immutable"), 1), true) : false;
const root = args[0];
const useCases = ["cli", "library", "service", "extension", "application"];
if (!root || !existsSync(join(root, "package.json")) || (useCaseArg && !useCases.includes(useCaseArg))) {
  console.error("Usage: run-verification.mjs <root> [--use-case cli|library|service|extension|application] [--health-url <url>] [--immutable]");
  process.exit(4);
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
function infer() {
  if (pkg.engines?.vscode || pkg.contributes) return "extension";
  if (existsSync(join(root, "index.html")) && existsSync(join(root, "vite.config.ts"))) return "application";
  if (pkg.bin || existsSync(join(root, "src", "cli.ts"))) return "cli";
  if (existsSync(join(root, "src", "server.ts"))) return "service";
  return "library";
}
const useCase = useCaseArg || infer();
console.log(`Use case: ${useCase}${useCaseArg ? "" : " (inferred)"}`);

const yarnSteps = [
  { label: immutable ? "yarn install --immutable" : "yarn install", cmd: immutable ? "yarn install --immutable" : "yarn install" },
  { label: "yarn typecheck", cmd: "yarn typecheck" },
  { label: "yarn lint", cmd: "yarn lint" },
  { label: "yarn build", cmd: "yarn build" },
];
if (pkg.scripts?.test) yarnSteps.push({ label: "yarn test", cmd: "yarn test" });

const steps = yarnSteps.map((s) => ({ ...s, run: () => shell(s.cmd) }));
function shell(cmd) {
  const r = spawnSync(cmd, { cwd: root, encoding: "utf8", shell: true, timeout: 15 * 60 * 1000, maxBuffer: 64 * 1024 * 1024 });
  return { ok: r.status === 0, output: `${r.stdout ?? ""}\n${r.stderr ?? ""}`.trim(), code: r.status ?? r.signal ?? "?" };
}
function node(argv) {
  const r = spawnSync(process.execPath, argv, { cwd: root, encoding: "utf8", timeout: 60 * 1000 });
  return { ok: r.status === 0, output: `${r.stdout ?? ""}\n${r.stderr ?? ""}`.trim(), code: r.status ?? r.signal ?? "?" };
}
function check(ok, message) {
  return { ok, output: ok ? "" : message, code: ok ? 0 : 1 };
}

if (useCase === "cli") {
  steps.push({ label: "node dist/cli.js --help", run: () => node(["dist/cli.js", "--help"]) });
  steps.push({ label: "node dist/cli.js --version", run: () => node(["dist/cli.js", "--version"]) });
} else if (useCase === "library") {
  steps.push({
    label: "built entry imports",
    run: () => node(["--input-type=module", "-e", "import('./dist/index.js').then((m) => console.log(Object.keys(m)))"]),
  });
} else if (useCase === "application") {
  steps.push({ label: "dist/index.html present", run: () => check(existsSync(join(root, "dist", "index.html")), "dist/index.html is missing") });
} else if (useCase === "extension") {
  steps.push({
    label: "extension bundle check",
    run: () => {
      const file = join(root, "dist", "extension.cjs");
      if (!existsSync(file)) return check(false, "dist/extension.cjs is missing");
      const bad = [...readFileSync(file, "utf8").matchAll(/require\(\s*["']([^"']+)["']\s*\)/g)]
        .map((m) => m[1])
        .filter((n) => n !== "vscode" && !n.startsWith(".") && !builtinModules.includes(n.replace(/^node:/, "")));
      return check(bad.length === 0, `non built-in require(s) besides "vscode": ${[...new Set(bad)].join(", ")}`);
    },
  });
} else if (useCase === "service") {
  steps.push({ label: "service health check", run: () => serviceSmoke() });
}

async function serviceSmoke() {
  if (!healthUrl) return check(false, "service smoke needs --health-url <url>");
  const child = spawn(process.execPath, ["dist/server.js"], { cwd: root, stdio: "ignore" });
  try {
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        const res = await fetch(healthUrl);
        return check(res.ok, `health endpoint answered ${res.status}`);
      } catch {
        /* not up yet */
      }
    }
    return check(false, "the service did not answer within 10 s");
  } finally {
    child.kill();
  }
}

const rows = [];
let failure = null;
for (const s of steps) {
  if (failure) {
    rows.push([s.label, "not run", "-"]);
    continue;
  }
  const t0 = Date.now();
  const r = await s.run();
  const secs = ((Date.now() - t0) / 1000).toFixed(1) + " s";
  if (r.ok) rows.push([s.label, "OK", secs]);
  else {
    rows.push([s.label, `FAILED (code ${r.code})`, secs]);
    failure = { label: s.label, output: r.output };
  }
}

console.log("| Step | Status | Duration |\n|---|---|---|");
for (const r of rows) console.log(`| ${r.join(" | ")} |`);
if (failure) {
  const errs = failure.output.split(/\r?\n/).filter((l) => /error|failed|YN\d{4}/i.test(l)).slice(0, 15);
  console.log(`\nFirst errors from "${failure.label}":`);
  console.log((errs.length ? errs : failure.output.split(/\r?\n/).slice(-15)).join("\n"));
  process.exit(1);
}
