"use client";

import { workspaceTabs } from "@/content/workspace";
import { useWorkspace } from "./WorkspaceProvider";

export default function WorkspaceTabs() {
  const { snapshot, setActiveTab } = useWorkspace();

  return (
    <div role="tablist" aria-label="Workspace tools" className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3">
      {workspaceTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={snapshot.activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${snapshot.activeTab === tab.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
