import type { SearchEntry } from "./SearchIndex";

type SearchResultsProps = {
  results: readonly SearchEntry[];
  activeIndex: number;
  query: string;
  onActiveIndexChange: (index: number) => void;
  onSelect: (entry: SearchEntry) => void;
};

export default function SearchResults({
  results,
  activeIndex,
  query,
  onActiveIndexChange,
  onSelect,
}: SearchResultsProps) {
  if (!query.trim()) {
    return (
      <div className="px-5 py-10 text-center text-sm text-slate-500">
        Search lessons, mechanisms, labs, calculators, and references.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="px-5 py-10 text-center" role="status">
        <p className="font-medium text-slate-800">No results found</p>
        <p className="mt-1 text-sm text-slate-500">
          Try a broader term such as resonance, SN2, bonding, or Lewis.
        </p>
      </div>
    );
  }

  return (
    <ul
      id="global-search-results"
      role="listbox"
      aria-label="Search results"
      className="max-h-[55vh] overflow-y-auto p-2"
    >
      {results.map((entry, index) => {
        const active = index === activeIndex;

        return (
          <li key={entry.id} role="presentation">
            <button
              id={`global-search-option-${entry.id}`}
              type="button"
              role="option"
              aria-selected={active}
              onMouseEnter={() => onActiveIndexChange(index)}
              onFocus={() => onActiveIndexChange(index)}
              onClick={() => onSelect(entry)}
              className={`flex w-full items-start gap-4 rounded-xl px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                active ? "bg-emerald-50" : "hover:bg-slate-50"
              }`}
            >
              <span className="mt-0.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {entry.category}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-950">{entry.title}</span>
                <span className="mt-0.5 block text-sm leading-5 text-slate-600">
                  {entry.description}
                </span>
              </span>
              <span aria-hidden="true" className="mt-1 text-slate-400">
                →
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
