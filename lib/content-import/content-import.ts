import { importCsvRecords } from "./csv-import";
import type { ImportFormat, ImportResult, ImportedRecord, JcampSpectrum } from "./import-types";
import { importJcampDx } from "./jcamp-dx-import";
import { importJsonRecords } from "./json-import";
export function importContent(source: string, format: "json" | "csv"): ImportResult<ImportedRecord>;
export function importContent(source: string, format: "jcamp-dx"): ImportResult<JcampSpectrum>;
export function importContent(source: string, format: ImportFormat): ImportResult<ImportedRecord> | ImportResult<JcampSpectrum> {
  if (format === "json") return importJsonRecords(source);
  if (format === "csv") return importCsvRecords(source);
  return importJcampDx(source);
}
