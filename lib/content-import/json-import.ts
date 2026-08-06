import type { ImportResult, ImportedRecord } from "./import-types";
function isRecord(value: unknown): value is ImportedRecord { return typeof value === "object" && value !== null && !Array.isArray(value); }
export function importJsonRecords(source: string): ImportResult<ImportedRecord> {
  try {
    const parsed: unknown = JSON.parse(source);
    const values = Array.isArray(parsed) ? parsed : isRecord(parsed) && Array.isArray(parsed.records) ? parsed.records : [parsed];
    const records = values.filter(isRecord);
    const diagnostics = records.length === values.length ? [] : [{ level: "error" as const, code: "non-object-record", message: "JSON imports must contain objects or an array of objects." }];
    return { format: "json", records, diagnostics };
  } catch (error) {
    return { format: "json", records: [], diagnostics: [{ level: "error", code: "invalid-json", message: error instanceof Error ? error.message : "Invalid JSON." }] };
  }
}
