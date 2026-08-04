import type { MolecularGraph } from "./MolecularGraph";
import {
  bondTypeOrderContribution,
} from "../bonds/validation";

export type Hybridisation =
  | "sp"
  | "sp2"
  | "sp3"
  | "sp3d"
  | "sp3d2"
  | "unknown";

export type MolecularGeometry =
  | "linear"
  | "trigonal-planar"
  | "tetrahedral"
  | "trigonal-bipyramidal"
  | "octahedral"
  | "unknown";

export type HybridisationConfidence =
  | "high"
  | "medium"
  | "low";

export type HybridisationResult = {
  hybridisation: Hybridisation;
  geometry: MolecularGeometry;
  stericNumber: number;
  sigmaBonds: number;
  piBonds: number;
  estimatedLonePairs: number;
  confidence: HybridisationConfidence;
  reasoning: readonly string[];
};

const DEFAULT_LONE_PAIRS: Readonly<
  Record<string, number>
> = {
  H: 0,
  B: 0,
  C: 0,
  N: 1,
  O: 2,
  F: 3,
  Cl: 3,
  Br: 3,
  I: 3,
  P: 1,
  S: 2,
};

function estimateLonePairs(
  element?: string,
  charge = 0,
): number {
  if (!element) {
    return 0;
  }

  const base =
    DEFAULT_LONE_PAIRS[element] ?? 0;

  if (charge > 0) {
    return Math.max(0, base - charge);
  }

  if (charge < 0) {
    return base + Math.abs(charge);
  }

  return base;
}

export function getSigmaBondCount(
  graph: MolecularGraph,
  atomId: string,
): number {
  return graph.getConnectedBonds(atomId)
    .length;
}

export function getPiBondCount(
  graph: MolecularGraph,
  atomId: string,
): number {
  return graph
    .getConnectedBonds(atomId)
    .reduce((count, bond) => {
      const order =
        bondTypeOrderContribution(
          bond.type ?? "single",
        );

      return count + Math.max(0, order - 1);
    }, 0);
}

export function getStericNumber(
  graph: MolecularGraph,
  atomId: string,
): number {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return 0;
  }

  return (
    getSigmaBondCount(graph, atomId) +
    estimateLonePairs(
      atom.element,
      atom.charge,
    )
  );
}

export function determineHybridisation(
  graph: MolecularGraph,
  atomId: string,
): HybridisationResult {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return {
      hybridisation: "unknown",
      geometry: "unknown",
      stericNumber: 0,
      sigmaBonds: 0,
      piBonds: 0,
      estimatedLonePairs: 0,
      confidence: "low",
      reasoning: [
        "Atom not found.",
      ],
    };
  }

  const sigma =
    getSigmaBondCount(graph, atomId);

  const pi =
    getPiBondCount(graph, atomId);

  const lonePairs =
    estimateLonePairs(
      atom.element,
      atom.charge,
    );

  const steric =
    sigma + lonePairs;

  switch (steric) {
    case 2:
      return {
        hybridisation: "sp",
        geometry: "linear",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "high",
        reasoning: [
          "Steric number = 2.",
        ],
      };

    case 3:
      return {
        hybridisation: "sp2",
        geometry:
          "trigonal-planar",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "high",
        reasoning: [
          "Steric number = 3.",
        ],
      };

    case 4:
      return {
        hybridisation: "sp3",
        geometry:
          "tetrahedral",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "high",
        reasoning: [
          "Steric number = 4.",
        ],
      };

    case 5:
      return {
        hybridisation: "sp3d",
        geometry:
          "trigonal-bipyramidal",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "medium",
        reasoning: [
          "Steric number = 5.",
        ],
      };

    case 6:
      return {
        hybridisation: "sp3d2",
        geometry:
          "octahedral",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "medium",
        reasoning: [
          "Steric number = 6.",
        ],
      };

    default:
      return {
        hybridisation: "unknown",
        geometry: "unknown",
        stericNumber: steric,
        sigmaBonds: sigma,
        piBonds: pi,
        estimatedLonePairs: lonePairs,
        confidence: "low",
        reasoning: [
          "Steric number outside supported range.",
        ],
      };
  }
}