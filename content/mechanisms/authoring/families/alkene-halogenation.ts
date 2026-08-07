import { compileSemanticArrow } from "../family-geometry-engine";
import type {
  CompiledMechanismDefinition,
  MechanismGeometryContract,
  MechanismFamilyStep,
  SemanticArrowDefinition,
  StructurePlacement,
} from "../types";

const reactantPlacements: Readonly<Record<string, StructurePlacement>> = {
  alkene: {
    structureId: "cyclohexene",
    x: 245,
    y: 190,
    scale: 1.12,
  },
  bromine: {
    structureId: "bromine",
    x: 515,
    y: 194,
    scale: 1,
  },
};

const bromoniumPlacements: Readonly<Record<string, StructurePlacement>> = {
  bromonium: {
    structureId: "halogenation-bromonium",
    x: 0,
    y: 0,
    scale: 1,
  },
  bromide: {
    structureId: "bromide",
    x: 585,
    y: 214,
    scale: 1,
  },
};

const formationArrows: readonly SemanticArrowDefinition[] = [
  {
    id: "pi-to-bromine",
    source: {
      kind: "bond-midpoint",
      placementId: "alkene",
      bondId: "b4",
      offset: { x: 5, y: -16 },
    },
    target: {
      kind: "atom",
      placementId: "bromine",
      atomId: "br1",
      offset: { x: -25, y: -14 },
    },
    bend: -100.47,
    controlOffset: { x: -6.13, y: 1.04 },
    colour: "#7c3aed",
    label: "The alkene pi electrons attack bromine",
  },
  {
    id: "brbr-to-bromine",
    source: {
      kind: "bond-midpoint",
      placementId: "bromine",
      bondId: "br-br",
      offset: { x: -10, y: 0 },
    },
    target: {
      kind: "atom",
      placementId: "bromine",
      atomId: "br2",
      offset: { x: -3, y: -14 },
    },
    bend: -65,
    controlOffset: { x: 16.41, y: -3.19 },
    colour: "#dc2626",
    label: "The bromine bromine bond electrons move to bromide",
  },
];

const openingArrows: readonly SemanticArrowDefinition[] = [
  {
    id: "bromide-to-carbon",
    source: {
      kind: "lone-pair",
      placementId: "bromide",
      atomId: "br",
      lonePair: "upper-left",
      distance: 61.5,
      offset: { x: -2, y: 0 },
    },
    target: {
      kind: "atom",
      placementId: "bromonium",
      atomId: "c-right",
      offset: { x: -5, y: 5 },
    },
    bend: -112.45,
    controlOffset: { x: -21.27, y: 6.59 },
    colour: "#dc2626",
    label: "Bromide attacks from the opposite face",
  },
  {
    id: "bridge-to-bromine",
    source: {
      kind: "bond-midpoint",
      placementId: "bromonium",
      bondId: "right-bridge",
      offset: { x: 13, y: 17.5 },
    },
    target: {
      kind: "atom",
      placementId: "bromonium",
      atomId: "br-bridge",
      offset: { x: 9, y: 7 },
    },
    bend: 17.67,
    controlOffset: { x: -8.24, y: -14.06 },
    colour: "#7c3aed",
    label: "The carbon bromine bridge bond opens",
  },
];

const geometryContracts: readonly MechanismGeometryContract[] = [
  {
    type: "anti-addition",
    nucleophile: {
      kind: "atom",
      placementId: "bromide",
      atomId: "br",
    },
    attackedCenter: {
      kind: "atom",
      placementId: "bromonium",
      atomId: "c-right",
    },
    bridgeAtom: {
      kind: "atom",
      placementId: "bromonium",
      atomId: "br-bridge",
    },
    productRelationship: "opposite-faces",
  },
];

export function compileAlkeneHalogenationMechanism(): CompiledMechanismDefinition {
  const formation = formationArrows.map((definition) =>
    compileSemanticArrow({ definition, placements: reactantPlacements }),
  );
  const opening = openingArrows.map((definition) =>
    compileSemanticArrow({ definition, placements: bromoniumPlacements }),
  );

  const steps: readonly MechanismFamilyStep[] = [
    {
      id: "identify-pi-bond",
      title: "The alkene π bond is the nucleophile",
      description:
        "The electron-rich π bond of cyclohexene polarises bromine and attacks the electrophilic end of Br₂.",
      note: "Halogenation begins when the alkene π bond donates electrons to Br₂.",
      scene: "alkene",
      arrows: [],
    },
    {
      id: "bromonium-formation",
      title: "A cyclic bromonium ion forms",
      description:
        "The π bond attacks one bromine, the Br–Br bond breaks, and the attached bromine bridges both alkene carbons.",
      note:
        "No free carbocation forms; the positive charge is held in a three-membered bromonium ion.",
      scene: "bromonium-formation",
      arrows: formation,
    },
    {
      id: "bromonium",
      title: "The bromonium ion blocks one face",
      description:
        "The bridging bromine is bonded to both carbons. This prevents bromide from attacking from the same face.",
      note: "The cyclic bromonium ion explains why halogenation gives anti addition.",
      scene: "bromonium",
      arrows: [],
    },
    {
      id: "bromide-attack",
      title: "Bromide opens the bromonium ion",
      description:
        "Bromide attacks one carbon from the opposite face and breaks the carbon–bromine bridge bond.",
      note:
        "Backside attack opens the bromonium ion and places the two bromines on opposite faces.",
      scene: "bromide-attack",
      arrows: opening,
    },
    {
      id: "products",
      title: "The anti vicinal dibromide forms",
      description:
        "The two bromine atoms end up on adjacent carbons and opposite faces of the ring, giving trans-1,2-dibromocyclohexane.",
      note: "Overall: cyclohexene + Br₂ → trans-1,2-dibromocyclohexane.",
      scene: "products",
      arrows: [],
    },
  ];

  return {
    mechanismId: "halogenation",
    family: "alkene-halogenation",
    title: "Halogenation of alkenes",
    description:
      "Generated from semantic π-bond, Br–Br bond, bromide lone-pair, and bromonium-bridge anchors, then rendered by the existing trusted halogenation canvas.",
    accent: "violet",
    playbackInterval: 3000,
    steps,
    geometryContracts,
  };
}
