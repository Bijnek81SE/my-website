import type { Metadata } from "next";
import Link from "next/link";
import { FunctionalGroupQuickCheck, LabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Organic Chemistry Lab | Organic Chemistry Hub",
  description: "Practise organic chemistry with interactive exercises and immediate feedback.",
};

export default function LabPage() {
  return (
    <LabShell
      title="Learn by doing"
      description="Build structures, identify patterns, and get immediate chemistry-focused feedback."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Available tools</h2>
          <div className="mt-4 space-y-3">
            <Link
              href="/calculators/lewis-structure-builder"
              className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <span className="font-semibold text-slate-950">Lewis Structure Builder</span>
              <span className="mt-1 block text-sm text-slate-600">Build H₂O, NH₃, and CO₂.</span>
            </Link>
            <Link
              href="/lab/functional-groups"
              className="block rounded-2xl border border-blue-200 bg-blue-50 p-4 transition hover:border-blue-400 hover:bg-blue-100"
            >
              <span className="font-semibold text-blue-950">Functional Group Explorer</span>
              <span className="mt-1 block text-sm text-blue-800">Practise nine common functional groups.</span>
            </Link>
            <Link
              href="/lab/hybridization"
              className="block rounded-2xl border border-violet-200 bg-violet-50 p-4 transition hover:border-violet-400 hover:bg-violet-100"
            >
              <span className="font-semibold text-violet-950">Hybridization Trainer</span>
              <span className="mt-1 block text-sm text-violet-800">Predict sp, sp², and sp³ with feedback.</span>
            </Link>
            <Link
              href="/lab/molecular-geometry"
              className="block rounded-2xl border border-emerald-200 bg-emerald-50 p-4 transition hover:border-emerald-400 hover:bg-emerald-100"
            >
              <span className="font-semibold text-emerald-950">Molecular Geometry Trainer</span>
              <span className="mt-1 block text-sm text-emerald-800">Practise VSEPR shapes with SVG models.</span>
            </Link>
          </div>
        </div>
      }
    >
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">New lab</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Molecular Geometry Trainer</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          Count electron domains, account for lone pairs, and identify molecular shapes using responsive SVG models.
        </p>
        <Link
          href="/lab/molecular-geometry"
          className="mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Open trainer →
        </Link>
      </div>
      <FunctionalGroupQuickCheck />
    </LabShell>
  );
}
