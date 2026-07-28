# Lab framework

Reusable components for interactive learning tools live in `components/lab`.

## Components

- `LabShell`: page-level lab layout with optional sidebar.
- `ExerciseCard`: shared exercise container.
- `ProgressBar`: exercise progress.
- `ScoreBadge`: current score.
- `HintPanel`: accessible show/hide hint.
- `FeedbackPanel`: idle, information, success, and error feedback.
- `ChallengeFooter`: reset and next controls.

## Interaction rules

1. Ask the learner to make a decision before revealing the answer.
2. Explain why an answer is correct or incorrect.
3. Keep hints optional.
4. Do not use colour as the only feedback signal.
5. Make controls keyboard accessible.
6. Reuse these components instead of creating tool-specific versions.
