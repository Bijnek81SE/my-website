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
