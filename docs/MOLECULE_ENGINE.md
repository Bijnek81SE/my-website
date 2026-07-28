# Atom and Molecule Engine

## Imports

```tsx
import { Atom } from "@/components/chemistry/atoms";
import { Molecule } from "@/components/chemistry/molecules";
```

## Atom

```tsx
<svg viewBox="0 0 320 200">
  <Atom
    id="oxygen"
    element="O"
    x={160}
    y={100}
    charge={-1}
    lonePairs={3}
    selected
  />
</svg>
```

Supported features:

- Common organic-chemistry elements
- Formal charges
- Zero to four lone pairs
- Selection and muted states
- Mouse and keyboard interaction
- Optional atom backgrounds
- Accessible SVG labels

## Molecule

```tsx
const molecule = {
  atoms: [
    { id: "c1", element: "C", x: 120, y: 100 },
    { id: "o1", element: "O", x: 240, y: 100, lonePairs: 2 },
  ],
  bonds: [
    { id: "c1-o1", from: "c1", to: "o1", order: 2 },
  ],
};

<Molecule atoms={molecule.atoms} bonds={molecule.bonds} />;
```

The Molecule component resolves atom IDs, shortens bond lines to atom edges, draws bonds behind atoms, and exposes atom and bond selection callbacks.
