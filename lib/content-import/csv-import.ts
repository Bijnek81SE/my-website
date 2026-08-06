import type { ImportResult, ImportedRecord } from "./import-types";
function parseRow(line: string): string[] {
  const values: string[] = []; let current = ""; let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') { current += '"'; index += 1; } else quoted = !quoted;
    } else if (char === "," && !quoted) { values.push(current.trim()); current = ""; } else current += char;
  }
  values.push(current.trim()); return values;
}
export function importCsvRecords(source: string): ImportResult<ImportedRecord> {
  const lines = source.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) return { format: "csv", records: [], diagnostics: [{ level: "error", code: "empty-csv", message: "CSV input is empty." }] };
  const headers = parseRow(lines[0]);
  const duplicates = headers.filter((header, index) => headers.indexOf(header) !== index);
  if (headers.some((header) => !header)) return { format: "csv", records: [], diagnostics: [{ level: "error", code: "empty-header", message: "CSV headers cannot be empty.", line: 1 }] };
  if (duplicates.length) return { format: "csv", records: [], diagnostics: [{ level: "error", code: "duplicate-header", message: `Duplicate CSV headers: ${[...new Set(duplicates)].join(", ")}.`, line: 1 }] };
  const records: ImportedRecord[] = []; const diagnostics = [];
  for (let lineIndex = 1; lineIndex < lines.length; lineIndex += 1) {
    const values = parseRow(lines[lineIndex]);
    if (values.length !== headers.length) { diagnostics.push({ level: "error" as const, code: "column-count", message: `Expected ${headers.length} columns but found ${values.length}.`, line: lineIndex + 1 }); continue; }
    records.push(Object.fromEntries(headers.map((header, index) => [header, values[index]])));
  }
  return { format: "csv", records, diagnostics };
}
