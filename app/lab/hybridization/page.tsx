import type { Metadata } from "next";
import Link from "next/link";
import { HybridizationTrainer, LabShell } from "@/components/lab";

export const metadata: Metadata = {
  title: "Hybridization Trainer | Organic Chemistry Hub",
  description: "Practise identifying sp, sp², and sp³ hybridization with instant feedback.",
};

export default function HybridizationTrainerPage() {
  return (
    <LabShell
      title="Hybridization Trainer"
      description="Count electron domains, connect hybridization to geometry, and recognise when π bonding or resonance changes the answer."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Quick method</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li><strong>1.</strong> Select one atom.</li>
            <li><strong>2.</strong> Count σ-bond domains and lone pairs.</li>
            <li><strong>3.</strong> Check for π bonding, empty p orbitals, or resonance.</li>
          </ol>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p><strong>2 domains:</strong> sp</p>
            <p><strong>3 domains:</strong> sp²</p>
            <p><strong>4 domains:</strong> sp³</p>
          </div>
          <Link href="/learn/fundamentals/hybridization" className="mt-5 inline-flex font-semibold text-blue-700 hover:text-blue-900">
            Review the lesson →
          </Link>
        </div>
      }
    >
      <HybridizationTrainer />
    </LabShell>
  );
}
