import {
  assertSkeletalMolecule,
  regularPolygonPoints,
} from "./geometry";
import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalMoleculeDefinition,
} from "./types";

function molecule(
  id: string,
  name: string,
  atoms: SkeletalAtom[],
  bonds: SkeletalMoleculeDefinition["bonds"],
): SkeletalMoleculeDefinition {
  return assertSkeletalMolecule({
    id,
    name,
    atoms,
    bonds,
  });
}

export const methylBromideMolecule = molecule(
  "methyl-bromide",
  "Methyl bromide",
  [
    {
      id: "c",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: -42, y: 0 },
    },
    {
      id: "br",
      element: "Br",
      label: "Br",
      showLabel: true,
      colour: "#dc2626",
      position: { x: 62, y: 0 },
    },
  ],
  [
    {
      id: "c-br",
      from: "c",
      to: "br",
      type: "single",
    },
  ],
);

export const methanolMolecule = molecule(
  "methanol",
  "Methanol",
  [
    {
      id: "c",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: -42, y: 0 },
    },
    {
      id: "oh",
      element: "OH",
      label: "OH",
      showLabel: true,
      colour: "#2563eb",
      position: { x: 62, y: 0 },
    },
  ],
  [
    {
      id: "c-oh",
      from: "c",
      to: "oh",
      type: "single",
    },
  ],
);

export const hydroxideMolecule = molecule(
  "hydroxide",
  "Hydroxide ion",
  [
    {
      id: "o",
      element: "O",
      label: "OH",
      showLabel: true,
      charge: -1,
      colour: "#2563eb",
      position: { x: 0, y: 0 },
    },
  ],
  [],
);

function tertButylDefinition({
  id,
  name,
  substituent,
  charge,
}: {
  id: string;
  name: string;
  substituent?: "Br" | "Cl" | "OH" | "OH₂";
  charge?: number;
}) {
  const atoms: SkeletalAtom[] = [
    {
      id: "centre",
      element: "C",
      showLabel: true,
      charge,
      position: { x: 0, y: 0 },
    },
    {
      id: "m1",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: -92, y: 0 },
    },
    {
      id: "m2",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: 58, y: -58 },
    },
    {
      id: "m3",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: 58, y: 58 },
    },
  ];

  const bonds: SkeletalBond[] = [
    {
      id: "c-m1",
      from: "centre",
      to: "m1",
    },
    {
      id: "c-m2",
      from: "centre",
      to: "m2",
    },
    {
      id: "c-m3",
      from: "centre",
      to: "m3",
    },
  ];

  if (substituent) {
    const colour =
      substituent === "Br" || substituent === "Cl"
        ? "#dc2626"
        : "#2563eb";

    atoms.push({
      id: "x",
      element: substituent,
      label:
        substituent === "OH₂"
          ? "OH₂"
          : substituent,
      showLabel: true,
      charge:
        substituent === "OH₂"
          ? 1
          : undefined,
      colour,
      position: { x: 100, y: 0 },
    });

    bonds.push({
      id: "c-x",
      from: "centre",
      to: "x",
    });
  }

  return molecule(id, name, atoms, bonds);
}

export const tertButylBromideMolecule =
  tertButylDefinition({
    id: "tert-butyl-bromide",
    name: "tert-Butyl bromide",
    substituent: "Br",
  });

export const tertButylChlorideMolecule =
  tertButylDefinition({
    id: "tert-butyl-chloride",
    name: "tert-Butyl chloride",
    substituent: "Cl",
  });

export const tertButylCarbocationMolecule =
  tertButylDefinition({
    id: "tert-butyl-carbocation",
    name: "tert-Butyl carbocation",
    charge: 1,
  });

export const tertButanolMolecule =
  tertButylDefinition({
    id: "tert-butanol",
    name: "tert-Butanol",
    substituent: "OH",
  });

export const tertButylOxoniumMolecule =
  tertButylDefinition({
    id: "tert-butyl-oxonium",
    name: "tert-Butyl oxonium ion",
    substituent: "OH₂",
  });

export const e1BetaHydrogenCarbocationMolecule =
  molecule(
    "e1-beta-hydrogen-carbocation",
    "tert-Butyl carbocation with an explicit beta hydrogen",
    [
      {
        id: "centre",
        element: "C",
        showLabel: true,
        charge: 1,
        position: { x: 0, y: 0 },
      },
      {
        id: "m1",
        element: "C",
        label: "CH₃",
        showLabel: true,
        position: { x: -92, y: 0 },
      },
      {
        id: "m2",
        element: "C",
        label: "CH₂",
        showLabel: true,
        position: { x: 58, y: -58 },
      },
      {
        id: "m3",
        element: "C",
        label: "CH₃",
        showLabel: true,
        position: { x: 58, y: 58 },
      },
      {
        id: "beta-h",
        element: "H",
        label: "H",
        showLabel: true,
        colour: "#2563eb",
        position: { x: 112, y: -112 },
      },
    ],
    [
      {
        id: "c-m1",
        from: "centre",
        to: "m1",
      },
      {
        id: "c-m2",
        from: "centre",
        to: "m2",
      },
      {
        id: "c-m3",
        from: "centre",
        to: "m3",
      },
      {
        id: "m2-h",
        from: "m2",
        to: "beta-h",
        colour: "#2563eb",
      },
    ],
  );

export const twoMethylpropeneMolecule = molecule(
  "two-methylpropene",
  "2-Methylpropene",
  [
    {
      id: "c1",
      element: "C",
      showLabel: true,
      position: { x: 0, y: 0 },
    },
    {
      id: "c2",
      element: "C",
      label: "CH₂",
      showLabel: true,
      position: { x: 92, y: 0 },
    },
    {
      id: "m1",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: -66, y: -58 },
    },
    {
      id: "m2",
      element: "C",
      label: "CH₃",
      showLabel: true,
      position: { x: -66, y: 58 },
    },
  ],
  [
    {
      id: "c1-c2",
      from: "c1",
      to: "c2",
      type: "double",
      parallelOffset: -11,
    },
    {
      id: "c1-m1",
      from: "c1",
      to: "m1",
    },
    {
      id: "c1-m2",
      from: "c1",
      to: "m2",
    },
  ],
);

export const isobuteneMolecule =
  twoMethylpropeneMolecule;

export const isobutylChlorideMolecule = molecule(
  "isobutyl-chloride",
  "1-Chloro-2-methylpropane",
  [
    {
      id: "c1",
      element: "C",
      position: { x: -88, y: 28 },
    },
    {
      id: "c2",
      element: "C",
      position: { x: -28, y: -4 },
    },
    {
      id: "c3",
      element: "C",
      position: { x: 34, y: 28 },
    },
    {
      id: "m",
      element: "C",
      position: { x: -28, y: -72 },
    },
    {
      id: "cl",
      element: "Cl",
      label: "Cl",
      showLabel: true,
      colour: "#15803d",
      position: { x: 112, y: -2 },
    },
  ],
  [
    {
      id: "c1-c2",
      from: "c1",
      to: "c2",
    },
    {
      id: "c2-c3",
      from: "c2",
      to: "c3",
    },
    {
      id: "c2-m",
      from: "c2",
      to: "m",
    },
    {
      id: "c3-cl",
      from: "c3",
      to: "cl",
    },
  ],
);

export const but2eneMolecule = molecule(
  "but-2-ene",
  "2-Butene",
  [
    {
      id: "c1",
      element: "C",
      position: { x: -92, y: 28 },
    },
    {
      id: "c2",
      element: "C",
      position: { x: -35, y: -4 },
    },
    {
      id: "c3",
      element: "C",
      position: { x: 35, y: -4 },
    },
    {
      id: "c4",
      element: "C",
      position: { x: 92, y: 28 },
    },
  ],
  [
    {
      id: "c1-c2",
      from: "c1",
      to: "c2",
    },
    {
      id: "c2-c3",
      from: "c2",
      to: "c3",
      type: "double",
      parallelOffset: 11,
    },
    {
      id: "c3-c4",
      from: "c3",
      to: "c4",
    },
  ],
);

export const e2AntiPeriplanarMolecule = molecule(
  "e2-anti-periplanar-substrate",
  "Anti-periplanar E2 substrate",
  [
    {
      id: "c1",
      element: "C",
      position: { x: -115, y: 31 },
    },
    {
      id: "beta",
      element: "C",
      position: { x: -55, y: -17 },
    },
    {
      id: "alpha",
      element: "C",
      position: { x: 40, y: 0 },
    },
    {
      id: "c4",
      element: "C",
      position: { x: 105, y: -39 },
    },
    {
      id: "h",
      element: "H",
      label: "H",
      showLabel: true,
      position: { x: -77, y: -104 },
    },
    {
      id: "br",
      element: "Br",
      label: "Br",
      showLabel: true,
      colour: "#dc2626",
      position: { x: 71, y: 89 },
    },
  ],
  [
    {
      id: "c1-beta",
      from: "c1",
      to: "beta",
    },
    {
      id: "beta-alpha",
      from: "beta",
      to: "alpha",
    },
    {
      id: "alpha-c4",
      from: "alpha",
      to: "c4",
    },
    {
      id: "beta-h",
      from: "beta",
      to: "h",
      type: "wedge",
    },
    {
      id: "alpha-br",
      from: "alpha",
      to: "br",
      type: "dash",
      colour: "#dc2626",
    },
  ],
);

export const organoboraneMolecule = molecule(
  "propylborane",
  "Propylborane intermediate",
  [
    {
      id: "c1",
      element: "C",
      position: { x: -92, y: 28 },
    },
    {
      id: "c2",
      element: "C",
      position: { x: -34, y: -4 },
    },
    {
      id: "c3",
      element: "C",
      position: { x: 30, y: 28 },
    },
    {
      id: "b",
      element: "B",
      label: "BH₂",
      showLabel: true,
      colour: "#0891b2",
      position: { x: 108, y: -2 },
    },
    {
      id: "h",
      element: "H",
      label: "H",
      showLabel: true,
      colour: "#059669",
      position: { x: -34, y: -70 },
    },
  ],
  [
    {
      id: "c1-c2",
      from: "c1",
      to: "c2",
    },
    {
      id: "c2-c3",
      from: "c2",
      to: "c3",
    },
    {
      id: "c3-b",
      from: "c3",
      to: "b",
    },
    {
      id: "c2-h",
      from: "c2",
      to: "h",
    },
  ],
);

export const carbonRadicalIntermediateMolecule =
  molecule(
    "secondary-propyl-radical",
    "Secondary carbon radical intermediate",
    [
      {
        id: "c1",
        element: "C",
        position: { x: -92, y: 28 },
      },
      {
        id: "c2",
        element: "C",
        radical: true,
        colour: "#e11d48",
        position: { x: -34, y: -4 },
      },
      {
        id: "c3",
        element: "C",
        position: { x: 30, y: 28 },
      },
      {
        id: "br",
        element: "Br",
        label: "Br",
        showLabel: true,
        colour: "#dc2626",
        position: { x: 108, y: -2 },
      },
    ],
    [
      {
        id: "c1-c2",
        from: "c1",
        to: "c2",
      },
      {
        id: "c2-c3",
        from: "c2",
        to: "c3",
      },
      {
        id: "c3-br",
        from: "c3",
        to: "br",
      },
    ],
  );

export const mercuriniumIonMolecule = molecule(
  "mercurinium-ion",
  "Bridged mercurinium ion",
  [
    {
      id: "c1",
      element: "C",
      position: { x: -70, y: 30 },
    },
    {
      id: "c2",
      element: "C",
      position: { x: 10, y: -10 },
    },
    {
      id: "c3",
      element: "C",
      position: { x: 90, y: 30 },
    },
    {
      id: "hg",
      element: "Hg",
      label: "HgOAc",
      showLabel: true,
      charge: 1,
      colour: "#7c3aed",
      position: { x: 50, y: -90 },
    },
  ],
  [
    {
      id: "c1-c2",
      from: "c1",
      to: "c2",
    },
    {
      id: "c2-c3",
      from: "c2",
      to: "c3",
    },
    {
      id: "c2-hg",
      from: "c2",
      to: "hg",
      colour: "#7c3aed",
    },
    {
      id: "c3-hg",
      from: "c3",
      to: "hg",
      colour: "#7c3aed",
    },
  ],
);

export const organomercuryAlcoholMolecule =
  molecule(
    "organomercury-alcohol",
    "Organomercury alcohol",
    [
      {
        id: "c1",
        element: "C",
        position: { x: -92, y: 28 },
      },
      {
        id: "c2",
        element: "C",
        position: { x: -34, y: -4 },
      },
      {
        id: "c3",
        element: "C",
        position: { x: 30, y: 28 },
      },
      {
        id: "oh",
        element: "OH",
        label: "OH",
        showLabel: true,
        colour: "#2563eb",
        position: { x: -34, y: -72 },
      },
      {
        id: "hg",
        element: "Hg",
        label: "HgOAc",
        showLabel: true,
        colour: "#7c3aed",
        position: { x: 112, y: -12 },
      },
    ],
    [
      {
        id: "c1-c2",
        from: "c1",
        to: "c2",
      },
      {
        id: "c2-c3",
        from: "c2",
        to: "c3",
      },
      {
        id: "c2-oh",
        from: "c2",
        to: "oh",
      },
      {
        id: "c3-hg",
        from: "c3",
        to: "hg",
      },
    ],
  );

function dibromocyclohexane(
  id: string,
  name: string,
  cis: boolean,
) {
  const points = regularPolygonPoints({
    sides: 6,
    radius: 62,
  });

  return molecule(
    id,
    name,
    [
      ...points.map((position, index) => ({
        id: `c${index + 1}`,
        element: "C",
        position,
      })),
      {
        id: "br1",
        element: "Br",
        label: "Br",
        showLabel: true,
        colour: "#7c3aed",
        position: { x: 108, y: -67 },
      },
      {
        id: "br2",
        element: "Br",
        label: "Br",
        showLabel: true,
        colour: "#7c3aed",
        position: { x: 108, y: 78 },
      },
    ],
    [
      ...points.map((_, index) => ({
        id: `b${index + 1}`,
        from: `c${index + 1}`,
        to: `c${((index + 1) % 6) + 1}`,
      })),
      {
        id: "c2-br1",
        from: "c2",
        to: "br1",
        type: "wedge" as const,
        colour: "#7c3aed",
      },
      {
        id: "c3-br2",
        from: "c3",
        to: "br2",
        type: cis
          ? ("wedge" as const)
          : ("dash" as const),
        colour: "#7c3aed",
      },
    ],
  );
}

export const transDibromocyclohexaneMolecule =
  dibromocyclohexane(
    "trans-1-2-dibromocyclohexane",
    "trans-1,2-Dibromocyclohexane",
    false,
  );

export const cisDibromocyclohexaneMolecule =
  dibromocyclohexane(
    "cis-1-2-dibromocyclohexane",
    "cis-1,2-Dibromocyclohexane",
    true,
  );