import { lessons } from "@/content/lesson-registry";
import { platformFeatures } from "@/content/platform";
import { reactions } from "@/content/reactions";
import type { MechanismDefinition } from "./mechanism-types";

export type MechanismValidationIssueCode =
  | "duplicate-id" | "duplicate-alias" | "duplicate-route" | "duplicate-player"
  | "missing-reaction" | "missing-feature" | "route-mismatch" | "reaction-mismatch"
  | "missing-prerequisite";
export type MechanismValidationIssue = { code: MechanismValidationIssueCode; mechanismId: string; message: string };

export function validateMechanisms(values: readonly MechanismDefinition[]): readonly MechanismValidationIssue[] {
  const issues: MechanismValidationIssue[] = [];
  const ids = new Set<string>();
  const aliases = new Map<string, string>();
  const routes = new Map<string, string>();
  const players = new Map<string, string>();
  const reactionMap = new Map(reactions.map((reaction) => [reaction.id, reaction]));
  const featureMap = new Map(platformFeatures.map((feature) => [feature.id, feature]));
  const lessonNodeIds = new Set(lessons.map((lesson) => `lesson:${lesson.slug}`));

  for (const mechanism of values) {
    if (ids.has(mechanism.id)) issues.push({ code: "duplicate-id", mechanismId: mechanism.id, message: `Duplicate mechanism id: ${mechanism.id}` });
    ids.add(mechanism.id);
    for (const alias of [mechanism.title, mechanism.shortTitle, ...mechanism.aliases]) {
      const key = alias.trim().toLowerCase(); const owner = aliases.get(key);
      if (owner && owner !== mechanism.id) issues.push({ code: "duplicate-alias", mechanismId: mechanism.id, message: `Alias ${alias} is already used by ${owner}.` });
      else aliases.set(key, mechanism.id);
    }
    const routeOwner = routes.get(mechanism.href);
    if (routeOwner && routeOwner !== mechanism.id) issues.push({ code: "duplicate-route", mechanismId: mechanism.id, message: `Route ${mechanism.href} is also used by ${routeOwner}.` });
    else routes.set(mechanism.href, mechanism.id);
    const playerOwner = players.get(mechanism.playerId);
    if (playerOwner && playerOwner !== mechanism.id) issues.push({ code: "duplicate-player", mechanismId: mechanism.id, message: `Player ${mechanism.playerId} is also used by ${playerOwner}.` });
    else players.set(mechanism.playerId, mechanism.id);
    const reaction = reactionMap.get(mechanism.reactionId);
    if (!reaction) issues.push({ code: "missing-reaction", mechanismId: mechanism.id, message: `Unknown reaction ${mechanism.reactionId}.` });
    else if (reaction.mechanismId !== mechanism.id || reaction.mechanismHref !== mechanism.href) issues.push({ code: "reaction-mismatch", mechanismId: mechanism.id, message: `Reaction ${reaction.id} does not point back to this mechanism and route.` });
    const feature = featureMap.get(mechanism.featureId);
    if (!feature) issues.push({ code: "missing-feature", mechanismId: mechanism.id, message: `Unknown platform feature ${mechanism.featureId}.` });
    else if (feature.href !== mechanism.href) issues.push({ code: "route-mismatch", mechanismId: mechanism.id, message: `Feature ${feature.id} points to ${feature.href}, not ${mechanism.href}.` });
    for (const nodeId of mechanism.prerequisiteNodeIds) if (!lessonNodeIds.has(nodeId)) issues.push({ code: "missing-prerequisite", mechanismId: mechanism.id, message: `Unknown prerequisite ${nodeId}.` });
  }
  return issues;
}
