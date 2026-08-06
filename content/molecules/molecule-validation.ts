import { lessons } from "@/content/lesson-registry";
import { platformFeatures } from "@/content/platform";
import { reactions } from "@/content/reactions";
import { functionalGroups } from "@/content/references";
import { reagents } from "@/content/reagents/reagent-registry";
import type { MoleculeDefinition } from "./molecule-types";

export type MoleculeValidationIssueCode =
  | "duplicate-id"
  | "duplicate-alias"
  | "duplicate-atom-id"
  | "duplicate-bond-id"
  | "broken-bond"
  | "missing-functional-group"
  | "missing-reagent"
  | "missing-reaction"
  | "missing-lab"
  | "missing-lesson"
  | "missing-workspace-metadata";

export type MoleculeValidationIssue = {
  code: MoleculeValidationIssueCode;
  moleculeId: string;
  message: string;
};

export function validateMolecules(
  values: readonly MoleculeDefinition[],
): readonly MoleculeValidationIssue[] {
  const issues: MoleculeValidationIssue[] = [];
  const ids = new Set<string>();
  const aliases = new Map<string, string>();
  const functionalGroupIds = new Set(functionalGroups.map((entry) => entry.slug));
  const reagentIds = new Set<string>(reagents.map((entry) => entry.slug));
  const reactionIds = new Set<string>(reactions.map((entry) => entry.id));
  const featureIds = new Set(platformFeatures.map((entry) => entry.id));
  const lessonIds = new Set(lessons.map((entry) => entry.slug));

  for (const molecule of values) {
    if (ids.has(molecule.id)) {
      issues.push({ code: "duplicate-id", moleculeId: molecule.id, message: `Duplicate molecule id: ${molecule.id}` });
    }
    ids.add(molecule.id);

    for (const alias of [molecule.name, ...molecule.aliases]) {
      const normalized = alias.trim().toLowerCase();
      const owner = aliases.get(normalized);
      if (owner && owner !== molecule.id) {
        issues.push({ code: "duplicate-alias", moleculeId: molecule.id, message: `Alias ${alias} is already used by ${owner}.` });
      } else {
        aliases.set(normalized, molecule.id);
      }
    }

    const atomIds = new Set<string>();
    for (const atom of molecule.structure.atoms) {
      if (atomIds.has(atom.id)) {
        issues.push({ code: "duplicate-atom-id", moleculeId: molecule.id, message: `Duplicate atom id ${atom.id}.` });
      }
      atomIds.add(atom.id);
    }

    const bondIds = new Set<string>();
    for (const bond of molecule.structure.bonds) {
      if (bondIds.has(bond.id)) {
        issues.push({ code: "duplicate-bond-id", moleculeId: molecule.id, message: `Duplicate bond id ${bond.id}.` });
      }
      bondIds.add(bond.id);
      if (!atomIds.has(bond.from) || !atomIds.has(bond.to)) {
        issues.push({ code: "broken-bond", moleculeId: molecule.id, message: `Bond ${bond.id} references a missing atom.` });
      }
    }

    for (const id of molecule.functionalGroupIds) {
      if (!functionalGroupIds.has(id)) issues.push({ code: "missing-functional-group", moleculeId: molecule.id, message: `Unknown functional group ${id}.` });
    }
    for (const relation of molecule.reagentRelations) {
      if (!reagentIds.has(relation.id)) issues.push({ code: "missing-reagent", moleculeId: molecule.id, message: `Unknown reagent ${relation.id}.` });
    }
    for (const relation of molecule.reactionRelations) {
      if (!reactionIds.has(relation.id)) issues.push({ code: "missing-reaction", moleculeId: molecule.id, message: `Unknown reaction ${relation.id}.` });
    }
    for (const relation of molecule.labRelations) {
      if (!featureIds.has(relation.id)) issues.push({ code: "missing-lab", moleculeId: molecule.id, message: `Unknown platform feature ${relation.id}.` });
    }
    for (const relation of molecule.lessonRelations) {
      if (!lessonIds.has(relation.id)) issues.push({ code: "missing-lesson", moleculeId: molecule.id, message: `Unknown lesson ${relation.id}.` });
    }
    if (molecule.capabilities.workspace && !molecule.workspace) {
      issues.push({ code: "missing-workspace-metadata", moleculeId: molecule.id, message: "Workspace-enabled molecule is missing workspace metadata." });
    }
  }

  return issues;
}
