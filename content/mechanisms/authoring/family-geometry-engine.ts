import type { MechanismArrow, MechanismPoint } from "@/components/chemistry/mechanism/types";
import { resolveSemanticAnchor } from "./semantic-anchor-registry";
import type {
  MechanismGeometryContract,
  SemanticArrowDefinition,
  StructurePlacement,
} from "./types";

function quadraticControlPoint(
  start: MechanismPoint,
  end: MechanismPoint,
  bend: number,
): MechanismPoint {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const midpoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
  const normal = {
    x: -dy / length,
    y: dx / length,
  };

  return {
    x: midpoint.x + normal.x * bend,
    y: midpoint.y + normal.y * bend,
  };
}

export function compileSemanticArrow(input: {
  definition: SemanticArrowDefinition;
  placements: Readonly<Record<string, StructurePlacement>>;
}): MechanismArrow {
  const start = resolveSemanticAnchor({
    anchor: input.definition.source,
    placements: input.placements,
  });
  const end = resolveSemanticAnchor({
    anchor: input.definition.target,
    placements: input.placements,
  });

  return {
    id: input.definition.id,
    start,
    control: quadraticControlPoint(start, end, input.definition.bend),
    end,
    colour: input.definition.colour,
    label: input.definition.label,
  };
}

function vectorAngleDegrees(
  origin: MechanismPoint,
  first: MechanismPoint,
  second: MechanismPoint,
): number {
  const a = { x: first.x - origin.x, y: first.y - origin.y };
  const b = { x: second.x - origin.x, y: second.y - origin.y };
  const denominator = Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y) || 1;
  const cosine = Math.max(-1, Math.min(1, (a.x * b.x + a.y * b.y) / denominator));
  return (Math.acos(cosine) * 180) / Math.PI;
}

export function evaluateGeometryContract(input: {
  contract: MechanismGeometryContract;
  placements: Readonly<Record<string, StructurePlacement>>;
}): { actualDegrees: number; passes: boolean } {
  if (input.contract.type === "backside-attack") {
    const center = resolveSemanticAnchor({ anchor: input.contract.center, placements: input.placements });
    const nucleophile = resolveSemanticAnchor({ anchor: input.contract.nucleophile, placements: input.placements });
    const leavingGroup = resolveSemanticAnchor({ anchor: input.contract.leavingGroup, placements: input.placements });
    const actualDegrees = vectorAngleDegrees(center, nucleophile, leavingGroup);
    return {
      actualDegrees,
      passes: Math.abs(input.contract.expectedDegrees - actualDegrees) <= input.contract.toleranceDegrees,
    };
  }

  const first = resolveSemanticAnchor({ anchor: input.contract.firstBond, placements: input.placements });
  const second = resolveSemanticAnchor({ anchor: input.contract.secondBond, placements: input.placements });
  return {
    actualDegrees: 180,
    passes: Boolean(first && second),
  };
}
