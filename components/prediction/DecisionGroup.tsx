type Choice = {
  id: string;
  label: string;
  detail?: string;
};

type Props = {
  legend: string;
  choices: readonly Choice[];
  value: string;
  onChange: (value: string) => void;
  result?: { correctId: string; revealed: boolean };
};

export default function DecisionGroup({ legend, choices, value, onChange, result }: Props) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-950">{legend}</legend>
      <div className="mt-3 grid gap-3">
        {choices.map((choice) => {
          const selected = value === choice.id;
          const correct = result?.revealed && choice.id === result.correctId;
          const incorrect = result?.revealed && selected && choice.id !== result.correctId;
          return (
            <label
              key={choice.id}
              className={`cursor-pointer rounded-xl border p-4 transition focus-within:ring-2 focus-within:ring-violet-600 ${
                correct
                  ? "border-emerald-400 bg-emerald-50"
                  : incorrect
                    ? "border-rose-300 bg-rose-50"
                    : selected
                      ? "border-violet-400 bg-violet-50"
                      : "border-slate-200 bg-white hover:border-violet-300"
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="radio"
                  name={legend}
                  value={choice.id}
                  checked={selected}
                  onChange={() => onChange(choice.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-slate-950">{choice.label}</span>
                  {choice.detail ? (
                    <span className="mt-1 block text-sm leading-5 text-slate-600">{choice.detail}</span>
                  ) : null}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
