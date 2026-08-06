import Link from "next/link";
import { requireRelationshipPresentation, type RelationshipItem, type RelationshipPresentationId } from "@/content/relationships";

const toneClasses = {
  emerald: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  violet: "border-violet-200 bg-violet-50/70 text-violet-900",
  blue: "border-blue-200 bg-blue-50/70 text-blue-900",
  amber: "border-amber-200 bg-amber-50/70 text-amber-950",
  cyan: "border-cyan-200 bg-cyan-50/70 text-cyan-950",
  slate: "border-slate-200 bg-slate-50 text-slate-900",
} as const;

export default function RelationshipSection({ presentationId, items, className = "" }: { presentationId: RelationshipPresentationId; items: readonly RelationshipItem[]; className?: string }) {
  if (items.length === 0) return null;
  const presentation = requireRelationshipPresentation(presentationId);
  const headingId = `relationship-${presentation.id.replaceAll(":", "-")}`;

  return (
    <section className={`rounded-2xl border p-5 ${toneClasses[presentation.tone]} ${className}`} aria-labelledby={headingId}>
      <h3 id={headingId} className="text-lg font-bold text-slate-950">{presentation.heading}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">{presentation.description}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const content = (
            <>
              <span className="flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-950">{item.label}</span>
                {item.badge ? <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600">{item.badge}</span> : null}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">{item.description}</span>
            </>
          );
          return (
            <li key={item.id}>
              {item.href ? <Link href={item.href} className="block rounded-xl border border-white/80 bg-white p-3 transition hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">{content}</Link> : <article className="rounded-xl border border-white/80 bg-white p-3">{content}</article>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
