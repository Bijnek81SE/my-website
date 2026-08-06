# Canonical Molecule Registry

Milestone 2 of the Unified Chemistry Content & Extension Architecture makes `content/molecules` the authoritative source for molecule identity, structure, relationships, and capabilities.

## Add a molecule

1. Create one record under `content/molecules/records/` with `defineMolecule(...)`.
2. Add that record to `content/molecules/molecule-registry.ts`.
3. Add optional spectroscopy, prediction, or retrosynthesis data using the same stable molecule id.
4. Add focused chemistry tests where necessary.

Workspace molecule availability, labels, functional-group links, reagent links, reaction links, lesson links, and lab links are derived from the molecule record. Do not add molecule-specific branches to Workspace React components.

## Stable relationships

Molecules reference other registries by stable ids:

- `functionalGroupIds`
- `reagentRelations`
- `reactionRelations`
- `labRelations`
- `lessonRelations`

`validateMolecules` rejects missing targets, duplicate ids and aliases, invalid bonds, and incomplete Workspace capability metadata.

## Dataset-scale behavior

The registry builds maps for id and alias lookup. Consumers should use selectors such as `getMolecule`, `findMoleculeByNameOrAlias`, and `getMoleculesByCapability` rather than scanning or duplicating molecule arrays.

## Spectroscopy ownership

Molecular atoms and bonds are canonical. Spectroscopy datasets now reuse `molecule.structure`; signal assignments reference those canonical atom ids.
