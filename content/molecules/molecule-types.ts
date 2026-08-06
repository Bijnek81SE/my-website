export type MoleculeId = string;

export type MoleculeAtom = {
  id: string;
  element: string;
  x: number;
  y: number;
  label?: string;
  formalCharge?: number;
};

export type MoleculeBond = {
  id: string;
  from: string;
  to: string;
  order: 1 | 2 | 3;
};

export type MoleculeStructure = {
  atoms: readonly MoleculeAtom[];
  bonds: readonly MoleculeBond[];
};

export type MoleculeRelation = {
  id: string;
  label?: string;
  description: string;
};

export type MoleculeCapabilities = {
  workspace: boolean;
  spectroscopy: boolean;
  reactionPrediction: boolean;
  retrosynthesis: boolean;
  calculations: boolean;
};

export type MoleculeWorkspaceMetadata = {
  functionalGroupLabel: string;
  summary: string;
  predictionChallengeId?: string;
  preferredMechanismFeatureId?: string;
};

export type MoleculeDefinition = {
  id: MoleculeId;
  name: string;
  aliases: readonly string[];
  formula: string;
  displayFormula: string;
  condensedFormula: string;
  smiles?: string;
  inchiKey?: string;
  structure: MoleculeStructure;
  primaryFunctionalGroupId: string;
  functionalGroupIds: readonly string[];
  reagentRelations: readonly MoleculeRelation[];
  reactionRelations: readonly MoleculeRelation[];
  labRelations: readonly MoleculeRelation[];
  lessonRelations: readonly MoleculeRelation[];
  capabilities: MoleculeCapabilities;
  workspace?: MoleculeWorkspaceMetadata;
};

export function defineMolecule<const T extends MoleculeDefinition>(molecule: T): T {
  return molecule;
}
