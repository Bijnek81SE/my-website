"use client";

import {
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

export type Point = {
  x: number;
  y: number;
};

export type BondOrder = 1 | 2 | 3;

export type BondType =
  | "line"
  | "wedge"
  | "dash"
  | "aromatic"
  | "wavy";

export type BondPolarity =
  | "none"
  | "forward"
  | "reverse";

export type BondProps = {
  id?: string;
  start: Point;
  end: Point;
  order?: BondOrder;
  type?: BondType;
  polarity?: BondPolarity;
  highlighted?: boolean;
  hovered?: boolean;
  active?: boolean;
  selected?: boolean;
  muted?: boolean;
  animated?: boolean;
  interactive?: boolean;
  strokeWidth?: number;
  spacing?: number;
  parallelOffset?: number;
  colour?: string;
  highlightedColour?: string;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;

  onClick?: (
    event: ReactMouseEvent<SVGGElement>,
  ) => void;

  onDoubleClick?: (
    event: ReactMouseEvent<SVGGElement>,
  ) => void;

  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const DEFAULT_COLOUR = "#0f172a";
const DEFAULT_HIGHLIGHTED_COLOUR = "#7c3aed";
const DEFAULT_SELECTED_COLOUR = "#2563eb";

export function stableBondCoordinate(
  value: number,
): number {
  return Math.round(value * 10_000) / 10_000;
}

function stablePoint(point: Point): Point {
  return {
    x: stableBondCoordinate(point.x),
    y: stableBondCoordinate(point.y),
  };
}

function unitNormal(
  start: Point,
  end: Point,
): Point & { length: number } {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: stableBondCoordinate(-dy / length),
    y: stableBondCoordinate(dx / length),
    length: stableBondCoordinate(length),
  };
}

function offsetPoint(
  point: Point,
  normal: Point,
  amount: number,
): Point {
  return {
    x: stableBondCoordinate(
      point.x + normal.x * amount,
    ),
    y: stableBondCoordinate(
      point.y + normal.y * amount,
    ),
  };
}

function lineOffsets({
  order,
  spacing,
  parallelOffset,
}: {
  order: BondOrder;
  spacing: number;
  parallelOffset?: number;
}): number[] {
  if (order === 1) {
    return [0];
  }

  if (order === 2) {
    return parallelOffset === undefined
      ? [-spacing / 2, spacing / 2]
      : [0, parallelOffset];
  }

  return [-spacing, 0, spacing];
}

function wedgePoints(
  start: Point,
  end: Point,
  width: number,
): string {
  const normal = unitNormal(start, end);
  const halfWidth = width / 2;

  const left = offsetPoint(
    end,
    normal,
    halfWidth,
  );

  const right = offsetPoint(
    end,
    normal,
    -halfWidth,
  );

  return [
    `${stableBondCoordinate(start.x)},${stableBondCoordinate(start.y)}`,
    `${stableBondCoordinate(left.x)},${stableBondCoordinate(left.y)}`,
    `${stableBondCoordinate(right.x)},${stableBondCoordinate(right.y)}`,
  ].join(" ");
}

function wavyPoints(
  start: Point,
  end: Point,
  amplitude = 4,
  segments = 8,
): string {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;

  return Array.from(
    { length: segments + 1 },
    (_, index) => {
      const progress = index / segments;

      const wave =
        Math.sin(
          progress * Math.PI * segments,
        ) * amplitude;

      const x = stableBondCoordinate(
        start.x +
          dx * progress +
          normalX * wave,
      );

      const y = stableBondCoordinate(
        start.y +
          dy * progress +
          normalY * wave,
      );

      return `${x},${y}`;
    },
  ).join(" ");
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

  const unitX =
    (end.x - start.x) / normal.length;

  const unitY =
    (end.y - start.y) / normal.length;

  const forwardStart = stablePoint({
    x:
      start.x +
      unitX * inset +
      normal.x * offset,
    y:
      start.y +
      unitY * inset +
      normal.y * offset,
  });

  const forwardEnd = stablePoint({
    x:
      end.x -
      unitX * inset +
      normal.x * offset,
    y:
      end.y -
      unitY * inset +
      normal.y * offset,
  });

  const arrowStart =
    direction === "forward"
      ? forwardStart
      : forwardEnd;

  const arrowEnd =
    direction === "forward"
      ? forwardEnd
      : forwardStart;

  const arrowLength =
    Math.hypot(
      arrowEnd.x - arrowStart.x,
      arrowEnd.y - arrowStart.y,
    ) || 1;

  const arrowUnitX =
    (arrowEnd.x - arrowStart.x) /
    arrowLength;

  const arrowUnitY =
    (arrowEnd.y - arrowStart.y) /
    arrowLength;

  const arrowNormalX = -arrowUnitY;
  const arrowNormalY = arrowUnitX;
  const headLength = 9;
  const headWidth = 5;

  const headBase = stablePoint({
    x:
      arrowEnd.x -
      arrowUnitX * headLength,
    y:
      arrowEnd.y -
      arrowUnitY * headLength,
  });

  const headPoints = [
    `${stableBondCoordinate(arrowEnd.x)},${stableBondCoordinate(arrowEnd.y)}`,
    `${stableBondCoordinate(
      headBase.x +
        arrowNormalX * headWidth,
    )},${stableBondCoordinate(
      headBase.y +
        arrowNormalY * headWidth,
    )}`,
    `${stableBondCoordinate(
      headBase.x -
        arrowNormalX * headWidth,
    )},${stableBondCoordinate(
      headBase.y -
        arrowNormalY * headWidth,
    )}`,
  ].join(" ");

  return (
    <g aria-hidden="true">
      <line
        x1={arrowStart.x}
        y1={arrowStart.y}
        x2={headBase.x}
        y2={headBase.y}
        stroke={colour}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <polygon
        points={headPoints}
        fill={colour}
      />

      <line
        x1={stableBondCoordinate(
          arrowStart.x -
            arrowNormalX * 5,
        )}
        y1={stableBondCoordinate(
          arrowStart.y -
            arrowNormalY * 5,
        )}
        x2={stableBondCoordinate(
          arrowStart.x +
            arrowNormalX * 5,
        )}
        y2={stableBondCoordinate(
          arrowStart.y +
            arrowNormalY * 5,
        )}
        stroke={colour}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

export default function Bond({
  id,
  start,
  end,
  order = 1,
  type = "line",
  polarity = "none",
  highlighted = false,
  hovered = false,
  active = false,
  selected = false,
  muted = false,
  animated = false,
  interactive = false,
  strokeWidth = 5,
  spacing = 10,
  parallelOffset,
  colour = DEFAULT_COLOUR,
  highlightedColour =
    DEFAULT_HIGHLIGHTED_COLOUR,
  selectedColour = DEFAULT_SELECTED_COLOUR,
  className,
  ariaLabel = "Chemical bond",
  onClick,
  onDoubleClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: BondProps) {
  const [focused, setFocused] = useState(false);

  const stableStart = stablePoint(start);
  const stableEnd = stablePoint(end);

  const visuallyActive =
    selected ||
    active ||
    highlighted ||
    hovered ||
    focused;

  const activeColour = selected
    ? selectedColour
    : active ||
        highlighted ||
        hovered ||
        focused
      ? highlightedColour
      : colour;

  const opacity = muted ? 0.3 : 1;

  const normal = unitNormal(
    stableStart,
    stableEnd,
  );

  const wedgeWidth = Math.max(
    18,
    spacing * 2.4,
  );

  const offsets = lineOffsets({
    order,
    spacing,
    parallelOffset,
  });

  const clickable =
    interactive ||
    Boolean(onClick) ||
    Boolean(onDoubleClick);

  const hitWidth = Math.max(
    28,
    strokeWidth +
      spacing * order +
      14,
  );

  const handleKeyDown = (
    event: ReactKeyboardEvent<SVGGElement>,
  ) => {
    if (!onClick) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      event.currentTarget.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
        }),
      );
    }
  };

  const sharedLineProps = {
    stroke: activeColour,
    strokeWidth,
    strokeLinecap: "round" as const,
    vectorEffect:
      "non-scaling-stroke" as const,
  };

  return (
    <g
      id={id}
      className={className}
      role={clickable ? "button" : "img"}
      aria-label={ariaLabel}
      aria-pressed={
        clickable ? selected : undefined
      }
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        onMouseLeave?.();
      }}
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      opacity={opacity}
      style={{
        cursor: clickable
          ? "pointer"
          : "default",
        outline: "none",
      }}
      data-bond-selected={
        selected ? "true" : "false"
      }
      data-bond-active={
        active ? "true" : "false"
      }
      data-bond-highlighted={
        highlighted ? "true" : "false"
      }
      data-bond-hovered={
        hovered ? "true" : "false"
      }
      data-bond-focused={
        focused ? "true" : "false"
      }
      data-bond-animated={
        animated ? "true" : "false"
      }
    >
      {clickable ? (
        <line
          x1={stableStart.x}
          y1={stableStart.y}
          x2={stableEnd.x}
          y2={stableEnd.y}
          stroke="transparent"
          strokeWidth={hitWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}

      {visuallyActive ? (
        <line
          x1={stableStart.x}
          y1={stableStart.y}
          x2={stableEnd.x}
          y2={stableEnd.y}
          stroke={
            selected
              ? selectedColour
              : highlightedColour
          }
          strokeWidth={hitWidth * 0.72}
          strokeLinecap="round"
          opacity={
            selected
              ? 0.2
              : active
                ? 0.19
                : focused
                  ? 0.18
                  : 0.13
          }
          pointerEvents="none"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}

      {type === "wedge" ? (
        <polygon
          points={wedgePoints(
            stableStart,
            stableEnd,
            wedgeWidth,
          )}
          fill={activeColour}
          vectorEffect="non-scaling-stroke"
          className={
            animated
              ? "animate-pulse"
              : undefined
          }
        />
      ) : null}

      {type === "dash" ? (
        <g>
          {Array.from(
            { length: 7 },
            (_, index) => {
              const progress =
                (index + 1) / 8;

              const centre = stablePoint({
                x:
                  stableStart.x +
                  (stableEnd.x -
                    stableStart.x) *
                    progress,
                y:
                  stableStart.y +
                  (stableEnd.y -
                    stableStart.y) *
                    progress,
              });

              const halfWidth =
                (wedgeWidth * progress) /
                2;

              return (
                <line
                  key={index}
                  x1={stableBondCoordinate(
                    centre.x -
                      normal.x *
                        halfWidth,
                  )}
                  y1={stableBondCoordinate(
                    centre.y -
                      normal.y *
                        halfWidth,
                  )}
                  x2={stableBondCoordinate(
                    centre.x +
                      normal.x *
                        halfWidth,
                  )}
                  y2={stableBondCoordinate(
                    centre.y +
                      normal.y *
                        halfWidth,
                  )}
                  {...sharedLineProps}
                  strokeWidth={Math.max(
                    2,
                    strokeWidth - 1,
                  )}
                  className={
                    animated
                      ? "animate-pulse"
                      : undefined
                  }
                />
              );
            },
          )}
        </g>
      ) : null}

      {type === "wavy" ? (
        <polyline
          points={wavyPoints(
            stableStart,
            stableEnd,
          )}
          fill="none"
          {...sharedLineProps}
          strokeLinejoin="round"
          className={
            animated
              ? "animate-pulse"
              : undefined
          }
        />
      ) : null}

      {type === "line" ||
      type === "aromatic" ? (
        <g>
          {offsets.map((offset) => {
            const lineStart =
              offsetPoint(
                stableStart,
                normal,
                offset,
              );

            const lineEnd =
              offsetPoint(
                stableEnd,
                normal,
                offset,
              );

            return (
              <line
                key={offset}
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                {...sharedLineProps}
                strokeDasharray={
                  type === "aromatic"
                    ? "9 7"
                    : undefined
                }
                className={
                  animated
                    ? "animate-pulse"
                    : undefined
                }
              />
            );
          })}
        </g>
      ) : null}

      {polarity !== "none" ? (
        <DipoleArrow
          start={stableStart}
          end={stableEnd}
          direction={polarity}
          colour={selectedColour}
        />
      ) : null}
    </g>
  );
}