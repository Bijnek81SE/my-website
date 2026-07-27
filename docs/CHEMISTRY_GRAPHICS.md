# Chemistry graphics standard

The chemistry components in `components/chemistry` are reusable SVG primitives for educational figures.

## Core rules

1. `Bond` receives atom-centre coordinates and automatically clips both ends to the atom radii. Do not manually guess bond endpoints.
2. Curved-arrow tails begin at an electron source: a lone pair, bond, or radical.
3. Curved-arrow heads end at the electron destination: an atom or the location of a forming bond.
4. Resonance contributors keep identical atom positions. Only electrons, bond order, and formal charge change.
5. Use `ChemistryCanvas` for accessible titles and descriptions.
6. Keep static chemical facts in server components. Add `"use client"` only to figures that need interaction.

## Available primitives

- `Atom`
- `Bond`
- `LonePair`
- `CurvedArrow`
- `ResonanceArrow`
- `ChemistryCanvas`

## Example

```tsx
<ChemistryCanvas title="Carbonyl group" description="A carbon double bonded to oxygen">
  <Bond from={{ x: 100, y: 100 }} to={{ x: 240, y: 100 }} order={2} />
  <Atom x={100} y={100} element="C" />
  <Atom x={240} y={100} element="O" tone="oxygen" />
</ChemistryCanvas>
```
