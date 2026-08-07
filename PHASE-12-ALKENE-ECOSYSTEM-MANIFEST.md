# Phase 12 — Alkene Ecosystem Manifest

## Milestone 12.1

Canonical alkene dataset and public integration.

### New chemistry

- 13 canonical alkene molecules
- 5 alkene oxidation reactions
- 5 corresponding mechanisms
- 8 new canonical reagent records
- epoxide and carboxylic-acid functional-group definitions

### New platform behavior

- `/molecules` canonical molecule library
- `/molecules/[slug]` generated molecule reference pages
- generated molecule search entries and sitemap routes
- generated Lab catalog from platform features
- interactive structured mechanism players for epoxidation, syn/anti dihydroxylation, ozonolysis, and oxidative cleavage

### Architectural intent

Future alkene additions should normally require a new molecule record plus one registry import. Common alkene chemistry relationships are inherited from the shared alkene molecule factory rather than copied into every record.
