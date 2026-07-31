export type MasteryLevelId =
  | "foundation"
  | "developing"
  | "proficient"
  | "advanced"
  | "mastered";

export type MasteryLevel = {
  id: MasteryLevelId;
  title: string;
  description: string;
  minimumPoints: number;
};

export type MasteryProgress = {
  points: number;
  level: MasteryLevel;
  nextLevel?: MasteryLevel;
  pointsToNextLevel: number;
  completedSessions: number;
  completedExams: number;
  bestExamScore: number;
  averageAccuracy: number;
  unlockedAchievements: number;
};