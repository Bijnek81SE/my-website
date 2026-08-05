import type { Metadata } from "next";
import { ReactionExplorer } from "@/components/reactions";
import { JsonLd } from "@/components/seo";
import { createBreadcrumbJsonLd } from "@/lib/seo/structured-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Interactive Reaction Explorer",
  description: "Filter, compare, and practise organic chemistry reaction mechanisms, selectivity, reagents, and competing pathways.",
  path: "/reactions",
  keywords: ["organic reactions", "reaction comparison", "SN1 SN2 E1 E2", "alkene reactions"],
});

export default function ReactionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd data={createBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Reactions", path: "/reactions" }])} />
      <section className="border-b border-slate-200 bg-gradient-to-br from-emerald-950 via-slate-950 to-violet-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">Interactive reaction map</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">Compare mechanisms before memorising outcomes</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Filter by pathway, intermediate, timing, substrate, reagent, regioselectivity, and stereochemistry. Then compare two reactions side by side and launch the matching mechanism lab.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold"><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">12 mechanism-backed reactions</span><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Side-by-side comparison</span><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Direct lab links</span></div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8"><ReactionExplorer /></div>
    </main>
  );
}
