"use client";

import { useMemo, useState } from "react";
import { reactions, type ReactionDefinition, type ReactionFamily, type ReactionMechanismClass } from "@/content/reactions";
import ReactionCard from "./ReactionCard";
import ReactionComparison from "./ReactionComparison";
import ReactionDetails from "./ReactionDetails";
import ReactionFilters, { type ReactionFilterState } from "./ReactionFilters";

const DEFAULT_FILTERS: ReactionFilterState = { query: "", family: "All", mechanismClass: "All", steps: "All" };

export default function ReactionExplorer() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [comparisonIds, setComparisonIds] = useState<readonly string[]>([]);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const families = useMemo(() => [...new Set(reactions.map((reaction) => reaction.family))].sort() as ReactionFamily[], []);
  const mechanismClasses = useMemo(() => [...new Set(reactions.map((reaction) => reaction.mechanismClass))].sort() as ReactionMechanismClass[], []);
  const filteredReactions = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return reactions.filter((reaction) => {
      const searchable = [reaction.title, reaction.description, reaction.family, reaction.mechanismClass, reaction.substrate, reaction.product, ...reaction.reagents, ...reaction.keywords].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (filters.family === "All" || reaction.family === filters.family) && (filters.mechanismClass === "All" || reaction.mechanismClass === filters.mechanismClass) && (filters.steps === "All" || reaction.steps === filters.steps);
    });
  }, [filters]);

  const comparison = comparisonIds.map((id) => reactions.find((reaction) => reaction.id === id)).filter((reaction): reaction is ReactionDefinition => Boolean(reaction));
  const details = reactions.find((reaction) => reaction.id === detailsId);

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
