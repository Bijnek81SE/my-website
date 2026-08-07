"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useWorkspace } from "./WorkspaceProvider";

function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function WorkspaceProjectManager() {
  const {
    projects,
    activeProject,
    createProject,
    selectProject,
    renameProject,
    deleteProject,
    exportProject,
    importProject,
  } = useWorkspace();
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(activeProject.name);
  const [importError, setImportError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function beginRename(): void {
    setDraftName(activeProject.name);
    setEditing(true);
  }

  function saveRename(): void {
    renameProject(activeProject.id, draftName);
    setEditing(false);
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      importProject(await file.text());
      setImportError("");
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Could not import this project.");
    }
  }

  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 py-3" aria-label="Workspace projects">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-64 flex-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
          Project
          <select
            aria-label="Active project"
            value={activeProject.id}
            onChange={(event) => selectProject(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold normal-case tracking-normal text-slate-900"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </label>

        {editing ? (
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <input
              aria-label="Project name"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveRename();
                if (event.key === "Escape") setEditing(false);
              }}
              className="min-w-56 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              autoFocus
            />
            <button type="button" onClick={saveRename} className="rounded-lg bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white">Save name</button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => createProject("Untitled project")} className="rounded-lg border border-emerald-300 bg-white px-3 py-2.5 text-sm font-semibold text-emerald-800">New project</button>
            <button type="button" onClick={beginRename} className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700">Rename</button>
            <button
              type="button"
              onClick={() => deleteProject(activeProject.id)}
              disabled={projects.length <= 1}
              className="rounded-lg border border-rose-200 bg-white px-3 py-2.5 text-sm font-semibold text-rose-700 disabled:opacity-40"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => downloadJson(`${activeProject.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "workspace"}.json`, exportProject())}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700"
            >
              Export
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700">Import</button>
            <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={handleImport} className="sr-only" aria-label="Import Workspace project" />
          </div>
        )}
      </div>
      {importError ? <p role="alert" className="mt-2 text-sm font-medium text-rose-700">{importError}</p> : null}
    </section>
  );
}
