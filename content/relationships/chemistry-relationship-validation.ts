import { lessons } from "@/content/lessons";
import { mechanisms } from "@/content/mechanisms";
import { molecules } from "@/content/molecules";
import { reactions } from "@/content/reactions";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";
import { spectroscopyDatasets } from "@/content/spectroscopy";
import type { ChemistryEntityId, ChemistryRelationship } from "./chemistry-relationship-types";

export type ChemistryRelationshipIssue = {
  code: string;
  relationshipId: string;
  message: string;
};

export function getCanonicalChemistryEntityIds(): ReadonlySet<ChemistryEntityId> {
  return new Set<ChemistryEntityId>([
    ...lessons.map((item) => `lesson:${item.id}` as const),
    ...mechanisms.map((item) => `mechanism:${item.id}` as const),
    ...reactions.map((item) => `reaction:${item.id}` as const),
    ...reagents.map((item) => `reagent:${item.id}` as const),
    ...molecules.map((item) => `molecule:${item.id}` as const),
    ...spectroscopyDatasets.map((item) => `spectroscopy:${item.id}` as const),
    ...functionalGroups.map((item) => `functional-group:${item.slug}` as const),
  ]);
}

export function validateChemistryRelationships(
  relationships: readonly ChemistryRelationship[],
): ChemistryRelationshipIssue[] {
  const issues: ChemistryRelationshipIssue[] = [];
  const entityIds = getCanonicalChemistryEntityIds();
  const relationshipIds = new Set<string>();

  for (const relationship of relationships) {
    if (relationshipIds.has(relationship.id)) {
      issues.push({
        code: "duplicate-relationship",
        relationshipId: relationship.id,
        message: `Duplicate chemistry relationship ${relationship.id}.`,
      });
    }
    relationshipIds.add(relationship.id);

    if (!entityIds.has(relationship.from)) {
      issues.push({
        code: "missing-source",
        relationshipId: relationship.id,
        message: `Unknown source entity ${relationship.from}.`,
      });
    }

    if (!entityIds.has(relationship.to)) {
      issues.push({
        code: "missing-target",
        relationshipId: relationship.id,
        message: `Unknown target entity ${relationship.to}.`,
      });
    }

    if (relationship.from === relationship.to) {
      issues.push({
        code: "self-relationship",
        relationshipId: relationship.id,
        message: `Chemistry relationship ${relationship.id} points to itself.`,
      });
    }
  }

  return issues;
}
