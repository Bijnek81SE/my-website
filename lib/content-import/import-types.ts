export type ImportFormat = "json" | "csv" | "jcamp-dx";
export type ImportedRecord = Readonly<Record<string, unknown>>;
export type ImportDiagnostic = { level: "error" | "warning"; code: string; message: string; line?: number };
export type ImportResult<T> = { format: ImportFormat; records: readonly T[]; diagnostics: readonly ImportDiagnostic[] };
export type JcampSpectrum = {
  title?: string;
  dataType?: string;
  xUnits?: string;
  yUnits?: string;
  firstX?: number;
  lastX?: number;
  nPoints?: number;
  metadata: Readonly<Record<string, string>>;
  points: readonly { x: number; y: number }[];
};
