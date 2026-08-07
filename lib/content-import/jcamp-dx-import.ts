import type { ImportDiagnostic, ImportResult, JcampPoint, JcampSpectrum } from "./import-types";

function numeric(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function keyOf(value: string): string {
  return value.replace(/[\s_-]+/g, "").toUpperCase();
}

function parseNumbers(value: string): number[] {
  return value
    .trim()
    .split(/[;,\s]+/)
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);
}

function inferredDeltaX(metadata: Readonly<Record<string, string>>): number | undefined {
  const explicit = numeric(metadata.DELTAX);
  if (explicit !== undefined) return explicit;
  const first = numeric(metadata.FIRSTX);
  const last = numeric(metadata.LASTX);
  const count = numeric(metadata.NPOINTS);
  return first !== undefined && last !== undefined && count !== undefined && count > 1
    ? (last - first) / (count - 1)
    : undefined;
}

export function importJcampDx(source: string): ImportResult<JcampSpectrum> {
  const metadata: Record<string, string> = {};
  const diagnostics: ImportDiagnostic[] = [];
  const dataLines: { value: string; line: number; mode: "xydata" | "peak-table" }[] = [];
  let dataMode: "xydata" | "peak-table" | undefined;

  const lines = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index].trim();
    if (!raw || raw.startsWith("$$")) continue;
    if (raw.startsWith("##")) {
      const separator = raw.indexOf("=");
      if (separator < 0) {
        diagnostics.push({ level: "warning", code: "metadata-without-value", message: "JCAMP metadata line does not contain '='.", line: index + 1 });
        continue;
      }
      const key = keyOf(raw.slice(2, separator).trim());
      const value = raw.slice(separator + 1).trim();
      metadata[key] = value;
      if (key === "XYDATA") dataMode = "xydata";
      else if (key === "PEAKTABLE" || key === "XYPOINTS") dataMode = "peak-table";
      else if (key === "END") dataMode = undefined;
      else if (key === "NTUPLES") diagnostics.push({ level: "warning", code: "jcamp-ntuples-not-expanded", message: "NTUPLES metadata is preserved but compressed NTUPLES data is not expanded by this importer.", line: index + 1 });
      continue;
    }
    if (dataMode) dataLines.push({ value: raw, line: index + 1, mode: dataMode });
  }

  const xFactor = numeric(metadata.XFACTOR) ?? 1;
  const yFactor = numeric(metadata.YFACTOR) ?? 1;
  const deltaX = inferredDeltaX(metadata);
  const points: JcampPoint[] = [];

  for (const dataLine of dataLines) {
    const numbers = parseNumbers(dataLine.value);
    if (numbers.length < 2) {
      diagnostics.push({ level: "warning", code: "unparsed-data-line", message: "Could not parse JCAMP data line.", line: dataLine.line });
      continue;
    }
    if (dataLine.mode === "peak-table") {
      if (numbers.length % 2 !== 0) diagnostics.push({ level: "warning", code: "odd-peak-table-values", message: "Peak table line contains an unmatched numeric value.", line: dataLine.line });
      for (let index = 0; index + 1 < numbers.length; index += 2) {
        points.push({ x: numbers[index] * xFactor, y: numbers[index + 1] * yFactor });
      }
      continue;
    }

    if (numbers.length === 2) {
      points.push({ x: numbers[0] * xFactor, y: numbers[1] * yFactor });
      continue;
    }
    if (deltaX === undefined) {
      diagnostics.push({ level: "error", code: "missing-deltax", message: "Packed XYDATA requires DELTAX or FIRSTX/LASTX/NPOINTS metadata.", line: dataLine.line });
      continue;
    }
    const startX = numbers[0] * xFactor;
    for (let index = 1; index < numbers.length; index += 1) {
      points.push({ x: startX + (index - 1) * deltaX * xFactor, y: numbers[index] * yFactor });
    }
  }

  if (!metadata.TITLE) diagnostics.push({ level: "warning", code: "missing-title", message: "JCAMP-DX file has no TITLE field." });
  if (points.length === 0) diagnostics.push({ level: "error", code: "missing-points", message: "JCAMP-DX file contains no parseable XY points." });
  const declaredPoints = numeric(metadata.NPOINTS);
  if (declaredPoints !== undefined && points.length > 0 && points.length !== declaredPoints) {
    diagnostics.push({ level: "warning", code: "point-count-mismatch", message: `JCAMP declares ${declaredPoints} points but ${points.length} were parsed.` });
  }

  const spectrum: JcampSpectrum = {
    title: metadata.TITLE,
    dataType: metadata.DATATYPE,
    dataClass: metadata.DATACLASS,
    xUnits: metadata.XUNITS,
    yUnits: metadata.YUNITS,
    firstX: numeric(metadata.FIRSTX),
    lastX: numeric(metadata.LASTX),
    deltaX,
    nPoints: declaredPoints,
    xFactor,
    yFactor,
    observeFrequency: numeric(metadata.OBSERVEFREQUENCY),
    observeNucleus: metadata.OBSERVENUCLEUS,
    metadata,
    points,
  };
  return { format: "jcamp-dx", records: [spectrum], diagnostics };
}
