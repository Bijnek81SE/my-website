import KnowledgeConnections from "./KnowledgeConnections";
export default function RelatedConcepts({ nodeId }: { nodeId: string }) {
  return <KnowledgeConnections nodeId={nodeId} title="Related concepts" description="Connect this topic to nearby ideas, tools, and references." kinds={["related", "practice", "uses", "reference"]} />;
}
