"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type HintPanelProps = {
  children: ReactNode;
  buttonLabel?: string;
};

export default function HintPanel({ children, buttonLabel = "Show hint" }: HintPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        {open ? "Hide hint" : buttonLabel}
      </button>
      {open ? (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          {children}
        </div>
      ) : null}
    </div>
  );
}
