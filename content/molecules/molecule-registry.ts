import { alphaMethylstyrene } from "./records/alpha-methylstyrene";
import { cisTwoButene } from "./records/cis-two-butene";
import { cyclohexene } from "./records/cyclohexene";
import { cyclopentene } from "./records/cyclopentene";
import { ethene } from "./records/ethene";
import { oneButene } from "./records/one-butene";
import { oneHexene } from "./records/one-hexene";
import { onePentene } from "./records/one-pentene";
import { styrene } from "./records/styrene";
import { transTwoButene } from "./records/trans-two-butene";
import { twoMethylpropene } from "./records/two-methylpropene";
import { twoMethylTwoButene } from "./records/two-methyl-two-butene";
import { acetone } from "./records/acetone";
import { ethanol } from "./records/ethanol";
import { ethylAcetate } from "./records/ethyl-acetate";
import { propene } from "./records/propene";
import { toluene } from "./records/toluene";
import { twoBromopropane } from "./records/two-bromopropane";
import type { MoleculeDefinition } from "./molecule-types";

export const molecules = [
  ethanol,
  acetone,
  ethylAcetate,
  toluene,
  ethene,
  propene,
  oneButene,
  cisTwoButene,
  transTwoButene,
  twoMethylpropene,
  onePentene,
  oneHexene,
  twoMethylTwoButene,
  cyclopentene,
  cyclohexene,
  styrene,
  alphaMethylstyrene,
  twoBromopropane,
] as const satisfies readonly MoleculeDefinition[];

const moleculesById = new Map<string, MoleculeDefinition>(
  molecules.map((molecule) => [molecule.id, molecule]),
);

const moleculesByAlias = new Map<string, MoleculeDefinition>();
for (const molecule of molecules) {
  moleculesByAlias.set(molecule.name.toLowerCase(), molecule);
  for (const alias of molecule.aliases) {
    moleculesByAlias.set(alias.toLowerCase(), molecule);
  }
}

export function getMolecule(id: string): MoleculeDefinition | undefined {
  return moleculesById.get(id);
}

export function requireMolecule(id: string): MoleculeDefinition {
  const molecule = getMolecule(id);
  if (!molecule) throw new Error(`Unknown molecule id: ${id}`);
  return molecule;
}

export function findMoleculeByNameOrAlias(value: string): MoleculeDefinition | undefined {
  return moleculesByAlias.get(value.trim().toLowerCase());
}

export function getMoleculesByCapability(
  capability: keyof MoleculeDefinition["capabilities"],
): readonly MoleculeDefinition[] {
  return molecules.filter((molecule) => molecule.capabilities[capability]);
}
