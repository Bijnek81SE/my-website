# Organic Chemistry Hub design system

## Purpose

The design system keeps the platform visually consistent while lesson content and interactive chemistry features expand. New pages should use reusable components from `components/ui` before adding one-off layout code.

## Core principles

1. Chemistry content remains the visual priority.
2. Components should be reusable across homepage, curriculum, lessons, and future tools.
3. Interactive controls must have clear focus states and at least a 40 px touch target.
4. Colour should communicate meaning, not decorate every element.
5. Motion must respect `prefers-reduced-motion`.

## Colour roles

- Emerald: primary actions, course progress, and success states.
- Slate: typography, surfaces, borders, and structural UI.
- Blue: neutral information.
- Amber: warnings and common mistakes.
- Violet: resonance, electron delocalisation, and selected chemistry concepts.
- Red: errors or destructive actions only.

The CSS variables in `app/globals.css` are the source of truth for named design tokens.

## Components

### `Container`
Controls the site's horizontal margins and maximum content width.

### `Section`
Provides standard vertical spacing and surface tones. It includes a `Container` automatically.

### `Heading`
Standardises eyebrows, page/section titles, descriptions, alignment, and responsive type sizes.

### `Button` and `ButtonLink`
Use the same variants and sizes for actions and navigation. Use `Button` for an action and `ButtonLink` for navigation.

### `Badge`
Use for short metadata such as lesson number, availability, duration, or difficulty.

### `Card`
Use for grouped content. Avoid nesting cards unless the hierarchy is essential.

### `Callout`
Use for information, key ideas, warnings, or chemistry-specific emphasis.

### `Grid`
Provides standard responsive one-to-four-column layouts.

## Spacing

Prefer the spacing already provided by `Section`, `Container`, `Card`, and `Grid`. Avoid adding page-specific spacing unless the content requires it.

## Import style

Use the barrel export:

```tsx
import { Badge, ButtonLink, Card, Section } from "@/components/ui";
```

Component folder names are case-sensitive in imports. The existing lesson system remains at `components/Lesson` with an uppercase `L`.

## Next step

Sprint 1.2 will build reusable lesson components on top of these UI primitives. Existing lesson content will remain unchanged until the components are reviewed in a controlled pilot.
