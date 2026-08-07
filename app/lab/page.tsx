import type { Metadata } from "next";
import Link from "next/link";
import { FunctionalGroupQuickCheck, LabShell } from "@/components/lab";
import { getLabPlatformFeatures } from "@/content/platform";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organic Chemistry Lab",
  description: "Practise organic chemistry with interactive exercises and immediate feedback.",
  path: "/lab",
  keywords: ["organic chemistry lab", "interactive chemistry"],
});

const tools = getLabPlatformFeatures();

function toneClass(kind: "lab" | "mechanism") {
  return kind === "mechanism"
    ? "border-violet-200 bg-violet-50 text-violet-950 hover:border-violet-400 hover:bg-violet-100"
    : "border-blue-200 bg-blue-50 text-blue-950 hover:border-blue-400 hover:bg-blue-100";
}

export default function LabPage() {
  return (
    <LabShell
      title="Learn by doing"
      description="Build structures, identify patterns, and get immediate chemistry-focused feedback."
      sidebar={
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-950">Available tools</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            This list is generated from the platform feature catalog, so newly registered labs and mechanism players appear here automatically.
          </p>

          <div className="mt-4 space-y-3">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className={`block rounded-2xl border p-4 transition ${toneClass(tool.kind as "lab" | "mechanism")}`}
              >
                <span className="font-semibold">{tool.title}</span>
                <span className="mt-1 block text-sm opacity-80">{tool.description}</span>
              </Link>
            ))}
          </div>
        </div>
      }
    >
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Chemistry platform</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Explore mechanisms as connected chemistry</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          Mechanism players are linked to canonical reactions, reagents, functional groups, and Workspace context rather than maintained as isolated pages.
        </p>
        <Link
          href="/reactions"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Compare reaction pathways →
        </Link>
      </div>

      <FunctionalGroupQuickCheck />
    </LabShell>
  );
}
