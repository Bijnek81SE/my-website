import { requireMolecule } from "@/content/molecules";
import type { SpectroscopyDataset, SpectroscopyDatasetInput } from "./spectroscopy-types";

const defaultCapabilities = {
  lab: true,
  workspace: true,
  assignments: true,
  challenges: true,
  importReady: true,
} as const;

export function materializeSpectroscopyDataset(
  input: SpectroscopyDatasetInput,
): SpectroscopyDataset {
  const molecule = requireMolecule(input.moleculeId);
  return {
    ...input,
    name: molecule.name,
    formula: molecule.displayFormula,
    atoms: molecule.structure.atoms,
    bonds: molecule.structure.bonds,
    relatedLessonIds:
      input.relatedLessonIds ?? molecule.lessonRelations.map((relation) => relation.id),
    relatedFunctionalGroupIds:
      input.relatedFunctionalGroupIds ?? molecule.functionalGroupIds,
    rawSpectra: input.rawSpectra ?? [],
    source: input.source ?? { kind: "simulated" },
    capabilities: { ...defaultCapabilities, ...input.capabilities },
  };
}
