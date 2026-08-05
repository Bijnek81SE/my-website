import type { ReactNode } from "react";
import Link from "next/link";

type InfoPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerLink?: {
    href: string;
    label: string;
  };
};

export default function InfoPageShell({
  eyebrow,
  title,
  description,
  children,
  footerLink,
}: InfoPageShellProps) {
  return (
    <div className="bg-white">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        {children}

        {footerLink ? (
          <div className="mt-12 border-t border-slate-200 pt-8">
            <Link
              href={footerLink.href}
              className="inline-flex rounded-lg text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none"
            >
              {footerLink.label} →
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  );
}
