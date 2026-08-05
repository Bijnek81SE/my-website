# Organic Chemistry Knowledge Graph

The knowledge graph is the shared relationship layer for lessons, mechanisms, labs, calculators, and reference sections.

## Core files

- `content/knowledge-types.ts` defines nodes and relation types.
- `content/knowledge-graph.ts` stores nodes, relations, and lookup helpers.
- `components/knowledge/` renders reusable prerequisite, related-concept, and study-next panels.

## Node identifiers

Use stable namespaced identifiers:

- `lesson:resonance`
- `mechanism:sn2`
- `lab:curved-arrow-designer`
- `calculator:lewis-builder`
- `reference:reagents`

Do not use titles as identifiers. Titles can change; identifiers should not.

## Relation guidance

- `prerequisite`: knowledge that should be understood first.
- `study-next`: the recommended next learning step.
- `related`: a useful conceptual connection.
- `practice`: an interactive place to apply the concept.
- `uses`: a reagent, method, or concept used by the source node.
- `reference`: a supporting reference area.

Every relation must point to an existing node. Add or update tests when expanding the graph.
