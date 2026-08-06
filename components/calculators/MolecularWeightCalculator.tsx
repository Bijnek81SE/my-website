"use client";

import { useMemo, useState } from "react";
import {
  calculateElementMassPercentages,
  calculateMolarMass,
  parseMolecularFormula,
} from "@/lib/calculators";
import CalculatorShell from "./CalculatorShell";
import CalculatorWorkspace from "./CalculatorWorkspace";
import ResultPanel from "./ResultPanel";
import CalculationSteps from "./CalculationSteps";

type MolecularWeightCalculation = {
  composition: Record<string, number>;
  molarMass: number | undefined;
  percentages: Record<string, number>;
  error: string | undefined;
};

export default function MolecularWeightCalculator() {
  const [formula, setFormula] = useState("C8H10N4O2");

  const calculation = useMemo<MolecularWeightCalculation>(() => {
    try {
      const composition = parseMolecularFormula(formula);
      const molarMass = calculateMolarMass(formula);
      const percentages = calculateElementMassPercentages(formula);

      return {
        composition,
        molarMass,
        percentages,
        error: undefined,
      };
    } catch (error) {
      return {
        composition: {},
        molarMass: undefined,
        percentages: {},
        error:
          error instanceof Error
            ? error.message
            : "Could not parse the formula.",
      };
    }
  }, [formula]);

  const breakdown = Object.entries(calculation.composition).map(
    ([element, count]) => ({
      element,
      count,
      contribution: calculateMolarMass(
        `${element}${count === 1 ? "" : count}`,
      ),
      percentage: calculation.percentages[element] ?? 0,
    }),
  );

  return (
    <CalculatorShell
      eyebrow="Formula and composition"
      title="Molecular weight calculator"
      description="Parse molecular formulas, including brackets and hydrates, then inspect molar mass and elemental composition."
      formula="molar mass = Σ(atom count × atomic weight)"
    >
      <CalculatorWorkspace
        controls={
          <div>
            <label
              htmlFor="formula"
              className="block text-sm font-semibold text-slate-800"
            >
              Molecular formula
            </label>

            <input
              id="formula"
              value={formula}
              onChange={(event) => setFormula(event.target.value)}
              placeholder="Examples: C6H12O6, Ca(OH)2, CuSO4·5H2O"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Supports nested parentheses or brackets, hydrate dots, and
              common element symbols.
            </p>

            {breakdown.length > 0 && !calculation.error ? (
              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Element</th>
                      <th className="px-4 py-3 font-semibold">Atoms</th>
                      <th className="px-4 py-3 font-semibold">
                        Mass contribution
                      </th>
                      <th className="px-4 py-3 font-semibold">Mass %</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {breakdown.map((row) => (
                      <tr key={row.element}>
                        <td className="px-4 py-3 font-semibold text-slate-950">
                          {row.element}
                        </td>
                        <td className="px-4 py-3">{row.count}</td>
                        <td className="px-4 py-3">
                          {row.contribution.toFixed(4)} g/mol
                        </td>
                        <td className="px-4 py-3">
                          {row.percentage.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        }
        result={
          <ResultPanel
            result={
              calculation.molarMass
                ? `${calculation.molarMass.toFixed(4)} g/mol`
                : undefined
            }
            error={calculation.error}
            secondary={
              calculation.molarMass
                ? [
                    {
                      label: "Formula",
                      value: formula,
                    },
                    {
                      label: "Elements",
                      value: Object.keys(calculation.composition).join(", "),
                    },
                  ]
                : []
            }
          />
        }
        steps={
          calculation.molarMass ? (
            <CalculationSteps
              steps={[
                `Parse ${formula} into element counts.`,
                "Multiply each count by its standard atomic weight.",
                `Add the contributions to obtain ${calculation.molarMass.toFixed(
                  4,
                )} g/mol.`,
              ]}
            />
          ) : null
        }
        guidance={
          <p>
            For salts and solvates, use a middle dot or period, for example
            CuSO4·5H2O.
          </p>
        }
      />
    </CalculatorShell>
  );
}