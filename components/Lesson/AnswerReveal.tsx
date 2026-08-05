"use client";

import { useId, useState, type ReactNode } from "react";

type AnswerRevealProps = {
  children: ReactNode;
  label?: string;
  hideLabel?: string;
  defaultOpen?: boolean;
  className?: string;
};

export default function AnswerReveal({
  children,
  label = "Show answer",
  hideLabel = "Hide answer",
  defaultOpen = false,
  className = "",
}: AnswerRevealProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        {open ? hideLabel : label}
      </button>

      <div
        id={contentId}
        hidden={!open}
        className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-700"
      >
        {children}
      </div>
    </div>
  );
}
