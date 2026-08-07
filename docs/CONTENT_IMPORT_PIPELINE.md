# Canonical Content Import Pipeline

Phase 10 turns external chemistry data into validated canonical import candidates before it can enter Organic Chemistry Hub.

## Design goals

The importer is deliberately separated into four stages:

1. **Parse** the source format without knowing the chemistry domain.
2. **Normalize** source records into one canonical entity shape.
3. **Plan conflicts** against the current canonical registry.
4. **Validate** the merged result with the same domain validators used by the application.

Importing data never mutates a registry in memory and never silently overwrites an existing ID. The returned plan is a dry-run description that a future CLI, admin tool, or generator can persist safely.

## Supported formats

- JSON — objects, arrays of objects, or `{ "records": [...] }` envelopes.
- YAML — mappings and sequences using the supported YAML subset, including nested maps/lists and flow-style JSON values.
- CSV — RFC-style quoted fields, escaped quotes, and quoted multiline cells. Array/object fields must be JSON encoded inside the CSV cell.
- JCAMP-DX — metadata plus `XYDATA`, `XYPOINTS`, and peak-table data. X/Y factors and packed `X++(Y..Y)` spacing are applied when the required metadata is present.

## Canonical entity adapters

`importCanonicalContent()` accepts these domains:

- `molecule`
- `reaction`
- `mechanism`
- `reagent`
- `spectroscopy`
- `lesson`

Every record is shape-checked before it reaches the domain validator. Broken relationships are then reported by the canonical validator, so imported data cannot bypass registry rules.

```ts
import { importCanonicalContent } from "@/lib/content-import";

const result = importCanonicalContent(source, {
  entityKind: "reagent",
  format: "json",
});

if (!result.valid) {
  console.error(result.diagnostics);
}
```

## Conflict policy

The default policy is `error`.

- `error` — reject an ID that already exists.
- `skip` — keep the current canonical record and return a warning.
- `replace` — validate the imported record as the replacement for the current ID.
- `merge` — currently spectroscopy-only; appends imported raw spectral traces while retaining the curated canonical assignments.

No conflict policy writes to source files automatically.

## Spectroscopy and JCAMP-DX

Raw experimental traces are now first-class spectroscopy data via `RawSpectrumTrace`. Curated assignments and raw instrument traces can therefore coexist in one canonical dataset.

```ts
const result = importCanonicalContent(jcampSource, {
  entityKind: "spectroscopy",
  format: "jcamp-dx",
  conflictPolicy: "merge",
  jcamp: {
    moleculeId: "ethanol",
    traceId: "ethanol-ir-experimental-001",
  },
});
```

The importer attempts to infer `proton-nmr`, `carbon-nmr`, `ir`, or `mass` from JCAMP metadata. Set `spectrumKind` explicitly when the file is ambiguous.

The current parser intentionally does not pretend to decode every vendor/compressed JCAMP dialect. Unsupported NTUPLES/compression details are surfaced as diagnostics rather than silently interpreted incorrectly.

## Bulk-import ordering

Cross-domain references must already exist when a domain is validated. A safe large-data sequence is:

1. molecules and functional-group prerequisites
2. reactions
3. mechanisms
4. reagents
5. lessons
6. spectroscopy datasets/traces

For migrations where several new domains reference one another, generate the complete candidate dataset first and validate it as a release batch before publishing it. A future repository generator can build on the same result/actions API without changing the canonical registries.

## CSV conventions

Simple scalar columns remain text. Structured fields use JSON syntax:

```csv
id,name,aliases,capabilities
example,Example,"[""Alias""]","{""workspace"":true}"
```

This avoids ambiguous comma splitting and keeps CSV suitable for spreadsheets and database exports.

## Safety properties

The pipeline provides:

- structural field diagnostics with record and field locations
- duplicate/existing-ID conflict planning
- canonical relationship validation
- no implicit registry mutation
- preservation of raw JCAMP metadata
- finite-point validation for imported spectra
- deterministic import plans suitable for review before generation/commit

Example files live in `examples/content-import/`.
