const keys = ["4", "6", ".", "0", "7", "M", "n", "="];

export default function CalculatorsDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
      <div className="w-40 rounded-2xl bg-slate-900 p-3 shadow-lg">
        <div className="mb-2 flex h-10 items-center justify-end rounded-md bg-emerald-100 px-3">
          <span className="font-mono text-lg font-bold text-emerald-800 animate-soft-pulse">46.07</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {keys.map((k, i) => (
            <div
              key={i}
              className="flex h-6 items-center justify-center rounded bg-slate-700 text-[10px] font-semibold text-slate-200 animate-soft-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {k}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <div className="group/f cursor-default rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
          <p className="text-sm font-bold text-slate-900">Molar mass</p>
          <p className="font-mono text-sm text-emerald-700 transition-transform duration-300 group-hover/f:translate-x-1">
            M = &#931;(atomic mass &#215; count)
          </p>
        </div>
        <div className="group/f cursor-default rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
          <p className="text-sm font-bold text-slate-900">Moles &#8596; mass</p>
          <p className="font-mono text-sm text-emerald-700 transition-transform duration-300 group-hover/f:translate-x-1">
            n = mass &#247; M
          </p>
        </div>
      </div>
    </div>
  );
}
