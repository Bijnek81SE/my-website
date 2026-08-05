import Link from "next/link";
import type { ReactNode } from "react";

export type MechanismLabAccent =
  | "blue"
  | "cyan"
  | "emerald"
  | "orange"
  | "rose"
  | "violet";

export type MechanismLabShellProps = {
  title: string;
  accent?: MechanismLabAccent;
  children: ReactNode;
};

const accentClasses: Record<MechanismLabAccent, string> = {
  blue: "text-blue-700 hover:text-blue-900 focus-visible:outline-blue-600",
  cyan: "text-cyan-700 hover:text-cyan-900 focus-visible:outline-cyan-600",
  emerald:
    "text-emerald-700 hover:text-emerald-900 focus-visible:outline-emerald-600",
  orange:
    "text-orange-700 hover:text-orange-900 focus-visible:outline-orange-600",
  rose: "text-rose-700 hover:text-rose-900 focus-visible:outline-rose-600",
  violet:
    "text-violet-700 hover:text-violet-900 focus-visible:outline-violet-600",
};

export default function MechanismLabShell({
  title,
  accent = "blue",
  children,
}: MechanismLabShellProps) {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <Link
            href="/lab"
            className={`inline-flex rounded-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${accentClasses[accent]}`}
          >
            <span aria-hidden="true">←</span>
            <span className="ml-2">Back to Lab</span>
          </Link>
          <span className="sr-only">Current lab: {title}</span>
        </nav>

        <div className="mt-7">{children}</div>
      </div>
    </main>
  );
}
