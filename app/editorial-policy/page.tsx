import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Editorial Policy', description: 'How Organic Chemistry Hub drafts, reviews, cites, corrects, and updates chemistry content.' };

export default function EditorialPolicyPage() {
  const points = [
    ['Scientific review', 'Chemistry content is reviewed for mechanism, terminology, scope, conditions, and limitations before publication.'],
    ['Source quality', 'Primary literature, authoritative reference works, and established textbooks are preferred.'],
    ['AI use', 'AI may assist with outlining, drafting, coding, and editing. It is not treated as a scientific source.'],
    ['Corrections', 'Material will be corrected transparently when errors or ambiguities are identified.'],
    ['Safety', 'Safety information supports education but does not replace institutional procedures, SDS documents, risk assessments, or professional supervision.'],
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Trust and quality</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Editorial policy</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">These standards guide how the site is built and how content will be reviewed over time.</p>
      <div className="mt-10 space-y-5">
        {points.map(([title, text]) => (
          <section key={title} className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
