import { lessons } from "@/content/lesson-registry";
import { mechanisms } from "@/content/mechanisms/mechanism-registry";
import { molecules } from "@/content/molecules/molecule-registry";
import { reactions } from "@/content/reactions/reaction-registry";
import type { ReagentDefinition } from "./reagent-types";

export type ReagentValidationIssueCode =
  | "duplicate-id"
  | "duplicate-slug"
  | "duplicate-alias"
  | "missing-reaction"
  | "missing-mechanism"
  | "missing-molecule"
  | "missing-lesson"
  | "reaction-mechanism-mismatch"
  | "empty-keywords";

export type ReagentValidationIssue = {
  code: ReagentValidationIssueCode;
  reagentId: string;
  message: string;
};

export function validateReagents(values: readonly ReagentDefinition[]): readonly ReagentValidationIssue[] {
  const issues: ReagentValidationIssue[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const aliases = new Map<string, string>();
  const reactionMap = new Map(reactions.map((reaction) => [reaction.id, reaction]));
  const mechanismMap = new Map(mechanisms.map((mechanism) => [mechanism.id, mechanism]));
  const moleculeIds = new Set<string>(molecules.map((molecule) => molecule.id));
  const lessonIds = new Set(lessons.map((lesson) => lesson.slug));

  for (const reagent of values) {
    if (ids.has(reagent.id)) issues.push({ code: "duplicate-id", reagentId: reagent.id, message: `Duplicate reagent id: ${reagent.id}` });
    ids.add(reagent.id);
    if (slugs.has(reagent.slug)) issues.push({ code: "duplicate-slug", reagentId: reagent.id, message: `Duplicate reagent slug: ${reagent.slug}` });
    slugs.add(reagent.slug);

    for (const alias of [reagent.name, reagent.id, reagent.slug, ...reagent.aliases]) {
      const key = alias.trim().toLowerCase();
      const owner = aliases.get(key);
      if (owner && owner !== reagent.id) issues.push({ code: "duplicate-alias", reagentId: reagent.id, message: `Alias ${alias} is already used by ${owner}.` });
      else aliases.set(key, reagent.id);
    }

    for (const reactionId of reagent.reactionIds) {
      if (!reactionMap.has(reactionId)) issues.push({ code: "missing-reaction", reagentId: reagent.id, message: `Unknown reaction ${reactionId}.` });
    }
    for (const mechanismId of reagent.mechanismIds) {
      const mechanism = mechanismMap.get(mechanismId);
      if (!mechanism) issues.push({ code: "missing-mechanism", reagentId: reagent.id, message: `Unknown mechanism ${mechanismId}.` });
      else if (!reagent.reactionIds.includes(mechanism.reactionId)) issues.push({ code: "reaction-mechanism-mismatch", reagentId: reagent.id, message: `Mechanism ${mechanismId} belongs to reaction ${mechanism.reactionId}, which is not listed by this reagent.` });
    }
    for (const moleculeId of reagent.moleculeIds) {
      if (!moleculeIds.has(moleculeId)) issues.push({ code: "missing-molecule", reagentId: reagent.id, message: `Unknown molecule ${moleculeId}.` });
    }
    for (const lessonId of reagent.lessonIds) {
      if (!lessonIds.has(lessonId)) issues.push({ code: "missing-lesson", reagentId: reagent.id, message: `Unknown lesson ${lessonId}.` });
    }
    if (reagent.keywords.length === 0) issues.push({ code: "empty-keywords", reagentId: reagent.id, message: "Searchable reagent has no keywords." });
  }

  return issues;
}
