import type { ReactNode } from "react";

type FeedbackTone = "idle" | "success" | "error" | "info";

type FeedbackPanelProps = {
  tone?: FeedbackTone;
  title: string;
  children: ReactNode;
};

const toneClasses: Record<FeedbackTone, string> = {
  idle: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  error: "border-rose-200 bg-rose-50 text-rose-950",
  info: "border-blue-200 bg-blue-50 text-blue-950",
};

const icons: Record<FeedbackTone, string> = {
  idle: "•",
  success: "✓",
  error: "×",
  info: "i",
};

export default function FeedbackPanel({ tone = "idle", title, children }: FeedbackPanelProps) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-bold shadow-sm">
          {icons[tone]}
        </span>
        <div>
          <p className="font-semibold">{title}</p>
          <div className="mt-1 text-sm leading-6 opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}
