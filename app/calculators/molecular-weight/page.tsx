import type { Metadata } from "next";
import { MolecularWeightCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Molecular Weight Calculator",
  description: "Calculate molar mass and elemental composition from molecular formulas, brackets, and hydrates.",
  path: "/calculators/molecular-weight",
  keywords: ["molar mass calculator", "molecular weight", "chemical formula"],
});

export default function MolecularWeightPage() {
  return <MolecularWeightCalculator />;
}
