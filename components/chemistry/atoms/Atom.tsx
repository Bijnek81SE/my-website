"use client";

import type {
  KeyboardEvent,
  MouseEvent,
} from "react";
import Charge, { formatCharge } from "./Charge";
import { getElementColour } from "./ElementColours";
import LonePairs from "./LonePairs";
import type { AtomProps } from "./types";

export default function Atom({
  id,
  element,
  x,
  y,
  charge = 0,
  lonePairs = 0,
  radius = 25,
  selected = false,
  highlighted = false,
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
  const palette = getElementColour(element);

  const activeFill = selected
    ? "#dbeafe"
    : highlighted
      ? "#ede9fe"
      : fillColour ?? palette.fill;

  const activeStroke = selected
    ? selectedColour
    : highlighted
      ? "#7c3aed"
      : strokeColour ?? palette.stroke;

  const textColour = labelColour ?? palette.text;
  const clickable = interactive || Boolean(onClick);

  function activate() {
    onClick?.(id);
  }

  function handleClick(event: MouseEvent<SVGGElement>) {
    event.stopPropagation();
    activate();
  }

  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (!clickable) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  }

  const accessibleLabel =
    ariaLabel ??
    `${element} atom${
      charge !== 0
        ? ` with formal charge ${formatCharge(charge)}`
        : ""
    }${
      lonePairs > 0
        ? ` and ${lonePairs} lone pair${lonePairs === 1 ? "" : "s"}`
        : ""
    }`;

  return (
    <g
      id={id}
      className={className}
      transform={`translate(${x} ${y})`}
      role={clickable ? "button" : "img"}
      aria-label={accessibleLabel}
      aria-pressed={clickable ? selected : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      style={{
        cursor: clickable ? "pointer" : "default",
        opacity: muted ? 0.35 : 1,
        outline: "none",
      }}
    >
      {selected ? (
        <circle
          r={radius + 8}
          fill="none"
          stroke={selectedColour}
          strokeWidth="3"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
      ) : null}

      {showBackground ? (
        <circle
          r={radius}
          fill={activeFill}
          stroke={activeStroke}
          strokeWidth={selected ? 3 : 2}
          vectorEffect="non-scaling-stroke"
        />
      ) : null}

      <text
        x="0"
        y="1"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColour}
        fontSize={Math.max(18, radius * 0.9)}
        fontWeight="700"
        pointerEvents="none"
      >
        {element}
      </text>

      <Charge
        charge={charge}
        radius={radius}
        colour={textColour}
      />

      <LonePairs
        count={lonePairs}
        radius={radius}
        colour={textColour}
      />
    </g>
  );
}