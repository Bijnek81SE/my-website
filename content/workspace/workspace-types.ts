export type WorkspaceTab = string;

export type WorkspaceKnowledgeLink = {
  label: string;
  href: string;
  description: string;
};

export type WorkspaceKnowledgePanel = {
  functionalGroup: WorkspaceKnowledgeLink;
  reagents: readonly WorkspaceKnowledgeLink[];
  labs: readonly WorkspaceKnowledgeLink[];
  reactions: readonly WorkspaceKnowledgeLink[];
  lessons: readonly WorkspaceKnowledgeLink[];
};

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
  knowledge: WorkspaceKnowledgePanel;
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

export type WorkspaceProject = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  snapshot: WorkspaceSnapshot;
};

export type WorkspaceProjectCollection = {
  version: 2;
  activeProjectId: string;
  projects: readonly WorkspaceProject[];
};

export type WorkspaceProjectExport = {
  format: "organic-chemistry-hub-workspace";
  version: 1;
  exportedAt: string;
  project: WorkspaceProject;
};