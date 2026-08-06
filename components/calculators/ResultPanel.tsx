"use client";

import { useState } from "react";

type ResultPanelProps = {
  title?: string;
  result?: string;
  secondary?: readonly { label: string; value: string }[];
  error?: string;
};

export default function ResultPanel({
  title = "Result",
  result,
  secondary = [],
  error,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard?.writeText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
        <p className="font-semibold">Check the input</p>
        <p className="mt-1 text-sm leading-6">{error}</p>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-800">{title}</p>
          <p className="mt-2 break-words text-2xl font-bold text-slate-950">{result ?? "Enter values to calculate"}</p>
        </div>
        {result ? (
          <button
            type="button"
            onClick={copyResult}
            className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {copied ? "Copied" : "Copy result"}
          </button>
        ) : null}
      </div>
      {secondary.length > 0 ? (
        <dl className="mt-5 grid gap-3 border-t border-emerald-200 pt-4 sm:grid-cols-2">
          {secondary.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-800">{item.label}</dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
