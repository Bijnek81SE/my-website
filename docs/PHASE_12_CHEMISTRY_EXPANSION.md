# Phase 12 — Chemistry Expansion

## Governing rule

Complete one coherent chemistry domain end-to-end before moving to the next domain. A wave is not complete merely because new records exist; the domain must participate in canonical registries, semantic relationships, public references, Workspace, search, sitemap, mechanism study, prediction/retrosynthesis where supported, validation, and regression tests.

## Wave order

1. Alkenes
2. Alcohols
3. Carbonyl chemistry
4. Aromatic chemistry
5. Carboxylic acids and derivatives
6. Amines and nitrogen chemistry

## Wave 1 — Alkene ecosystem

### Milestone 12.1 — Canonical alkene dataset

The first content-scale milestone establishes the reusable pattern for future chemistry families.

Implemented scope:

- thirteen canonical alkene molecules, including terminal, internal, cis/trans, branched, cyclic, and aryl-substituted representatives;
- a shared alkene molecule factory so future alkene records inherit the common reaction, reagent, mechanism, lesson, and Workspace relationships;
- major alkene oxidation reactions: epoxidation, syn dihydroxylation, anti dihydroxylation, reductive ozonolysis, and vigorous permanganate oxidative cleavage;
- matching canonical mechanism definitions and public mechanism routes;
- a reusable interactive alkene oxidation mechanism player with mechanistic electron-flow, structural-change, and selectivity explanations;
- canonical reagents for chlorination, oxymercuration workup, peracid epoxidation, osmium-tetroxide dihydroxylation, ozonolysis, reductive workup, and permanganate oxidation;
- epoxide and carboxylic-acid functional-group records required by the new reaction products;
- a canonical molecule library with generated molecule detail pages;
- molecule search and sitemap generation from the molecule registry;
- Lab landing-page discovery from the platform feature catalog rather than a handwritten tool list;
- regression tests proving canonical validation, semantic graph discovery, search, sitemap, and route publication.

### Remaining Wave 1 milestones

- 12.2 Complete alkene learning path
- 12.3 Alkene spectroscopy atlas
- 12.4 Prediction and retrosynthesis expansion
- 12.5 Alkene ecosystem verification and content-quality audit

## Definition of done for every milestone

Run and pass:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```
