import type { ReactNode } from "react";

type CalloutTone = "info" | "success" | "warning" | "violet";

type CalloutProps = {
  title: string;
  children: ReactNode;
  tone?: CalloutTone;
};

const toneClasses: Record<CalloutTone, string> = {
  info: "border-blue-200 bg-blue-50",
  success: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  violet: "border-violet-200 bg-violet-50",
};

export default function Callout({ title, children, tone = "info" }: CalloutProps) {
  return (
    <aside className={`rounded-2xl border p-5 sm:p-6 ${toneClasses[tone]}`}>
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <div className="mt-2 text-base leading-7 text-slate-700">{children}</div>
    </aside>
  );
}
