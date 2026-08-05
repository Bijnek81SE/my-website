import type { Metadata } from "next";
import Link from "next/link";
import { ElectrophilicAdditionMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title:
    "Electrophilic Addition Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov addition of HBr to an alkene through protonation, carbocation formation, and bromide attack.",
};

export default function ElectrophilicAdditionPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav
          className="text-sm font-medium text-slate-600"
          aria-label="Breadcrumb"
        >
          <Link
            href="/lab"
            className="transition hover:text-rose-700"
          >
            Lab
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900">
            Electrophilic Addition
          </span>
        </nav>

        <div className="mt-8">
          <ElectrophilicAdditionMechanismPlayer />
        </div>
      </div>
    </main>
  );
}