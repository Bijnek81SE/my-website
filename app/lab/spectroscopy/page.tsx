import type { Metadata } from "next";
import Link from "next/link";
import { LabShell } from "@/components/lab";
import { SpectroscopyLab } from "@/components/spectroscopy";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Interactive Spectroscopy Lab",
  description: "Explore realistic simulated 1H NMR, 13C NMR, IR, and mass spectra with structure-to-peak assignments.",
  path: "/lab/spectroscopy",
  keywords: ["spectroscopy", "NMR", "IR spectroscopy", "mass spectrometry", "peak assignment"],
});

export default function SpectroscopyPage() {
  return (
    <LabShell
      accent="blue"
      title="Interactive Spectroscopy Lab"
      description="Use a shared spectroscopy engine to connect chemical structure with realistic simulated ¹H NMR, ¹³C NMR, IR, and mass spectra."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Evidence workflow</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li><strong>1.</strong> Identify molecular symmetry and distinct environments.</li>
            <li><strong>2.</strong> Use IR and MS to constrain functional groups and formula.</li>
            <li><strong>3.</strong> Assign NMR shifts, integrations, and splitting patterns.</li>
          </ol>
          <Link href="/learn/fundamentals/chemical-bonding" className="mt-5 inline-flex font-semibold text-cyan-700 hover:text-cyan-900">Review bonding concepts →</Link>
        </div>
      }
    >
      <SpectroscopyLab />
    </LabShell>
  );
}
