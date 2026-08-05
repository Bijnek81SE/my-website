import type { ReactNode } from "react";
import Link from "next/link";

export type SectionLandingItemStatus = "available" | "planned";

export type SectionLandingItem = {
  title: string;
  description: string;
  href?: string;
  status?: SectionLandingItemStatus;
  actionLabel?: string;
};

type SectionLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly SectionLandingItem[];
  heroContent?: ReactNode;
  heroCaption?: string;
};

function LandingCard({ item }: { item: SectionLandingItem }) {
  const available = Boolean(item.href);
  const status = item.status ?? (available ? "available" : "planned");

  return (
    <article
      className={`h-full rounded-2xl border bg-white p-6 shadow-sm transition ${
        available
          ? "border-slate-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            status === "available"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {status === "available" ? "Available" : "Planned"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
      {available ? (
        <span className="mt-6 inline-flex text-sm font-semibold text-emerald-700">
          {item.actionLabel ?? "Open section"} →
        </span>
      ) : (
        <p className="mt-6 text-sm font-medium text-slate-500">In development</p>
      )}
    </article>
  );
}

export default function SectionLanding({
  eyebrow,
  title,
  description,
  items,
  heroContent,
  heroCaption,
}: SectionLandingProps) {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          </div>

          {heroContent ? (
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {heroContent}
              {heroCaption ? (
                <figcaption className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-600">
                  {heroCaption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) =>
            item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl focus-visible:outline-none"
              >
                <LandingCard item={item} />
              </Link>
            ) : (
              <LandingCard key={item.title} item={item} />
            ),
          )}
        </div>
      </section>
    </div>
  );
}
