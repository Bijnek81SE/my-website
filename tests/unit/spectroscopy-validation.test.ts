import { describe, expect, it } from "vitest";
import { spectroscopyDatasets, validateSpectroscopyDatasets } from "@/content/spectroscopy";

describe("spectroscopy validation", () => {
  it("rejects assignments that reference missing atoms", () => {
    const ethanol = spectroscopyDatasets[0];
    const invalid = {
      ...ethanol,
      protonNmr: [
        ...ethanol.protonNmr,
        {
          id: "invalid-signal",
          label: "Invalid",
          atomIds: ["missing-atom"],
          explanation: "Invalid assignment used to verify validation.",
          shift: 1,
          integration: 1,
          multiplicity: "s" as const,
        },
      ],
    };
    expect(validateSpectroscopyDatasets([invalid]).some((issue) => issue.code === "unknown-assigned-atom")).toBe(true);
  });
});
