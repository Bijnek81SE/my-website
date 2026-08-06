import { describe, expect, it } from "vitest";
import {
  evaluatePrediction,
  evaluateSynthesisPlan,
  getAvailableTransformations,
} from "@/components/chemistry/prediction";
import {
  predictionChallenges,
  synthesisTargets,
  transformationRules,
} from "@/content/synthesis";

describe("reaction prediction engine", () => {
  it("scores reagent, product, and mechanism decisions independently", () => {
    const challenge = predictionChallenges[0];
    const result = evaluatePrediction(challenge, {
      reagentId: challenge.correctReagentId,
      productId: challenge.correctProductId,
      reasoningId: "wrong-reason",
    });

    expect(result.score).toBe(2);
    expect(result.productCorrect).toBe(true);
    expect(result.reasoningCorrect).toBe(false);
    expect(result.complete).toBe(false);
  });

  it("only offers transformations compatible with the current structure", () => {
    const available = getAvailableTransformations("2-bromopropane", transformationRules);
    expect(available.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "2-bromopropane-to-propene",
        "2-bromopropane-to-2-propanol",
      ]),
    );
    expect(available.every((rule) => rule.fromStructureId === "2-bromopropane")).toBe(true);
  });

  it("recognises an efficient multi-step synthesis", () => {
    const target = synthesisTargets.find(
      (item) => item.id === "secondary-bromide-to-primary-alcohol",
    );
    expect(target).toBeDefined();
    const route = target!.recommendedStepIds.map(
      (id) => transformationRules.find((rule) => rule.id === id)!,
    );
    const result = evaluateSynthesisPlan(target!, route);
    expect(result.reachedTarget).toBe(true);
    expect(result.efficient).toBe(true);
    expect(result.currentStructureId).toBe("1-propanol");
  });
});
