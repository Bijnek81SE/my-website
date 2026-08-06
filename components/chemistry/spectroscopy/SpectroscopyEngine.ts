import type {
  CarbonSignal,
  IrBand,
  MassSignal,
  ProtonSignal,
  SpectrumAxis,
  SpectrumKind,
  SpectrumPoint,
} from "./types";

const NMR_FREQUENCY_MHZ = 400;

function gaussian(x: number, center: number, width: number): number {
  const sigma = Math.max(width, 0.0001);
  return Math.exp(-0.5 * ((x - center) / sigma) ** 2);
}

function lorentzian(x: number, center: number, width: number): number {
  const half = Math.max(width / 2, 0.00005);
  return (half * half) / ((x - center) ** 2 + half * half);
}

function pascalRow(order: number): number[] {
  const row = [1];
  for (let i = 1; i <= order; i += 1) {
    row.push((row[i - 1] * (order - i + 1)) / i);
  }
  return row;
}

function multiplicityOrder(multiplicity: ProtonSignal["multiplicity"]): number {
  return {
    s: 0,
    d: 1,
    t: 2,
    q: 3,
    quint: 4,
    sext: 5,
    sept: 6,
    m: 0,
    dd: 1,
  }[multiplicity];
}

export function getSpectrumAxis(kind: SpectrumKind): SpectrumAxis {
  switch (kind) {
    case "proton-nmr":
      return { min: 0, max: 12, reversed: true, label: "Chemical shift", unit: "ppm" };
    case "carbon-nmr":
      return { min: 0, max: 220, reversed: true, label: "Chemical shift", unit: "ppm" };
    case "ir":
      return { min: 400, max: 4000, reversed: true, label: "Wavenumber", unit: "cm⁻¹" };
    case "mass":
      return { min: 0, max: 140, label: "Mass-to-charge ratio", unit: "m/z" };
  }
}

function sampleRange(min: number, max: number, count: number): number[] {
  return Array.from({ length: count }, (_, index) => min + ((max - min) * index) / (count - 1));
}

function normalize(points: SpectrumPoint[], invert = false): SpectrumPoint[] {
  const values = points.map((point) => point.y);
  const max = Math.max(...values, 1e-9);
  return points.map((point) => ({ x: point.x, y: invert ? 100 - (point.y / max) * 92 : (point.y / max) * 100 }));
}

export function simulateProtonNmr(signals: readonly ProtonSignal[], points = 1800): SpectrumPoint[] {
  const axis = getSpectrumAxis("proton-nmr");
  const xs = sampleRange(axis.min, axis.max, points);
  const trace = xs.map((x) => ({
    x,
    y: signals.reduce((sum, signal) => {
      const order = multiplicityOrder(signal.multiplicity);
      const intensities = signal.multiplicity === "m" ? [0.35, 0.7, 1, 0.72, 0.4] : pascalRow(order);
      const couplingPpm = (signal.couplingHz ?? 7) / NMR_FREQUENCY_MHZ;
      const widthPpm = (signal.lineWidthHz ?? 1.2) / NMR_FREQUENCY_MHZ;
      const midpoint = (intensities.length - 1) / 2;
      return sum + intensities.reduce((peakSum, intensity, index) => {
        const center = signal.shift + (index - midpoint) * couplingPpm;
        return peakSum + signal.integration * intensity * lorentzian(x, center, widthPpm);
      }, 0);
    }, 0),
  }));
  return normalize(trace);
}

export function simulateCarbonNmr(signals: readonly CarbonSignal[], points = 1600): SpectrumPoint[] {
  const axis = getSpectrumAxis("carbon-nmr");
  const xs = sampleRange(axis.min, axis.max, points);
  const trace = xs.map((x) => ({
    x,
    y: signals.reduce(
      (sum, signal) => sum + (signal.intensity ?? 1) * lorentzian(x, signal.shift, 0.18),
      0,
    ),
  }));
  return normalize(trace);
}

export function simulateIrSpectrum(bands: readonly IrBand[], points = 1800): SpectrumPoint[] {
  const axis = getSpectrumAxis("ir");
  const xs = sampleRange(axis.min, axis.max, points);
  return xs.map((x) => {
    const absorption = bands.reduce((sum, band) => {
      const profile = band.shape === "broad"
        ? 0.65 * gaussian(x, band.center, band.width) + 0.35 * gaussian(x, band.center - band.width * 0.35, band.width * 1.4)
        : gaussian(x, band.center, band.width);
      return sum + band.depth * profile;
    }, 0);
    const fingerprint = x < 1500 ? 3.5 * Math.sin(x / 37) ** 2 + 2 * Math.sin(x / 13) ** 2 : 0;
    return { x, y: Math.max(2, Math.min(100, 96 - absorption - fingerprint)) };
  });
}

export function simulateMassSpectrum(signals: readonly MassSignal[]): SpectrumPoint[] {
  const maxIntensity = Math.max(...signals.map((signal) => signal.intensity), 1);
  return signals.map((signal) => ({ x: signal.mz, y: (signal.intensity / maxIntensity) * 100 }));
}

export function getTraceForKind(
  kind: SpectrumKind,
  data: {
    protonNmr: readonly ProtonSignal[];
    carbonNmr: readonly CarbonSignal[];
    ir: readonly IrBand[];
    mass: readonly MassSignal[];
  },
): SpectrumPoint[] {
  switch (kind) {
    case "proton-nmr": return simulateProtonNmr(data.protonNmr);
    case "carbon-nmr": return simulateCarbonNmr(data.carbonNmr);
    case "ir": return simulateIrSpectrum(data.ir);
    case "mass": return simulateMassSpectrum(data.mass);
  }
}
