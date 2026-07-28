import type { ReactNode } from "react";

type LabShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  sidebar?: ReactNode;
};

export default function LabShell({
  eyebrow = "Organic Chemistry Lab",
  title,
  description,
  children,
  sidebar,
}: LabShellProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
      </header>

      <div className={`mt-10 grid gap-8 ${sidebar ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : ""}`}>
        <div className="min-w-0 space-y-6">{children}</div>
        {sidebar ? <aside className="space-y-5">{sidebar}</aside> : null}
      </div>
    </main>
  );
}
