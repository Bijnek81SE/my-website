type UnitSelectProps<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  disabled?: boolean;
};

export default function UnitSelect<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  disabled = false,
}: UnitSelectProps<T>) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as T)}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-slate-950 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
