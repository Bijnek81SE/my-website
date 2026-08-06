import type { ImportResult, JcampSpectrum } from "./import-types";
function numeric(value: string | undefined): number | undefined { if (value === undefined) return undefined; const parsed = Number(value); return Number.isFinite(parsed) ? parsed : undefined; }
export function importJcampDx(source: string): ImportResult<JcampSpectrum> {
  const metadata: Record<string, string> = {}; const points: { x: number; y: number }[] = []; const diagnostics = [];
  const lines = source.split(/\r?\n/); let inData = false;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim(); if (!line) continue;
    if (line.startsWith("##")) {
      const separator = line.indexOf("="); if (separator < 0) continue;
      const key = line.slice(2, separator).trim().toUpperCase(); const value = line.slice(separator + 1).trim(); metadata[key] = value;
      if (key === "XYDATA" || key === "PEAK TABLE" || key === "PEAKTABLE") inData = true;
      if (key === "END") inData = false;
      continue;
    }
    if (!inData) continue;
    const numbers = line.split(/[;,\s]+/).map(Number).filter(Number.isFinite);
    if (numbers.length < 2) { diagnostics.push({ level: "warning" as const, code: "unparsed-data-line", message: "Could not parse JCAMP data line.", line: index + 1 }); continue; }
    for (let i = 0; i + 1 < numbers.length; i += 2) points.push({ x: numbers[i], y: numbers[i + 1] });
  }
  if (!metadata.TITLE) diagnostics.push({ level: "warning" as const, code: "missing-title", message: "JCAMP-DX file has no TITLE field." });
  if (points.length === 0) diagnostics.push({ level: "error" as const, code: "missing-points", message: "JCAMP-DX file contains no parseable XY points." });
  const spectrum: JcampSpectrum = { title: metadata.TITLE, dataType: metadata.DATATYPE, xUnits: metadata.XUNITS, yUnits: metadata.YUNITS, firstX: numeric(metadata.FIRSTX), lastX: numeric(metadata.LASTX), nPoints: numeric(metadata.NPOINTS), metadata, points };
  return { format: "jcamp-dx", records: [spectrum], diagnostics };
}
