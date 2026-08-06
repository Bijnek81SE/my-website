# MDX content guide

Sprint 1.3 introduces MDX through one pilot lesson: **Atomic Structure**.
Existing lesson URLs and the shared lesson layout remain unchanged.

## Architecture

```text
app/learn/fundamentals/atomic-structure/page.tsx
content/fundamentals/atomic-structure.mdx
content/lessons
mdx-components.tsx
```

The route file owns page metadata and the `LessonPage` wrapper. The MDX file
owns lesson content and the table of contents. Shared information such as title,
description, reading time, and previous/next navigation lives in the registry.

## Writing a section

```mdx
<LessonSection id="atomic-number" title="Atomic number">
  The **atomic number** is the number of protons in an atom.

  <RememberBox title="Remember">
    Changing the proton count changes the element.
  </RememberBox>
</LessonSection>
```

## Rules

1. Use a stable kebab-case `id` for each section.
2. Add every section to the exported `tableOfContents` array.
3. Use Markdown for paragraphs, emphasis, and simple lists.
4. Use React lesson components for objectives, examples, callouts, practice,
   summaries, and references.
5. Keep route metadata in `content/lessons` rather than duplicating it.
6. Migrate one lesson at a time and run a production build after each migration.

## Adding MDX dependencies

The project uses the official Next.js MDX plugin. After installing this sprint,
run `npm install` so `package-lock.json` is regenerated with the MDX packages.

## Implemented pilot

The Resonance lesson is the first production MDX lesson:

- Route wrapper: `app/learn/fundamentals/resonance/page.tsx`
- Lesson content: `app/learn/fundamentals/resonance/content.mdx`
- Shared MDX element styles: `mdx-components.tsx`

The route wrapper owns metadata, the lesson registry lookup, table-of-contents data,
and the shared `LessonPage` shell. The MDX file owns lesson prose, semantic Markdown,
and embedded interactive React chemistry components. This separation preserves the
existing URL and metadata while making the lesson content easier to author.
