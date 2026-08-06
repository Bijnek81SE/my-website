import { defineWorkspaceTool, type WorkspaceToolDefinition } from "./workspace-tool-types";
import type { WorkspaceMolecule } from "./workspace-types";

export const workspaceTools: readonly WorkspaceToolDefinition[] = [
  defineWorkspaceTool({ id: "overview", label: "Overview", description: "Identity, formula, functional group, and connected tools.", order: 10, capability: "always", shortcut: "1", defaultEnabled: true }),
  defineWorkspaceTool({ id: "spectra", label: "Spectra", description: "Open the linked spectroscopy dataset and assignments.", order: 20, capability: "spectroscopy", shortcut: "2", defaultEnabled: true }),
  defineWorkspaceTool({ id: "reaction", label: "Reaction", description: "Continue into prediction, synthesis, or a mechanism lab.", order: 30, capability: "reaction", shortcut: "3", defaultEnabled: true }),
  defineWorkspaceTool({ id: "calculations", label: "Calculations", description: "Scale the selected molecule and inspect mass and amount.", order: 40, capability: "calculations", shortcut: "4", defaultEnabled: true }),
  defineWorkspaceTool({ id: "notes", label: "Notes", description: "Keep browser-local observations for this workspace.", order: 50, capability: "notes", shortcut: "5", defaultEnabled: true }),
].sort((a, b) => a.order - b.order);

const byId = new Map(workspaceTools.map((tool) => [tool.id, tool]));

export function getWorkspaceTool(id: string): WorkspaceToolDefinition | undefined { return byId.get(id); }
export function requireWorkspaceTool(id: string): WorkspaceToolDefinition {
  const tool = getWorkspaceTool(id);
  if (!tool) throw new Error(`Unknown workspace tool id: ${id}`);
  return tool;
}
export function isWorkspaceToolAvailable(tool: WorkspaceToolDefinition, molecule: WorkspaceMolecule): boolean {
  switch (tool.capability) {
    case "spectroscopy": return Boolean(molecule.spectroscopyCompoundId);
    case "reaction": return Boolean(molecule.predictionChallengeId || molecule.mechanismHref || molecule.knowledge.reactions.length > 0);
    case "calculations": return true;
    case "notes": return true;
    default: return true;
  }
}
export function getAvailableWorkspaceTools(molecule: WorkspaceMolecule): readonly WorkspaceToolDefinition[] {
  return workspaceTools.filter((tool) => tool.defaultEnabled && isWorkspaceToolAvailable(tool, molecule));
}
