import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import ReagentsDiagram from "@/components/diagrams/ReagentsDiagram";

export const metadata: Metadata = {
  title: "Organic Chemistry Reagents",
  description:
    "Practical reagent guides covering uses, selectivity, handling, limitations, and alternatives.",
};

export default function ReagentsPage() {
  return (
    <SectionLanding
      eyebrow="Practical reference"
      title="Understand what a reagent does—and why"
      description="The reagent library is being built around chemical behaviour, selectivity, conditions, safety context, storage, and useful alternatives."
      heroContent={<ReagentsDiagram />}
      heroCaption="Reagent entries will connect function, selectivity, compatibility, and practical limitations."
      items={[
        {
          title: "Oxidizing agents",
          description:
            "PCC, DMP, Swern reagents, mCPBA, osmium tetroxide, and related oxidants.",
        },
        {
          title: "Reducing agents",
          description:
            "NaBH₄, LiAlH₄, DIBAL-H, borane, catalytic hydrogenation, and selective hydrides.",
        },
        {
          title: "Acids and bases",
          description:
            "Common Brønsted and Lewis acids and bases used in synthesis.",
        },
        {
          title: "Organometallic reagents",
          description:
            "Grignard, organolithium, organozinc, organoboron, and organocopper chemistry.",
        },
        {
          title: "Coupling reagents and catalysts",
          description:
            "Palladium catalysts, ligands, peptide coupling reagents, and activation systems.",
        },
        {
          title: "Solvents and additives",
          description:
            "Solvent properties, drying, compatibility, and common reaction additives.",
        },
      ]}
    />
  );
}
