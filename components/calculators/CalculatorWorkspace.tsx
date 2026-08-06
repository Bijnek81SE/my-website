import type { ReactNode } from "react";

type CalculatorWorkspaceProps = {
  controls: ReactNode;
  result: ReactNode;
  steps?: ReactNode;
  guidance?: ReactNode;
};

export default function CalculatorWorkspace({ controls, result, steps, guidance }: CalculatorWorkspaceProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">{controls}</div>
      <div className="space-y-5">
        {result}
        {steps}
        {guidance ? (
          <aside className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950">
            {guidance}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
