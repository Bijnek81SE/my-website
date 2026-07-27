import type { Metadata } from "next";
import Link from "next/link";
import { LewisStructureBuilder } from "@/components/chemistry";

export const metadata: Metadata = {
  title: "Lewis Structure Builder",
  description:
    "Practise Lewis structures interactively by changing bond orders, placing lone pairs, checking octets, and calculating formal charges.",
};

export default function LewisStructureBuilderPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18 lg:px-8">
          <nav className="text-sm font-medium text-slate-600" aria-label="Breadcrumb">
            <Link href="/calculators" className="transition hover:text-emerald-700">
              Calculators & tools
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900">Lewis Structure Builder</span>
          </nav>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            Guided practice tool
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Build Lewis structures and get instant feedback
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Practise electron counting, bond orders, lone pairs, octets, and formal charges using three introductory molecules.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <LewisStructureBuilder />

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-emerald-700">1. Count electrons</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Start with the valence total</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Every bond uses two electrons. Every lone pair also uses two electrons. The remaining counter helps you avoid adding too many.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-emerald-700">2. Complete shells</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Check duets and octets</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Hydrogen needs two electrons. Carbon, nitrogen, and oxygen in these examples are most stable with eight electrons around them.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-emerald-700">3. Review charges</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">Minimise formal charge</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The tool recalculates formal charge after every change, helping you compare plausible structures rather than guessing.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
