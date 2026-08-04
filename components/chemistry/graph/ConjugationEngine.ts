import type {
  SkeletalAtom,
  SkeletalBond,
} from "../skeletal/types";
import type {
  MolecularGraph,
} from "./MolecularGraph";
import {
  determineHybridisation,
  type HybridisationConfidence,
} from "./HybridisationEngine";
import {
  findRingsForAtom,
  findRingsForBond,
} from "./RingEngine";

export type ConjugationConfidence =
  HybridisationConfidence;

export type ConjugationAtomRole =
  | "pi-bonded"
  | "aromatic"
  | "lone-pair-donor"
  | "empty-p-orbital"
  | "radical"
  | "adjacent"
  | "none";

export type ConjugationAtomResult = {
  atomId: string;
  conjugated: boolean;
  pOrbitalAvailable: boolean;
  role: ConjugationAtomRole;
  confidence: ConjugationConfidence;
  reasoning: readonly string[];
};

export type ConjugationBondResult = {
  bondId: string;
  conjugated: boolean;
  confidence: ConjugationConfidence;
  reasoning: readonly string[];
};

export type ConjugatedPath = {
  atomIds: readonly string[];
  bondIds: readonly string[];
  length: number;
};

export type PiSystem = {
  id: string;
  atomIds: readonly string[];
  bondIds: readonly string[];
  cyclic: boolean;
  aromaticBondCount: number;
  multipleBondCount: number;
};

export type AtomPositionClassification = {
  atomId: string;
  vinylic: boolean;
  allylic: boolean;
  benzylic: boolean;
  reasoning: readonly string[];
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

function isAromaticBond(
  bond: SkeletalBond,
): boolean {
  return bond.type === "aromatic";
}

function isMultipleBond(
  bond: SkeletalBond,
): boolean {
  return (
    bond.type === "double" ||
    bond.type === "triple"
  );
}

function atomHasDirectPiBond(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getConnectedBonds(atomId)
    .some(isPiBond);
}

function atomHasAromaticBond(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getConnectedBonds(atomId)
    .some(isAromaticBond);
}

function atomHasPositiveCharge(
  atom: SkeletalAtom,
): boolean {
  return (atom.charge ?? 0) > 0;
}

function atomHasNegativeCharge(
  atom: SkeletalAtom,
): boolean {
  return (atom.charge ?? 0) < 0;
}

function hasAdjacentPiAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getNeighbours(atomId)
    .some(
      ({ atom }) =>
        atomHasDirectPiBond(
          graph,
          atom.id,
        ),
    );
}

function hasAdjacentAromaticAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return graph
    .getNeighbours(atomId)
    .some(
      ({ atom }) =>
        atomHasAromaticBond(
          graph,
          atom.id,
        ),
    );
}

function canDonateLonePair(
  graph: MolecularGraph,
  atom: SkeletalAtom,
): boolean {
  if (!isHeteroatom(atom)) {
    return false;
  }

  if (atomHasPositiveCharge(atom)) {
    return false;
  }

  return (
    atomHasNegativeCharge(atom) ||
    hasAdjacentPiAtom(
      graph,
      atom.id,
    )
  );
}

function hasEmptyPOrbital(
  atom: SkeletalAtom,
): boolean {
  const element = inferElement(atom);

  return (
    atomHasPositiveCharge(atom) ||
    (
      element === "B" &&
      !atom.radical
    )
  );
}

function confidenceRank(
  confidence: ConjugationConfidence,
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
  first: ConjugationConfidence,
  second: ConjugationConfidence,
): ConjugationConfidence {
  return confidenceRank(first) <=
    confidenceRank(second)
    ? first
    : second;
}

export function analyseConjugatedAtom(
  graph: MolecularGraph,
  atomId: string,
): ConjugationAtomResult {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return {
      atomId,
      conjugated: false,
      pOrbitalAvailable: false,
      role: "none",
      confidence: "low",
      reasoning: [
        "Atom was not found.",
      ],
    };
  }

  const hybridisation =
    determineHybridisation(
      graph,
      atomId,
    );

  const pOrbitalAvailable =
    hybridisation.hybridisation === "sp" ||
    hybridisation.hybridisation === "sp2";

  if (
    atomHasAromaticBond(
      graph,
      atomId,
    )
  ) {
    return {
      atomId,
      conjugated: true,
      pOrbitalAvailable: true,
      role: "aromatic",
      confidence: "high",
      reasoning: [
        "The atom participates in an aromatic bond.",
        "A continuous p orbital is available for delocalisation.",
      ],
    };
  }

  if (
    atomHasDirectPiBond(
      graph,
      atomId,
    )
  ) {
    return {
      atomId,
      conjugated:
        hasAdjacentPiAtom(
          graph,
          atomId,
        ) ||
        graph
          .getNeighbours(atomId)
          .some(
            ({ atom: neighbour }) =>
              canDonateLonePair(
                graph,
                neighbour,
              ) ||
              hasEmptyPOrbital(
                neighbour,
              ) ||
              neighbour.radical === true,
          ),
      pOrbitalAvailable: true,
      role: "pi-bonded",
      confidence:
        hybridisation.confidence,
      reasoning: [
        "The atom participates directly in a multiple or aromatic bond.",
        "Its p orbital can overlap with an adjacent compatible p orbital.",
      ],
    };
  }

  if (
    canDonateLonePair(
      graph,
      atom,
    )
  ) {
    return {
      atomId,
      conjugated:
        hasAdjacentPiAtom(
          graph,
          atomId,
        ),
      pOrbitalAvailable:
        hasAdjacentPiAtom(
          graph,
          atomId,
        ),
      role: "lone-pair-donor",
      confidence: "medium",
      reasoning: [
        "The heteroatom has an available lone pair.",
        "The lone pair can enter a neighbouring pi system.",
      ],
    };
  }

  if (
    hasEmptyPOrbital(atom)
  ) {
    return {
      atomId,
      conjugated:
        hasAdjacentPiAtom(
          graph,
          atomId,
        ),
      pOrbitalAvailable: true,
      role: "empty-p-orbital",
      confidence: "high",
      reasoning: [
        "The atom has an empty p orbital.",
        "An adjacent pi bond can delocalise electron density into it.",
      ],
    };
  }

  if (atom.radical === true) {
    return {
      atomId,
      conjugated:
        hasAdjacentPiAtom(
          graph,
          atomId,
        ),
      pOrbitalAvailable: true,
      role: "radical",
      confidence: "medium",
      reasoning: [
        "The atom carries an unpaired electron.",
        "The radical orbital can overlap with an adjacent pi system.",
      ],
    };
  }

  if (
    pOrbitalAvailable &&
    hasAdjacentPiAtom(
      graph,
      atomId,
    )
  ) {
    return {
      atomId,
      conjugated: true,
      pOrbitalAvailable: true,
      role: "adjacent",
      confidence:
        hybridisation.confidence,
      reasoning: [
        "The atom is sp or sp2 hybridised.",
        "It is adjacent to a pi-bonded atom.",
      ],
    };
  }

  return {
    atomId,
    conjugated: false,
    pOrbitalAvailable,
    role: "none",
    confidence:
      hybridisation.confidence,
    reasoning: [
      "No continuous adjacent p-orbital interaction was identified.",
    ],
  };
}

function atomCanParticipateInPiSystem(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  const analysis =
    analyseConjugatedAtom(
      graph,
      atomId,
    );

  return (
    analysis.pOrbitalAvailable ||
    atomHasDirectPiBond(
      graph,
      atomId,
    )
  );
}

export function analyseConjugatedBond(
  graph: MolecularGraph,
  bondId: string,
): ConjugationBondResult {
  const bond = graph.getBond(bondId);

  if (!bond) {
    return {
      bondId,
      conjugated: false,
      confidence: "low",
      reasoning: [
        "Bond was not found.",
      ],
    };
  }

  const fromAnalysis =
    analyseConjugatedAtom(
      graph,
      bond.from,
    );

  const toAnalysis =
    analyseConjugatedAtom(
      graph,
      bond.to,
    );

  const bothParticipate =
    atomCanParticipateInPiSystem(
      graph,
      bond.from,
    ) &&
    atomCanParticipateInPiSystem(
      graph,
      bond.to,
    );

  const adjacentPiInteraction =
    graph
      .getNeighbours(bond.from)
      .some(
        ({ atom, bond: neighbourBond }) =>
          neighbourBond.id !== bond.id &&
          atomHasDirectPiBond(
            graph,
            atom.id,
          ),
      ) ||
    graph
      .getNeighbours(bond.to)
      .some(
        ({ atom, bond: neighbourBond }) =>
          neighbourBond.id !== bond.id &&
          atomHasDirectPiBond(
            graph,
            atom.id,
          ),
      );

  const conjugated =
    bothParticipate &&
    (
      isPiBond(bond) ||
      adjacentPiInteraction ||
      fromAnalysis.role ===
        "lone-pair-donor" ||
      toAnalysis.role ===
        "lone-pair-donor" ||
      fromAnalysis.role ===
        "empty-p-orbital" ||
      toAnalysis.role ===
        "empty-p-orbital" ||
      fromAnalysis.role === "radical" ||
      toAnalysis.role === "radical"
    );

  return {
    bondId,
    conjugated,
    confidence: lowerConfidence(
      fromAnalysis.confidence,
      toAnalysis.confidence,
    ),
    reasoning: conjugated
      ? [
          "Both bonded atoms can participate in a p-orbital system.",
          isPiBond(bond)
            ? "The bond has direct pi character."
            : "The sigma bond connects adjacent p-orbital centres.",
        ]
      : [
          "The bonded atoms do not form a continuous compatible p-orbital connection.",
        ],
  };
}

export function isConjugatedAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return analyseConjugatedAtom(
    graph,
    atomId,
  ).conjugated;
}

export function isConjugatedBond(
  graph: MolecularGraph,
  bondId: string,
): boolean {
  return analyseConjugatedBond(
    graph,
    bondId,
  ).conjugated;
}

function buildPiAdjacency(
  graph: MolecularGraph,
): Map<string, Set<string>> {
  const adjacency = new Map<
    string,
    Set<string>
  >();

  for (const atom of graph.molecule.atoms) {
    if (
      atomCanParticipateInPiSystem(
        graph,
        atom.id,
      )
    ) {
      adjacency.set(
        atom.id,
        new Set<string>(),
      );
    }
  }

  for (const bond of graph.molecule.bonds) {
    if (
      !adjacency.has(bond.from) ||
      !adjacency.has(bond.to)
    ) {
      continue;
    }

    const analysis =
      analyseConjugatedBond(
        graph,
        bond.id,
      );

    if (
      !analysis.conjugated &&
      !isPiBond(bond)
    ) {
      continue;
    }

    adjacency
      .get(bond.from)
      ?.add(bond.to);

    adjacency
      .get(bond.to)
      ?.add(bond.from);
  }

  return adjacency;
}

function bondBetweenAtoms(
  graph: MolecularGraph,
  firstAtomId: string,
  secondAtomId: string,
): SkeletalBond | undefined {
  return graph
    .getConnectedBonds(firstAtomId)
    .find(
      (bond) =>
        (
          bond.from === firstAtomId &&
          bond.to === secondAtomId
        ) ||
        (
          bond.to === firstAtomId &&
          bond.from === secondAtomId
        ),
    );
}

export function findConjugatedPath(
  graph: MolecularGraph,
  startAtomId: string,
  endAtomId: string,
): ConjugatedPath | null {
  const adjacency =
    buildPiAdjacency(graph);

  if (
    !adjacency.has(startAtomId) ||
    !adjacency.has(endAtomId)
  ) {
    return null;
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

    if (
      current.atomId === endAtomId
    ) {
      return {
        atomIds: current.atomIds,
        bondIds: current.bondIds,
        length:
          current.bondIds.length,
      };
    }

    for (
      const neighbourAtomId of
      adjacency.get(current.atomId) ??
      []
    ) {
      if (
        visited.has(neighbourAtomId)
      ) {
        continue;
      }

      const bond = bondBetweenAtoms(
        graph,
        current.atomId,
        neighbourAtomId,
      );

      if (!bond) {
        continue;
      }

      visited.add(neighbourAtomId);

      queue.push({
        atomId: neighbourAtomId,
        atomIds: [
          ...current.atomIds,
          neighbourAtomId,
        ],
        bondIds: [
          ...current.bondIds,
          bond.id,
        ],
      });
    }
  }

  return null;
}

function canonicalSystemId(
  atomIds: readonly string[],
): string {
  return `pi-system-${[
    ...atomIds,
  ]
    .sort((left, right) =>
      left.localeCompare(right),
    )
    .join("-")}`;
}

export function findPiSystems(
  graph: MolecularGraph,
): readonly PiSystem[] {
  const adjacency =
    buildPiAdjacency(graph);

  const visited = new Set<string>();
  const systems: PiSystem[] = [];

  for (const startAtomId of adjacency.keys()) {
    if (visited.has(startAtomId)) {
      continue;
    }

    const queue = [startAtomId];
    const atomIds: string[] = [];
    const bondIds = new Set<string>();

    visited.add(startAtomId);

    while (queue.length > 0) {
      const atomId = queue.shift();

      if (!atomId) {
        continue;
      }

      atomIds.push(atomId);

      for (
        const neighbourAtomId of
        adjacency.get(atomId) ?? []
      ) {
        const bond = bondBetweenAtoms(
          graph,
          atomId,
          neighbourAtomId,
        );

        if (bond) {
          bondIds.add(bond.id);
        }

        if (
          !visited.has(
            neighbourAtomId,
          )
        ) {
          visited.add(
            neighbourAtomId,
          );

          queue.push(
            neighbourAtomId,
          );
        }
      }
    }

    const systemBondIds = [
      ...bondIds,
    ].sort((left, right) =>
      left.localeCompare(right),
    );

    const systemAtomIds = [
      ...atomIds,
    ].sort((left, right) =>
      left.localeCompare(right),
    );

    const cyclic =
      systemBondIds.some(
        (bondId) =>
          findRingsForBond(
            graph,
            bondId,
          ).length > 0,
      );

    systems.push({
      id: canonicalSystemId(
        systemAtomIds,
      ),
      atomIds: systemAtomIds,
      bondIds: systemBondIds,
      cyclic,
      aromaticBondCount:
        systemBondIds.filter(
          (bondId) =>
            graph.getBond(bondId)
              ?.type === "aromatic",
        ).length,
      multipleBondCount:
        systemBondIds.filter(
          (bondId) => {
            const bond =
              graph.getBond(bondId);

            return (
              bond !== undefined &&
              isMultipleBond(bond)
            );
          },
        ).length,
    });
  }

  return systems
    .filter(
      (system) =>
        system.atomIds.length >= 2 &&
        system.bondIds.length >= 1,
    )
    .sort(
      (left, right) =>
        right.atomIds.length -
          left.atomIds.length ||
        left.id.localeCompare(right.id),
    );
}

export function findPiSystemForAtom(
  graph: MolecularGraph,
  atomId: string,
): PiSystem | null {
  return (
    findPiSystems(graph).find(
      (system) =>
        system.atomIds.includes(atomId),
    ) ?? null
  );
}

export function findPiSystemForBond(
  graph: MolecularGraph,
  bondId: string,
): PiSystem | null {
  return (
    findPiSystems(graph).find(
      (system) =>
        system.bondIds.includes(bondId),
    ) ?? null
  );
}

function longestSimplePathFrom(
  adjacency: ReadonlyMap<
    string,
    ReadonlySet<string>
  >,
  currentAtomId: string,
  visited: ReadonlySet<string>,
): string[] {
  let longest = [currentAtomId];

  for (
    const neighbourAtomId of
    adjacency.get(currentAtomId) ?? []
  ) {
    if (
      visited.has(neighbourAtomId)
    ) {
      continue;
    }

    const nextVisited = new Set(
      visited,
    );

    nextVisited.add(neighbourAtomId);

    const candidate = [
      currentAtomId,
      ...longestSimplePathFrom(
        adjacency,
        neighbourAtomId,
        nextVisited,
      ),
    ];

    if (
      candidate.length >
      longest.length
    ) {
      longest = candidate;
    }
  }

  return longest;
}

export function findLongestConjugatedPath(
  graph: MolecularGraph,
): ConjugatedPath | null {
  const adjacency =
    buildPiAdjacency(graph);

  let longestAtomIds: string[] = [];

  for (const atomId of adjacency.keys()) {
    const path =
      longestSimplePathFrom(
        adjacency,
        atomId,
        new Set([atomId]),
      );

    if (
      path.length >
      longestAtomIds.length
    ) {
      longestAtomIds = path;
    }
  }

  if (longestAtomIds.length < 2) {
    return null;
  }

  const bondIds: string[] = [];

  for (
    let index = 0;
    index <
    longestAtomIds.length - 1;
    index += 1
  ) {
    const firstAtomId =
      longestAtomIds[index];

    const secondAtomId =
      longestAtomIds[index + 1];

    if (
      !firstAtomId ||
      !secondAtomId
    ) {
      continue;
    }

    const bond = bondBetweenAtoms(
      graph,
      firstAtomId,
      secondAtomId,
    );

    if (bond) {
      bondIds.push(bond.id);
    }
  }

  return {
    atomIds: longestAtomIds,
    bondIds,
    length: bondIds.length,
  };
}

export function classifyAtomPosition(
  graph: MolecularGraph,
  atomId: string,
): AtomPositionClassification {
  const atom = graph.getAtom(atomId);

  if (!atom) {
    return {
      atomId,
      vinylic: false,
      allylic: false,
      benzylic: false,
      reasoning: [
        "Atom was not found.",
      ],
    };
  }

  const connectedBonds =
    graph.getConnectedBonds(atomId);

  const vinylic =
    connectedBonds.some(
      (bond) =>
        bond.type === "double",
    );

  const allylic =
    !vinylic &&
    graph
      .getNeighbours(atomId)
      .some(
        ({ atom: neighbour }) =>
          graph
            .getConnectedBonds(
              neighbour.id,
            )
            .some(
              (bond) =>
                bond.type === "double" &&
                bond.from !== atomId &&
                bond.to !== atomId,
            ),
      );

  const benzylic =
    !atomHasAromaticBond(
      graph,
      atomId,
    ) &&
    hasAdjacentAromaticAtom(
      graph,
      atomId,
    );

  const reasoning: string[] = [];

  if (vinylic) {
    reasoning.push(
      "The atom is directly attached through a double bond.",
    );
  }

  if (allylic) {
    reasoning.push(
      "The atom is adjacent to an alkene carbon.",
    );
  }

  if (benzylic) {
    reasoning.push(
      "The atom is adjacent to an aromatic atom.",
    );
  }

  if (
    !vinylic &&
    !allylic &&
    !benzylic
  ) {
    reasoning.push(
      "The atom is not vinylic, allylic, or benzylic.",
    );
  }

  return {
    atomId,
    vinylic,
    allylic,
    benzylic,
    reasoning,
  };
}

export function isVinylicAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return classifyAtomPosition(
    graph,
    atomId,
  ).vinylic;
}

export function isAllylicAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return classifyAtomPosition(
    graph,
    atomId,
  ).allylic;
}

export function isBenzylicAtom(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  return classifyAtomPosition(
    graph,
    atomId,
  ).benzylic;
}

export function isAtomInCyclicPiSystem(
  graph: MolecularGraph,
  atomId: string,
): boolean {
  const system =
    findPiSystemForAtom(
      graph,
      atomId,
    );

  if (!system?.cyclic) {
    return false;
  }

  return (
    findRingsForAtom(
      graph,
      atomId,
    ).length > 0
  );
}