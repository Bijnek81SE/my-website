"use client";

import { useId } from "react";
import type { CurvedArrowProps, CurvedArrowTone } from "./types";

const toneStyles: Record<CurvedArrowTone, string> = {
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
  width = 3,
  headSize = 10,
  dashed = false,
  animated = false,
  selected = false,
  muted = false,
  interactive = false,
  ariaLabel = "Curved electron-movement arrow",
  onClick,
  className,
}: CurvedArrowProps) {
  const markerId = useId().replace(/:/g, "");
  const stroke = toneStyles[tone];
  const path = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

  function activate() {
    if (interactive && onClick) onClick();
  }

  function onKeyDown(event: React.KeyboardEvent<SVGGElement>) {
    if (!interactive || !onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  }

  return (
    <g
      role={interactive ? "button" : "img"}
      aria-label={ariaLabel}
      tabIndex={interactive ? 0 : undefined}
      onClick={activate}
      onKeyDown={onKeyDown}
      className={className}
      style={{ cursor: interactive ? "pointer" : "default", opacity: muted ? 0.35 : 1 }}
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
          <path d={`M 0 0 L ${headSize} ${headSize / 2} L 0 ${headSize} z`} fill={stroke} />
        </marker>
      </defs>

      {selected && (
        <path
          d={path}
          fill="none"
          stroke="#bfdbfe"
          strokeWidth={width + 8}
          strokeLinecap="round"
          pointerEvents="none"
        />
      )}

      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? "8 7" : undefined}
        markerEnd={`url(#${markerId})`}
        className={animated ? "animate-[dash_1.4s_linear_infinite]" : undefined}
        style={animated ? { strokeDasharray: "10 8" } : undefined}
      />
    </g>
  );
}
