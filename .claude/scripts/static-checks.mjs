// Role: static integrity checks of verification.md section B by pattern search, instead of model reading.
// Inputs: <root> (root of the generated Yarn Berry project)
// Outputs: stdout = one "[point] file:line: message" line per finding, then a total; "OK" if none.
//   Points: 3/4 spawn outside src/sf/runner.ts (when src/sf/ exists), process.exit outside src/cli.ts (when it exists),
//   console.log, TODO · 8 Yarn Berry rules: npm/npx/pnpm in scripts, package-lock.json, packageManager,
//   "type": "module", nodeLinker, yarn.lock, tracked .yarn/cache · 14 versions (package.json vs changelog) ·
//   15 .gitignore · 16 .prettierignore.
// Exit codes: 0 no finding, 1 at least one finding, 4 invalid argument.
// Documented exceptions stay to be judged by the model.
// Command replaced: /yarn-p5-development, /yarn-add-feature, /yarn-fix-issue, section B.
// Example: node .claude/scripts/static-checks.mjs C:\projects\my-project

import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2];
if (!root || !existsSync(root)) {
  console.error("Usage: static-checks.mjs <root>");
  process.exit(4);
}

const findings = [];
const add = (point, file, line, msg) => findings.push(`[${point}] ${file}${line ? ":" + line : ""}: ${msg}`);
const rel = (f) => relative(root, f).split("\\").join("/");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    if (["node_modules", "dist", ".git", ".yarn"].includes(e)) continue;
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const hasSf = existsSync(join(root, "src", "sf"));
const hasCli = existsSync(join(root, "src", "cli.ts"));
const files = walk(join(root, "src")).filter((f) => /\.(ts|tsx|js|mjs)$/.test(f));
const rules = [
  { point: "4", re: /\/\/\s*TODO/, msg: "// TODO is forbidden" },
  { point: "4", re: /\bconsole\.log\s*\(/, msg: "console.log is forbidden, use the logger" },
  {
    point: "3",
    re: /from\s+["'](node:)?child_process["']|from\s+["']cross-spawn["']|require\(\s*["'](node:)?child_process["']\s*\)/,
    msg: "process spawn outside src/sf/runner.ts",
    only: (f) => hasSf && rel(f) !== "src/sf/runner.ts",
  },
  { point: "3", re: /shell\s*:\s*true/, msg: "shell: true is forbidden" },
  { point: "3", re: /\bprocess\.exit\s*\(/, msg: "process.exit outside src/cli.ts", only: (f) => hasCli && rel(f) !== "src/cli.ts" },
];
for (const f of files) {
  const lines = readFileSync(f, "utf8").split(/\r?\n/);
  for (const r of rules) {
    if (r.only && !r.only(f)) continue;
    lines.forEach((l, i) => {
      if (r.re.test(l)) add(r.point, rel(f), i + 1, r.msg);
    });
  }
}

// Point 8: Yarn Berry rules
let pkg = {};
try {
  pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
} catch {
  add("8", "package.json", 0, "package.json is unreadable");
}
for (const [name, cmd] of Object.entries(pkg.scripts ?? {}))
  if (/(^|[\s;&|])(npm|npx|pnpm)\b/.test(String(cmd))) add("8", "package.json", 0, `script "${name}" uses npm/npx/pnpm: ${cmd}`);
if (!/^yarn@4\./.test(pkg.packageManager ?? "")) add("8", "package.json", 0, 'packageManager must be "yarn@4.x"');
if (pkg.type !== "module") add("8", "package.json", 0, '"type": "module" is missing');
for (const f of ["package-lock.json", "npm-shrinkwrap.json"]) if (existsSync(join(root, f))) add("8", f, 0, "npm artifact must not exist");
if (!existsSync(join(root, "yarn.lock"))) add("8", "yarn.lock", 0, "file is missing");
const rc = join(root, ".yarnrc.yml");
if (!existsSync(rc) || !/nodeLinker:\s*node-modules/.test(readFileSync(rc, "utf8"))) add("8", ".yarnrc.yml", 0, "nodeLinker: node-modules is missing");
if (existsSync(join(root, ".git"))) {
  const g = spawnSync("git", ["ls-files", ".yarn/cache"], { cwd: root, encoding: "utf8" });
  if ((g.stdout ?? "").trim()) add("8", ".yarn/cache", 0, ".yarn/cache is tracked by git");
}

// Point 14: package.json version must equal the top released changelog version
const top = existsSync(join(root, "docs/release/CHANGELOG.md"))
  ? readFileSync(join(root, "docs/release/CHANGELOG.md"), "utf8").match(/^## \[(\d+\.\d+\.\d+)\]/m)?.[1]
  : undefined;
if (!top || top !== pkg.version) add("14", "(versions)", 0, `package.json version ${pkg.version} vs changelog top ${top}`);

// Point 15: .gitignore
const gi = join(root, ".gitignore");
if (!existsSync(gi)) add("15", ".gitignore", 0, "file is missing");
else {
  const set = new Set(readFileSync(gi, "utf8").split(/\r?\n/).map((l) => l.trim()));
  for (const need of [".yarn/*", "!.yarn/patches", "!.yarn/plugins", "!.yarn/releases", "!.yarn/sdks", "!.yarn/versions", ".pnp.*", "node_modules/", "/dist/", ".env", "tasks/", ".claude/settings.local.json", ".claude/agent-memory/"])
    if (!set.has(need)) add("15", ".gitignore", 0, `missing entry: ${need}`);
  for (const bad of ["yarn.lock", ".yarnrc.yml", ".prettierignore", "docs/release/CHANGELOG.md", ".claude/settings.json", "CLAUDE.md"])
    if (set.has(bad)) add("15", ".gitignore", 0, `must not ignore: ${bad}`);
}

// Point 16: .prettierignore
const pi = join(root, ".prettierignore");
if (!existsSync(pi)) add("16", ".prettierignore", 0, "file is missing");
else {
  const set = new Set(readFileSync(pi, "utf8").split(/\r?\n/).map((l) => l.trim()));
  for (const need of [".yarn", "yarn.lock", "dist"]) if (!set.has(need)) add("16", ".prettierignore", 0, `missing entry: ${need}`);
}

console.log(findings.length ? `${findings.join("\n")}\n\n${findings.length} finding(s).` : "OK: no finding.");
process.exit(findings.length ? 1 : 0);
