import { spectroscopyDatasets } from "./spectroscopy-registry";
import type { SpectroscopyCapabilities, SpectroscopyDataset, SpectrumKind } from "./spectroscopy-types";

export function getSpectroscopyDatasetsByCapability(
  capability: keyof SpectroscopyCapabilities,
): readonly SpectroscopyDataset[] {
  return spectroscopyDatasets.filter((dataset) => dataset.capabilities[capability]);
}

export function getSpectroscopyDatasetsByFunctionalGroup(
  functionalGroupId: string,
): readonly SpectroscopyDataset[] {
  return spectroscopyDatasets.filter((dataset) =>
    dataset.relatedFunctionalGroupIds.includes(functionalGroupId),
  );
}

export function getAssignmentsForKind(dataset: SpectroscopyDataset, kind: SpectrumKind) {
  switch (kind) {
    case "proton-nmr": return dataset.protonNmr;
    case "carbon-nmr": return dataset.carbonNmr;
    case "ir": return dataset.ir;
    case "mass": return dataset.mass;
  }
}

export function searchSpectroscopyDatasets(query: string): readonly SpectroscopyDataset[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return spectroscopyDatasets;
  return spectroscopyDatasets.filter((dataset) =>
    [dataset.name, dataset.formula, dataset.summary, ...dataset.relatedFunctionalGroupIds]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}
