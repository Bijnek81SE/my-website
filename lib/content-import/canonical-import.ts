import {
  molecules,
  validateMolecules,
  type MoleculeDefinition,
} from "@/content/molecules";
import {
  reactions,
  validateReactions,
  type ReactionDefinition,
} from "@/content/reactions";
import {
  mechanisms,
  validateMechanisms,
  type MechanismDefinition,
} from "@/content/mechanisms";
import {
  reagents,
  validateReagents,
  type ReagentDefinition,
} from "@/content/reagents";
import {
  lessons,
  materializeLessons,
  validateLessons,
  type LessonDefinitionInput,
} from "@/content/lessons";
import {
  getSpectroscopyDatasetForMolecule,
  materializeSpectroscopyDataset,
  spectroscopyDatasets,
  validateSpectroscopyDatasets,
  type SpectroscopyDatasetInput,
  type SpectrumKind,
} from "@/content/spectroscopy";
import { importContent } from "./content-import";
import type {
  CanonicalImportResult,
  ImportConflictPolicy,
  ImportDiagnostic,
  ImportEntityKind,
  ImportFormat,
  ImportedRecord,
  ImportPlanAction,
  JcampSpectrum,
} from "./import-types";

export type CanonicalEntityRecord =
  | MoleculeDefinition
  | ReactionDefinition
  | MechanismDefinition
  | ReagentDefinition
  | SpectroscopyDatasetInput
  | LessonDefinitionInput;

export type JcampImportOptions = {
  moleculeId: string;
  datasetId?: string;
  traceId?: string;
  spectrumKind?: SpectrumKind;
  summary?: string;
};

export type CanonicalImportOptions = {
  entityKind: ImportEntityKind;
  format: ImportFormat;
  conflictPolicy?: ImportConflictPolicy;
  jcamp?: JcampImportOptions;
};

type Shape = {
  strings: readonly string[];
  numbers?: readonly string[];
  arrays: readonly string[];
  objects: readonly string[];
  optionalStrings?: readonly string[];
  optionalArrays?: readonly string[];
  optionalObjects?: readonly string[];
};

const shapes: Record<ImportEntityKind, Shape> = {
  molecule: {
    strings: ["id", "name", "formula", "displayFormula", "condensedFormula", "primaryFunctionalGroupId"],
    arrays: ["aliases", "functionalGroupIds", "reagentRelations", "reactionRelations", "labRelations", "lessonRelations"],
    objects: ["structure", "capabilities"],
    optionalStrings: ["smiles", "inchiKey"],
    optionalObjects: ["workspace"],
  },
  reaction: {
    strings: ["id", "title", "shortTitle", "description", "family", "mechanismClass", "mechanismId", "featureId", "substrate", "product", "steps", "intermediate", "keyIdea", "mechanismHref"],
    arrays: ["aliases", "substrateFunctionalGroupIds", "productFunctionalGroupIds", "reagentIds", "reagents", "conditions", "competingReactionIds", "relatedReactionIds", "prerequisiteNodeIds", "keywords"],
    objects: ["selectivity", "capabilities"],
  },
  mechanism: {
    strings: ["id", "reactionId", "featureId", "title", "shortTitle", "description", "href", "playerId", "mechanismClass"],
    arrays: ["aliases", "prerequisiteNodeIds", "keywords"],
    objects: ["capabilities"],
  },
  reagent: {
    strings: ["id", "slug", "name", "formula", "category", "summary", "purpose", "selectivity", "safety"],
    arrays: ["aliases", "conditions", "limitations", "alternativeNames", "reactionIds", "mechanismIds", "moleculeIds", "lessonIds", "keywords"],
    objects: ["capabilities"],
  },
  spectroscopy: {
    strings: ["id", "moleculeId", "summary"],
    arrays: ["protonNmr", "carbonNmr", "ir", "mass"],
    objects: [],
    optionalArrays: ["rawSpectra", "relatedLessonIds", "relatedFunctionalGroupIds"],
    optionalObjects: ["source", "capabilities"],
  },
  lesson: {
    strings: ["id", "slug", "moduleId", "module", "title", "description", "difficulty"],
    numbers: ["order", "estimatedMinutes"],
    arrays: ["learningObjectives", "prerequisiteLessonIds", "moleculeIds", "reactionIds", "mechanismIds", "reagentIds", "spectroscopyDatasetIds", "keywords"],
    objects: ["capabilities"],
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseStructuredCell(value: string): unknown {
  const trimmed = value.trim();
  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try { return JSON.parse(trimmed); } catch { return value; }
  }
  return value;
}

function normalizeImportedRecord(raw: ImportedRecord): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, typeof value === "string" ? parseStructuredCell(value) : value]),
  );
}

function validateShape(
  entityKind: ImportEntityKind,
  raw: Record<string, unknown>,
  recordIndex: number,
): ImportDiagnostic[] {
  const diagnostics: ImportDiagnostic[] = [];
  const shape = shapes[entityKind];
  const check = (fields: readonly string[] | undefined, predicate: (value: unknown) => boolean, expected: string, optional = false) => {
    for (const field of fields ?? []) {
      const value = raw[field];
      if (optional && value === undefined) continue;
      if (!predicate(value)) diagnostics.push({
        level: "error",
        code: "invalid-field-type",
        message: `${entityKind} field ${field} must be ${expected}.`,
        recordIndex,
        field,
      });
    }
  };
  check(shape.strings, (value) => typeof value === "string" && value.trim().length > 0, "a non-empty string");
  check(shape.numbers, (value) => typeof value === "number" && Number.isFinite(value), "a finite number");
  check(shape.arrays, Array.isArray, "an array");
  check(shape.objects, isRecord, "an object");
  check(shape.optionalStrings, (value) => typeof value === "string", "a string", true);
  check(shape.optionalArrays, Array.isArray, "an array", true);
  check(shape.optionalObjects, isRecord, "an object", true);
  return diagnostics;
}

function existingRecords(kind: ImportEntityKind): readonly { id: string }[] {
  if (kind === "molecule") return molecules;
  if (kind === "reaction") return reactions;
  if (kind === "mechanism") return mechanisms;
  if (kind === "reagent") return reagents;
  if (kind === "spectroscopy") return spectroscopyDatasets;
  return lessons;
}

function validateDomain(kind: ImportEntityKind, values: readonly CanonicalEntityRecord[]): ImportDiagnostic[] {
  try {
    if (kind === "molecule") return validateMolecules(values as readonly MoleculeDefinition[]).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
    if (kind === "reaction") return validateReactions(values as readonly ReactionDefinition[]).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
    if (kind === "mechanism") return validateMechanisms(values as readonly MechanismDefinition[]).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
    if (kind === "reagent") return validateReagents(values as readonly ReagentDefinition[]).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
    if (kind === "lesson") return validateLessons(materializeLessons(values as readonly LessonDefinitionInput[])).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
    const materialized = (values as readonly SpectroscopyDatasetInput[]).map(materializeSpectroscopyDataset);
    return validateSpectroscopyDatasets(materialized).map((issue) => ({ level: "error", code: issue.code, message: issue.message }));
  } catch (error) {
    return [{ level: "error", code: "domain-validation-error", message: error instanceof Error ? error.message : "Domain validation failed." }];
  }
}

function inferSpectrumKind(spectrum: JcampSpectrum): SpectrumKind | undefined {
  const descriptor = `${spectrum.dataType ?? ""} ${spectrum.observeNucleus ?? ""}`.toLowerCase();
  if (descriptor.includes("infrared") || descriptor.includes(" ir ") || descriptor.startsWith("ir ")) return "ir";
  if (descriptor.includes("mass")) return "mass";
  if (descriptor.includes("nmr")) {
    if (descriptor.includes("13c") || descriptor.includes("^13c") || descriptor.includes("carbon")) return "carbon-nmr";
    return "proton-nmr";
  }
  return undefined;
}

function axisFor(kind: SpectrumKind, spectrum: JcampSpectrum) {
  const xs = spectrum.points.map((point) => point.x);
  const min = xs.length > 0 ? Math.min(...xs) : 0;
  const max = xs.length > 0 ? Math.max(...xs) : 1;
  if (kind === "mass") return { min, max, label: "m/z", unit: "m/z" } as const;
  if (kind === "ir") return { min, max, reversed: true, label: "Wavenumber", unit: spectrum.xUnits ?? "cm⁻¹" } as const;
  return { min, max, reversed: true, label: "Chemical shift", unit: spectrum.xUnits ?? "ppm" } as const;
}

function jcampCandidate(
  spectrum: JcampSpectrum,
  options: CanonicalImportOptions,
  diagnostics: ImportDiagnostic[],
): SpectroscopyDatasetInput | undefined {
  const settings = options.jcamp;
  if (!settings?.moleculeId) {
    diagnostics.push({ level: "error", code: "missing-molecule-id", message: "JCAMP-DX spectroscopy import requires jcamp.moleculeId." });
    return undefined;
  }
  const kind = settings.spectrumKind ?? inferSpectrumKind(spectrum);
  if (!kind) {
    diagnostics.push({ level: "error", code: "unknown-spectrum-kind", message: "Could not infer spectroscopy technique from JCAMP metadata. Set jcamp.spectrumKind explicitly." });
    return undefined;
  }
  const existing = getSpectroscopyDatasetForMolecule(settings.moleculeId);
  const datasetId = settings.datasetId ?? existing?.id ?? settings.moleculeId;
  const traceId = settings.traceId ?? `${datasetId}-${kind}-imported`;
  const trace = {
    id: traceId,
    kind,
    axis: axisFor(kind, spectrum),
    points: spectrum.points,
    sourceLabel: spectrum.title,
    metadata: spectrum.metadata,
  } as const;

  if (existing && options.conflictPolicy === "merge") {
    return {
      id: existing.id,
      moleculeId: existing.moleculeId,
      summary: existing.summary,
      protonNmr: existing.protonNmr,
      carbonNmr: existing.carbonNmr,
      ir: existing.ir,
      mass: existing.mass,
      rawSpectra: [...existing.rawSpectra, trace],
      relatedLessonIds: existing.relatedLessonIds,
      relatedFunctionalGroupIds: existing.relatedFunctionalGroupIds,
      source: existing.source,
      capabilities: existing.capabilities,
    };
  }

  return {
    id: datasetId,
    moleculeId: settings.moleculeId,
    summary: settings.summary ?? `Imported ${kind} spectrum${spectrum.title ? `: ${spectrum.title}` : ""}.`,
    protonNmr: [],
    carbonNmr: [],
    ir: [],
    mass: [],
    rawSpectra: [trace],
    source: { kind: "imported", importedFormat: "jcamp-dx" },
    capabilities: { lab: true, workspace: true, assignments: false, challenges: false, importReady: true },
  };
}

function mergeForValidation(
  kind: ImportEntityKind,
  candidates: readonly CanonicalEntityRecord[],
  policy: ImportConflictPolicy,
): CanonicalEntityRecord[] {
  const existing = existingRecords(kind) as readonly CanonicalEntityRecord[];
  if (policy === "replace" || policy === "merge") {
    const candidateIds = new Set(candidates.map((record) => record.id));
    return [...existing.filter((record) => !candidateIds.has(record.id)), ...candidates];
  }
  return [...existing, ...candidates];
}

export function importCanonicalContent(
  source: string,
  options: CanonicalImportOptions,
): CanonicalImportResult<CanonicalEntityRecord> {
  const conflictPolicy = options.conflictPolicy ?? "error";
  const diagnostics: ImportDiagnostic[] = [];
  const actions: ImportPlanAction[] = [];
  let candidates: CanonicalEntityRecord[] = [];

  if (options.format === "jcamp-dx") {
    if (options.entityKind !== "spectroscopy") {
      return {
        format: options.format,
        entityKind: options.entityKind,
        records: [],
        actions: [],
        valid: false,
        diagnostics: [{ level: "error", code: "format-entity-mismatch", message: "JCAMP-DX can only be imported as spectroscopy content." }],
      };
    }
    const parsed = importContent(source, "jcamp-dx");
    diagnostics.push(...parsed.diagnostics);
    const candidate = parsed.records[0] ? jcampCandidate(parsed.records[0], { ...options, conflictPolicy }, diagnostics) : undefined;
    if (candidate) candidates = [candidate];
  } else {
    const parsed = importContent(source, options.format);
    diagnostics.push(...parsed.diagnostics);
    candidates = parsed.records.flatMap((record, recordIndex) => {
      const normalized = normalizeImportedRecord(record);
      if (options.entityKind === "reagent" && normalized.kind === undefined) normalized.kind = "reagent";
      const shapeIssues = validateShape(options.entityKind, normalized, recordIndex);
      diagnostics.push(...shapeIssues);
      return shapeIssues.some((issue) => issue.level === "error") ? [] : [normalized as CanonicalEntityRecord];
    });
  }

  const existingIds = new Set(existingRecords(options.entityKind).map((record) => record.id));
  const accepted: CanonicalEntityRecord[] = [];
  for (const candidate of candidates) {
    if (!existingIds.has(candidate.id)) {
      actions.push({ entityKind: options.entityKind, id: candidate.id, action: "add" });
      accepted.push(candidate);
      continue;
    }
    if (conflictPolicy === "skip") {
      actions.push({ entityKind: options.entityKind, id: candidate.id, action: "skip" });
      diagnostics.push({ level: "warning", code: "existing-id-skipped", message: `${options.entityKind} ${candidate.id} already exists and was skipped.` });
      continue;
    }
    if (conflictPolicy === "error") {
      diagnostics.push({ level: "error", code: "existing-id", message: `${options.entityKind} ${candidate.id} already exists.` });
      continue;
    }
    if (conflictPolicy === "merge" && options.entityKind !== "spectroscopy") {
      diagnostics.push({ level: "error", code: "unsupported-merge", message: "Merge conflict policy is currently supported only for spectroscopy imports." });
      continue;
    }
    actions.push({ entityKind: options.entityKind, id: candidate.id, action: conflictPolicy === "merge" ? "merge" : "replace" });
    accepted.push(candidate);
  }

  if (!diagnostics.some((item) => item.level === "error")) {
    diagnostics.push(...validateDomain(options.entityKind, mergeForValidation(options.entityKind, accepted, conflictPolicy)));
  }

  return {
    format: options.format,
    entityKind: options.entityKind,
    records: accepted,
    actions,
    diagnostics,
    valid: !diagnostics.some((item) => item.level === "error"),
  };
}
