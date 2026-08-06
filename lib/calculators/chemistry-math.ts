import {
  amountToMoles,
  concentrationToMolar,
  massToGrams,
  volumeToLitres,
  type AmountUnit,
  type ConcentrationUnit,
  type MassUnit,
  type VolumeUnit,
} from "./units";

export const atomicWeights: Readonly<Record<string, number>> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
  K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
  Rb: 85.468, Sr: 87.62, Ag: 107.8682, Cd: 112.414, Sn: 118.71,
  I: 126.90447, Ba: 137.327, Pt: 195.084, Au: 196.96657, Hg: 200.592,
  Pb: 207.2,
};

export type FormulaComposition = Readonly<Record<string, number>>;

function mergeComposition(target: Record<string, number>, source: FormulaComposition, factor = 1) {
  for (const [element, count] of Object.entries(source)) {
    target[element] = (target[element] ?? 0) + count * factor;
  }
}

function normalizeFormula(formula: string): string {
  return formula
    .trim()
    .replaceAll(" ", "")
    .replaceAll("·", ".")
    .replaceAll("−", "-")
    .replace(/\^?[0-9]*[+-]$/u, "");
}

function parseSegment(segment: string): FormulaComposition {
  let index = 0;

  function readNumber(): number {
    const start = index;
    while (index < segment.length && /[0-9]/.test(segment[index])) index += 1;
    return start === index ? 1 : Number(segment.slice(start, index));
  }

  function parseGroup(expectedClose?: string): Record<string, number> {
    const result: Record<string, number> = {};
    while (index < segment.length) {
      const character = segment[index];
      if (expectedClose && character === expectedClose) {
        index += 1;
        return result;
      }
      if (character === "(" || character === "[") {
        index += 1;
        const nested = parseGroup(character === "(" ? ")" : "]");
        mergeComposition(result, nested, readNumber());
        continue;
      }
      if (/[A-Z]/.test(character)) {
        const start = index;
        index += 1;
        while (index < segment.length && /[a-z]/.test(segment[index])) index += 1;
        const element = segment.slice(start, index);
        if (!(element in atomicWeights)) {
          throw new Error(`Unknown element symbol “${element}”.`);
        }
        result[element] = (result[element] ?? 0) + readNumber();
        continue;
      }
      throw new Error(`Unexpected character “${character}” in the formula.`);
    }
    if (expectedClose) throw new Error(`Missing closing “${expectedClose}” in the formula.`);
    return result;
  }

  const leadingMatch = segment.match(/^(\d+)(?=[A-Z[(])/);
  const coefficient = leadingMatch ? Number(leadingMatch[1]) : 1;
  if (leadingMatch) index = leadingMatch[1].length;
  const composition = parseGroup();
  const scaled: Record<string, number> = {};
  mergeComposition(scaled, composition, coefficient);
  return scaled;
}

export function parseMolecularFormula(formula: string): FormulaComposition {
  const normalized = normalizeFormula(formula);
  if (!normalized) throw new Error("Enter a molecular formula.");
  const total: Record<string, number> = {};
  for (const segment of normalized.split(".")) {
    if (!segment) throw new Error("The formula contains an empty hydrate segment.");
    mergeComposition(total, parseSegment(segment));
  }
  if (Object.keys(total).length === 0) throw new Error("Enter a molecular formula.");
  return total;
}

export function calculateMolarMass(formula: string): number {
  const composition = parseMolecularFormula(formula);
  return Object.entries(composition).reduce(
    (sum, [element, count]) => sum + atomicWeights[element] * count,
    0,
  );
}

export function calculateElementMassPercentages(formula: string): Record<string, number> {
  const composition = parseMolecularFormula(formula);
  const total = calculateMolarMass(formula);
  return Object.fromEntries(
    Object.entries(composition).map(([element, count]) => [
      element,
      (atomicWeights[element] * count * 100) / total,
    ]),
  );
}

export function calculateMolarity(moles: number, volumeLitres: number): number {
  if (moles < 0 || volumeLitres <= 0) throw new Error("Moles must be non-negative and volume must be positive.");
  return moles / volumeLitres;
}

export function calculateDilutionUnknown(values: {
  c1?: number;
  v1?: number;
  c2?: number;
  v2?: number;
  solveFor: "c1" | "v1" | "c2" | "v2";
}): number {
  const { c1, v1, c2, v2, solveFor } = values;
  const required = [c1, v1, c2, v2].filter((value) => value !== undefined);
  if (required.some((value) => !Number.isFinite(value) || (value ?? 0) <= 0)) {
    throw new Error("All supplied concentration and volume values must be greater than zero.");
  }
  if (solveFor === "c1" && v1 && c2 && v2) return (c2 * v2) / v1;
  if (solveFor === "v1" && c1 && c2 && v2) return (c2 * v2) / c1;
  if (solveFor === "c2" && c1 && v1 && v2) return (c1 * v1) / v2;
  if (solveFor === "v2" && c1 && v1 && c2) return (c1 * v1) / c2;
  throw new Error("Provide the other three values before calculating.");
}

export type StoichiometricAmountInput =
  | { value: number; unit: AmountUnit }
  | { value: number; unit: MassUnit; formula: string };

export function amountInputToMoles(input: StoichiometricAmountInput): number {
  if (input.value <= 0) throw new Error("Amount must be greater than zero.");
  if (!("formula" in input)) {
    return amountToMoles(input.value, input.unit);
  }
  return massToGrams(input.value, input.unit) / calculateMolarMass(input.formula);
}

export function calculateStoichiometricProduct(input: {
  reactantMoles: number;
  reactantCoefficient: number;
  productCoefficient: number;
}): number {
  const { reactantMoles, reactantCoefficient, productCoefficient } = input;
  if (reactantMoles < 0 || reactantCoefficient <= 0 || productCoefficient <= 0) {
    throw new Error("Amounts and stoichiometric coefficients must be valid positive values.");
  }
  return (reactantMoles / reactantCoefficient) * productCoefficient;
}

export function calculateLimitingReagent(input: {
  reactants: readonly { id: string; moles: number; coefficient: number }[];
  productCoefficient: number;
}) {
  if (input.reactants.length < 2) throw new Error("At least two reactants are required.");
  if (input.productCoefficient <= 0) throw new Error("Product coefficient must be greater than zero.");
  const extents = input.reactants.map((reactant) => {
    if (reactant.moles < 0 || reactant.coefficient <= 0) {
      throw new Error("Reactant moles must be non-negative and coefficients must be positive.");
    }
    return { ...reactant, extent: reactant.moles / reactant.coefficient };
  });
  const limiting = extents.reduce((smallest, current) =>
    current.extent < smallest.extent ? current : smallest,
  );
  const productMoles = limiting.extent * input.productCoefficient;
  return {
    limitingId: limiting.id,
    reactionExtent: limiting.extent,
    productMoles,
    excessMoles: Object.fromEntries(
      extents.map((reactant) => [
        reactant.id,
        Math.max(0, reactant.moles - limiting.extent * reactant.coefficient),
      ]),
    ),
  };
}

export function calculatePercentYield(actual: number, theoretical: number): number {
  if (actual < 0 || theoretical <= 0) throw new Error("Actual yield cannot be negative and theoretical yield must be positive.");
  return (actual / theoretical) * 100;
}

export function normaliseSolutionInputs(input: {
  concentration: number;
  concentrationUnit: ConcentrationUnit;
  volume: number;
  volumeUnit: VolumeUnit;
}) {
  return {
    molar: concentrationToMolar(input.concentration, input.concentrationUnit),
    litres: volumeToLitres(input.volume, input.volumeUnit),
  };
}
