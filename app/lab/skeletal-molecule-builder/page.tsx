import type { Metadata } from "next";
import Link from "next/link";
import SkeletalMoleculePlayground from "@/components/chemistry/SkeletalMoleculePlayground";

export const metadata: Metadata = {
  title: "Skeletal Molecule Builder | Organic Chemistry Hub",
  description:
    "Preview reusable line-angle molecule definitions with consistent bonds, rings, stereochemistry, charges, and radicals.",
};

export default function SkeletalMoleculeBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/lab"
          className="font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          ← Back to Lab
        </Link>

        <div className="mt-6">
          <SkeletalMoleculePlayground />
        </div>
      </div>
    </main>
  );
}
