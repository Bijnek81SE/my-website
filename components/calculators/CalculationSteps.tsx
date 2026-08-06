type CalculationStepsProps = {
  steps: readonly string[];
};

export default function CalculationSteps({ steps }: CalculationStepsProps) {
  if (steps.length === 0) return null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
        Calculation steps
      </h3>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={`${index}-${step}`} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
