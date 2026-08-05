# Adaptive learning platform

Organic Chemistry Hub stores study progress locally in the learner's browser. No account or server-side profile is required.

## Progress model

Each lesson or mechanism activity is stored by its knowledge-graph node ID. Records contain completion state, study attempts, last-study time, and spaced-repetition scheduling data.

## Lesson integration

`StudySession` appears in every lesson through `components/Lesson/LessonPage.tsx`. Learners can mark a lesson complete, review it again, and schedule a future review.

## Mechanism integration

Every mechanism player includes a study session keyed to its mechanism node. Recording practice contributes to streak and recommendation data.

## Recommendations

`StudyRecommendations` uses lesson order and stored progress to show:

- due reviews
- the next incomplete Fundamentals lesson
- completed and in-progress totals
- the current local study streak

## Privacy

Progress is stored under `organic-chemistry-hub:learning-progress:v1` in `localStorage`. Clearing browser storage removes it.

## Testing

Pure scheduling and progress logic are covered by unit tests. The study-session component is covered with React Testing Library.
