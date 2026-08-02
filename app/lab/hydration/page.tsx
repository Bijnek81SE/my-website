import type { Metadata } from "next";
import Link from "next/link";
import { HydrationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Acid-Catalysed Hydration Mechanism | Organic Chemistry Hub",
  description:
    "Explore Markovnikov hydration of propene with an interactive mechanism player, practice questions, and exam mode.",
};

export default function HydrationPage() {
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
          <HydrationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
