import type { ReactionFamily, ReactionMechanismClass } from "@/content/reactions";

export type ReactionFilterState = {
  query: string;
  family: "All" | ReactionFamily;
  mechanismClass: "All" | ReactionMechanismClass;
  steps: "All" | "Concerted" | "Stepwise";
};

type ReactionFiltersProps = {
  value: ReactionFilterState;
  families: readonly ReactionFamily[];
  mechanismClasses: readonly ReactionMechanismClass[];
  onChange: (value: ReactionFilterState) => void;
  onReset: () => void;
};

export default function ReactionFilters({ value, families, mechanismClasses, onChange, onReset }: ReactionFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="reaction-filter-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">Filter the registry</p>
          <h2 id="reaction-filter-heading" className="mt-1 text-xl font-bold text-slate-950">Find the right reaction pattern</h2>
        </div>
        <button type="button" onClick={onReset} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">Reset</button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Search
          <input
            type="search"
            value={value.query}
            onChange={(event) => onChange({ ...value, query: event.target.value })}
            placeholder="SN2, anti-Markovnikov, carbocation…"
            className="rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </label>
        <FilterSelect label="Family" value={value.family} options={["All", ...families]} onChange={(family) => onChange({ ...value, family: family as ReactionFilterState["family"] })} />
        <FilterSelect label="Mechanism" value={value.mechanismClass} options={["All", ...mechanismClasses]} onChange={(mechanismClass) => onChange({ ...value, mechanismClass: mechanismClass as ReactionFilterState["mechanismClass"] })} />
        <FilterSelect label="Timing" value={value.steps} options={["All", "Concerted", "Stepwise"]} onChange={(steps) => onChange({ ...value, steps: steps as ReactionFilterState["steps"] })} />
      </div>
    </section>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
