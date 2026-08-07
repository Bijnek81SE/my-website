import { defineMolecule, type MoleculeDefinition, type MoleculeRelation, type MoleculeStructure } from "./molecule-types";

const alkeneReagentRelations: readonly MoleculeRelation[] = [
  { id: "hydrogen-chloride", description: "Adds HCl by the classical Markovnikov carbocation pathway." },
  { id: "hydrogen-bromide", description: "Adds HBr by the classical Markovnikov carbocation pathway when peroxide is absent." },
  { id: "hydrogen-iodide", description: "Adds HI by the classical ionic Markovnikov pathway." },
  { id: "bromine", description: "Adds across C=C through a bromonium ion to give anti vicinal dibromination." },
  { id: "chlorine", description: "Adds across C=C through a chloronium ion to give anti vicinal dichlorination." },
  { id: "sulfuric-acid", description: "Catalyses Markovnikov hydration when water is present." },
  { id: "hydrogen-palladium", description: "Reduces the double bond to the corresponding alkane by syn surface hydrogenation." },
  { id: "borane-peroxide", description: "Converts the alkene to an anti-Markovnikov alcohol by syn hydroboration–oxidation." },
  { id: "hbr-peroxide", description: "Adds HBr by a radical chain pathway to give anti-Markovnikov regiochemistry." },
  { id: "mcpba", description: "Transfers an oxygen atom to the alkene in a concerted epoxidation." },
  { id: "osmium-tetroxide", description: "Adds two hydroxyl groups syn through a cyclic osmate ester." },
  { id: "ozone", description: "Cleaves the alkene through ozonide formation during ozonolysis." },
  { id: "potassium-permanganate", description: "Oxidises the alkene; conditions determine syn dihydroxylation or oxidative cleavage." },
];

const alkeneReactionRelations: readonly MoleculeRelation[] = [
  { id: "hydrohalogenation", description: "Adds HX across the alkene; the ionic pathway is usually Markovnikov." },
  { id: "hydration", description: "Adds water under acid catalysis to form a Markovnikov alcohol." },
  { id: "halogenation", description: "Adds Br₂ or Cl₂ anti through a bridged halonium ion." },
  { id: "hydrogenation", description: "Reduces C=C to C–C by syn addition of hydrogen on a metal surface." },
  { id: "hydroboration-oxidation", description: "Forms an anti-Markovnikov alcohol with syn stereochemistry." },
  { id: "oxymercuration-demercuration", description: "Forms a Markovnikov alcohol without carbocation rearrangement." },
  { id: "radical-hbr", description: "Gives anti-Markovnikov HBr addition under radical conditions." },
  { id: "epoxidation", description: "Converts the C=C bond directly to a three-membered epoxide." },
  { id: "syn-dihydroxylation", description: "Adds two OH groups to the same face of the alkene." },
  { id: "anti-dihydroxylation", description: "Gives an anti vicinal diol through epoxidation followed by acid-catalysed ring opening." },
  { id: "ozonolysis", description: "Cleaves C=C to carbonyl compounds under reductive workup." },
  { id: "oxidative-cleavage", description: "Strong oxidation cleaves C=C and oxidises eligible fragments further." },
];

const alkeneLabRelations: readonly MoleculeRelation[] = [
  { id: "electrophilic-addition", description: "Review why the alkene π bond acts as a nucleophile." },
  { id: "hydrohalogenation", description: "Follow Markovnikov protonation and carbocation capture." },
  { id: "halogenation", description: "Explore halonium-ion formation and anti addition." },
  { id: "hydroboration-oxidation", description: "Explore concerted syn hydroboration and anti-Markovnikov oxidation." },
  { id: "epoxidation", description: "Follow concerted peracid oxygen transfer to an alkene." },
  { id: "syn-dihydroxylation", description: "Study cyclic osmate-ester formation and syn dihydroxylation." },
  { id: "ozonolysis", description: "Trace ozonide formation and reductive carbonyl cleavage." },
  { id: "reaction-prediction-lab", label: "Reaction prediction", description: "Practise alkene product, regioselectivity, and stereochemistry decisions." },
  { id: "retrosynthesis-planner", label: "Retrosynthesis planner", description: "Use alkene functionalisation and alkene-forming eliminations in route planning." },
];

const alkeneLessonRelations: readonly MoleculeRelation[] = [
  { id: "chemical-bonding", description: "Review the sigma-plus-pi bonding model of C=C." },
  { id: "hybridization", description: "Connect sp² hybridisation with trigonal-planar alkene geometry." },
  { id: "resonance", description: "Prepare for carbocation stability, allylic stabilisation, and electron-flow reasoning." },
];

type AlkeneMoleculeInput = {
  id: string;
  name: string;
  aliases?: readonly string[];
  formula: string;
  displayFormula: string;
  condensedFormula: string;
  smiles?: string;
  structure: MoleculeStructure;
  summary: string;
  preferredMechanismFeatureId?: string;
  reactionPrediction?: boolean;
  predictionChallengeId?: string;
};

export function defineAlkeneMolecule(input: AlkeneMoleculeInput): MoleculeDefinition {
  return defineMolecule({
    id: input.id,
    name: input.name,
    aliases: input.aliases ?? [],
    formula: input.formula,
    displayFormula: input.displayFormula,
    condensedFormula: input.condensedFormula,
    smiles: input.smiles,
    structure: input.structure,
    primaryFunctionalGroupId: "alkene",
    functionalGroupIds: ["alkene"],
    reagentRelations: alkeneReagentRelations,
    reactionRelations: alkeneReactionRelations,
    labRelations: alkeneLabRelations,
    lessonRelations: alkeneLessonRelations,
    capabilities: {
      workspace: true,
      spectroscopy: false,
      reactionPrediction: input.reactionPrediction ?? false,
      retrosynthesis: true,
      calculations: true,
    },
    workspace: {
      functionalGroupLabel: "Alkene",
      summary: input.summary,
      predictionChallengeId: input.predictionChallengeId,
      preferredMechanismFeatureId: input.preferredMechanismFeatureId ?? "electrophilic-addition",
    },
  });
}
