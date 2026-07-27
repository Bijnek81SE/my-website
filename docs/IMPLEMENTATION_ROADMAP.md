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

- Add a supported MDX pipeline for the installed Next.js version.
- Migrate the Resonance lesson first while preserving its URL and metadata.
- Define frontmatter for title, description, reading time, module, and navigation.
- Keep interactive React chemistry components available inside MDX.
- Run a production build before migrating other lessons.

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
