# Organic Chemistry Hub implementation roadmap

## Release 1 — Design system and interactive pilot

Status: implemented in this pack.

- Reusable `Card` and `Callout` UI primitives.
- Reusable learning-objectives, practice-question, and summary components.
- A reusable chemistry component folder.
- An interactive carboxylate resonance figure.
- A curved-arrow guide whose tails begin at the electron source.
- Resonance lesson migrated to the new components as the pilot lesson.

## Release 2 — MDX pilot

Status: implemented for the Resonance lesson.

- Supported MDX pipeline configured for the installed Next.js version.
- Resonance lesson migrated while preserving its URL and registry-driven metadata.
- Lesson metadata, reading time, module, and navigation remain centralized in the lesson registry.
- Interactive React chemistry components remain available inside MDX.
- Production build required before migrating other lessons.

## Release 3 — Reusable graphics system

- Formalise atom, bond, charge, lone-pair, and curved-arrow geometry.
- Add shared design tokens for bond length, stroke width, arrowhead size, and labels.
- Replace the remaining manually authored resonance and Lewis SVGs.
- Add accessibility titles and descriptions to every chemistry figure.

## Release 4 — Interactive chemistry

- Expand/collapse worked answers.
- Atom and bond highlighting.
- Step-through electron-flow animations.
- Immediate-feedback practice components.
- Reduced-motion support for every animation.

## Quality gate

Every release must pass:

```bash
npm run lint
npm run build
```
## Hydration and semantic HTML

- Resonance MDX no longer produces nested paragraph markup.
- The root layout declares smooth-scroll behavior for Next.js route transitions.
- Playwright guards the Resonance lesson against hydration and invalid-nesting regressions.


## Knowledge graph platform

- [x] Add typed knowledge nodes and relationships.
- [x] Connect Fundamentals lessons to prerequisites, related concepts, practice, and study-next paths.
- [x] Connect mechanism players to prerequisite lessons, curved-arrow practice, and reagent references.
- [x] Add graph-backed connections to named reactions, reagents, and functional groups.
- [x] Add unit and component regression coverage.

## SEO, structured data, and discoverability

- [x] Centralize the site origin, name, description, and shared keywords.
- [x] Add canonical, Open Graph, and Twitter metadata helpers.
- [x] Publish sitemap, robots, and web-app manifest routes.
- [x] Add WebSite, Organization, BreadcrumbList, and LearningResource structured data.
- [x] Derive Fundamentals lesson URLs from the lesson registry.
- [x] Add unit and E2E coverage for discoverability output.

## Adaptive learning platform

- [x] Add browser-local lesson and mechanism progress tracking.
- [x] Add study streak and completion summaries.
- [x] Add spaced-repetition review scheduling.
- [x] Add adaptive lesson and mechanism study-session controls.
- [x] Add continue-studying and due-review recommendations.
- [x] Add unit and component regression coverage.

## Adaptive Study Dashboard — complete

- Added a visible `/study` workspace for progress, streaks, reviews, recommendations, and recent activity.
- Integrated the dashboard into global navigation, homepage discovery, curriculum recommendations, search, sitemap, and automated tests.
- Progress remains private and browser-local.

## Interactive Reaction Explorer

- [x] Create a typed reaction registry for all mechanism-backed reactions.
- [x] Add filtering by reaction family, mechanism class, timing, and free-text chemistry terms.
- [x] Add two-reaction side-by-side comparison.
- [x] Connect every registry entry to its mechanism lab and knowledge prerequisites.
- [x] Integrate the explorer with navigation, search, sitemap, references, and adaptive recommendations.
- [x] Add unit, component, and E2E regression coverage.

## Chemistry Reference Library

- Added typed functional-group and reagent registries.
- Added searchable reference landing pages and static detail routes.
- Connected references to search, sitemap, knowledge graph, reactions, and labs.
- Added unit, component, and E2E regression coverage.

## Quantitative Chemistry Calculators Platform

Completed: shared formula parsing, unit conversion, validation, transparent calculation steps, and six published quantitative calculators for molar mass, molarity, dilution, stoichiometry, limiting reagents, and percent yield.

## Spectroscopy Engine

- [x] Shared spectroscopy data model and trace simulation engine
- [x] Realistic simulated ¹H NMR multiplicities and coupling spacing
- [x] ¹³C NMR, IR envelope, and mass-stick renderers
- [x] Structure-to-assignment bidirectional linking
- [x] Interactive assignment challenge mode
- [x] Lab, search, sitemap, knowledge-graph, and study integration
- [ ] Experimental JCAMP-DX import
- [ ] DEPT, COSY, HSQC, HMBC, and NOESY overlays

## Reaction Prediction & Synthesis Engine

- [x] Rule-based reagent, product, and mechanism evaluation
- [x] Major-product prediction challenges with misconception feedback
- [x] Directed transformation graph for synthesis planning
- [x] Multi-step route validation and efficiency scoring
- [x] Search, sitemap, knowledge graph, study, and lab integration
- [x] Unit, component, and E2E regression coverage


## Organic Chemistry Workspace — complete

- Unified persistent workbench published at `/workspace`.
- Molecule selection synchronizes overview, spectroscopy, reaction, calculations, references, and notes.
- Browser-local persistence and bounded undo history.
- Search, navigation, sitemap, knowledge graph, component tests, unit tests, and E2E coverage.

## Retrosynthesis Planner

- Graph-based reverse transformation rules
- Ranked route search with reliability, difficulty, risk, and step-count scoring
- Dead-end and depth-limit handling
- Forward mechanism validation for every disconnection
- Initial multi-step targets connected to the reaction prediction engine

## Workspace Knowledge Panel

- [x] Replace ambiguous generic reference buttons with labeled contextual cards.
- [x] Add typed molecule-specific functional-group, reagent, lab, reaction, and lesson connections.
- [x] Link only to published routes and explain why every connection is relevant.
- [x] Add component and E2E regression coverage for synchronized knowledge content.

## Unified Chemistry Content & Extension Architecture

- [x] Phase 1 — Canonical public feature catalog and generated platform integrations
- [x] Phase 2 — Canonical molecule registry
- [x] Phase 3 — Canonical reaction registry
- [x] Phase 4 — Canonical mechanism registry
- [x] Phase 5 — Canonical reagent registry
- [x] Phase 6 — Canonical spectroscopy registry
- [x] Phase 7 — Canonical lesson registry
- [x] Phase 8 — Workspace plugin architecture
- [x] Phase 9 — Generated knowledge graph and platform validation
- [x] Phase 10 — Import and dataset pipeline foundation

### Canonical Reagent Registry

- Reagent identity and educational reference content now live in `content/reagents`.
- Reactions, mechanisms, molecules, lessons, search, sitemap, knowledge graph, Workspace links, and public routes resolve reagents by stable IDs.
- The old reagent reference registry is now a compatibility re-export rather than a second source of truth.
- Validation detects duplicate IDs/slugs/aliases, broken relationships, and reaction/mechanism mismatches.
- Adding a reagent automatically creates reference discovery, sitemap inclusion, knowledge nodes, and route smoke coverage when its capabilities enable those integrations.

## Canonical Spectroscopy Registry

Structured spectroscopy datasets now reference canonical molecules by stable ID and derive molecular identity and structure from the molecule registry. Technique assignments, selectors, source metadata, capabilities, and cross-registry validation prepare the platform for dataset-scale expansion and future JCAMP-DX imports.


## Final extension foundation

- Lessons are canonical entities with prerequisites, objectives, chemistry relationships, capabilities, generated navigation, selectors, and validation.
- Workspace tools are capability-aware plugins with separate metadata and renderer registries.
- The knowledge graph is generated from canonical registries rather than maintained as a large handwritten edge list.
- A platform-wide validation pipeline checks all registries and generated knowledge relationships together.
- JSON, CSV, and JCAMP-DX parsers establish the import boundary for dataset-scale expansion.
- Search, sitemap, and route smoke coverage derive from canonical platform and content registries.

## Chemistry Relationship Engine

- [x] Generate typed direct relationships from canonical chemistry registries.
- [x] Infer inverse relationships without requiring reciprocal record edits.
- [x] Index relationships by entity, direction, semantic role, and target kind.
- [x] Validate relationship endpoints against canonical entity IDs.
- [x] Feed the generated knowledge graph from the shared relationship engine.
- [x] Include relationship validation in the platform-wide quality pipeline.
