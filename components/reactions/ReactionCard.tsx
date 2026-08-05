import Link from "next/link";
import type { ReactionDefinition } from "@/content/reactions";

type ReactionCardProps = {
  reaction: ReactionDefinition;
  selected: boolean;
  comparisonDisabled: boolean;
  onToggleComparison: (reactionId: string) => void;
  onOpenDetails: (reactionId: string) => void;
};

export default function ReactionCard({ reaction, selected, comparisonDisabled, onToggleComparison, onOpenDetails }: ReactionCardProps) {
  return (
    <article className={`flex h-full flex-col rounded-3xl border bg-white p-5 shadow-sm transition ${selected ? "border-violet-400 ring-2 ring-violet-100" : "border-slate-200 hover:border-emerald-300"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{reaction.family}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{reaction.title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{reaction.steps}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{reaction.description}</p>
      <dl className="mt-5 grid gap-3 text-sm">
        <Info label="Substrate" value={reaction.substrate} />
        <Info label="Product" value={reaction.product} />
        <Info label="Key selectivity" value={`${reaction.selectivity.regioselectivity}; ${reaction.selectivity.stereochemistry}`} />
      </dl>
      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <button type="button" onClick={() => onOpenDetails(reaction.id)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600">View details</button>
        <button
          type="button"
          onClick={() => onToggleComparison(reaction.id)}
          disabled={comparisonDisabled && !selected}
          className="rounded-xl border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-800 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {selected ? "Remove comparison" : "Compare"}
        </button>
        <Link href={reaction.mechanismHref} className="rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">Open lab →</Link>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><dt className="font-semibold text-slate-900">{label}</dt><dd className="mt-0.5 text-slate-600">{value}</dd></div>;
}
