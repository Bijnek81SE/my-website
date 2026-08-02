import type { ReactNode } from "react";
import type {
  SkeletalAtom,
  SkeletalBond,
  SkeletalMoleculeDefinition,
  SkeletalPoint,
} from "./types";

const DEFAULT_STROKE = "#0f172a";

function normal(start: SkeletalPoint, end: SkeletalPoint) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  return { x: -dy / length, y: dx / length };
}

function offsetPoint(point: SkeletalPoint, vector: SkeletalPoint, amount: number) {
  return {
    x: point.x + vector.x * amount,
    y: point.y + vector.y * amount,
  };
}

function WavyBond({
  start,
  end,
  colour,
  strokeWidth,
}: {
  start: SkeletalPoint;
  end: SkeletalPoint;
  colour: string;
  strokeWidth: number;
}) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const segments = 8;
  const points = Array.from({ length: segments + 1 }, (_, index) => {
    const t = index / segments;
    const wave = Math.sin(t * Math.PI * segments) * 4;

    return `${start.x + dx * t + nx * wave},${start.y + dy * t + ny * wave}`;
  }).join(" ");

  return (
    <polyline
      points={points}
      fill="none"
      stroke={colour}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function atomShowsLabel(atom: SkeletalAtom, showCarbons: boolean) {
  const label = atom.label ?? atom.element ?? "C";
  return atom.showLabel ?? (label !== "C" || showCarbons);
}

function trimEndpoint(
  atom: SkeletalAtom,
  other: SkeletalAtom,
  showCarbons: boolean,
): SkeletalPoint {
  if (!atomShowsLabel(atom, showCarbons)) return atom.position;

  const dx = other.position.x - atom.position.x;
  const dy = other.position.y - atom.position.y;
  const length = Math.hypot(dx, dy) || 1;
  const label = atom.label ?? atom.element ?? "C";
  const inset = Math.max(16, label.length * 8);

  return {
    x: atom.position.x + (dx / length) * inset,
    y: atom.position.y + (dy / length) * inset,
  };
}

function SkeletalBondNode({
  bond,
  from,
  to,
  defaultStroke,
  defaultStrokeWidth,
  showCarbons,
}: {
  bond: SkeletalBond;
  from: SkeletalAtom;
  to: SkeletalAtom;
  defaultStroke: string;
  defaultStrokeWidth: number;
  showCarbons: boolean;
}) {
  const start = trimEndpoint(from, to, showCarbons);
  const end = trimEndpoint(to, from, showCarbons);
  const type = bond.type ?? "single";
  const colour = bond.highlighted
    ? "#7c3aed"
    : bond.colour ?? defaultStroke;
  const strokeWidth = bond.strokeWidth ?? defaultStrokeWidth;
  const opacity = bond.muted ? 0.3 : 1;
  const perpendicular = normal(start, end);
  const spacing = bond.spacing ?? 10;

  if (type === "wedge") {
    const width = Math.max(18, spacing * 2.4);
    const left = offsetPoint(end, perpendicular, width / 2);
    const right = offsetPoint(end, perpendicular, -width / 2);

    return (
      <polygon
        points={`${start.x},${start.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={colour}
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  if (type === "dash") {
    return (
      <g opacity={opacity}>
        {Array.from({ length: 7 }, (_, index) => {
          const t = (index + 1) / 8;
          const centre = {
            x: start.x + (end.x - start.x) * t,
            y: start.y + (end.y - start.y) * t,
          };
          const half = (Math.max(18, spacing * 2.4) * t) / 2;

          return (
            <line
              key={index}
              x1={centre.x - perpendicular.x * half}
              y1={centre.y - perpendicular.y * half}
              x2={centre.x + perpendicular.x * half}
              y2={centre.y + perpendicular.y * half}
              stroke={colour}
              strokeWidth={Math.max(2, strokeWidth - 1)}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </g>
    );
  }

  if (type === "wavy") {
    return (
      <g opacity={opacity}>
        <WavyBond
          start={start}
          end={end}
          colour={colour}
          strokeWidth={strokeWidth}
        />
      </g>
    );
  }

  const offsets =
    type === "double"
      ? [0, bond.parallelOffset ?? -spacing]
      : type === "triple"
        ? [-spacing, 0, spacing]
        : [0];

  return (
    <g opacity={opacity}>
      {offsets.map((offset) => {
        const lineStart = offsetPoint(start, perpendicular, offset);
        const lineEnd = offsetPoint(end, perpendicular, offset);

        return (
          <line
            key={offset}
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={colour}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={type === "aromatic" ? "9 7" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </g>
  );
}

function chargeLabel(charge: number) {
  if (charge === 1) return "+";
  if (charge === -1) return "−";
  return charge > 0 ? `${charge}+` : `${Math.abs(charge)}−`;
}

function SkeletalAtomNode({ atom, showCarbons }: { atom: SkeletalAtom; showCarbons: boolean }) {
  const label = atom.label ?? atom.element ?? "C";
  const visible = atom.showLabel ?? (label !== "C" || showCarbons);
  const offset = atom.labelOffset ?? { x: 0, y: 0 };
  const x = atom.position.x + offset.x;
  const y = atom.position.y + offset.y;

  return (
    <g pointerEvents="none">
      {visible ? (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={atom.fontSize ?? 27}
          fontWeight="700"
          fill={atom.colour ?? DEFAULT_STROKE}
        >
          {label}
        </text>
      ) : null}

      {atom.charge ? (
        <text
          x={x + 17}
          y={y - 17}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#dc2626"
        >
          {chargeLabel(atom.charge)}
        </text>
      ) : null}

      {atom.radical ? (
        <circle
          cx={x + 16}
          cy={y - 16}
          r="4.5"
          fill={atom.colour ?? "#e11d48"}
        />
      ) : null}
    </g>
  );
}

export type SkeletalMoleculeEngineProps = {
  molecule: SkeletalMoleculeDefinition;
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
  showCarbons?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function SkeletalMoleculeEngine({
  molecule,
  x = 0,
  y = 0,
  scale = 1,
  stroke = DEFAULT_STROKE,
  strokeWidth = 5,
  showCarbons = false,
  className,
  children,
}: SkeletalMoleculeEngineProps) {
  const atomsById = new Map(molecule.atoms.map((atom) => [atom.id, atom]));

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      className={className}
      role="img"
      aria-label={molecule.name}
    >
      <g aria-label="Bonds">
        {molecule.bonds.map((bond) => {
          const from = atomsById.get(bond.from);
          const to = atomsById.get(bond.to);

          if (!from || !to) return null;

          return (
            <SkeletalBondNode
              key={bond.id}
              bond={bond}
              from={from}
              to={to}
              defaultStroke={stroke}
              defaultStrokeWidth={strokeWidth}
              showCarbons={showCarbons}
            />
          );
        })}
      </g>

      <g aria-label="Atoms">
        {molecule.atoms.map((atom) => (
          <SkeletalAtomNode key={atom.id} atom={atom} showCarbons={showCarbons} />
        ))}
      </g>

      {molecule.annotations?.map((annotation) => (
        <text
          key={annotation.id}
          x={annotation.position.x}
          y={annotation.position.y}
          textAnchor={annotation.anchor ?? "middle"}
          dominantBaseline="middle"
          fontSize={annotation.fontSize ?? 16}
          fontWeight={annotation.fontWeight ?? 700}
          fill={annotation.colour ?? "#475569"}
          pointerEvents="none"
        >
          {annotation.text}
        </text>
      ))}

      {children}
    </g>
  );
}
