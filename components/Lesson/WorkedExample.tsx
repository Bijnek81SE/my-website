import type { ReactNode } from "react";

type WorkedExampleProps = {
  title: string;
  children: ReactNode;
  label?: string;
};

export default function WorkedExample({
  title,
  children,
  label = "Worked example",
}: WorkedExampleProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
      <div className="border-b border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {label}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
          {title}
        </h3>
      </div>
      <div className="space-y-4 px-5 py-5 text-base leading-7 text-slate-700 sm:px-6 sm:py-6">
        {children}
      </div>
    </div>
  );
}
