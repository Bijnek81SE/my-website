import { compileSemanticArrow } from "./family-geometry-engine";
import type {
  CompiledMechanismDefinition,
  MechanismGeometryContract,
  MechanismFamilyStep,
  SemanticArrowDefinition,
  StructurePlacement,
} from "./types";

const sn2Placements: Readonly<Record<string, StructurePlacement>> = {
  nucleophile: {
    structureId: "hydroxide",
    x: 170,
    y: 198,
    scale: 1.15,
  },
  substrate: {
    structureId: "methyl-bromide",
    x: 430,
    y: 198,
    scale: 1.05,
  },
};

const sn2AttackArrow: SemanticArrowDefinition = {
  id: "attack",
  source: {
    kind: "lone-pair",
    placementId: "nucleophile",
    atomId: "o",
    lonePair: "upper-right",
    distance: 38,
    offset: { x: -2, y: 4 },
  },
  target: {
    kind: "atom",
    placementId: "substrate",
    atomId: "c",
    offset: { x: -13, y: -11 },
  },
  bend: -56,
  colour: "#2563eb",
  label: "Hydroxide lone pair attacks the methyl carbon",
};

const sn2DepartureArrow: SemanticArrowDefinition = {
  id: "departure",
  source: {
    kind: "bond-midpoint",
    placementId: "substrate",
    bondId: "c-br",
    offset: { x: -0.5, y: -10 },
  },
  target: {
    kind: "atom",
    placementId: "substrate",
    atomId: "br",
    offset: { x: 9, y: -24 },
  },
  bend: -35,
  colour: "#dc2626",
  label: "Carbon bromine bond electrons move to bromine",
};

const sn2Geometry: readonly MechanismGeometryContract[] = [
  {
    type: "backside-attack",
    nucleophile: {
      kind: "atom",
      placementId: "nucleophile",
      atomId: "o",
    },
    center: {
      kind: "atom",
      placementId: "substrate",
      atomId: "c",
    },
    leavingGroup: {
      kind: "atom",
      placementId: "substrate",
      atomId: "br",
    },
    expectedDegrees: 180,
    toleranceDegrees: 3,
  },
];

const e2Placements: Readonly<Record<string, StructurePlacement>> = {
  base: {
    structureId: "hydroxide",
    x: 120,
    y: 198,
    scale: 1.15,
  },
  substrate: {
    structureId: "e2-anti-periplanar-substrate",
    x: 409,
    y: 205,
    scale: 1,
  },
};

const e2Arrows: readonly SemanticArrowDefinition[] = [
  {
    id: "base-to-hydrogen",
    source: {
      kind: "lone-pair",
      placementId: "base",
      atomId: "o",
      lonePair: "upper-right",
      distance: 38,
      offset: { x: -3, y: -1 },
    },
    target: {
      kind: "atom",
      placementId: "substrate",
      atomId: "h",
      offset: { x: -6, y: 3 },
    },
    bend: -48,
    colour: "#2563eb",
    label: "Base lone pair removes the beta hydrogen",
  },
  {
    id: "ch-to-pi",
    source: {
  kind: "bond-midpoint",
  placementId: "substrate",
  bondId: "beta-h",
  offset: { x: -1, y: 0 },
},
    target: {
      kind: "bond-midpoint",
      placementId: "substrate",
      bondId: "beta-alpha",
      offset: { x: -2, y: -7 },
    },
    bend: 25,
    colour: "#7c3aed",
    label: "Carbon hydrogen bond electrons form the carbon carbon pi bond",
  },
  {
    id: "cbr-to-br",
    source: {
      kind: "bond-midpoint",
      placementId: "substrate",
      bondId: "alpha-br",
    },
    target: {
      kind: "atom",
      placementId: "substrate",
      atomId: "br",
      offset: { x: 0, y: -5 },
    },
    bend: 28,
    colour: "#dc2626",
    label: "Carbon bromine bond electrons move to bromine",
  },
];

const e2Geometry: readonly MechanismGeometryContract[] = [
  {
    type: "anti-periplanar",
    firstBond: {
      kind: "bond-midpoint",
      placementId: "substrate",
      bondId: "beta-h",
    },
    secondBond: {
      kind: "bond-midpoint",
      placementId: "substrate",
      bondId: "alpha-br",
    },
    expectedDegrees: 180,
    toleranceDegrees: 8,
  },
];

export function compileSn2Mechanism(): CompiledMechanismDefinition {
  const attack = compileSemanticArrow({ definition: sn2AttackArrow, placements: sn2Placements });
  const departure = compileSemanticArrow({ definition: sn2DepartureArrow, placements: sn2Placements });

  const steps: readonly MechanismFamilyStep[] = [
    {
      id: "identify-nucleophile",
      title: "Identify the nucleophile",
      description: "Hydroxide carries a negative charge and a lone pair, making it electron-rich and able to attack the electrophilic carbon.",
      note: "The lone pair on oxygen is the electron source.",
      scene: "nucleophile",
      arrows: [],
    },
    {
      id: "backside-attack",
      title: "Backside attack begins",
      description: "The hydroxide lone pair attacks the carbon from the side opposite bromine. The new C–O bond begins forming.",
      note: "SN2 reactions use backside attack at the electrophilic carbon.",
      scene: "substrate",
      arrows: [attack],
    },
    {
      id: "bond-breaking",
      title: "The leaving-group bond breaks",
      description: "As the C–O bond forms, the C–Br bond electrons move onto bromine. Bond formation and bond breaking occur together.",
      note: "SN2 is concerted: both electron movements happen in one step.",
      scene: "leaving-group",
      arrows: [attack, departure],
    },
    {
      id: "products",
      title: "Products form",
      description: "Methanol is formed and bromide leaves with the electron pair from the original C–Br bond.",
      note: "Overall: HO⁻ + CH₃Br → CH₃OH + Br⁻",
      scene: "product",
      arrows: [],
    },
  ];

  return {
    family: "sn2",
    title: "SN2 substitution",
    description: "Generated from semantic electron sources, sinks, and an SN2 backside-attack geometry contract, then rendered by the existing trusted SN2 canvas.",
    accent: "blue",
    playbackInterval: 2600,
    steps,
    geometryContracts: sn2Geometry,
  };
}

export function compileE2Mechanism(): CompiledMechanismDefinition {
  const arrows = e2Arrows.map((definition) =>
    compileSemanticArrow({ definition, placements: e2Placements }),
  );

  const steps: readonly MechanismFamilyStep[] = [
    {
      id: "alignment",
      title: "Find an anti-periplanar β-hydrogen",
      description: "The strong base must remove a β-hydrogen that is anti-periplanar to the leaving group. This alignment allows the C–H σ bond to overlap with the developing π bond as the C–Br bond breaks.",
      note: "E2 stereochemistry is controlled by the anti-periplanar arrangement.",
      scene: "alignment",
      arrows: [],
    },
    {
      id: "concerted",
      title: "Three electron movements occur together",
      description: "The base removes the β-hydrogen, the C–H bond electrons form the C=C π bond, and the C–Br bond electrons move onto bromine. All three changes occur in one concerted step.",
      note: "E2 has one transition state and no carbocation intermediate.",
      scene: "concerted",
      arrows,
    },
    {
      id: "products",
      title: "The alkene forms",
      description: "The reaction produces an alkene, the conjugate acid of the base, and bromide. The leaving group and β-hydrogen are removed from adjacent carbons.",
      note: "Overall: strong base + alkyl bromide → alkene + conjugate acid + Br⁻",
      scene: "products",
      arrows: [],
    },
  ];

  return {
    family: "e2",
    title: "E2 elimination",
    description: "Generated from semantic atom/bond anchors and an E2 anti-periplanar geometry contract, then rendered by the existing trusted E2 canvas.",
    accent: "orange",
    playbackInterval: 3000,
    steps,
    geometryContracts: e2Geometry,
  };
}
