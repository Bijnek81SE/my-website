import type { Metadata } from "next";
import Link from "next/link";
import { HydrogenationMechanismPlayer } from "@/components/chemistry/mechanism";

export const metadata: Metadata = {
  title: "Catalytic Hydrogenation of Alkenes | Organic Chemistry Hub",
  description:
    "Explore syn addition of hydrogen to cyclohexene on a metal catalyst with an interactive mechanism player.",
};

export default function HydrogenationPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="inline-flex font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-7">
          <HydrogenationMechanismPlayer />
        </div>
      </div>
    </main>
  );
}
