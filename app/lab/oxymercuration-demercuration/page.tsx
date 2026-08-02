import type { Metadata } from "next";
import Link from "next/link";
import { OxymercurationDemercurationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Oxymercuration–Demercuration Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov hydration of an alkene through a bridged mercurinium ion and reductive demercuration.",
};

export default function OxymercurationDemercurationPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex font-semibold text-violet-700 transition hover:text-violet-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-7">
          <OxymercurationDemercurationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
