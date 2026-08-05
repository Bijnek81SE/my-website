import { describe, expect, it } from "vitest";
import { createMechanismStep, validateMechanismStep } from "@/components/chemistry/mechanism/MechanismStep";

describe("MechanismStep", () => {
  it("creates deterministic defaults", () => {
    const step = createMechanismStep({
      title: "Form C O bond",
      bondChanges: [{ id: "bond-add", type: "add", bondId: "co", fromAtomId: "c", toAtomId: "o" }],
    });
    expect(step.id).toContain("form-c-o-bond");
    expect(step.confidence).toBe("high");
  });

  it("rejects empty steps", () => {
    const report = validateMechanismStep(createMechanismStep({ title: "Empty" }));
    expect(report.valid).toBe(false);
    expect(report.issues.some((issue) => issue.code === "empty-step")).toBe(true);
  });
});
