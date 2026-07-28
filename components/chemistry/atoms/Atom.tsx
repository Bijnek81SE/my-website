"use client";

import type { KeyboardEvent, MouseEvent } from "react";

export type ElementSymbol =
  | "H"
  | "B"
  | "C"
  | "N"
  | "O"
  | "F"
  | "Si"
  | "P"
  | "S"
  | "Cl"
  | "Br"
  | "I";

export type AtomPoint = {
  x: number;
  y: number;
};

export type AtomProps = {
  id?: string;
  element: ElementSymbol;
  x: number;
  y: number;
  charge?: number;
  lonePairs?: number;
  radius?: number;
  selected?: boolean;
  muted?: boolean;
  interactive?: boolean;
  showBackground?: boolean;
  labelColour?: string;
  fillColour?: string;
  strokeColour?: string;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: (id?: string) => void;
};

const elementPalette: Record<ElementSymbol, { fill: string; stroke: string; text: string }> = {
  H: { fill: "#f8fafc", stroke: "#cbd5e1", text: "#0f172a" },
  B: { fill: "#fef3c7", stroke: "#f59e0b", text: "#78350f" },
  C: { fill: "#e2e8f0", stroke: "#64748b", text: "#0f172a" },
  N: { fill: "#dbeafe", stroke: "#3b82f6", text: "#1e3a8a" },
  O: { fill: "#fee2e2", stroke: "#ef4444", text: "#7f1d1d" },
  F: { fill: "#dcfce7", stroke: "#22c55e", text: "#14532d" },
  Si: { fill: "#f3e8ff", stroke: "#a855f7", text: "#581c87" },
  P: { fill: "#ffedd5", stroke: "#f97316", text: "#7c2d12" },
  S: { fill: "#fef9c3", stroke: "#eab308", text: "#713f12" },
  Cl: { fill: "#dcfce7", stroke: "#16a34a", text: "#14532d" },
  Br: { fill: "#ffedd5", stroke: "#c2410c", text: "#7c2d12" },
  I: { fill: "#f3e8ff", stroke: "#9333ea", text: "#581c87" },
};

function formatCharge(charge: number) {
  if (charge === 0) return "";
  const magnitude = Math.abs(charge);
  const sign = charge > 0 ? "+" : "−";
  return magnitude === 1 ? sign : `${magnitude}${sign}`;
}

function lonePairPositions(count: number, radius: number) {
  const distance = radius + 13;
  const placements = [
    { x: 0, y: -distance, rotation: 0 },
    { x: distance, y: 0, rotation: 90 },
    { x: 0, y: distance, rotation: 0 },
    { x: -distance, y: 0, rotation: 90 },
  ];

  return placements.slice(0, Math.min(4, Math.max(0, count)));
}

export default function Atom({
  id,
  element,
  x,
  y,
  charge = 0,
  lonePairs = 0,
  radius = 25,
  selected = false,
  muted = false,
  interactive = false,
  showBackground = true,
  labelColour,
  fillColour,
  strokeColour,
  selectedColour = "#2563eb",
  className,
  ariaLabel,
  onClick,
}: AtomProps) {
  const palette = elementPalette[element];
  const activeStroke = selected ? selectedColour : strokeColour ?? palette.stroke;
  const opacity = muted ? 0.35 : 1;
  const clickable = interactive || Boolean(onClick);

  function activate() {
    onClick?.(id);
  }

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (!clickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  }

  function handleClick(event: MouseEvent<SVGGElement>) {
    event.stopPropagation();
    activate();
  }

  const accessibleLabel =
    ariaLabel ??
    `${element} atom${charge ? ` with formal charge ${formatCharge(charge)}` : ""}${
      lonePairs ? ` and ${lonePairs} lone pair${lonePairs === 1 ? "" : "s"}` : ""
    }`;

  return (
    <g
      className={className}
      transform={`translate(${x} ${y})`}
      role={clickable ? "button" : "img"}
      aria-label={accessibleLabel}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      style={{ cursor: clickable ? "pointer" : "default", opacity }}
    >
      {selected && (
        <circle
          r={radius + 8}
          fill="none"
          stroke={selectedColour}
          strokeWidth="3"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {showBackground && (
        <circle
          r={radius}
          fill={fillColour ?? palette.fill}
          stroke={activeStroke}
          strokeWidth={selected ? 3 : 2}
          vectorEffect="non-scaling-stroke"
        />
      )}

      <text
        x="0"
        y="1"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={labelColour ?? palette.text}
        fontSize={Math.max(18, radius * 0.9)}
        fontWeight="700"
        pointerEvents="none"
      >
        {element}
      </text>

      {charge !== 0 && (
        <text
          x={radius * 0.72}
          y={-radius * 0.72}
          textAnchor="start"
          dominantBaseline="middle"
          fill={labelColour ?? palette.text}
          fontSize={Math.max(12, radius * 0.5)}
          fontWeight="800"
          pointerEvents="none"
        >
          {formatCharge(charge)}
        </text>
      )}

      {lonePairPositions(lonePairs, radius).map((pair, index) => (
        <g key={index} transform={`translate(${pair.x} ${pair.y}) rotate(${pair.rotation})`} aria-hidden="true">
          <circle cx="-3" cy="0" r="2.1" fill={labelColour ?? palette.text} />
          <circle cx="3" cy="0" r="2.1" fill={labelColour ?? palette.text} />
        </g>
      ))}
    </g>
  );
}
