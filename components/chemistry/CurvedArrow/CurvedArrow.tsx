"use client";

import { useId, type KeyboardEvent } from "react";
import type {
  CurvedArrowProps,
  CurvedArrowTone,
} from "./types";

const toneColours: Record<CurvedArrowTone, string> = {
  default: "#0f172a",
  accent: "#2563eb",
  success: "#059669",
  danger: "#dc2626",
};

export default function CurvedArrow({
  start,
  control,
  end,
  tone = "default",
  colour,
  width = 3,
  headSize = 10,
  dashed = false,
  animated = false,
  selected = false,
  muted = false,
  interactive = false,
  label,
  ariaLabel,
  onClick,
  className,
}: CurvedArrowProps) {
  const id = useId().replace(/:/g, "");
  const markerId = `curved-arrow-marker-${id}`;
  const animationName = `curved-arrow-flow-${id}`;
  const stroke = colour ?? toneColours[tone];

  const path = [
    `M ${start.x} ${start.y}`,
    `Q ${control.x} ${control.y}`,
    `${end.x} ${end.y}`,
  ].join(" ");

  const accessibleLabel =
    ariaLabel ??
    label ??
    "Curved electron-movement arrow";

  function activate() {
    if (onClick) {
      onClick();
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<SVGGElement>,
  ) {
    if (!onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  const isInteractive = interactive || Boolean(onClick);

  return (
    <g
      role={isInteractive ? "button" : "img"}
      aria-label={accessibleLabel}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? activate : undefined}
      onKeyDown={
        isInteractive ? handleKeyDown : undefined
      }
      className={className}
      style={{
        cursor: isInteractive ? "pointer" : "default",
        opacity: muted ? 0.35 : 1,
      }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth={headSize}
          markerHeight={headSize}
          refX={headSize - 1}
          refY={headSize / 2}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={[
              "M 0 0",
              `L ${headSize} ${headSize / 2}`,
              `L 0 ${headSize}`,
              "z",
            ].join(" ")}
            fill={stroke}
          />
        </marker>
      </defs>

      {isInteractive ? (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth={Math.max(width + 20, 24)}
          strokeLinecap="round"
          pointerEvents="stroke"
        />
      ) : null}

      {selected ? (
        <path
          d={path}
          fill="none"
          stroke="#bfdbfe"
          strokeWidth={width + 8}
          strokeLinecap="round"
          pointerEvents="none"
        />
      ) : null}

      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={selected ? width + 1 : width}
        strokeLinecap="round"
        strokeDasharray={
          animated || dashed ? "10 8" : undefined
        }
        markerEnd={`url(#${markerId})`}
        pointerEvents={isInteractive ? "stroke" : undefined}
        style={
          animated
            ? {
                animation: `${animationName} 0.8s linear infinite`,
              }
            : undefined
        }
      />

      {animated ? (
        <style>
          {`
            @keyframes ${animationName} {
              from {
                stroke-dashoffset: 18;
              }

              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      ) : null}
    </g>
  );
}