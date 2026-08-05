import type { Metadata } from "next";
import Link from "next/link";
import { SectionLanding } from "@/components/ui";
import NamedReactionsDiagram from "@/components/diagrams/NamedReactionsDiagram";
import { KnowledgeConnections } from "@/components/knowledge";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Named Reactions",
  description: "Explore organic named reactions by transformation, mechanism, and synthetic purpose.",
  path: "/named-reactions",
  keywords: ["named reactions"],
});

export default function NamedReactionsPage() {
  return (
    <>
      <SectionLanding
        eyebrow="Reaction reference"
        title="Named reactions, explained with purpose"
        description="Use the interactive reaction explorer now to compare the mechanisms already implemented on the site. The named-reaction library will grow from the same structured registry."
        heroContent={<NamedReactionsDiagram />}
        heroCaption="Each entry connects substrate, reagents and conditions, mechanism, and product."
        items={[
          { title: "Interactive reaction explorer", description: "Compare substitution, elimination, alkene-addition, and reduction pathways side by side.", href: "/reactions", actionLabel: "Open explorer" },
          { title: "Carbon–carbon bond formation", description: "Aldol, Claisen, Michael, Wittig, Grignard, and related reactions." },
          { title: "Cross-coupling reactions", description: "Suzuki, Heck, Sonogashira, Negishi, Stille, Buchwald–Hartwig, and more." },
          { title: "Cycloadditions and pericyclic reactions", description: "Diels–Alder, electrocyclic reactions, sigmatropic rearrangements, and related chemistry." },
          { title: "Oxidations and reductions", description: "Named transformations that change oxidation state with useful selectivity." },
          { title: "Rearrangements", description: "Beckmann, Baeyer–Villiger, Claisen, Cope, pinacol, Wagner–Meerwein, and others." },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-bold text-slate-950">Start with mechanism-backed reactions</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">The explorer includes every reaction that already has an interactive mechanism lab, so each comparison can lead directly into practice.</p>
          <Link href="/reactions" className="mt-4 inline-flex rounded-xl bg-emerald-700 px-4 py-2.5 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">Explore reactions →</Link>
        </div>
        <KnowledgeConnections nodeId="reference:named-reactions" title="Build the reaction context" description="Named reactions become easier to understand when mechanisms and reagent roles are connected." kinds={["related", "prerequisite", "practice"]} />
      </div>
    </>
  );
}
