"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { calculateMolarMass } from "@/lib/calculators";
import { getWorkspaceMolecule } from "@/content/workspace";
import { useWorkspace } from "./WorkspaceProvider";

function ToolLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">{children}</Link>;
}

export default function WorkspacePanel() {
  const { snapshot, setAmountMmol, setNotes } = useWorkspace();
  const molecule = getWorkspaceMolecule(snapshot.moleculeId);
  const molarMass = calculateMolarMass(molecule.formula);
  const massGrams = (snapshot.amountMmol / 1000) * molarMass;

  if (snapshot.activeTab === "spectra") {
    return (
      <section className="p-6" role="tabpanel">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-700">Spectroscopy handoff</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">{molecule.name} spectral evidence</h2>
        {molecule.spectroscopyCompoundId ? (
          <>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">This molecule has a curated ¹H NMR, ¹³C NMR, IR, and mass-spectrometry dataset. Open the spectroscopy engine to link structure and signals interactively.</p>
            <div className="mt-6"><ToolLink href={`/lab/spectroscopy?compound=${molecule.spectroscopyCompoundId}`}>Open linked spectroscopy →</ToolLink></div>
          </>
        ) : (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">No curated spectrum is published for this workspace molecule yet. Switch to ethanol, acetone, ethyl acetate, or toluene.</p>
        )}
      </section>
    );
  }

  if (snapshot.activeTab === "reaction") {
    return (
      <section className="p-6" role="tabpanel">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700">Reaction workflow</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Transform {molecule.name}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">Carry this molecule into the prediction and synthesis engine, or open its closest mechanism context.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ToolLink href="/lab/reaction-prediction">Open prediction & synthesis →</ToolLink>
          {molecule.mechanismHref ? <Link href={molecule.mechanismHref} className="inline-flex rounded-xl border border-violet-300 px-4 py-2.5 text-sm font-semibold text-violet-800 hover:bg-violet-50">Open related mechanism →</Link> : null}
          <Link href="/reactions" className="inline-flex rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Compare reactions →</Link>
        </div>
      </section>
    );
  }

  if (snapshot.activeTab === "calculations") {
    return (
      <section className="p-6" role="tabpanel">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Quantitative context</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Scale {molecule.name}</h2>
        <label className="mt-6 block max-w-sm text-sm font-semibold text-slate-800">
          Amount (mmol)
          <input type="number" min="0" step="0.1" value={snapshot.amountMmol} onChange={(event) => setAmountMmol(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </label>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Molar mass</dt><dd className="mt-2 text-xl font-bold text-slate-950">{molarMass.toFixed(4)} g/mol</dd></div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Amount</dt><dd className="mt-2 text-xl font-bold text-slate-950">{snapshot.amountMmol.toFixed(2)} mmol</dd></div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Required mass</dt><dd className="mt-2 text-xl font-bold text-slate-950">{massGrams.toFixed(4)} g</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3"><ToolLink href="/calculators/molecular-weight">Open molecular-weight calculator →</ToolLink><Link href="/calculators/stoichiometry" className="inline-flex rounded-xl border border-blue-300 px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50">Open stoichiometry →</Link></div>
      </section>
    );
  }

  if (snapshot.activeTab === "notes") {
    return (
      <section className="p-6" role="tabpanel">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Workspace notebook</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Notes for {molecule.name}</h2>
        <textarea aria-label="Workspace notes" value={snapshot.notes} onChange={(event) => setNotes(event.target.value)} placeholder="Record assignments, mechanism ideas, calculations, or questions…" className="mt-5 min-h-72 w-full rounded-2xl border border-slate-300 p-4 leading-7 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
        <p className="mt-2 text-xs text-slate-500">Saved automatically in this browser.</p>
      </section>
    );
  }

  return (
    <section className="p-6" role="tabpanel">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Synchronized document</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-950">{molecule.name}</h2>
      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center font-mono text-3xl font-bold text-emerald-950">{molecule.condensedFormula}</div>
      <p className="mt-5 max-w-3xl leading-7 text-slate-600">{molecule.summary}</p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4"><dt className="text-xs font-bold uppercase text-slate-500">Formula</dt><dd className="mt-2 font-mono text-lg font-bold">{molecule.formula}</dd></div>
        <div className="rounded-xl border border-slate-200 p-4"><dt className="text-xs font-bold uppercase text-slate-500">Functional group</dt><dd className="mt-2 text-lg font-bold">{molecule.functionalGroup}</dd></div>
        <div className="rounded-xl border border-slate-200 p-4"><dt className="text-xs font-bold uppercase text-slate-500">Molar mass</dt><dd className="mt-2 text-lg font-bold">{molarMass.toFixed(4)} g/mol</dd></div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">{molecule.referenceHrefs.map((href) => <Link key={href} href={href} className="rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">Open connected reference →</Link>)}</div>
    </section>
  );
}
