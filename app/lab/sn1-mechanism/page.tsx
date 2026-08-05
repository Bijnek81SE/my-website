import type { Metadata } from "next";
import Link from "next/link";
import { Sn1MechanismPlayer } from "@/components/chemistry/mechanism";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'SN1 Mechanism Player',
  description: 'Explore an SN1 substitution mechanism step by step with carbocation formation, animated curved arrows, and electron-movement explanations.',
  path: '/lab/sn1-mechanism',
});

export default function Sn1MechanismPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link href="/lab" className="inline-flex font-semibold text-violet-700 transition hover:text-violet-900">
          ← Back to Lab
        </Link>
        <div className="mt-7">
          <Sn1MechanismPlayer />
        </div>
      </div>
    </main>
  );
}
