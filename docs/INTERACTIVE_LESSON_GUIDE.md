# Interactive lesson guide

The Fundamentals module uses shared lesson components so practice and worked examples behave consistently across every lesson.

## Interactive practice

Use `PracticeQuestions` with structured question objects when immediate feedback is appropriate.

```tsx
<PracticeQuestions
  questions={[
    {
      id: "carbon-valence",
      prompt: "How many valence electrons does carbon have?",
      type: "multiple-choice",
      options: ["2", "4", "6", "8"],
      answer: "4",
      explanation: "Carbon has four electrons in its outer shell.",
      hint: "Look at carbon's group number.",
    },
  ]}
/>
```

Supported question types are `multiple-choice` and `short-answer`. Short-answer questions may provide an array of accepted answers. Matching ignores capitalization, repeated spaces, and the difference between hyphens and dash characters.

Every question must have:

- a stable, lesson-unique `id`
- a concise prompt
- an answer
- an explanation that teaches the underlying idea
- options when the type is `multiple-choice`

Hints are optional. They should guide reasoning without simply revealing the answer.

## Worked examples

`WorkedExample` now includes an accessible reveal control. Existing examples remain open by default. Set `defaultOpen={false}` when the learner should attempt the problem before viewing the solution.

```tsx
<WorkedExample title="Calculate a formal charge" defaultOpen={false}>
  <p>Step-by-step solution content.</p>
</WorkedExample>
```

## Accessibility requirements

- Every interaction must work with a keyboard.
- Feedback must not rely on colour alone.
- Correct and incorrect feedback must explain why.
- Controls require visible focus styles.
- Do not auto-advance or animate essential content.
- Keep question wording independent of visual position such as “the item on the left.”

## Authoring principles

Interactive practice should reinforce the lesson's highest-value decisions, not merely repeat definitions. Prefer four to six focused questions per lesson. Use a mix of recognition, calculation, and explanation prompts.
