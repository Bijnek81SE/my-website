"use client";

import { useMemo, useState } from "react";
import {
  calculateLimitingReagent,
  calculateMolarMass,
  formatChemistryNumber,
  gramsToMass,
  massToGrams,
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

export default function LimitingReagentCalculator() {
  const [aFormula, setAFormula] = useState("H2");
  const [aMass, setAMass] = useState("2");
  const [aCoefficient, setACoefficient] = useState("2");
  const [bFormula, setBFormula] = useState("O2");
  const [bMass, setBMass] = useState("32");
  const [bCoefficient, setBCoefficient] = useState("1");
  const [productFormula, setProductFormula] = useState("H2O");
  const [productCoefficient, setProductCoefficient] = useState("2");
  const [massUnit, setMassUnit] = useState<MassUnit>("g");

  const calculation = useMemo(() => {
    try {
      const aMolarMass = calculateMolarMass(aFormula);
      const bMolarMass = calculateMolarMass(bFormula);
      const productMolarMass = calculateMolarMass(productFormula);
      const aMoles = massToGrams(parsePositiveNumber(aMass, "Reactant A mass"), massUnit) / aMolarMass;
      const bMoles = massToGrams(parsePositiveNumber(bMass, "Reactant B mass"), massUnit) / bMolarMass;
      const result = calculateLimitingReagent({
        reactants: [
          { id: "A", moles: aMoles, coefficient: parsePositiveNumber(aCoefficient, "Reactant A coefficient") },
          { id: "B", moles: bMoles, coefficient: parsePositiveNumber(bCoefficient, "Reactant B coefficient") },
        ],
        productCoefficient: parsePositiveNumber(productCoefficient, "Product coefficient"),
      });
      return {
        ...result,
        theoreticalMass: gramsToMass(result.productMoles * productMolarMass, massUnit),
        aMoles,
        bMoles,
        error: undefined,
      };
    } catch (error) {
      return { limitingId: undefined, reactionExtent: undefined, productMoles: undefined, excessMoles: {}, theoreticalMass: undefined, aMoles: undefined, bMoles: undefined, error: error instanceof Error ? error.message : "Could not identify the limiting reagent." };
    }
  }, [aCoefficient, aFormula, aMass, bCoefficient, bFormula, bMass, massUnit, productCoefficient, productFormula]);

  const limitingName = calculation.limitingId === "A" ? aFormula : calculation.limitingId === "B" ? bFormula : undefined;

  return (
    <CalculatorShell eyebrow="Reaction planning" title="Limiting reagent calculator" description="Compare stoichiometric reaction extents, identify the limiting reagent, and estimate theoretical product yield." formula="reaction extent = moles / stoichiometric coefficient">
      <CalculatorWorkspace
        controls={
          <div className="space-y-6">
            <UnitSelect id="limiting-mass-unit" label="Mass unit for all entries" value={massUnit} options={massUnits} onChange={setMassUnit} />
            <fieldset className="rounded-xl border border-slate-200 p-4">
              <legend className="px-2 text-sm font-bold text-slate-800">Reactant A</legend>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block"><span className="text-sm font-semibold text-slate-800">Formula</span><input value={aFormula} onChange={(event) => setAFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" /></label>
                <NumberField id="limiting-a-mass" label="Mass" value={aMass} onChange={setAMass} />
                <NumberField id="limiting-a-coeff" label="Coefficient" value={aCoefficient} onChange={setACoefficient} />
              </div>
            </fieldset>
            <fieldset className="rounded-xl border border-slate-200 p-4">
              <legend className="px-2 text-sm font-bold text-slate-800">Reactant B</legend>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block"><span className="text-sm font-semibold text-slate-800">Formula</span><input value={bFormula} onChange={(event) => setBFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" /></label>
                <NumberField id="limiting-b-mass" label="Mass" value={bMass} onChange={setBMass} />
                <NumberField id="limiting-b-coeff" label="Coefficient" value={bCoefficient} onChange={setBCoefficient} />
              </div>
            </fieldset>
            <fieldset className="rounded-xl border border-slate-200 p-4">
              <legend className="px-2 text-sm font-bold text-slate-800">Product</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-semibold text-slate-800">Formula</span><input value={productFormula} onChange={(event) => setProductFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" /></label>
                <NumberField id="limiting-product-coeff" label="Coefficient" value={productCoefficient} onChange={setProductCoefficient} />
              </div>
            </fieldset>
          </div>
        }
        result={<ResultPanel title="Limiting reagent" result={limitingName} error={calculation.error} secondary={calculation.theoreticalMass !== undefined && calculation.productMoles !== undefined ? [
          { label: "Theoretical product", value: `${formatChemistryNumber(calculation.theoreticalMass)} ${massUnit}` },
          { label: "Product amount", value: `${formatChemistryNumber(calculation.productMoles)} mol` },
          { label: `${aFormula} remaining`, value: `${formatChemistryNumber(calculation.excessMoles.A ?? 0)} mol` },
          { label: `${bFormula} remaining`, value: `${formatChemistryNumber(calculation.excessMoles.B ?? 0)} mol` },
        ] : []} />}
        steps={limitingName ? <CalculationSteps steps={[
          `Convert both reactant masses to moles.`,
          `Divide each mole amount by its stoichiometric coefficient.`,
          `${limitingName} gives the smaller reaction extent and is limiting.`,
          `Use the limiting extent to calculate theoretical ${productFormula}.`,
        ]} /> : null}
        guidance={<p>This model assumes pure reagents and a single balanced reaction. Real experiments may also be limited by conversion, selectivity, or reagent purity.</p>}
      />
    </CalculatorShell>
  );
}
