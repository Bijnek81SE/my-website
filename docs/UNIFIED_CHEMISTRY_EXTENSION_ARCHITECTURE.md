# Unified Chemistry Content & Extension Architecture

The remaining foundation is now implemented through four connected systems:

1. **Canonical Lesson Registry** — lesson metadata, prerequisites, objectives, chemistry relationships, search, sitemap, study, and recommendations derive from typed lesson records.
2. **Workspace Tool Registry** — Workspace tabs are capability-aware plugins with separate metadata and renderer registration.
3. **Generated Knowledge Graph** — nodes and relationships derive from canonical molecules, reactions, mechanisms, reagents, spectra, lessons, references, and platform features.
4. **Content Import Pipeline** — JSON, CSV, and a conservative JCAMP-DX parser provide the base for dataset-scale ingestion.

## Adding content

- Lesson: add one file under `content/lessons/records/` and import it in `lesson-registry.ts`.
- Workspace tool: add metadata to `workspace-tool-registry.ts` and one renderer registration.
- Knowledge relationships: declare stable IDs on the owning canonical entity; the graph generator creates nodes and edges.
- Bulk content: parse JSON/CSV/JCAMP-DX through `lib/content-import`, validate, then normalize into a canonical registry record.

## Architectural quality gate

`validateCanonicalPlatform()` aggregates all domain validators and the generated knowledge graph validator. New entity types should participate in this pipeline before becoming public.
