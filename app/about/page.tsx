import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About', description: 'Learn about the mission and standards behind Organic Chemistry Hub.' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">About the project</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Organic chemistry should be easier to navigate.</h1>
      <div className="mt-8 space-y-6 text-lg leading-8 text-slate-600">
        <p>Organic Chemistry Hub is being built as a connected educational and practical reference platform—not a collection of isolated blog posts.</p>
        <p>The project combines chemistry expertise with AI-assisted drafting and software development. Scientific review, source selection, correction, and practical context remain human responsibilities.</p>
        <p>The long-term goal is to connect lessons, named reactions, reagents, functional groups, calculators, practice material, and references in one coherent system.</p>
      </div>
    </div>
  );
}
