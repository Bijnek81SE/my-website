import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import ReagentsDiagram from "@/components/diagrams/ReagentsDiagram";
import { KnowledgeConnections } from "@/components/knowledge";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Organic Chemistry Reagents',
  description: 'Practical reagent guides covering uses, selectivity, handling, limitations, and alternatives.',
  path: '/reagents',
  keywords: ['organic chemistry reagents'],
});

export default function ReagentsPage() {
  return (
    <>
      <SectionLanding
        eyebrow="Practical reference"
        title="Understand what a reagent does—and why"
        description="The reagent library is being built around chemical behaviour, selectivity, conditions, safety context, storage, and useful alternatives."
        heroContent={<ReagentsDiagram />}
        heroCaption="Reagent entries will connect function, selectivity, compatibility, and practical limitations."
        items={[
          { title: "Oxidizing agents", description: "PCC, DMP, Swern reagents, mCPBA, osmium tetroxide, and related oxidants." },
          { title: "Reducing agents", description: "NaBH₄, LiAlH₄, DIBAL-H, borane, catalytic hydrogenation, and selective hydrides." },
          { title: "Acids and bases", description: "Common Brønsted and Lewis acids and bases used in synthesis." },
          { title: "Organometallic reagents", description: "Grignard, organolithium, organozinc, organoboron, and organocopper chemistry." },
          { title: "Coupling reagents and catalysts", description: "Palladium catalysts, ligands, peptide coupling reagents, and activation systems." },
          { title: "Solvents and additives", description: "Solvent properties, drying, compatibility, and common reaction additives." },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <KnowledgeConnections
          nodeId="reference:reagents"
          title="Connect reagents to transformations"
          description="Use the graph to move from a reagent class to the reactions and mechanisms where it matters."
          kinds={["related", "practice"]}
        />
      </div>
    </>
  );
}
