export type Point = {
  x: number;
  y: number;
};

export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function midpoint(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

export function angleBetween(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function projectPoint(
  origin: Point,
  angleDegrees: number,
  length: number,
): Point {
  const radians = (angleDegrees * Math.PI) / 180;

  return {
    x: origin.x + Math.cos(radians) * length,
    y: origin.y + Math.sin(radians) * length,
  };
}

export function rotatePoint(
  point: Point,
  centre: Point,
  angleDegrees: number,
): Point {
  const radians = (angleDegrees * Math.PI) / 180;

  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const x = point.x - centre.x;
  const y = point.y - centre.y;

  return {
    x: centre.x + x * cos - y * sin,
    y: centre.y + x * sin + y * cos,
  };
}

export function regularPolygon(
  centre: Point,
  radius: number,
  sides: number,
  rotationDegrees = -90,
): Point[] {
  return Array.from({ length: sides }, (_, index) =>
    projectPoint(
      centre,
      rotationDegrees + (360 / sides) * index,
      radius,
    ),
  );
}