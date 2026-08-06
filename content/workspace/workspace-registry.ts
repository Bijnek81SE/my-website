import { getWorkspaceMoleculeViews, requireWorkspaceMoleculeView } from "@/content/molecules/molecule-selectors";
import type { WorkspaceMolecule, WorkspaceSnapshot } from "./workspace-types";
import { workspaceTools } from "./workspace-tool-registry";

export const workspaceTabs = workspaceTools;

export const workspaceMolecules: readonly WorkspaceMolecule[] = getWorkspaceMoleculeViews();

export const defaultWorkspaceSnapshot: WorkspaceSnapshot = {
  moleculeId: workspaceMolecules[0]?.id ?? "ethanol",
  activeTab: "overview",
  amountMmol: 10,
  notes: "",
  updatedAt: "",
};

export function getWorkspaceMolecule(id: string): WorkspaceMolecule {
  try {
    return requireWorkspaceMoleculeView(id);
  } catch {
    const fallback = workspaceMolecules[0];
    if (!fallback) throw new Error("No workspace-enabled molecules are registered.");
    return fallback;
  }
}
