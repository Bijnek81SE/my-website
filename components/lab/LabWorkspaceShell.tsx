import Link from "next/link";
import type { ReactNode } from "react";
import type { LabAccent } from "./LabShell";

export type LabWorkspaceShellProps = {
  children: ReactNode;
  accent?: LabAccent;
  maxWidth?: "5xl" | "6xl" | "7xl";
  backHref?: string;
  backLabel?: string;
};

const accentClasses: Record<LabAccent, string> = {
  blue: "text-blue-700 hover:text-blue-900 focus-visible:ring-blue-600",
  emerald:
    "text-emerald-700 hover:text-emerald-900 focus-visible:ring-emerald-600",
  violet:
    "text-violet-700 hover:text-violet-900 focus-visible:ring-violet-600",
  amber: "text-amber-700 hover:text-amber-900 focus-visible:ring-amber-600",
  rose: "text-rose-700 hover:text-rose-900 focus-visible:ring-rose-600",
};

const widthClasses: Record<NonNullable<LabWorkspaceShellProps["maxWidth"]>, string> = {
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export default function LabWorkspaceShell({
  children,
  accent = "blue",
  maxWidth = "7xl",
  backHref = "/lab",
  backLabel = "Back to Lab",
}: LabWorkspaceShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div
        className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widthClasses[maxWidth]}`}
      >
        <Link
          href={backHref}
          className={`inline-flex rounded-md font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accentClasses[accent]}`}
        >
          ← {backLabel}
        </Link>

        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
