import { lessons } from "@/content/lessons";
import { getSearchablePlatformFeatures } from "@/content/platform";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";

export type SearchCategory = "Lesson" | "Mechanism" | "Lab" | "Calculator" | "Reference" | "Site";
export type SearchEntry = { id: string; title: string; description: string; href: string; category: SearchCategory; keywords: readonly string[] };

const lessonEntries: readonly SearchEntry[] = lessons.filter((lesson) => lesson.capabilities.searchable).map((lesson) => ({
  id: `lesson-${lesson.id}`, title: lesson.title, description: lesson.description, href: lesson.href, category: "Lesson", keywords: [lesson.module, lesson.slug.replaceAll("-", " "), ...lesson.keywords],
}));
const referenceEntries: readonly SearchEntry[] = [
  ...functionalGroups.map((entry) => ({ id: `functional-group-${entry.slug}`, title: entry.name, description: entry.summary, href: `/functional-groups/${entry.slug}`, category: "Reference" as const, keywords: [entry.formula, entry.category, ...entry.keywords] })),
  ...reagents.filter((entry) => entry.capabilities.reference).map((entry) => ({ id: `reagent-${entry.id}`, title: entry.name, description: entry.summary, href: `/reagents/${entry.slug}`, category: "Reference" as const, keywords: [entry.formula, entry.category, ...entry.aliases, ...entry.keywords] })),
];
const platformEntries: readonly SearchEntry[] = getSearchablePlatformFeatures().map((feature) => ({
  id: `feature-${feature.id}`, title: feature.title, description: feature.description, href: feature.href, category: feature.search!.category, keywords: feature.search!.keywords,
}));

export const searchEntries: readonly SearchEntry[] = [...lessonEntries, ...referenceEntries, ...platformEntries]
  .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.href === entry.href && candidate.title === entry.title) === index);

function normalize(value: string): string { return value.toLocaleLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function scoreEntry(entry: SearchEntry, tokens: readonly string[], query: string): number {
  const title = normalize(entry.title); const description = normalize(entry.description); const keywords = normalize(entry.keywords.join(" ")); const category = normalize(entry.category); let score = 0;
  if (title === query) score += 120; if (title.startsWith(query)) score += 70; if (title.includes(query)) score += 45;
  for (const token of tokens) { if (title.split(" ").includes(token)) score += 30; else if (title.includes(token)) score += 18; if (keywords.includes(token)) score += 10; if (description.includes(token)) score += 5; if (category.includes(token)) score += 3; }
  return score;
}
export function searchContent(query: string, limit = 8): readonly SearchEntry[] {
  const normalizedQuery = normalize(query); if (!normalizedQuery) return []; const tokens = normalizedQuery.split(" ").filter(Boolean);
  return searchEntries.map((entry) => ({ entry, score: scoreEntry(entry, tokens, normalizedQuery) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, limit).map(({ entry }) => entry);
}
