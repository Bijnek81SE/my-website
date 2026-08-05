import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageShell } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: 'Contact Organic Chemistry Hub about corrections, feedback, accessibility, and collaboration.',
  path: '/contact',
  keywords: ['contact organic chemistry hub'],
});

const contactTopics = [
  {
    title: "Report a correction",
    text: "Include the page address, the statement or interaction concerned, and a short explanation or supporting source where possible.",
  },
  {
    title: "Suggest an improvement",
    text: "Share ideas for lessons, mechanisms, tools, accessibility, or navigation that would make the platform more useful.",
  },
  {
    title: "Discuss collaboration",
    text: "Describe the proposed contribution, relevant chemistry or teaching experience, and the intended scope.",
  },
] as const;

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Contact"
      title="Feedback improves the hub."
      description="Corrections, suggestions, and focused collaboration proposals are welcome. The project repository currently provides the public contact channel."
      footerLink={{ href: "/editorial-policy", label: "See how corrections are handled" }}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {contactTopics.map((topic) => (
          <section key={topic.title} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-950">{topic.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{topic.text}</p>
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-2xl bg-slate-950 p-7 text-white sm:p-8">
        <h2 className="text-xl font-semibold">Open a GitHub issue</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          Use a clear title and avoid including private, confidential, or personally sensitive
          information in a public issue.
        </p>
        <Link
          href="https://github.com/Bijnek81SE/my-website/issues"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline-none"
        >
          Open repository issues
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
      </section>
    </InfoPageShell>
  );
}
