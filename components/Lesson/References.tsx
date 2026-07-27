import type { ReactNode } from "react";

type ReferencesProps = {
  items: ReactNode[];
};

export default function References({ items }: ReferencesProps) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base leading-7 text-slate-700"
        >
          <span className="font-semibold text-slate-500">{index + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
