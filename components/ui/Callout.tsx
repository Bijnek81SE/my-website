import type { ReactNode } from "react";

type CalloutTone = "info" | "success" | "warning" | "violet";

type CalloutProps = {
  title: string;
  children: ReactNode;
  tone?: CalloutTone;
  className?: string;
};

const toneClasses: Record<CalloutTone, string> = {
  info: "border-blue-200 bg-blue-50",
  success: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  violet: "border-violet-200 bg-violet-50",
};

const dots: Record<CalloutTone, string> = {
  info: "bg-blue-600",
  success: "bg-emerald-600",
  warning: "bg-amber-600",
  violet: "bg-violet-600",
};

export default function Callout({
  title,
  children,
  tone = "info",
  className = "",
}: CalloutProps) {
  return (
    <aside
      className={`rounded-2xl border p-5 sm:p-6 ${toneClasses[tone]} ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dots[tone]}`}
        />
        <div>
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <div className="mt-2 text-base leading-7 text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
