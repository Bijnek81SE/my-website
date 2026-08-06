"use client";

import { useMemo, useState } from "react";
import type { SpectralAssignment, SpectrumKind } from "@/components/chemistry/spectroscopy";
import { getSpectroscopyDatasetsByCapability } from "@/content/spectroscopy";
import AssignmentChallenge from "./AssignmentChallenge";
import AssignmentPanel from "./AssignmentPanel";
import MoleculeSpectrumLink from "./MoleculeSpectrumLink";
import SpectrumPlot from "./SpectrumPlot";

const techniques: readonly { id: SpectrumKind; label: string; description: string }[] = [
  { id: "proton-nmr", label: "¹H NMR", description: "Chemical shift, integration, multiplicity, and coupling." },
  { id: "carbon-nmr", label: "¹³C NMR", description: "Distinct carbon environments across the full chemical-shift range." },
  { id: "ir", label: "IR", description: "Broad and sharp absorption envelopes for functional groups." },
  { id: "mass", label: "MS", description: "Molecular ions, isotope/fragment sticks, and base peaks." },
];

const labDatasets = getSpectroscopyDatasetsByCapability("lab");

export default function SpectroscopyLab() {
  const [compoundId, setCompoundId] = useState(labDatasets[0].id);
  const [kind, setKind] = useState<SpectrumKind>("proton-nmr");
  const [assignment, setAssignment] = useState<SpectralAssignment>();
  const [atomIds, setAtomIds] = useState<readonly string[]>([]);
  const compound = labDatasets.find((item) => item.id === compoundId) ?? labDatasets[0];
  const atomLabels = useMemo(() => compound.atoms.filter((atom) => assignment?.atomIds.includes(atom.id)).map((atom) => atom.label ?? atom.element), [assignment, compound]);

  function selectAssignment(next: SpectralAssignment) {
    setAssignment(next);
    setAtomIds(next.atomIds);
  }

  function selectAtom(atomId: string) {
    setAtomIds([atomId]);
    const all = [...compound.protonNmr, ...compound.carbonNmr, ...compound.ir, ...compound.mass];
    setAssignment(all.find((item) => item.atomIds.includes(atomId)));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#f5f3ff_100%)] p-5 sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-800">Spectroscopy Engine</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Link molecular structure to realistic simulated spectra.</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">Switch techniques, inspect assignments, click atoms or signals, and practise identifying diagnostic evidence.</p>
          </div>
          <label className="block text-sm font-semibold text-slate-800">
            Compound
            <select
              value={compoundId}
              onChange={(event) => { setCompoundId(event.target.value); setAssignment(undefined); setAtomIds([]); }}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            >
              {labDatasets.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.formula}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Spectroscopy technique">
          {techniques.map((technique) => (
            <button
              key={technique.id}
              type="button"
              role="tab"
              aria-selected={kind === technique.id}
              onClick={() => { setKind(technique.id); setAssignment(undefined); setAtomIds([]); }}
              className={`rounded-xl border p-3 text-left transition ${kind === technique.id ? "border-cyan-500 bg-white shadow-sm" : "border-cyan-100 bg-white/60 hover:border-cyan-300"}`}
            >
              <span className="font-bold text-slate-950">{technique.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-600">{technique.description}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <MoleculeSpectrumLink compound={compound} activeAtomIds={atomIds} onAtomSelect={selectAtom} />
          <AssignmentPanel assignment={assignment} atomLabels={atomLabels} />
          <AssignmentChallenge compound={compound} kind={kind} selectedAssignment={assignment} />
        </div>
        <SpectrumPlot compound={compound} kind={kind} selectedAssignmentId={assignment?.id} highlightedAtomIds={atomIds} onAssignmentSelect={selectAssignment} />
      </div>
    </div>
  );
}
