import type { KnowledgeNodeKind } from "@/content/knowledge-types";

const labels: Record<KnowledgeNodeKind, string> = {
  lesson: "Lesson",
  mechanism: "Mechanism",
  lab: "Lab",
  calculator: "Calculator",
  "functional-group": "Functional group",
  reaction: "Reaction",
  reagent: "Reagent",
  reference: "Reference",
};

export default function KnowledgeBadge({ kind }: { kind: KnowledgeNodeKind }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
      {labels[kind]}
    </span>
  );
}
