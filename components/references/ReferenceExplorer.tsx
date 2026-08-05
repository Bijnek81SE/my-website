"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { ChemistryReference } from "@/content/references";

export default function ReferenceExplorer({ entries, title }: { entries: readonly ChemistryReference[]; title: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(entries.map((entry) => entry.category))];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesCategory = category === "All" || entry.category === category;
      const haystack = `${entry.name} ${entry.formula} ${entry.summary} ${entry.keywords.join(" ")}`.toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [category, entries, query]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8" aria-labelledby="reference-library-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Chemistry reference</p><h1 id="reference-library-title" className="mt-2 text-4xl font-bold tracking-tight text-slate-950">{title}</h1><p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">Search concise, connected reference entries and jump directly to the relevant lessons, reactions, and interactive labs.</p></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-[34rem]">
          <label className="text-sm font-medium text-slate-700">Search<input value={query} onChange={(e) => setQuery(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5" placeholder="Search names, formulas, or reactivity" /></label>
          <label className="text-sm font-medium text-slate-700">Category<select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500" role="status">{filtered.length} of {entries.length} entries</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((entry) => <Link key={`${entry.kind}:${entry.slug}`} href={entry.kind === "functional-group" ? `/functional-groups/${entry.slug}` : `/reagents/${entry.slug}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"><div className="flex items-start justify-between gap-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{entry.category}</span><span className="font-mono text-sm text-slate-500">{entry.formula}</span></div><h2 className="mt-4 text-xl font-bold text-slate-950">{entry.name}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{entry.summary}</p><span className="mt-5 inline-flex font-semibold text-emerald-700">Open reference →</span></Link>)}
      </div>
    </section>
  );
}
