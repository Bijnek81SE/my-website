import type { Point } from "./types";

export function quadraticBezierPoint(
  start: Point,
  control: Point,
  end: Point,
  t: number,
): Point {
  const u = 1 - t;

  return {
    x:
      u * u * start.x +
      2 * u * t * control.x +
      t * t * end.x,
    y:
      u * u * start.y +
      2 * u * t * control.y +
      t * t * end.y,
  };
}

export function quadraticBezierTangent(
  start: Point,
  control: Point,
  end: Point,
  t: number,
): Point {
  return {
    x:
      2 * (1 - t) * (control.x - start.x) +
      2 * t * (end.x - control.x),
    y:
      2 * (1 - t) * (control.y - start.y) +
      2 * t * (end.y - control.y),
  };
}

export function quadraticBezierMidpoint(
  start: Point,
  control: Point,
  end: Point,
): Point {
  return quadraticBezierPoint(
    start,
    control,
    end,
    0.5,
  );
}

export function quadraticBezierLength(
  start: Point,
  control: Point,
  end: Point,
  segments = 32,
): number {
  let length = 0;
  let previous = start;

  for (let i = 1; i <= segments; i++) {
    const current = quadraticBezierPoint(
      start,
      control,
      end,
      i / segments,
    );

    length += Math.hypot(
      current.x - previous.x,
      current.y - previous.y,
    );

    previous = current;
  }

  return length;
}