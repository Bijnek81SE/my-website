import type {
  PredictionChallenge,
  StructureSummary,
  SynthesisTarget,
  TransformationRule,
} from "./synthesis-types";

export const synthesisStructures: readonly StructureSummary[] = [
  { id: "propene", name: "Propene", formula: "C₃H₆", condensedFormula: "CH₃–CH=CH₂", functionalGroup: "Alkene" },
  { id: "2-bromopropane", name: "2-Bromopropane", formula: "C₃H₇Br", condensedFormula: "CH₃–CH(Br)–CH₃", functionalGroup: "Secondary alkyl halide" },
  { id: "1-bromopropane", name: "1-Bromopropane", formula: "C₃H₇Br", condensedFormula: "CH₃–CH₂–CH₂Br", functionalGroup: "Primary alkyl halide" },
  { id: "2-propanol", name: "2-Propanol", formula: "C₃H₈O", condensedFormula: "CH₃–CH(OH)–CH₃", functionalGroup: "Secondary alcohol" },
  { id: "1-propanol", name: "1-Propanol", formula: "C₃H₈O", condensedFormula: "CH₃–CH₂–CH₂OH", functionalGroup: "Primary alcohol" },
  { id: "1,2-dibromopropane", name: "1,2-Dibromopropane", formula: "C₃H₆Br₂", condensedFormula: "CH₃–CHBr–CH₂Br", functionalGroup: "Vicinal dihalide" },
  { id: "propane", name: "Propane", formula: "C₃H₈", condensedFormula: "CH₃–CH₂–CH₃", functionalGroup: "Alkane" },
  { id: "2-methylpropene", name: "2-Methylpropene", formula: "C₄H₈", condensedFormula: "(CH₃)₂C=CH₂", functionalGroup: "Alkene" },
  { id: "tert-butanol", name: "tert-Butanol", formula: "C₄H₁₀O", condensedFormula: "(CH₃)₃C–OH", functionalGroup: "Tertiary alcohol" },
  { id: "tert-butyl-bromide", name: "tert-Butyl bromide", formula: "C₄H₉Br", condensedFormula: "(CH₃)₃C–Br", functionalGroup: "Tertiary alkyl halide" },
];

export const predictionChallenges: readonly PredictionChallenge[] = [
  {
    id: "propene-hbr",
    title: "Hydrohalogenation of propene",
    difficulty: "Foundation",
    prompt: "Choose the conditions, major product, and mechanistic reason for adding HBr to propene by the ionic pathway.",
    substrate: synthesisStructures[0],
    reagentChoices: [
      { id: "hbr", label: "HBr", conditions: "No peroxide", role: "Electrophile and bromide source" },
      { id: "hbr-peroxide", label: "HBr, ROOR", conditions: "Radical initiator", role: "Anti-Markovnikov radical addition" },
      { id: "br2", label: "Br₂", conditions: "Inert solvent", role: "Halonium-ion formation" },
    ],
    productChoices: [
      { ...synthesisStructures[1], selectivityNote: "Markovnikov bromide" },
      { ...synthesisStructures[2], selectivityNote: "Anti-Markovnikov bromide" },
      { ...synthesisStructures[5], selectivityNote: "Vicinal dibromide" },
    ],
    reasoningChoices: [
      { id: "secondary-carbocation", label: "Protonation forms the more stable secondary carbocation before bromide capture." },
      { id: "primary-carbocation", label: "Protonation forms a primary carbocation because it is less substituted." },
      { id: "halonium", label: "A bridged bromonium ion directs anti addition." },
    ],
    correctReagentId: "hbr",
    correctProductId: "2-bromopropane",
    correctReasoningId: "secondary-carbocation",
    reactionId: "hydrohalogenation",
    mechanismHref: "/lab/hydrohalogenation",
    explanation: "The π bond is protonated to give the secondary carbocation. Bromide then attacks that carbocation, producing the Markovnikov alkyl bromide.",
    regioselectivity: "Markovnikov: bromine appears on the more substituted carbon.",
    stereochemistry: "Not stereospecific because the carbocation is planar.",
    commonMistake: "Peroxide changes the mechanism to a radical chain and reverses the regiochemistry for HBr.",
  },
  {
    id: "propene-hydroboration",
    title: "Hydroboration–oxidation of propene",
    difficulty: "Intermediate",
    prompt: "Predict the alcohol formed when propene undergoes hydroboration–oxidation.",
    substrate: synthesisStructures[0],
    reagentChoices: [
      { id: "bh3-h2o2", label: "1. BH₃·THF  2. H₂O₂, OH⁻", conditions: "Two-step workup", role: "Hydroboration followed by oxidation" },
      { id: "h2so4-water", label: "H₂O, H₂SO₄", conditions: "Aqueous acid", role: "Carbocation hydration" },
      { id: "hg-water", label: "1. Hg(OAc)₂, H₂O  2. NaBH₄", conditions: "Oxymercuration–demercuration", role: "Markovnikov hydration without rearrangement" },
    ],
    productChoices: [
      { ...synthesisStructures[4], selectivityNote: "Anti-Markovnikov alcohol" },
      { ...synthesisStructures[3], selectivityNote: "Markovnikov alcohol" },
      { ...synthesisStructures[6], selectivityNote: "Hydrogenation product" },
    ],
    reasoningChoices: [
      { id: "concerted-boron", label: "Concerted syn addition places boron at the less substituted carbon, then oxidation replaces B with OH." },
      { id: "free-carbocation", label: "A free secondary carbocation is trapped by hydroxide." },
      { id: "surface", label: "Both groups are delivered from a metal catalyst surface." },
    ],
    correctReagentId: "bh3-h2o2",
    correctProductId: "1-propanol",
    correctReasoningId: "concerted-boron",
    reactionId: "hydroboration-oxidation",
    mechanismHref: "/lab/hydroboration-oxidation",
    explanation: "Hydroboration is concerted and places boron at the less hindered carbon. Oxidation retains that carbon–boron connectivity, yielding 1-propanol.",
    regioselectivity: "Anti-Markovnikov alcohol.",
    stereochemistry: "Syn addition of H and OH overall.",
    commonMistake: "Do not apply carbocation stability: no free carbocation is formed.",
  },
  {
    id: "propene-bromination",
    title: "Bromination of propene",
    difficulty: "Intermediate",
    prompt: "Choose the correct product and explanation for treatment of propene with bromine.",
    substrate: synthesisStructures[0],
    reagentChoices: [
      { id: "br2", label: "Br₂", conditions: "CCl₄ or another inert solvent", role: "Electrophilic halogenation" },
      { id: "hbr", label: "HBr", conditions: "No peroxide", role: "Hydrohalogenation" },
      { id: "h2-pd", label: "H₂, Pd/C", conditions: "Catalytic surface", role: "Hydrogenation" },
    ],
    productChoices: [
      { ...synthesisStructures[5], selectivityNote: "Vicinal dibromide" },
      { ...synthesisStructures[1], selectivityNote: "Markovnikov bromide" },
      { ...synthesisStructures[6], selectivityNote: "Alkane" },
    ],
    reasoningChoices: [
      { id: "bromonium-anti", label: "A bromonium ion forms, followed by backside bromide attack and anti addition." },
      { id: "carbocation", label: "A secondary carbocation forms and bromide attacks either face." },
      { id: "radical", label: "A bromine radical adds first and starts a chain reaction." },
    ],
    correctReagentId: "br2",
    correctProductId: "1,2-dibromopropane",
    correctReasoningId: "bromonium-anti",
    reactionId: "halogenation",
    mechanismHref: "/lab/halogenation",
    explanation: "The alkene forms a bridged bromonium ion. Bromide opens the bridge from the opposite face, giving anti vicinal dibromination.",
    regioselectivity: "Both alkene carbons receive bromine.",
    stereochemistry: "Anti addition.",
    commonMistake: "Br₂ does not normally produce a free carbocation, so rearrangements are not expected.",
  },
  {
    id: "tertiary-substitution-elimination",
    title: "Choose substitution or elimination",
    difficulty: "Advanced",
    prompt: "tert-Butyl bromide reacts with warm aqueous ethanol. Predict the dominant pathway and major alkene-forming outcome.",
    substrate: synthesisStructures[9],
    reagentChoices: [
      { id: "warm-ethanol", label: "EtOH, heat", conditions: "Polar protic, weak base/nucleophile", role: "E1/SN1 conditions" },
      { id: "naoh-dmso", label: "NaOH, DMSO", conditions: "Strong nucleophile, polar aprotic", role: "SN2-favouring conditions" },
      { id: "tbuok", label: "KOtBu", conditions: "Strong bulky base", role: "E2 conditions" },
    ],
    productChoices: [
      { ...synthesisStructures[7], selectivityNote: "Elimination product" },
      { ...synthesisStructures[8], selectivityNote: "Hydrolysis product" },
      { ...synthesisStructures[9], selectivityNote: "No reaction" },
    ],
    reasoningChoices: [
      { id: "e1-heat", label: "Ionisation gives a tertiary carbocation; heat favours deprotonation to the alkene." },
      { id: "sn2-backside", label: "Ethanol performs backside attack on the tertiary carbon." },
      { id: "e2-strong-base", label: "A strong base removes a β proton in one concerted step." },
    ],
    correctReagentId: "warm-ethanol",
    correctProductId: "2-methylpropene",
    correctReasoningId: "e1-heat",
    reactionId: "e1",
    mechanismHref: "/lab/e1-mechanism",
    explanation: "The tertiary substrate ionises readily in a polar protic medium. Heating increases the importance of elimination, so E1 formation of 2-methylpropene is favoured.",
    regioselectivity: "Only one constitutional alkene is available in this symmetric substrate.",
    stereochemistry: "Not stereospecific.",
    commonMistake: "SN2 is strongly blocked at a tertiary carbon.",
  },
];

export const transformationRules: readonly TransformationRule[] = [
  { id: "propene-to-2-bromopropane", title: "Markovnikov bromination", fromStructureId: "propene", toStructureId: "2-bromopropane", reagents: "HBr", reactionId: "hydrohalogenation", rationale: "Ionic HX addition gives the more stable secondary carbocation." },
  { id: "propene-to-1-bromopropane", title: "Radical HBr addition", fromStructureId: "propene", toStructureId: "1-bromopropane", reagents: "HBr, ROOR", reactionId: "radical-hbr", rationale: "The radical chain gives anti-Markovnikov connectivity." },
  { id: "propene-to-2-propanol", title: "Markovnikov hydration", fromStructureId: "propene", toStructureId: "2-propanol", reagents: "H₂O, H₂SO₄", reactionId: "hydration", rationale: "Carbocation hydration places OH at the more substituted carbon." },
  { id: "propene-to-1-propanol", title: "Hydroboration–oxidation", fromStructureId: "propene", toStructureId: "1-propanol", reagents: "1. BH₃·THF  2. H₂O₂, OH⁻", reactionId: "hydroboration-oxidation", rationale: "Concerted hydroboration followed by oxidation gives the anti-Markovnikov alcohol." },
  { id: "propene-to-dibromide", title: "Vicinal dibromination", fromStructureId: "propene", toStructureId: "1,2-dibromopropane", reagents: "Br₂", reactionId: "halogenation", rationale: "A bromonium ion is opened by bromide." },
  { id: "propene-to-propane", title: "Catalytic hydrogenation", fromStructureId: "propene", toStructureId: "propane", reagents: "H₂, Pd/C", reactionId: "hydrogenation", rationale: "The alkene is reduced on a metal surface." },
  { id: "2-bromopropane-to-propene", title: "Dehydrohalogenation", fromStructureId: "2-bromopropane", toStructureId: "propene", reagents: "NaOEt, EtOH, heat", reactionId: "e2", rationale: "A strong base removes a β hydrogen as bromide leaves." },
  { id: "1-bromopropane-to-1-propanol", title: "Primary substitution", fromStructureId: "1-bromopropane", toStructureId: "1-propanol", reagents: "NaOH, aqueous", reactionId: "sn2", rationale: "Hydroxide attacks the unhindered primary carbon by SN2." },
  { id: "2-bromopropane-to-2-propanol", title: "Secondary substitution", fromStructureId: "2-bromopropane", toStructureId: "2-propanol", reagents: "H₂O, mild heat", reactionId: "sn1", rationale: "Ionisation and water capture replace bromide with hydroxyl." },
  { id: "1-propanol-to-1-bromopropane", title: "Convert alcohol to bromide", fromStructureId: "1-propanol", toStructureId: "1-bromopropane", reagents: "PBr₃", reactionId: "sn2", rationale: "PBr₃ activates the alcohol and bromide displaces by SN2." },
];

export const synthesisTargets: readonly SynthesisTarget[] = [
  { id: "propene-to-primary-alcohol", title: "Make 1-propanol from propene", difficulty: "Foundation", startStructureId: "propene", targetStructureId: "1-propanol", maxSteps: 2, recommendedStepIds: ["propene-to-1-propanol"], hint: "Choose a hydration method that places OH on the less substituted carbon." },
  { id: "propene-to-primary-bromide", title: "Make 1-bromopropane from propene", difficulty: "Intermediate", startStructureId: "propene", targetStructureId: "1-bromopropane", maxSteps: 2, recommendedStepIds: ["propene-to-1-bromopropane"], hint: "The peroxide effect applies specifically to HBr." },
  { id: "secondary-bromide-to-primary-alcohol", title: "Convert 2-bromopropane to 1-propanol", difficulty: "Advanced", startStructureId: "2-bromopropane", targetStructureId: "1-propanol", maxSteps: 3, recommendedStepIds: ["2-bromopropane-to-propene", "propene-to-1-propanol"], hint: "First create an alkene, then control hydration regiochemistry." },
];

export function getSynthesisStructure(id: string): StructureSummary | undefined {
  return synthesisStructures.find((structure) => structure.id === id);
}
