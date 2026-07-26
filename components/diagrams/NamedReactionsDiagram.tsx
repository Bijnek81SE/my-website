const families = [
  { label: "Aldol", detail: "C\u2013C bond formation" },
  { label: "Suzuki", detail: "Cross-coupling" },
  { label: "Diels\u2013Alder", detail: "Cycloaddition" },
];

export default function NamedReactionsDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-2">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
          <p className="text-lg font-bold text-slate-900">R&#8722;X</p>
          <p className="mt-1 text-[11px] text-slate-500">Starting material</p>
        </div>

        <div className="relative flex flex-1 flex-col items-center px-1">
          <span className="mb-1 whitespace-nowrap text-[11px] font-semibold text-emerald-700">reagent, cat.</span>
          <svg viewBox="0 0 100 16" className="h-4 w-full min-w-[70px]" aria-hidden="true">
            <line x1="2" y1="8" x2="86" y2="8" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" className="animate-dash-flow" />
            <polygon points="86,2 98,8 86,14" fill="#059669" />
          </svg>
          <span className="mt-1 whitespace-nowrap text-[11px] text-slate-500">solvent, &#916;</span>
        </div>

        <div className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
          <p className="text-lg font-bold text-slate-900">R&#8722;Nu</p>
          <p className="mt-1 text-[11px] text-slate-500">Product</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {families.map((f) => (
          <div
            key={f.label}
            className="group/chip cursor-default rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md"
          >
            <span className="text-xs font-semibold text-emerald-800 transition-colors duration-300 group-hover/chip:text-white">
              {f.label}
            </span>
            <span className="ml-1.5 text-[10px] text-emerald-600 transition-colors duration-300 group-hover/chip:text-emerald-100">
              {f.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
