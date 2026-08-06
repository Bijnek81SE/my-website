# SEO and structured-data guide

Organic Chemistry Hub centralizes public discoverability in `lib/seo/`.

## Page metadata

Use `createPageMetadata` for published pages:

```ts
export const metadata = createPageMetadata({
  title: "Resonance",
  description: "Understand resonance contributors and electron delocalisation.",
  path: "/learn/fundamentals/resonance",
  type: "article",
});
```

The helper adds a canonical URL, Open Graph metadata, Twitter metadata, and shared site keywords. Titles should not include `| Organic Chemistry Hub`; the root title template adds the site name.

## Structured data

- `WebSiteJsonLd` is mounted globally in `app/layout.tsx`.
- `LessonPage` emits `LearningResource` and `BreadcrumbList` data automatically.
- Use `JsonLd` for future schema.org objects rather than writing raw script tags.

## Discovery routes

- `app/sitemap.ts` contains published static routes and derives lesson URLs from `content/lessons`.
- `app/robots.ts` publishes crawler rules and the sitemap URL.
- `app/manifest.ts` publishes the web-app manifest.

When a new public route is added, add it to the sitemap unless it is already generated from a registry.

## Quality checks

Run:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

The tests verify canonical URLs, structured data, sitemap coverage, robots rules, and manifest availability.
