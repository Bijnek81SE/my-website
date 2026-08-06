import type { WorkspaceToolDefinition } from "./workspace-tool-types";
export type WorkspaceToolValidationIssue = { code: string; message: string; toolId?: string };
export function validateWorkspaceTools(tools: readonly WorkspaceToolDefinition[]): readonly WorkspaceToolValidationIssue[] {
  const issues: WorkspaceToolValidationIssue[] = []; const ids = new Set<string>(); const shortcuts = new Set<string>();
  for (const tool of tools) {
    if (ids.has(tool.id)) issues.push({ code: "duplicate-id", message: `Duplicate workspace tool id: ${tool.id}`, toolId: tool.id });
    ids.add(tool.id);
    if (!tool.label.trim()) issues.push({ code: "missing-label", message: `Workspace tool ${tool.id} needs a label.`, toolId: tool.id });
    if (tool.shortcut) {
      if (shortcuts.has(tool.shortcut)) issues.push({ code: "duplicate-shortcut", message: `Duplicate workspace shortcut: ${tool.shortcut}`, toolId: tool.id });
      shortcuts.add(tool.shortcut);
    }
  }
  return issues;
}
