# Study Dashboard

The study dashboard at `/study` turns the adaptive-learning engine into a visible learner workspace.

## Features

- Fundamentals completion percentage
- Current and longest study streaks
- Due-review queue powered by spaced repetition
- Recommended next lesson
- Recent lesson and mechanism activity
- Estimated Fundamentals study time remaining
- Browser-local progress reset

## Persistence

Progress is stored in `localStorage` under:

`organic-chemistry-hub:learning-progress:v1`

No account or server-side profile is required. Clearing browser storage removes the dashboard history.

## Integration points

- `components/Lesson/LessonPage.tsx` records lesson completion.
- `components/chemistry/mechanism/MechanismPlayerEngine.tsx` records mechanism practice.
- `content/knowledge-graph.ts` resolves progress records to their destination routes.
- `components/search/SearchIndex.ts` exposes the dashboard to global search.
