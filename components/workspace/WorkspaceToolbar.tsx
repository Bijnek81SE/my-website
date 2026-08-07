"use client";

import { workspaceMolecules } from "@/content/workspace";
import { useWorkspace } from "./WorkspaceProvider";

export default function WorkspaceToolbar() {
  const { snapshot, canUndo, canRedo, setMolecule, undo, redo, reset } = useWorkspace();

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 bg-white p-4 sm:flex-row sm:items-end sm:justify-between">
      <label className="block min-w-64 text-sm font-semibold text-slate-800">
        Active molecule
        <select
          aria-label="Active molecule"
          value={snapshot.moleculeId}
          onChange={(event) => setMolecule(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          {workspaceMolecules.map((molecule) => (
            <option key={molecule.id} value={molecule.id}>
              {molecule.name} — {molecule.formula}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={undo} disabled={!canUndo} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40">Undo</button>
        <button type="button" onClick={redo} disabled={!canRedo} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40">Redo</button>
        <button type="button" onClick={reset} className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50">Reset project</button>
      </div>
    </div>
  );
}
