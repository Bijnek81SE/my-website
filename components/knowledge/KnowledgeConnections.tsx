import Link from "next/link";
import { getKnowledgeConnections } from "@/content/knowledge-graph";
import type { KnowledgeRelationKind } from "@/content/knowledge-types";
import KnowledgeBadge from "./KnowledgeBadge";

type Props = {
  nodeId: string;
  title: string;
  description?: string;
  kinds?: readonly KnowledgeRelationKind[];
  limit?: number;
};

export default function KnowledgeConnections({
  nodeId,
  title,
  description,
  kinds,
  limit = 4,
}: Props) {
  const connections = getKnowledgeConnections(nodeId, kinds).slice(0, limit);
  if (connections.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-labelledby={`${nodeId.replaceAll(":", "-")}-${title.replaceAll(" ", "-")}`}>
      <h2 id={`${nodeId.replaceAll(":", "-")}-${title.replaceAll(" ", "-")}`} className="text-lg font-bold text-slate-950">
        {title}
      </h2>
      {description ? <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {connections.map(({ relation, node }) => {
          const content = (
            <>
              <div className="flex items-center justify-between gap-3">
                <KnowledgeBadge kind={node.kind} />
                {relation.label ? <span className="text-xs text-slate-500">{relation.label}</span> : null}
              </div>
              <h3 className="mt-3 font-semibold text-slate-950">{node.title}</h3>
              <p className="mt-1 text-sm leading-5 text-slate-600">{node.description}</p>
            </>
          );

          return node.href ? (
            <Link key={`${relation.kind}-${node.id}`} href={node.href} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
              {content}
            </Link>
          ) : (
            <article key={`${relation.kind}-${node.id}`} className="rounded-xl border border-slate-200 bg-white p-4">
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
