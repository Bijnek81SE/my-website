# Reagent Extension Verification

Potassium tert-butoxide was added as a production-style test of the canonical reagent architecture.

The reagent is defined in one record and imported once into the reagent registry. From that registration, the platform derives its reference route, reagent-library entry, global-search entry, sitemap entry, knowledge-graph node and relationships, and Playwright route smoke coverage.

Workspace reagent discovery now also consumes the canonical reagent-to-molecule relationship. A workspace-enabled reagent that lists a molecule ID appears in that molecule's Knowledge Panel automatically. Molecule-owned relation records remain available only as optional description overrides for curated links.

The regression test `tests/unit/reagent-extension-contract.test.ts` protects this extension contract.
