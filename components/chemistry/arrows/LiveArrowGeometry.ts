import type {
  SkeletalBond,
  SkeletalPoint,
} from "../skeletal/types";
import type {
  MolecularGraph,
} from "../graph/MolecularGraph";
import type {
  CurvedArrowAnchor,
  CurvedArrowDefinition,
  CurvedArrowGeometryHint,
} from "./CurvedArrowEngine";

export type LiveArrowTransform = {
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotationDegrees?: number;
  rotationCentre?: SkeletalPoint;
};

export type LiveArrowBoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export type LiveArrowGeometry = {
  start: SkeletalPoint;
  end: SkeletalPoint;
  control: SkeletalPoint;
  midpoint: SkeletalPoint;
  curveMidpoint: SkeletalPoint;
  startTangent: SkeletalPoint;
  endTangent: SkeletalPoint;
  normal: SkeletalPoint;
  arrowHeadAngle: number;
  labelAnchor: SkeletalPoint;
  boundingBox: LiveArrowBoundingBox;
  curveOffset: number;
};

export type LiveArrowGeometryOptions = {
  curveOffset?: number;
  sourceInset?: number;
  targetInset?: number;
  labelOffset?: number;
  boundingBoxPadding?: number;
  transform?: LiveArrowTransform;
};

const DEFAULT_CURVE_OFFSET = 52;
const DEFAULT_SOURCE_INSET = 8;
const DEFAULT_TARGET_INSET = 12;
const DEFAULT_LABEL_OFFSET = 18;
const DEFAULT_BOUNDING_BOX_PADDING = 14;

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

function addPoints(
  first: SkeletalPoint,
  second: SkeletalPoint,
): SkeletalPoint {
  return stablePoint({
    x: first.x + second.x,
    y: first.y + second.y,
  });
}

function subtractPoints(
  first: SkeletalPoint,
  second: SkeletalPoint,
): SkeletalPoint {
  return stablePoint({
    x: first.x - second.x,
    y: first.y - second.y,
  });
}

function scalePoint(
  point: SkeletalPoint,
  scalar: number,
): SkeletalPoint {
  return stablePoint({
    x: point.x * scalar,
    y: point.y * scalar,
  });
}

function vectorLength(
  vector: SkeletalPoint,
): number {
  return Math.hypot(
    vector.x,
    vector.y,
  );
}

function normaliseVector(
  vector: SkeletalPoint,
  fallback: SkeletalPoint = {
    x: 1,
    y: 0,
  },
): SkeletalPoint {
  const length =
    vectorLength(vector);

  if (length === 0) {
    return fallback;
  }

  return stablePoint({
    x: vector.x / length,
    y: vector.y / length,
  });
}

function perpendicular(
  vector: SkeletalPoint,
): SkeletalPoint {
  return stablePoint({
    x: -vector.y,
    y: vector.x,
  });
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

function quadraticPoint(
  start: SkeletalPoint,
  control: SkeletalPoint,
  end: SkeletalPoint,
  t: number,
): SkeletalPoint {
  const oneMinusT = 1 - t;

  return stablePoint({
    x:
      oneMinusT *
        oneMinusT *
        start.x +
      2 *
        oneMinusT *
        t *
        control.x +
      t * t * end.x,
    y:
      oneMinusT *
        oneMinusT *
        start.y +
      2 *
        oneMinusT *
        t *
        control.y +
      t * t * end.y,
  });
}

function quadraticTangent(
  start: SkeletalPoint,
  control: SkeletalPoint,
  end: SkeletalPoint,
  t: number,
): SkeletalPoint {
  return normaliseVector({
    x:
      2 *
        (1 - t) *
        (control.x - start.x) +
      2 *
        t *
        (end.x - control.x),
    y:
      2 *
        (1 - t) *
        (control.y - start.y) +
      2 *
        t *
        (end.y - control.y),
  });
}

function rotatePoint(
  point: SkeletalPoint,
  centre: SkeletalPoint,
  rotationDegrees: number,
): SkeletalPoint {
  const radians =
    (rotationDegrees * Math.PI) /
    180;

  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);

  const translatedX =
    point.x - centre.x;

  const translatedY =
    point.y - centre.y;

  return stablePoint({
    x:
      centre.x +
      translatedX * cosine -
      translatedY * sine,
    y:
      centre.y +
      translatedX * sine +
      translatedY * cosine,
  });
}

function applyTransform(
  point: SkeletalPoint,
  transform?: LiveArrowTransform,
): SkeletalPoint {
  if (!transform) {
    return stablePoint(point);
  }

  const scale =
    transform.scale ?? 1;

  const rotationCentre =
    transform.rotationCentre ?? {
      x: 0,
      y: 0,
    };

  const scaledPoint = {
    x:
      rotationCentre.x +
      (point.x -
        rotationCentre.x) *
        scale,
    y:
      rotationCentre.y +
      (point.y -
        rotationCentre.y) *
        scale,
  };

  const rotatedPoint =
    rotatePoint(
      scaledPoint,
      rotationCentre,
      transform.rotationDegrees ??
        0,
    );

  return stablePoint({
    x:
      rotatedPoint.x +
      (transform.translateX ?? 0),
    y:
      rotatedPoint.y +
      (transform.translateY ?? 0),
  });
}

function getBondMidpoint(
  graph: MolecularGraph,
  bond: SkeletalBond,
): SkeletalPoint | null {
  const fromAtom =
    graph.getAtom(bond.from);

  const toAtom =
    graph.getAtom(bond.to);

  if (!fromAtom || !toAtom) {
    return null;
  }

  return midpoint(
    fromAtom.position,
    toAtom.position,
  );
}

export function resolveLiveArrowAnchor(
  graph: MolecularGraph,
  anchor: CurvedArrowAnchor,
  transform?: LiveArrowTransform,
): SkeletalPoint | null {
  if (
    anchor.kind === "atom" &&
    anchor.atomId
  ) {
    const atom =
      graph.getAtom(anchor.atomId);

    return atom
      ? applyTransform(
          atom.position,
          transform,
        )
      : null;
  }

  if (
    anchor.kind === "bond" &&
    anchor.bondId
  ) {
    const bond =
      graph.getBond(anchor.bondId);

    if (!bond) {
      return null;
    }

    const bondMidpoint =
      getBondMidpoint(
        graph,
        bond,
      );

    return bondMidpoint
      ? applyTransform(
          bondMidpoint,
          transform,
        )
      : null;
  }

  return null;
}

function insetEndpoint({
  point,
  toward,
  inset,
}: {
  point: SkeletalPoint;
  toward: SkeletalPoint;
  inset: number;
}): SkeletalPoint {
  if (inset === 0) {
    return stablePoint(point);
  }

  const direction =
    normaliseVector(
      subtractPoints(
        toward,
        point,
      ),
    );

  return addPoints(
    point,
    scalePoint(
      direction,
      inset,
    ),
  );
}

function createBoundingBox({
  start,
  control,
  end,
  padding,
}: {
  start: SkeletalPoint;
  control: SkeletalPoint;
  end: SkeletalPoint;
  padding: number;
}): LiveArrowBoundingBox {
  const samplePoints =
    Array.from(
      { length: 21 },
      (_, index) =>
        quadraticPoint(
          start,
          control,
          end,
          index / 20,
        ),
    );

  const xValues =
    samplePoints.map(
      (point) => point.x,
    );

  const yValues =
    samplePoints.map(
      (point) => point.y,
    );

  const minX =
    Math.min(...xValues) -
    padding;

  const minY =
    Math.min(...yValues) -
    padding;

  const maxX =
    Math.max(...xValues) +
    padding;

  const maxY =
    Math.max(...yValues) +
    padding;

  return {
    x: stableCoordinate(minX),
    y: stableCoordinate(minY),
    width: stableCoordinate(
      maxX - minX,
    ),
    height: stableCoordinate(
      maxY - minY,
    ),
    minX: stableCoordinate(minX),
    minY: stableCoordinate(minY),
    maxX: stableCoordinate(maxX),
    maxY: stableCoordinate(maxY),
  };
}

export function calculateLiveArrowGeometry(
  graph: MolecularGraph,
  arrow: CurvedArrowDefinition,
  options: LiveArrowGeometryOptions = {},
): LiveArrowGeometry | null {
  const unresolvedStart =
    resolveLiveArrowAnchor(
      graph,
      arrow.source,
      options.transform,
    );

  const unresolvedEnd =
    resolveLiveArrowAnchor(
      graph,
      arrow.target,
      options.transform,
    );

  if (
    !unresolvedStart ||
    !unresolvedEnd
  ) {
    return null;
  }

  const chordDirection =
    normaliseVector(
      subtractPoints(
        unresolvedEnd,
        unresolvedStart,
      ),
    );

  const normal =
    perpendicular(
      chordDirection,
    );

  const sourceInset =
    options.sourceInset ??
    DEFAULT_SOURCE_INSET;

  const targetInset =
    options.targetInset ??
    DEFAULT_TARGET_INSET;

  const start =
    insetEndpoint({
      point: unresolvedStart,
      toward: unresolvedEnd,
      inset: sourceInset,
    });

  const end =
    insetEndpoint({
      point: unresolvedEnd,
      toward: unresolvedStart,
      inset: targetInset,
    });

  const curveOffset =
    options.curveOffset ??
    arrow.geometry.curveOffset ??
    DEFAULT_CURVE_OFFSET;

  const chordMidpoint =
    midpoint(start, end);

  const control =
    addPoints(
      chordMidpoint,
      scalePoint(
        normal,
        curveOffset,
      ),
    );

  const curveMidpoint =
    quadraticPoint(
      start,
      control,
      end,
      0.5,
    );

  const startTangent =
    quadraticTangent(
      start,
      control,
      end,
      0,
    );

  const endTangent =
    quadraticTangent(
      start,
      control,
      end,
      1,
    );

  const curveNormal =
    perpendicular(
      quadraticTangent(
        start,
        control,
        end,
        0.5,
      ),
    );

  const labelOffset =
    options.labelOffset ??
    DEFAULT_LABEL_OFFSET;

  const labelDirection =
    curveOffset >= 0
      ? curveNormal
      : scalePoint(
          curveNormal,
          -1,
        );

  const labelAnchor =
    addPoints(
      curveMidpoint,
      scalePoint(
        labelDirection,
        labelOffset,
      ),
    );

  const arrowHeadAngle =
    stableCoordinate(
      (
        Math.atan2(
          endTangent.y,
          endTangent.x,
        ) *
        180
      ) /
        Math.PI,
    );

  return {
    start,
    end,
    control,
    midpoint: chordMidpoint,
    curveMidpoint,
    startTangent,
    endTangent,
    normal,
    arrowHeadAngle,
    labelAnchor,
    boundingBox:
      createBoundingBox({
        start,
        control,
        end,
        padding:
          options.boundingBoxPadding ??
          DEFAULT_BOUNDING_BOX_PADDING,
      }),
    curveOffset:
      stableCoordinate(
        curveOffset,
      ),
  };
}

export function updateArrowWithLiveGeometry(
  graph: MolecularGraph,
  arrow: CurvedArrowDefinition,
  options: LiveArrowGeometryOptions = {},
): CurvedArrowDefinition | null {
  const liveGeometry =
    calculateLiveArrowGeometry(
      graph,
      arrow,
      options,
    );

  if (!liveGeometry) {
    return null;
  }

  const geometry:
    CurvedArrowGeometryHint = {
    start: liveGeometry.start,
    end: liveGeometry.end,
    control:
      liveGeometry.control,
    midpoint:
      liveGeometry.midpoint,
    normal: liveGeometry.normal,
    curveOffset:
      liveGeometry.curveOffset,
  };

  return {
    ...arrow,
    geometry,
  };
}

export function updateArrowsWithLiveGeometry(
  graph: MolecularGraph,
  arrows:
    readonly CurvedArrowDefinition[],
  options: LiveArrowGeometryOptions = {},
): readonly CurvedArrowDefinition[] {
  return arrows.flatMap((arrow) => {
    const updatedArrow =
      updateArrowWithLiveGeometry(
        graph,
        arrow,
        options,
      );

    return updatedArrow
      ? [updatedArrow]
      : [];
  });
}

export function createLiveArrowPath(
  geometry: LiveArrowGeometry,
): string {
  return [
    "M",
    geometry.start.x,
    geometry.start.y,
    "Q",
    geometry.control.x,
    geometry.control.y,
    geometry.end.x,
    geometry.end.y,
  ].join(" ");
}

export function getLiveArrowPointAt(
  geometry: LiveArrowGeometry,
  progress: number,
): SkeletalPoint {
  const clampedProgress =
    Math.min(
      1,
      Math.max(0, progress),
    );

  return quadraticPoint(
    geometry.start,
    geometry.control,
    geometry.end,
    clampedProgress,
  );
}

export function getLiveArrowTangentAt(
  geometry: LiveArrowGeometry,
  progress: number,
): SkeletalPoint {
  const clampedProgress =
    Math.min(
      1,
      Math.max(0, progress),
    );

  return quadraticTangent(
    geometry.start,
    geometry.control,
    geometry.end,
    clampedProgress,
  );
}