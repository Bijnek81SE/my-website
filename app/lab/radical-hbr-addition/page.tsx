import type { Metadata } from "next";
import Link from "next/link";
import { RadicalHBrMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Radical HBr Addition Mechanism | Organic Chemistry Hub",
  description:
    "Explore anti-Markovnikov addition of HBr to an alkene through a peroxide-initiated radical chain mechanism.",
};

export default function RadicalHBrAdditionPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex font-semibold text-rose-700 transition hover:text-rose-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-7">
          <RadicalHBrMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
