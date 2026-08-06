import {
  requireRetrosynthesisStructure,
  type RetrosynthesisBranch,
  type RetrosynthesisNode,
  type RetrosynthesisRoute,
  type RetrosynthesisRouteStep,
  type RetrosynthesisRule,
  type RetrosynthesisTarget,
} from "@/content/retrosynthesis";

export function scoreRetrosynthesisRule(rule: RetrosynthesisRule): number {
  const riskPenalty = rule.risk === "high" ? 24 : rule.risk === "medium" ? 11 : 0;
  return Math.max(0, Math.round(rule.reliability * 100 - rule.difficulty * 7 - riskPenalty));
}

function createNode(
  structureId: string,
  target: RetrosynthesisTarget,
  rules: readonly RetrosynthesisRule[],
  depth: number,
  visited: ReadonlySet<string>,
): RetrosynthesisNode {
  const structure = requireRetrosynthesisStructure(structureId);
  const solved = target.availableStartingMaterialIds.includes(structureId);
  const cycle = visited.has(structureId);
  const applicable = rules.filter((rule) => rule.productId === structureId);
  const deadEnd = !solved && (depth >= target.maxDepth || cycle || applicable.length === 0);

  if (solved || deadEnd) {
    return { id: `${structureId}:${depth}`, structure, depth, solved, deadEnd, children: [] };
  }

  const nextVisited = new Set(visited);
  nextVisited.add(structureId);
  const children: RetrosynthesisBranch[] = applicable.map((rule) => {
    const precursors = rule.precursorIds.map((precursorId) =>
      createNode(precursorId, target, rules, depth + 1, nextVisited),
    );
    const complete = precursors.every((node) => node.solved || node.children.some((branch) => branch.complete));
    return { rule, precursors, score: scoreRetrosynthesisRule(rule), complete };
  });

  return {
    id: `${structureId}:${depth}`,
    structure,
    depth,
    solved,
    deadEnd: children.length === 0,
    children: children.sort((a, b) => b.score - a.score),
  };
}

export function buildRetrosynthesisTree(
  target: RetrosynthesisTarget,
  rules: readonly RetrosynthesisRule[],
): RetrosynthesisNode {
  return createNode(target.targetStructureId, target, rules, 0, new Set());
}

function collectRoutes(node: RetrosynthesisNode): RetrosynthesisRoute[] {
  if (node.solved) return [{ steps: [], score: 100, complete: true, unresolvedStructureIds: [] }];
  if (node.deadEnd || node.children.length === 0) {
    return [{ steps: [], score: 0, complete: false, unresolvedStructureIds: [node.structure.id] }];
  }

  return node.children.flatMap((branch) => {
    const precursorRouteSets = branch.precursors.map(collectRoutes);
    const combinations = precursorRouteSets.reduce<RetrosynthesisRoute[][]>(
      (groups, routes) => groups.flatMap((group) => routes.map((route) => [...group, route])),
      [[]],
    );

    return combinations.map((routes) => {
      const step: RetrosynthesisRouteStep = {
        rule: branch.rule,
        product: node.structure,
        precursors: branch.precursors.map((precursor) => precursor.structure),
      };
      const nestedSteps = routes.flatMap((route) => route.steps);
      const unresolved = routes.flatMap((route) => route.unresolvedStructureIds);
      const complete = routes.every((route) => route.complete);
      const averageNestedScore = routes.length
        ? routes.reduce((sum, route) => sum + route.score, 0) / routes.length
        : 100;
      const score = Math.max(0, Math.round((branch.score + averageNestedScore) / 2 - nestedSteps.length * 2));
      return { steps: [step, ...nestedSteps], score, complete, unresolvedStructureIds: unresolved };
    });
  });
}

export function findRetrosynthesisRoutes(
  target: RetrosynthesisTarget,
  rules: readonly RetrosynthesisRule[],
): readonly RetrosynthesisRoute[] {
  return collectRoutes(buildRetrosynthesisTree(target, rules))
    .sort((a, b) => Number(b.complete) - Number(a.complete) || b.score - a.score || a.steps.length - b.steps.length);
}

export function explainDeadEnd(node: RetrosynthesisNode): string {
  if (node.solved) return `${node.structure.name} is an allowed starting material.`;
  if (node.depth === 0 && node.children.length === 0) return `No reverse transformation currently produces ${node.structure.name}.`;
  return `${node.structure.name} cannot be disconnected further within the current rule set and depth limit.`;
}

export function routeMatchesRecommendation(route: RetrosynthesisRoute, target: RetrosynthesisTarget): boolean {
  return route.steps.map((step) => step.rule.id).join("|") === target.recommendedRuleIds.join("|");
}
