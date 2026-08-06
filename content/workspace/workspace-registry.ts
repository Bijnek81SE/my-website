import { getWorkspaceMoleculeViews, requireWorkspaceMoleculeView } from "@/content/molecules/molecule-selectors";
import type { WorkspaceMolecule, WorkspaceSnapshot, WorkspaceTab } from "./workspace-types";

export const workspaceTabs: readonly { id: WorkspaceTab; label: string; description: string }[] = [
  { id: "overview", label: "Overview", description: "Identity, formula, functional group, and connected tools." },
  { id: "spectra", label: "Spectra", description: "Open the linked spectroscopy dataset and assignments." },
  { id: "reaction", label: "Reaction", description: "Continue into prediction, synthesis, or a mechanism lab." },
  { id: "calculations", label: "Calculations", description: "Scale the selected molecule and inspect mass and amount." },
  { id: "notes", label: "Notes", description: "Keep browser-local observations for this workspace." },
];

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
