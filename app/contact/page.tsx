import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact', description: 'Contact Organic Chemistry Hub with feedback, corrections, or collaboration ideas.' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Contact</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Feedback improves the hub.</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">A contact form and public email address will be added before the first public content launch. This page is reserved for corrections, suggestions, and collaboration inquiries.</p>
    </div>
  );
}
