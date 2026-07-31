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

export type PracticeSessionStats = {
  totalQuestions: number;
  completedQuestions: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  score: number;
  stars: number;
  completed: boolean;
};