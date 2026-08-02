import type { Metadata } from "next";
import Link from "next/link";
import { HydrohalogenationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Hydrohalogenation Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov addition of HCl to an alkene with an interactive mechanism player, practice questions, and exam mode.",
};

export default function HydrohalogenationPage() {
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
          <HydrohalogenationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
