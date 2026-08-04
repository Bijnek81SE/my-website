import type {
  MolecularGraph,
  MolecularGraphPath,
} from "./MolecularGraph";

export type MolecularRing = {
  id: string;
  atomIds: readonly string[];
  bondIds: readonly string[];
  size: number;
};

export type RingMembership = {
  atomRingIds: ReadonlyMap<
    string,
    readonly string[]
  >;
  bondRingIds: ReadonlyMap<
    string,
    readonly string[]
  >;
};

function canonicalCycleKey(
  atomIds: readonly string[],
): string {
  if (atomIds.length === 0) {
    return "";
  }

  const forward = [...atomIds];
  const reverse = [...atomIds].reverse();

  const rotations = (
    values: readonly string[],
  ): string[] =>
    values.map((_, index) =>
      [
        ...values.slice(index),
        ...values.slice(0, index),
      ].join("::"),
    );

  return [
    ...rotations(forward),
    ...rotations(reverse),
  ].sort((left, right) =>
    left.localeCompare(right),
  )[0];
}

function ringIdFromAtoms(
  atomIds: readonly string[],
): string {
  return `ring-${canonicalCycleKey(
    atomIds,
  ).replaceAll("::", "-")}`;
}

function pathToRing(
  path: MolecularGraphPath,
  closingBondId: string,
): MolecularRing {
  const atomIds = [...path.atomIds];
  const bondIds = [
    ...path.bondIds,
    closingBondId,
  ];

  return {
    id: ringIdFromAtoms(atomIds),
    atomIds,
    bondIds,
    size: atomIds.length,
  };
}

function sortRing(
  ring: MolecularRing,
): MolecularRing {
  return {
    ...ring,
    atomIds: [...ring.atomIds],
    bondIds: [...ring.bondIds].sort(
      (left, right) =>
        left.localeCompare(right),
    ),
  };
}

function ringContainsRing(
  outer: MolecularRing,
  inner: MolecularRing,
): boolean {
  if (outer.size <= inner.size) {
    return false;
  }

  const outerBonds = new Set(
    outer.bondIds,
  );

  return inner.bondIds.every((bondId) =>
    outerBonds.has(bondId),
  );
}

export function findSimpleRings(
  graph: MolecularGraph,
): readonly MolecularRing[] {
  const ringsByKey = new Map<
    string,
    MolecularRing
  >();

  for (const bond of graph.molecule.bonds) {
    const alternatePath =
      graph.findShortestPath(
        bond.from,
        bond.to,
        bond.id,
      );

    if (
      !alternatePath ||
      alternatePath.atomIds.length < 3
    ) {
      continue;
    }

    const ring = pathToRing(
      alternatePath,
      bond.id,
    );

    const key = canonicalCycleKey(
      ring.atomIds,
    );

    if (!ringsByKey.has(key)) {
      ringsByKey.set(
        key,
        sortRing(ring),
      );
    }
  }

  return [...ringsByKey.values()].sort(
    (left, right) =>
      left.size - right.size ||
      left.id.localeCompare(right.id),
  );
}

export function findSmallestRings(
  graph: MolecularGraph,
): readonly MolecularRing[] {
  const rings = findSimpleRings(graph);

  return rings.filter(
    (candidate) =>
      !rings.some((other) =>
        ringContainsRing(
          candidate,
          other,
        ),
      ),
  );
}

export function findSmallestRing(
  graph: MolecularGraph,
): MolecularRing | null {
  return findSmallestRings(graph)[0] ?? null;
}

export function findRingsForAtom(
  graph: MolecularGraph,
  atomId: string,
): readonly MolecularRing[] {
  return findSimpleRings(graph).filter(
    (ring) =>
      ring.atomIds.includes(atomId),
  );
}

export function findRingsForBond(
  graph: MolecularGraph,
  bondId: string,
): readonly MolecularRing[] {
  return findSimpleRings(graph).filter(
    (ring) =>
      ring.bondIds.includes(bondId),
  );
}

export function isRingAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return findRingsForAtom(
    graph,
    atomId,
  ).length > 0;
}

export function isRingBond(
  graph: MolecularGraph,
  bondId: string,
): boolean {
  return findRingsForBond(
    graph,
    bondId,
  ).length > 0;
}

export function getSmallestRingForAtom(
  graph: MolecularGraph,
  atomId: string,
): MolecularRing | null {
  return (
    [...findRingsForAtom(graph, atomId)].sort(
      (left, right) =>
        left.size - right.size,
    )[0] ?? null
  );
}

export function getSmallestRingForBond(
  graph: MolecularGraph,
  bondId: string,
): MolecularRing | null {
  return (
    [...findRingsForBond(graph, bondId)].sort(
      (left, right) =>
        left.size - right.size,
    )[0] ?? null
  );
}

export function getRingSizeForAtom(
  graph: MolecularGraph,
  atomId: string,
): number | null {
  return (
    getSmallestRingForAtom(
      graph,
      atomId,
    )?.size ?? null
  );
}

export function getRingSizeForBond(
  graph: MolecularGraph,
  bondId: string,
): number | null {
  return (
    getSmallestRingForBond(
      graph,
      bondId,
    )?.size ?? null
  );
}

export function buildRingMembership(
  graph: MolecularGraph,
): RingMembership {
  const atomMembership = new Map<
    string,
    string[]
  >();

  const bondMembership = new Map<
    string,
    string[]
  >();

  for (const atom of graph.molecule.atoms) {
    atomMembership.set(atom.id, []);
  }

  for (const bond of graph.molecule.bonds) {
    bondMembership.set(bond.id, []);
  }

  for (const ring of findSimpleRings(graph)) {
    for (const atomId of ring.atomIds) {
      atomMembership
        .get(atomId)
        ?.push(ring.id);
    }

    for (const bondId of ring.bondIds) {
      bondMembership
        .get(bondId)
        ?.push(ring.id);
    }
  }

  return {
    atomRingIds: new Map(
      [...atomMembership.entries()].map(
        ([atomId, ringIds]) => [
          atomId,
          [...ringIds].sort(),
        ],
      ),
    ),
    bondRingIds: new Map(
      [...bondMembership.entries()].map(
        ([bondId, ringIds]) => [
          bondId,
          [...ringIds].sort(),
        ],
      ),
    ),
  };
}

export function atomsShareRing(
  graph: MolecularGraph,
  firstAtomId: string,
  secondAtomId: string,
): boolean {
  const membership =
    buildRingMembership(graph);

  const firstRingIds = new Set(
    membership.atomRingIds.get(
      firstAtomId,
    ) ?? [],
  );

  return (
    membership.atomRingIds
      .get(secondAtomId)
      ?.some((ringId) =>
        firstRingIds.has(ringId),
      ) ?? false
  );
}

export function bondsShareRing(
  graph: MolecularGraph,
  firstBondId: string,
  secondBondId: string,
): boolean {
  const membership =
    buildRingMembership(graph);

  const firstRingIds = new Set(
    membership.bondRingIds.get(
      firstBondId,
    ) ?? [],
  );

  return (
    membership.bondRingIds
      .get(secondBondId)
      ?.some((ringId) =>
        firstRingIds.has(ringId),
      ) ?? false
  );
}