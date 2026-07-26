export default function ChemistryHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-label="Stylised molecular structure">
      <div className="absolute inset-[8%] rounded-full border border-emerald-200/70 bg-white/70 shadow-2xl shadow-emerald-900/10 backdrop-blur" />
      <div className="absolute left-1/2 top-1/2 h-px w-[54%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] bg-slate-300" />
      <div className="absolute left-1/2 top-1/2 h-px w-[54%] -translate-x-1/2 -translate-y-1/2 -rotate-[32deg] bg-slate-300" />
      <div className="absolute left-1/2 top-1/2 h-px w-[48%] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-slate-300" />

      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950 text-4xl font-bold text-white shadow-xl shadow-slate-900/25">
        C
      </div>
      <div className="absolute left-[17%] top-[25%] flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white shadow-lg">H</div>
      <div className="absolute right-[14%] top-[22%] flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">O</div>
      <div className="absolute bottom-[14%] left-[20%] flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white shadow-lg">N</div>
      <div className="absolute bottom-[16%] right-[20%] flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-white shadow-lg">H</div>

      <div className="absolute right-[2%] top-[48%] rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
        <p className="font-semibold text-slate-950">Visual-first learning</p>
        <p className="mt-1 text-slate-500">Structure → reactivity → synthesis</p>
      </div>
    </div>
  );
}
