import type { Metadata } from "next";
import Link from "next/link";
import {
  FunctionalGroupQuickCheck,
  LabShell,
} from "@/components/lab";

export const metadata: Metadata = {
  title: "Organic Chemistry Lab | Organic Chemistry Hub",
  description: "Practise organic chemistry with interactive exercises and immediate feedback.",
};

export default function LabPage() {
  return (
    <LabShell
      title="Learn by doing"
      description="Build structures, identify patterns, and get immediate chemistry-focused feedback. This page also demonstrates the reusable lab framework used by future interactive lessons."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Available tools</h2>
          <div className="mt-4 space-y-3">
            <Link
              href="/calculators/lewis-structure-builder"
              className="block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <span className="font-semibold text-slate-950">Lewis Structure Builder</span>
              <span className="mt-1 block text-sm text-slate-600">Build H₂O, NH₃, and CO₂.</span>
            </Link>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <span className="font-semibold text-blue-950">Functional Group Explorer</span>
              <span className="mt-1 block text-sm text-blue-800">Pilot exercise included below.</span>
            </div>
          </div>
        </div>
      }
    >
      <FunctionalGroupQuickCheck />
    </LabShell>
  );
}
