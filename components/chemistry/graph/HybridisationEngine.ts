import type {
  SkeletalAtom,
  SkeletalBond,
} from "../skeletal/types";
import {
  bondTypeOrderContribution,
} from "../bonds/validation";
import type {
  MolecularGraph,
  MolecularGraphNeighbour,
} from "./MolecularGraph";

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

function inferElement(
  atom: SkeletalAtom,
): string | undefined {
  if (atom.element) {
    return atom.element;
  }

  const match = atom.label?.match(
    /^([A-Z][a-z]?)/,
  );

  return match?.[1];
}

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

function bondHasPiCharacter(
  bond: SkeletalBond,
): boolean {
  return (
    bond.type === "double" ||
    bond.type === "triple" ||
    bond.type === "aromatic"
  );
}

function bondHasTripleCharacter(
  bond: SkeletalBond,
): boolean {
  return bond.type === "triple";
}

function getNeighbourByBond(
  graph: MolecularGraph,
  atomId: string,
  bondId: string,
): MolecularGraphNeighbour | undefined {
  return graph
    .getNeighbours(atomId)
    .find(
      (neighbour) =>
        neighbour.bond.id === bondId,
    );
}

function neighbourHasPiBondExcluding(
  graph: MolecularGraph,
  neighbourAtomId: string,
  excludedBondId: string,
): boolean {
  return graph
    .getConnectedBonds(neighbourAtomId)
    .some(
      (bond) =>
        bond.id !== excludedBondId &&
        bondHasPiCharacter(bond),
    );
}

function hasAdjacentPiSystem(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getNeighbours(atomId)
    .some((neighbour) =>
      neighbourHasPiBondExcluding(
        graph,
        neighbour.atom.id,
        neighbour.bond.id,
      ),
    );
}

function hasAromaticBond(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getConnectedBonds(atomId)
    .some(
      (bond) =>
        bond.type === "aromatic",
    );
}

function hasDirectDoubleBond(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getConnectedBonds(atomId)
    .some(
      (bond) =>
        bond.type === "double",
    );
}

function hasDirectTripleBond(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getConnectedBonds(atomId)
    .some(bondHasTripleCharacter);
}

function isCarbocation(
  atom: SkeletalAtom,
): boolean {
  return (
    inferElement(atom) === "C" &&
    (atom.charge ?? 0) > 0
  );
}

function isCarbonRadical(
  atom: SkeletalAtom,
): boolean {
  return (
    inferElement(atom) === "C" &&
    atom.radical === true
  );
}

function isConjugatedHeteroatom(
  graph: MolecularGraph,
  atom: SkeletalAtom,
): boolean {
  const element = inferElement(atom);

  if (
    element !== "N" &&
    element !== "O" &&
    element !== "S"
  ) {
    return false;
  }

  if (hasDirectDoubleBond(graph, atom.id)) {
    return true;
  }

  return hasAdjacentPiSystem(
    graph,
    atom.id,
  );
}

function result({
  hybridisation,
  geometry,
  stericNumber,
  sigmaBonds,
  piBonds,
  estimatedLonePairs,
  confidence,
  reasoning,
}: HybridisationResult): HybridisationResult {
  return {
    hybridisation,
    geometry,
    stericNumber,
    sigmaBonds,
    piBonds,
    estimatedLonePairs,
    confidence,
    reasoning,
  };
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

      return (
        count +
        Math.max(0, order - 1)
      );
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
      inferElement(atom),
      atom.charge,
    )
  );
}

function determineFromStericNumber({
  stericNumber,
  sigmaBonds,
  piBonds,
  estimatedLonePairs,
  reasoning,
}: {
  stericNumber: number;
  sigmaBonds: number;
  piBonds: number;
  estimatedLonePairs: number;
  reasoning: string[];
}): HybridisationResult {
  switch (stericNumber) {
    case 2:
      return result({
        hybridisation: "sp",
        geometry: "linear",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "high",
        reasoning: [
          ...reasoning,
          "Steric number 2 gives an sp arrangement.",
        ],
      });

    case 3:
      return result({
        hybridisation: "sp2",
        geometry:
          "trigonal-planar",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "high",
        reasoning: [
          ...reasoning,
          "Steric number 3 gives an sp2 arrangement.",
        ],
      });

    case 4:
      return result({
        hybridisation: "sp3",
        geometry:
          "tetrahedral",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "high",
        reasoning: [
          ...reasoning,
          "Steric number 4 gives an sp3 arrangement.",
        ],
      });

    case 5:
      return result({
        hybridisation: "sp3d",
        geometry:
          "trigonal-bipyramidal",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "medium",
        reasoning: [
          ...reasoning,
          "Steric number 5 is treated as sp3d.",
          "Expanded-valence assignments are handled conservatively.",
        ],
      });

    case 6:
      return result({
        hybridisation: "sp3d2",
        geometry:
          "octahedral",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "medium",
        reasoning: [
          ...reasoning,
          "Steric number 6 is treated as sp3d2.",
          "Expanded-valence assignments are handled conservatively.",
        ],
      });

    default:
      return result({
        hybridisation: "unknown",
        geometry: "unknown",
        stericNumber,
        sigmaBonds,
        piBonds,
        estimatedLonePairs,
        confidence: "low",
        reasoning: [
          ...reasoning,
          "Steric number falls outside the supported range.",
        ],
      });
  }
}

export function determineHybridisation(
  graph: MolecularGraph,
  atomId: string,
): HybridisationResult {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return result({
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
    });
  }

  const element = inferElement(atom);

  const sigmaBonds =
    getSigmaBondCount(graph, atomId);

  const piBonds =
    getPiBondCount(graph, atomId);

  const estimatedLonePairs =
    estimateLonePairs(
      element,
      atom.charge,
    );

  const stericNumber =
    sigmaBonds +
    estimatedLonePairs;

  const reasoning: string[] = [
    `Detected ${sigmaBonds} sigma bond${sigmaBonds === 1 ? "" : "s"}.`,
    `Detected ${piBonds} pi-bond contribution${piBonds === 1 ? "" : "s"}.`,
    `Estimated ${estimatedLonePairs} lone pair${estimatedLonePairs === 1 ? "" : "s"}.`,
  ];

  if (element === "H") {
    return result({
      hybridisation: "unknown",
      geometry: "unknown",
      stericNumber,
      sigmaBonds,
      piBonds,
      estimatedLonePairs,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "Hydrogen does not undergo conventional hybridisation.",
      ],
    });
  }

  if (
    hasDirectTripleBond(
      graph,
      atomId,
    )
  ) {
    return result({
      hybridisation: "sp",
      geometry: "linear",
      stericNumber: 2,
      sigmaBonds,
      piBonds,
      estimatedLonePairs,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "A directly attached triple bond requires two unhybridised p orbitals.",
        "The atom is assigned sp hybridisation.",
      ],
    });
  }

  if (
    hasAromaticBond(
      graph,
      atomId,
    )
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "The atom participates in an aromatic bond.",
        "A p orbital is required for aromatic delocalisation.",
      ],
    });
  }

  if (
    isCarbocation(atom)
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs: 0,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "A carbocation requires an empty p orbital.",
        "The positively charged carbon is assigned sp2 hybridisation.",
      ],
    });
  }

  if (
    isCarbonRadical(atom)
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs: 0,
      confidence: "medium",
      reasoning: [
        ...reasoning,
        "A carbon radical is treated as approximately trigonal planar.",
        "The unpaired electron occupies a p orbital.",
      ],
    });
  }

  if (
    hasDirectDoubleBond(
      graph,
      atomId,
    )
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "A directly attached double bond requires one unhybridised p orbital.",
        "The atom is assigned sp2 hybridisation.",
      ],
    });
  }

  if (
    isConjugatedHeteroatom(
      graph,
      atom,
    )
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs,
      confidence: "medium",
      reasoning: [
        ...reasoning,
        "A heteroatom lone pair is adjacent to a pi system.",
        "The lone pair is treated as occupying a p orbital for conjugation.",
      ],
    });
  }

  if (
    element === "B" &&
    sigmaBonds === 3
  ) {
    return result({
      hybridisation: "sp2",
      geometry:
        "trigonal-planar",
      stericNumber: 3,
      sigmaBonds,
      piBonds,
      estimatedLonePairs: 0,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "Three-coordinate boron has an empty p orbital.",
      ],
    });
  }

  if (
    element === "N" &&
    (atom.charge ?? 0) > 0 &&
    sigmaBonds === 4
  ) {
    return result({
      hybridisation: "sp3",
      geometry:
        "tetrahedral",
      stericNumber: 4,
      sigmaBonds,
      piBonds,
      estimatedLonePairs: 0,
      confidence: "high",
      reasoning: [
        ...reasoning,
        "Four-coordinate positively charged nitrogen is tetrahedral.",
      ],
    });
  }

  return determineFromStericNumber({
    stericNumber,
    sigmaBonds,
    piBonds,
    estimatedLonePairs,
    reasoning,
  });
}

export function determineAllHybridisations(
  graph: MolecularGraph,
): ReadonlyMap<
  string,
  HybridisationResult
> {
  return new Map(
    graph.molecule.atoms.map(
      (atom) => [
        atom.id,
        determineHybridisation(
          graph,
          atom.id,
        ),
      ],
    ),
  );
}