"use client";

import { useMemo, useState } from "react";
import {
  calculatePercentYield,
  formatChemistryNumber,
  massToGrams,
  gramsToMass,
  parseNonNegativeNumber,
  parsePositiveNumber,
  massUnits,
  type MassUnit,
} from "@/lib/calculators";
import CalculatorShell from "./CalculatorShell";
import CalculatorWorkspace from "./CalculatorWorkspace";
import NumberField from "./NumberField";
import UnitSelect from "./UnitSelect";
import ResultPanel from "./ResultPanel";
import CalculationSteps from "./CalculationSteps";

export default function PercentYieldCalculator() {
  const [actual, setActual] = useState("8.2");
  const [actualUnit, setActualUnit] = useState<MassUnit>("g");
  const [theoretical, setTheoretical] = useState("10");
  const [theoreticalUnit, setTheoreticalUnit] = useState<MassUnit>("g");

  const calculation = useMemo(() => {
    try {
      const actualGrams = massToGrams(parseNonNegativeNumber(actual, "Actual yield"), actualUnit);
      const theoreticalGrams = massToGrams(parsePositiveNumber(theoretical, "Theoretical yield"), theoreticalUnit);
      return {
        percent: calculatePercentYield(actualGrams, theoreticalGrams),
        lossGrams: Math.max(0, theoreticalGrams - actualGrams),
        error: undefined,
      };
    } catch (error) {
      return { percent: undefined, lossGrams: undefined, error: error instanceof Error ? error.message : "Could not calculate percent yield." };
    }
  }, [actual, actualUnit, theoretical, theoreticalUnit]);

  return (
    <CalculatorShell eyebrow="Reaction performance" title="Percent yield calculator" description="Compare isolated product with the theoretical maximum and quantify the material not recovered." formula="percent yield = actual yield / theoretical yield × 100%">
      <CalculatorWorkspace
        controls={
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id="yield-actual" label="Actual isolated yield" value={actual} onChange={setActual} min={0} />
            <UnitSelect id="yield-actual-unit" label="Actual yield unit" value={actualUnit} options={massUnits} onChange={setActualUnit} />
            <NumberField id="yield-theoretical" label="Theoretical yield" value={theoretical} onChange={setTheoretical} />
            <UnitSelect id="yield-theoretical-unit" label="Theoretical yield unit" value={theoreticalUnit} options={massUnits} onChange={setTheoreticalUnit} />
          </div>
        }
        result={<ResultPanel result={calculation.percent !== undefined ? `${formatChemistryNumber(calculation.percent, 3)}%` : undefined} error={calculation.error} secondary={calculation.lossGrams !== undefined ? [
          { label: "Unrecovered material", value: `${formatChemistryNumber(gramsToMass(calculation.lossGrams, actualUnit))} ${actualUnit}` },
          { label: "Interpretation", value: calculation.percent! > 100 ? "Above 100%—check purity, solvent, or measurement." : calculation.percent! >= 80 ? "High isolated yield" : calculation.percent! >= 50 ? "Moderate isolated yield" : "Low isolated yield" },
        ] : []} />}
        steps={calculation.percent !== undefined ? <CalculationSteps steps={[
          "Convert actual and theoretical yields to the same base unit.",
          "Divide actual yield by theoretical yield.",
          "Multiply by 100 to express the result as a percentage.",
        ]} /> : null}
        guidance={<p>A result above 100% usually indicates residual solvent, impurities, incomplete drying, or an incorrect theoretical yield—not super-stoichiometric product formation.</p>}
      />
    </CalculatorShell>
  );
}
