import { describe, expect, it } from "vitest";
import {
  simulateIrSpectrum,
  simulateMassSpectrum,
  simulateProtonNmr,
} from "@/components/chemistry/spectroscopy";
import { spectroscopyCompounds } from "@/content/spectroscopy";

describe("SpectroscopyEngine", () => {
  const ethanol = spectroscopyCompounds[0];

  it("generates a normalized proton NMR trace with resolved multiplets", () => {
    const trace = simulateProtonNmr(ethanol.protonNmr, 1200);
    expect(trace).toHaveLength(1200);
    expect(Math.max(...trace.map((point) => point.y))).toBeCloseTo(100, 4);
    const tripletRegion = trace.filter((point) => point.x > 1.1 && point.x < 1.25);
    expect(Math.max(...tripletRegion.map((point) => point.y))).toBeGreaterThan(20);
  });

  it("generates IR transmittance depressions for diagnostic bands", () => {
    const trace = simulateIrSpectrum(ethanol.ir, 1200);
    const ohRegion = trace.filter((point) => point.x > 3200 && point.x < 3500);
    expect(Math.min(...ohRegion.map((point) => point.y))).toBeLessThan(60);
  });

  it("normalizes mass spectral sticks to a base peak of 100", () => {
    const trace = simulateMassSpectrum(ethanol.mass);
    expect(Math.max(...trace.map((point) => point.y))).toBe(100);
    expect(trace.find((point) => point.x === 31)?.y).toBe(100);
  });
});
