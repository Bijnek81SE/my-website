export const massUnits = ["µg", "mg", "g", "kg"] as const;
export type MassUnit = (typeof massUnits)[number];

export const volumeUnits = ["µL", "mL", "L"] as const;
export type VolumeUnit = (typeof volumeUnits)[number];

export const amountUnits = ["µmol", "mmol", "mol"] as const;
export type AmountUnit = (typeof amountUnits)[number];

export const concentrationUnits = ["µM", "mM", "M"] as const;
export type ConcentrationUnit = (typeof concentrationUnits)[number];

const massFactors: Record<MassUnit, number> = {
  "µg": 1e-6,
  mg: 1e-3,
  g: 1,
  kg: 1e3,
};

const volumeFactors: Record<VolumeUnit, number> = {
  "µL": 1e-6,
  mL: 1e-3,
  L: 1,
};

const amountFactors: Record<AmountUnit, number> = {
  "µmol": 1e-6,
  mmol: 1e-3,
  mol: 1,
};

const concentrationFactors: Record<ConcentrationUnit, number> = {
  "µM": 1e-6,
  mM: 1e-3,
  M: 1,
};

export function massToGrams(value: number, unit: MassUnit): number {
  return value * massFactors[unit];
}

export function gramsToMass(value: number, unit: MassUnit): number {
  return value / massFactors[unit];
}

export function volumeToLitres(value: number, unit: VolumeUnit): number {
  return value * volumeFactors[unit];
}

export function litresToVolume(value: number, unit: VolumeUnit): number {
  return value / volumeFactors[unit];
}

export function amountToMoles(value: number, unit: AmountUnit): number {
  return value * amountFactors[unit];
}

export function molesToAmount(value: number, unit: AmountUnit): number {
  return value / amountFactors[unit];
}

export function concentrationToMolar(value: number, unit: ConcentrationUnit): number {
  return value * concentrationFactors[unit];
}

export function molarToConcentration(value: number, unit: ConcentrationUnit): number {
  return value / concentrationFactors[unit];
}

export function formatChemistryNumber(value: number, maximumFractionDigits = 6): string {
  if (!Number.isFinite(value)) return "—";
  const magnitude = Math.abs(value);
  if (magnitude !== 0 && (magnitude >= 1e6 || magnitude < 1e-4)) {
    return value.toExponential(4);
  }
  return new Intl.NumberFormat("en", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}
