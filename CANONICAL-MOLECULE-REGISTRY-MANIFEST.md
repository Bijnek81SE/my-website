# Canonical Molecule Registry Manifest

## Added

- Typed canonical molecule entity and structure model
- Six molecule records migrated from Workspace and spectroscopy
- Indexed id, alias, and capability selectors
- Cross-registry and molecular-graph validation
- Registry-derived Workspace molecule catalog and Knowledge Panel links
- Canonical atom/bond reuse by spectroscopy datasets
- Unit tests and contributor documentation

## Governing rule

New molecule content belongs in `content/molecules/records`. Shared UI must consume selectors and capabilities instead of adding molecule-specific branches or duplicate arrays.
