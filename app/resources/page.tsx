import type { Metadata } from "next";
import { SectionLanding } from "@/components/ui";
import ResourcesDiagram from "@/components/diagrams/ResourcesDiagram";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Resources',
  description: 'Organic chemistry study guides, references, reaction maps, laboratory templates, and recommended books.',
  path: '/resources',
  keywords: ['organic chemistry resources'],
});

export default function ResourcesPage() {
  return (
    <SectionLanding
      eyebrow="Reference library"
      title="Study and laboratory resources"
      description="This library will collect high-value supporting material that complements lessons, interactive labs, and reference pages."
      heroContent={<ResourcesDiagram />}
      heroCaption="Resources will be released after scientific and editorial review."
      items={[
        {
          title: "Cheat sheets",
          description:
            "Compact summaries for reactions, spectroscopy, stereochemistry, and synthesis.",
        },
        {
          title: "Reaction maps",
          description:
            "Visual connections among functional-group transformations.",
        },
        {
          title: "Practice sets",
          description:
            "Mechanism, synthesis, spectroscopy, and retrosynthesis exercises.",
        },
        {
          title: "Recommended books",
          description:
            "A curated reading list for different levels and specialties.",
        },
        {
          title: "Laboratory templates",
          description:
            "Reaction tables, notebooks, checklists, and planning worksheets.",
        },
        {
          title: "Reference standards",
          description:
            "Editorial conventions, terminology, units, and citation practices used across the site.",
          href: "/editorial-policy",
          actionLabel: "Read editorial policy",
        },
      ]}
    />
  );
}
