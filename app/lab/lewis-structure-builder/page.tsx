import type { Metadata } from "next";
import { LewisStructureBuilder } from "@/components/chemistry";
import { LabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Lewis Structure Builder',
  description: 'Practise Lewis structures interactively by changing bond orders, placing lone pairs, checking octets, and calculating formal charges.',
  path: '/lab/lewis-structure-builder',
});

export default function LewisStructureBuilderPage() {
  return (
    <LabShell
      accent="emerald"
      eyebrow="Interactive lab"
      title="Build Lewis structures and get instant feedback"
      description="Practise electron counting, bond orders, lone pairs, octets, and formal charges using three introductory molecules."
    >
      <LewisStructureBuilder />

      <section className="grid gap-5 md:grid-cols-3" aria-label="Lewis structure method">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-emerald-700">1. Count electrons</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Start with the valence total
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Every bond uses two electrons. Every lone pair also uses two
            electrons. The remaining counter helps you avoid adding too many.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-emerald-700">2. Complete shells</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Check duets and octets
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Hydrogen needs two electrons. Carbon, nitrogen, and oxygen in these
            examples are most stable with eight electrons around them.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-emerald-700">3. Verify charges</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Finish with formal charge
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Compare each atom&apos;s valence count with its nonbonding electrons
            and half of its bonding electrons before accepting the structure.
          </p>
        </article>
      </section>
    </LabShell>
  );
}
