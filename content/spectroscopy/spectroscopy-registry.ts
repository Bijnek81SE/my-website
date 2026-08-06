import type { SpectroscopyCompound } from "@/components/chemistry/spectroscopy";

export const spectroscopyCompounds: readonly SpectroscopyCompound[] = [
  {
    id: "ethanol",
    name: "Ethanol",
    formula: "C₂H₆O",
    summary: "A compact example that connects an O–H stretch with a triplet–quartet proton pattern.",
    atoms: [
      { id: "c1", element: "C", x: 55, y: 72, label: "CH₃" },
      { id: "c2", element: "C", x: 125, y: 72, label: "CH₂" },
      { id: "o1", element: "O", x: 195, y: 72, label: "OH" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "o1", order: 1 },
    ],
    protonNmr: [
      { id: "h-ethyl-methyl", label: "CH₃ triplet", atomIds: ["c1"], explanation: "Three methyl protons split by the two adjacent CH₂ protons.", shift: 1.18, integration: 3, multiplicity: "t", couplingHz: 7.1 },
      { id: "h-ethyl-methylene", label: "CH₂ quartet", atomIds: ["c2"], explanation: "Two methylene protons split by the three adjacent CH₃ protons.", shift: 3.65, integration: 2, multiplicity: "q", couplingHz: 7.1 },
      { id: "h-ethyl-oh", label: "O–H singlet", atomIds: ["o1"], explanation: "Exchange commonly broadens the hydroxyl proton and suppresses reliable coupling.", shift: 2.4, integration: 1, multiplicity: "s", lineWidthHz: 10 },
    ],
    carbonNmr: [
      { id: "c-ethyl-methyl", label: "Methyl carbon", atomIds: ["c1"], explanation: "The carbon remote from oxygen appears upfield.", shift: 18.4, carbonType: "CH3" },
      { id: "c-ethyl-methylene", label: "O–CH₂ carbon", atomIds: ["c2"], explanation: "The electronegative oxygen deshields the bonded carbon.", shift: 58.3, carbonType: "CH2" },
    ],
    ir: [
      { id: "ir-ethanol-oh", label: "O–H stretch", atomIds: ["o1"], explanation: "Hydrogen bonding produces a strong, broad absorption.", center: 3350, width: 260, depth: 58, shape: "broad" },
      { id: "ir-ethanol-ch", label: "sp³ C–H stretch", atomIds: ["c1", "c2"], explanation: "Alkyl C–H stretches appear just below 3000 cm⁻¹.", center: 2960, width: 45, depth: 24 },
      { id: "ir-ethanol-co", label: "C–O stretch", atomIds: ["c2", "o1"], explanation: "The alcohol C–O stretch appears in the fingerprint region.", center: 1050, width: 55, depth: 42 },
    ],
    mass: [
      { id: "ms-ethanol-m", label: "Molecular ion", atomIds: ["c1", "c2", "o1"], explanation: "The molecular radical cation appears at m/z 46.", mz: 46, intensity: 18, formula: "C₂H₆O⁺•", isMolecularIon: true },
      { id: "ms-ethanol-31", label: "CH₂OH⁺ fragment", atomIds: ["c2", "o1"], explanation: "Alpha cleavage next to oxygen gives the resonance-stabilised m/z 31 ion.", mz: 31, intensity: 100, formula: "CH₃O⁺", isBasePeak: true },
      { id: "ms-ethanol-45", label: "Loss of H", atomIds: ["c1", "c2", "o1"], explanation: "Hydrogen loss from the molecular ion gives m/z 45.", mz: 45, intensity: 42 },
    ],
  },
  {
    id: "acetone",
    name: "Acetone",
    formula: "C₃H₆O",
    summary: "A symmetric ketone with one proton environment, two carbon environments, and a dominant acylium fragment.",
    atoms: [
      { id: "c1", element: "C", x: 45, y: 78, label: "CH₃" },
      { id: "c2", element: "C", x: 120, y: 78, label: "C" },
      { id: "o1", element: "O", x: 120, y: 25, label: "O" },
      { id: "c3", element: "C", x: 195, y: 78, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 },
      { id: "b2", from: "c2", to: "o1", order: 2 },
      { id: "b3", from: "c2", to: "c3", order: 1 },
    ],
    protonNmr: [
      { id: "h-acetone-methyl", label: "Equivalent methyl singlet", atomIds: ["c1", "c3"], explanation: "Both methyl groups are equivalent and have no neighbouring hydrogens across the carbonyl carbon.", shift: 2.17, integration: 6, multiplicity: "s" },
    ],
    carbonNmr: [
      { id: "c-acetone-methyl", label: "Equivalent methyl carbons", atomIds: ["c1", "c3"], explanation: "The two methyl carbons are symmetry-equivalent.", shift: 30.1, carbonType: "CH3" },
      { id: "c-acetone-carbonyl", label: "Ketone carbonyl carbon", atomIds: ["c2"], explanation: "The strongly deshielded ketone carbonyl appears near 205 ppm.", shift: 206.7, carbonType: "C" },
    ],
    ir: [
      { id: "ir-acetone-carbonyl", label: "Ketone C=O stretch", atomIds: ["c2", "o1"], explanation: "A strong, sharp ketone carbonyl absorption.", center: 1715, width: 28, depth: 78 },
      { id: "ir-acetone-ch", label: "sp³ C–H stretch", atomIds: ["c1", "c3"], explanation: "Methyl C–H stretching absorptions occur below 3000 cm⁻¹.", center: 2965, width: 42, depth: 22 },
    ],
    mass: [
      { id: "ms-acetone-m", label: "Molecular ion", atomIds: ["c1", "c2", "o1", "c3"], explanation: "The molecular radical cation appears at m/z 58.", mz: 58, intensity: 25, isMolecularIon: true },
      { id: "ms-acetone-43", label: "Acylium ion", atomIds: ["c1", "c2", "o1"], explanation: "Alpha cleavage forms the resonance-stabilised CH₃CO⁺ ion.", mz: 43, intensity: 100, formula: "CH₃CO⁺", isBasePeak: true },
      { id: "ms-acetone-15", label: "Methyl cation", atomIds: ["c1"], explanation: "A smaller methyl fragment may appear at m/z 15.", mz: 15, intensity: 18 },
    ],
  },
  {
    id: "ethyl-acetate",
    name: "Ethyl acetate",
    formula: "C₄H₈O₂",
    summary: "An ester that combines an ethyl splitting pattern with a downfield carbonyl carbon and characteristic fragmentation.",
    atoms: [
      { id: "c1", element: "C", x: 35, y: 78, label: "CH₃" },
      { id: "c2", element: "C", x: 95, y: 78, label: "C" },
      { id: "o1", element: "O", x: 95, y: 25, label: "O" },
      { id: "o2", element: "O", x: 155, y: 78, label: "O" },
      { id: "c3", element: "C", x: 215, y: 78, label: "CH₂" },
      { id: "c4", element: "C", x: 275, y: 78, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 1 }, { id: "b2", from: "c2", to: "o1", order: 2 },
      { id: "b3", from: "c2", to: "o2", order: 1 }, { id: "b4", from: "o2", to: "c3", order: 1 },
      { id: "b5", from: "c3", to: "c4", order: 1 },
    ],
    protonNmr: [
      { id: "h-ea-acetyl", label: "Acetyl CH₃ singlet", atomIds: ["c1"], explanation: "The methyl group adjacent to the carbonyl has no neighbouring hydrogens across the carbonyl carbon.", shift: 2.05, integration: 3, multiplicity: "s" },
      { id: "h-ea-och2", label: "O–CH₂ quartet", atomIds: ["c3"], explanation: "The methylene is deshielded by oxygen and split by the terminal methyl group.", shift: 4.12, integration: 2, multiplicity: "q", couplingHz: 7.1 },
      { id: "h-ea-terminal", label: "Terminal CH₃ triplet", atomIds: ["c4"], explanation: "The terminal methyl is split by the adjacent CH₂ group.", shift: 1.26, integration: 3, multiplicity: "t", couplingHz: 7.1 },
    ],
    carbonNmr: [
      { id: "c-ea-acetyl", label: "Acetyl methyl carbon", atomIds: ["c1"], explanation: "The methyl carbon alpha to the ester carbonyl appears near 21 ppm.", shift: 20.8, carbonType: "CH3" },
      { id: "c-ea-carbonyl", label: "Ester carbonyl carbon", atomIds: ["c2"], explanation: "The ester carbonyl is strongly deshielded.", shift: 170.6, carbonType: "C" },
      { id: "c-ea-och2", label: "O–CH₂ carbon", atomIds: ["c3"], explanation: "Direct attachment to oxygen shifts this carbon downfield.", shift: 60.4, carbonType: "CH2" },
      { id: "c-ea-terminal", label: "Terminal methyl carbon", atomIds: ["c4"], explanation: "The terminal methyl appears upfield.", shift: 14.3, carbonType: "CH3" },
    ],
    ir: [
      { id: "ir-ea-carbonyl", label: "Ester C=O stretch", atomIds: ["c2", "o1"], explanation: "A strong ester carbonyl absorption appears around 1740 cm⁻¹.", center: 1740, width: 25, depth: 82 },
      { id: "ir-ea-co", label: "Ester C–O stretches", atomIds: ["c2", "o2", "c3"], explanation: "Strong C–O stretching bands occur in the fingerprint region.", center: 1240, width: 45, depth: 52 },
      { id: "ir-ea-ch", label: "sp³ C–H stretch", atomIds: ["c1", "c3", "c4"], explanation: "Alkyl C–H stretching absorptions appear below 3000 cm⁻¹.", center: 2970, width: 45, depth: 20 },
    ],
    mass: [
      { id: "ms-ea-m", label: "Molecular ion", atomIds: ["c1", "c2", "o1", "o2", "c3", "c4"], explanation: "The molecular radical cation appears at m/z 88.", mz: 88, intensity: 18, isMolecularIon: true },
      { id: "ms-ea-43", label: "Acylium ion", atomIds: ["c1", "c2", "o1"], explanation: "Cleavage produces the stabilised CH₃CO⁺ ion.", mz: 43, intensity: 100, isBasePeak: true },
      { id: "ms-ea-45", label: "Ethoxy fragment", atomIds: ["o2", "c3", "c4"], explanation: "The ethoxy fragment gives a prominent ion near m/z 45.", mz: 45, intensity: 45 },
      { id: "ms-ea-61", label: "McLafferty-related fragment", atomIds: ["c1", "c2", "o1", "o2"], explanation: "A rearrangement/cleavage pathway can produce m/z 61.", mz: 61, intensity: 32 },
    ],
  },
  {
    id: "toluene",
    name: "Toluene",
    formula: "C₇H₈",
    summary: "An aromatic example with a methyl singlet, overlapping aromatic multiplet, and a diagnostic benzyl fragment.",
    atoms: [
      { id: "c1", element: "C", x: 105, y: 25, label: "C" }, { id: "c2", element: "C", x: 165, y: 55, label: "CH" },
      { id: "c3", element: "C", x: 165, y: 115, label: "CH" }, { id: "c4", element: "C", x: 105, y: 145, label: "CH" },
      { id: "c5", element: "C", x: 45, y: 115, label: "CH" }, { id: "c6", element: "C", x: 45, y: 55, label: "CH" },
      { id: "c7", element: "C", x: 105, y: -35, label: "CH₃" },
    ],
    bonds: [
      { id: "b1", from: "c1", to: "c2", order: 2 }, { id: "b2", from: "c2", to: "c3", order: 1 },
      { id: "b3", from: "c3", to: "c4", order: 2 }, { id: "b4", from: "c4", to: "c5", order: 1 },
      { id: "b5", from: "c5", to: "c6", order: 2 }, { id: "b6", from: "c6", to: "c1", order: 1 },
      { id: "b7", from: "c1", to: "c7", order: 1 },
    ],
    protonNmr: [
      { id: "h-toluene-methyl", label: "Benzylic CH₃ singlet", atomIds: ["c7"], explanation: "The methyl group has no vicinal hydrogens on the aromatic ipso carbon.", shift: 2.34, integration: 3, multiplicity: "s" },
      { id: "h-toluene-aromatic", label: "Aromatic multiplet", atomIds: ["c2", "c3", "c4", "c5", "c6"], explanation: "Overlapping ortho and meta couplings produce a multiplet integrating to five hydrogens.", shift: 7.2, integration: 5, multiplicity: "m", couplingHz: 7.5, lineWidthHz: 2 },
    ],
    carbonNmr: [
      { id: "c-toluene-methyl", label: "Benzylic methyl carbon", atomIds: ["c7"], explanation: "The methyl carbon appears near 21 ppm.", shift: 21.4, carbonType: "CH3" },
      { id: "c-toluene-ipso", label: "Ipso aromatic carbon", atomIds: ["c1"], explanation: "The substituted quaternary aromatic carbon is the most downfield ring carbon.", shift: 137.8, carbonType: "C" },
      { id: "c-toluene-ortho", label: "Ortho aromatic carbons", atomIds: ["c2", "c6"], explanation: "Symmetry makes the two ortho carbons equivalent.", shift: 129.3, carbonType: "CH" },
      { id: "c-toluene-meta", label: "Meta aromatic carbons", atomIds: ["c3", "c5"], explanation: "Symmetry makes the two meta carbons equivalent.", shift: 128.4, carbonType: "CH" },
      { id: "c-toluene-para", label: "Para aromatic carbon", atomIds: ["c4"], explanation: "The para carbon is a distinct aromatic environment.", shift: 125.5, carbonType: "CH" },
    ],
    ir: [
      { id: "ir-toluene-aromatic-ch", label: "Aromatic C–H stretch", atomIds: ["c2", "c3", "c4", "c5", "c6"], explanation: "Aromatic C–H stretching occurs just above 3000 cm⁻¹.", center: 3030, width: 28, depth: 20 },
      { id: "ir-toluene-ring", label: "Aromatic C=C stretches", atomIds: ["c1", "c2", "c3", "c4", "c5", "c6"], explanation: "Ring stretching bands appear around 1600 and 1500 cm⁻¹.", center: 1600, width: 25, depth: 34 },
      { id: "ir-toluene-ring2", label: "Aromatic ring stretch", atomIds: ["c1", "c2", "c3", "c4", "c5", "c6"], explanation: "A second aromatic ring stretching band appears near 1495 cm⁻¹.", center: 1495, width: 22, depth: 30 },
      { id: "ir-toluene-ch", label: "Methyl C–H stretch", atomIds: ["c7"], explanation: "The benzylic methyl group gives alkyl C–H stretches below 3000 cm⁻¹.", center: 2925, width: 40, depth: 18 },
    ],
    mass: [
      { id: "ms-toluene-m", label: "Molecular ion", atomIds: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], explanation: "The aromatic molecular ion is relatively stable at m/z 92.", mz: 92, intensity: 72, isMolecularIon: true },
      { id: "ms-toluene-91", label: "Tropylium ion", atomIds: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], explanation: "Loss of H gives the highly stabilised tropylium/benzyl ion at m/z 91.", mz: 91, intensity: 100, isBasePeak: true },
      { id: "ms-toluene-65", label: "Ring fragment", atomIds: ["c1", "c2", "c3", "c4", "c5"], explanation: "Further fragmentation of the aromatic ion gives m/z 65.", mz: 65, intensity: 22 },
    ],
  },
];

export function getSpectroscopyCompound(id: string): SpectroscopyCompound | undefined {
  return spectroscopyCompounds.find((compound) => compound.id === id);
}
