import type { Metadata } from "next";
import { DilutionCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dilution Calculator",
  description: "Solve C1V1 = C2V2 for stock concentration, stock volume, final concentration, or final volume.",
  path: "/calculators/dilution",
  keywords: ["dilution calculator", "C1V1 C2V2", "solution dilution"],
});

export default function DilutionPage() {
  return <DilutionCalculator />;
}
