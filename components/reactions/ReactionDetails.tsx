import Link from "next/link";
import { getKnowledgeNode } from "@/content/knowledge-graph";
import { getReactions, type ReactionDefinition } from "@/content/reactions";

type ReactionDetailsProps = { reaction: ReactionDefinition; onClose: () => void };

export default function ReactionDetails({ reaction, onClose }: ReactionDetailsProps) {
  const competing = getReactions(reaction.competingReactionIds);
  const related = getReactions(reaction.relatedReactionIds);
  const prerequisites = reaction.prerequisiteNodeIds.map(getKnowledgeNode).filter(Boolean);

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="reaction-details-heading" className="mx-auto my-8 max-w-4xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">{reaction.family}</p>
            <h2 id="reaction-details-heading" className="mt-2 text-3xl font-bold text-slate-950">{reaction.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">{reaction.keyIdea}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close reaction details" className="rounded-xl border border-slate-200 px-3 py-2 text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">Close</button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Panel title="Reaction setup" items={[`Substrate: ${reaction.substrate}`, `Product: ${reaction.product}`, `Timing: ${reaction.steps}`, `Intermediate: ${reaction.intermediate}`]} />
          <Panel title="Reagents and conditions" items={[...reaction.reagents, ...reaction.conditions]} />
          <Panel title="Selectivity" items={[reaction.selectivity.regioselectivity, reaction.selectivity.stereochemistry, `Rearrangements: ${reaction.selectivity.rearrangements}`]} />
          <Panel title="Prerequisites" items={prerequisites.map((node) => node?.title ?? "")} />
        </div>

        {(competing.length > 0 || related.length > 0) ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ReactionLinks title="Competing pathways" reactions={competing} />
            <ReactionLinks title="Related reactions" reactions={related} />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={reaction.mechanismHref} className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">Launch mechanism lab →</Link>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Back to explorer</button>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, items }: { title: string; items: readonly string[] }) {
  return <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h3 className="font-bold text-slate-950">{title}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">{items.filter(Boolean).map((item) => <li key={item}>• {item}</li>)}</ul></section>;
}

function ReactionLinks({ title, reactions }: { title: string; reactions: readonly ReactionDefinition[] }) {
  return <section><h3 className="font-bold text-slate-950">{title}</h3><div className="mt-3 flex flex-wrap gap-2">{reactions.map((reaction) => <Link key={reaction.id} href={reaction.mechanismHref} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-800 hover:border-violet-400">{reaction.shortTitle}</Link>)}</div></section>;
}
