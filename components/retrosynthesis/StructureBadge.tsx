import type { StructureSummary } from "@/content/synthesis";

export default function StructureBadge({ structure, tone = "slate" }: { structure: StructureSummary; tone?: "slate" | "emerald" | "violet" }) {
  const toneClass = tone === "emerald"
    ? "border-emerald-300 bg-emerald-50"
    : tone === "violet"
      ? "border-violet-300 bg-violet-50"
      : "border-slate-200 bg-white";

  return (
    <article aria-label={`${structure.name}, ${structure.condensedFormula}`} className={`rounded-xl border p-4 ${toneClass}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{structure.functionalGroup}</p>
          <h3 className="mt-1 font-bold text-slate-950">{structure.name}</h3>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">{structure.formula}</span>
      </div>
      <p className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white px-3 py-4 text-center font-mono font-bold text-slate-950">
        {structure.condensedFormula}
      </p>
    </article>
  );
}
