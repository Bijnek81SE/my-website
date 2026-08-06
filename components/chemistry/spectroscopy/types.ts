export type SpectrumKind = "proton-nmr" | "carbon-nmr" | "ir" | "mass";

export type SpectrumAxis = {
  min: number;
  max: number;
  reversed?: boolean;
  label: string;
  unit: string;
};

export type SpectrumPoint = {
  x: number;
  y: number;
};

export type SpectralAssignment = {
  id: string;
  label: string;
  atomIds: readonly string[];
  explanation: string;
};

export type ProtonSignal = SpectralAssignment & {
  shift: number;
  integration: number;
  multiplicity: "s" | "d" | "t" | "q" | "quint" | "sext" | "sept" | "m" | "dd";
  couplingHz?: number;
  lineWidthHz?: number;
};

export type CarbonSignal = SpectralAssignment & {
  shift: number;
  intensity?: number;
  carbonType?: "CH3" | "CH2" | "CH" | "C";
};

export type IrBand = SpectralAssignment & {
  center: number;
  width: number;
  depth: number;
  shape?: "gaussian" | "broad";
};

export type MassSignal = SpectralAssignment & {
  mz: number;
  intensity: number;
  formula?: string;
  isMolecularIon?: boolean;
  isBasePeak?: boolean;
};

export type SpectroscopyAtom = {
  id: string;
  element: string;
  x: number;
  y: number;
  label?: string;
};

export type SpectroscopyBond = {
  id: string;
  from: string;
  to: string;
  order?: 1 | 2 | 3;
};

export type SpectroscopyCompound = {
  id: string;
  name: string;
  formula: string;
  summary: string;
  atoms: readonly SpectroscopyAtom[];
  bonds: readonly SpectroscopyBond[];
  protonNmr: readonly ProtonSignal[];
  carbonNmr: readonly CarbonSignal[];
  ir: readonly IrBand[];
  mass: readonly MassSignal[];
};
