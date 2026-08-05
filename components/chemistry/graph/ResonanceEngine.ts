import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalBondType,
  SkeletalMoleculeDefinition,
} from "../skeletal/types";
import {
  getMaximumValence,
  totalBondOrderForAtom,
} from "../bonds/validation";
import type {
  MolecularGraph,
} from "./MolecularGraph";
import {
  analyseConjugatedAtom,
  analyseConjugatedBond,
  findPiSystemForAtom,
  findPiSystemForBond,
  type ConjugationConfidence,
} from "./ConjugationEngine";
import {
  isAromaticAtom,
  isAromaticBond,
} from "./AromaticityEngine";

export type ResonanceConfidence =
  ConjugationConfidence;

export type ResonanceElectronSourceType =
  | "pi-bond"
  | "lone-pair"
  | "negative-charge"
  | "radical";

export type ResonanceElectronTargetType =
  | "atom"
  | "bond";

export type ResonanceMove = {
  id: string;
  sourceType: ResonanceElectronSourceType;
  sourceAtomId?: string;
  sourceBondId?: string;
  targetType: ResonanceElectronTargetType;
  targetAtomId?: string;
  targetBondId?: string;
  electronCount: 1 | 2;
};

export type ResonanceMoveIssueCode =
  | "source-not-found"
  | "target-not-found"
  | "source-not-adjacent"
  | "source-has-no-electrons"
  | "target-cannot-accept"
  | "bond-order-too-low"
  | "bond-order-too-high"
  | "valence-exceeded"
  | "aromaticity-disrupted"
  | "unsupported-move";

export type ResonanceMoveIssue = {
  code: ResonanceMoveIssueCode;
  message: string;
  atomId?: string;
  bondId?: string;
};

export type ResonanceMoveValidation = {
  valid: boolean;
  confidence: ResonanceConfidence;
  issues: readonly ResonanceMoveIssue[];
  reasoning: readonly string[];
};

export type ResonanceAtomResult = {
  atomId: string;
  canResonate: boolean;
  chargeDelocalised: boolean;
  radicalDelocalised: boolean;
  aromatic: boolean;
  confidence: ResonanceConfidence;
  reasoning: readonly string[];
};

export type ResonanceBondResult = {
  bondId: string;
  canResonate: boolean;
  aromatic: boolean;
  confidence: ResonanceConfidence;
  reasoning: readonly string[];
};

export type ResonanceContributor = {
  id: string;
  molecule: SkeletalMoleculeDefinition;
  move: ResonanceMove;
  valid: boolean;
  confidence: ResonanceConfidence;
  chargeSeparated: boolean;
  octetViolations: number;
  formalChargeMagnitude: number;
  aromaticBondCount: number;
  score: number;
  reasoning: readonly string[];
};

export type DelocalisedCharge = {
  atomIds: readonly string[];
  totalCharge: number;
  positiveAtomIds: readonly string[];
  negativeAtomIds: readonly string[];
  radicalAtomIds: readonly string[];
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

function bondOrder(
  type: SkeletalBondType = "single",
): number {
  switch (type) {
    case "double":
      return 2;

    case "triple":
      return 3;

    case "aromatic":
      return 1.5;

    case "single":
    case "wedge":
    case "dash":
    case "wavy":
    default:
      return 1;
  }
}

function typeForOrder(
  order: number,
  originalType: SkeletalBondType = "single",
): SkeletalBondType {
  if (originalType === "aromatic") {
    return "aromatic";
  }

  if (order >= 3) {
    return "triple";
  }

  if (order >= 2) {
    return "double";
  }

  return "single";
}

function atomsAreBonded(
  graph: MolecularGraph,
  firstAtomId: string,
  secondAtomId: string,
): boolean {
  return graph
    .getNeighbours(firstAtomId)
    .some(
      ({ atom }) =>
        atom.id === secondAtomId,
    );
}

function atomCanDonateLonePair(
  graph: MolecularGraph,
  atom: SkeletalAtom,
): boolean {
  if (!isHeteroatom(atom)) {
    return false;
  }

  if ((atom.charge ?? 0) > 0) {
    return false;
  }

  const conjugation =
    analyseConjugatedAtom(
      graph,
      atom.id,
    );

  return (
    conjugation.role ===
      "lone-pair-donor" ||
    (atom.charge ?? 0) < 0
  );
}

function atomCanAcceptElectrons(
  graph: MolecularGraph,
  atom: SkeletalAtom,
): boolean {
  const conjugation =
    analyseConjugatedAtom(
      graph,
      atom.id,
    );

  return (
    conjugation.role ===
      "empty-p-orbital" ||
    (atom.charge ?? 0) > 0 ||
    inferElement(atom) === "B"
  );
}

function confidenceRank(
  confidence: ResonanceConfidence,
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

function lowerConfidence(
  first: ResonanceConfidence,
  second: ResonanceConfidence,
): ResonanceConfidence {
  return confidenceRank(first) <=
    confidenceRank(second)
    ? first
    : second;
}

function canonicalMoveId(
  move: Omit<ResonanceMove, "id">,
): string {
  const source =
    move.sourceBondId ??
    move.sourceAtomId ??
    "unknown-source";

  const target =
    move.targetBondId ??
    move.targetAtomId ??
    "unknown-target";

  return [
    "resonance",
    move.sourceType,
    source,
    "to",
    move.targetType,
    target,
  ].join("-");
}

export function canResonateAtom(
  graph: MolecularGraph,
  atomId: string,
): ResonanceAtomResult {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return {
      atomId,
      canResonate: false,
      chargeDelocalised: false,
      radicalDelocalised: false,
      aromatic: false,
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

  const piSystem =
    findPiSystemForAtom(
      graph,
      atomId,
    );

  const chargeDelocalised =
    (atom.charge ?? 0) !== 0 &&
    Boolean(
      piSystem &&
      piSystem.atomIds.length > 1,
    );

  const radicalDelocalised =
    atom.radical === true &&
    Boolean(
      piSystem &&
      piSystem.atomIds.length > 1,
    );

  const aromatic =
    isAromaticAtom(
      graph,
      atomId,
    );

  const canResonate =
    conjugation.conjugated ||
    chargeDelocalised ||
    radicalDelocalised ||
    aromatic;

  const reasoning: string[] = [];

  if (conjugation.conjugated) {
    reasoning.push(
      "The atom participates in a conjugated p-orbital system.",
    );
  }

  if (chargeDelocalised) {
    reasoning.push(
      "The atom carries formal charge within a multi-atom pi system.",
    );
  }

  if (radicalDelocalised) {
    reasoning.push(
      "The atom carries a radical within a multi-atom pi system.",
    );
  }

  if (aromatic) {
    reasoning.push(
      "The atom belongs to an aromatic ring.",
    );
  }

  if (!canResonate) {
    reasoning.push(
      "No adjacent compatible p-orbital system was identified.",
    );
  }

  return {
    atomId,
    canResonate,
    chargeDelocalised,
    radicalDelocalised,
    aromatic,
    confidence:
      conjugation.confidence,
    reasoning,
  };
}

export function canResonateBond(
  graph: MolecularGraph,
  bondId: string,
): ResonanceBondResult {
  const bond = graph.getBond(bondId);

  if (!bond) {
    return {
      bondId,
      canResonate: false,
      aromatic: false,
      confidence: "low",
      reasoning: [
        "Bond was not found.",
      ],
    };
  }

  const conjugation =
    analyseConjugatedBond(
      graph,
      bondId,
    );

  const piSystem =
    findPiSystemForBond(
      graph,
      bondId,
    );

  const aromatic =
    isAromaticBond(
      graph,
      bondId,
    );

  const canResonate =
    conjugation.conjugated ||
    aromatic ||
    Boolean(
      piSystem &&
      piSystem.atomIds.length > 2,
    );

  return {
    bondId,
    canResonate,
    aromatic,
    confidence:
      conjugation.confidence,
    reasoning: canResonate
      ? [
          "The bond belongs to a conjugated or aromatic pi system.",
        ]
      : [
          "The bond does not belong to a supported delocalised electron system.",
        ],
  };
}

function validateSource(
  graph: MolecularGraph,
  move: ResonanceMove,
): ResonanceMoveIssue[] {
  const issues: ResonanceMoveIssue[] = [];

  if (
    move.sourceType === "pi-bond"
  ) {
    const bond = move.sourceBondId
      ? graph.getBond(move.sourceBondId)
      : undefined;

    if (!bond) {
      issues.push({
        code: "source-not-found",
        bondId: move.sourceBondId,
        message:
          "The source pi bond was not found.",
      });

      return issues;
    }

    if (bondOrder(bond.type) < 2) {
      issues.push({
        code: "bond-order-too-low",
        bondId: bond.id,
        message:
          "A pi-bond source must have bond order two or greater.",
      });
    }
  } else {
    const atom = move.sourceAtomId
      ? graph.getAtom(move.sourceAtomId)
      : undefined;

    if (!atom) {
      issues.push({
        code: "source-not-found",
        atomId: move.sourceAtomId,
        message:
          "The source atom was not found.",
      });

      return issues;
    }

    if (
      move.sourceType ===
        "lone-pair" &&
      !atomCanDonateLonePair(
        graph,
        atom,
      )
    ) {
      issues.push({
        code: "source-has-no-electrons",
        atomId: atom.id,
        message:
          "The source atom does not have an available conjugated lone pair.",
      });
    }

    if (
      move.sourceType ===
        "negative-charge" &&
      (atom.charge ?? 0) >= 0
    ) {
      issues.push({
        code: "source-has-no-electrons",
        atomId: atom.id,
        message:
          "The source atom does not carry negative charge.",
      });
    }

    if (
      move.sourceType === "radical" &&
      atom.radical !== true
    ) {
      issues.push({
        code: "source-has-no-electrons",
        atomId: atom.id,
        message:
          "The source atom does not carry a radical.",
      });
    }
  }

  return issues;
}

function validateTarget(
  graph: MolecularGraph,
  move: ResonanceMove,
): ResonanceMoveIssue[] {
  const issues: ResonanceMoveIssue[] = [];

  if (
    move.targetType === "atom"
  ) {
    const atom = move.targetAtomId
      ? graph.getAtom(move.targetAtomId)
      : undefined;

    if (!atom) {
      issues.push({
        code: "target-not-found",
        atomId: move.targetAtomId,
        message:
          "The target atom was not found.",
      });

      return issues;
    }

    if (
      !atomCanAcceptElectrons(
        graph,
        atom,
      ) &&
      (atom.charge ?? 0) >= 0
    ) {
      const maximumValence =
        getMaximumValence(atom);

      const currentValence =
        totalBondOrderForAtom(
          graph.molecule,
          atom.id,
        );

      if (
        maximumValence !== undefined &&
        currentValence >= maximumValence
      ) {
        issues.push({
          code: "target-cannot-accept",
          atomId: atom.id,
          message:
            "The target atom has no supported empty orbital or remaining valence capacity.",
        });
      }
    }
  } else {
    const bond = move.targetBondId
      ? graph.getBond(move.targetBondId)
      : undefined;

    if (!bond) {
      issues.push({
        code: "target-not-found",
        bondId: move.targetBondId,
        message:
          "The target bond was not found.",
      });

      return issues;
    }

    const proposedOrder =
      bondOrder(bond.type) +
      move.electronCount / 2;

    if (proposedOrder > 3) {
      issues.push({
        code: "bond-order-too-high",
        bondId: bond.id,
        message:
          "The proposed resonance move would exceed triple-bond order.",
      });
    }
  }

  return issues;
}

function sourceAndTargetAreAdjacent(
  graph: MolecularGraph,
  move: ResonanceMove,
): boolean {
  if (
    move.sourceAtomId &&
    move.targetAtomId
  ) {
    return atomsAreBonded(
      graph,
      move.sourceAtomId,
      move.targetAtomId,
    );
  }

  if (
    move.sourceAtomId &&
    move.targetBondId
  ) {
    const targetBond =
      graph.getBond(
        move.targetBondId,
      );

    return Boolean(
      targetBond &&
      (
        targetBond.from ===
          move.sourceAtomId ||
        targetBond.to ===
          move.sourceAtomId
      ),
    );
  }

  if (
    move.sourceBondId &&
    move.targetAtomId
  ) {
    const sourceBond =
      graph.getBond(
        move.sourceBondId,
      );

    return Boolean(
      sourceBond &&
      (
        sourceBond.from ===
          move.targetAtomId ||
        sourceBond.to ===
          move.targetAtomId
      ),
    );
  }

  if (
    move.sourceBondId &&
    move.targetBondId
  ) {
    const sourceBond =
      graph.getBond(
        move.sourceBondId,
      );

    const targetBond =
      graph.getBond(
        move.targetBondId,
      );

    if (!sourceBond || !targetBond) {
      return false;
    }

    return (
      sourceBond.from ===
        targetBond.from ||
      sourceBond.from ===
        targetBond.to ||
      sourceBond.to ===
        targetBond.from ||
      sourceBond.to ===
        targetBond.to
    );
  }

  return false;
}

export function validateResonanceMove(
  graph: MolecularGraph,
  move: ResonanceMove,
): ResonanceMoveValidation {
  const issues: ResonanceMoveIssue[] = [
    ...validateSource(graph, move),
    ...validateTarget(graph, move),
  ];

  if (
    issues.length === 0 &&
    !sourceAndTargetAreAdjacent(
      graph,
      move,
    )
  ) {
    issues.push({
      code: "source-not-adjacent",
      atomId:
        move.sourceAtomId ??
        move.targetAtomId,
      bondId:
        move.sourceBondId ??
        move.targetBondId,
      message:
        "A resonance electron shift must occur between adjacent parts of the conjugated system.",
    });
  }

  const sourceConfidence =
    move.sourceAtomId
      ? analyseConjugatedAtom(
          graph,
          move.sourceAtomId,
        ).confidence
      : move.sourceBondId
        ? analyseConjugatedBond(
            graph,
            move.sourceBondId,
          ).confidence
        : "low";

  const targetConfidence =
    move.targetAtomId
      ? analyseConjugatedAtom(
          graph,
          move.targetAtomId,
        ).confidence
      : move.targetBondId
        ? analyseConjugatedBond(
            graph,
            move.targetBondId,
          ).confidence
        : "low";

  return {
    valid: issues.length === 0,
    confidence:
      lowerConfidence(
        sourceConfidence,
        targetConfidence,
      ),
    issues,
    reasoning:
      issues.length === 0
        ? [
            "The source and target are adjacent within a compatible conjugated system.",
            "The proposed move preserves a supported valence arrangement.",
          ]
        : [
            "The proposed move failed one or more resonance validation rules.",
          ],
  };
}

function cloneMolecule(
  molecule: SkeletalMoleculeDefinition,
): {
  atoms: SkeletalAtom[];
  bonds: SkeletalBond[];
} {
  return {
    atoms: molecule.atoms.map(
      (atom) => ({ ...atom }),
    ),
    bonds: molecule.bonds.map(
      (bond) => ({ ...bond }),
    ),
  };
}

function applyAtomToBondMove({
  graph,
  move,
}: {
  graph: MolecularGraph;
  move: ResonanceMove;
}): SkeletalMoleculeDefinition | null {
  if (
    !move.sourceAtomId ||
    !move.targetBondId
  ) {
    return null;
  }

  const sourceAtom =
    graph.getAtom(
      move.sourceAtomId,
    );

  const targetBond =
    graph.getBond(
      move.targetBondId,
    );

  if (!sourceAtom || !targetBond) {
    return null;
  }

  if (
    targetBond.from !==
      sourceAtom.id &&
    targetBond.to !==
      sourceAtom.id
  ) {
    return null;
  }

  const cloned =
    cloneMolecule(
      graph.molecule,
    );

  const atomIndex =
    cloned.atoms.findIndex(
      (atom) =>
        atom.id === sourceAtom.id,
    );

  const bondIndex =
    cloned.bonds.findIndex(
      (bond) =>
        bond.id === targetBond.id,
    );

  if (
    atomIndex < 0 ||
    bondIndex < 0
  ) {
    return null;
  }

  const currentAtom =
    cloned.atoms[atomIndex];

  const currentBond =
    cloned.bonds[bondIndex];

  if (!currentAtom || !currentBond) {
    return null;
  }

  cloned.atoms[atomIndex] = {
    ...currentAtom,
    charge:
      (currentAtom.charge ?? 0) + 1,
  };

  cloned.bonds[bondIndex] = {
    ...currentBond,
    type: typeForOrder(
      bondOrder(
        currentBond.type,
      ) + 1,
      currentBond.type,
    ),
  };

  return {
    ...graph.molecule,
    atoms: cloned.atoms,
    bonds: cloned.bonds,
  };
}

function applyBondToAtomMove({
  graph,
  move,
}: {
  graph: MolecularGraph;
  move: ResonanceMove;
}): SkeletalMoleculeDefinition | null {
  if (
    !move.sourceBondId ||
    !move.targetAtomId
  ) {
    return null;
  }

  const sourceBond =
    graph.getBond(
      move.sourceBondId,
    );

  const targetAtom =
    graph.getAtom(
      move.targetAtomId,
    );

  if (!sourceBond || !targetAtom) {
    return null;
  }

  if (
    sourceBond.from !==
      targetAtom.id &&
    sourceBond.to !==
      targetAtom.id
  ) {
    return null;
  }

  const cloned =
    cloneMolecule(
      graph.molecule,
    );

  const atomIndex =
    cloned.atoms.findIndex(
      (atom) =>
        atom.id === targetAtom.id,
    );

  const bondIndex =
    cloned.bonds.findIndex(
      (bond) =>
        bond.id === sourceBond.id,
    );

  if (
    atomIndex < 0 ||
    bondIndex < 0
  ) {
    return null;
  }

  const currentAtom =
    cloned.atoms[atomIndex];

  const currentBond =
    cloned.bonds[bondIndex];

  if (!currentAtom || !currentBond) {
    return null;
  }

  cloned.atoms[atomIndex] = {
    ...currentAtom,
    charge:
      (currentAtom.charge ?? 0) - 1,
  };

  cloned.bonds[bondIndex] = {
    ...currentBond,
    type: typeForOrder(
      Math.max(
        1,
        bondOrder(
          currentBond.type,
        ) - 1,
      ),
      currentBond.type,
    ),
  };

  return {
    ...graph.molecule,
    atoms: cloned.atoms,
    bonds: cloned.bonds,
  };
}

function applyBondToBondMove({
  graph,
  move,
}: {
  graph: MolecularGraph;
  move: ResonanceMove;
}): SkeletalMoleculeDefinition | null {
  if (
    !move.sourceBondId ||
    !move.targetBondId
  ) {
    return null;
  }

  const sourceBond =
    graph.getBond(
      move.sourceBondId,
    );

  const targetBond =
    graph.getBond(
      move.targetBondId,
    );

  if (!sourceBond || !targetBond) {
    return null;
  }

  const cloned =
    cloneMolecule(
      graph.molecule,
    );

  const sourceIndex =
    cloned.bonds.findIndex(
      (bond) =>
        bond.id === sourceBond.id,
    );

  const targetIndex =
    cloned.bonds.findIndex(
      (bond) =>
        bond.id === targetBond.id,
    );

  if (
    sourceIndex < 0 ||
    targetIndex < 0
  ) {
    return null;
  }

  const currentSource =
    cloned.bonds[sourceIndex];

  const currentTarget =
    cloned.bonds[targetIndex];

  if (!currentSource || !currentTarget) {
    return null;
  }

  cloned.bonds[sourceIndex] = {
    ...currentSource,
    type: typeForOrder(
      Math.max(
        1,
        bondOrder(
          currentSource.type,
        ) - 1,
      ),
      currentSource.type,
    ),
  };

  cloned.bonds[targetIndex] = {
    ...currentTarget,
    type: typeForOrder(
      bondOrder(
        currentTarget.type,
      ) + 1,
      currentTarget.type,
    ),
  };

  return {
    ...graph.molecule,
    atoms: cloned.atoms,
    bonds: cloned.bonds,
  };
}

export function applyResonanceMove(
  graph: MolecularGraph,
  move: ResonanceMove,
): SkeletalMoleculeDefinition | null {
  const validation =
    validateResonanceMove(
      graph,
      move,
    );

  if (!validation.valid) {
    return null;
  }

  if (
    move.sourceAtomId &&
    move.targetBondId
  ) {
    return applyAtomToBondMove({
      graph,
      move,
    });
  }

  if (
    move.sourceBondId &&
    move.targetAtomId
  ) {
    return applyBondToAtomMove({
      graph,
      move,
    });
  }

  if (
    move.sourceBondId &&
    move.targetBondId
  ) {
    return applyBondToBondMove({
      graph,
      move,
    });
  }

  return null;
}

export function findResonanceMoves(
  graph: MolecularGraph,
): readonly ResonanceMove[] {
  const moves = new Map<
    string,
    ResonanceMove
  >();

  for (const atom of graph.molecule.atoms) {
    const atomAnalysis =
      canResonateAtom(
        graph,
        atom.id,
      );

    if (!atomAnalysis.canResonate) {
      continue;
    }

    for (
      const neighbour of
      graph.getNeighbours(atom.id)
    ) {
      if (
        atomCanDonateLonePair(
          graph,
          atom,
        )
      ) {
        const moveData = {
          sourceType:
            (atom.charge ?? 0) < 0
              ? "negative-charge"
              : "lone-pair",
          sourceAtomId: atom.id,
          targetType: "bond",
          targetBondId:
            neighbour.bond.id,
          electronCount: 2,
        } satisfies Omit<
          ResonanceMove,
          "id"
        >;

        const move: ResonanceMove = {
          ...moveData,
          id: canonicalMoveId(
            moveData,
          ),
        };

        if (
          validateResonanceMove(
            graph,
            move,
          ).valid
        ) {
          moves.set(move.id, move);
        }
      }

      if (
        atom.radical === true
      ) {
        const moveData = {
          sourceType: "radical",
          sourceAtomId: atom.id,
          targetType: "bond",
          targetBondId:
            neighbour.bond.id,
          electronCount: 1,
        } satisfies Omit<
          ResonanceMove,
          "id"
        >;

        const move: ResonanceMove = {
          ...moveData,
          id: canonicalMoveId(
            moveData,
          ),
        };

        if (
          validateResonanceMove(
            graph,
            move,
          ).valid
        ) {
          moves.set(move.id, move);
        }
      }
    }
  }

  for (const bond of graph.molecule.bonds) {
    if (
      bondOrder(bond.type) < 2
    ) {
      continue;
    }

    for (
      const atomId of [
        bond.from,
        bond.to,
      ]
    ) {
      const moveData = {
        sourceType: "pi-bond",
        sourceBondId: bond.id,
        targetType: "atom",
        targetAtomId: atomId,
        electronCount: 2,
      } satisfies Omit<
        ResonanceMove,
        "id"
      >;

      const move: ResonanceMove = {
        ...moveData,
        id: canonicalMoveId(
          moveData,
        ),
      };

      if (
        validateResonanceMove(
          graph,
          move,
        ).valid
      ) {
        moves.set(move.id, move);
      }
    }

    for (
      const neighbourAtomId of [
        bond.from,
        bond.to,
      ]
    ) {
      for (
        const neighbour of
        graph.getNeighbours(
          neighbourAtomId,
        )
      ) {
        if (
          neighbour.bond.id ===
          bond.id
        ) {
          continue;
        }

        const moveData = {
          sourceType: "pi-bond",
          sourceBondId: bond.id,
          targetType: "bond",
          targetBondId:
            neighbour.bond.id,
          electronCount: 2,
        } satisfies Omit<
          ResonanceMove,
          "id"
        >;

        const move: ResonanceMove = {
          ...moveData,
          id: canonicalMoveId(
            moveData,
          ),
        };

        if (
          validateResonanceMove(
            graph,
            move,
          ).valid
        ) {
          moves.set(move.id, move);
        }
      }
    }
  }

  return [...moves.values()].sort(
    (left, right) =>
      left.id.localeCompare(
        right.id,
      ),
  );
}

function countFormalChargeMagnitude(
  molecule: SkeletalMoleculeDefinition,
): number {
  return molecule.atoms.reduce(
    (total, atom) =>
      total +
      Math.abs(atom.charge ?? 0),
    0,
  );
}

function countChargeSeparatedAtoms(
  molecule: SkeletalMoleculeDefinition,
): number {
  return molecule.atoms.filter(
    (atom) =>
      (atom.charge ?? 0) !== 0,
  ).length;
}

function countOctetViolations(
  molecule: SkeletalMoleculeDefinition,
): number {
  return molecule.atoms.reduce(
    (total, atom) => {
      const maximumValence =
        getMaximumValence(atom);

      if (
        maximumValence === undefined
      ) {
        return total;
      }

      const currentValence =
        totalBondOrderForAtom(
          molecule,
          atom.id,
        );

      return total +
        (
          currentValence >
          maximumValence
            ? 1
            : 0
        );
    },
    0,
  );
}

function countAromaticBonds(
  graph: MolecularGraph,
): number {
  return graph.molecule.bonds.filter(
    (bond) =>
      isAromaticBond(
        graph,
        bond.id,
      ),
  ).length;
}

function scoreContributor({
  octetViolations,
  formalChargeMagnitude,
  chargeSeparatedAtoms,
  aromaticBondCount,
}: {
  octetViolations: number;
  formalChargeMagnitude: number;
  chargeSeparatedAtoms: number;
  aromaticBondCount: number;
}): number {
  return (
    aromaticBondCount * 20 -
    octetViolations * 100 -
    formalChargeMagnitude * 10 -
    chargeSeparatedAtoms * 5
  );
}

export function findResonanceContributors(
  graph: MolecularGraph,
): readonly ResonanceContributor[] {
  return findResonanceMoves(graph)
    .flatMap((move) => {
      const molecule =
        applyResonanceMove(
          graph,
          move,
        );

      if (!molecule) {
        return [];
      }

      const validation =
        validateResonanceMove(
          graph,
          move,
        );

      const octetViolations =
        countOctetViolations(
          molecule,
        );

      const formalChargeMagnitude =
        countFormalChargeMagnitude(
          molecule,
        );

      const chargeSeparatedAtoms =
        countChargeSeparatedAtoms(
          molecule,
        );

      const aromaticBondCount =
        countAromaticBonds(graph);

      const score =
        scoreContributor({
          octetViolations,
          formalChargeMagnitude,
          chargeSeparatedAtoms,
          aromaticBondCount,
        });

      return [
        {
          id: `contributor-${move.id}`,
          molecule,
          move,
          valid:
            validation.valid &&
            octetViolations === 0,
          confidence:
            validation.confidence,
          chargeSeparated:
            chargeSeparatedAtoms > 1,
          octetViolations,
          formalChargeMagnitude,
          aromaticBondCount,
          score,
          reasoning: [
            ...validation.reasoning,
            `Octet violations: ${octetViolations}.`,
            `Formal-charge magnitude: ${formalChargeMagnitude}.`,
            `Aromatic bond count retained: ${aromaticBondCount}.`,
          ],
        },
      ];
    })
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.id.localeCompare(
          right.id,
        ),
    );
}

export function findMajorResonanceContributor(
  graph: MolecularGraph,
): ResonanceContributor | null {
  return (
    findResonanceContributors(
      graph,
    ).find(
      (contributor) =>
        contributor.valid,
    ) ?? null
  );
}

export function findDelocalisedCharge(
  graph: MolecularGraph,
): DelocalisedCharge {
  const atomIds = new Set<string>();
  const positiveAtomIds: string[] = [];
  const negativeAtomIds: string[] = [];
  const radicalAtomIds: string[] = [];

  let totalCharge = 0;

  for (const atom of graph.molecule.atoms) {
    const analysis =
      canResonateAtom(
        graph,
        atom.id,
      );

    if (!analysis.canResonate) {
      continue;
    }

    const charge =
      atom.charge ?? 0;

    if (
      charge !== 0 ||
      atom.radical === true
    ) {
      atomIds.add(atom.id);
    }

    totalCharge += charge;

    if (charge > 0) {
      positiveAtomIds.push(atom.id);
    }

    if (charge < 0) {
      negativeAtomIds.push(atom.id);
    }

    if (atom.radical === true) {
      radicalAtomIds.push(atom.id);
    }
  }

  return {
    atomIds: [...atomIds].sort(),
    totalCharge,
    positiveAtomIds:
      positiveAtomIds.sort(),
    negativeAtomIds:
      negativeAtomIds.sort(),
    radicalAtomIds:
      radicalAtomIds.sort(),
  };
}

export function isResonanceStabilised(
  graph: MolecularGraph,
  atomId?: string,
): boolean {
  if (atomId) {
    return (
      canResonateAtom(
        graph,
        atomId,
      ).canResonate &&
      Boolean(
        findPiSystemForAtom(
          graph,
          atomId,
        ),
      )
    );
  }

  return (
    findResonanceMoves(graph).length >
    0
  );
}