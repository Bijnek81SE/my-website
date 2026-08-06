import type { WorkspaceMolecule, WorkspaceSnapshot } from "./workspace-types";

export type WorkspaceToolCapability = "always" | "spectroscopy" | "reaction" | "calculations" | "notes";

export type WorkspaceToolDefinition = {
  id: string;
  label: string;
  description: string;
  order: number;
  capability: WorkspaceToolCapability;
  shortcut?: string;
  defaultEnabled: boolean;
};

export type WorkspaceToolContext = {
  molecule: WorkspaceMolecule;
  snapshot: WorkspaceSnapshot;
};

export function defineWorkspaceTool<const T extends WorkspaceToolDefinition>(tool: T): T {
  return tool;
}
