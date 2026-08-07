# Content Import Pipeline — Phase 10 Manifest

## Added

- `lib/content-import/yaml-import.ts`
- `lib/content-import/canonical-import.ts`
- `content/spectroscopy/spectroscopy-materializer.ts`
- `content/lessons/lesson-materializer.ts`
- `docs/CONTENT_IMPORT_PIPELINE.md`
- `examples/content-import/reagent.json`
- `examples/content-import/reagent.yaml`
- `examples/content-import/reagents.csv`
- `examples/content-import/ethanol-ir.jdx`

## Upgraded

- JSON/CSV/JCAMP-DX parser contracts and diagnostics
- quoted multiline CSV parsing
- YAML ingestion
- packed JCAMP `X++(Y..Y)` data expansion
- JCAMP X/Y factor handling and point-count diagnostics
- canonical entity normalization and conflict planning
- canonical domain validation before acceptance
- spectroscopy raw-trace storage
- spectroscopy materialization shared by registry and imports
- lesson materialization shared by registry and imports
- unit regression coverage

## Architectural contract

External data must cross the import boundary before becoming canonical content. Parsers do not mutate registries. `importCanonicalContent()` returns validated records, diagnostics, and a deterministic add/replace/merge/skip plan. Persistence/generation remains a separate operation so imports can be reviewed before they affect the repository.
