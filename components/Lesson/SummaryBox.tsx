import type { ReactNode } from "react";

export default function SummaryBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-6 text-slate-100 shadow-sm sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">Key takeaway</p>
      <div className="mt-3 leading-8">{children}</div>
    </div>
  );
}
