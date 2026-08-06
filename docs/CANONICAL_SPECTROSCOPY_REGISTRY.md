# Canonical Spectroscopy Registry

The spectroscopy registry stores structured 1H NMR, 13C NMR, IR, and mass-spectrometry data independently from React components.

## Adding a dataset

Add a `defineSpectroscopyDataset` record with a stable `moleculeId` and technique assignments. The registry derives the molecule name, display formula, atoms, bonds, functional groups, and lesson relationships from the canonical molecule record.

Each assignment references atom IDs from the canonical molecule structure. Validation rejects unknown atoms, duplicate assignments, invalid integrations, invalid mass intensities, missing molecules, and molecule capability mismatches.

## Extension points

Selectors expose datasets by molecule, capability, functional group, and text query. Source metadata distinguishes simulated, experimental, and imported datasets and reserves import formats for JSON, CSV, and JCAMP-DX pipelines.
