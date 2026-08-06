"use client";

import { renderWorkspaceTool } from "./WorkspaceToolRegistry";
import { useWorkspace } from "./WorkspaceProvider";

export default function WorkspacePanel() {
  const { snapshot } = useWorkspace();

  return renderWorkspaceTool(snapshot.activeTab);
}