# Chemistry graphics system

The reusable chemistry graphics system lives under `components/chemistry/` and is exported from `components/chemistry/index.ts`.

## Core primitives

- `Atom` renders element labels, formal charge, lone pairs, highlights, and accessible interaction states.
- `Bond` renders single, double, triple, wedge, dash, aromatic, and wavy bonds.
- `CurvedArrow` renders full and fishhook electron-flow arrows.
- `ChemistryCanvas` supplies an SVG title and description for assistive technology.
- `StructureDiagram` composes atoms and bonds from declarative data.
- `AccessibleChemistryFigure` supplies semantic figure framing and optional captions.

## Design tokens

Use `chemistryGraphicTokens` for shared colours and geometry. Avoid introducing local values for standard bond strokes, spacing, atom radii, or arrowhead dimensions unless the graphic has a documented exceptional requirement.

## Accessibility

Every standalone chemistry graphic must have:

1. A concise title.
2. A description that communicates the chemistry represented, not merely the visual appearance.
3. Visible explanatory text or a caption when the figure carries instructional meaning.
4. Reduced-motion behaviour for decorative animation.

Interactive atoms, bonds, and arrows must provide an `ariaLabel` that describes the action or chemical target.

## Authoring pattern

Prefer declarative atom and bond arrays with `StructureDiagram` for small molecules and reference cards. Use the molecule, skeletal, or mechanism engines for editable or stateful chemistry.
