# Quantitative Chemistry Calculators Platform

The calculator platform provides shared UI, validation, unit conversion, formula parsing, and transparent calculation steps for quantitative chemistry problems.

## Published calculators

- `/calculators/molecular-weight`
- `/calculators/molarity`
- `/calculators/dilution`
- `/calculators/stoichiometry`
- `/calculators/limiting-reagent`
- `/calculators/percent-yield`
- `/calculators/lewis-structure-builder`

## Design principles

1. Convert all values to SI-style base units before calculating.
2. Show the governing equation and intermediate steps.
3. Reject missing, non-finite, or physically impossible values.
4. Keep molecular-formula parsing deterministic and dependency-free.
5. Explain assumptions, especially purity, conversion, and balanced-equation requirements.

## Formula support

The molar-mass engine supports ordinary element counts, parentheses, square brackets, and hydrate notation using `.` or `·`.

Examples: `C6H12O6`, `Ca(OH)2`, `K4[Fe(CN)6]`, `CuSO4·5H2O`.

## Extending the platform

Add reusable mathematical logic under `lib/calculators`, UI under `components/calculators`, route metadata under `app/calculators`, and tests before publishing a new tool.
