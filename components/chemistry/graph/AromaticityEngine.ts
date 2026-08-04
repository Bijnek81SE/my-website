import type {
  SkeletalAtom,
  SkeletalBond,
} from "../skeletal/types";
import type {
  MolecularGraph,
} from "./MolecularGraph";
import {
  analyseConjugatedAtom,
  type ConjugationConfidence,
} from "./ConjugationEngine";
import {
  determineHybridisation,
} from "./HybridisationEngine";
import {
  findRingsForAtom,
  findRingsForBond,
  findSimpleRings,
  type MolecularRing,
} from "./RingEngine";

export type AromaticityClassification =
  | "aromatic"
  | "antiaromatic"
  | "nonaromatic"
  | "indeterminate";

export type AromaticityRule =
  | "4n+2"
  | "4n"
  | "none"
  | "indeterminate";

export type AromaticityConfidence =
  ConjugationConfidence;

export type AromaticAtomContributionType =
  | "pi-bond"
  | "aromatic-bond"
  | "lone-pair"
  | "negative-charge"
  | "radical"
  | "empty-p-orbital"
  | "none";

export type AromaticAtomContribution = {
  atomId: string;
  electrons: number;
  type: AromaticAtomContributionType;
  pOrbitalAvailable: boolean;
  confidence: AromaticityConfidence;
  reasoning: readonly string[];
};

export type AromaticityResult = {
  ringId: string;
  classification: AromaticityClassification;
  aromatic: boolean;
  antiaromatic: boolean;
  cyclic: boolean;
  continuouslyConjugated: boolean;
  piElectrons: number;
  huckelN: number | null;
  rule: AromaticityRule;
  confidence: AromaticityConfidence;
  atomContributions:
    readonly AromaticAtomContribution[];
  reasoning: readonly string[];
};

export type AromaticMembership = {
  aromaticRingIds: readonly string[];
  aromaticAtomIds: readonly string[];
  aromaticBondIds: readonly string[];
  antiaromaticRingIds: readonly string[];
};

function inferElement(
  atom: SkeletalAtom,
): string | undefined {
  if (atom.element) {
    return atom.element;
  }

  return atom.label?.match(
    /^([A-Z][a-z]?)/,
  )?.[1];
}

function isHeteroatom(
  atom: SkeletalAtom,
): boolean {
  const element = inferElement(atom);

  return (
    element === "N" ||
    element === "O" ||
    element === "S" ||
    element === "P"
  );
}

function isPiBond(
  bond: SkeletalBond,
): boolean {
  return (
    bond.type === "double" ||
    bond.type === "triple" ||
    bond.type === "aromatic"
  );
}

function ringBondSet(
  ring: MolecularRing,
): ReadonlySet<string> {
  return new Set(ring.bondIds);
}

function ringAtomSet(
  ring: MolecularRing,
): ReadonlySet<string> {
  return new Set(ring.atomIds);
}

function getRingBondsForAtom(
  graph: MolecularGraph,
  ring: MolecularRing,
  atomId: string,
): readonly SkeletalBond[] {
  const bondIds = ringBondSet(ring);

  return graph
    .getConnectedBonds(atomId)
    .filter((bond) =>
      bondIds.has(bond.id),
    );
}

function atomHasRingPiBond(
  graph: MolecularGraph,
  ring: MolecularRing,
  atomId: string,
): boolean {
  return getRingBondsForAtom(
    graph,
    ring,
    atomId,
  ).some(isPiBond);
}

function atomHasRingAromaticBond(
  graph: MolecularGraph,
  ring: MolecularRing,
  atomId: string,
): boolean {
  return getRingBondsForAtom(
    graph,
    ring,
    atomId,
  ).some(
    (bond) =>
      bond.type === "aromatic",
  );
}

function hasPositiveCharge(
  atom: SkeletalAtom,
): boolean {
  return (atom.charge ?? 0) > 0;
}

function hasNegativeCharge(
  atom: SkeletalAtom,
): boolean {
  return (atom.charge ?? 0) < 0;
}

function confidenceRank(
  confidence: AromaticityConfidence,
): number {
  switch (confidence) {
    case "high":
      return 3;

    case "medium":
      return 2;

    case "low":
    default:
      return 1;
  }
}

function minimumConfidence(
  values: readonly AromaticityConfidence[],
): AromaticityConfidence {
  if (values.length === 0) {
    return "low";
  }

  return values.reduce(
    (lowest, current) =>
      confidenceRank(current) <
      confidenceRank(lowest)
        ? current
        : lowest,
    "high",
  );
}

function isFourNPlusTwo(
  electronCount: number,
): boolean {
  if (electronCount < 2) {
    return false;
  }

  return (
    (electronCount - 2) % 4 === 0
  );
}

function isFourN(
  electronCount: number,
): boolean {
  if (electronCount < 4) {
    return false;
  }

  return electronCount % 4 === 0;
}

function calculateHuckelN(
  electronCount: number,
  rule: AromaticityRule,
): number | null {
  if (rule === "4n+2") {
    const value =
      (electronCount - 2) / 4;

    return Number.isInteger(value)
      ? value
      : null;
  }

  if (rule === "4n") {
    const value = electronCount / 4;

    return Number.isInteger(value)
      ? value
      : null;
  }

  return null;
}

function heteroatomCanDonateLonePair({
  graph,
  ring,
  atom,
}: {
  graph: MolecularGraph;
  ring: MolecularRing;
  atom: SkeletalAtom;
}): boolean {
  if (!isHeteroatom(atom)) {
    return false;
  }

  if (hasPositiveCharge(atom)) {
    return false;
  }

  if (
    atomHasRingPiBond(
      graph,
      ring,
      atom.id,
    )
  ) {
    return false;
  }

  const hybridisation =
    determineHybridisation(
      graph,
      atom.id,
    );

  return (
    hybridisation.hybridisation === "sp2" ||
    hybridisation.hybridisation === "sp"
  );
}

export function analyseAromaticAtomContribution(
  graph: MolecularGraph,
  ring: MolecularRing,
  atomId: string,
): AromaticAtomContribution {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return {
      atomId,
      electrons: 0,
      type: "none",
      pOrbitalAvailable: false,
      confidence: "low",
      reasoning: [
        "Atom was not found.",
      ],
    };
  }

  const conjugation =
    analyseConjugatedAtom(
      graph,
      atomId,
    );

  if (
    atomHasRingAromaticBond(
      graph,
      ring,
      atomId,
    )
  ) {
    return {
      atomId,
      electrons: 1,
      type: "aromatic-bond",
      pOrbitalAvailable: true,
      confidence: "high",
      reasoning: [
        "The atom participates in a ring bond already marked aromatic.",
        "One electron is assigned from this atom to the delocalised ring system.",
      ],
    };
  }

  if (
    atomHasRingPiBond(
      graph,
      ring,
      atomId,
    )
  ) {
    return {
      atomId,
      electrons: 1,
      type: "pi-bond",
      pOrbitalAvailable: true,
      confidence:
        conjugation.confidence,
      reasoning: [
        "The atom participates in a ring multiple bond.",
        "One electron from the atom contributes to the cyclic pi system.",
      ],
    };
  }

  if (
    hasNegativeCharge(atom) &&
    conjugation.pOrbitalAvailable
  ) {
    return {
      atomId,
      electrons: 2,
      type: "negative-charge",
      pOrbitalAvailable: true,
      confidence: "medium",
      reasoning: [
        "The atom carries a negative charge.",
        "A filled p orbital is treated as contributing two electrons.",
      ],
    };
  }

  if (
    heteroatomCanDonateLonePair({
      graph,
      ring,
      atom,
    })
  ) {
    return {
      atomId,
      electrons: 2,
      type: "lone-pair",
      pOrbitalAvailable: true,
      confidence: "medium",
      reasoning: [
        "The heteroatom is not part of a ring pi bond.",
        "One lone pair is treated as occupying a p orbital and contributing two electrons.",
      ],
    };
  }

  if (
    hasPositiveCharge(atom) &&
    conjugation.pOrbitalAvailable
  ) {
    return {
      atomId,
      electrons: 0,
      type: "empty-p-orbital",
      pOrbitalAvailable: true,
      confidence: "high",
      reasoning: [
        "The positively charged atom provides an empty p orbital.",
        "It contributes no electrons but can preserve cyclic conjugation.",
      ],
    };
  }

  if (
    atom.radical === true &&
    conjugation.pOrbitalAvailable
  ) {
    return {
      atomId,
      electrons: 1,
      type: "radical",
      pOrbitalAvailable: true,
      confidence: "low",
      reasoning: [
        "The atom carries an unpaired electron in a p orbital.",
        "One electron is provisionally counted.",
      ],
    };
  }

  return {
    atomId,
    electrons: 0,
    type: "none",
    pOrbitalAvailable:
      conjugation.pOrbitalAvailable,
    confidence:
      conjugation.confidence,
    reasoning: [
      "No reliable cyclic pi-electron contribution was identified.",
    ],
  };
}

function ringIsContinuouslyConjugated(
  contributions:
    readonly AromaticAtomContribution[],
): boolean {
  return contributions.every(
    (contribution) =>
      contribution.pOrbitalAvailable,
  );
}

function aromaticityReasoning({
  ring,
  continuous,
  electronCount,
  rule,
}: {
  ring: MolecularRing;
  continuous: boolean;
  electronCount: number;
  rule: AromaticityRule;
}): string[] {
  const reasoning: string[] = [
    `The candidate ring contains ${ring.size} atoms.`,
  ];

  if (continuous) {
    reasoning.push(
      "Every ring atom has an available p orbital, giving a continuous cyclic conjugated system.",
    );
  } else {
    reasoning.push(
      "At least one ring atom lacks a reliable p orbital, interrupting cyclic conjugation.",
    );
  }

  reasoning.push(
    `The ring is assigned ${electronCount} pi electrons.`,
  );

  if (rule === "4n+2") {
    reasoning.push(
      "The electron count satisfies the 4n + 2 rule.",
    );
  } else if (rule === "4n") {
    reasoning.push(
      "The electron count satisfies the 4n rule.",
    );
  } else {
    reasoning.push(
      "The electron count does not satisfy a supported Huckel classification.",
    );
  }

  return reasoning;
}

export function analyseRingAromaticity(
  graph: MolecularGraph,
  ring: MolecularRing,
): AromaticityResult {
  const contributions =
    ring.atomIds.map((atomId) =>
      analyseAromaticAtomContribution(
        graph,
        ring,
        atomId,
      ),
    );

  const continuouslyConjugated =
    ringIsContinuouslyConjugated(
      contributions,
    );

  const piElectrons =
    contributions.reduce(
      (total, contribution) =>
        total +
        contribution.electrons,
      0,
    );

  let classification:
    AromaticityClassification =
    "nonaromatic";

  let rule: AromaticityRule = "none";

  if (continuouslyConjugated) {
    if (
      isFourNPlusTwo(
        piElectrons,
      )
    ) {
      classification = "aromatic";
      rule = "4n+2";
    } else if (
      isFourN(
        piElectrons,
      )
    ) {
      classification =
        "antiaromatic";

      rule = "4n";
    } else {
      classification =
        "indeterminate";

      rule = "indeterminate";
    }
  }

  const confidence =
    minimumConfidence(
      contributions.map(
        (contribution) =>
          contribution.confidence,
      ),
    );

  return {
    ringId: ring.id,
    classification,
    aromatic:
      classification === "aromatic",
    antiaromatic:
      classification ===
      "antiaromatic",
    cyclic: true,
    continuouslyConjugated,
    piElectrons,
    huckelN:
      calculateHuckelN(
        piElectrons,
        rule,
      ),
    rule,
    confidence:
      continuouslyConjugated
        ? confidence
        : "low",
    atomContributions:
      contributions,
    reasoning:
      aromaticityReasoning({
        ring,
        continuous:
          continuouslyConjugated,
        electronCount:
          piElectrons,
        rule,
      }),
  };
}

export function analyseAllRingAromaticities(
  graph: MolecularGraph,
): readonly AromaticityResult[] {
  return findSimpleRings(graph).map(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ),
  );
}

export function getAromaticityForRing(
  graph: MolecularGraph,
  ringId: string,
): AromaticityResult | null {
  const ring =
    findSimpleRings(graph).find(
      (candidate) =>
        candidate.id === ringId,
    );

  if (!ring) {
    return null;
  }

  return analyseRingAromaticity(
    graph,
    ring,
  );
}

export function isAromaticRing(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.aromatic ?? false
  );
}

export function isAntiaromaticRing(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.antiaromatic ?? false
  );
}

export function findAromaticRings(
  graph: MolecularGraph,
): readonly MolecularRing[] {
  return findSimpleRings(graph).filter(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).aromatic,
  );
}

export function findAntiaromaticRings(
  graph: MolecularGraph,
): readonly MolecularRing[] {
  return findSimpleRings(graph).filter(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).antiaromatic,
  );
}

export function isAromaticAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return findRingsForAtom(
    graph,
    atomId,
  ).some(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).aromatic,
  );
}

export function isAromaticBond(
  graph: MolecularGraph,
  bondId: string,
): boolean {
  return findRingsForBond(
    graph,
    bondId,
  ).some(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).aromatic,
  );
}

export function isAntiaromaticAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return findRingsForAtom(
    graph,
    atomId,
  ).some(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).antiaromatic,
  );
}

export function isAntiaromaticBond(
  graph: MolecularGraph,
  bondId: string,
): boolean {
  return findRingsForBond(
    graph,
    bondId,
  ).some(
    (ring) =>
      analyseRingAromaticity(
        graph,
        ring,
      ).antiaromatic,
  );
}

export function buildAromaticMembership(
  graph: MolecularGraph,
): AromaticMembership {
  const aromaticRings =
    findAromaticRings(graph);

  const antiaromaticRings =
    findAntiaromaticRings(graph);

  return {
    aromaticRingIds:
      aromaticRings
        .map((ring) => ring.id)
        .sort(),
    aromaticAtomIds: [
      ...new Set(
        aromaticRings.flatMap(
          (ring) =>
            [...ring.atomIds],
        ),
      ),
    ].sort(),
    aromaticBondIds: [
      ...new Set(
        aromaticRings.flatMap(
          (ring) =>
            [...ring.bondIds],
        ),
      ),
    ].sort(),
    antiaromaticRingIds:
      antiaromaticRings
        .map((ring) => ring.id)
        .sort(),
  };
}

export function getAromaticElectronCount(
  graph: MolecularGraph,
  ringId: string,
): number | null {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.piElectrons ?? null
  );
}

export function satisfiesHuckelRule(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.rule === "4n+2"
  );
}

export function satisfiesFourNRule(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.rule === "4n"
  );
}

export function ringHasContinuousPOrbitals(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  return (
    getAromaticityForRing(
      graph,
      ringId,
    )?.continuouslyConjugated ??
    false
  );
}

export function ringContainsOnlyKnownAtoms(
  graph: MolecularGraph,
  ringId: string,
): boolean {
  const ring =
    findSimpleRings(graph).find(
      (candidate) =>
        candidate.id === ringId,
    );

  if (!ring) {
    return false;
  }

  const ringAtoms =
    ringAtomSet(ring);

  return [...ringAtoms].every(
    (atomId) =>
      graph.getAtom(atomId) !==
      undefined,
  );
}