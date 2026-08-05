import type { Metadata } from "next";
import Link from "next/link";
import { StudyDashboard } from "@/components/learning";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Study Dashboard",
  description:
    "Track organic chemistry progress, review due concepts, and continue your personalised study plan.",
  path: "/study",
  keywords: [
    "organic chemistry study dashboard",
    "chemistry progress tracker",
    "spaced repetition",
  ],
});

export default function StudyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
            Your learning workspace
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Study dashboard
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Continue where you left off, review concepts at the right time,
            and see your progress across lessons and mechanism practice.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Progress stays in this browser. No account is required.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/learn"
            className="text-sm font-semibold text-emerald-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            ← Browse curriculum
          </Link>
          <Link
            href="/lab"
            className="text-sm font-semibold text-violet-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          >
            Open interactive labs →
          </Link>
        </div>
        <StudyDashboard />
      </div>
    </main>
  );
}
