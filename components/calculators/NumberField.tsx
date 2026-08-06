type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  step?: string;
  help?: string;
  disabled?: boolean;
};

export default function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  step = "any",
  help,
  disabled = false,
}: NumberFieldProps) {
  const helpId = help ? `${id}-help` : undefined;
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={value}
        disabled={disabled}
        aria-describedby={helpId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
      {help ? (
        <span id={helpId} className="mt-1.5 block text-xs leading-5 text-slate-500">
          {help}
        </span>
      ) : null}
    </label>
  );
}
