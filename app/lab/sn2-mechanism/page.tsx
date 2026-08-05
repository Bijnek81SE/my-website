import type { Metadata } from "next";
import Link from "next/link";
import { Sn2MechanismPlayer } from "@/components/chemistry/mechanism";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'SN2 Mechanism Player',
  description: 'Explore an SN2 substitution mechanism step by step with animated curved arrows and electron-movement explanations.',
  path: '/lab/sn2-mechanism',
});

export default function Sn2MechanismPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex font-semibold text-blue-700 transition hover:text-blue-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-7">
          <Sn2MechanismPlayer />
        </div>
      </div>
    </main>
  );
}
