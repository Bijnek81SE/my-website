import type { Metadata } from "next";
import Link from "next/link";
import { HydroborationOxidationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Hydroboration–Oxidation Mechanism | Organic Chemistry Hub",
  description:
    "Explore anti-Markovnikov, syn hydration of an alkene through hydroboration and oxidation.",
};

export default function HydroborationOxidationPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex font-semibold text-cyan-700 transition hover:text-cyan-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-7">
          <HydroborationOxidationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
