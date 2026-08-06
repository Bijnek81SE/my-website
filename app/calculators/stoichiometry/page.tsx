import type { Metadata } from "next";
import { StoichiometryCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Stoichiometry Calculator",
  description: "Convert reactant mass or moles to expected product amount using balanced-equation coefficients.",
  path: "/calculators/stoichiometry",
  keywords: ["stoichiometry calculator", "mole ratio", "reaction scale"],
});

export default function StoichiometryPage() {
  return <StoichiometryCalculator />;
}
