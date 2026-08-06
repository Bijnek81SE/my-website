# Canonical Reagent Registry

The canonical reagent registry is the authoritative source for reagent identity, reference content, chemistry relationships, and platform capabilities.

## Location

```text
content/reagents/
  records/
  reagent-types.ts
  reagent-registry.ts
  reagent-selectors.ts
  reagent-validation.ts
  index.ts
```

## Adding a reagent

1. Create one record in `content/reagents/records/` with `defineReagent`.
2. Add the record import to `content/reagents/reagent-registry.ts`.
3. Reference reactions, mechanisms, molecules, and lessons by stable IDs.
4. Add focused chemistry tests when the reagent introduces new behavior.

The reagent library, detail routes, metadata, search entries, sitemap routes, knowledge-graph nodes, Workspace relationship resolution, and route smoke coverage all derive from the canonical registry.

## Required relationships

A reagent record may connect to:

- `reactionIds`
- `mechanismIds`
- `moleculeIds`
- `lessonIds`

Validation rejects missing IDs and mismatched reaction/mechanism pairs.

## Dataset-scale selectors

Use registry selectors instead of filtering UI-owned arrays:

```ts
getReagent("bromine");
findReagentByNameOrAlias("peroxide effect");
selectReagents({ reactionId: "halogenation" });
selectReagents({ moleculeId: "propene" });
getReagentsByCapability("workspace");
```

## Compatibility

`content/references/reagent-registry.ts` remains as a compatibility re-export while existing imports migrate. New domain code should import from `@/content/reagents` or a direct reagent submodule.
