import type { Metadata } from "next";
import { ReferenceExplorer } from "@/components/references";
import { getReagentsByCapability } from "@/content/reagents";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organic Chemistry Reagents",
  description: "Searchable reagent guides covering purpose, selectivity, conditions, limitations, and safety.",
  path: "/reagents",
  keywords: ["organic chemistry reagents", "reaction conditions"],
});

export default function Page() {
  return <ReferenceExplorer entries={getReagentsByCapability("reference")} title="Reagent library" />;
}
