"use client";

import { useMemo, useState } from "react";
import { getReaction, getReactionFamilies, getReactionMechanismClasses, selectReactions, type ReactionDefinition } from "@/content/reactions";
import ReactionCard from "./ReactionCard";
import ReactionComparison from "./ReactionComparison";
import ReactionDetails from "./ReactionDetails";
import ReactionFilters, { type ReactionFilterState } from "./ReactionFilters";

const DEFAULT_FILTERS: ReactionFilterState = { query: "", family: "All", mechanismClass: "All", steps: "All" };

export default function ReactionExplorer() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [comparisonIds, setComparisonIds] = useState<readonly string[]>([]);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const families = useMemo(() => getReactionFamilies(), []);
  const mechanismClasses = useMemo(() => getReactionMechanismClasses(), []);
  const filteredReactions = useMemo(() => selectReactions(filters), [filters]);

  const comparison = comparisonIds.map((id) => getReaction(id)).filter((reaction): reaction is ReactionDefinition => Boolean(reaction));
  const details = detailsId ? getReaction(detailsId) : undefined;

  function toggleComparison(reactionId: string) {
    setComparisonIds((current) => current.includes(reactionId) ? current.filter((id) => id !== reactionId) : current.length < 2 ? [...current, reactionId] : current);
  }

  return (
    <div className="space-y-8">
      <ReactionFilters value={filters} families={families} mechanismClasses={mechanismClasses} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
      <ReactionComparison reactions={comparison} onClear={() => setComparisonIds([])} />
      <section aria-labelledby="reaction-results-heading">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Registry</p><h2 id="reaction-results-heading" className="mt-1 text-2xl font-bold text-slate-950">{filteredReactions.length} reaction{filteredReactions.length === 1 ? "" : "s"}</h2></div><p className="text-sm text-slate-600">Select up to two reactions for comparison.</p></div>
        {filteredReactions.length > 0 ? <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">{filteredReactions.map((reaction) => <ReactionCard key={reaction.id} reaction={reaction} selected={comparisonIds.includes(reaction.id)} comparisonDisabled={comparisonIds.length >= 2} onToggleComparison={toggleComparison} onOpenDetails={setDetailsId} />)}</div> : <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-bold text-slate-950">No reactions match these filters</p><p className="mt-2 text-sm text-slate-600">Reset the filters or try a broader chemistry term.</p></div>}
      </section>
      {details ? <ReactionDetails reaction={details} onClose={() => setDetailsId(null)} /> : null}
    </div>
  );
}
