import { useId } from "react";

type Point = {
  x: number;
  y: number;
};

type CurvedArrowTone = "default" | "accent" | "danger";

type CurvedArrowProps = {
  start: Point;
  control: Point;
  end: Point;
  colour?: string;
  width?: number;
  label?: string;
  ariaLabel?: string;
  tone?: CurvedArrowTone;
  animated?: boolean;
  selected?: boolean;
  interactive?: boolean;
  onClick?: () => void;
};

const toneColours: Record<CurvedArrowTone, string> = {
  default: "#0f172a",
  accent: "#2563eb",
  danger: "#dc2626",
};

export default function CurvedArrow({
  start,
  control,
  end,
  colour,
  width = 3,
  label,
  ariaLabel,
  tone = "default",
  animated = false,
  selected = false,
  interactive = false,
  onClick,
}: CurvedArrowProps) {
  const markerId = useId().replace(/:/g, "");
  const animationId = useId().replace(/:/g, "");

  const strokeColour = colour ?? toneColours[tone];
  const path = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

  const accessibleLabel = ariaLabel ?? label;

  return (
    <g
      aria-label={accessibleLabel}
      role={interactive ? "button" : accessibleLabel ? "img" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!interactive || !onClick) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      style={{
        cursor: interactive ? "pointer" : "default",
        outline: "none",
      }}
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="7"
          markerHeight="7"
          refX="6.2"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M 0 0 L 7 3.5 L 0 7 z"
            fill={strokeColour}
          />
        </marker>
      </defs>

      {interactive && (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth={Math.max(width + 20, 24)}
          pointerEvents="stroke"
        />
      )}

      {selected && (
        <path
          d={path}
          fill="none"
          stroke="#93c5fd"
          strokeWidth={width + 7}
          strokeLinecap="round"
          opacity="0.45"
          pointerEvents="none"
        />
      )}

      <path
        id={animationId}
        d={path}
        fill="none"
        stroke={strokeColour}
        strokeWidth={selected ? width + 1 : width}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
        strokeDasharray={animated ? "10 8" : undefined}
        pointerEvents={interactive ? "stroke" : undefined}
        style={
          animated
            ? {
                animation: "curved-arrow-flow 0.8s linear infinite",
              }
            : undefined
        }
      />

      <style>
        {`
          @keyframes curved-arrow-flow {
            from {
              stroke-dashoffset: 18;
            }

            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </g>
  );
}