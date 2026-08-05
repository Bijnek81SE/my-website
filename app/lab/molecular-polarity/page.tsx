import type { Metadata } from "next";
import Link from "next/link";
import { LabShell, MolecularPolarityExplorer } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Molecular Polarity Explorer',
  description: 'Connect bond polarity, molecular geometry, and dipole cancellation with interactive diagrams.',
  path: '/lab/molecular-polarity',
});

export default function MolecularPolarityExplorerPage() {
  return (
    <LabShell
      accent="rose"
      title="Molecular Polarity Explorer"
      description="Combine electronegativity and molecular geometry to decide whether bond dipoles cancel or produce a net molecular dipole."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Polarity method</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li><strong>1.</strong> Identify polar bonds.</li>
            <li><strong>2.</strong> Determine the molecular geometry.</li>
            <li><strong>3.</strong> Treat bond dipoles as vectors.</li>
            <li><strong>4.</strong> Decide whether the vectors cancel.</li>
          </ol>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <p><strong>Symmetric + identical outer atoms:</strong> often non-polar.</p>
            <p className="mt-2"><strong>Bent, pyramidal, or mixed outer atoms:</strong> often polar.</p>
          </div>
          <Link
            href="/lab/molecular-geometry"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:text-blue-900"
          >
            Review molecular geometry →
          </Link>
        </div>
      }
    >
      <MolecularPolarityExplorer />
    </LabShell>
  );
}
