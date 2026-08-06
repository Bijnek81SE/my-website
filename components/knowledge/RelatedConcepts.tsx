import KnowledgeConnections from "./KnowledgeConnections";

export default function RelatedConcepts({ nodeId }: { nodeId: string }) {
  const isLesson = nodeId.startsWith("lesson:");
  const isMechanism = nodeId.startsWith("mechanism:");

  if (isLesson) {
    return <KnowledgeConnections nodeId={nodeId} title="Chemistry in action" description="See the reactions, mechanisms, references, and practice tools where this lesson becomes useful." kinds={["related", "practice", "uses", "reference"]} />;
  }

  if (isMechanism) {
    return <KnowledgeConnections nodeId={nodeId} title="Apply this mechanism" description="Connect this electron-flow pattern to reactions, reagents, and practice tools." kinds={["related", "practice", "uses", "reference"]} />;
  }

  return <KnowledgeConnections nodeId={nodeId} title="Connected chemistry" description="Explore the specific concepts, tools, and references linked to this topic." kinds={["related", "practice", "uses", "reference"]} />;
}
