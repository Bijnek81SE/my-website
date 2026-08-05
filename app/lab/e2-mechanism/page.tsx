import type { Metadata } from "next";
import Link from "next/link";
import { E2MechanismPlayer } from "@/components/chemistry/mechanism";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'E2 Mechanism Player',
  description: 'Explore the concerted E2 elimination mechanism with animated curved arrows and anti-periplanar stereochemistry.',
  path: '/lab/e2-mechanism',
});

export default function E2MechanismPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav className="text-sm font-medium text-slate-600" aria-label="Breadcrumb">
          <Link href="/lab" className="transition hover:text-orange-700">
            Lab
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900">E2 Mechanism</span>
        </nav>

        <div className="mt-8">
          <E2MechanismPlayer />
        </div>
      </div>
    </main>
  );
}
