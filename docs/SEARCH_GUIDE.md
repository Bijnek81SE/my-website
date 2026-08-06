# Global search guide

The global search platform is mounted once in `app/layout.tsx` through `SearchProvider`.

## Opening search

Users can open search through the header button, `Command+K` on macOS, `Control+K` on Windows/Linux, or `/` when focus is not inside a form field.

## Adding searchable content

Add stable public routes to `components/search/SearchIndex.ts`. Fundamentals lessons are indexed automatically from `content/lessons`.

Each entry requires a unique `id`, title, description, route, category, and useful chemistry keywords. Keywords should include common synonyms and learner phrasing.

## Accessibility

The dialog uses native dialog semantics, a labelled combobox, a listbox with options, visible focus states, Escape-to-close behavior, and keyboard result navigation.

## Quality checks

Run:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```
