import type { LessonDefinition } from "./lesson-types";

export type LessonValidationIssue = { code: string; message: string; lessonId?: string };

export function validateLessons(lessons: readonly LessonDefinition[]): readonly LessonValidationIssue[] {
  const issues: LessonValidationIssue[] = [];
  const ids = new Set<string>(); const slugs = new Set<string>(); const hrefs = new Set<string>();
  for (const lesson of lessons) {
    if (ids.has(lesson.id)) issues.push({ code: "duplicate-id", message: `Duplicate lesson id: ${lesson.id}`, lessonId: lesson.id });
    if (slugs.has(lesson.slug)) issues.push({ code: "duplicate-slug", message: `Duplicate lesson slug: ${lesson.slug}`, lessonId: lesson.id });
    if (hrefs.has(lesson.href)) issues.push({ code: "duplicate-href", message: `Duplicate lesson href: ${lesson.href}`, lessonId: lesson.id });
    ids.add(lesson.id); slugs.add(lesson.slug); hrefs.add(lesson.href);
    if (lesson.estimatedMinutes <= 0) issues.push({ code: "invalid-duration", message: `Lesson ${lesson.id} must have a positive duration.`, lessonId: lesson.id });
    if (lesson.capabilities.searchable && lesson.keywords.length === 0) issues.push({ code: "missing-keywords", message: `Searchable lesson ${lesson.id} needs keywords.`, lessonId: lesson.id });
  }
  for (const lesson of lessons) for (const prerequisiteId of lesson.prerequisiteLessonIds) {
    if (!ids.has(prerequisiteId)) issues.push({ code: "missing-prerequisite", message: `Lesson ${lesson.id} references missing prerequisite ${prerequisiteId}.`, lessonId: lesson.id });
    if (prerequisiteId === lesson.id) issues.push({ code: "self-prerequisite", message: `Lesson ${lesson.id} cannot require itself.`, lessonId: lesson.id });
  }
  return issues;
}
