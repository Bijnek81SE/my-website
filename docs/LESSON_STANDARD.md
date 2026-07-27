# Lesson Standard

This document defines the default structure for Organic Chemistry Hub lessons.
The goal is to keep lessons consistent, readable, accessible, and ready for a
future MDX migration.

## Recommended order

1. Overview and primary visual
2. Learning objectives
3. Core concept sections
4. Worked example
5. Remember or key-rule callout
6. Common mistakes
7. Summary
8. Practice questions
9. References
10. Previous and next navigation

Not every lesson needs every block, but the order should remain predictable.

## Reusable components

Import lesson components from the barrel file:

```tsx
import {
  CommonMistakes,
  LearningObjectives,
  LessonNavigation,
  LessonPage,
  LessonSection,
  PracticeQuestions,
  References,
  RememberBox,
  SummaryBox,
  WorkedExample,
} from "@/components/Lesson";
```

### LearningObjectives

Use a short list of measurable outcomes. Begin each item with a verb such as
identify, explain, compare, calculate, predict, or draw.

### WorkedExample

Use for a complete question-to-answer calculation or reasoning sequence. Keep
the title specific to the task.

### RememberBox

Use for one rule, equation, distinction, or high-value takeaway. Do not stack
several unrelated ideas in the same box.

### CommonMistakes

Describe the incorrect idea and then state the correction. Keep the tone
instructional rather than punitive.

### PracticeQuestions

Questions should follow the order of the lesson and move from recall toward
application. Answers will be introduced in a later interactive sprint.

### SummaryBox

Summarise the lesson in one concise paragraph. Do not introduce new concepts.

### References

Use reliable textbooks, primary standards, or authoritative scientific
resources. Keep the citation format consistent within a lesson.

## Writing rules

- Use sentence case for headings.
- Introduce a term before using its abbreviation.
- Prefer short paragraphs and concrete examples.
- Explain the limits of simplified models.
- Place a diagram beside the concept it explains.
- Use chemical notation consistently.
- Avoid decorative visuals that do not teach a specific idea.

## Accessibility

- Every informative image needs descriptive alternative text.
- Do not communicate meaning through colour alone.
- Preserve heading order.
- Keep tables readable on narrow screens using horizontal scrolling.
- Use real lists for objectives, steps, questions, and references.

## MDX readiness

Lesson-specific chemistry belongs in content. Layout and repeated presentation
belong in components. Avoid embedding page-specific styling in new content when
a reusable lesson component can express the same structure.
