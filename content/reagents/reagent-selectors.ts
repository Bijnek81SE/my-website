import { reagents } from "./reagent-registry";
import type { ReagentCapabilities, ReagentCategory, ReagentDefinition } from "./reagent-types";

export type ReagentSelector = {
  query?: string;
  category?: ReagentCategory;
  capability?: keyof ReagentCapabilities;
  reactionId?: string;
  mechanismId?: string;
  moleculeId?: string;
  lessonId?: string;
};

export function selectReagents(selector: ReagentSelector = {}): readonly ReagentDefinition[] {
  const query = selector.query?.trim().toLowerCase();
  return reagents.filter((reagent) => {
    if (selector.category && reagent.category !== selector.category) return false;
    if (selector.capability && !reagent.capabilities[selector.capability]) return false;
    if (selector.reactionId && !reagent.reactionIds.some((id) => id === selector.reactionId)) return false;
    if (selector.mechanismId && !reagent.mechanismIds.some((id) => id === selector.mechanismId)) return false;
    if (selector.moleculeId && !reagent.moleculeIds.some((id) => id === selector.moleculeId)) return false;
    if (selector.lessonId && !reagent.lessonIds.some((id) => id === selector.lessonId)) return false;
    if (!query) return true;
    const haystack = [
      reagent.id,
      reagent.slug,
      reagent.name,
      reagent.formula,
      reagent.category,
      reagent.summary,
      reagent.purpose,
      ...reagent.aliases,
      ...reagent.keywords,
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

export function getReagentCategories(): readonly ReagentCategory[] {
  return [...new Set(reagents.map((reagent) => reagent.category))].sort();
}

export function getReagentsByCapability(capability: keyof ReagentCapabilities): readonly ReagentDefinition[] {
  return selectReagents({ capability });
}
