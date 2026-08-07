import {
  cyclohexeneMolecule,
  e2AntiPeriplanarMolecule,
  hydroxideMolecule,
  methylBromideMolecule,
} from "@/components/chemistry/skeletal";
import type {
  SkeletalMoleculeDefinition,
  SkeletalPoint,
} from "@/components/chemistry/skeletal/types";
import type {
  SemanticAnchorRef,
  StructurePlacement,
} from "./types";


const bromineMolecule: SkeletalMoleculeDefinition = {
  id: "bromine",
  name: "Bromine",
  atoms: [
    { id: "br1", element: "Br", position: { x: 0, y: 0 } },
    { id: "br2", element: "Br", position: { x: 130, y: 0 } },
  ],
  bonds: [
    { id: "br-br", from: "br1", to: "br2", type: "single" },
  ],
};

const bromideMolecule: SkeletalMoleculeDefinition = {
  id: "bromide",
  name: "Bromide",
  atoms: [
    { id: "br", element: "Br", position: { x: 0, y: 0 }, charge: -1 },
  ],
  bonds: [],
};

const halogenationBromoniumMolecule: SkeletalMoleculeDefinition = {
  id: "halogenation-bromonium",
  name: "Halogenation bromonium ion",
  atoms: [
    { id: "c-left", element: "C", position: { x: 225, y: 220 } },
    { id: "c-right", element: "C", position: { x: 345, y: 220 } },
    { id: "br-bridge", element: "Br", position: { x: 285, y: 125 }, charge: 1 },
  ],
  bonds: [
    { id: "left-bridge", from: "c-left", to: "br-bridge", type: "single" },
    { id: "right-bridge", from: "c-right", to: "br-bridge", type: "single" },
    { id: "c-c", from: "c-left", to: "c-right", type: "single" },
  ],
};

const structures: Readonly<
  Record<string, SkeletalMoleculeDefinition>
> = {
  cyclohexene: cyclohexeneMolecule,
  bromine: bromineMolecule,
  bromide: bromideMolecule,
  "halogenation-bromonium": halogenationBromoniumMolecule,
  hydroxide: hydroxideMolecule,
  "methyl-bromide": methylBromideMolecule,
  "e2-anti-periplanar-substrate":
    e2AntiPeriplanarMolecule,
};

export function getAuthoringStructure(
  structureId: string,
): SkeletalMoleculeDefinition | undefined {
  return structures[structureId];
}

function transformPoint(
  point: SkeletalPoint,
  placement: StructurePlacement,
): SkeletalPoint {
  return {
    x:
      placement.x +
      point.x * placement.scale,
    y:
      placement.y +
      point.y * placement.scale,
  };
}

function addOffset(
  point: SkeletalPoint,
  offset?: SkeletalPoint,
): SkeletalPoint {
  return {
    x: point.x + (offset?.x ?? 0),
    y: point.y + (offset?.y ?? 0),
  };
}

const lonePairVectors = {
  "upper-left": {
    x: -0.28,
    y: -0.96,
  },
  "upper-right": {
    x: 0.28,
    y: -0.96,
  },
  left: {
    x: -1,
    y: 0,
  },
  right: {
    x: 1,
    y: 0,
  },
} as const;

export function resolveSemanticAnchor(input: {
  anchor: SemanticAnchorRef;
  placements: Readonly<
    Record<string, StructurePlacement>
  >;
}): SkeletalPoint {
  const anchor = input.anchor;

  const placement =
    input.placements[anchor.placementId];

  if (!placement) {
    throw new Error(
      `Unknown mechanism placement: ${anchor.placementId}`,
    );
  }

  const molecule = getAuthoringStructure(
    placement.structureId,
  );

  if (!molecule) {
    throw new Error(
      `Unknown mechanism structure: ${placement.structureId}`,
    );
  }

  if (anchor.kind === "bond-midpoint") {
    const bondId = anchor.bondId;

    const bond = molecule.bonds.find(
      (item) => item.id === bondId,
    );

    if (!bond) {
      throw new Error(
        `Unknown bond ${bondId} on ${molecule.id}`,
      );
    }

    const from = molecule.atoms.find(
      (atom) => atom.id === bond.from,
    );

    const to = molecule.atoms.find(
      (atom) => atom.id === bond.to,
    );

    if (!from || !to) {
      throw new Error(
        `Broken bond ${bond.id} on ${molecule.id}`,
      );
    }

    return addOffset(
      transformPoint(
        {
          x:
            (from.position.x +
              to.position.x) /
            2,
          y:
            (from.position.y +
              to.position.y) /
            2,
        },
        placement,
      ),
      anchor.offset,
    );
  }

  const atomId = anchor.atomId;

  const atom = molecule.atoms.find(
    (item) => item.id === atomId,
  );

  if (!atom) {
    throw new Error(
      `Unknown atom ${atomId} on ${molecule.id}`,
    );
  }

  const atomPoint = transformPoint(
    atom.position,
    placement,
  );

  if (anchor.kind === "atom") {
    return addOffset(
      atomPoint,
      anchor.offset,
    );
  }

  const vector =
    lonePairVectors[anchor.lonePair];

  const distance =
    (anchor.distance ?? 38) *
    placement.scale;

  return addOffset(
    {
      x:
        atomPoint.x +
        vector.x * distance,
      y:
        atomPoint.y +
        vector.y * distance,
    },
    anchor.offset,
  );
}