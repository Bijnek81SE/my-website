import type { Metadata } from "next";
import Link from "next/link";
import { molecules } from "@/content/molecules";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organic molecule library",
  description: "Browse canonical organic molecules and their connected reactions, reagents, mechanisms, lessons, and tools.",
  path: "/molecules",
  keywords: ["organic molecules", "alkenes", "structures", "reaction reference"],
});

export default function MoleculesPage() {
  const alkenes = molecules.filter((molecule) => molecule.functionalGroupIds.some((id) => id === "alkene"));
  const other = molecules.filter((molecule) => !molecule.functionalGroupIds.some((id) => id === "alkene"));

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Canonical chemistry library</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">Organic molecules</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Molecule records are the shared structural source for Workspace context, semantic relationships, calculations, spectroscopy assignments, and chemistry expansion.</p>

        <section className="mt-10" aria-labelledby="alkene-library-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-700">Phase 12 · Wave 1</p>
              <h2 id="alkene-library-heading" className="mt-1 text-2xl font-bold text-slate-950">Alkene ecosystem</h2>
            </div>
            <p className="text-sm text-slate-600">{alkenes.length} canonical alkene molecules</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alkenes.map((molecule) => (
              <Link key={molecule.id} href={`/molecules/${molecule.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
                <span className="text-lg font-bold text-slate-950">{molecule.name}</span>
                <span className="mt-1 block text-sm font-semibold text-emerald-700">{molecule.displayFormula}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{molecule.condensedFormula}</span>
              </Link>
            ))}
          </div>
        </section>

        {other.length > 0 ? (
          <section className="mt-12" aria-labelledby="other-molecules-heading">
            <h2 id="other-molecules-heading" className="text-2xl font-bold text-slate-950">Other canonical molecules</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {other.map((molecule) => (
                <Link key={molecule.id} href={`/molecules/${molecule.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm">
                  <span className="text-lg font-bold text-slate-950">{molecule.name}</span>
                  <span className="mt-1 block text-sm text-slate-600">{molecule.displayFormula}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
