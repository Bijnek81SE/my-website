import Link from "next/link";
import { RelationshipSection } from "@/components/relationships";
import { getKnowledgeNode } from "@/content/knowledge-graph";
import { requireMechanism } from "@/content/mechanisms";
import { getReaction } from "@/content/reactions";
import { getReagent } from "@/content/reagents";
import type { RelationshipItem } from "@/content/relationships";
import { MechanismPlayerRenderer } from "./MechanismPlayerRegistry";

export default function MechanismLabPage({ mechanismId }: { mechanismId: string }) {
  const mechanism = requireMechanism(mechanismId);
  const reaction = getReaction(mechanism.reactionId);
  const reactionItems: RelationshipItem[] = reaction ? [{ id: reaction.id, label: reaction.title, href: "/reactions", description: reaction.description, badge: reaction.family }] : [];
  const reagentItems: RelationshipItem[] = (reaction?.reagentIds ?? []).flatMap((id) => {
    const reagent = getReagent(id);
    return reagent ? [{ id: reagent.id, label: reagent.name, href: `/reagents/${reagent.slug}`, description: reagent.purpose, badge: reagent.formula }] : [];
  });
  const prerequisiteItems: RelationshipItem[] = mechanism.prerequisiteNodeIds.flatMap((id) => {
    const node = getKnowledgeNode(id);
    return node ? [{ id: node.id, label: node.title, href: node.href, description: node.description, badge: node.kind }] : [];
  });

  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Link href="/lab" className="inline-flex font-semibold text-blue-700 transition hover:text-blue-900">← Back to Lab</Link>
        <div className="mt-7"><MechanismPlayerRenderer playerId={mechanism.playerId} /></div>
        <section className="mt-8" aria-labelledby="mechanism-context-heading">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Mechanism context</p>
          <h2 id="mechanism-context-heading" className="mt-1 text-2xl font-bold text-slate-950">Where this electron-flow pattern is used</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <RelationshipSection presentationId="mechanism:typical-reactions" items={reactionItems} />
            <RelationshipSection presentationId="mechanism:common-reagents" items={reagentItems} />
            <RelationshipSection presentationId="mechanism:prerequisites" items={prerequisiteItems} />
          </div>
        </section>
      </div>
    </main>
  );
}
