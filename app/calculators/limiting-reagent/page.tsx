import type { Metadata } from "next";
import { LimitingReagentCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Limiting Reagent Calculator",
  description: "Identify the limiting reactant, excess reagent remaining, and theoretical product yield.",
  path: "/calculators/limiting-reagent",
  keywords: ["limiting reagent calculator", "theoretical yield", "excess reactant"],
});

export default function LimitingReagentPage() {
  return <LimitingReagentCalculator />;
}
