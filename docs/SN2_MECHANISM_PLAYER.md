# SN2 Mechanism Player

Route: `/lab/sn2-mechanism`

## Included

- Four-step SN2 explanation
- Play and pause controls
- Previous and next controls
- Progress indicator
- Animated curved arrows
- Nucleophile, substrate, leaving-group, and product highlighting
- Reusable mechanism data types

## Lab card

Add this card to `app/lab/page.tsx`:

```tsx
<Link
  href="/lab/sn2-mechanism"
  className="block rounded-2xl border border-cyan-200 bg-cyan-50 p-4 transition hover:border-cyan-400 hover:bg-cyan-100"
>
  <span className="font-semibold text-cyan-950">SN2 Mechanism Player</span>
  <span className="mt-1 block text-sm text-cyan-800">
    Follow backside attack and leaving-group departure step by step.
  </span>
</Link>
```
