import type { Metadata } from "next";
import { InfoPageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Organic Chemistry Hub drafts, reviews, cites, corrects, and updates chemistry content.",
};

const standards = [
  {
    title: "Scientific review",
    text: "Chemistry content is reviewed for mechanism, terminology, scope, conditions, selectivity, and limitations before it is presented as reviewed reference material.",
  },
  {
    title: "Source quality",
    text: "Primary literature, authoritative reference works, established textbooks, and current institutional guidance are preferred according to the claim being supported.",
  },
  {
    title: "AI-assisted work",
    text: "AI may assist with outlining, drafting, coding, editing, and consistency checks. It is not treated as a scientific source or a substitute for subject-matter review.",
  },
  {
    title: "Corrections",
    text: "Errors and meaningful ambiguities are corrected when identified. Corrections should improve both the chemistry and any connected interactive behaviour.",
  },
  {
    title: "Availability labels",
    text: "Reference sections distinguish material that is available from material that is planned, so unfinished resources are not presented as published content.",
  },
  {
    title: "Safety",
    text: "Safety context supports education but does not replace current SDS documents, institutional procedures, formal risk assessment, approved supervision, or local regulations.",
  },
] as const;

export default function EditorialPolicyPage() {
  return (
    <InfoPageShell
      eyebrow="Trust and quality"
      title="Editorial policy"
      description="These standards guide how the site is drafted, reviewed, labelled, corrected, and maintained as the platform grows."
      footerLink={{ href: "/contact", label: "Report a correction or concern" }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {standards.map((standard) => (
          <section key={standard.title} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-950">{standard.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{standard.text}</p>
          </section>
        ))}
      </div>
    </InfoPageShell>
  );
}
