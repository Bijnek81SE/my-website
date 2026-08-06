import { describe, expect, it } from "vitest";
import {
  calculateDilutionUnknown,
  calculateLimitingReagent,
  calculateMolarMass,
  calculatePercentYield,
  calculateStoichiometricProduct,
  parseMolecularFormula,
} from "@/lib/calculators";

describe("quantitative chemistry math", () => {
  it("parses grouped formulas and hydrates", () => {
    expect(parseMolecularFormula("Ca(OH)2")).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(parseMolecularFormula("CuSO4·5H2O")).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
    expect(calculateMolarMass("H2O")).toBeCloseTo(18.015, 3);
  });

  it("solves dilution and stoichiometry relationships", () => {
    expect(calculateDilutionUnknown({ c1: 1, c2: 0.1, v2: 0.1, solveFor: "v1" })).toBeCloseTo(0.01);
    expect(calculateStoichiometricProduct({ reactantMoles: 0.5, reactantCoefficient: 2, productCoefficient: 3 })).toBeCloseTo(0.75);
  });

  it("identifies a limiting reagent and calculates percent yield", () => {
    const result = calculateLimitingReagent({
      reactants: [
        { id: "H2", moles: 1, coefficient: 2 },
        { id: "O2", moles: 1, coefficient: 1 },
      ],
      productCoefficient: 2,
    });
    expect(result.limitingId).toBe("H2");
    expect(result.productMoles).toBeCloseTo(1);
    expect(calculatePercentYield(8.2, 10)).toBeCloseTo(82);
  });
});
