import atomicStructure from "./records/atomic-structure";
import chemicalBonding from "./records/chemical-bonding";
import formalCharge from "./records/formal-charge";
import hybridization from "./records/hybridization";
import lewisStructures from "./records/lewis-structures";
import resonance from "./records/resonance";
import whatIsOrganicChemistry from "./records/what-is-organic-chemistry";
import type { LessonDefinition, LessonDefinitionInput, LessonLink, LessonModule } from "./lesson-types";

const lessonInputs: readonly LessonDefinitionInput[] = [
  whatIsOrganicChemistry,
  atomicStructure,
  chemicalBonding,
  hybridization,
  lewisStructures,
  formalCharge,
  resonance,
].sort((a, b) => a.order - b.order);

function linkFor(lesson: LessonDefinitionInput): LessonLink {
  return { title: lesson.title, href: `/learn/${lesson.moduleId}/${lesson.slug}` };
}

export const lessons: readonly LessonDefinition[] = lessonInputs.map((lesson, index) => ({
  ...lesson,
  readingTime: `${lesson.estimatedMinutes} min`,
  href: `/learn/${lesson.moduleId}/${lesson.slug}`,
  previous: index === 0 ? { title: "Curriculum", href: "/learn" } : linkFor(lessonInputs[index - 1]),
  next: index < lessonInputs.length - 1 ? linkFor(lessonInputs[index + 1]) : undefined,
}));

const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
const bySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));
const byHref = new Map(lessons.map((lesson) => [lesson.href, lesson]));

export function getLesson(id: string): LessonDefinition | undefined { return byId.get(id); }
export function getLessonBySlug(slug: string): LessonDefinition {
  const lesson = bySlug.get(slug);
  if (!lesson) throw new Error(`Unknown lesson slug: ${slug}`);
  return lesson;
}
export function getLessonByHref(href: string): LessonDefinition | undefined { return byHref.get(href as `/${string}`); }
export function getLessonsByModule(module: LessonModule): readonly LessonDefinition[] { return lessons.filter((lesson) => lesson.module === module); }
export function getLessonsByCapability(capability: keyof LessonDefinition["capabilities"]): readonly LessonDefinition[] { return lessons.filter((lesson) => lesson.capabilities[capability]); }
export function getLessonPosition(slug: string): { current: number; total: number; percentage: number } {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  if (index < 0) throw new Error(`Unknown lesson slug: ${slug}`);
  const current = index + 1;
  return { current, total: lessons.length, percentage: Math.round((current / lessons.length) * 100) };
}
