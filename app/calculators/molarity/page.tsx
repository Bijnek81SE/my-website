import type { Metadata } from "next";
import { MolarityCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Molarity and Solution Preparation Calculator",
  description: "Solve molarity, moles, solute mass, or solution volume with automatic chemistry unit conversion.",
  path: "/calculators/molarity",
  keywords: ["molarity calculator", "solution preparation", "moles volume concentration"],
});

export default function MolarityPage() {
  return <MolarityCalculator />;
}
