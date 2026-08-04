import type {
  MolecularGraph,
} from "./MolecularGraph";
import {
  findSmallestRings,
  type MolecularRing,
} from "./RingEngine";

export type RingRelationshipType =
  | "separate"
  | "fused"
  | "spiro"
  | "bridged";

export type RingRelationship = {
  firstRingId: string;
  secondRingId: string;
  type: RingRelationshipType;
  sharedAtomIds: readonly string[];
  sharedBondIds: readonly string[];
};

export type RingSystemClassification =
  | "isolated"
  | "fused"
  | "spiro"
  | "bridged"
  | "mixed";

export type MolecularRingSystem = {
  id: string;
  ringIds: readonly string[];
  atomIds: readonly string[];
  bondIds: readonly string[];
  sharedAtomIds: readonly string[];
  sharedBondIds: readonly string[];
  relationships: readonly RingRelationship[];
  classification: RingSystemClassification;
  ringCount: number;
  smallestRingSize: number;
  largestRingSize: number;
};

function sortedUnique(
  values: readonly string[],
): string[] {
  return [...new Set(values)].sort(
    (left, right) =>
      left.localeCompare(right),
  );
}

function intersection(
  first: readonly string[],
  second: readonly string[],
): string[] {
  const secondValues = new Set(second);

  return sortedUnique(
    first.filter((value) =>
      secondValues.has(value),
    ),
  );
}

function canonicalPairKey(
  firstId: string,
  secondId: string,
): string {
  return [firstId, secondId]
    .sort((left, right) =>
      left.localeCompare(right),
    )
    .join("::");
}

function ringSystemId(
  ringIds: readonly string[],
): string {
  return `ring-system-${sortedUnique(
    ringIds,
  ).join("-")}`;
}

export function analyseRingRelationship(
  firstRing: MolecularRing,
  secondRing: MolecularRing,
): RingRelationship {
  const sharedAtomIds = intersection(
    firstRing.atomIds,
    secondRing.atomIds,
  );

  const sharedBondIds = intersection(
    firstRing.bondIds,
    secondRing.bondIds,
  );

  let type: RingRelationshipType =
    "separate";

  if (sharedBondIds.length > 0) {
    type = "fused";
  } else if (sharedAtomIds.length === 1) {
    type = "spiro";
  } else if (sharedAtomIds.length >= 2) {
    type = "bridged";
  }

  return {
    firstRingId: firstRing.id,
    secondRingId: secondRing.id,
    type,
    sharedAtomIds,
    sharedBondIds,
  };
}

export function getRingRelationships(
  graph: MolecularGraph,
): readonly RingRelationship[] {
  const rings = findSmallestRings(graph);
  const relationships: RingRelationship[] =
    [];

  for (
    let firstIndex = 0;
    firstIndex < rings.length;
    firstIndex += 1
  ) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < rings.length;
      secondIndex += 1
    ) {
      const firstRing = rings[firstIndex];
      const secondRing = rings[secondIndex];

      if (!firstRing || !secondRing) {
        continue;
      }

      relationships.push(
        analyseRingRelationship(
          firstRing,
          secondRing,
        ),
      );
    }
  }

  return relationships.sort(
    (left, right) =>
      canonicalPairKey(
        left.firstRingId,
        left.secondRingId,
      ).localeCompare(
        canonicalPairKey(
          right.firstRingId,
          right.secondRingId,
        ),
      ),
  );
}

export function getRelationshipBetweenRings(
  graph: MolecularGraph,
  firstRingId: string,
  secondRingId: string,
): RingRelationship | null {
  const targetKey = canonicalPairKey(
    firstRingId,
    secondRingId,
  );

  return (
    getRingRelationships(graph).find(
      (relationship) =>
        canonicalPairKey(
          relationship.firstRingId,
          relationship.secondRingId,
        ) === targetKey,
    ) ?? null
  );
}

export function areFusedRings(
  graph: MolecularGraph,
  firstRingId: string,
  secondRingId: string,
): boolean {
  return (
    getRelationshipBetweenRings(
      graph,
      firstRingId,
      secondRingId,
    )?.type === "fused"
  );
}

export function areSpiroRings(
  graph: MolecularGraph,
  firstRingId: string,
  secondRingId: string,
): boolean {
  return (
    getRelationshipBetweenRings(
      graph,
      firstRingId,
      secondRingId,
    )?.type === "spiro"
  );
}

export function areBridgedRings(
  graph: MolecularGraph,
  firstRingId: string,
  secondRingId: string,
): boolean {
  return (
    getRelationshipBetweenRings(
      graph,
      firstRingId,
      secondRingId,
    )?.type === "bridged"
  );
}

function ringsAreConnected(
  firstRing: MolecularRing,
  secondRing: MolecularRing,
): boolean {
  return intersection(
    firstRing.atomIds,
    secondRing.atomIds,
  ).length > 0;
}

function classifyRingSystem(
  relationships: readonly RingRelationship[],
): RingSystemClassification {
  const connectedTypes = new Set(
    relationships
      .filter(
        (relationship) =>
          relationship.type !== "separate",
      )
      .map(
        (relationship) =>
          relationship.type,
      ),
  );

  if (connectedTypes.size === 0) {
    return "isolated";
  }

  if (connectedTypes.size > 1) {
    return "mixed";
  }

  const onlyType = [
    ...connectedTypes,
  ][0];

  switch (onlyType) {
    case "fused":
      return "fused";

    case "spiro":
      return "spiro";

    case "bridged":
      return "bridged";

    default:
      return "isolated";
  }
}

function collectRepeatedMembers(
  collections: readonly (
    readonly string[]
  )[],
): string[] {
  const counts = new Map<
    string,
    number
  >();

  for (const collection of collections) {
    for (const value of collection) {
      counts.set(
        value,
        (counts.get(value) ?? 0) + 1,
      );
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value)
    .sort((left, right) =>
      left.localeCompare(right),
    );
}

function buildRingSystem(
  rings: readonly MolecularRing[],
): MolecularRingSystem {
  const ringIds = sortedUnique(
    rings.map((ring) => ring.id),
  );

  const atomIds = sortedUnique(
    rings.flatMap((ring) =>
      [...ring.atomIds],
    ),
  );

  const bondIds = sortedUnique(
    rings.flatMap((ring) =>
      [...ring.bondIds],
    ),
  );

  const sharedAtomIds =
    collectRepeatedMembers(
      rings.map((ring) => ring.atomIds),
    );

  const sharedBondIds =
    collectRepeatedMembers(
      rings.map((ring) => ring.bondIds),
    );

  const relationships: RingRelationship[] =
    [];

  for (
    let firstIndex = 0;
    firstIndex < rings.length;
    firstIndex += 1
  ) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < rings.length;
      secondIndex += 1
    ) {
      const firstRing = rings[firstIndex];
      const secondRing = rings[secondIndex];

      if (!firstRing || !secondRing) {
        continue;
      }

      relationships.push(
        analyseRingRelationship(
          firstRing,
          secondRing,
        ),
      );
    }
  }

  const sizes = rings.map(
    (ring) => ring.size,
  );

  return {
    id: ringSystemId(ringIds),
    ringIds,
    atomIds,
    bondIds,
    sharedAtomIds,
    sharedBondIds,
    relationships,
    classification:
      classifyRingSystem(relationships),
    ringCount: rings.length,
    smallestRingSize:
      sizes.length > 0
        ? Math.min(...sizes)
        : 0,
    largestRingSize:
      sizes.length > 0
        ? Math.max(...sizes)
        : 0,
  };
}

export function findRingSystems(
  graph: MolecularGraph,
): readonly MolecularRingSystem[] {
  const rings = findSmallestRings(graph);

  if (rings.length === 0) {
    return [];
  }

  const ringsById = new Map(
    rings.map((ring) => [
      ring.id,
      ring,
    ]),
  );

  const adjacency = new Map<
    string,
    Set<string>
  >();

  for (const ring of rings) {
    adjacency.set(
      ring.id,
      new Set<string>(),
    );
  }

  for (
    let firstIndex = 0;
    firstIndex < rings.length;
    firstIndex += 1
  ) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < rings.length;
      secondIndex += 1
    ) {
      const firstRing = rings[firstIndex];
      const secondRing = rings[secondIndex];

      if (
        !firstRing ||
        !secondRing ||
        !ringsAreConnected(
          firstRing,
          secondRing,
        )
      ) {
        continue;
      }

      adjacency
        .get(firstRing.id)
        ?.add(secondRing.id);

      adjacency
        .get(secondRing.id)
        ?.add(firstRing.id);
    }
  }

  const visited = new Set<string>();
  const systems: MolecularRingSystem[] =
    [];

  for (const ring of rings) {
    if (visited.has(ring.id)) {
      continue;
    }

    const queue = [ring.id];
    const systemRings:
      MolecularRing[] = [];

    visited.add(ring.id);

    while (queue.length > 0) {
      const ringId = queue.shift();

      if (!ringId) {
        continue;
      }

      const currentRing =
        ringsById.get(ringId);

      if (currentRing) {
        systemRings.push(currentRing);
      }

      for (
        const neighbourRingId of
        adjacency.get(ringId) ?? []
      ) {
        if (
          visited.has(neighbourRingId)
        ) {
          continue;
        }

        visited.add(neighbourRingId);
        queue.push(neighbourRingId);
      }
    }

    systems.push(
      buildRingSystem(systemRings),
    );
  }

  return systems.sort(
    (left, right) =>
      left.smallestRingSize -
        right.smallestRingSize ||
      left.id.localeCompare(right.id),
  );
}

export function findRingSystemById(
  graph: MolecularGraph,
  ringSystemIdValue: string,
): MolecularRingSystem | null {
  return (
    findRingSystems(graph).find(
      (system) =>
        system.id === ringSystemIdValue,
    ) ?? null
  );
}

export function findRingSystemsForAtom(
  graph: MolecularGraph,
  atomId: string,
): readonly MolecularRingSystem[] {
  return findRingSystems(graph).filter(
    (system) =>
      system.atomIds.includes(atomId),
  );
}

export function findRingSystemsForBond(
  graph: MolecularGraph,
  bondId: string,
): readonly MolecularRingSystem[] {
  return findRingSystems(graph).filter(
    (system) =>
      system.bondIds.includes(bondId),
  );
}

export function getSmallestRingSystemForAtom(
  graph: MolecularGraph,
  atomId: string,
): MolecularRingSystem | null {
  return (
    [
      ...findRingSystemsForAtom(
        graph,
        atomId,
      ),
    ].sort(
      (left, right) =>
        left.smallestRingSize -
          right.smallestRingSize ||
        left.ringCount -
          right.ringCount ||
        left.id.localeCompare(right.id),
    )[0] ?? null
  );
}

export function getSmallestRingSystemForBond(
  graph: MolecularGraph,
  bondId: string,
): MolecularRingSystem | null {
  return (
    [
      ...findRingSystemsForBond(
        graph,
        bondId,
      ),
    ].sort(
      (left, right) =>
        left.smallestRingSize -
          right.smallestRingSize ||
        left.ringCount -
          right.ringCount ||
        left.id.localeCompare(right.id),
    )[0] ?? null
  );
}

export function isFusedRingSystem(
  system: MolecularRingSystem,
): boolean {
  return (
    system.classification === "fused" ||
    (
      system.classification === "mixed" &&
      system.relationships.some(
        (relationship) =>
          relationship.type === "fused",
      )
    )
  );
}

export function isSpiroRingSystem(
  system: MolecularRingSystem,
): boolean {
  return (
    system.classification === "spiro" ||
    (
      system.classification === "mixed" &&
      system.relationships.some(
        (relationship) =>
          relationship.type === "spiro",
      )
    )
  );
}

export function isBridgedRingSystem(
  system: MolecularRingSystem,
): boolean {
  return (
    system.classification === "bridged" ||
    (
      system.classification === "mixed" &&
      system.relationships.some(
        (relationship) =>
          relationship.type ===
          "bridged",
      )
    )
  );
}