import type { KnowledgeNodeKind } from "@/content/knowledge-types";
import { semanticGraph } from "./semantic-graph-store";
import type {
  SemanticGraphConnection,
  SemanticGraphDirection,
  SemanticGraphEdge,
  SemanticGraphNode,
  SemanticGraphPath,
  SemanticGraphQuery,
  SemanticGraphRecommendation,
  SemanticGraphSemantic,
} from "./semantic-graph-types";

const nodesById = new Map(
  semanticGraph.nodes.map((node) => [node.id, node]),
);

const outgoingById = new Map<string, SemanticGraphEdge[]>();
const incomingById = new Map<string, SemanticGraphEdge[]>();

for (const edge of semanticGraph.edges) {
  const outgoing = outgoingById.get(edge.from) ?? [];
  outgoing.push(edge);
  outgoingById.set(edge.from, outgoing);

  const incoming = incomingById.get(edge.to) ?? [];
  incoming.push(edge);
  incomingById.set(edge.to, incoming);
}

export function getSemanticGraphNode(
  id: string,
): SemanticGraphNode | undefined {
  return nodesById.get(id);
}

function directionCandidates(
  entityId: string,
  direction: SemanticGraphDirection,
): readonly {
  edge: SemanticGraphEdge;
  direction: "outgoing" | "incoming";
}[] {
  if (direction === "outgoing") {
    return (outgoingById.get(entityId) ?? []).map((edge) => ({
      edge,
      direction: "outgoing" as const,
    }));
  }

  if (direction === "incoming") {
    return (incomingById.get(entityId) ?? []).map((edge) => ({
      edge,
      direction: "incoming" as const,
    }));
  }

  return [
    ...(outgoingById.get(entityId) ?? []).map((edge) => ({
      edge,
      direction: "outgoing" as const,
    })),
    ...(incomingById.get(entityId) ?? []).map((edge) => ({
      edge,
      direction: "incoming" as const,
    })),
  ];
}

export function getSemanticGraphConnections(
  query: SemanticGraphQuery,
): readonly SemanticGraphConnection[] {
  const direction = query.direction ?? "outgoing";
  const semantics = query.semantics
    ? new Set(query.semantics)
    : null;
  const categories = query.categories
    ? new Set(query.categories)
    : null;
  const targetKinds = query.targetKinds
    ? new Set(query.targetKinds)
    : null;
  const includeInferred = query.includeInferred ?? true;

  return directionCandidates(
    query.entityId,
    direction,
  ).flatMap(({ edge, direction: edgeDirection }) => {
    if (!includeInferred && edge.inferred) {
      return [];
    }

    if (semantics && !semantics.has(edge.semantic)) {
      return [];
    }

    if (categories && !categories.has(edge.category)) {
      return [];
    }

    const nodeId =
      edgeDirection === "outgoing"
        ? edge.to
        : edge.from;

    const node = nodesById.get(nodeId);

    if (!node) {
      return [];
    }

    if (targetKinds && !targetKinds.has(node.kind)) {
      return [];
    }

    return [
      {
        edge,
        node,
        direction: edgeDirection,
      },
    ];
  });
}

/**
 * Returns unique nodes connected by exactly one graph edge.
 *
 * Keep this deliberately one-hop. Consumers that need wider semantic
 * context should use getSemanticGraphContext().
 */
export function getSemanticGraphNeighbors(
  entityId: string,
  options: Omit<SemanticGraphQuery, "entityId"> = {},
): readonly SemanticGraphNode[] {
  const seen = new Set<string>();

  return getSemanticGraphConnections({
    entityId,
    ...options,
  })
    .map((connection) => connection.node)
    .filter((node) => {
      if (seen.has(node.id)) {
        return false;
      }

      seen.add(node.id);
      return true;
    });
}

export type SemanticGraphContextOptions =
  Omit<SemanticGraphQuery, "entityId"> & {
    maxDepth?: number;
    includeSource?: boolean;
  };

/**
 * Traverses the semantic graph breadth-first and returns every unique node
 * reachable from an entity within maxDepth.
 *
 * This is intended for Workspace context, recommendations, discovery,
 * learning pathways, and other consumers that need transitive chemistry.
 *
 * Example:
 *
 * molecule:propene
 *   -> reaction:hydrohalogenation
 *   -> mechanism:hydrohalogenation
 *
 * The mechanism is therefore discoverable at depth 2 without adding a
 * redundant direct molecule -> mechanism edge.
 */
export function getSemanticGraphContext(
  entityId: string,
  options: SemanticGraphContextOptions = {},
): readonly SemanticGraphNode[] {
  const {
    maxDepth = 2,
    includeSource = false,
    direction = "both",
    semantics,
    categories,
    targetKinds,
    includeInferred = true,
  } = options;

  if (maxDepth < 0) {
    throw new Error(
      "Semantic graph context maxDepth cannot be negative.",
    );
  }

  const source = nodesById.get(entityId);

  if (!source) {
    return [];
  }

  const discovered = new Map<string, SemanticGraphNode>();

  if (includeSource) {
    discovered.set(source.id, source);
  }

  if (maxDepth === 0) {
    return [...discovered.values()];
  }

  const visited = new Set<string>([entityId]);

  type State = {
    nodeId: string;
    depth: number;
  };

  const queue: State[] = [
    {
      nodeId: entityId,
      depth: 0,
    },
  ];

  while (queue.length > 0) {
    const state = queue.shift() as State;

    if (state.depth >= maxDepth) {
      continue;
    }

    const connections = getSemanticGraphConnections({
      entityId: state.nodeId,
      direction,
      semantics,
      categories,
      includeInferred,
    });

    for (const connection of connections) {
      const node = connection.node;

      if (visited.has(node.id)) {
        continue;
      }

      visited.add(node.id);

      const nextDepth = state.depth + 1;

      /*
       * targetKinds controls which nodes are returned, not which nodes
       * may be traversed through. This is important:
       *
       * molecule -> reaction -> mechanism
       *
       * still works when targetKinds is ["mechanism"].
       */
      if (
        !targetKinds ||
        targetKinds.includes(node.kind)
      ) {
        discovered.set(node.id, node);
      }

      if (nextDepth < maxDepth) {
        queue.push({
          nodeId: node.id,
          depth: nextDepth,
        });
      }
    }
  }

  return [...discovered.values()];
}

export function findSemanticGraphPaths(
  fromId: string,
  toId: string,
  maxDepth = 4,
  maxPaths = 25,
): readonly SemanticGraphPath[] {
  if (fromId === toId) {
    const node = nodesById.get(fromId);

    return node
      ? [
          {
            nodes: [node],
            edges: [],
            score: 1,
          },
        ]
      : [];
  }

  type State = {
    nodeId: string;
    nodeIds: string[];
    edges: SemanticGraphEdge[];
    score: number;
  };

  const queue: State[] = [
    {
      nodeId: fromId,
      nodeIds: [fromId],
      edges: [],
      score: 1,
    },
  ];

  const paths: SemanticGraphPath[] = [];
  let expansions = 0;
  const maxExpansions = 5000;

  while (
    queue.length > 0 &&
    expansions < maxExpansions
  ) {
    expansions += 1;

    const state = queue.shift() as State;

    if (state.edges.length >= maxDepth) {
      continue;
    }

    for (const { edge, node } of getSemanticGraphConnections({
      entityId: state.nodeId,
      direction: "both",
    })) {
      if (state.nodeIds.includes(node.id)) {
        continue;
      }

      const nextEdges = [
        ...state.edges,
        edge,
      ];

      const nextNodeIds = [
        ...state.nodeIds,
        node.id,
      ];

      const nextScore =
        state.score *
        edge.weight *
        0.82;

      if (node.id === toId) {
        const pathNodes = nextNodeIds
          .map((id) => nodesById.get(id))
          .filter(
            (
              item,
            ): item is SemanticGraphNode =>
              Boolean(item),
          );

        paths.push({
          nodes: pathNodes,
          edges: nextEdges,
          score: nextScore,
        });

        continue;
      }

      queue.push({
        nodeId: node.id,
        nodeIds: nextNodeIds,
        edges: nextEdges,
        score: nextScore,
      });
    }
  }

  const bestByNodeSequence =
    new Map<string, SemanticGraphPath>();

  for (const path of paths) {
    const key = path.nodes
      .map((node) => node.id)
      .join("|");

    const existing =
      bestByNodeSequence.get(key);

    if (
      !existing ||
      path.score > existing.score
    ) {
      bestByNodeSequence.set(
        key,
        path,
      );
    }
  }

  return [
    ...bestByNodeSequence.values(),
  ]
    .sort(
      (left, right) =>
        right.score - left.score,
    )
    .slice(0, maxPaths);
}

export function recommendSemanticGraphNodes(input: {
  sourceIds: readonly string[];
  targetKinds?: readonly KnowledgeNodeKind[];
  excludeIds?: readonly string[];
  semantics?: readonly SemanticGraphSemantic[];
  maxDepth?: number;
  limit?: number;
}): readonly SemanticGraphRecommendation[] {
  const maxDepth =
    input.maxDepth ?? 2;

  const limit =
    input.limit ?? 6;

  const excluded = new Set([
    ...(input.excludeIds ?? []),
    ...input.sourceIds,
  ]);

  const targetKinds =
    input.targetKinds
      ? new Set(input.targetKinds)
      : null;

  const semantics =
    input.semantics
      ? new Set(input.semantics)
      : null;

  const scores = new Map<
    string,
    {
      score: number;
      reasons: SemanticGraphRecommendation["reasons"];
    }
  >();

  for (const sourceId of input.sourceIds) {
    type State = {
      nodeId: string;
      depth: number;
      score: number;
      visited: Set<string>;
    };

    const queue: State[] = [
      {
        nodeId: sourceId,
        depth: 0,
        score: 1,
        visited: new Set([
          sourceId,
        ]),
      },
    ];

    while (queue.length > 0) {
      const state =
        queue.shift() as State;

      if (state.depth >= maxDepth) {
        continue;
      }

      for (const connection of getSemanticGraphConnections({
        entityId: state.nodeId,
        direction: "both",
      })) {
        if (
          state.visited.has(
            connection.node.id,
          )
        ) {
          continue;
        }

        const depth =
          state.depth + 1;

        const score =
          state.score *
          connection.edge.weight *
          (depth === 1
            ? 1
            : 0.72);

        const matchesSemantic =
          !semantics ||
          semantics.has(
            connection.edge.semantic,
          );

        const matchesKind =
          !targetKinds ||
          targetKinds.has(
            connection.node.kind,
          );

        if (
          !excluded.has(
            connection.node.id,
          ) &&
          matchesSemantic &&
          matchesKind
        ) {
          const current =
            scores.get(
              connection.node.id,
            ) ?? {
              score: 0,
              reasons: [],
            };

          scores.set(
            connection.node.id,
            {
              score:
                current.score +
                score,
              reasons: [
                ...current.reasons,
                {
                  sourceId,
                  semantic:
                    connection.edge
                      .semantic,
                  depth,
                },
              ],
            },
          );
        }

        queue.push({
          nodeId:
            connection.node.id,
          depth,
          score,
          visited: new Set([
            ...state.visited,
            connection.node.id,
          ]),
        });
      }
    }
  }

  return [
    ...scores.entries(),
  ]
    .flatMap(
      ([id, value]) => {
        const node =
          nodesById.get(id);

        return node
          ? [
              {
                node,
                score:
                  value.score,
                reasons:
                  value.reasons,
              },
            ]
          : [];
      },
    )
    .sort(
      (left, right) =>
        right.score -
          left.score ||
        left.node.title.localeCompare(
          right.node.title,
        ),
    )
    .slice(0, limit);
}