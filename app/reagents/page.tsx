import type { Metadata } from "next";
import Link from "next/link";
import { SectionLanding } from "@/components/ui";
import ReagentsDiagram from "@/components/diagrams/ReagentsDiagram";
import { KnowledgeConnections } from "@/components/knowledge";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organic Chemistry Reagents",
  description: "Practical reagent guides covering uses, selectivity, handling, limitations, and alternatives.",
  path: "/reagents",
  keywords: ["organic chemistry reagents"],
});

export default function ReagentsPage() {
  return (
    <>
      <SectionLanding
        eyebrow="Practical reference"
        title="Understand what a reagent does—and why"
        description="The reaction explorer already connects common reagent systems to mechanism class, selectivity, products, and competing pathways. The reagent library will build on the same registry."
        heroContent={<ReagentsDiagram />}
        heroCaption="Reagent entries connect function, selectivity, compatibility, and practical limitations."
        items={[
          { title: "Compare reagent outcomes", description: "See how acids, bases, halogens, hydrides, peroxides, and catalysts change reaction pathways.", href: "/reactions", actionLabel: "Open reaction explorer" },
          { title: "Oxidizing agents", description: "PCC, DMP, Swern reagents, mCPBA, osmium tetroxide, and related oxidants." },
          { title: "Reducing agents", description: "NaBH₄, LiAlH₄, DIBAL-H, borane, catalytic hydrogenation, and selective hydrides." },
          { title: "Acids and bases", description: "Common Brønsted and Lewis acids and bases used in synthesis." },
          { title: "Organometallic reagents", description: "Grignard, organolithium, organozinc, organoboron, and organocopper chemistry." },
          { title: "Coupling reagents and catalysts", description: "Palladium catalysts, ligands, peptide coupling reagents, and activation systems." },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-violet-200 bg-violet-50 p-6">
          <h2 className="text-xl font-bold text-slate-950">See reagents in reaction context</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Filter reactions by mechanism and compare the exact reagent systems that lead to Markovnikov, anti-Markovnikov, syn, anti, substitution, elimination, or reduction outcomes.</p>
          <Link href="/reactions" className="mt-4 inline-flex rounded-xl bg-violet-700 px-4 py-2.5 font-semibold text-white hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600">Compare reagents →</Link>
        </div>
        <KnowledgeConnections nodeId="reference:reagents" title="Connect reagents to transformations" description="Use the graph to move from a reagent class to the reactions and mechanisms where it matters." kinds={["related", "practice"]} />
      </div>
    </>
  );
}
