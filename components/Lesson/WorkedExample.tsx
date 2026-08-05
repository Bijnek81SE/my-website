import type { ReactNode } from "react";
import AnswerReveal from "./AnswerReveal";

type WorkedExampleProps = {
  title: string;
  children: ReactNode;
  label?: string;
  defaultOpen?: boolean;
};

export default function WorkedExample({
  title,
  children,
  label = "Worked example",
  defaultOpen = true,
}: WorkedExampleProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
      <div className="border-b border-emerald-200 bg-emerald-50 px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {label}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-950">{title}</h3>
      </div>
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <AnswerReveal
          label="Show worked solution"
          hideLabel="Hide worked solution"
          defaultOpen={defaultOpen}
        >
          <div className="space-y-4">{children}</div>
        </AnswerReveal>
      </div>
    </div>
  );
}
