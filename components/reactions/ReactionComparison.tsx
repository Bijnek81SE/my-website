import Link from "next/link";
import type { ReactionDefinition } from "@/content/reactions";

type ReactionComparisonProps = { reactions: readonly ReactionDefinition[]; onClear: () => void };

export default function ReactionComparison({ reactions, onClear }: ReactionComparisonProps) {
  if (reactions.length === 0) return null;

  return (
    <section className="rounded-3xl border border-violet-200 bg-violet-50/70 p-5 shadow-sm sm:p-7" aria-labelledby="reaction-comparison-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-700">Side-by-side</p><h2 id="reaction-comparison-heading" className="mt-1 text-2xl font-bold text-slate-950">Compare selected reactions</h2></div>
        <button type="button" onClick={onClear} className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-50">Clear comparison</button>
      </div>
      {reactions.length === 1 ? <p className="mt-5 rounded-2xl border border-dashed border-violet-300 bg-white p-5 text-sm text-slate-600">Select one more reaction to compare mechanism, selectivity, conditions, and competing pathways.</p> : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-violet-200 bg-white">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead><tr className="bg-violet-100"><th className="px-4 py-3 font-bold text-slate-900">Feature</th>{reactions.map((reaction) => <th key={reaction.id} className="px-4 py-3 font-bold text-slate-900">{reaction.title}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-200">
              <ComparisonRow label="Family" values={reactions.map((reaction) => reaction.family)} />
              <ComparisonRow label="Mechanism" values={reactions.map((reaction) => reaction.mechanismClass)} />
              <ComparisonRow label="Timing" values={reactions.map((reaction) => reaction.steps)} />
              <ComparisonRow label="Intermediate" values={reactions.map((reaction) => reaction.intermediate)} />
              <ComparisonRow label="Regioselectivity" values={reactions.map((reaction) => reaction.selectivity.regioselectivity)} />
              <ComparisonRow label="Stereochemistry" values={reactions.map((reaction) => reaction.selectivity.stereochemistry)} />
              <ComparisonRow label="Rearrangements" values={reactions.map((reaction) => reaction.selectivity.rearrangements)} />
              <ComparisonRow label="Typical reagents" values={reactions.map((reaction) => reaction.reagents.join("; "))} />
              <tr><th className="px-4 py-3 font-semibold text-slate-900">Practice</th>{reactions.map((reaction) => <td key={reaction.id} className="px-4 py-3"><Link href={reaction.mechanismHref} className="font-semibold text-emerald-700 hover:underline">Open {reaction.shortTitle} lab →</Link></td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ComparisonRow({ label, values }: { label: string; values: readonly string[] }) {
  return <tr><th className="px-4 py-3 font-semibold text-slate-900">{label}</th>{values.map((value, index) => <td key={`${label}-${index}`} className="px-4 py-3 leading-6 text-slate-600">{value}</td>)}</tr>;
}
