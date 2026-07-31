import type { Metadata } from "next";
import Link from "next/link";
import E1MechanismPlayer from "@/components/chemistry/mechanism/E1MechanismPlayer";

export const metadata: Metadata = {
  title: "E1 Mechanism Player | Organic Chemistry Hub",
  description:
    "Explore the stepwise E1 elimination mechanism with carbocation formation, beta deprotonation, and alkene formation.",
};

export default function E1MechanismPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav className="text-sm font-medium text-slate-600" aria-label="Breadcrumb">
          <Link href="/lab" className="transition hover:text-emerald-700">
            Lab
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900">E1 Mechanism</span>
        </nav>

        <div className="mt-8">
          <E1MechanismPlayer />
        </div>
      </div>
    </main>
  );
}
