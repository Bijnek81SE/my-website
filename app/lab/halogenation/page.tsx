import type { Metadata } from "next";
import Link from "next/link";
import { HalogenationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Halogenation of Alkenes | Organic Chemistry Hub",
  description:
    "Explore bromonium-ion formation and anti addition of bromine to cyclohexene with an interactive mechanism player.",
};

export default function HalogenationPage() {
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
          <HalogenationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
