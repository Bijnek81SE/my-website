"use client";

import {
  useId,
  useState,
} from "react";
import type {
  MolecularGraph,
} from "../graph/MolecularGraph";
import type {
  CurvedArrowDefinition,
} from "./CurvedArrowEngine";
import {
  updateArrowWithLiveGeometry,
  type LiveArrowGeometryOptions,
} from "./LiveArrowGeometry";

export type CurvedArrowProps = {
  arrow: CurvedArrowDefinition;

  graph?: MolecularGraph;
  liveGeometryOptions?: LiveArrowGeometryOptions;

  colour?: string;
  selectedColour?: string;
  hoverColour?: string;
  activeColour?: string;
  invalidColour?: string;

  muted?: boolean;
  selected?: boolean;
  hovered?: boolean;
  active?: boolean;
  animated?: boolean;
  interactive?: boolean;

  strokeWidth?: number;
  hitWidth?: number;

  className?: string;
  ariaLabel?: string;

  onClick?: () => void;
  onDoubleClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function quadraticPath(
  arrow: CurvedArrowDefinition,
): string {
  const {
    start,
    control,
    end,
  } = arrow.geometry;

  return [
    "M",
    start.x,
    start.y,
    "Q",
    control.x,
    control.y,
    end.x,
    end.y,
  ].join(" ");
}

function tangentAtEnd(
  arrow: CurvedArrowDefinition,
) {
  const {
    control,
    end,
  } = arrow.geometry;

  const dx =
    end.x - control.x;

  const dy =
    end.y - control.y;

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
  strokeWidth,
}: {
  arrow: CurvedArrowDefinition;
  colour: string;
  strokeWidth: number;
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
      ? 4.5
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
          normal.x * headWidth
        }
        y2={
          base.y +
          normal.y * headWidth
        }
        stroke={colour}
        strokeWidth={Math.max(
          2.5,
          strokeWidth - 1,
        )}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pointerEvents="none"
      />
    );
  }

  return (
    <polygon
      points={[
        `${end.x},${end.y}`,
        `${
          base.x +
          normal.x * headWidth
        },${
          base.y +
          normal.y * headWidth
        }`,
        `${
          base.x -
          normal.x * headWidth
        },${
          base.y -
          normal.y * headWidth
        }`,
      ].join(" ")}
      fill={colour}
      pointerEvents="none"
    />
  );
}

function resolveArrowColour({
  valid,
  selected,
  focused,
  active,
  hovered,
  colour,
  selectedColour,
  hoverColour,
  activeColour,
  invalidColour,
}: {
  valid: boolean;
  selected: boolean;
  focused: boolean;
  active: boolean;
  hovered: boolean;
  colour: string;
  selectedColour: string;
  hoverColour: string;
  activeColour: string;
  invalidColour: string;
}): string {
  if (!valid) {
    return invalidColour;
  }

  if (active) {
    return activeColour;
  }

  if (
    selected ||
    focused
  ) {
    return selectedColour;
  }

  if (hovered) {
    return hoverColour;
  }

  return colour;
}

export default function CurvedArrow({
  arrow,
  graph,
  liveGeometryOptions,
  colour = "#0891b2",
  selectedColour = "#2563eb",
  hoverColour = "#0e7490",
  activeColour = "#1d4ed8",
  invalidColour = "#dc2626",
  muted = false,
  selected = false,
  hovered = false,
  active = false,
  animated = false,
  interactive = false,
  strokeWidth = 4,
  hitWidth = 22,
  className,
  ariaLabel,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: CurvedArrowProps) {
  const gradientId =
    useId().replace(/:/g, "");

  const [focused, setFocused] =
    useState(false);

  const liveArrow = graph
    ? updateArrowWithLiveGeometry(
        graph,
        arrow,
        liveGeometryOptions,
      )
    : arrow;

  if (!liveArrow) {
    return null;
  }

  const interactiveState =
    interactive ||
    Boolean(onClick) ||
    Boolean(onDoubleClick);

  const path =
    quadraticPath(liveArrow);

  const resolvedColour =
    resolveArrowColour({
      valid: liveArrow.valid,
      selected,
      focused,
      active,
      hovered,
      colour,
      selectedColour,
      hoverColour,
      activeColour,
      invalidColour,
    });

  const resolvedStrokeWidth =
    active
      ? strokeWidth + 1
      : selected ||
          focused ||
          hovered
        ? strokeWidth + 0.5
        : strokeWidth;

  const opacity =
    muted ? 0.35 : 1;

  const defaultAriaLabel =
    liveArrow.reasoning.length > 0
      ? liveArrow.reasoning.join(" ")
      : `${
          liveArrow.electronCount === 1
            ? "Single-electron"
            : "Two-electron"
        } curved arrow from ${
          liveArrow.source.kind
        } to ${
          liveArrow.target.kind
        }.`;

  return (
    <g
      className={className}
      opacity={opacity}
      role={
        interactiveState
          ? "button"
          : "img"
      }
      tabIndex={
        interactiveState
          ? 0
          : undefined
      }
      aria-label={
        ariaLabel ??
        defaultAriaLabel
      }
      aria-disabled={
        interactiveState &&
        !liveArrow.valid
          ? true
          : undefined
      }
      onClick={
        liveArrow.valid
          ? onClick
          : undefined
      }
      onDoubleClick={
        liveArrow.valid
          ? onDoubleClick
          : undefined
      }
      onMouseEnter={
        onMouseEnter
      }
      onMouseLeave={
        onMouseLeave
      }
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      onKeyDown={(event) => {
        if (
          !onClick ||
          !liveArrow.valid
        ) {
          return;
        }

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onClick();
        }
      }}
      style={{
        cursor: interactiveState
          ? liveArrow.valid
            ? "pointer"
            : "not-allowed"
          : "default",
        outline: "none",
      }}
      data-arrow-id={
        liveArrow.id
      }
      data-arrow-valid={
        liveArrow.valid
          ? "true"
          : "false"
      }
      data-arrow-head={
        liveArrow.head
      }
      data-electron-count={
        liveArrow.electronCount
      }
    >
      <defs>
        <linearGradient
          id={`arrow-gradient-${gradientId}`}
          x1={
            liveArrow.geometry.start.x
          }
          y1={
            liveArrow.geometry.start.y
          }
          x2={
            liveArrow.geometry.end.x
          }
          y2={
            liveArrow.geometry.end.y
          }
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={
              resolvedColour
            }
            stopOpacity="0.3"
          />

          <stop
            offset="55%"
            stopColor={
              resolvedColour
            }
          />

          <stop
            offset="100%"
            stopColor={
              resolvedColour
            }
            stopOpacity="0.95"
          />
        </linearGradient>
      </defs>

      {interactiveState ? (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth={Math.max(
            hitWidth,
            resolvedStrokeWidth +
              14,
          )}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}

      {focused ? (
        <path
          d={path}
          fill="none"
          stroke={selectedColour}
          strokeWidth={
            resolvedStrokeWidth + 5
          }
          strokeOpacity="0.18"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pointerEvents="none"
        />
      ) : null}

      <path
        d={path}
        fill="none"
        stroke={
          animated
            ? `url(#arrow-gradient-${gradientId})`
            : resolvedColour
        }
        strokeWidth={
          resolvedStrokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray={
          liveArrow.valid
            ? undefined
            : "8 6"
        }
        className={
          animated
            ? "animate-pulse"
            : undefined
        }
        pointerEvents="none"
      />

      <ArrowHead
        arrow={liveArrow}
        colour={
          resolvedColour
        }
        strokeWidth={
          resolvedStrokeWidth
        }
      />
    </g>
  );
}