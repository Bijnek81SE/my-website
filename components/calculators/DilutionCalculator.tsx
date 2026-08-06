"use client";

import { useMemo, useState } from "react";
import {
  calculateDilutionUnknown,
  concentrationToMolar,
  molarToConcentration,
  volumeToLitres,
  litresToVolume,
  concentrationUnits,
  volumeUnits,
  formatChemistryNumber,
  parsePositiveNumber,
  type ConcentrationUnit,
  type VolumeUnit,
} from "@/lib/calculators";
import CalculatorShell from "./CalculatorShell";
import CalculatorWorkspace from "./CalculatorWorkspace";
import NumberField from "./NumberField";
import UnitSelect from "./UnitSelect";
import ResultPanel from "./ResultPanel";
import CalculationSteps from "./CalculationSteps";

type Variable = "c1" | "v1" | "c2" | "v2";

const labels: Record<Variable, string> = {
  c1: "Initial concentration",
  v1: "Stock volume used",
  c2: "Final concentration",
  v2: "Final solution volume",
};

export default function DilutionCalculator() {
  const [solveFor, setSolveFor] = useState<Variable>("v1");
  const [values, setValues] = useState<Record<Variable, string>>({ c1: "1", v1: "", c2: "0.1", v2: "100" });
  const [concentrationUnit, setConcentrationUnit] = useState<ConcentrationUnit>("M");
  const [volumeUnit, setVolumeUnit] = useState<VolumeUnit>("mL");

  const calculation = useMemo(() => {
    try {
      const supplied: Partial<Record<Variable, number>> = {};
      for (const variable of ["c1", "v1", "c2", "v2"] as const) {
        if (variable === solveFor) continue;
        const value = parsePositiveNumber(values[variable], labels[variable]);
        supplied[variable] = variable.startsWith("c")
          ? concentrationToMolar(value, concentrationUnit)
          : volumeToLitres(value, volumeUnit);
      }
      const baseResult = calculateDilutionUnknown({ ...supplied, solveFor });
      const displayed = solveFor.startsWith("c")
        ? molarToConcentration(baseResult, concentrationUnit)
        : litresToVolume(baseResult, volumeUnit);
      return { displayed, baseResult, error: undefined };
    } catch (error) {
      return { displayed: undefined, baseResult: undefined, error: error instanceof Error ? error.message : "Could not calculate the dilution." };
    }
  }, [concentrationUnit, solveFor, values, volumeUnit]);

  const resultUnit = solveFor.startsWith("c") ? concentrationUnit : volumeUnit;

  return (
    <CalculatorShell
      eyebrow="Solution preparation"
      title="Dilution calculator"
      description="Solve any one term in the dilution relationship while keeping concentration and volume units consistent."
      formula="C₁V₁ = C₂V₂"
    >
      <CalculatorWorkspace
        controls={
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-800">Solve for</span>
              <select
                value={solveFor}
                onChange={(event) => setSolveFor(event.target.value as Variable)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              >
                {(Object.keys(labels) as Variable[]).map((variable) => (
                  <option key={variable} value={variable}>{labels[variable]}</option>
                ))}
              </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(labels) as Variable[]).map((variable) => (
                <NumberField
                  key={variable}
                  id={`dilution-${variable}`}
                  label={`${labels[variable]}${variable === solveFor ? " (calculated)" : ""}`}
                  value={values[variable]}
                  disabled={variable === solveFor}
                  onChange={(value) => setValues((current) => ({ ...current, [variable]: value }))}
                />
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <UnitSelect id="dilution-concentration-unit" label="Concentration unit" value={concentrationUnit} options={concentrationUnits} onChange={setConcentrationUnit} />
              <UnitSelect id="dilution-volume-unit" label="Volume unit" value={volumeUnit} options={volumeUnits} onChange={setVolumeUnit} />
            </div>
          </div>
        }
        result={<ResultPanel result={calculation.displayed !== undefined ? `${formatChemistryNumber(calculation.displayed)} ${resultUnit}` : undefined} error={calculation.error} />}
        steps={
          calculation.displayed !== undefined ? (
            <CalculationSteps steps={[
              "Convert concentrations to mol/L and volumes to litres.",
              `Rearrange C₁V₁ = C₂V₂ to isolate ${labels[solveFor].toLowerCase()}.`,
              `Convert the result back to ${resultUnit}.`,
            ]} />
          ) : null
        }
        guidance={<p>A dilution changes concentration, not the number of moles of solute transferred from the stock solution.</p>}
      />
    </CalculatorShell>
  );
}
