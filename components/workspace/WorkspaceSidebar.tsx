"use client";

import { getWorkspaceMolecule, workspaceMolecules } from "@/content/workspace";
import { useWorkspace } from "./WorkspaceProvider";

export default function WorkspaceSidebar() {
  const { snapshot, setMolecule } = useWorkspace();
  const molecule = getWorkspaceMolecule(snapshot.moleculeId);

  return (
    <aside className="border-r border-slate-200 bg-slate-50 p-4 lg:min-h-[680px]">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Molecule explorer</p>
      <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current document</p>
        <p className="mt-2 text-xl font-bold text-slate-950">{molecule.name}</p>
        <p className="mt-2 font-mono text-lg font-semibold text-emerald-800">{molecule.condensedFormula}</p>
        <p className="mt-2 text-sm text-slate-600">{molecule.functionalGroup}</p>
      </div>
      <div className="mt-5 space-y-2" aria-label="Workspace molecules">
        {workspaceMolecules.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setMolecule(entry.id)}
            aria-pressed={entry.id === molecule.id}
            className={`w-full rounded-xl border px-3 py-3 text-left transition ${entry.id === molecule.id ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"}`}
          >
            <span className="block font-semibold text-slate-950">{entry.name}</span>
            <span className="mt-1 block text-xs text-slate-500">{entry.formula} · {entry.functionalGroup}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
