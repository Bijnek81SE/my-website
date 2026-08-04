import type {
  SkeletalBond,
  SkeletalPoint,
} from "../skeletal/types";
import type {
  MolecularGraph,
} from "../graph/MolecularGraph";
import {
  validateResonanceMove,
  type ResonanceConfidence,
  type ResonanceElectronSourceType,
  type ResonanceElectronTargetType,
  type ResonanceMove,
  type ResonanceMoveIssue,
} from "../graph/ResonanceEngine";

export type CurvedArrowHead =
  | "full"
  | "fishhook";

export type CurvedArrowSourceType =
  ResonanceElectronSourceType;

export type CurvedArrowTargetType =
  ResonanceElectronTargetType;

export type CurvedArrowAnchorKind =
  | "atom"
  | "bond";

export type CurvedArrowAnchor = {
  kind: CurvedArrowAnchorKind;
  atomId?: string;
  bondId?: string;
};

export type CurvedArrowGeometryHint = {
  start: SkeletalPoint;
  end: SkeletalPoint;
  control: SkeletalPoint;
  midpoint: SkeletalPoint;
  normal: SkeletalPoint;
  curveOffset: number;
};

export type CurvedArrowDefinition = {
  id: string;
  sourceType: CurvedArrowSourceType;
  source: CurvedArrowAnchor;
  targetType: CurvedArrowTargetType;
  target: CurvedArrowAnchor;
  electronCount: 1 | 2;
  head: CurvedArrowHead;
  geometry: CurvedArrowGeometryHint;
  confidence: ResonanceConfidence;
  valid: boolean;
  issues: readonly ResonanceMoveIssue[];
  reasoning: readonly string[];
};

export type CurvedArrowInput = {
  id?: string;
  sourceType: CurvedArrowSourceType;
  sourceAtomId?: string;
  sourceBondId?: string;
  targetType: CurvedArrowTargetType;
  targetAtomId?: string;
  targetBondId?: string;
  electronCount?: 1 | 2;
  curveOffset?: number;
};

export type CurvedArrowValidationResult = {
  valid: boolean;
  confidence: ResonanceConfidence;
  issues: readonly ResonanceMoveIssue[];
  reasoning: readonly string[];
  move: ResonanceMove;
};

const DEFAULT_CURVE_OFFSET = 52;

function stableCoordinate(
  value: number,
): number {
  return (
    Math.round(value * 10_000) /
    10_000
  );
}

function stablePoint(
  point: SkeletalPoint,
): SkeletalPoint {
  return {
    x: stableCoordinate(point.x),
    y: stableCoordinate(point.y),
  };
}

function midpoint(
  first: SkeletalPoint,
  second: SkeletalPoint,
): SkeletalPoint {
  return stablePoint({
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  });
}

function unitNormal(
  start: SkeletalPoint,
  end: SkeletalPoint,
): SkeletalPoint {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return {
      x: 0,
      y: -1,
    };
  }

  return stablePoint({
    x: -dy / length,
    y: dx / length,
  });
}

function getBondMidpoint(
  graph: MolecularGraph,
  bond: SkeletalBond,
): SkeletalPoint | null {
  const fromAtom = graph.getAtom(
    bond.from,
  );

  const toAtom = graph.getAtom(
    bond.to,
  );

  if (!fromAtom || !toAtom) {
    return null;
  }

  return midpoint(
    fromAtom.position,
    toAtom.position,
  );
}

function resolveAnchorPoint(
  graph: MolecularGraph,
  anchor: CurvedArrowAnchor,
): SkeletalPoint | null {
  if (
    anchor.kind === "atom" &&
    anchor.atomId
  ) {
    return (
      graph.getAtom(anchor.atomId)
        ?.position ?? null
    );
  }

  if (
    anchor.kind === "bond" &&
    anchor.bondId
  ) {
    const bond = graph.getBond(
      anchor.bondId,
    );

    if (!bond) {
      return null;
    }

    return getBondMidpoint(
      graph,
      bond,
    );
  }

  return null;
}

function normalizeSource(
  input: CurvedArrowInput,
): CurvedArrowAnchor {
  if (input.sourceBondId) {
    return {
      kind: "bond",
      bondId: input.sourceBondId,
    };
  }

  return {
    kind: "atom",
    atomId: input.sourceAtomId,
  };
}

function normalizeTarget(
  input: CurvedArrowInput,
): CurvedArrowAnchor {
  if (input.targetBondId) {
    return {
      kind: "bond",
      bondId: input.targetBondId,
    };
  }

  return {
    kind: "atom",
    atomId: input.targetAtomId,
  };
}

function anchorIdentifier(
  anchor: CurvedArrowAnchor,
): string {
  return (
    anchor.bondId ??
    anchor.atomId ??
    "unknown"
  );
}

function createArrowId(
  input: CurvedArrowInput,
  source: CurvedArrowAnchor,
  target: CurvedArrowAnchor,
  electronCount: 1 | 2,
): string {
  if (input.id) {
    return input.id;
  }

  return [
    "curved-arrow",
    input.sourceType,
    anchorIdentifier(source),
    "to",
    input.targetType,
    anchorIdentifier(target),
    electronCount === 1
      ? "fishhook"
      : "full",
  ].join("-");
}

function createResonanceMove(
  input: CurvedArrowInput,
  arrowId: string,
  electronCount: 1 | 2,
): ResonanceMove {
  return {
    id: `move-${arrowId}`,
    sourceType: input.sourceType,
    sourceAtomId:
      input.sourceAtomId,
    sourceBondId:
      input.sourceBondId,
    targetType: input.targetType,
    targetAtomId:
      input.targetAtomId,
    targetBondId:
      input.targetBondId,
    electronCount,
  };
}

function createGeometry({
  start,
  end,
  curveOffset,
}: {
  start: SkeletalPoint;
  end: SkeletalPoint;
  curveOffset: number;
}): CurvedArrowGeometryHint {
  const centre = midpoint(start, end);
  const normal = unitNormal(
    start,
    end,
  );

  const control = stablePoint({
    x:
      centre.x +
      normal.x * curveOffset,
    y:
      centre.y +
      normal.y * curveOffset,
  });

  return {
    start: stablePoint(start),
    end: stablePoint(end),
    control,
    midpoint: centre,
    normal,
    curveOffset:
      stableCoordinate(curveOffset),
  };
}

export function validateCurvedArrow(
  graph: MolecularGraph,
  input: CurvedArrowInput,
): CurvedArrowValidationResult {
  const source =
    normalizeSource(input);

  const target =
    normalizeTarget(input);

  const electronCount =
    input.electronCount ??
    (
      input.sourceType === "radical"
        ? 1
        : 2
    );

  const arrowId = createArrowId(
    input,
    source,
    target,
    electronCount,
  );

  const move = createResonanceMove(
    input,
    arrowId,
    electronCount,
  );

  const validation =
    validateResonanceMove(
      graph,
      move,
    );

  return {
    valid: validation.valid,
    confidence:
      validation.confidence,
    issues: validation.issues,
    reasoning:
      validation.reasoning,
    move,
  };
}

export function createCurvedArrow(
  graph: MolecularGraph,
  input: CurvedArrowInput,
): CurvedArrowDefinition | null {
  const source =
    normalizeSource(input);

  const target =
    normalizeTarget(input);

  const electronCount =
    input.electronCount ??
    (
      input.sourceType === "radical"
        ? 1
        : 2
    );

  const arrowId = createArrowId(
    input,
    source,
    target,
    electronCount,
  );

  const start = resolveAnchorPoint(
    graph,
    source,
  );

  const end = resolveAnchorPoint(
    graph,
    target,
  );

  if (!start || !end) {
    return null;
  }

  const validation =
    validateCurvedArrow(
      graph,
      {
        ...input,
        id: arrowId,
        electronCount,
      },
    );

  return {
    id: arrowId,
    sourceType: input.sourceType,
    source,
    targetType: input.targetType,
    target,
    electronCount,
    head:
      electronCount === 1
        ? "fishhook"
        : "full",
    geometry: createGeometry({
      start,
      end,
      curveOffset:
        input.curveOffset ??
        DEFAULT_CURVE_OFFSET,
    }),
    confidence:
      validation.confidence,
    valid: validation.valid,
    issues: validation.issues,
    reasoning:
      validation.reasoning,
  };
}

export function createCurvedArrows(
  graph: MolecularGraph,
  inputs: readonly CurvedArrowInput[],
): readonly CurvedArrowDefinition[] {
  return inputs.flatMap((input) => {
    const arrow =
      createCurvedArrow(
        graph,
        input,
      );

    return arrow ? [arrow] : [];
  });
}

export function createCurvedArrowFromResonanceMove(
  graph: MolecularGraph,
  move: ResonanceMove,
  options: {
    id?: string;
    curveOffset?: number;
  } = {},
): CurvedArrowDefinition | null {
  return createCurvedArrow(
    graph,
    {
      id:
        options.id ??
        `arrow-${move.id}`,
      sourceType:
        move.sourceType,
      sourceAtomId:
        move.sourceAtomId,
      sourceBondId:
        move.sourceBondId,
      targetType:
        move.targetType,
      targetAtomId:
        move.targetAtomId,
      targetBondId:
        move.targetBondId,
      electronCount:
        move.electronCount,
      curveOffset:
        options.curveOffset,
    },
  );
}

export function reverseCurvedArrow(
  graph: MolecularGraph,
  arrow: CurvedArrowDefinition,
): CurvedArrowDefinition | null {
  const reversedSourceType:
    CurvedArrowSourceType =
    arrow.target.kind === "bond"
      ? "pi-bond"
      : arrow.electronCount === 1
        ? "radical"
        : "lone-pair";

  return createCurvedArrow(
    graph,
    {
      id: `${arrow.id}-reversed`,
      sourceType:
        reversedSourceType,
      sourceAtomId:
        arrow.target.atomId,
      sourceBondId:
        arrow.target.bondId,
      targetType:
        arrow.source.kind,
      targetAtomId:
        arrow.source.atomId,
      targetBondId:
        arrow.source.bondId,
      electronCount:
        arrow.electronCount,
      curveOffset:
        -arrow.geometry
          .curveOffset,
    },
  );
}

export function offsetCurvedArrow(
  arrow: CurvedArrowDefinition,
  curveOffset: number,
): CurvedArrowDefinition {
  return {
    ...arrow,
    geometry: createGeometry({
      start:
        arrow.geometry.start,
      end:
        arrow.geometry.end,
      curveOffset,
    }),
  };
}

export function curvedArrowToResonanceMove(
  arrow: CurvedArrowDefinition,
): ResonanceMove {
  return {
    id: `move-${arrow.id}`,
    sourceType:
      arrow.sourceType,
    sourceAtomId:
      arrow.source.atomId,
    sourceBondId:
      arrow.source.bondId,
    targetType:
      arrow.targetType,
    targetAtomId:
      arrow.target.atomId,
    targetBondId:
      arrow.target.bondId,
    electronCount:
      arrow.electronCount,
  };
}

export function isFishhookArrow(
  arrow: CurvedArrowDefinition,
): boolean {
  return (
    arrow.head === "fishhook" &&
    arrow.electronCount === 1
  );
}

export function isFullCurvedArrow(
  arrow: CurvedArrowDefinition,
): boolean {
  return (
    arrow.head === "full" &&
    arrow.electronCount === 2
  );
}