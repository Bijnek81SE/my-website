import type { MoleculeAtom, MoleculeBond, MoleculeId } from "@/content/molecules/molecule-types";

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

export type RawSpectrumTrace = {
  id: string;
  kind: SpectrumKind;
  axis: SpectrumAxis;
  points: readonly SpectrumPoint[];
  sourceLabel?: string;
  metadata?: Readonly<Record<string, string>>;
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

export type SpectroscopySource = {
  kind: "simulated" | "experimental" | "imported";
  citation?: string;
  importedFormat?: "jcamp-dx" | "json" | "yaml" | "csv";
};

export type SpectroscopyCapabilities = {
  lab: boolean;
  workspace: boolean;
  assignments: boolean;
  challenges: boolean;
  importReady: boolean;
};

export type SpectroscopyDatasetInput = {
  id: string;
  moleculeId: MoleculeId;
  summary: string;
  protonNmr: readonly ProtonSignal[];
  carbonNmr: readonly CarbonSignal[];
  ir: readonly IrBand[];
  mass: readonly MassSignal[];
  rawSpectra?: readonly RawSpectrumTrace[];
  relatedLessonIds?: readonly string[];
  relatedFunctionalGroupIds?: readonly string[];
  source?: SpectroscopySource;
  capabilities?: Partial<SpectroscopyCapabilities>;
};

export type SpectroscopyDataset = SpectroscopyDatasetInput & {
  name: string;
  formula: string;
  atoms: readonly MoleculeAtom[];
  bonds: readonly MoleculeBond[];
  relatedLessonIds: readonly string[];
  relatedFunctionalGroupIds: readonly string[];
  rawSpectra: readonly RawSpectrumTrace[];
  source: SpectroscopySource;
  capabilities: SpectroscopyCapabilities;
};

export type SpectroscopyCompound = SpectroscopyDataset;

export function defineSpectroscopyDataset<const T extends SpectroscopyDatasetInput>(dataset: T): T {
  return dataset;
}
