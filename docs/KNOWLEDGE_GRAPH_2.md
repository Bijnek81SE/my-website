# Knowledge Graph 2.0

Knowledge Graph 2.0 is the semantic discovery layer for Organic Chemistry Hub. It unifies canonical chemistry relationships and platform-tool relationships behind one indexed graph API.

## Nodes

Nodes are generated from canonical lessons, molecules, reactions, mechanisms, reagents, spectroscopy datasets, functional groups, and public platform features. Canonical chemistry nodes are marked separately from platform nodes so consumers can distinguish scientific content from application surfaces.

## Edges

Canonical chemistry edges come from the Chemistry Relationship Engine and preserve their exact semantic role, provenance, inferred/direct status, and explanatory metadata. Platform edges represent practice tools, references, and prerequisite resources that do not belong in chemistry registries.

Every edge also receives a compatibility category and a weight. Compatibility categories keep existing knowledge-panel APIs working, while semantic roles and weights support richer graph traversal and recommendation logic.

## Query API

Use `getSemanticGraphConnections` for direct indexed discovery, `findSemanticGraphPaths` for explainable cross-domain paths, and `recommendSemanticGraphNodes` for multi-source ranked discovery.

The graph supports outgoing, incoming, and bidirectional queries; semantic/category filters; target-kind filters; direct-only filtering; and bounded traversal.

## Learning pathways

`recommendNextLessonIds` uses studied nodes, completed nodes, graph proximity, lesson capabilities, and prerequisite completion. This replaces static "first incomplete lesson" behavior without moving learning rules into React components.

## Workspace

Workspace molecule knowledge now queries the same semantic graph used by knowledge panels and recommendations. Curated molecule relationship text remains available as a presentation override, while graph discovery can surface relationships declared from the opposite side of the chemistry model.

## Compatibility

`content/knowledge-graph.ts` and `content/knowledge/knowledge-graph-generator.ts` remain as compatibility adapters. Existing components can continue using `KnowledgeRelationKind` while new systems should prefer the semantic graph APIs.

## Adding content

A new canonical molecule, reaction, mechanism, reagent, lesson, or spectroscopy dataset should not require edits to graph consumers. Relationships declared by the canonical record are generated into the Chemistry Relationship Engine and then materialized into the semantic graph automatically.
