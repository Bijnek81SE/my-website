import {
  bondTypeOrderContribution,
  getMaximumValence,
} from "../bonds/validation";
import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalMoleculeDefinition,
} from "../skeletal/types";

export type MolecularGraphIssueCode =
  | "duplicate-atom-id"
  | "duplicate-bond-id"
  | "missing-from-atom"
  | "missing-to-atom"
  | "self-bond"
  | "duplicate-connection"
  | "atom-valence-exceeded";

export type MolecularGraphIssue = {
  code: MolecularGraphIssueCode;
  message: string;
  atomId?: string;
  bondId?: string;
};

export type MolecularGraphValidationResult = {
  valid: boolean;
  issues: readonly MolecularGraphIssue[];
};

export type MolecularGraphNeighbour = {
  atom: SkeletalAtom;
  bond: SkeletalBond;
};

export type MolecularGraphComponent = {
  atomIds: readonly string[];
  bondIds: readonly string[];
};

export type MolecularGraphPath = {
  atomIds: readonly string[];
  bondIds: readonly string[];
};

export type MolecularGraphRingCandidate = {
  atomIds: readonly string[];
  bondIds: readonly string[];
};

export type MolecularGraph = {
  molecule: SkeletalMoleculeDefinition;

  atomsById: ReadonlyMap<string, SkeletalAtom>;
  bondsById: ReadonlyMap<string, SkeletalBond>;

  getAtom(
    atomId: string,
  ): SkeletalAtom | undefined;

  getBond(
    bondId: string,
  ): SkeletalBond | undefined;

  getConnectedBonds(
    atomId: string,
  ): readonly SkeletalBond[];

  getNeighbours(
    atomId: string,
  ): readonly MolecularGraphNeighbour[];

  getNeighbourAtoms(
    atomId: string,
  ): readonly SkeletalAtom[];

  getAtomDegree(
    atomId: string,
  ): number;

  getAtomBondOrderTotal(
    atomId: string,
  ): number;

  isTerminalAtom(
    atomId: string,
  ): boolean;

  getConnectedComponents():
    readonly MolecularGraphComponent[];

  findShortestPath(
    startAtomId: string,
    endAtomId: string,
    excludedBondId?: string,
  ): MolecularGraphPath | null;

  findRingForBond(
    bondId: string,
  ): MolecularGraphRingCandidate | null;

  isBondInRing(
    bondId: string,
  ): boolean;

  validate():
    MolecularGraphValidationResult;
};

function connectionKey(
  from: string,
  to: string,
): string {
  return [from, to]
    .sort((left, right) =>
      left.localeCompare(right),
    )
    .join("::");
}

function buildAtomMap(
  atoms: readonly SkeletalAtom[],
): Map<string, SkeletalAtom> {
  const map = new Map<
    string,
    SkeletalAtom
  >();

  for (const atom of atoms) {
    if (!map.has(atom.id)) {
      map.set(atom.id, atom);
    }
  }

  return map;
}

function buildBondMap(
  bonds: readonly SkeletalBond[],
): Map<string, SkeletalBond> {
  const map = new Map<
    string,
    SkeletalBond
  >();

  for (const bond of bonds) {
    if (!map.has(bond.id)) {
      map.set(bond.id, bond);
    }
  }

  return map;
}

function buildAdjacencyMap({
  atomsById,
  bonds,
}: {
  atomsById: ReadonlyMap<
    string,
    SkeletalAtom
  >;
  bonds: readonly SkeletalBond[];
}): Map<
  string,
  MolecularGraphNeighbour[]
> {
  const adjacency = new Map<
    string,
    MolecularGraphNeighbour[]
  >();

  for (const atomId of atomsById.keys()) {
    adjacency.set(atomId, []);
  }

  for (const bond of bonds) {
    const fromAtom = atomsById.get(
      bond.from,
    );

    const toAtom = atomsById.get(
      bond.to,
    );

    if (
      !fromAtom ||
      !toAtom ||
      bond.from === bond.to
    ) {
      continue;
    }

    adjacency.get(bond.from)?.push({
      atom: toAtom,
      bond,
    });

    adjacency.get(bond.to)?.push({
      atom: fromAtom,
      bond,
    });
  }

  return adjacency;
}

function validateMoleculeGraph(
  molecule: SkeletalMoleculeDefinition,
): MolecularGraphValidationResult {
  const issues: MolecularGraphIssue[] = [];

  const atomIds = new Set<string>();

  for (const atom of molecule.atoms) {
    if (atomIds.has(atom.id)) {
      issues.push({
        code: "duplicate-atom-id",
        atomId: atom.id,
        message:
          `Atom ID "${atom.id}" occurs more than once.`,
      });
    }

    atomIds.add(atom.id);
  }

  const bondIds = new Set<string>();
  const connections = new Map<
    string,
    string
  >();

  for (const bond of molecule.bonds) {
    if (bondIds.has(bond.id)) {
      issues.push({
        code: "duplicate-bond-id",
        bondId: bond.id,
        message:
          `Bond ID "${bond.id}" occurs more than once.`,
      });
    }

    bondIds.add(bond.id);

    if (!atomIds.has(bond.from)) {
      issues.push({
        code: "missing-from-atom",
        bondId: bond.id,
        atomId: bond.from,
        message:
          `Bond "${bond.id}" references missing atom "${bond.from}".`,
      });
    }

    if (!atomIds.has(bond.to)) {
      issues.push({
        code: "missing-to-atom",
        bondId: bond.id,
        atomId: bond.to,
        message:
          `Bond "${bond.id}" references missing atom "${bond.to}".`,
      });
    }

    if (bond.from === bond.to) {
      issues.push({
        code: "self-bond",
        bondId: bond.id,
        atomId: bond.from,
        message:
          `Bond "${bond.id}" connects atom "${bond.from}" to itself.`,
      });
    }

    const key = connectionKey(
      bond.from,
      bond.to,
    );

    const existingBondId =
      connections.get(key);

    if (existingBondId) {
      issues.push({
        code: "duplicate-connection",
        bondId: bond.id,
        message:
          `Bond "${bond.id}" duplicates the connection already represented by bond "${existingBondId}".`,
      });
    } else {
      connections.set(key, bond.id);
    }
  }

  for (const atom of molecule.atoms) {
    const maximumValence =
      getMaximumValence(atom);

    if (maximumValence === undefined) {
      continue;
    }

    const bondOrderTotal =
      molecule.bonds.reduce(
        (total, bond) => {
          if (
            bond.from !== atom.id &&
            bond.to !== atom.id
          ) {
            return total;
          }

          return (
            total +
            bondTypeOrderContribution(
              bond.type ?? "single",
            )
          );
        },
        0,
      );

    if (bondOrderTotal > maximumValence) {
      issues.push({
        code: "atom-valence-exceeded",
        atomId: atom.id,
        message:
          `Atom "${atom.id}" has a bond-order total of ${bondOrderTotal}, exceeding its maximum valence of ${maximumValence}.`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function createMolecularGraph(
  molecule: SkeletalMoleculeDefinition,
): MolecularGraph {
  const atomsById = buildAtomMap(
    molecule.atoms,
  );

  const bondsById = buildBondMap(
    molecule.bonds,
  );

  const adjacency = buildAdjacencyMap({
    atomsById,
    bonds: molecule.bonds,
  });

  const getAtom = (
    atomId: string,
  ): SkeletalAtom | undefined =>
    atomsById.get(atomId);

  const getBond = (
    bondId: string,
  ): SkeletalBond | undefined =>
    bondsById.get(bondId);

  const getNeighbours = (
    atomId: string,
  ): readonly MolecularGraphNeighbour[] =>
    adjacency.get(atomId) ?? [];

  const getConnectedBonds = (
    atomId: string,
  ): readonly SkeletalBond[] =>
    getNeighbours(atomId).map(
      ({ bond }) => bond,
    );

  const getNeighbourAtoms = (
    atomId: string,
  ): readonly SkeletalAtom[] =>
    getNeighbours(atomId).map(
      ({ atom }) => atom,
    );

  const getAtomDegree = (
    atomId: string,
  ): number =>
    getNeighbours(atomId).length;

  const getAtomBondOrderTotal = (
    atomId: string,
  ): number =>
    getConnectedBonds(atomId).reduce(
      (total, bond) =>
        total +
        bondTypeOrderContribution(
          bond.type ?? "single",
        ),
      0,
    );

  const isTerminalAtom = (
    atomId: string,
  ): boolean =>
    atomsById.has(atomId) &&
    getAtomDegree(atomId) <= 1;

  const getConnectedComponents =
    (): readonly MolecularGraphComponent[] => {
      const visited = new Set<string>();
      const components:
        MolecularGraphComponent[] = [];

      for (const startAtomId of atomsById.keys()) {
        if (visited.has(startAtomId)) {
          continue;
        }

        const queue = [startAtomId];
        const componentAtomIds: string[] = [];
        const componentBondIds =
          new Set<string>();

        visited.add(startAtomId);

        while (queue.length > 0) {
          const atomId = queue.shift();

          if (atomId === undefined) {
            continue;
          }

          componentAtomIds.push(atomId);

          for (const neighbour of getNeighbours(
            atomId,
          )) {
            componentBondIds.add(
              neighbour.bond.id,
            );

            if (
              !visited.has(
                neighbour.atom.id,
              )
            ) {
              visited.add(
                neighbour.atom.id,
              );

              queue.push(
                neighbour.atom.id,
              );
            }
          }
        }

        components.push({
          atomIds: componentAtomIds,
          bondIds: [
            ...componentBondIds,
          ],
        });
      }

      return components;
    };

  const findShortestPath = (
    startAtomId: string,
    endAtomId: string,
    excludedBondId?: string,
  ): MolecularGraphPath | null => {
    if (
      !atomsById.has(startAtomId) ||
      !atomsById.has(endAtomId)
    ) {
      return null;
    }

    if (startAtomId === endAtomId) {
      return {
        atomIds: [startAtomId],
        bondIds: [],
      };
    }

    type QueueItem = {
      atomId: string;
      atomIds: string[];
      bondIds: string[];
    };

    const queue: QueueItem[] = [
      {
        atomId: startAtomId,
        atomIds: [startAtomId],
        bondIds: [],
      },
    ];

    const visited = new Set<string>([
      startAtomId,
    ]);

    while (queue.length > 0) {
      const current = queue.shift();

      if (!current) {
        continue;
      }

      for (const neighbour of getNeighbours(
        current.atomId,
      )) {
        if (
          neighbour.bond.id ===
          excludedBondId
        ) {
          continue;
        }

        if (
          visited.has(
            neighbour.atom.id,
          )
        ) {
          continue;
        }

        const nextAtomIds = [
          ...current.atomIds,
          neighbour.atom.id,
        ];

        const nextBondIds = [
          ...current.bondIds,
          neighbour.bond.id,
        ];

        if (
          neighbour.atom.id ===
          endAtomId
        ) {
          return {
            atomIds: nextAtomIds,
            bondIds: nextBondIds,
          };
        }

        visited.add(
          neighbour.atom.id,
        );

        queue.push({
          atomId: neighbour.atom.id,
          atomIds: nextAtomIds,
          bondIds: nextBondIds,
        });
      }
    }

    return null;
  };

  const findRingForBond = (
    bondId: string,
  ): MolecularGraphRingCandidate | null => {
    const bond = getBond(bondId);

    if (!bond) {
      return null;
    }

    const alternatePath =
      findShortestPath(
        bond.from,
        bond.to,
        bond.id,
      );

    if (!alternatePath) {
      return null;
    }

    return {
      atomIds: alternatePath.atomIds,
      bondIds: [
        ...alternatePath.bondIds,
        bond.id,
      ],
    };
  };

  const isBondInRing = (
    bondId: string,
  ): boolean =>
    findRingForBond(bondId) !== null;

  return {
    molecule,
    atomsById,
    bondsById,
    getAtom,
    getBond,
    getConnectedBonds,
    getNeighbours,
    getNeighbourAtoms,
    getAtomDegree,
    getAtomBondOrderTotal,
    isTerminalAtom,
    getConnectedComponents,
    findShortestPath,
    findRingForBond,
    isBondInRing,
    validate: () =>
      validateMoleculeGraph(molecule),
  };
}