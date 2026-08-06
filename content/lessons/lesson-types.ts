export type LessonModuleId = "fundamentals";
export type LessonModule = "Fundamentals";
export type LessonDifficulty = "introductory" | "intermediate" | "advanced";

export type LessonLink = {
  title: string;
  href: string;
};

export type LessonCapabilities = {
  public: boolean;
  searchable: boolean;
  sitemap: boolean;
  studyDashboard: boolean;
  recommendations: boolean;
  workspace: boolean;
};

export type LessonDefinitionInput = {
  id: string;
  slug: string;
  moduleId: LessonModuleId;
  module: LessonModule;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: LessonDifficulty;
  learningObjectives: readonly string[];
  prerequisiteLessonIds: readonly string[];
  moleculeIds: readonly string[];
  reactionIds: readonly string[];
  mechanismIds: readonly string[];
  reagentIds: readonly string[];
  spectroscopyDatasetIds: readonly string[];
  keywords: readonly string[];
  capabilities: LessonCapabilities;
};

export type LessonDefinition = LessonDefinitionInput & {
  readingTime: string;
  href: `/${string}`;
  previous?: LessonLink;
  next?: LessonLink;
};

export type LessonRecord = LessonDefinition;

export function defineLesson<const T extends LessonDefinitionInput>(lesson: T): T {
  return lesson;
}
