"use client";

import type { ReactNode } from "react";
import type { WorkspaceSnapshot } from "@/content/workspace";
import {
  CalculationsWorkspaceTool,
  NotesWorkspaceTool,
  OverviewWorkspaceTool,
  ReactionWorkspaceTool,
  SpectraWorkspaceTool,
} from "./tools/BuiltInWorkspaceTools";

export type WorkspaceToolId = WorkspaceSnapshot["activeTab"];
export type WorkspaceToolRenderer = () => ReactNode;

const renderers: Readonly<
  Record<WorkspaceToolId, WorkspaceToolRenderer>
> = {
  overview: () => <OverviewWorkspaceTool />,
  spectra: () => <SpectraWorkspaceTool />,
  reaction: () => <ReactionWorkspaceTool />,
  calculations: () => <CalculationsWorkspaceTool />,
  notes: () => <NotesWorkspaceTool />,
};

export function getWorkspaceToolRenderer(
  id: WorkspaceToolId,
): WorkspaceToolRenderer {
  return renderers[id];
}

export function renderWorkspaceTool(
  id: WorkspaceToolId,
): ReactNode {
  return getWorkspaceToolRenderer(id)();
}

export const registeredWorkspaceToolRendererIds =
  Object.freeze(
    Object.keys(renderers) as WorkspaceToolId[],
  );