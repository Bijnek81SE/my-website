# Interactive Reaction Explorer

The reaction explorer is the shared registry and comparison interface for mechanism-backed transformations.

## Route

`/reactions`

## Registry

Reaction data lives in:

- `content/reactions/reaction-types.ts`
- `content/reactions/reaction-registry.ts`

Every reaction definition must include mechanism class, substrate, product, reagents, conditions, timing, intermediate, selectivity, related pathways, prerequisite knowledge nodes, and a working mechanism-lab route.

## Adding a reaction

1. Add a complete `ReactionDefinition` to the registry.
2. Add or verify the mechanism lab.
3. Add related and competing reaction IDs.
4. Add prerequisite knowledge-node IDs.
5. Add unit coverage for any new classification rule.
6. Run lint, unit tests, build, and E2E tests.

## Student experience

Students can filter by family, mechanism, and timing; search chemistry terms; open detailed reaction explanations; compare two reactions; and launch the matching mechanism lab.
