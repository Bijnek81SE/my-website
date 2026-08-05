import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import CalculatorsDiagram from "@/components/diagrams/CalculatorsDiagram";

export const metadata: Metadata = {
  title: "Chemistry Calculators",
  description:
    "Practical chemistry calculators and interactive learning tools for structures, solutions, stoichiometry, yield, and laboratory planning.",
};

export default function CalculatorsPage() {
  return (
    <SectionLanding
      eyebrow="Practical tools"
      title="Calculate, build, and practise chemistry concepts"
      description="Use interactive tools that expose the chemistry behind each result. Available tools are clearly separated from calculators still in development."
      heroContent={<CalculatorsDiagram />}
      heroCaption="Structure tools are available now; quantitative calculators will be added as they are validated."
      items={[
        {
          title: "Lewis structure builder",
          description:
            "Change bond orders, place lone pairs, check octets, and calculate formal charges with immediate feedback.",
          href: "/calculators/lewis-structure-builder",
          actionLabel: "Open builder",
        },
        {
          title: "Molecular weight calculator",
          description: "Calculate molar mass from a molecular formula.",
        },
        {
          title: "Molarity and solution preparation",
          description: "Determine solute mass, concentration, or final volume.",
        },
        {
          title: "Dilution calculator",
          description: "Plan dilutions using initial and final concentration and volume.",
        },
        {
          title: "Stoichiometry calculator",
          description: "Convert between mass, moles, equivalents, and reaction scale.",
        },
        {
          title: "Limiting reagent calculator",
          description: "Identify the limiting reactant and theoretical product amount.",
        },
        {
          title: "Percent yield calculator",
          description: "Compare isolated yield with theoretical yield.",
        },
      ]}
    />
  );
}
