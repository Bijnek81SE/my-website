import type { Metadata } from "next";
import { RetrosynthesisPlanner } from "@/components/retrosynthesis";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Retrosynthesis Planner",
  description: "Work backwards from organic targets, compare ranked disconnections, and validate every proposed step with a forward mechanism.",
  path: "/lab/retrosynthesis",
  keywords: ["retrosynthesis", "synthesis planning", "disconnection", "organic chemistry", "route search"],
});

export default function RetrosynthesisPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Interactive chemistry lab</p>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Retrosynthesis Planner</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Start with a target molecule, explore reverse transformations, and compare practical routes to known starting materials.</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8"><RetrosynthesisPlanner /></div>
    </main>
  );
}
