import { getMolecule } from "@/content/molecules";
import type { SpectroscopyDataset } from "./spectroscopy-types";

export type SpectroscopyValidationIssueCode =
  | "duplicate-dataset-id"
  | "duplicate-molecule-dataset"
  | "missing-molecule"
  | "molecule-capability-mismatch"
  | "duplicate-assignment-id"
  | "unknown-assigned-atom"
  | "invalid-proton-integration"
  | "invalid-mass-intensity";

export type SpectroscopyValidationIssue = {
  code: SpectroscopyValidationIssueCode;
  datasetId: string;
  message: string;
};

export function validateSpectroscopyDatasets(
  datasets: readonly SpectroscopyDataset[],
): readonly SpectroscopyValidationIssue[] {
  const issues: SpectroscopyValidationIssue[] = [];
  const ids = new Set<string>();
  const moleculeIds = new Set<string>();

  for (const dataset of datasets) {
    if (ids.has(dataset.id)) issues.push({ code: "duplicate-dataset-id", datasetId: dataset.id, message: `Duplicate spectroscopy dataset id: ${dataset.id}` });
    ids.add(dataset.id);
    if (moleculeIds.has(dataset.moleculeId)) issues.push({ code: "duplicate-molecule-dataset", datasetId: dataset.id, message: `Multiple spectroscopy datasets reference molecule: ${dataset.moleculeId}` });
    moleculeIds.add(dataset.moleculeId);

    const molecule = getMolecule(dataset.moleculeId);
    if (!molecule) {
      issues.push({ code: "missing-molecule", datasetId: dataset.id, message: `Unknown molecule id: ${dataset.moleculeId}` });
      continue;
    }
    if (!molecule.capabilities.spectroscopy) issues.push({ code: "molecule-capability-mismatch", datasetId: dataset.id, message: `Molecule ${dataset.moleculeId} does not declare spectroscopy capability.` });

    const atomIds = new Set(molecule.structure.atoms.map((atom) => atom.id));
    const assignmentIds = new Set<string>();
    const assignments = [...dataset.protonNmr, ...dataset.carbonNmr, ...dataset.ir, ...dataset.mass];
    for (const assignment of assignments) {
      if (assignmentIds.has(assignment.id)) issues.push({ code: "duplicate-assignment-id", datasetId: dataset.id, message: `Duplicate assignment id: ${assignment.id}` });
      assignmentIds.add(assignment.id);
      for (const atomId of assignment.atomIds) {
        if (!atomIds.has(atomId)) issues.push({ code: "unknown-assigned-atom", datasetId: dataset.id, message: `Assignment ${assignment.id} references unknown atom ${atomId}.` });
      }
    }
    for (const signal of dataset.protonNmr) {
      if (signal.integration <= 0) issues.push({ code: "invalid-proton-integration", datasetId: dataset.id, message: `Signal ${signal.id} must have positive integration.` });
    }
    for (const signal of dataset.mass) {
      if (signal.intensity < 0 || signal.intensity > 100) issues.push({ code: "invalid-mass-intensity", datasetId: dataset.id, message: `Mass signal ${signal.id} intensity must be between 0 and 100.` });
    }
  }

  return issues;
}
