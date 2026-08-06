import type { Metadata } from "next";
import { PercentYieldCalculator } from "@/components/calculators";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Percent Yield Calculator",
  description: "Calculate percent yield from actual and theoretical product amounts with automatic mass-unit conversion.",
  path: "/calculators/percent-yield",
  keywords: ["percent yield calculator", "actual yield", "theoretical yield"],
});

export default function PercentYieldPage() {
  return <PercentYieldCalculator />;
}
