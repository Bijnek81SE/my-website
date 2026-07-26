// Helpers for drawing standard organic-chemistry wedge (toward viewer) and
// dash (away from viewer) bonds on a 0-100 SVG viewBox, so bond geometry can
// be shared across diagrams instead of hand-plotting each one.

type Point = { x: number; y: number };

function unitPerp(cx: number, cy: number, hx: number, hy: number) {
  const dx = hx - cx;
  const dy = hy - cy;
  const len = Math.hypot(dx, dy) || 1;
  return { x: -dy / len, y: dx / len };
}

/** Solid wedge bond: narrow at the stereocenter, wide at the atom coming toward the viewer. */
export function wedgePoints(cx: number, cy: number, hx: number, hy: number, halfWidth = 4.5): string {
  const p = unitPerp(cx, cy, hx, hy);
  const left = { x: hx + p.x * halfWidth, y: hy + p.y * halfWidth };
  const right = { x: hx - p.x * halfWidth, y: hy - p.y * halfWidth };
  return `${cx},${cy} ${left.x},${left.y} ${right.x},${right.y}`;
}

/** Dashed/hashed bond: short perpendicular ticks that widen going away from the stereocenter. */
export function hashTicks(
  cx: number,
  cy: number,
  hx: number,
  hy: number,
  count = 5,
  minHalfWidth = 1,
  maxHalfWidth = 4.5
): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const p = unitPerp(cx, cy, hx, hy);
  const ticks = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const px = cx + (hx - cx) * t;
    const py = cy + (hy - cy) * t;
    const w = minHalfWidth + (maxHalfWidth - minHalfWidth) * t;
    ticks.push({
      x1: px + p.x * w,
      y1: py + p.y * w,
      x2: px - p.x * w,
      y2: py - p.y * w,
    });
  }
  return ticks;
}

export type { Point };
