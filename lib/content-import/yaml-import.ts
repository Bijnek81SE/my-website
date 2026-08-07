import type { ImportDiagnostic, ImportResult, ImportedRecord } from "./import-types";

type YamlLine = { indent: number; content: string; line: number };
type ParseState = { lines: YamlLine[]; diagnostics: ImportDiagnostic[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stripComment(value: string): string {
  let quoted: "'" | '"' | null = null;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if ((char === "'" || char === '"') && value[index - 1] !== "\\") {
      quoted = quoted === char ? null : quoted ?? char;
    }
    if (char === "#" && !quoted) return value.slice(0, index).trimEnd();
  }
  return value;
}

function parseScalar(raw: string): unknown {
  const value = raw.trim();
  if (value === "" || value === "~" || value === "null" || value === "Null" || value === "NULL") return null;
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === "true";
  if (/^[-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?$/.test(value)) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    if (value.startsWith('"')) {
      try { return JSON.parse(value); } catch { return value.slice(1, -1); }
    }
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
    try { return JSON.parse(value); } catch { /* fall through */ }
  }
  return value;
}

function splitKeyValue(content: string): [string, string] | undefined {
  let quoted: "'" | '"' | null = null;
  let depth = 0;
  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    if ((char === "'" || char === '"') && content[index - 1] !== "\\") quoted = quoted === char ? null : quoted ?? char;
    if (quoted) continue;
    if (char === "[" || char === "{") depth += 1;
    if (char === "]" || char === "}") depth -= 1;
    if (char === ":" && depth === 0) return [content.slice(0, index).trim(), content.slice(index + 1).trim()];
  }
  return undefined;
}

function parseBlock(state: ParseState, start: number, indent: number): { value: unknown; next: number } {
  const first = state.lines[start];
  const sequence = first?.indent === indent && first.content.startsWith("-");
  if (sequence) {
    const output: unknown[] = [];
    let index = start;
    while (index < state.lines.length) {
      const line = state.lines[index];
      if (line.indent < indent) break;
      if (line.indent !== indent || !line.content.startsWith("-")) break;
      const remainder = line.content.slice(1).trim();
      if (!remainder) {
        if (index + 1 < state.lines.length && state.lines[index + 1].indent > indent) {
          const nested = parseBlock(state, index + 1, state.lines[index + 1].indent);
          output.push(nested.value);
          index = nested.next;
        } else {
          output.push(null);
          index += 1;
        }
        continue;
      }
      const inlinePair = splitKeyValue(remainder);
      if (inlinePair) {
        const object: Record<string, unknown> = {};
        const [key, rawValue] = inlinePair;
        object[key] = rawValue ? parseScalar(rawValue) : null;
        index += 1;
        if (index < state.lines.length && state.lines[index].indent > indent) {
          const nestedIndent = state.lines[index].indent;
          while (index < state.lines.length && state.lines[index].indent >= nestedIndent) {
            const nestedLine = state.lines[index];
            if (nestedLine.indent !== nestedIndent || nestedLine.content.startsWith("-")) break;
            const pair = splitKeyValue(nestedLine.content);
            if (!pair) {
              state.diagnostics.push({ level: "error", code: "invalid-yaml-line", message: "Expected a key/value mapping.", line: nestedLine.line });
              index += 1;
              continue;
            }
            const [nestedKey, nestedRawValue] = pair;
            if (nestedRawValue) {
              object[nestedKey] = parseScalar(nestedRawValue);
              index += 1;
            } else if (index + 1 < state.lines.length && state.lines[index + 1].indent > nestedIndent) {
              const nested = parseBlock(state, index + 1, state.lines[index + 1].indent);
              object[nestedKey] = nested.value;
              index = nested.next;
            } else {
              object[nestedKey] = null;
              index += 1;
            }
          }
        }
        output.push(object);
      } else {
        output.push(parseScalar(remainder));
        index += 1;
      }
    }
    return { value: output, next: index };
  }

  const output: Record<string, unknown> = {};
  let index = start;
  while (index < state.lines.length) {
    const line = state.lines[index];
    if (line.indent < indent) break;
    if (line.indent !== indent || line.content.startsWith("-")) break;
    const pair = splitKeyValue(line.content);
    if (!pair) {
      state.diagnostics.push({ level: "error", code: "invalid-yaml-line", message: "Expected a key/value mapping.", line: line.line });
      index += 1;
      continue;
    }
    const [key, rawValue] = pair;
    if (!key) {
      state.diagnostics.push({ level: "error", code: "empty-yaml-key", message: "YAML mapping keys cannot be empty.", line: line.line });
      index += 1;
      continue;
    }
    if (rawValue) {
      output[key] = parseScalar(rawValue);
      index += 1;
      continue;
    }
    if (index + 1 < state.lines.length && state.lines[index + 1].indent > indent) {
      const nested = parseBlock(state, index + 1, state.lines[index + 1].indent);
      output[key] = nested.value;
      index = nested.next;
    } else {
      output[key] = null;
      index += 1;
    }
  }
  return { value: output, next: index };
}

export function importYamlRecords(source: string): ImportResult<ImportedRecord> {
  const diagnostics: ImportDiagnostic[] = [];
  const lines = source.split(/\r?\n/).flatMap((rawLine, index) => {
    if (/^\s*\t/.test(rawLine)) {
      diagnostics.push({ level: "error", code: "yaml-tab-indentation", message: "YAML indentation must use spaces, not tabs.", line: index + 1 });
    }
    const withoutComment = stripComment(rawLine);
    if (!withoutComment.trim() || withoutComment.trim() === "---" || withoutComment.trim() === "...") return [];
    const indent = withoutComment.length - withoutComment.trimStart().length;
    return [{ indent, content: withoutComment.trim(), line: index + 1 }];
  });

  if (lines.length === 0) return { format: "yaml", records: [], diagnostics: [...diagnostics, { level: "error", code: "empty-yaml", message: "YAML input is empty." }] };
  const parsed = parseBlock({ lines, diagnostics }, 0, lines[0].indent).value;
  const values = Array.isArray(parsed) ? parsed : isRecord(parsed) && Array.isArray(parsed.records) ? parsed.records : [parsed];
  const records = values.filter(isRecord);
  if (records.length !== values.length) diagnostics.push({ level: "error", code: "non-object-record", message: "YAML imports must contain mappings or a sequence of mappings." });
  return { format: "yaml", records, diagnostics };
}
