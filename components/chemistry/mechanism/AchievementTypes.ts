export type PracticeAchievementId =
  | "first-correct"
  | "perfect-run"
  | "no-hints"
  | "persistence"
  | "mastery";

export type PracticeAchievement = {
  id: PracticeAchievementId;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};