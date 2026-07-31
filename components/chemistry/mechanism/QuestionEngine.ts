import type { PracticeHint } from "./HintTypes";

export type MechanismQuestionTopic =
  | "Nucleophiles and bases"
  | "Leaving groups"
  | "Reaction intermediates"
  | "Curved arrows"
  | "Bond changes"
  | "Products"
  | "Mechanism fundamentals";

export type MechanismQuestion<
  TTarget extends string = string,
> = {
  id: string;
  title: string;
  description: string;
  instruction: string;
  correctTarget: TTarget;
  incorrectFeedback: string;
  correctExplanation: string;
  hints?: PracticeHint[];
  topic: MechanismQuestionTopic;
};

export function defineMechanismQuestions<
  TTarget extends string,
>(
  questions: readonly MechanismQuestion<TTarget>[],
): MechanismQuestion<TTarget>[] {
  const ids = new Set<string>();

  for (const question of questions) {
    if (ids.has(question.id)) {
      throw new Error(
        `Duplicate mechanism question id: ${question.id}`,
      );
    }

    ids.add(question.id);
  }

  return [...questions];
}
