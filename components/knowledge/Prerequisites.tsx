import KnowledgeConnections from "./KnowledgeConnections";
export default function Prerequisites({ nodeId }: { nodeId: string }) {
  return <KnowledgeConnections nodeId={nodeId} title="Prerequisites" description="Review these ideas first if this topic feels unfamiliar." kinds={["prerequisite"]} />;
}
