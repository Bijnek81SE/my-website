import { describe, expect, it } from "vitest";
import {
  buildRetrosynthesisTree,
  findRetrosynthesisRoutes,
  routeMatchesRecommendation,
  scoreRetrosynthesisRule,
} from "@/components/chemistry/retrosynthesis";
import { retrosynthesisRules, retrosynthesisTargets } from "@/content/retrosynthesis";

describe("retrosynthesis engine", () => {
  it("builds a reverse-reaction tree from the target", () => {
    const tree = buildRetrosynthesisTree(retrosynthesisTargets[0], retrosynthesisRules);
    expect(tree.structure.id).toBe("1-propanol");
    expect(tree.children.length).toBeGreaterThan(1);
  });

  it("ranks complete routes above unresolved routes", () => {
    const routes = findRetrosynthesisRoutes(retrosynthesisTargets[2], retrosynthesisRules);
    expect(routes[0].complete).toBe(true);
    expect(routes[0].steps.map((step) => step.rule.id)).toEqual([
      "retro-primary-alcohol-from-alkene",
      "retro-alkene-from-secondary-bromide",
    ]);
    expect(routeMatchesRecommendation(routes[0], retrosynthesisTargets[2])).toBe(true);
  });

  it("penalises risky and difficult transformations", () => {
    const direct = retrosynthesisRules.find((rule) => rule.id === "retro-primary-alcohol-from-alkene");
    const elimination = retrosynthesisRules.find((rule) => rule.id === "retro-alkene-from-secondary-bromide");
    expect(direct).toBeDefined();
    expect(elimination).toBeDefined();
    expect(scoreRetrosynthesisRule(direct!)).toBeGreaterThan(scoreRetrosynthesisRule(elimination!));
  });
});
