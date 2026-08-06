export type WorkspaceTab = "overview" | "spectra" | "reaction" | "calculations" | "notes";

export type WorkspaceMolecule = {
  id: string;
  name: string;
  formula: string;
  condensedFormula: string;
  functionalGroup: string;
  summary: string;
  spectroscopyCompoundId?: string;
  predictionChallengeId?: string;
  mechanismHref?: string;
  referenceHrefs: readonly string[];
};

export type WorkspaceSnapshot = {
  moleculeId: string;
  activeTab: WorkspaceTab;
  amountMmol: number;
  notes: string;
  updatedAt: string;
};

export type WorkspaceDocument = WorkspaceSnapshot & {
  version: 1;
};
