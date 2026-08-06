import { getPlatformFeature } from "@/content/platform";
import { getReaction } from "@/content/reactions";
import { getFunctionalGroup } from "@/content/references";
import { getReagent } from "@/content/reagents/reagent-registry";
import { getLessonBySlug } from "@/content/lesson-registry";
import { getMoleculesByCapability, requireMolecule } from "./molecule-registry";
import type { MoleculeDefinition, MoleculeRelation } from "./molecule-types";

export type MoleculeKnowledgeLink = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export type MoleculeKnowledgePanel = {
  functionalGroup: MoleculeKnowledgeLink;
  reagents: readonly MoleculeKnowledgeLink[];
  labs: readonly MoleculeKnowledgeLink[];
  reactions: readonly MoleculeKnowledgeLink[];
  lessons: readonly MoleculeKnowledgeLink[];
};

function resolveFeature(id: string) {
  try {
    return getPlatformFeature(id);
  } catch {
    return undefined;
  }
}

export type WorkspaceMoleculeView = {
  id: string;
  name: string;
  formula: string;
  condensedFormula: string;
  functionalGroup: string;
  summary: string;
  spectroscopyCompoundId?: string;
  predictionChallengeId?: string;
  mechanismHref?: string;
  knowledge: MoleculeKnowledgePanel;
};

function mapRelations(
  relations: readonly MoleculeRelation[],
  resolver: (id: string) => { label: string; href: string } | undefined,
): readonly MoleculeKnowledgeLink[] {
  return relations.flatMap((relation) => {
    const target = resolver(relation.id);
    return target
      ? [{ id: relation.id, label: relation.label ?? target.label, href: target.href, description: relation.description }]
      : [];
  });
}

export function getMoleculeKnowledge(molecule: MoleculeDefinition): MoleculeKnowledgePanel {
  const functionalGroup = getFunctionalGroup(molecule.primaryFunctionalGroupId);
  if (!functionalGroup) {
    throw new Error(`Molecule ${molecule.id} references unknown functional group ${molecule.primaryFunctionalGroupId}`);
  }

  return {
    functionalGroup: {
      id: functionalGroup.slug,
      label: functionalGroup.name,
      href: `/functional-groups/${functionalGroup.slug}`,
      description: functionalGroup.summary,
    },
    reagents: mapRelations(molecule.reagentRelations, (id) => {
      const reagent = getReagent(id);
      return reagent ? { label: reagent.name, href: `/reagents/${reagent.slug}` } : undefined;
    }),
    labs: mapRelations(molecule.labRelations, (id) => {
      const feature = resolveFeature(id);
      return feature ? { label: feature.title, href: feature.href } : undefined;
    }),
    reactions: mapRelations(molecule.reactionRelations, (id) => {
      const reaction = getReaction(id);
      return reaction ? { label: reaction.shortTitle, href: "/reactions" } : undefined;
    }),
    lessons: mapRelations(molecule.lessonRelations, (id) => {
      try {
        const lesson = getLessonBySlug(id);
        return { label: lesson.title, href: lesson.href };
      } catch {
        return undefined;
      }
    }),
  };
}

export function toWorkspaceMolecule(molecule: MoleculeDefinition): WorkspaceMoleculeView {
  if (!molecule.workspace) {
    throw new Error(`Molecule ${molecule.id} is workspace-enabled without workspace metadata.`);
  }

  const mechanismFeature = molecule.workspace.preferredMechanismFeatureId
    ? resolveFeature(molecule.workspace.preferredMechanismFeatureId)
    : undefined;

  return {
    id: molecule.id,
    name: molecule.name,
    formula: molecule.formula,
    condensedFormula: molecule.condensedFormula,
    functionalGroup: molecule.workspace.functionalGroupLabel,
    summary: molecule.workspace.summary,
    spectroscopyCompoundId: molecule.capabilities.spectroscopy ? molecule.id : undefined,
    predictionChallengeId: molecule.workspace.predictionChallengeId,
    mechanismHref: mechanismFeature?.href,
    knowledge: getMoleculeKnowledge(molecule),
  };
}

export function getWorkspaceMoleculeViews(): readonly WorkspaceMoleculeView[] {
  return getMoleculesByCapability("workspace").map(toWorkspaceMolecule);
}

export function requireWorkspaceMoleculeView(id: string): WorkspaceMoleculeView {
  const molecule = requireMolecule(id);
  if (!molecule.capabilities.workspace) {
    throw new Error(`Molecule ${id} is not available in the workspace.`);
  }
  return toWorkspaceMolecule(molecule);
}
