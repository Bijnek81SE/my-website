# Chemistry Relationship Engine

## Purpose

Canonical chemistry registries now feed one typed relationship engine. Consumers query relationships by stable entity ID, semantic role, direction, and target kind instead of rebuilding cross-domain links independently.

## Architecture

- `content/relationships/chemistry-relationship-types.ts`
- `content/relationships/chemistry-relationship-engine.ts`
- `content/relationships/chemistry-relationship-selectors.ts`
- `content/relationships/chemistry-relationship-validation.ts`

The engine generates direct registry facts, derives inverse relationships, deduplicates reciprocal declarations, builds indexed selectors, and validates every source and target against canonical entity registries.

## Integrations

- The generated knowledge graph consumes direct engine relationships.
- Platform validation checks the relationship engine before graph validation.
- Future Workspace, recommendation, search, and AI-tutor consumers can query the same relationship index.

## Extension workflow

New registry records declare only their chemistry facts. The relationship engine generates discoverable inverse links automatically, so a reagent linked to a reaction is also discoverable from that reaction without editing another consumer.
