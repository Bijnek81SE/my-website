import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import NamedReactionsDiagram from "@/components/diagrams/NamedReactionsDiagram";
import { KnowledgeConnections } from "@/components/knowledge";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Named Reactions',
  description: 'Explore organic named reactions by transformation, mechanism, and synthetic purpose.',
  path: '/named-reactions',
  keywords: ['named reactions'],
});

export default function NamedReactionsPage() {
  return (
    <>
      <SectionLanding
        eyebrow="Reaction reference"
        title="Named reactions, explained with purpose"
        description="This reference library is being organized by transformation and synthetic use. Each published entry will cover mechanism, conditions, scope, limitations, and alternatives."
        heroContent={<NamedReactionsDiagram />}
        heroCaption="Each entry will connect substrate, reagents and conditions, mechanism, and product."
        items={[
          { title: "Carbon–carbon bond formation", description: "Aldol, Claisen, Michael, Wittig, Grignard, and related reactions." },
          { title: "Cross-coupling reactions", description: "Suzuki, Heck, Sonogashira, Negishi, Stille, Buchwald–Hartwig, and more." },
          { title: "Cycloadditions and pericyclic reactions", description: "Diels–Alder, electrocyclic reactions, sigmatropic rearrangements, and related chemistry." },
          { title: "Oxidations and reductions", description: "Named transformations that change oxidation state with useful selectivity." },
          { title: "Rearrangements", description: "Beckmann, Baeyer–Villiger, Claisen, Cope, pinacol, Wagner–Meerwein, and others." },
          { title: "A–Z index", description: "An alphabetical index will grow as reviewed reaction pages are published." },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <KnowledgeConnections
          nodeId="reference:named-reactions"
          title="Build the reaction context"
          description="Named reactions become easier to understand when mechanisms and reagent roles are connected."
          kinds={["related", "prerequisite", "practice"]}
        />
      </div>
    </>
  );
}
