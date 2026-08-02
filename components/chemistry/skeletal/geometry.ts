import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalMoleculeDefinition,
  SkeletalPoint,
} from "./types";

export function pointFrom(
  origin: SkeletalPoint,
  length: number,
  angleDegrees: number,
): SkeletalPoint {
  const radians = (angleDegrees * Math.PI) / 180;

  return {
    x: origin.x + Math.cos(radians) * length,
    y: origin.y + Math.sin(radians) * length,
  };
}

export function createZigZagChain({
  id,
  name,
  atomIds,
  origin = { x: 0, y: 0 },
  bondLength = 64,
  firstAngle = -30,
}: {
  id: string;
  name: string;
  atomIds: readonly string[];
  origin?: SkeletalPoint;
  bondLength?: number;
  firstAngle?: number;
}): SkeletalMoleculeDefinition {
  const atoms: SkeletalAtom[] = [];

  atomIds.forEach((atomId, index) => {
    if (index === 0) {
      atoms.push({ id: atomId, element: "C", position: origin });
      return;
    }

    const previous = atoms[index - 1];
    const angle = index % 2 === 1 ? firstAngle : -firstAngle;

    atoms.push({
      id: atomId,
      element: "C",
      position: pointFrom(previous.position, bondLength, angle),
    });
  });

  const bonds: SkeletalBond[] = atomIds.slice(1).map((atomId, index) => ({
    id: `${atomIds[index]}-${atomId}`,
    from: atomIds[index],
    to: atomId,
    type: "single",
  }));

  return { id, name, atoms, bonds };
}

export function regularPolygonPoints({
  sides,
  radius,
  centre = { x: 0, y: 0 },
  rotation = -90,
}: {
  sides: number;
  radius: number;
  centre?: SkeletalPoint;
  rotation?: number;
}): SkeletalPoint[] {
  return Array.from({ length: sides }, (_, index) =>
    pointFrom(centre, radius, rotation + (360 / sides) * index),
  );
}

export function assertSkeletalMolecule(
  molecule: SkeletalMoleculeDefinition,
): SkeletalMoleculeDefinition {
  const atomIds = new Set<string>();
  const bondIds = new Set<string>();

  for (const atom of molecule.atoms) {
    if (atomIds.has(atom.id)) {
      throw new Error(
        `Skeletal molecule "${molecule.id}" has duplicate atom id "${atom.id}".`,
      );
    }

    atomIds.add(atom.id);
  }

  for (const bond of molecule.bonds) {
    if (bondIds.has(bond.id)) {
      throw new Error(
        `Skeletal molecule "${molecule.id}" has duplicate bond id "${bond.id}".`,
      );
    }

    if (!atomIds.has(bond.from) || !atomIds.has(bond.to)) {
      throw new Error(
        `Skeletal molecule "${molecule.id}" bond "${bond.id}" references a missing atom.`,
      );
    }

    bondIds.add(bond.id);
  }

  return molecule;
}
