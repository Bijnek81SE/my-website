import { lessons } from "@/content/lessons";
import { platformFeatures } from "@/content/platform";
import { functionalGroups } from "@/content/references";
import { reagents } from "@/content/reagents/reagent-registry";
import { mechanisms } from "@/content/mechanisms/mechanism-registry";
import type { ReactionDefinition } from "./reaction-types";

export type ReactionValidationIssueCode =
  | "duplicate-id" | "duplicate-alias" | "duplicate-route" | "missing-feature"
  | "route-mismatch" | "missing-mechanism" | "mechanism-mismatch" | "missing-functional-group" | "missing-reagent"
  | "missing-related-reaction" | "missing-prerequisite" | "self-reference";

export type ReactionValidationIssue = { code: ReactionValidationIssueCode; reactionId: string; message: string };

export function validateReactions(values: readonly ReactionDefinition[]): readonly ReactionValidationIssue[] {
  const issues: ReactionValidationIssue[] = [];
  const ids = new Set<string>();
  const aliases = new Map<string, string>();
  const routes = new Map<string, string>();
  const allIds = new Set(values.map((reaction) => reaction.id));
  const features = new Map(platformFeatures.map((feature) => [feature.id, feature]));
  const functionalGroupIds = new Set(functionalGroups.map((entry) => entry.slug));
  const reagentIds = new Set<string>(reagents.map((entry) => entry.slug));
  const lessonNodeIds = new Set(lessons.map((lesson) => `lesson:${lesson.slug}`));
  const mechanismMap = new Map(mechanisms.map((mechanism) => [mechanism.id, mechanism]));

  for (const reaction of values) {
    if (ids.has(reaction.id)) issues.push({ code: "duplicate-id", reactionId: reaction.id, message: `Duplicate reaction id: ${reaction.id}` });
    ids.add(reaction.id);
    for (const alias of [reaction.title, reaction.shortTitle, ...reaction.aliases]) {
      const key = alias.trim().toLowerCase();
      const owner = aliases.get(key);
      if (owner && owner !== reaction.id) issues.push({ code: "duplicate-alias", reactionId: reaction.id, message: `Alias ${alias} is already used by ${owner}.` });
      else aliases.set(key, reaction.id);
    }
    const mechanism = mechanismMap.get(reaction.mechanismId);
    if (!mechanism) issues.push({ code: "missing-mechanism", reactionId: reaction.id, message: `Unknown mechanism ${reaction.mechanismId}.` });
    else if (mechanism.reactionId !== reaction.id || mechanism.href !== reaction.mechanismHref) issues.push({ code: "mechanism-mismatch", reactionId: reaction.id, message: `Mechanism ${mechanism.id} does not point back to reaction ${reaction.id} and route ${reaction.mechanismHref}.` });
    const feature = features.get(reaction.featureId);
    if (!feature) issues.push({ code: "missing-feature", reactionId: reaction.id, message: `Unknown platform feature ${reaction.featureId}.` });
    else if (feature.href !== reaction.mechanismHref) issues.push({ code: "route-mismatch", reactionId: reaction.id, message: `Feature ${reaction.featureId} points to ${feature.href}, not ${reaction.mechanismHref}.` });
    const routeOwner = routes.get(reaction.mechanismHref);
    if (routeOwner && routeOwner !== reaction.id) issues.push({ code: "duplicate-route", reactionId: reaction.id, message: `Mechanism route ${reaction.mechanismHref} is also used by ${routeOwner}.` });
    else routes.set(reaction.mechanismHref, reaction.id);
    for (const id of [...reaction.substrateFunctionalGroupIds, ...reaction.productFunctionalGroupIds]) if (!functionalGroupIds.has(id)) issues.push({ code: "missing-functional-group", reactionId: reaction.id, message: `Unknown functional group ${id}.` });
    for (const id of reaction.reagentIds) if (!reagentIds.has(id)) issues.push({ code: "missing-reagent", reactionId: reaction.id, message: `Unknown reagent ${id}.` });
    for (const id of [...reaction.relatedReactionIds, ...reaction.competingReactionIds]) {
      if (id === reaction.id) issues.push({ code: "self-reference", reactionId: reaction.id, message: "Reaction cannot reference itself." });
      else if (!allIds.has(id)) issues.push({ code: "missing-related-reaction", reactionId: reaction.id, message: `Unknown related reaction ${id}.` });
    }
    for (const nodeId of reaction.prerequisiteNodeIds) if (!lessonNodeIds.has(nodeId)) issues.push({ code: "missing-prerequisite", reactionId: reaction.id, message: `Unknown prerequisite ${nodeId}.` });
  }
  return issues;
}
