# Knowledge Graph 2.0 — Semantic Graph Unification

## Purpose

Knowledge Graph 2.0 makes one semantic graph the shared discovery layer for canonical chemistry, platform tools, Workspace context, learning pathways, recommendations, and compatibility knowledge panels.

## Added

- `content/knowledge/semantic-graph-types.ts`
- `content/knowledge/semantic-graph-generator.ts`
- `content/knowledge/semantic-graph-store.ts`
- `content/knowledge/semantic-graph-selectors.ts`
- `content/knowledge/semantic-graph-validation.ts`
- `content/knowledge/semantic-learning.ts`
- `tests/unit/semantic-knowledge-graph.test.ts`
- `docs/KNOWLEDGE_GRAPH_2.md`

## Migrated consumers

- Legacy knowledge graph API now adapts the semantic graph instead of maintaining its own graph model.
- Workspace molecule knowledge discovery resolves reagents, reactions, lessons, and labs through semantic graph queries.
- Study recommendations use graph relationships and prerequisite eligibility rather than choosing the first incomplete lesson.
- Platform validation checks both the compatibility knowledge graph and the semantic graph.

## Extension contract

New canonical entity records automatically enter the graph through their registries and the Chemistry Relationship Engine. New platform-only relationships should be added as semantic integration edges, not hardcoded in consumers.
