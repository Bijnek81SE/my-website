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

  if (
    request.substrateClass === "alkene" &&
    request.reagentClass === "halogen" &&
    request.productClass === "vicinal-dihalide"
  ) {
    return "alkene-halogenation";
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

  if (family === "alkene-halogenation") {
    return {
      id,
      family,
      title: "Halogenation of alkenes",
      description:
        "Follow bromonium-ion formation, backside bromide attack, and anti addition.",
      accent: "violet",
      playbackInterval: 3000,
      geometry: { antiAddition: true },
      participants: [
        { role: "substrate", structureId: "cyclohexene" },
        { role: "electrophile", structureId: "bromine" },
        { role: "product", structureId: "trans-1-2-dibromocyclohexane" },
      ],
      steps: [
        { id: "identify-pi-bond", title: "The alkene π bond is the nucleophile", description: "The electron-rich π bond attacks bromine.", note: "The π bond is the electron source.", scene: "alkene", arrows: [] },
        { id: "bromonium-formation", title: "A cyclic bromonium ion forms", description: "The π bond attacks Br₂ as the Br–Br bond breaks.", note: "A bridged bromonium ion forms instead of a free carbocation.", scene: "bromonium-formation", arrows: [
          { id: "pi-to-bromine", start: { x: 220, y: 226 }, control: { x: 332, y: 105 }, end: { x: 490, y: 180 }, colour: "#7c3aed", label: "The alkene pi electrons attack bromine" },
          { id: "brbr-to-bromine", start: { x: 570, y: 194 }, control: { x: 610, y: 120 }, end: { x: 642, y: 180 }, colour: "#dc2626", label: "The bromine bromine bond electrons move to bromide" },
        ] },
        { id: "bromonium", title: "The bromonium ion blocks one face", description: "The bridge prevents attack from the same face.", note: "The cyclic bromonium ion explains anti addition.", scene: "bromonium", arrows: [] },
        { id: "bromide-attack", title: "Bromide opens the bromonium ion", description: "Bromide attacks from the opposite face while the bridge bond opens.", note: "Backside opening places the bromines on opposite faces.", scene: "bromide-attack", arrows: [
          { id: "bromide-to-carbon", start: { x: 566, y: 155 }, control: { x: 465, y: 304 }, end: { x: 340, y: 225 }, colour: "#dc2626", label: "Bromide attacks from the opposite face" },
          { id: "bridge-to-bromine", start: { x: 328, y: 190 }, control: { x: 318, y: 138 }, end: { x: 294, y: 132 }, colour: "#7c3aed", label: "The carbon bromine bridge bond opens" },
        ] },
        { id: "products", title: "The anti vicinal dibromide forms", description: "The two bromines finish on opposite faces.", note: "Cyclohexene + Br₂ gives trans-1,2-dibromocyclohexane.", scene: "products", arrows: [] },
      ],
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
