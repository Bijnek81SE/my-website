import type {
  CompiledMechanismDefinition,
  MechanismAuthoringRequest,
  MechanismFamilyStep,
  SupportedMechanismFamily,
} from "./mechanism-authoring-types";

const SN2_STEPS: readonly MechanismFamilyStep[] = [
  {
    id: "identify-nucleophile",
    title: "Identify the nucleophile",
    description:
      "Hydroxide carries a negative charge and a lone pair, making it electron-rich and able to attack the electrophilic carbon.",
    note: "The lone pair on oxygen is the electron source.",
    scene: "nucleophile",
    arrows: [],
  },
  {
    id: "backside-attack",
    title: "Backside attack begins",
    description:
      "The hydroxide lone pair attacks the carbon from the side opposite bromine. The new C–O bond begins forming.",
    note: "SN2 reactions use backside attack at the electrophilic carbon.",
    scene: "substrate",
    arrows: [
      {
        id: "attack",
        start: { x: 180, y: 160 },
        control: { x: 275, y: 92 },
        end: { x: 373, y: 187 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
    ],
  },
  {
    id: "bond-breaking",
    title: "The leaving-group bond breaks",
    description:
      "As the C–O bond forms, the C–Br bond electrons move onto bromine. Bond formation and bond breaking occur together.",
    note: "SN2 is concerted: both electron movements happen in one step.",
    scene: "leaving-group",
    arrows: [
      {
        id: "attack",
        start: { x: 180, y: 160 },
        control: { x: 275, y: 92 },
        end: { x: 373, y: 187 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
      {
        id: "departure",
        start: { x: 440, y: 188 },
        control: { x: 485, y: 124 },
        end: { x: 504, y: 174 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "Products form",
    description:
      "Methanol is formed and bromide leaves with the electron pair from the original C–Br bond.",
    note: "Overall: HO⁻ + CH₃Br → CH₃OH + Br⁻",
    scene: "product",
    arrows: [],
  },
];

const E2_STEPS: readonly MechanismFamilyStep[] = [
  {
    id: "alignment",
    title: "Find an anti-periplanar β-hydrogen",
    description:
      "The strong base must remove a β-hydrogen that is anti-periplanar to the leaving group. This alignment allows the C–H σ bond to overlap with the developing π bond as the C–Br bond breaks.",
    note: "E2 stereochemistry is controlled by the anti-periplanar arrangement.",
    scene: "alignment",
    arrows: [],
  },
  {
    id: "concerted",
    title: "Three electron movements occur together",
    description:
      "The base removes the β-hydrogen, the C–H bond electrons form the C=C π bond, and the C–Br bond electrons move onto bromine. All three changes occur in one concerted step.",
    note: "E2 has one transition state and no carbocation intermediate.",
    scene: "concerted",
    arrows: [
      {
        id: "base-to-hydrogen",
        start: { x: 129, y: 155 },
        control: { x: 220, y: 76 },
        end: { x: 326, y: 104 },
        colour: "#2563eb",
        label: "Base lone pair removes the beta hydrogen",
      },
      {
        id: "ch-to-pi",
        start: { x: 342, y: 145 },
        control: { x: 374, y: 132 },
        end: { x: 400, y: 190 },
        colour: "#7c3aed",
        label: "Carbon hydrogen bond electrons form the carbon carbon pi bond",
      },
      {
        id: "cbr-to-br",
        start: { x: 465, y: 250 },
        control: { x: 512, y: 248 },
        end: { x: 480, y: 289 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "The alkene forms",
    description:
      "The reaction produces an alkene, the conjugate acid of the base, and bromide. The leaving group and β-hydrogen are removed from adjacent carbons.",
    note: "Overall: strong base + alkyl bromide → alkene + conjugate acid + Br⁻",
    scene: "products",
    arrows: [],
  },
];

export function resolveMechanismFamily(
  request: MechanismAuthoringRequest,
): SupportedMechanismFamily | undefined {
  if (
    request.substrateClass === "primary-alkyl-halide" &&
    request.reagentClass === "strong-nucleophile" &&
    request.productClass === "substitution-product"
  ) {
    return "sn2";
  }

  if (
    request.substrateClass === "secondary-alkyl-halide" &&
    request.reagentClass === "strong-base" &&
    request.productClass === "alkene"
  ) {
    return "e2";
  }

  return undefined;
}

export function compileMechanismRequest(
  id: string,
  request: MechanismAuthoringRequest,
): CompiledMechanismDefinition | undefined {
  const family = resolveMechanismFamily(request);

  if (family === "sn2") {
    return {
      id,
      family,
      title: "SN2 substitution",
      description:
        "Follow the electron movement from nucleophile attack to leaving-group departure.",
      accent: "blue",
      playbackInterval: 2600,
      geometry: { backsideAttackDegrees: 180 },
      participants: [
        { role: "nucleophile", structureId: "hydroxide" },
        { role: "substrate", structureId: "methyl-bromide" },
        { role: "product", structureId: "methanol" },
        { role: "leaving-group", label: "Br⁻" },
      ],
      steps: SN2_STEPS,
    };
  }

  if (family === "e2") {
    return {
      id,
      family,
      title: "E2 elimination",
      description:
        "Follow β-hydrogen abstraction, π-bond formation, and leaving-group departure in one concerted step.",
      accent: "orange",
      playbackInterval: 3000,
      geometry: { antiPeriplanarDihedralDegrees: 180 },
      participants: [
        { role: "base", structureId: "hydroxide" },
        { role: "substrate", structureId: "e2-anti-periplanar-substrate" },
        { role: "conjugate-acid", structureId: "water" },
        { role: "product", structureId: "2-butene" },
        { role: "leaving-group", label: "Br⁻" },
      ],
      steps: E2_STEPS,
    };
  }

  return undefined;
}

export const mechanismAuthoringExamples = {
  sn2: compileMechanismRequest("generated-sn2", {
    substrateClass: "primary-alkyl-halide",
    reagentClass: "strong-nucleophile",
    productClass: "substitution-product",
    nucleophileId: "hydroxide",
    leavingGroupId: "bromide",
  }),
  e2: compileMechanismRequest("generated-e2", {
    substrateClass: "secondary-alkyl-halide",
    reagentClass: "strong-base",
    productClass: "alkene",
    nucleophileId: "hydroxide",
    leavingGroupId: "bromide",
  }),
} as const;
