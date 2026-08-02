import { assertSkeletalMolecule, regularPolygonPoints } from "./geometry";
import type { SkeletalMoleculeDefinition } from "./types";

function ringDefinition({
  id,
  name,
  doubleBond,
}: {
  id: string;
  name: string;
  doubleBond?: [number, number];
}): SkeletalMoleculeDefinition {
  const points = regularPolygonPoints({ sides: 6, radius: 62 });
  const atoms = points.map((position, index) => ({
    id: `c${index + 1}`,
    element: "C",
    position,
  }));
  const bonds = points.map((_, index) => {
    const next = (index + 1) % points.length;
    const isDouble =
      doubleBond?.[0] === index && doubleBond?.[1] === next;

    return {
      id: `b${index + 1}`,
      from: `c${index + 1}`,
      to: `c${next + 1}`,
      type: isDouble ? ("double" as const) : ("single" as const),
      parallelOffset: isDouble ? 11 : undefined,
    };
  });

  return assertSkeletalMolecule({ id, name, atoms, bonds });
}

export const cyclohexaneMolecule = ringDefinition({
  id: "cyclohexane",
  name: "Cyclohexane",
});

export const cyclohexeneMolecule = ringDefinition({
  id: "cyclohexene",
  name: "Cyclohexene",
  doubleBond: [3, 4],
});

export const propeneMolecule = assertSkeletalMolecule({
  id: "propene",
  name: "Propene",
  atoms: [
    { id: "c1", element: "C", position: { x: -92, y: 24 } },
    { id: "c2", element: "C", position: { x: -35, y: -8 } },
    { id: "c3", element: "C", position: { x: 28, y: 24 } },
  ],
  bonds: [
    { id: "c1-c2", from: "c1", to: "c2", type: "single" },
    {
      id: "c2-c3",
      from: "c2",
      to: "c3",
      type: "double",
      parallelOffset: -10,
    },
  ],
});

function substitutedPropane({
  id,
  name,
  substituent,
  position,
}: {
  id: string;
  name: string;
  substituent: "Br" | "OH";
  position: "internal" | "terminal";
}): SkeletalMoleculeDefinition {
  const terminal = position === "terminal";

  return assertSkeletalMolecule({
    id,
    name,
    atoms: [
      { id: "c1", element: "C", position: { x: -92, y: 28 } },
      { id: "c2", element: "C", position: { x: -34, y: -4 } },
      { id: "c3", element: "C", position: { x: 30, y: 28 } },
      {
        id: "x",
        element: substituent,
        label: substituent,
        showLabel: true,
        colour: substituent === "Br" ? "#dc2626" : "#2563eb",
        position: terminal ? { x: 108, y: -2 } : { x: -34, y: -72 },
      },
    ],
    bonds: [
      { id: "c1-c2", from: "c1", to: "c2", type: "single" },
      { id: "c2-c3", from: "c2", to: "c3", type: "single" },
      {
        id: terminal ? "c3-x" : "c2-x",
        from: terminal ? "c3" : "c2",
        to: "x",
        type: "single",
      },
    ],
  });
}

export const onePropanolMolecule = substitutedPropane({
  id: "one-propanol",
  name: "1-Propanol",
  substituent: "OH",
  position: "terminal",
});

export const twoPropanolMolecule = substitutedPropane({
  id: "two-propanol",
  name: "2-Propanol",
  substituent: "OH",
  position: "internal",
});

export const oneBromopropaneMolecule = substitutedPropane({
  id: "one-bromopropane",
  name: "1-Bromopropane",
  substituent: "Br",
  position: "terminal",
});

export const twoBromopropaneMolecule = substitutedPropane({
  id: "two-bromopropane",
  name: "2-Bromopropane",
  substituent: "Br",
  position: "internal",
});


export const stereochemistryDemoMolecule = assertSkeletalMolecule({
  id: "stereochemistry-demo",
  name: "Stereochemistry and charge demo",
  atoms: [
    { id: "c1", element: "C", position: { x: -72, y: 18 } },
    { id: "c2", element: "C", position: { x: 0, y: -18 }, charge: 1 },
    { id: "br", element: "Br", label: "Br", showLabel: true, colour: "#dc2626", position: { x: 78, y: -62 } },
    { id: "oh", element: "OH", label: "OH", showLabel: true, colour: "#2563eb", position: { x: 82, y: 48 }, radical: true },
  ],
  bonds: [
    { id: "c1-c2", from: "c1", to: "c2", type: "single" },
    { id: "c2-br", from: "c2", to: "br", type: "wedge", colour: "#dc2626" },
    { id: "c2-oh", from: "c2", to: "oh", type: "dash", colour: "#2563eb" },
  ],
});

export const skeletalMoleculePresets = [
  cyclohexeneMolecule,
  cyclohexaneMolecule,
  propeneMolecule,
  onePropanolMolecule,
  twoPropanolMolecule,
  oneBromopropaneMolecule,
  twoBromopropaneMolecule,
  stereochemistryDemoMolecule,
] as const;
