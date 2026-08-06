import { lessons } from "./lesson-registry";
import type { LessonDefinition, LessonDifficulty } from "./lesson-types";

export type LessonQuery = {
  query?: string;
  difficulty?: LessonDifficulty;
  moleculeId?: string;
  reactionId?: string;
  mechanismId?: string;
  reagentId?: string;
  spectroscopyDatasetId?: string;
};

export function selectLessons(query: LessonQuery = {}): readonly LessonDefinition[] {
  const needle = query.query?.trim().toLowerCase();
  return lessons.filter((lesson) => {
    if (query.difficulty && lesson.difficulty !== query.difficulty) return false;
    if (query.moleculeId && !lesson.moleculeIds.includes(query.moleculeId)) return false;
    if (query.reactionId && !lesson.reactionIds.includes(query.reactionId)) return false;
    if (query.mechanismId && !lesson.mechanismIds.includes(query.mechanismId)) return false;
    if (query.reagentId && !lesson.reagentIds.includes(query.reagentId)) return false;
    if (query.spectroscopyDatasetId && !lesson.spectroscopyDatasetIds.includes(query.spectroscopyDatasetId)) return false;
    if (!needle) return true;
    return [lesson.title, lesson.description, lesson.slug, ...lesson.keywords, ...lesson.learningObjectives].join(" ").toLowerCase().includes(needle);
  });
}
