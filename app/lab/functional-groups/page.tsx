import type { Metadata } from "next";
import Link from "next/link";
import { FunctionalGroupExplorer, LabShell } from "@/components/lab";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: 'Functional Group Explorer',
  description: 'Practise recognising common organic functional groups with immediate feedback, hints, and nomenclature guidance.',
  path: '/lab/functional-groups',
});

export default function FunctionalGroupsLabPage() {
  return (
    <LabShell
      accent="emerald"
      eyebrow="Organic Chemistry Lab"
      title="Functional Group Explorer"
      description="Recognise common functional groups from condensed structures, reveal the highlighted group, and review its naming pattern."
      sidebar={
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">How it works</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
              <li>Inspect the condensed structure.</li>
              <li>Choose the functional group.</li>
              <li>Use a hint after an incorrect attempt.</li>
              <li>Review the highlighted pattern and naming rules.</li>
            </ol>
          </div>
          <Link href="/functional-groups" className="block rounded-2xl border border-slate-200 p-4 font-semibold text-slate-900 transition hover:border-blue-400 hover:bg-blue-50">
            Read the functional-groups guide →
          </Link>
        </div>
      }
    >
      <FunctionalGroupExplorer />
    </LabShell>
  );
}
