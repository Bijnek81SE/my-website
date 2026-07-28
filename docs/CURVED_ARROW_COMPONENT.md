# Curved Arrow Component

Reusable SVG quadratic Bezier arrow for electron movement and reaction mechanisms.

## Example

```tsx
import { CurvedArrow } from "@/components/chemistry/CurvedArrow";

<svg viewBox="0 0 400 240">
  <CurvedArrow
    start={{ x: 60, y: 170 }}
    control={{ x: 200, y: 20 }}
    end={{ x: 330, y: 160 }}
    tone="accent"
    animated
  />
</svg>
```

## Supported states

- default, accent, success, and danger tones
- dashed
- animated
- selected
- muted
- mouse and keyboard interaction
