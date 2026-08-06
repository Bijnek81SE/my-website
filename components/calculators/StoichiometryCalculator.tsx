"use client";

import { useMemo, useState } from "react";
import {
  amountInputToMoles,
  calculateMolarMass,
  calculateStoichiometricProduct,
  formatChemistryNumber,
  gramsToMass,
  molesToAmount,
  parsePositiveNumber,
  amountUnits,
  massUnits,
  type AmountUnit,
  type MassUnit,
} from "@/lib/calculators";
import CalculatorShell from "./CalculatorShell";
import CalculatorWorkspace from "./CalculatorWorkspace";
import NumberField from "./NumberField";
import UnitSelect from "./UnitSelect";
import ResultPanel from "./ResultPanel";
import CalculationSteps from "./CalculationSteps";

const inputUnits = [...amountUnits, ...massUnits] as const;
type InputUnit = (typeof inputUnits)[number];

export default function StoichiometryCalculator() {
  const [reactantFormula, setReactantFormula] = useState("C2H4");
  const [productFormula, setProductFormula] = useState("C2H6O");
  const [reactantCoefficient, setReactantCoefficient] = useState("1");
  const [productCoefficient, setProductCoefficient] = useState("1");
  const [amount, setAmount] = useState("10");
  const [inputUnit, setInputUnit] = useState<InputUnit>("mmol");
  const [outputUnit, setOutputUnit] = useState<AmountUnit | MassUnit>("mmol");

  const calculation = useMemo(() => {
    try {
      const value = parsePositiveNumber(amount, "Reactant amount");
      const reactantMoles = inputUnit === "mol" || inputUnit === "mmol" || inputUnit === "µmol"
        ? amountInputToMoles({ value, unit: inputUnit })
        : amountInputToMoles({ value, unit: inputUnit, formula: reactantFormula });
      const productMoles = calculateStoichiometricProduct({
        reactantMoles,
        reactantCoefficient: parsePositiveNumber(reactantCoefficient, "Reactant coefficient"),
        productCoefficient: parsePositiveNumber(productCoefficient, "Product coefficient"),
      });
      const productMolarMass = calculateMolarMass(productFormula);
      const result = outputUnit === "mol" || outputUnit === "mmol" || outputUnit === "µmol"
        ? molesToAmount(productMoles, outputUnit)
        : gramsToMass(productMoles * productMolarMass, outputUnit);
      return {
        result,
        productMoles,
        productMolarMass,
        error: undefined,
      };
    } catch (error) {
      return { result: undefined, productMoles: undefined, productMolarMass: undefined, error: error instanceof Error ? error.message : "Could not calculate the reaction scale." };
    }
  }, [amount, inputUnit, outputUnit, productCoefficient, productFormula, reactantCoefficient, reactantFormula]);

  return (
    <CalculatorShell eyebrow="Reaction scale" title="Stoichiometry calculator" description="Convert a known reactant amount into the expected amount of product using a balanced-equation mole ratio." formula="n(product) = n(reactant) × coefficient(product) / coefficient(reactant)">
      <CalculatorWorkspace
        controls={
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">Reactant formula</span>
                <input value={reactantFormula} onChange={(event) => setReactantFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">Product formula</span>
                <input value={productFormula} onChange={(event) => setProductFormula(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-mono outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200" />
              </label>
              <NumberField id="stoich-reactant-coeff" label="Reactant coefficient" value={reactantCoefficient} onChange={setReactantCoefficient} />
              <NumberField id="stoich-product-coeff" label="Product coefficient" value={productCoefficient} onChange={setProductCoefficient} />
              <NumberField id="stoich-amount" label="Known reactant amount" value={amount} onChange={setAmount} />
              <UnitSelect id="stoich-input-unit" label="Known amount unit" value={inputUnit} options={inputUnits} onChange={setInputUnit} />
              <UnitSelect id="stoich-output-unit" label="Product result unit" value={outputUnit} options={inputUnits} onChange={setOutputUnit} />
            </div>
          </div>
        }
        result={<ResultPanel result={calculation.result !== undefined ? `${formatChemistryNumber(calculation.result)} ${outputUnit}` : undefined} error={calculation.error} secondary={calculation.productMoles !== undefined && calculation.productMolarMass ? [
          { label: "Product moles", value: `${formatChemistryNumber(calculation.productMoles)} mol` },
          { label: "Product molar mass", value: `${calculation.productMolarMass.toFixed(4)} g/mol` },
        ] : []} />}
        steps={calculation.result !== undefined ? <CalculationSteps steps={[
          `Convert the known ${reactantFormula} amount to moles.`,
          `Apply the ${reactantCoefficient}:${productCoefficient} stoichiometric ratio.`,
          `Convert product moles to ${outputUnit}.`,
        ]} /> : null}
        guidance={<p>Use coefficients from a correctly balanced equation. This calculator assumes the selected reactant is fully consumed and does not account for competing reactions.</p>}
      />
    </CalculatorShell>
  );
}
