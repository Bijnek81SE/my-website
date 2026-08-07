import type { LessonDefinition, LessonDefinitionInput, LessonLink } from "./lesson-types";

function linkFor(lesson: LessonDefinitionInput): LessonLink {
  return { title: lesson.title, href: `/learn/${lesson.moduleId}/${lesson.slug}` };
}

export function materializeLessons(
  values: readonly LessonDefinitionInput[],
): readonly LessonDefinition[] {
  const ordered = [...values].sort((a, b) => a.order - b.order);
  return ordered.map((lesson, index) => ({
    ...lesson,
    readingTime: `${lesson.estimatedMinutes} min`,
    href: `/learn/${lesson.moduleId}/${lesson.slug}`,
    previous: index === 0 ? { title: "Curriculum", href: "/learn" } : linkFor(ordered[index - 1]),
    next: index < ordered.length - 1 ? linkFor(ordered[index + 1]) : undefined,
  }));
}
