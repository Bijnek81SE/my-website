import type { Metadata } from "next";
import Link from "next/link";
import { LabShell, MolecularGeometryTrainer } from "@/components/lab";

export const metadata: Metadata = {
  title: "Molecular Geometry Trainer | Organic Chemistry Hub",
  description: "Practise VSEPR molecular geometry with interactive SVG models and immediate feedback.",
};

export default function MolecularGeometryTrainerPage() {
  return (
    <LabShell
      accent="blue"
      title="Molecular Geometry Trainer"
      description="Use electron domains and lone pairs to predict molecular shape, hybridization, and bond angles."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">VSEPR method</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li><strong>1.</strong> Identify the central atom.</li>
            <li><strong>2.</strong> Count bonding domains and lone pairs.</li>
            <li><strong>3.</strong> Find the electron geometry.</li>
            <li><strong>4.</strong> Ignore lone-pair positions when naming molecular geometry.</li>
          </ol>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <p><strong>2 domains:</strong> linear</p>
            <p><strong>3 domains:</strong> trigonal planar</p>
            <p><strong>4 domains:</strong> tetrahedral</p>
            <p><strong>5 domains:</strong> trigonal bipyramidal</p>
            <p><strong>6 domains:</strong> octahedral</p>
          </div>
          <Link
            href="/learn/fundamentals/hybridization"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:text-blue-900"
          >
            Review hybridization →
          </Link>
        </div>
      }
    >
      <MolecularGeometryTrainer />
    </LabShell>
  );
}
