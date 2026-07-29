import type { Metadata } from "next";
import Link from "next/link";
import { FunctionalGroupQuickCheck, LabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Organic Chemistry Lab | Organic Chemistry Hub",
  description: "Practise organic chemistry with interactive exercises and immediate feedback.",
};

const tools = [
  ["Lewis Structure Builder", "/lab/lewis-structure-builder", "Build H₂O, NH₃, and CO₂.", "slate"],
  ["Functional Group Explorer", "/lab/functional-groups", "Practise nine common functional groups.", "blue"],
  ["Hybridization Trainer", "/lab/hybridization", "Predict sp, sp², and sp³ with feedback.", "violet"],
  ["Molecular Geometry Trainer", "/lab/molecular-geometry", "Practise VSEPR shapes with SVG models.", "emerald"],
  ["Molecular Polarity Explorer", "/lab/molecular-polarity", "Combine bond dipoles and geometry.", "amber"],
  ["Curved-arrow Playground", "/lab/curved-arrow-playground", "Explore electron movement in reaction mechanisms.", "rose"],
  ["SN2 Mechanism Player", "/lab/sn2-mechanism", "Step through a concerted substitution reaction.", "cyan"],
  ["SN1 Mechanism Player", "/lab/sn1-mechanism", "Follow carbocation formation and nucleophile attack.", "violet"],
] as const;

const toneClasses = {
  slate: "border-slate-200 hover:border-slate-400 hover:bg-slate-50",
  blue: "border-blue-200 bg-blue-50 text-blue-950 hover:border-blue-400 hover:bg-blue-100",
  violet: "border-violet-200 bg-violet-50 text-violet-950 hover:border-violet-400 hover:bg-violet-100",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-400 hover:bg-emerald-100",
  amber: "border-amber-200 bg-amber-50 text-amber-950 hover:border-amber-400 hover:bg-amber-100",
  rose: "border-rose-200 bg-rose-50 text-rose-950 hover:border-rose-400 hover:bg-rose-100",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-950 hover:border-cyan-400 hover:bg-cyan-100",
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
            {tools.map(([title, href, description, tone]) => (
              <Link key={href} href={href} className={`block rounded-2xl border p-4 transition ${toneClasses[tone]}`}>
                <span className="font-semibold">{title}</span>
                <span className="mt-1 block text-sm opacity-80">{description}</span>
              </Link>
            ))}
          </div>
        </div>
      }
    >
      <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">New lab</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">SN1 Mechanism Player</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          Follow leaving-group departure, carbocation formation, nucleophile attack, and deprotonation one step at a time.
        </p>
        <Link href="/lab/sn1-mechanism" className="mt-5 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700">
          Open mechanism →
        </Link>
      </div>
      <FunctionalGroupQuickCheck />
    </LabShell>
  );
}
