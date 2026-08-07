"use client";

import WorkspacePanel from "./WorkspacePanel";
import WorkspaceProjectManager from "./WorkspaceProjectManager";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceTabs from "./WorkspaceTabs";
import WorkspaceToolbar from "./WorkspaceToolbar";
import { WorkspaceProvider } from "./WorkspaceProvider";

export default function WorkspaceShell() {
  return (
    <WorkspaceProvider>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <WorkspaceProjectManager />
        <WorkspaceToolbar />
        <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
          <WorkspaceSidebar />
          <div className="min-w-0"><WorkspaceTabs /><WorkspacePanel /></div>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
