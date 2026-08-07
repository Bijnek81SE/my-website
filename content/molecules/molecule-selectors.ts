import { getSemanticGraphConnections } from "@/content/knowledge/semantic-graph-selectors";
import { getPlatformFeature } from "@/content/platform";
import { getFunctionalGroup } from "@/content/references";
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

function relationById(relations: readonly MoleculeRelation[]): ReadonlyMap<string, MoleculeRelation> {
  return new Map(relations.map((relation) => [relation.id, relation]));
}

function graphKnowledgeLinks(input: {
  molecule: MoleculeDefinition;
  targetKinds: readonly ("reagent" | "reaction" | "lesson" | "lab" | "mechanism")[];
  relations: readonly MoleculeRelation[];
}): readonly MoleculeKnowledgeLink[] {
  const explicit = relationById(input.relations);
  const seen = new Set<string>();

  return getSemanticGraphConnections({
    entityId: `molecule:${input.molecule.id}`,
    direction: "both",
    targetKinds: input.targetKinds,
    includeInferred: true,
  }).flatMap(({ edge, node }) => {
    if (!node.href || seen.has(node.id)) return [];
    seen.add(node.id);

    const localId = node.id.slice(node.id.indexOf(":") + 1);
    const override = explicit.get(localId);
    return [{
      id: localId,
      label: override?.label ?? node.title,
      href: node.href,
      description: override?.description ?? edge.description ?? node.description,
    }];
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
    reagents: graphKnowledgeLinks({
      molecule,
      targetKinds: ["reagent"],
      relations: molecule.reagentRelations,
    }),
    labs: graphKnowledgeLinks({
      molecule,
      targetKinds: ["lab", "mechanism"],
      relations: molecule.labRelations,
    }),
    reactions: graphKnowledgeLinks({
      molecule,
      targetKinds: ["reaction"],
      relations: molecule.reactionRelations,
    }),
    lessons: graphKnowledgeLinks({
      molecule,
      targetKinds: ["lesson"],
      relations: molecule.lessonRelations,
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
