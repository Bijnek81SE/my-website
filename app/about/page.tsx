import type { Metadata } from "next";
import { InfoPageShell } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description: 'Learn about the mission, editorial standards, and development of Organic Chemistry Hub.',
  path: '/about',
  keywords: ['about organic chemistry hub'],
});

const principles = [
  {
    title: "Connected understanding",
    text: "Lessons, interactive labs, mechanisms, functional groups, reagents, and reference material are designed to reinforce one another rather than live as isolated pages.",
  },
  {
    title: "Chemistry before decoration",
    text: "Visuals and interactions should clarify electron movement, structure, and reactivity. They are not added merely for novelty.",
  },
  {
    title: "Transparent development",
    text: "Available material is distinguished from planned content, and scientific or technical corrections are incorporated as the platform develops.",
  },
] as const;

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About the project"
      title="Organic chemistry should be easier to navigate."
      description="Organic Chemistry Hub is being built as a connected educational and practical reference platform—not a collection of isolated blog posts."
      footerLink={{ href: "/editorial-policy", label: "Read the editorial policy" }}
    >
      <div className="space-y-6 text-lg leading-8 text-slate-600">
        <p>
          The project combines chemistry expertise with AI-assisted drafting and software
          development. Scientific review, source selection, correction, and practical context
          remain human responsibilities.
        </p>
        <p>
          The long-term goal is to connect lessons, named reactions, reagents, functional
          groups, calculators, practice material, and references in one coherent system.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {principles.map((principle) => (
          <section key={principle.title} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-950">{principle.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{principle.text}</p>
          </section>
        ))}
      </div>
    </InfoPageShell>
  );
}
