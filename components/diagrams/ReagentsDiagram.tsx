const reagents = [
  { formula: "PCC", role: "Oxidizing agent", liquid: "#FDE68A", detail: "Oxidizes 1° alcohols to aldehydes" },
  { formula: "NaBH\u2084", role: "Reducing agent", liquid: "#BFDBFE", detail: "Reduces aldehydes and ketones" },
  { formula: "RMgX", role: "Organometallic", liquid: "#DDD6FE", detail: "Grignard reagent, C\u2013C bond formation" },
];

export default function ReagentsDiagram() {
  return (
    <div className="flex items-end justify-center gap-6 py-2">
      {reagents.map((r) => (
        <div key={r.formula} className="group/bottle flex flex-col items-center">
          <div className="relative w-16 transition-transform duration-300 group-hover/bottle:-translate-y-2">
            <div className="mx-auto h-5 w-6 rounded-t-sm border border-b-0 border-slate-300 bg-white" />
            <div className="relative h-20 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm transition-shadow duration-300 group-hover/bottle:shadow-lg">
              <div
                className="absolute bottom-0 h-14 w-full"
                style={{ backgroundColor: r.liquid }}
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-sweep" />
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm font-bold text-slate-900">{r.formula}</p>
          <p className="text-[11px] text-slate-500">{r.role}</p>

          <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover/bottle:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-1 max-w-[9rem] text-center text-[10px] leading-snug text-emerald-700">
                {r.detail}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
