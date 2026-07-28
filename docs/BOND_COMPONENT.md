# Reusable Bond Component

Import:

```tsx
import { Bond } from "@/components/chemistry/bonds";
```

Basic usage:

```tsx
<svg viewBox="0 0 400 200">
  <Bond
    start={{ x: 80, y: 100 }}
    end={{ x: 320, y: 100 }}
    order={2}
  />
</svg>
```

Supported features:

- bond orders 1, 2, and 3
- line, solid wedge, dashed wedge, and aromatic styles
- forward and reverse bond-dipole arrows
- selected and muted states
- optional animation
- keyboard-accessible interaction
- enlarged invisible pointer target for easier selection

The component must be rendered inside an SVG element.
