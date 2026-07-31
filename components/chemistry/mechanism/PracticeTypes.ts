import type { PracticeAchievement } from "./AchievementTypes";
import type { PracticeHint } from "./HintTypes";
import type { MechanismQuestionTopic } from "./QuestionEngine";

export type PracticeSessionMode = "practice" | "exam";

export type PracticeFeedback =
  | "idle"
  | "correct"
  | "incorrect"
  | "revealed";

export type PracticeQuestion<TTarget extends string = string> = {
  id: string;
  title: string;
  description: string;
  instruction: string;
  correctTarget: TTarget;
  incorrectFeedback: string;
  correctExplanation: string;
  topic: MechanismQuestionTopic;
  hints?: PracticeHint[];
};

export type PracticeSessionStats = {
  totalQuestions: number;
  completedQuestions: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  hintsUsed: number;
  revealedAnswers: number;
  accuracy: number;
  score: number;
  stars: number;
  completed: boolean;
  achievements: PracticeAchievement[];
};