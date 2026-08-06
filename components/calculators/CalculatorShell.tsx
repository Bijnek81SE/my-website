import type { ReactNode } from "react";
import Link from "next/link";

type CalculatorShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  formula?: string;
  children: ReactNode;
};

export default function CalculatorShell({
  eyebrow,
  title,
  description,
  formula,
  children,
}: CalculatorShellProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/calculators"
            className="inline-flex rounded-lg text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            ← Chemistry calculators
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
          {formula ? (
            <div className="mt-6 inline-flex rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-mono text-sm font-semibold text-emerald-900">
              {formula}
            </div>
          ) : null}
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        {children}
      </section>
    </main>
  );
}
