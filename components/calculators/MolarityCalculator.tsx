"use client";

import { useMemo, useState } from "react";
import {
  amountToMoles,
  calculateMolarMass,
  calculateMolarity,
  concentrationToMolar,
  formatChemistryNumber,
  gramsToMass,
  massToGrams,
  molarToConcentration,
  molesToAmount,
  litresToVolume,
  volumeToLitres,
  parsePositiveNumber,
  amountUnits,
  concentrationUnits,
  massUnits,
  volumeUnits,
  type AmountUnit,
  type ConcentrationUnit,
  type MassUnit,
  type VolumeUnit,
} from "@/lib/calculators";
import CalculatorShell from "./CalculatorShell";
import CalculatorWorkspace from "./CalculatorWorkspace";
import NumberField from "./NumberField";
import UnitSelect from "./UnitSelect";
import ResultPanel from "./ResultPanel";
import CalculationSteps from "./CalculationSteps";

type SolveFor = "concentration" | "moles" | "mass" | "volume";

export default function MolarityCalculator() {
  const [solveFor, setSolveFor] = useState<SolveFor>("mass");
  const [concentration, setConcentration] = useState("0.1");
  const [concentrationUnit, setConcentrationUnit] = useState<ConcentrationUnit>("M");
  const [volume, setVolume] = useState("250");
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("mL");
  const [moles, setMoles] = useState("0.025");
  const [amountUnit, setAmountUnit] = useState<AmountUnit>("mol");
  const [mass, setMass] = useState("");
  const [massUnit, setMassUnit] = useState<MassUnit>("g");
  const [formula, setFormula] = useState("NaCl");

  const calculation = useMemo(() => {
    try {
      const molarMass = calculateMolarMass(formula);
      if (solveFor === "concentration") {
        const knownMoles = mass.trim()
          ? massToGrams(parsePositiveNumber(mass, "Solute mass"), massUnit) / molarMass
          : amountToMoles(parsePositiveNumber(moles, "Amount"), amountUnit);
        const litres = volumeToLitres(parsePositiveNumber(volume, "Solution volume"), volumeUnit);
        const result = molarToConcentration(calculateMolarity(knownMoles, litres), concentrationUnit);
        return { result, unit: concentrationUnit, molarMass, steps: ["Convert the solute amount to moles.", "Convert solution volume to litres.", "Calculate M = n/V."], error: undefined };
      }
      if (solveFor === "moles") {
        const molar = concentrationToMolar(parsePositiveNumber(concentration, "Concentration"), concentrationUnit);
        const litres = volumeToLitres(parsePositiveNumber(volume, "Solution volume"), volumeUnit);
        const result = molesToAmount(molar * litres, amountUnit);
        return { result, unit: amountUnit, molarMass, steps: ["Convert concentration to mol/L.", "Convert volume to litres.", "Calculate n = M × V."], error: undefined };
      }
      if (solveFor === "mass") {
        const molar = concentrationToMolar(parsePositiveNumber(concentration, "Concentration"), concentrationUnit);
        const litres = volumeToLitres(parsePositiveNumber(volume, "Solution volume"), volumeUnit);
        const grams = molar * litres * molarMass;
        return { result: gramsToMass(grams, massUnit), unit: massUnit, molarMass, steps: ["Calculate moles with n = M × V.", `Use the molar mass of ${formula}: ${molarMass.toFixed(4)} g/mol.`, "Calculate mass = moles × molar mass."], error: undefined };
      }
      const molar = concentrationToMolar(parsePositiveNumber(concentration, "Concentration"), concentrationUnit);
      const knownMoles = mass.trim()
        ? massToGrams(parsePositiveNumber(mass, "Solute mass"), massUnit) / molarMass
        : amountToMoles(parsePositiveNumber(moles, "Amount"), amountUnit);
      const result = litresToVolume(knownMoles / molar, volumeUnit);
      return { result, unit: volumeUnit, molarMass, steps: ["Convert the solute amount to moles.", "Convert concentration to mol/L.", "Calculate V = n/M and convert to the selected volume unit."], error: undefined };
    } catch (error) {
      return { result: undefined, unit: "", molarMass: undefined, steps: [], error: error instanceof Error ? error.message : "Could not solve the molarity problem." };
    }
  }, [amountUnit, concentration, concentrationUnit, formula, mass, massUnit, moles, solveFor, volume, volumeUnit]);

  return (
    <CalculatorShell eyebrow="Solutions" title="Molarity and solution preparation" description="Solve concentration, amount, solute mass, or final solution volume with automatic unit conversion." formula="M = n / V">
      <CalculatorWorkspace
        controls={
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Solve for</span>
              <select value={solveFor} onChange={(event) => setSolveFor(event.target.value as SolveFor)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200">
                <option value="concentration">Concentration</option>
                <option value="moles">Amount in moles</option>
                <option value="mass">Solute mass</option>
                <option value="volume">Solution volume</option>
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField id="molarity-concentration" label="Concentration" value={concentration} disabled={solveFor === "concentration"} onChange={setConcentration} />
              <UnitSelect id="molarity-concentration-unit" label="Concentration unit" value={concentrationUnit} options={concentrationUnits} onChange={setConcentrationUnit} />
              <NumberField id="molarity-volume" label="Solution volume" value={volume} disabled={solveFor === "volume"} onChange={setVolume} />
              <UnitSelect id="molarity-volume-unit" label="Volume unit" value={volumeUnit} options={volumeUnits} onChange={setVolumeUnit} />
              <NumberField id="molarity-moles" label="Amount" value={moles} disabled={solveFor === "moles"} onChange={setMoles} help="Used when the mass field is empty." />
              <UnitSelect id="molarity-amount-unit" label="Amount unit" value={amountUnit} options={amountUnits} onChange={setAmountUnit} />
              <NumberField id="molarity-mass" label="Solute mass" value={mass} disabled={solveFor === "mass"} onChange={setMass} help="Optional alternative to entering moles." />
              <UnitSelect id="molarity-mass-unit" label="Mass unit" value={massUnit} options={massUnits} onChange={setMassUnit} />
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Solute formula</span>
              <input value={formula} onChange={(event) => setFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
            </label>
          </div>
        }
        result={<ResultPanel result={calculation.result !== undefined ? `${formatChemistryNumber(calculation.result)} ${calculation.unit}` : undefined} error={calculation.error} secondary={calculation.molarMass ? [{ label: "Molar mass", value: `${calculation.molarMass.toFixed(4)} g/mol` }] : []} />}
        steps={calculation.result !== undefined ? <CalculationSteps steps={calculation.steps} /> : null}
        guidance={<p>When both moles and mass are entered, the mass field is used because it includes the selected molecular formula.</p>}
      />
    </CalculatorShell>
  );
}
