export type PracticeFeedback = "idle" | "correct" | "incorrect";

export type PracticeQuestion<TTarget extends string = string> = {
  id: string;
  title: string;
  description: string;
  instruction: string;
  correctTarget: TTarget;
  incorrectFeedback: string;
  correctExplanation: string;
};