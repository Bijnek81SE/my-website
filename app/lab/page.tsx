import type { Metadata } from "next";
import Link from "next/link";
import { FunctionalGroupQuickCheck, LabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Organic Chemistry Lab | Organic Chemistry Hub",
  description:
    "Practise organic chemistry with interactive exercises and immediate feedback.",
};

const tools = [
  [
    "Lewis Structure Builder",
    "/lab/lewis-structure-builder",
    "Build H₂O, NH₃, and CO₂.",
    "slate",
  ],
  [
    "Functional Group Explorer",
    "/lab/functional-groups",
    "Practise nine common functional groups.",
    "blue",
  ],
  [
    "Hybridization Trainer",
    "/lab/hybridization",
    "Predict sp, sp², and sp³ with feedback.",
    "violet",
  ],
  [
    "Molecular Geometry Trainer",
    "/lab/molecular-geometry",
    "Practise VSEPR shapes with SVG models.",
    "emerald",
  ],
  [
    "Molecular Polarity Explorer",
    "/lab/molecular-polarity",
    "Combine bond dipoles and geometry.",
    "amber",
  ],
  [
    "Curved-arrow Playground",
    "/lab/curved-arrow-playground",
    "Explore electron movement in reaction mechanisms.",
    "rose",
  ],
  [
    "SN2 Mechanism Player",
    "/lab/sn2-mechanism",
    "Step through a concerted substitution reaction.",
    "cyan",
  ],
  [
    "SN1 Mechanism Player",
    "/lab/sn1-mechanism",
    "Follow carbocation formation and nucleophile attack.",
    "violet",
  ],
  [
    "E2 Mechanism Player",
    "/lab/e2-mechanism",
    "Explore β-hydrogen removal, π-bond formation, and leaving-group departure.",
    "orange",
  ],
  [
    "E1 Mechanism Player",
    "/lab/e1-mechanism",
    "Follow carbocation formation, β-deprotonation, and alkene formation.",
    "emerald",
  ],
  [
    "Electrophilic Addition",
    "/lab/electrophilic-addition",
    "Explore Markovnikov addition of HBr to an alkene.",
    "rose",
  ],
  [
    "Hydrohalogenation",
    "/lab/hydrohalogenation",
    "Add HCl to an alkene through a carbocation intermediate.",
    "cyan",
  ],
  [
    "Acid-Catalysed Hydration",
    "/lab/hydration",
    "Add water to an alkene and predict the Markovnikov alcohol.",
    "blue",
  ],
] as const;

const toneClasses = {
  slate: "border-slate-200 hover:border-slate-400 hover:bg-slate-50",
  blue:
    "border-blue-200 bg-blue-50 text-blue-950 hover:border-blue-400 hover:bg-blue-100",
  violet:
    "border-violet-200 bg-violet-50 text-violet-950 hover:border-violet-400 hover:bg-violet-100",
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-400 hover:bg-emerald-100",
  amber:
    "border-amber-200 bg-amber-50 text-amber-950 hover:border-amber-400 hover:bg-amber-100",
  rose:
    "border-rose-200 bg-rose-50 text-rose-950 hover:border-rose-400 hover:bg-rose-100",
  cyan:
    "border-cyan-200 bg-cyan-50 text-cyan-950 hover:border-cyan-400 hover:bg-cyan-100",
  orange:
    "border-orange-200 bg-orange-50 text-orange-950 hover:border-orange-400 hover:bg-orange-100",
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
              <Link
                key={href}
                href={href}
                className={`block rounded-2xl border p-4 transition ${toneClasses[tone]}`}
              >
                <span className="font-semibold">{title}</span>
                <span className="mt-1 block text-sm opacity-80">
                  {description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      }
    >
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          New alkene mechanism
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Acid-Catalysed Hydration of Alkenes
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          Follow Markovnikov hydration of propene through protonation,
          carbocation formation, water attack, and acid regeneration.
        </p>

        <Link
          href="/lab/hydration"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Open mechanism →
        </Link>
      </div>

      <FunctionalGroupQuickCheck />
    </LabShell>
  );
}