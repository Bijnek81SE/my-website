import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import FunctionalGroupsDiagram from "@/components/diagrams/FunctionalGroupsDiagram";
import { KnowledgeConnections } from "@/components/knowledge";

export const metadata: Metadata = {
  title: "Functional Groups",
  description:
    "Learn organic functional groups, their properties, reactions, spectroscopy, and synthesis.",
};

export default function FunctionalGroupsPage() {
  return (
    <>
      <SectionLanding
        eyebrow="Structure and reactivity"
        title="Functional groups organize organic chemistry"
        description="Connect structure with physical properties, spectroscopy, synthesis, and characteristic reactions. Start with the interactive explorer while the detailed reference library grows."
        heroContent={<FunctionalGroupsDiagram />}
        heroCaption="Use the explorer to practise recognition before moving into detailed reference pages."
        items={[
          { title: "Interactive functional-group explorer", description: "Identify common groups, compare their defining atoms, and practise recognition with immediate feedback.", href: "/lab/functional-groups", actionLabel: "Open explorer" },
          { title: "Hydrocarbons", description: "Alkanes, alkenes, alkynes, aromatic compounds, and their characteristic reactions." },
          { title: "Oxygen-containing groups", description: "Alcohols, ethers, epoxides, aldehydes, ketones, acids, esters, and anhydrides." },
          { title: "Nitrogen-containing groups", description: "Amines, amides, imines, nitriles, nitro compounds, and related functionality." },
          { title: "Halogen-containing groups", description: "Alkyl halides, aryl halides, acyl halides, and their synthetic behaviour." },
          { title: "Sulfur and phosphorus groups", description: "Thiols, sulfides, sulfoxides, sulfones, phosphines, and phosphate derivatives." },
          { title: "Heterocycles", description: "Important aromatic and saturated rings containing nitrogen, oxygen, or sulfur." },
        ]}
      />
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <KnowledgeConnections
          nodeId="reference:functional-groups"
          title="Learn and practise together"
          description="Connect functional-group recognition with the bonding ideas and interactive tools that support it."
          kinds={["prerequisite", "practice", "related"]}
        />
      </div>
    </>
  );
}
