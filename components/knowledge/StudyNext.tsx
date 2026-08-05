import KnowledgeConnections from "./KnowledgeConnections";
export default function StudyNext({ nodeId }: { nodeId: string }) {
  return <KnowledgeConnections nodeId={nodeId} title="Study next" kinds={["study-next"]} limit={2} />;
}
