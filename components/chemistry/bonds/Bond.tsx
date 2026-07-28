"use client";

import { useId } from "react";

export type Point = {
  x: number;
  y: number;
};

export type BondOrder = 1 | 2 | 3;
export type BondType = "line" | "wedge" | "dash" | "aromatic";
export type BondPolarity = "none" | "forward" | "reverse";

export type BondProps = {
  start: Point;
  end: Point;
  order?: BondOrder;
  type?: BondType;
  polarity?: BondPolarity;
  selected?: boolean;
  muted?: boolean;
  animated?: boolean;
  interactive?: boolean;
  strokeWidth?: number;
  spacing?: number;
  colour?: string;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

function unitNormal(start: Point, end: Point) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: -dy / length,
    y: dx / length,
    length,
  };
}

function offsetLine(start: Point, end: Point, offset: number) {
  const normal = unitNormal(start, end);

  return {
    x1: start.x + normal.x * offset,
    y1: start.y + normal.y * offset,
    x2: end.x + normal.x * offset,
    y2: end.y + normal.y * offset,
  };
}

function lineOffsets(order: BondOrder, spacing: number) {
  if (order === 1) return [0];
  if (order === 2) return [-spacing / 2, spacing / 2];
  return [-spacing, 0, spacing];
}

function wedgePoints(start: Point, end: Point, width: number) {
  const normal = unitNormal(start, end);
  const half = width / 2;

  return [
    `${start.x},${start.y}`,
    `${end.x + normal.x * half},${end.y + normal.y * half}`,
    `${end.x - normal.x * half},${end.y - normal.y * half}`,
  ].join(" ");
}

function DipoleArrow({
  start,
  end,
  direction,
  colour,
}: {
  start: Point;
  end: Point;
  direction: Exclude<BondPolarity, "none">;
  colour: string;
}) {
  const normal = unitNormal(start, end);
  const offset = 18;
  const inset = 14;
  const dx = (end.x - start.x) / normal.length;
  const dy = (end.y - start.y) / normal.length;

  const forwardStart = {
    x: start.x + dx * inset + normal.x * offset,
    y: start.y + dy * inset + normal.y * offset,
  };
  const forwardEnd = {
    x: end.x - dx * inset + normal.x * offset,
    y: end.y - dy * inset + normal.y * offset,
  };

  const arrowStart = direction === "forward" ? forwardStart : forwardEnd;
  const arrowEnd = direction === "forward" ? forwardEnd : forwardStart;
  const headLength = 9;
  const headWidth = 5;
  const ux = (arrowEnd.x - arrowStart.x) / Math.hypot(arrowEnd.x - arrowStart.x, arrowEnd.y - arrowStart.y);
  const uy = (arrowEnd.y - arrowStart.y) / Math.hypot(arrowEnd.x - arrowStart.x, arrowEnd.y - arrowStart.y);
  const nx = -uy;
  const ny = ux;

  const headBase = {
    x: arrowEnd.x - ux * headLength,
    y: arrowEnd.y - uy * headLength,
  };

  return (
    <g aria-hidden="true">
      <line
        x1={arrowStart.x}
        y1={arrowStart.y}
        x2={headBase.x}
        y2={headBase.y}
        stroke={colour}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon
        points={`${arrowEnd.x},${arrowEnd.y} ${headBase.x + nx * headWidth},${headBase.y + ny * headWidth} ${headBase.x - nx * headWidth},${headBase.y - ny * headWidth}`}
        fill={colour}
      />
      <line
        x1={arrowStart.x - nx * 5}
        y1={arrowStart.y - ny * 5}
        x2={arrowStart.x + nx * 5}
        y2={arrowStart.y + ny * 5}
        stroke={colour}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

export default function Bond({
  start,
  end,
  order = 1,
  type = "line",
  polarity = "none",
  selected = false,
  muted = false,
  animated = false,
  interactive = false,
  strokeWidth = 4,
  spacing = 9,
  colour = "#334155",
  selectedColour = "#2563eb",
  className,
  ariaLabel = "Chemical bond",
  onClick,
}: BondProps) {
  const id = useId().replace(/:/g, "");
  const activeColour = selected ? selectedColour : colour;
  const opacity = muted ? 0.35 : 1;
  const offsets = lineOffsets(order, spacing);
  const normal = unitNormal(start, end);
  const wedgeWidth = Math.max(18, spacing * 2.5);
  const hitWidth = Math.max(24, strokeWidth + spacing * order + 12);

  const sharedLineProps = {
    stroke: activeColour,
    strokeWidth,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <g
      className={className}
      role={interactive || onClick ? "button" : "img"}
      aria-label={ariaLabel}
      tabIndex={interactive || onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      style={{ cursor: interactive || onClick ? "pointer" : "default", opacity }}
    >
      <defs>
        <linearGradient id={`bond-gradient-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={activeColour} stopOpacity="0.5" />
          <stop offset="50%" stopColor={activeColour} />
          <stop offset="100%" stopColor={activeColour} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {(interactive || onClick) && (
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="transparent"
          strokeWidth={hitWidth}
          strokeLinecap="round"
        />
      )}

      {type === "wedge" && (
        <polygon
          points={wedgePoints(start, end, wedgeWidth)}
          fill={activeColour}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {type === "dash" && (
        <g>
          {Array.from({ length: 7 }).map((_, index) => {
            const t = (index + 1) / 8;
            const centre = {
              x: start.x + (end.x - start.x) * t,
              y: start.y + (end.y - start.y) * t,
            };
            const halfWidth = (wedgeWidth * t) / 2;

            return (
              <line
                key={index}
                x1={centre.x - normal.x * halfWidth}
                y1={centre.y - normal.y * halfWidth}
                x2={centre.x + normal.x * halfWidth}
                y2={centre.y + normal.y * halfWidth}
                {...sharedLineProps}
                strokeWidth={Math.max(2, strokeWidth - 1)}
              />
            );
          })}
        </g>
      )}

      {(type === "line" || type === "aromatic") && (
        <g>
          {offsets.map((offset) => {
            const line = offsetLine(start, end, offset);
            return (
              <line
                key={offset}
                {...line}
                {...sharedLineProps}
                stroke={animated ? `url(#bond-gradient-${id})` : activeColour}
                strokeDasharray={type === "aromatic" ? "10 7" : undefined}
                className={animated ? "animate-pulse" : undefined}
              />
            );
          })}
        </g>
      )}

      {polarity !== "none" && (
        <DipoleArrow start={start} end={end} direction={polarity} colour={selectedColour} />
      )}
    </g>
  );
}
