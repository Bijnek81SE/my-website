import Link from "next/link";
import type { ReactNode } from "react";

export type LabAccent =
  | "blue"
  | "emerald"
  | "violet"
  | "amber"
  | "rose";

export type LabShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  sidebar?: ReactNode;
  accent?: LabAccent;
  backHref?: string;
  backLabel?: string;
};

const accentClasses: Record<LabAccent, {
  text: string;
  hover: string;
  ring: string;
}> = {
  blue: {
    text: "text-blue-700",
    hover: "hover:text-blue-900",
    ring: "focus-visible:ring-blue-600",
  },
  emerald: {
    text: "text-emerald-700",
    hover: "hover:text-emerald-900",
    ring: "focus-visible:ring-emerald-600",
  },
  violet: {
    text: "text-violet-700",
    hover: "hover:text-violet-900",
    ring: "focus-visible:ring-violet-600",
  },
  amber: {
    text: "text-amber-700",
    hover: "hover:text-amber-900",
    ring: "focus-visible:ring-amber-600",
  },
  rose: {
    text: "text-rose-700",
    hover: "hover:text-rose-900",
    ring: "focus-visible:ring-rose-600",
  },
};

export default function LabShell({
  eyebrow = "Organic Chemistry Lab",
  title,
  description,
  children,
  sidebar,
  accent = "blue",
  backHref = "/lab",
  backLabel = "Back to Lab",
}: LabShellProps) {
  const colours = accentClasses[accent];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link
          href={backHref}
          className={`inline-flex rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${colours.text} ${colours.hover} ${colours.ring}`}
        >
          ← {backLabel}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${colours.text}`}>
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
        </header>

        <div
          className={`mt-10 grid gap-8 ${
            sidebar ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : ""
          }`}
        >
          <div className="min-w-0 space-y-6">{children}</div>
          {sidebar ? <aside className="space-y-5">{sidebar}</aside> : null}
        </div>
      </div>
    </main>
  );
}
