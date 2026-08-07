import type { CompiledMechanismDefinition } from "./mechanism-authoring-types";

export type MechanismAuthoringIssue = {
  code: "unsupported-family" | "missing-steps" | "geometry-contract";
  message: string;
};

export function validateCompiledMechanism(
  definition: CompiledMechanismDefinition,
): readonly MechanismAuthoringIssue[] {
  const issues: MechanismAuthoringIssue[] = [];

  if (definition.steps.length === 0) {
    issues.push({ code: "missing-steps", message: `${definition.id} has no compiled steps.` });
  }

  if (definition.family === "sn2" && definition.geometry.backsideAttackDegrees !== 180) {
    issues.push({
      code: "geometry-contract",
      message: `${definition.id} must encode a 180 degree backside-attack relationship.`,
    });
  }

  if (definition.family === "e2" && definition.geometry.antiPeriplanarDihedralDegrees !== 180) {
    issues.push({
      code: "geometry-contract",
      message: `${definition.id} must encode a 180 degree anti-periplanar H-C-C-LG relationship.`,
    });
  }

  return issues;
}
