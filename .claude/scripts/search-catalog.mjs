// Role: look up an `sf` or `yarn` command and its flags in the local catalogs and return only the useful entry
//   (file, line, excerpt), or "absent".
//   sf   : .claude/salesforce-cli-reference/cli_reference_<topic>.md, one "## `sf <command>`" section per command.
//   yarn : .claude/yarn-berry-cli-reference/yarn-<command>.md, one file per command (grouped commands such as
//          "config" or "npm stage" share a file; the longest matching file name wins).
// Inputs: "<sf|yarn> <command words>" [--flags a,b,c]   (e.g. "sf data query" --flags target-org,query)
// Outputs: stdout = file:line, entry excerpt (at most 60 lines), status of each requested flag; or "absent" with
//   nearby commands.
// Exit codes: 0 command and flags found, 1 command or flag absent, 4 invalid argument.
// Command replaced: manual catalog reading by /yarn-add-feature, /yarn-p4-architect and /yarn-fix-issue.
// Example: node .claude/scripts/search-catalog.mjs "yarn add" --flags dev,exact

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const fi = argv.indexOf("--flags");
const flags = fi >= 0 ? (argv.splice(fi, 2)[1] ?? "").split(",").map((f) => f.trim().replace(/^-+/, "")).filter(Boolean) : [];
const words = (argv[0] ?? "").trim().split(/\s+/).filter(Boolean);
const tool = words.shift();
if (!["sf", "yarn"].includes(tool) || words.length === 0) {
  console.error('Usage: search-catalog.mjs "<sf|yarn> <command words>" [--flags a,b,c]');
  process.exit(4);
}

const claudeDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_LINES = 60;
let hit = null;
let near = [];

if (tool === "sf") {
  const dir = join(claudeDir, "salesforce-cli-reference");
  const wanted = `sf ${words.join(" ")}`;
  const all = [];
  for (const file of readdirSync(dir).filter((f) => /^cli_reference_.*\.md$/.test(f))) {
    const lines = readFileSync(join(dir, file), "utf8").split(/\r?\n/);
    lines.forEach((l, i) => {
      const m = l.match(/^## `(sf [^`]+)`/);
      if (!m) return;
      let j = i + 1;
      while (j < lines.length && !/^## /.test(lines[j])) j++;
      all.push({ name: m[1].trim(), file, line: i + 1, text: lines.slice(i, j).join("\n").trim() });
    });
  }
  hit = all.find((e) => e.name === wanted) ?? null;
  near = all.filter((e) => e.name.startsWith(`sf ${words[0]} `)).map((e) => e.name);
} else {
  const dir = join(claudeDir, "yarn-berry-cli-reference");
  const files = readdirSync(dir).filter((f) => f.startsWith("yarn-") && f.endsWith(".md") && f !== "yarn-index.md");
  for (let n = words.length; n >= 1 && !hit; n--) {
    const file = `yarn-${words.slice(0, n).join("-")}.md`;
    if (files.includes(file)) {
      const text = readFileSync(join(dir, file), "utf8");
      // Keep the title, usage and options: cut at the first section that follows "## Options".
      const optionsAt = text.search(/^## Options/m);
      const after = optionsAt >= 0 ? text.slice(optionsAt + 1).search(/^## /m) : -1;
      const cut = after >= 0 ? optionsAt + 1 + after : -1;
      hit = { name: `yarn ${words.slice(0, n).join(" ")}`, file: `yarn-berry-cli-reference/${file}`, line: 1, text: (cut > 0 ? text.slice(0, cut) : text).trim() };
    }
  }
  near = files.filter((f) => f.startsWith(`yarn-${words[0]}`)).map((f) => f.replace(/\.md$/, "").replace(/-/g, " "));
}

if (!hit) {
  console.log(`absent: "${tool} ${words.join(" ")}"`);
  if (near.length) console.log(`Nearby: ${near.slice(0, 15).join(" | ")}`);
  process.exit(1);
}

const excerpt = hit.text.split("\n");
console.log(`${hit.file}:${hit.line}`);
console.log(excerpt.slice(0, MAX_LINES).join("\n"));
if (excerpt.length > MAX_LINES) console.log(`... (${excerpt.length - MAX_LINES} more lines in the file)`);
let missing = 0;
for (const f of flags) {
  const re = new RegExp(`(?<![\\w-])${f.length === 1 ? "-" : "--"}${f}(?![\\w-])`);
  const found = re.test(hit.text);
  console.log(`flag ${f}: ${found ? "present" : "absent"}`);
  if (!found) missing++;
}
process.exit(missing ? 1 : 0);
