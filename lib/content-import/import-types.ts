export type ImportFormat = "json" | "yaml" | "csv" | "jcamp-dx";

export type ImportEntityKind =
  | "molecule"
  | "reaction"
  | "mechanism"
  | "reagent"
  | "spectroscopy"
  | "lesson";

export type ImportedRecord = Readonly<Record<string, unknown>>;

export type ImportDiagnostic = {
  level: "error" | "warning";
  code: string;
  message: string;
  line?: number;
  recordIndex?: number;
  field?: string;
};

export type ImportResult<T> = {
  format: ImportFormat;
  records: readonly T[];
  diagnostics: readonly ImportDiagnostic[];
};

export type ImportConflictPolicy = "error" | "skip" | "replace" | "merge";

export type ImportPlanAction = {
  entityKind: ImportEntityKind;
  id: string;
  action: "add" | "replace" | "merge" | "skip";
};

export type CanonicalImportResult<T> = ImportResult<T> & {
  entityKind: ImportEntityKind;
  valid: boolean;
  actions: readonly ImportPlanAction[];
};

export type JcampPoint = {
  x: number;
  y: number;
};

export type JcampSpectrum = {
  title?: string;
  dataType?: string;
  dataClass?: string;
  xUnits?: string;
  yUnits?: string;
  firstX?: number;
  lastX?: number;
  deltaX?: number;
  nPoints?: number;
  xFactor?: number;
  yFactor?: number;
  observeFrequency?: number;
  observeNucleus?: string;
  metadata: Readonly<Record<string, string>>;
  points: readonly JcampPoint[];
};
