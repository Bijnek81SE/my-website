import { lessons } from "@/content/lessons";
import { getSemanticGraphConnections, recommendSemanticGraphNodes } from "./semantic-graph-selectors";

export function getSemanticPrerequisiteLessonIds(lessonId: string): readonly string[] {
  return getSemanticGraphConnections({
    entityId: `lesson:${lessonId}`,
    direction: "outgoing",
    semantics: ["requires-prerequisite"],
    targetKinds: ["lesson"],
    includeInferred: false,
  }).map((connection) => connection.node.id);
}

export function getSemanticStudyNextLessonIds(lessonId: string): readonly string[] {
  return getSemanticGraphConnections({
    entityId: `lesson:${lessonId}`,
    direction: "outgoing",
    semantics: ["study-next"],
    targetKinds: ["lesson"],
    includeInferred: false,
  }).map((connection) => connection.node.id);
}

export function recommendNextLessonIds(
  studiedNodeIds: readonly string[],
  completedNodeIds: readonly string[],
  limit = 3,
): readonly string[] {
  const excluded = new Set(completedNodeIds);
  const recommendations = recommendSemanticGraphNodes({
    sourceIds: studiedNodeIds,
    targetKinds: ["lesson"],
    excludeIds: completedNodeIds,
    maxDepth: 2,
    limit: Math.max(limit * 2, 6),
  });

  const ranked = recommendations
    .filter(({ node }) => {
      const lesson = lessons.find((entry) => `lesson:${entry.id}` === node.id);
      if (!lesson || !lesson.capabilities.recommendations) return false;
      return lesson.prerequisiteLessonIds.every((id) => excluded.has(`lesson:${id}`));
    })
    .map(({ node }) => node.id);

  if (ranked.length >= limit) return ranked.slice(0, limit);

  const fallback = lessons
    .filter((lesson) => lesson.capabilities.recommendations)
    .filter((lesson) => !excluded.has(`lesson:${lesson.id}`))
    .filter((lesson) => lesson.prerequisiteLessonIds.every((id) => excluded.has(`lesson:${id}`)))
    .map((lesson) => `lesson:${lesson.id}`)
    .filter((id) => !ranked.includes(id));

  return [...ranked, ...fallback].slice(0, limit);
}
