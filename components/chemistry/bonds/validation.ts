import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalBondType,
  SkeletalMoleculeDefinition,
} from "../skeletal/types";

export type BondValidationIssueCode =
  | "bond-not-found"
  | "atom-not-found"
  | "bond-not-editable"
  | "bond-order-exceeded"
  | "atom-valence-exceeded"
  | "aromatic-not-allowed"
  | "wedge-not-allowed"
  | "dash-not-allowed"
  | "wavy-not-allowed";

export type BondValidationIssue = {
  code: BondValidationIssueCode;
  message: string;
  bondId?: string;
  atomId?: string;
};

export type BondValidationResult = {
  valid: boolean;
  issues: readonly BondValidationIssue[];
};

export type ConnectedBond = {
  bond: SkeletalBond;
  otherAtom: SkeletalAtom;
};

const DEFAULT_MAX_VALENCE: Readonly<
  Record<string, number>
> = {
  H: 1,
  B: 3,
  C: 4,
  N: 3,
  O: 2,
  F: 1,
  P: 5,
  S: 6,
  Cl: 1,
  Br: 1,
  I: 1,
};

export function bondTypeOrderContribution(
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

export function getAtomById(
  molecule: SkeletalMoleculeDefinition,
  atomId: string,
): SkeletalAtom | undefined {
  return molecule.atoms.find(
    (atom) => atom.id === atomId,
  );
}

export function getBondById(
  molecule: SkeletalMoleculeDefinition,
  bondId: string,
): SkeletalBond | undefined {
  return molecule.bonds.find(
    (bond) => bond.id === bondId,
  );
}

export function getConnectedBonds(
  molecule: SkeletalMoleculeDefinition,
  atomId: string,
): ConnectedBond[] {
  return molecule.bonds.flatMap((bond) => {
    if (
      bond.from !== atomId &&
      bond.to !== atomId
    ) {
      return [];
    }

    const otherAtomId =
      bond.from === atomId
        ? bond.to
        : bond.from;

    const otherAtom = getAtomById(
      molecule,
      otherAtomId,
    );

    if (!otherAtom) {
      return [];
    }

    return [
      {
        bond,
        otherAtom,
      },
    ];
  });
}

export function totalBondOrderForAtom(
  molecule: SkeletalMoleculeDefinition,
  atomId: string,
  overrides: Readonly<
    Record<string, SkeletalBondType>
  > = {},
): number {
  return molecule.bonds.reduce(
    (total, bond) => {
      if (
        bond.from !== atomId &&
        bond.to !== atomId
      ) {
        return total;
      }

      const type =
        overrides[bond.id] ??
        bond.type ??
        "single";

      return (
        total +
        bondTypeOrderContribution(type)
      );
    },
    0,
  );
}

export function getMaximumValence(
  atom: SkeletalAtom,
): number | undefined {
  if (atom.maxValence !== undefined) {
    return atom.maxValence;
  }

  const element =
    atom.element ??
    inferElementFromLabel(atom.label);

  if (!element) {
    return undefined;
  }

  return DEFAULT_MAX_VALENCE[element];
}

function inferElementFromLabel(
  label?: string,
): string | undefined {
  if (!label) {
    return undefined;
  }

  const match = label.match(
    /^([A-Z][a-z]?)/,
  );

  return match?.[1];
}

function validateStylePermission(
  bond: SkeletalBond,
  proposedType: SkeletalBondType,
): BondValidationIssue[] {
  const issues: BondValidationIssue[] = [];

  if (
    bond.editable === false &&
    proposedType !==
      (bond.type ?? "single")
  ) {
    issues.push({
      code: "bond-not-editable",
      bondId: bond.id,
      message: `Bond ${bond.id} is not editable.`,
    });
  }

  if (
    proposedType === "aromatic" &&
    bond.canBecomeAromatic === false
  ) {
    issues.push({
      code: "aromatic-not-allowed",
      bondId: bond.id,
      message: `Bond ${bond.id} cannot become aromatic.`,
    });
  }

  if (
    proposedType === "wedge" &&
    bond.canBecomeWedge === false
  ) {
    issues.push({
      code: "wedge-not-allowed",
      bondId: bond.id,
      message: `Bond ${bond.id} cannot become a wedge bond.`,
    });
  }

  if (
    proposedType === "dash" &&
    bond.canBecomeDash === false
  ) {
    issues.push({
      code: "dash-not-allowed",
      bondId: bond.id,
      message: `Bond ${bond.id} cannot become a dashed bond.`,
    });
  }

  if (
    proposedType === "wavy" &&
    bond.canBecomeWavy === false
  ) {
    issues.push({
      code: "wavy-not-allowed",
      bondId: bond.id,
      message: `Bond ${bond.id} cannot become a wavy bond.`,
    });
  }

  return issues;
}

export function validateBondTypeChange({
  molecule,
  bondId,
  proposedType,
}: {
  molecule: SkeletalMoleculeDefinition;
  bondId: string;
  proposedType: SkeletalBondType;
}): BondValidationResult {
  const issues: BondValidationIssue[] = [];

  const bond = getBondById(
    molecule,
    bondId,
  );

  if (!bond) {
    return {
      valid: false,
      issues: [
        {
          code: "bond-not-found",
          bondId,
          message: `Bond ${bondId} was not found.`,
        },
      ],
    };
  }

  const fromAtom = getAtomById(
    molecule,
    bond.from,
  );

  const toAtom = getAtomById(
    molecule,
    bond.to,
  );

  if (!fromAtom) {
    issues.push({
      code: "atom-not-found",
      bondId,
      atomId: bond.from,
      message: `Atom ${bond.from} was not found.`,
    });
  }

  if (!toAtom) {
    issues.push({
      code: "atom-not-found",
      bondId,
      atomId: bond.to,
      message: `Atom ${bond.to} was not found.`,
    });
  }

  if (!fromAtom || !toAtom) {
    return {
      valid: false,
      issues,
    };
  }

  issues.push(
    ...validateStylePermission(
      bond,
      proposedType,
    ),
  );

  const proposedOrder =
    bondTypeOrderContribution(
      proposedType,
    );

  if (
    bond.maxOrder !== undefined &&
    proposedOrder > bond.maxOrder
  ) {
    issues.push({
      code: "bond-order-exceeded",
      bondId,
      message:
        `Bond ${bond.id} cannot exceed order ${bond.maxOrder}.`,
    });
  }

  const overrides = {
    [bond.id]: proposedType,
  };

  for (const atom of [
    fromAtom,
    toAtom,
  ]) {
    const maximumValence =
      getMaximumValence(atom);

    if (maximumValence === undefined) {
      continue;
    }

    const proposedValence =
      totalBondOrderForAtom(
        molecule,
        atom.id,
        overrides,
      );

    if (
      proposedValence >
      maximumValence
    ) {
      issues.push({
        code: "atom-valence-exceeded",
        bondId,
        atomId: atom.id,
        message:
          `Changing bond ${bond.id} to ${proposedType} would give atom ${atom.id} a bond-order total of ${proposedValence}, exceeding its maximum valence of ${maximumValence}.`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}