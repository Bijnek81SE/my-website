import type { StructureSummary } from "@/content/synthesis";

type Props = {
  structure: StructureSummary;
  tone?: "slate" | "emerald" | "violet";
  compact?: boolean;
};

const toneClasses = {
  slate: "border-slate-200 bg-white",
  emerald: "border-emerald-300 bg-emerald-50",
  violet: "border-violet-300 bg-violet-50",
};

export default function StructureCard({
  structure,
  tone = "slate",
  compact = false,
}: Props) {
  return (
    <article
      className={`rounded-2xl border ${toneClasses[tone]} ${compact ? "p-4" : "p-5"}`}
      aria-label={`${structure.name}, ${structure.condensedFormula}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {structure.functionalGroup}
          </p>
          <h3 className="mt-1 font-bold text-slate-950">{structure.name}</h3>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          {structure.formula}
        </span>
      </div>
      <div className={`${compact ? "mt-3 text-lg" : "mt-5 text-2xl"} overflow-x-auto rounded-xl border border-slate-200 bg-white px-4 py-5 text-center font-mono font-bold tracking-wide text-slate-950`}>
        {structure.condensedFormula}
      </div>
      {structure.notes ? (
        <p className="mt-3 text-sm leading-6 text-slate-600">{structure.notes}</p>
      ) : null}
    </article>
  );
}
