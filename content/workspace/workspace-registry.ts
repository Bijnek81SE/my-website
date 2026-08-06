import type { WorkspaceMolecule, WorkspaceSnapshot, WorkspaceTab } from "./workspace-types";

export const workspaceTabs: readonly { id: WorkspaceTab; label: string; description: string }[] = [
  { id: "overview", label: "Overview", description: "Identity, formula, functional group, and connected tools." },
  { id: "spectra", label: "Spectra", description: "Open the linked spectroscopy dataset and assignments." },
  { id: "reaction", label: "Reaction", description: "Continue into prediction, synthesis, or a mechanism lab." },
  { id: "calculations", label: "Calculations", description: "Scale the selected molecule and inspect mass and amount." },
  { id: "notes", label: "Notes", description: "Keep browser-local observations for this workspace." },
];

export const workspaceMolecules: readonly WorkspaceMolecule[] = [
  {
    id: "ethanol",
    name: "Ethanol",
    formula: "C2H6O",
    condensedFormula: "CH3CH2OH",
    functionalGroup: "Primary alcohol",
    summary: "A compact reference molecule for linking structure, molar mass, and a complete four-technique spectroscopy dataset.",
    spectroscopyCompoundId: "ethanol",
    knowledge: {
      functionalGroup: { label: "Alcohol", href: "/functional-groups/alcohol", description: "Hydroxyl-group bonding, polarity, acidity, and characteristic reactions." },
      reagents: [
        { label: "Sulfuric acid", href: "/reagents/sulfuric-acid", description: "Acid catalyst for alcohol dehydration and related proton-transfer chemistry." },
      ],
      labs: [
        { label: "Spectroscopy lab", href: "/lab/spectroscopy?compound=ethanol", description: "Connect ethanol structure to its NMR, IR, and mass signals." },
        { label: "Reaction prediction", href: "/lab/reaction-prediction", description: "Practise choosing conditions and products from mechanistic evidence." },
      ],
      reactions: [
        { label: "Alcohol dehydration and substitution", href: "/reactions", description: "Compare pathways that activate the C–O bond or remove water." },
      ],
      lessons: [
        { label: "Chemical bonding", href: "/learn/fundamentals/chemical-bonding", description: "Review polar bonds, lone pairs, and hydrogen bonding." },
      ],
    },
  },
  {
    id: "acetone",
    name: "Acetone",
    formula: "C3H6O",
    condensedFormula: "(CH3)2CO",
    functionalGroup: "Ketone",
    summary: "A symmetric carbonyl compound with a diagnostic IR absorption and simple NMR pattern.",
    spectroscopyCompoundId: "acetone",
    knowledge: {
      functionalGroup: { label: "Carbonyl", href: "/functional-groups/carbonyl", description: "Explore the polar C=O bond and its electrophilic carbon." },
      reagents: [
        { label: "Sulfuric acid", href: "/reagents/sulfuric-acid", description: "Strong acid that protonates carbonyl oxygen in acid-catalysed chemistry." },
      ],
      labs: [
        { label: "Spectroscopy lab", href: "/lab/spectroscopy?compound=acetone", description: "Inspect acetone's carbonyl IR band and symmetric NMR signals." },
        { label: "Curved-arrow designer", href: "/lab/curved-arrow-designer", description: "Practise electron flow at a polar carbonyl group." },
      ],
      reactions: [
        { label: "Carbonyl reaction context", href: "/reactions", description: "Use the reaction explorer to compare mechanism classes and selectivity." },
      ],
      lessons: [
        { label: "Formal charge", href: "/learn/fundamentals/formal-charge", description: "Track oxygen protonation and charged intermediates correctly." },
        { label: "Resonance", href: "/learn/fundamentals/resonance", description: "Connect carbonyl polarization to resonance contributors." },
      ],
    },
  },
  {
    id: "ethyl-acetate",
    name: "Ethyl acetate",
    formula: "C4H8O2",
    condensedFormula: "CH3CO2CH2CH3",
    functionalGroup: "Ester",
    summary: "A useful multi-environment molecule for connecting carbonyl spectroscopy, splitting, and quantitative work.",
    spectroscopyCompoundId: "ethyl-acetate",
    knowledge: {
      functionalGroup: { label: "Carbonyl", href: "/functional-groups/carbonyl", description: "Esters contain a carbonyl whose reactivity is modified by the adjacent oxygen." },
      reagents: [
        { label: "Sulfuric acid", href: "/reagents/sulfuric-acid", description: "Catalyst for esterification and acid-catalysed ester hydrolysis." },
      ],
      labs: [
        { label: "Spectroscopy lab", href: "/lab/spectroscopy?compound=ethyl-acetate", description: "Assign the ester carbonyl, ethyl splitting, and molecular ion." },
        { label: "Stoichiometry calculator", href: "/calculators/stoichiometry", description: "Scale ester-forming reactions and theoretical product amounts." },
      ],
      reactions: [
        { label: "Carbonyl and acyl chemistry", href: "/reactions", description: "Compare reaction families involving electrophilic carbonyl carbon." },
      ],
      lessons: [
        { label: "Resonance", href: "/learn/fundamentals/resonance", description: "Understand donation from ester oxygen into the carbonyl system." },
        { label: "Chemical bonding", href: "/learn/fundamentals/chemical-bonding", description: "Review sigma and pi bonding in the ester group." },
      ],
    },
  },
  {
    id: "toluene",
    name: "Toluene",
    formula: "C7H8",
    condensedFormula: "C6H5CH3",
    functionalGroup: "Aromatic hydrocarbon",
    summary: "An aromatic reference molecule for resonance, ring-current shifts, and benzylic substitution context.",
    spectroscopyCompoundId: "toluene",
    knowledge: {
      functionalGroup: { label: "Aromatic ring", href: "/functional-groups/aromatic-ring", description: "Conjugation, resonance stabilization, and aromatic structure." },
      reagents: [
        { label: "Hydrogen with palladium", href: "/reagents/hydrogen-palladium", description: "A forcing reduction system that can hydrogenate aromatic rings." },
      ],
      labs: [
        { label: "Spectroscopy lab", href: "/lab/spectroscopy?compound=toluene", description: "Relate aromatic and benzylic environments to spectral evidence." },
        { label: "Molecule playground", href: "/lab/molecule-playground", description: "Explore aromatic geometry and connectivity." },
      ],
      reactions: [
        { label: "Aromatic reaction context", href: "/reactions", description: "Compare aromatic and non-aromatic mechanism families." },
      ],
      lessons: [
        { label: "Resonance", href: "/learn/fundamentals/resonance", description: "Build the conceptual foundation for aromatic stabilization." },
        { label: "Hybridization", href: "/learn/fundamentals/hybridization", description: "Review sp² carbon geometry around the ring." },
      ],
    },
  },
  {
    id: "propene",
    name: "Propene",
    formula: "C3H6",
    condensedFormula: "CH3CH=CH2",
    functionalGroup: "Alkene",
    summary: "The shared starting point for hydrohalogenation, hydration, halogenation, hydrogenation, and synthesis-planning exercises.",
    predictionChallengeId: "propene-hbr",
    mechanismHref: "/lab/hydrohalogenation",
    knowledge: {
      functionalGroup: { label: "Alkene", href: "/functional-groups/alkene", description: "Pi-bond nucleophilicity, sp² geometry, and addition reactions." },
      reagents: [
        { label: "Bromine", href: "/reagents/bromine", description: "Forms a vicinal dibromide through a bromonium ion." },
        { label: "Borane / peroxide", href: "/reagents/borane-peroxide", description: "Gives anti-Markovnikov, syn hydration without rearrangement." },
        { label: "Sulfuric acid", href: "/reagents/sulfuric-acid", description: "Catalyses Markovnikov hydration through carbocation chemistry." },
        { label: "Hydrogen with palladium", href: "/reagents/hydrogen-palladium", description: "Reduces the C=C bond to propane." },
        { label: "HBr with peroxide", href: "/reagents/hbr-peroxide", description: "Produces anti-Markovnikov radical addition of HBr." },
      ],
      labs: [
        { label: "Hydrohalogenation", href: "/lab/hydrohalogenation", description: "Follow Markovnikov ionic HBr addition step by step." },
        { label: "Hydroboration–oxidation", href: "/lab/hydroboration-oxidation", description: "Explore anti-Markovnikov, syn hydration." },
        { label: "Halogenation", href: "/lab/halogenation", description: "See bromonium-ion formation and anti addition." },
        { label: "Reaction prediction", href: "/lab/reaction-prediction", description: "Predict products and explain selectivity." },
        { label: "Retrosynthesis planner", href: "/lab/retrosynthesis", description: "Use propene as a strategic precursor in backward planning." },
      ],
      reactions: [
        { label: "Hydrohalogenation", href: "/reactions", description: "Markovnikov HX addition through a carbocation." },
        { label: "Hydration", href: "/reactions", description: "Compare Markovnikov and anti-Markovnikov routes to alcohols." },
        { label: "Halogenation", href: "/reactions", description: "Anti addition through a bridged halonium ion." },
        { label: "Hydrogenation", href: "/reactions", description: "Syn reduction on a metal surface." },
      ],
      lessons: [
        { label: "Chemical bonding", href: "/learn/fundamentals/chemical-bonding", description: "Review sigma and pi bonds in C=C." },
        { label: "Hybridization", href: "/learn/fundamentals/hybridization", description: "Understand trigonal-planar sp² alkene carbons." },
        { label: "Resonance", href: "/learn/fundamentals/resonance", description: "Prepare for carbocation stability and delocalization." },
      ],
    },
  },
  {
    id: "2-bromopropane",
    name: "2-Bromopropane",
    formula: "C3H7Br",
    condensedFormula: "CH3CH(Br)CH3",
    functionalGroup: "Secondary alkyl halide",
    summary: "A substitution/elimination substrate and synthesis-planning intermediate connected to the prediction engine.",
    predictionChallengeId: "tertiary-substitution-elimination",
    mechanismHref: "/lab/e2-mechanism",
    knowledge: {
      functionalGroup: { label: "Alkyl halide", href: "/functional-groups/alkyl-halide", description: "Polar C–Br bonding, leaving-group ability, substitution, and elimination." },
      reagents: [
        { label: "Hydroxide", href: "/reagents/hydroxide", description: "Acts as a nucleophile or base depending on solvent and temperature." },
      ],
      labs: [
        { label: "SN1 mechanism", href: "/lab/sn1-mechanism", description: "Explore ionization and carbocation capture." },
        { label: "SN2 mechanism", href: "/lab/sn2-mechanism", description: "Compare backside attack and steric effects." },
        { label: "E1 mechanism", href: "/lab/e1-mechanism", description: "Follow stepwise carbocation elimination." },
        { label: "E2 mechanism", href: "/lab/e2-mechanism", description: "See concerted anti-periplanar elimination." },
        { label: "Reaction prediction", href: "/lab/reaction-prediction", description: "Choose substitution or elimination conditions." },
        { label: "Retrosynthesis planner", href: "/lab/retrosynthesis", description: "Use this substrate in a multi-step route to 1-propanol." },
      ],
      reactions: [
        { label: "SN1 substitution", href: "/reactions", description: "Stepwise substitution through a carbocation." },
        { label: "SN2 substitution", href: "/reactions", description: "Concerted substitution with backside attack." },
        { label: "E1 elimination", href: "/reactions", description: "Stepwise alkene formation from a carbocation." },
        { label: "E2 elimination", href: "/reactions", description: "Concerted elimination promoted by a strong base." },
      ],
      lessons: [
        { label: "Chemical bonding", href: "/learn/fundamentals/chemical-bonding", description: "Understand C–Br polarization and bond cleavage." },
        { label: "Hybridization", href: "/learn/fundamentals/hybridization", description: "Compare sp³ substrate geometry with sp² alkene products." },
        { label: "Resonance", href: "/learn/fundamentals/resonance", description: "Review when carbocations can be stabilized by delocalization." },
      ],
    },
  },
] as const;

export const defaultWorkspaceSnapshot: WorkspaceSnapshot = {
  moleculeId: "ethanol",
  activeTab: "overview",
  amountMmol: 10,
  notes: "",
  updatedAt: "",
};

export function getWorkspaceMolecule(id: string): WorkspaceMolecule {
  return workspaceMolecules.find((molecule) => molecule.id === id) ?? workspaceMolecules[0];
}
