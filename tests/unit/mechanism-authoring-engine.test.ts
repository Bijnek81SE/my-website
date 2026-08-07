import { describe, expect, it } from "vitest";
import {
  compileMechanismRequest,
  resolveMechanismFamily,
  validateCompiledMechanism,
} from "@/content/mechanisms/authoring";

describe("mechanism authoring engine experiment", () => {
  it("resolves supported reaction requests deterministically", () => {
    expect(
      resolveMechanismFamily({
        substrateClass: "primary-alkyl-halide",
        reagentClass: "strong-nucleophile",
        productClass: "substitution-product",
      }),
    ).toBe("sn2");

    expect(
      resolveMechanismFamily({
        substrateClass: "secondary-alkyl-halide",
        reagentClass: "strong-base",
        productClass: "alkene",
      }),
    ).toBe("e2");

    expect(
      resolveMechanismFamily({
        substrateClass: "alkene",
        reagentClass: "halogen",
        productClass: "vicinal-dihalide",
      }),
    ).toBe("alkene-halogenation");
  });

  it("refuses unsupported combinations instead of inventing chemistry", () => {
    expect(
      resolveMechanismFamily({
        substrateClass: "primary-alkyl-halide",
        reagentClass: "strong-base",
        productClass: "alkene",
      }),
    ).toBeUndefined();
  });

  it("compiles family steps that preserve the trusted player sequence", () => {
    const sn2 = compileMechanismRequest("test-sn2", {
      substrateClass: "primary-alkyl-halide",
      reagentClass: "strong-nucleophile",
      productClass: "substitution-product",
    });

    const e2 = compileMechanismRequest("test-e2", {
      substrateClass: "secondary-alkyl-halide",
      reagentClass: "strong-base",
      productClass: "alkene",
    });

    const halogenation = compileMechanismRequest("test-halogenation", {
      substrateClass: "alkene",
      reagentClass: "halogen",
      productClass: "vicinal-dihalide",
    });

    expect(sn2?.steps.map((step) => step.id)).toEqual([
      "identify-nucleophile",
      "backside-attack",
      "bond-breaking",
      "products",
    ]);
    expect(sn2?.steps[2].arrows).toHaveLength(2);
    expect(sn2?.geometry.backsideAttackDegrees).toBe(180);
    expect(sn2 ? validateCompiledMechanism(sn2) : []).toEqual([]);

    expect(e2?.steps.map((step) => step.id)).toEqual([
      "alignment",
      "concerted",
      "products",
    ]);
    expect(e2?.steps[1].arrows).toHaveLength(3);
    expect(e2?.geometry.antiPeriplanarDihedralDegrees).toBe(180);
    expect(e2 ? validateCompiledMechanism(e2) : []).toEqual([]);

    expect(halogenation?.steps.map((step) => step.id)).toEqual([
      "identify-pi-bond",
      "bromonium-formation",
      "bromonium",
      "bromide-attack",
      "products",
    ]);
    expect(halogenation?.steps[1].arrows).toHaveLength(2);
    expect(halogenation?.steps[3].arrows).toHaveLength(2);
    expect(halogenation?.geometry.antiAddition).toBe(true);
    expect(halogenation ? validateCompiledMechanism(halogenation) : []).toEqual([]);
  });
});
