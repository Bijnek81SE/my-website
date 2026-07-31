import type { PracticeSessionMode } from "./PracticeTypes";

export type PracticeAnalyticsRecord = {
  id: string;
  mechanismId: string;
  mechanismTitle: string;
  mode: PracticeSessionMode;
  completedAt: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  hintsUsed: number;
  revealedAnswers: number;
  accuracy: number;
  score: number;
  stars: number;
};

export type PracticeAnalyticsSummary = {
  totalSessions: number;
  practiceSessions: number;
  examSessions: number;
  averageScore: number;
  averageAccuracy: number;
  bestScore: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  masteredSessions: number;
};