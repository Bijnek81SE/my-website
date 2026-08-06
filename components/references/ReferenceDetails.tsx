import Link from "next/link";
import { RelationshipSection } from "@/components/relationships";
import { getLessonBySlug } from "@/content/lessons";
import { getMechanism } from "@/content/mechanisms";
import { getMolecule } from "@/content/molecules";
import { getReaction } from "@/content/reactions";
import type { ChemistryReference } from "@/content/references";
import type { RelationshipItem } from "@/content/relationships";

function ReagentConnections({ entry }: { entry: Extract<ChemistryReference, { kind: "reagent" }> }) {
  const reactions: RelationshipItem[] = entry.reactionIds.flatMap((id) => {
    const reaction = getReaction(id);
    return reaction ? [{ id, label: reaction.shortTitle, href: "/reactions", description: reaction.description, badge: reaction.family }] : [];
  });
  const mechanisms: RelationshipItem[] = entry.mechanismIds.flatMap((id) => {
    const mechanism = getMechanism(id);
    return mechanism ? [{ id, label: mechanism.title, href: mechanism.href, description: mechanism.description, badge: mechanism.mechanismClass }] : [];
  });
  const molecules: RelationshipItem[] = entry.moleculeIds.flatMap((id) => {
    const molecule = getMolecule(id);
    return molecule ? [{ id, label: molecule.name, href: `/workspace?molecule=${molecule.id}`, description: molecule.workspace?.summary ?? molecule.condensedFormula, badge: molecule.formula }] : [];
  });
  const lessons: RelationshipItem[] = entry.lessonIds.flatMap((id) => {
    try {
      const lesson = getLessonBySlug(id);
      return [{ id, label: lesson.title, href: lesson.href, description: lesson.description, badge: lesson.module }];
    } catch {
      return [];
    }
  });

  return (
    <section className="mt-8" aria-labelledby="reagent-use-heading">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Chemistry context</p>
        <h2 id="reagent-use-heading" className="mt-1 text-2xl font-bold text-slate-950">How this reagent is used</h2>
        <p className="mt-2 max-w-3xl leading-7 text-slate-600">Each connection explains a practical role for {entry.name}, rather than showing a generic database link.</p>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <RelationshipSection presentationId="reagent:typical-reactions" items={reactions} />
        <RelationshipSection presentationId="reagent:mechanism-labs" items={mechanisms} />
        <RelationshipSection presentationId="reagent:typical-substrates" items={molecules} />
        <RelationshipSection presentationId="reagent:recommended-lessons" items={lessons} />
      </div>
    </section>
  );
}

export default function ReferenceDetails({ entry }: { entry: ChemistryReference }) {
  const isGroup = entry.kind === "functional-group";

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <article className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <Link href={isGroup ? "/functional-groups" : "/reagents"} className="font-semibold text-emerald-700">
          ← Back to {isGroup ? "functional groups" : "reagents"}
        </Link>
        <header className="mt-6 rounded-3xl bg-slate-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">{entry.category}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold">{entry.name}</h1>
            <p className="font-mono text-xl text-slate-300">{entry.formula}</p>
          </div>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{entry.summary}</p>
        </header>

        {isGroup ? (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                ["How to recognise it", entry.recognition],
                ["Bonding and geometry", entry.bonding],
                ["Polarity", entry.polarity],
                ["Acidity and basicity", entry.acidityBasicity],
              ].map(([title, text]) => (
                <section key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="text-xl font-bold text-slate-950">{title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </section>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <RelationshipSection
                presentationId="functional-group:common-reactions"
                items={entry.commonReactions.map((label) => ({ id: label, label, description: `A characteristic transformation associated with the ${entry.name.toLowerCase()} functional group.` }))}
              />
              <RelationshipSection
                presentationId="functional-group:practice-tools"
                items={entry.relatedLabs.map((item) => ({ id: item.href, label: item.label, href: item.href, description: `Practise recognising or applying ${entry.name.toLowerCase()} chemistry interactively.` }))}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[["Purpose", entry.purpose], ["Selectivity", entry.selectivity], ["Safety", entry.safety]].map(([title, text]) => (
                <section key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </section>
              ))}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold">Typical conditions</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">{entry.conditions.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">{entry.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold">Alternative names and reagents</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">{entry.alternativeNames.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>
            <ReagentConnections entry={entry} />
          </>
        )}
      </article>
    </main>
  );
}
