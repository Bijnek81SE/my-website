import type { ImportDiagnostic, ImportResult, ImportedRecord } from "./import-types";

type CsvRow = { values: string[]; line: number };

function parseCsvRows(source: string): { rows: CsvRow[]; diagnostics: ImportDiagnostic[] } {
  const rows: CsvRow[] = [];
  const diagnostics: ImportDiagnostic[] = [];
  let values: string[] = [];
  let current = "";
  let quoted = false;
  let line = 1;
  let rowLine = 1;

  const pushValue = () => {
    values.push(current.trim());
    current = "";
  };

  const pushRow = () => {
    pushValue();
    if (values.some((value) => value.length > 0)) rows.push({ values, line: rowLine });
    values = [];
    rowLine = line;
  };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === '"') {
      if (quoted && source[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }
    if (char === "," && !quoted) {
      pushValue();
      continue;
    }
    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && source[index + 1] === "\n") index += 1;
      pushRow();
      line += 1;
      rowLine = line;
      continue;
    }
    if (char === "\n") line += 1;
    current += char;
  }

  if (quoted) {
    diagnostics.push({
      level: "error",
      code: "unterminated-quote",
      message: "CSV input contains an unterminated quoted field.",
      line: rowLine,
    });
  }

  if (current.length > 0 || values.length > 0) pushRow();
  return { rows, diagnostics };
}

export function importCsvRecords(source: string): ImportResult<ImportedRecord> {
  const parsed = parseCsvRows(source);
  if (parsed.rows.length === 0) {
    return {
      format: "csv",
      records: [],
      diagnostics: [
        ...parsed.diagnostics,
        { level: "error", code: "empty-csv", message: "CSV input is empty." },
      ],
    };
  }

  const headers = parsed.rows[0].values.map((header) => header.trim());
  const duplicateHeaders = headers.filter((header, index) => headers.indexOf(header) !== index);
  if (headers.some((header) => !header)) {
    return {
      format: "csv",
      records: [],
      diagnostics: [
        ...parsed.diagnostics,
        { level: "error", code: "empty-header", message: "CSV headers cannot be empty.", line: 1 },
      ],
    };
  }
  if (duplicateHeaders.length > 0) {
    return {
      format: "csv",
      records: [],
      diagnostics: [
        ...parsed.diagnostics,
        {
          level: "error",
          code: "duplicate-header",
          message: `Duplicate CSV headers: ${[...new Set(duplicateHeaders)].join(", ")}.`,
          line: 1,
        },
      ],
    };
  }

  const records: ImportedRecord[] = [];
  const diagnostics = [...parsed.diagnostics];
  for (let rowIndex = 1; rowIndex < parsed.rows.length; rowIndex += 1) {
    const row = parsed.rows[rowIndex];
    if (row.values.length !== headers.length) {
      diagnostics.push({
        level: "error",
        code: "column-count",
        message: `Expected ${headers.length} columns but found ${row.values.length}.`,
        line: row.line,
        recordIndex: rowIndex - 1,
      });
      continue;
    }
    records.push(Object.fromEntries(headers.map((header, index) => [header, row.values[index]])));
  }

  return { format: "csv", records, diagnostics };
}
