import { lessons } from "@/content/lessons";
import { mechanisms } from "@/content/mechanisms";
import { molecules } from "@/content/molecules";
import { reactions } from "@/content/reactions";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";
import { spectroscopyDatasets } from "@/content/spectroscopy";
import type {
  ChemistryEntityId,
  ChemistryRelationship,
  ChemistryRelationshipProvenance,
  ChemistryRelationshipSemantic,
} from "./chemistry-relationship-types";

const inverseSemantics: Readonly<
  Partial<Record<ChemistryRelationshipSemantic, ChemistryRelationshipSemantic>>
> = {
  "requires-prerequisite": "prerequisite-of",
  "prerequisite-of": "requires-prerequisite",
  teaches: "taught-by",
  "taught-by": "teaches",
  "uses-reagent": "enables-reaction",
  "enables-reaction": "uses-reagent",
  "uses-mechanism": "mechanism-for",
  "mechanism-for": "uses-mechanism",
  "uses-substrate": "substrate-for",
  "substrate-for": "uses-substrate",
  "transforms-functional-group": "transformed-by",
  "transformed-by": "transforms-functional-group",
  "has-functional-group": "functional-group-of",
  "functional-group-of": "has-functional-group",
  "has-spectrum": "spectrum-of",
  "spectrum-of": "has-spectrum",
  "related-reaction": "related-reaction",
  "competes-with": "competes-with",
  "related-lesson": "related-lesson",
};

function relationshipId(
  from: ChemistryEntityId,
  semantic: ChemistryRelationshipSemantic,
  to: ChemistryEntityId,
): string {
  return `${from}|${semantic}|${to}`;
}

function direct(
  from: ChemistryEntityId,
  to: ChemistryEntityId,
  semantic: ChemistryRelationshipSemantic,
  provenance: ChemistryRelationshipProvenance,
  details: Pick<ChemistryRelationship, "label" | "description"> = {},
): ChemistryRelationship {
  return {
    id: relationshipId(from, semantic, to),
    from,
    to,
    semantic,
    provenance,
    inferred: false,
    ...details,
  };
}

function inferInverse(
  relationship: ChemistryRelationship,
): ChemistryRelationship | undefined {
  const inverseSemantic = inverseSemantics[relationship.semantic];
  if (!inverseSemantic) return undefined;

  return {
    id: relationshipId(relationship.to, inverseSemantic, relationship.from),
    from: relationship.to,
    to: relationship.from,
    semantic: inverseSemantic,
    provenance: "inferred-inverse",
    inferred: true,
    label: relationship.label,
    description: relationship.description,
  };
}

export function generateDirectChemistryRelationships(): readonly ChemistryRelationship[] {
  const relationships: ChemistryRelationship[] = [];
  const add = (...items: readonly ChemistryRelationship[]) => relationships.push(...items);

  for (const lesson of lessons) {
    const lessonId = `lesson:${lesson.id}` as const;
    for (const id of lesson.prerequisiteLessonIds) {
      add(direct(lessonId, `lesson:${id}`, "requires-prerequisite", "lesson-registry"));
    }
    for (const id of lesson.moleculeIds) {
      add(direct(lessonId, `molecule:${id}`, "teaches", "lesson-registry"));
    }
    for (const id of lesson.reactionIds) {
      add(direct(lessonId, `reaction:${id}`, "teaches", "lesson-registry"));
    }
    for (const id of lesson.mechanismIds) {
      add(direct(lessonId, `mechanism:${id}`, "teaches", "lesson-registry"));
    }
    for (const id of lesson.reagentIds) {
      add(direct(lessonId, `reagent:${id}`, "teaches", "lesson-registry"));
    }
    for (const id of lesson.spectroscopyDatasetIds) {
      add(direct(lessonId, `spectroscopy:${id}`, "teaches", "lesson-registry"));
    }
    if (lesson.next) {
      const next = lessons.find((candidate) => candidate.href === lesson.next?.href);
      if (next) add(direct(lessonId, `lesson:${next.id}`, "study-next", "lesson-registry"));
    }
  }

  for (const mechanism of mechanisms) {
    add(
      direct(
        `mechanism:${mechanism.id}`,
        `reaction:${mechanism.reactionId}`,
        "mechanism-for",
        "mechanism-registry",
      ),
    );
  }

  for (const reaction of reactions) {
    const reactionId = `reaction:${reaction.id}` as const;
    add(
      direct(
        reactionId,
        `mechanism:${reaction.mechanismId}`,
        "uses-mechanism",
        "reaction-registry",
      ),
    );
    for (const id of reaction.reagentIds) {
      add(direct(reactionId, `reagent:${id}`, "uses-reagent", "reaction-registry"));
    }
    for (const id of reaction.substrateFunctionalGroupIds) {
      add(
        direct(
          reactionId,
          `functional-group:${id}`,
          "transformed-by",
          "reaction-registry",
          { label: "Substrate functional group" },
        ),
      );
    }
    for (const id of reaction.productFunctionalGroupIds) {
      add(
        direct(
          reactionId,
          `functional-group:${id}`,
          "transforms-functional-group",
          "reaction-registry",
          { label: "Product functional group" },
        ),
      );
    }
    for (const id of reaction.relatedReactionIds) {
      add(direct(reactionId, `reaction:${id}`, "related-reaction", "reaction-registry"));
    }
    for (const id of reaction.competingReactionIds) {
      add(
        direct(reactionId, `reaction:${id}`, "competes-with", "reaction-registry", {
          label: "Competing pathway",
        }),
      );
    }
  }

  for (const reagent of reagents) {
    const reagentId = `reagent:${reagent.id}` as const;
    for (const id of reagent.reactionIds) {
      add(direct(reagentId, `reaction:${id}`, "enables-reaction", "reagent-registry"));
    }
    for (const id of reagent.mechanismIds) {
      add(direct(reagentId, `mechanism:${id}`, "uses-mechanism", "reagent-registry"));
    }
    for (const id of reagent.moleculeIds) {
      add(
        direct(reagentId, `molecule:${id}`, "uses-substrate", "reagent-registry", {
          label: "Typical substrate",
        }),
      );
    }
    for (const id of reagent.lessonIds) {
      add(direct(reagentId, `lesson:${id}`, "related-lesson", "reagent-registry"));
    }
  }

  for (const molecule of molecules) {
    const moleculeId = `molecule:${molecule.id}` as const;
    for (const id of molecule.functionalGroupIds) {
      add(direct(moleculeId, `functional-group:${id}`, "has-functional-group", "molecule-registry"));
    }
    for (const relation of molecule.reagentRelations) {
      add(
        direct(moleculeId, `reagent:${relation.id}`, "uses-reagent", "molecule-registry", {
          label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined,
          description: relation.description,
        }),
      );
    }
    for (const relation of molecule.reactionRelations) {
      add(
        direct(moleculeId, `reaction:${relation.id}`, "substrate-for", "molecule-registry", {
          label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined,
          description: relation.description,
        }),
      );
    }
    for (const relation of molecule.lessonRelations) {
      add(
        direct(moleculeId, `lesson:${relation.id}`, "related-lesson", "molecule-registry", {
          label: "label" in relation && typeof relation.label === "string" ? relation.label : undefined,
          description: relation.description,
        }),
      );
    }
    if (molecule.capabilities.spectroscopy) {
      add(direct(moleculeId, `spectroscopy:${molecule.id}`, "has-spectrum", "molecule-registry"));
    }
  }

  for (const dataset of spectroscopyDatasets) {
    const datasetId = `spectroscopy:${dataset.id}` as const;
    add(
      direct(datasetId, `molecule:${dataset.moleculeId}`, "spectrum-of", "spectroscopy-registry", {
        label: "Assigned molecule",
      }),
    );
    for (const id of dataset.relatedLessonIds) {
      add(direct(datasetId, `lesson:${id}`, "related-lesson", "spectroscopy-registry"));
    }
    for (const id of dataset.relatedFunctionalGroupIds) {
      add(direct(datasetId, `functional-group:${id}`, "has-functional-group", "spectroscopy-registry"));
    }
  }

  // Ensure functional-group IDs participating in generated rules are canonical.
  void functionalGroups;

  return deduplicateChemistryRelationships(relationships);
}

export function generateChemistryRelationships(): readonly ChemistryRelationship[] {
  const directRelationships = generateDirectChemistryRelationships();
  const inferredRelationships = directRelationships
    .map(inferInverse)
    .filter((relationship): relationship is ChemistryRelationship => Boolean(relationship));

  return deduplicateChemistryRelationships([...directRelationships, ...inferredRelationships]);
}

export function deduplicateChemistryRelationships(
  relationships: readonly ChemistryRelationship[],
): readonly ChemistryRelationship[] {
  const byId = new Map<string, ChemistryRelationship>();

  for (const relationship of relationships) {
    const existing = byId.get(relationship.id);
    if (!existing || (existing.inferred && !relationship.inferred)) {
      byId.set(relationship.id, relationship);
    }
  }

  return [...byId.values()];
}

export const chemistryRelationships = generateChemistryRelationships();
