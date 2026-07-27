type BondProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  order?: 1 | 2 | 3;
  atomRadius?: number;
  gap?: number;
  dashed?: boolean;
  stroke?: string;
};

export default function Bond({
  from,
  to,
  order = 1,
  atomRadius = 31,
  gap = 5,
  dashed = false,
  stroke = "#0f172a",
}: BondProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) return null;

  const ux = dx / length;
  const uy = dy / length;
  const nx = -uy;
  const ny = ux;
  const inset = atomRadius + gap;
  const start = { x: from.x + ux * inset, y: from.y + uy * inset };
  const end = { x: to.x - ux * inset, y: to.y - uy * inset };
  const spacing = 6;
  const offsets =
    order === 1 ? [0] : order === 2 ? [-spacing / 2, spacing / 2] : [-spacing, 0, spacing];

  return (
    <g aria-hidden="true">
      {offsets.map((offset) => (
        <line
          key={offset}
          x1={start.x + nx * offset}
          y1={start.y + ny * offset}
          x2={end.x + nx * offset}
          y2={end.y + ny * offset}
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={dashed ? "10 9" : undefined}
        />
      ))}
    </g>
  );
}
