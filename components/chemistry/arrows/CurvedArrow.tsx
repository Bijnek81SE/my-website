"use client";

import { useId } from "react";
import type {
  CurvedArrowDefinition,
} from "./CurvedArrowEngine";

export type CurvedArrowProps = {
  arrow: CurvedArrowDefinition;

  colour?: string;
  selectedColour?: string;
  muted?: boolean;
  selected?: boolean;
  hovered?: boolean;
  active?: boolean;
  animated?: boolean;
  interactive?: boolean;

  className?: string;
  ariaLabel?: string;

  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function quadraticPath(
  arrow: CurvedArrowDefinition,
) {
  const {
    start,
    control,
    end,
  } = arrow.geometry;

  return `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
}

function tangentAtEnd(
  arrow: CurvedArrowDefinition,
) {
  const {
    control,
    end,
  } = arrow.geometry;

  const dx = end.x - control.x;
  const dy = end.y - control.y;

  const length =
    Math.hypot(dx, dy) || 1;

  return {
    x: dx / length,
    y: dy / length,
  };
}

function ArrowHead({
  arrow,
  colour,
}: {
  arrow: CurvedArrowDefinition;
  colour: string;
}) {
  const {
    end,
  } = arrow.geometry;

  const tangent =
    tangentAtEnd(arrow);

  const normal = {
    x: -tangent.y,
    y: tangent.x,
  };

  const headLength =
    arrow.head === "fishhook"
      ? 11
      : 14;

  const headWidth =
    arrow.head === "fishhook"
      ? 4
      : 7;

  const base = {
    x:
      end.x -
      tangent.x * headLength,
    y:
      end.y -
      tangent.y * headLength,
  };

  if (
    arrow.head === "fishhook"
  ) {
    return (
      <line
        x1={end.x}
        y1={end.y}
        x2={
          base.x +
          normal.x *
            headWidth
        }
        y2={
          base.y +
          normal.y *
            headWidth
        }
        stroke={colour}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  }

  return (
    <polygon
      points={`
${end.x},${end.y}
${base.x + normal.x * headWidth},${base.y + normal.y * headWidth}
${base.x - normal.x * headWidth},${base.y - normal.y * headWidth}
`}
      fill={colour}
    />
  );
}

export default function CurvedArrow({
  arrow,
  colour = "#0891b2",
  selectedColour = "#2563eb",
  muted = false,
  selected = false,
  hovered = false,
  active = false,
  animated = false,
  interactive = false,
  className,
  ariaLabel,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CurvedArrowProps) {
  const gradientId =
    useId().replace(/:/g, "");

  const path =
    quadraticPath(arrow);

  const stroke =
    selected
      ? selectedColour
      : colour;

  const strokeWidth =
    active
      ? 5
      : hovered
        ? 4.5
        : 4;

  const opacity =
    muted ? 0.35 : 1;

  return (
    <g
      className={className}
      opacity={opacity}
      role={
        interactive || onClick
          ? "button"
          : "img"
      }
      tabIndex={
        interactive || onClick
          ? 0
          : undefined
      }
      aria-label={
        ariaLabel ??
        arrow.reasoning.join(" ")
      }
      onClick={onClick}
      onMouseEnter={
        onMouseEnter
      }
      onMouseLeave={
        onMouseLeave
      }
      onKeyDown={(
        event,
      ) => {
        if (
          !onClick
        ) {
          return;
        }

        if (
          event.key ===
            "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onClick();
        }
      }}
      style={{
        cursor:
          interactive ||
          onClick
            ? "pointer"
            : "default",
      }}
    >
      <defs>
        <linearGradient
          id={`arrow-gradient-${gradientId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor={stroke}
            stopOpacity="0.35"
          />

          <stop
            offset="55%"
            stopColor={stroke}
          />

          <stop
            offset="100%"
            stopColor={stroke}
            stopOpacity="0.95"
          />
        </linearGradient>
      </defs>

      {(interactive ||
        onClick) && (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth="22"
          strokeLinecap="round"
        />
      )}

      <path
        d={path}
        fill="none"
        stroke={
          animated
            ? `url(#arrow-gradient-${gradientId})`
            : stroke
        }
        strokeWidth={
          strokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          animated
            ? "animate-pulse"
            : undefined
        }
      />

      <ArrowHead
        arrow={arrow}
        colour={stroke}
      />
    </g>
  );
}