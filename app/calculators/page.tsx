import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import CalculatorsDiagram from "@/components/diagrams/CalculatorsDiagram";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Chemistry Calculators",
  description: "Practical chemistry calculators for molecular mass, solutions, stoichiometry, limiting reagents, yield, and Lewis structures.",
  path: "/calculators",
  keywords: ["chemistry calculators", "stoichiometry", "molarity", "molar mass"],
});

export default function CalculatorsPage() {
  return (
    <SectionLanding
      eyebrow="Practical tools"
      title="Calculate, plan, and understand chemistry quantitatively"
      description="Use validated calculators that show formulas, unit conversions, and intermediate steps instead of returning an unexplained number."
      heroContent={<CalculatorsDiagram />}
      heroCaption="Structure, solution, stoichiometry, limiting-reagent, and yield tools are available now."
      items={[
        {
          title: "Molecular weight calculator",
          description: "Parse molecular formulas, brackets, and hydrates to calculate molar mass and elemental composition.",
          href: "/calculators/molecular-weight",
          actionLabel: "Calculate molar mass",
        },
        {
          title: "Molarity and solution preparation",
          description: "Solve concentration, moles, solute mass, or solution volume with automatic unit conversion.",
          href: "/calculators/molarity",
          actionLabel: "Plan a solution",
        },
        {
          title: "Dilution calculator",
          description: "Solve any term in C₁V₁ = C₂V₂ for stock and final solutions.",
          href: "/calculators/dilution",
          actionLabel: "Plan a dilution",
        },
        {
          title: "Stoichiometry calculator",
          description: "Convert reactant mass or moles into expected product amount using a balanced mole ratio.",
          href: "/calculators/stoichiometry",
          actionLabel: "Scale a reaction",
        },
        {
          title: "Limiting reagent calculator",
          description: "Identify the limiting reactant, excess remaining, and theoretical product yield.",
          href: "/calculators/limiting-reagent",
          actionLabel: "Compare reactants",
        },
        {
          title: "Percent yield calculator",
          description: "Compare isolated and theoretical product amounts with unit-safe yield calculations.",
          href: "/calculators/percent-yield",
          actionLabel: "Calculate yield",
        },
        {
          title: "Lewis structure builder",
          description: "Change bond orders, place lone pairs, check octets, and calculate formal charges with immediate feedback.",
          href: "/calculators/lewis-structure-builder",
          actionLabel: "Open builder",
        },
      ]}
    />
  );
}
