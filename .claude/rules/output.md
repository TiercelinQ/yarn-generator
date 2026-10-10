# Output formatters - yarn CLI tool

> **Applies only to the CLI use case** (entry point `src/cli.ts`, fixed in Phase 1). For a library, service, extension or application, this file is not loaded.
> Every user-facing dataset goes through the **`output/` layer** - one dispatch, `formatOutput(rows, { format, destination })`, with `format: "json" | "table"` (plus `"csv"` / `"xlsx"` when selected in Phase 1) and `destination: { kind: "stdout" } | { kind: "file"; path: string }`. **No ad-hoc `console.log(JSON.stringify(...))` in a command.** A command gets typed rows from a service, then hands them to `formatOutput` - the only place a dataset is serialized.

The layering (`@rules/architecture.md`) is `commands` → `services` → `output` (plus the `sf` layer when Salesforce is confirmed in Phase 1). Services return data (`Result<T>`); **commands** format it through `output/`; **services never format**. Data goes to `stdout`, logs go to `stderr` (`@rules/cli.md`). Any progress feedback around a write (a `progress.step`, `@rules/progress.md`) is emitted by the **command** that brackets `formatOutput`, never by a formatter - `output/` stays pure and never writes to `stderr`.

## Files

| File | Role |
| ---- | ---- |
| `src/output/index.ts` | The dispatch `formatOutput(...)` + the shared output types. |
| `src/output/json.ts` | **Always ships.** Stable JSON (2-space) to stdout or a file. |
| `src/output/table.ts` | **Always ships.** Aligned console table for human reading - no dependency, a small manual column formatter. Honors a file destination. |
| `src/output/csv.ts` | **Only when `csv` is selected in the Phase 1 "Output formats" question.** CSV via `csv-stringify` (conditional dependency) - header from keys, streaming-friendly. |
| `src/output/xlsx.ts` | **Only when `xlsx` is selected in Phase 1.** xlsx via `exceljs` (conditional dependency) - a native Excel table (ListObject) with autofit columns. **Requires a file destination.** |

**Conditional formatters.** The Phase 1 selection decides which formatters ship, not only the default format. `index.ts` imports, types and dispatches **only the shipped formats**; an unknown format is a `ValidationError` (exit `2`, raised by the command's `parseFormat`), and the `--format` choices list only the shipped formats. The samples below show all four formats: drop the `csv` / `xlsx` imports, union members and `case`s that do not ship. A later `/yarn-add-feature` that adds a format adds its file **and** its dependency (`csv-stringify` / `exceljs`).

## Dispatch - `src/output/index.ts`

```ts
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import type { Result } from "../types";
import { toJson } from "./json";
import { toCsv } from "./csv";
import { toXlsx } from "./xlsx";
import { toTable } from "./table";

export type OutputFormat = "json" | "csv" | "xlsx" | "table";
export type OutputDestination = { kind: "stdout" } | { kind: "file"; path: string };
export interface OutputOptions { format: OutputFormat; destination: OutputDestination; }
export type Row = Record<string, unknown>;

/** Single entry point for every user-facing dataset. Returns Result - the command maps a failure to an exit code. */
export async function formatOutput(rows: Row[], opts: OutputOptions): Promise<Result<void>> {
  if (opts.destination.kind === "file") {                 // ALWAYS ensure the parent dir exists, whatever the format
    try {
      await mkdir(dirname(opts.destination.path), { recursive: true });
    } catch (e) {
      return { ok: false, error: { kind: "error", message: "Impossible de créer le répertoire de sortie.", detail: (e as Error).message } };
    }
  }
  switch (opts.format) {
    case "json":  return toJson(rows, opts.destination);
    case "csv":   return toCsv(rows, opts.destination);
    case "xlsx":  return toXlsx(rows, opts.destination);   // backstop: the command already refused a stdout destination (exit 2)
    case "table": return toTable(rows, opts.destination);
  }
}
```

The writers return `Result<void>` so a file write error (or the xlsx backstop guard below) becomes a `Result` error the command maps to `stderr` + a non-zero exit code (`@rules/errors.md`, `@rules/cli.md`) - never a thrown exception reaching the user.

**Empty dataset = success.** With no rows, every formatter still prints a **valid empty document** and the command exits `0`: json `[]`, table `(0 rows)`, csv header-only or empty, xlsx a placeholder sheet. `Result` `kind: "warning"` is not used for an empty list / query / export (`@rules/errors.md`); a human note ("No result.") may go to stderr.

**Always ensure the output directory exists before writing - for every file format.** A file destination whose parent directory is absent (e.g. the default `exports/` on a fresh checkout) fails with `ENOENT` otherwise. Create it **once, centrally, in `formatOutput`** (`mkdir(dirname(path), { recursive: true })`), never per-writer and never assuming the directory is already there. This covers `json` / `csv` / `xlsx` identically. The path is already **confined under `exportDir` by the command** (`resolveWithin`, `@rules/security.md §3`) before it reaches `formatOutput`; the formatter stays pure and never resolves a path itself (`@rules/cli.md`).

## JSON - `src/output/json.ts`

```ts
import { writeFile } from "node:fs/promises";
import type { Result } from "../types";
import type { OutputDestination, Row } from "./index";   // type-only import - erased, no runtime cycle

export async function toJson(rows: Row[], dest: OutputDestination): Promise<Result<void>> {
  const text = JSON.stringify(rows, null, 2) + "\n";   // 2-space; key order follows the source records
  try {
    if (dest.kind === "file") await writeFile(dest.path, text, "utf8");
    else process.stdout.write(text);                   // data → stdout (@rules/cli.md)
    return { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: { kind: "error", message: "Échec de l'écriture JSON.", detail: (e as Error).message } };
  }
}
```

## CSV - `src/output/csv.ts`

```ts
import { stringify } from "csv-stringify";
import { createWriteStream } from "node:fs";
import type { Result } from "../types";
import type { OutputDestination, Row } from "./index";

export function toCsv(rows: Row[], dest: OutputDestination): Promise<Result<void>> {
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];   // header from the first row's keys
  const stringifier = stringify({ header: true, columns });
  return new Promise((resolve) => {
    const ok = (): void => resolve({ ok: true, data: undefined });
    const fail = (e: Error): void => resolve({ ok: false, error: { kind: "error", message: "Échec de l'écriture CSV.", detail: e.message } });
    stringifier.on("error", fail);
    if (dest.kind === "file") {
      const file = createWriteStream(dest.path);
      file.on("error", fail).on("finish", ok);
      stringifier.pipe(file);                        // pipe ends the file stream
    } else {
      stringifier.pipe(process.stdout, { end: false });   // never close stdout
      stringifier.on("end", ok);
    }
    for (const row of rows) stringifier.write(row);   // streaming-friendly: the same stringifier accepts a row stream
    stringifier.end();
  });
}
```

## XLSX - `src/output/xlsx.ts`

The workbook renders the data as a **native Excel table** (a ListObject via `addTable`: header row, filter buttons, banded rows) and **autofits each column** to the longest of its header and its cell values (bounded by `MIN_WIDTH`..`MAX_WIDTH`). A binary workbook cannot go to stdout, so a **file destination is required**: the **command** validates this **before any work** (service call, write) and raises `ValidationError("xlsx requires a file destination (--output <file>).")` → exit `2` (`@rules/cli.md`). The writer below keeps its `Result` error guard as a backstop only.

```ts
import ExcelJS from "exceljs";
import type { Result } from "../types";
import type { OutputDestination, Row } from "./index";

const MIN_WIDTH = 10; // keep narrow columns readable
const MAX_WIDTH = 60; // cap very long cells so the sheet stays usable
const PADDING = 2;    // a little breathing room beyond the longest value

export async function toXlsx(rows: Row[], dest: OutputDestination): Promise<Result<void>> {
  if (dest.kind !== "file") {   // backstop - the command already raised a ValidationError for this case
    return { ok: false, error: {
      kind: "error",
      message: "Le format xlsx exige une destination fichier (--output <chemin>).",
      detail: "Un classeur binaire ne peut pas être écrit sur stdout.",
    } };
  }
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Export");

  if (columns.length === 0) {
    sheet.addRow(["(0 rows)"]);            // no data → placeholder cell (addTable needs ≥ 1 column)
  } else {
    // Data as a native Excel table (ListObject): header row + filter buttons + banded rows.
    sheet.addTable({
      name: "Export",
      ref: "A1",
      headerRow: true,
      style: { theme: "TableStyleMedium2", showRowStripes: true },
      columns: columns.map((name) => ({ name, filterButton: true })),
      rows: rows.map((row) => columns.map((c) => row[c] ?? null)),
    });
    // Autofit each column to the longest of its header and its cell values (bounded).
    columns.forEach((header, i) => {
      let max = header.length;
      for (const row of rows) {
        const v = row[header];
        const len = v == null ? 0 : String(v).length;
        if (len > max) max = len;
      }
      sheet.getColumn(i + 1).width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, max + PADDING));
    });
  }

  try {
    await workbook.xlsx.writeFile(dest.path);
    return { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: { kind: "error", message: "Échec de l'écriture du classeur xlsx.", detail: (e as Error).message } };
  }
}
```

- **Native table, not a plain grid**: `addTable` writes a ListObject (`TableStyleMedium2`, filter buttons, banded rows) so the export opens as a real Excel table. `getColumn(i + 1).width` autofits each column - exceljs has no true auto-width, so the width is computed from the string lengths of the header and the cells (capped `MIN_WIDTH`..`MAX_WIDTH`).
- **Empty result**: with no rows there are no columns; skip `addTable` (a table needs at least one column) and write a `(0 rows)` placeholder cell.

## Table - `src/output/table.ts`

```ts
import { writeFile } from "node:fs/promises";
import type { Result } from "../types";
import type { OutputDestination, Row } from "./index";

const MAX_CELL = 40;   // truncate wide cells so the table stays readable

/** Human-facing rendering of the same data. No dependency - a small manual column formatter. Honors a file destination. */
export async function toTable(rows: Row[], dest: OutputDestination): Promise<Result<void>> {
  let out = "(0 rows)\n";                                  // empty dataset → valid empty document, success
  if (rows.length > 0) {
    const columns = Object.keys(rows[0]);
    const cell = (v: unknown): string => {
      const s = v == null ? "" : String(v);
      return s.length > MAX_CELL ? s.slice(0, MAX_CELL - 1) + "…" : s;
    };
    const widths = columns.map((c) => Math.max(c.length, ...rows.map((r) => cell(r[c]).length)));
    const line = (cells: string[]): string => cells.map((s, i) => s.padEnd(widths[i])).join("  ");
    const body = rows.map((r) => line(columns.map((c) => cell(r[c]))));
    out = [line(columns), line(widths.map((w) => "-".repeat(w))), ...body].join("\n") + "\n";
  }
  try {
    if (dest.kind === "file") await writeFile(dest.path, out, "utf8");
    else process.stdout.write(out);   // the table is the selected data format → still stdout; logs go to stderr (@rules/cli.md)
    return { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: { kind: "error", message: "Échec de l'écriture du tableau.", detail: (e as Error).message } };
  }
}
```

- `table` is a human view, not meant for piping; it still writes to `stdout` because it is the chosen **data** format (only logs go to `stderr`, `@rules/cli.md`). It uses **no table library** - a heavy dependency is unwarranted for aligned columns.

## Large result sets

- Prefer **streaming** for big exports (when `csv` / `xlsx` ship): `csv-stringify` consumes a row stream (pipe the source into the stringifier), and `exceljs` offers a streaming writer - `new ExcelJS.stream.xlsx.WorkbookWriter({ filename })` - that flushes rows to disk instead of buffering the whole workbook.
- The native `addTable` rendering uses the **in-memory** workbook. The **streaming writer does not support `addTable`** (a ListObject needs the full workbook), so a streamed xlsx is a header + rows grid with column widths, not a native table - use it only for very large datasets, accepting that trade-off.
- `json` and `table` buffer in memory - fine for small/medium sets; for very large exports choose `csv` or `xlsx` (when shipped) **to a file**.
- Server-side pagination beats in-memory paging. When Salesforce is confirmed: for big SOQL datasets use the `bulkExport` helper (`sf data export bulk`, `@rules/sf-cli.md`) rather than a single `query`. The **`pageSize`** config key bounds interactive queries; **`exportDir`** is the default output directory for file destinations (`@rules/config.md`).

## Cross-references

- **`@rules/cli.md`** - the `--format` (shipped formats only) and `--output` flags map to `{ format, destination }`: no `--output` → `{ kind: "stdout" }`, `--output <path>` → `{ kind: "file"; path }`. `stdout` carries data (pipeable), `stderr` carries logs.
- **`@rules/config.md`** - `exportDir` (default directory for file output), `pageSize` (query page size).

## Anti-patterns - what NOT to do

- **Do not** serialize a dataset with `console.log(JSON.stringify(...))` in a command - call `formatOutput(...)`; `output/` is the single dispatch.
- **Do not** send `xlsx` to stdout - it requires a file destination; the command raises a `ValidationError` (exit `2`) before any work, and the writer keeps a `Result` error guard as a backstop.
- **Do not** treat an empty dataset as a warning or an error - the formatter prints a valid empty document (`[]`, `(0 rows)`, header-only csv, placeholder sheet) and the exit code stays `0`.
- **Do not** ship a formatter (or its dependency) that was not selected in Phase 1 - no dead `csv.ts` / `xlsx.ts`.
- **Do not** add a heavy table dependency (`cli-table3`...) - the manual column formatter covers the console table.
- **Do not** format inside a service - services return data (`Result<T>`); commands format. Keep serialization out of the business layer.
- **Do not** import the progress reporter into `output/` or write a status line to `stderr` from a formatter - bracket the write with a `progress.step` in the command (`@rules/progress.md`).
- **Do not** call `.end()` on `process.stdout` (pipe with `{ end: false }`) - closing stdout breaks piping and later writes.
- **Do not** hand-roll CSV escaping - use `csv-stringify`.
- **Do not** write a file output without first ensuring its parent directory exists - `mkdir(dirname(path), { recursive: true })` once in `formatOutput`, for every format (`json` / `csv` / `xlsx`); a missing dir (e.g. a fresh `exports/`) otherwise fails with `ENOENT`.

## Integrity verification

Detailed in `@rules/verification.md`. Key points: every user-facing dataset goes through `formatOutput(rows, { format, destination })` (`json` / `table`, plus the selected `csv` / `xlsx`) - no ad-hoc `console.log(JSON.stringify(...))` in a command; only the shipped formatters are dispatched; an empty dataset prints a valid empty document and exits `0`; `xlsx` requires a file destination (`ValidationError` from the command before any work, `Result` guard as backstop); the parent directory is ensured once, centrally, in `formatOutput` (`mkdir recursive`); formatters never write to stderr and never resolve paths themselves (the command confines via `resolveWithin` first); `process.stdout` is never closed (`{ end: false }`); CSV goes through `csv-stringify`, never hand-rolled. Run silently; report only on a discrepancy.
