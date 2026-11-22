// Role: prepare or apply a SemVer release from the [Unreleased] changelog section.
// Inputs: <root> [major|minor|patch|X.Y.Z] [--date YYYY-MM-DD]
//   Without an increment: read-only, prints the inferred increment and the three candidate versions (JSON).
//   With an increment: runs "yarn version NEW --immediate" (updates package.json, the only version to write),
//   freezes [Unreleased] into a dated block in docs/release/CHANGELOG.md and updates the README title line.
//   The publication step of /yarn-release is never run by this script.
// Outputs: stdout = release block (or inference JSON); stderr = modified files.
// Exit codes: 0 ok, 2 changelog missing or version unreadable, 3 nothing to release, 4 invalid argument,
//   5 "yarn version" failed (nothing else is written).
// Command replaced: /yarn-release, steps 1 to 4 (choosing the increment stays with the model).
// Example: node .claude/scripts/bump-release.mjs C:\projects\my-project minor

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const dateIdx = args.indexOf("--date");
const date = dateIdx >= 0 ? args.splice(dateIdx, 2)[1] : new Date().toLocaleDateString("sv-SE");
const [root, choice] = args;
if (!root || (choice && !/^(major|minor|patch|\d+\.\d+\.\d+)$/.test(choice)) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("Usage: bump-release.mjs <root> [major|minor|patch|X.Y.Z] [--date YYYY-MM-DD]");
  process.exit(4);
}

const read = (p) => readFileSync(p, "utf8");
const pathChangelog = join(root, "docs", "release", "CHANGELOG.md");
const pathPackage = join(root, "package.json");
const pathReadme = join(root, "README.md");

if (!existsSync(pathChangelog)) {
  console.error("CHANGELOG.md is missing: route to /yarn-load-project.");
  process.exit(2);
}
const changelog = read(pathChangelog);
const eol = changelog.includes("\r\n") ? "\r\n" : "\n";
const lines = changelog.split(/\r?\n/);
const start = lines.findIndex((l) => /^## \[Unreleased\]/i.test(l));
if (start < 0) {
  console.error("[Unreleased] section not found.");
  process.exit(2);
}
let end = lines.findIndex((l, i) => i > start && /^## \[/.test(l));
if (end < 0) end = lines.length;
const body = lines.slice(start + 1, end);
if (!body.some((l) => /^\s*[-*] /.test(l))) {
  console.error("Nothing to release: [Unreleased] is empty.");
  process.exit(3);
}

const sections = {};
let current = "";
for (const l of body) {
  const m = l.match(/^### (\w+)/);
  if (m) current = m[1];
  else if (current && /^\s*[-*] /.test(l)) sections[current] = (sections[current] ?? 0) + 1;
}
const breaking = body.some((l) => l.includes("**BREAKING:**"));
const inferred = breaking || sections.Removed ? "major" : sections.Added ? "minor" : "patch";

const cur = read(pathPackage).match(/"version"\s*:\s*"(\d+)\.(\d+)\.(\d+)"/);
if (!cur) {
  console.error("Version not readable in package.json.");
  process.exit(2);
}
const [x, y, z] = cur.slice(1).map(Number);
const candidates = { major: `${x + 1}.0.0`, minor: `${x}.${y + 1}.0`, patch: `${x}.${y}.${z + 1}` };

if (!choice) {
  console.log(JSON.stringify({ current: `${x}.${y}.${z}`, inferred, candidates, entries: sections }, null, 2));
  process.exit(0);
}

const next = candidates[choice] ?? choice;

// The canonical version is bumped by Yarn itself. A failure here aborts before any other write.
const bump = spawnSync(`yarn version ${next} --immediate`, { cwd: root, encoding: "utf8", shell: true });
if (bump.status !== 0) {
  console.error(`"yarn version ${next} --immediate" failed (code ${bump.status}). Nothing else was written.`);
  console.error(`${bump.stdout ?? ""}${bump.stderr ?? ""}`.trim().split(/\r?\n/).slice(-10).join("\n"));
  process.exit(5);
}

const block = body.join(eol).replace(/^(\r?\n)+|(\r?\n)+$/g, "");
const released = [`## [${next}] - ${date}`, block].join(eol);
const newLines = [...lines.slice(0, start), "## [Unreleased]", "", ...released.split(eol), "", ...lines.slice(end)];
writeFileSync(pathChangelog, newLines.join(eol));
const done = ["package.json (yarn version)", "docs/release/CHANGELOG.md"];

if (existsSync(pathReadme)) {
  const readme = read(pathReadme);
  writeFileSync(pathReadme, readme.replace(/^(# .+? [\u2014-] v)\d+\.\d+\.\d+/m, `$1${next}`));
  done.push("README.md");
}
console.error(`Version ${x}.${y}.${z} -> ${next}. Modified files: ${done.join(", ")}`);
console.log(released);
