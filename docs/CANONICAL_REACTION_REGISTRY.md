# Canonical Reaction Registry

## Add a reaction

1. Create `content/reactions/records/<id>.ts` using `defineReaction`.
2. Import the record in `content/reactions/reaction-registry.ts`.
3. Add only focused chemistry or UI tests when the reaction introduces new behavior.

The registry automatically supplies Reaction Explorer filtering, knowledge-graph nodes, molecule relationship resolution, indexed lookup, and validation.

## Stable relationships

Use IDs for platform features, functional groups, reagents, related reactions, and prerequisites. `validateReactions` rejects broken references before content is accepted.
