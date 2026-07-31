"use client";

import type { KeyboardEvent, ReactNode, SVGProps } from "react";
import MechanismArrow from "./MechanismArrow";
import type { MechanismArrow as MechanismArrowData } from "./types";

type ReactionCanvasEngineProps = {
  viewBox: string;
  ariaLabel: string;
  arrows?: MechanismArrowData[];
  animated?: boolean;
  backgroundFill?: string;
  className?: string;
  children: ReactNode;
};

export default function ReactionCanvasEngine({
  viewBox,
  ariaLabel,
  arrows = [],
  animated = true,
  backgroundFill = "#f8fafc",
  className = "h-auto w-full",
  children,
}: ReactionCanvasEngineProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg
        viewBox={viewBox}
        className={className}
        role="img"
        aria-label={ariaLabel}
      >
        <rect width="100%" height="100%" fill={backgroundFill} />

        {children}

        {arrows.map((arrow) => (
          <MechanismArrow
            key={arrow.id}
            {...arrow}
            animated={animated}
          />
        ))}
      </svg>
    </div>
  );
}

type SharedHotspotProps<TTarget extends string> = {
  target: TTarget;
  label: string;
  interactive: boolean;
  onTargetClick?: (target: TTarget) => void;
  focusClassName: string;
};

type RectHotspotProps<TTarget extends string> =
  SharedHotspotProps<TTarget> &
    Omit<SVGProps<SVGRectElement>, "onClick" | "onKeyDown"> & {
      shape: "rect";
    };

type CircleHotspotProps<TTarget extends string> =
  SharedHotspotProps<TTarget> &
    Omit<SVGProps<SVGCircleElement>, "onClick" | "onKeyDown"> & {
      shape: "circle";
    };

type LineHotspotProps<TTarget extends string> =
  SharedHotspotProps<TTarget> &
    Omit<SVGProps<SVGLineElement>, "onClick" | "onKeyDown"> & {
      shape: "line";
    };

export type ReactionHotspotProps<TTarget extends string> =
  | RectHotspotProps<TTarget>
  | CircleHotspotProps<TTarget>
  | LineHotspotProps<TTarget>;

export function ReactionHotspot<TTarget extends string>(
  props: ReactionHotspotProps<TTarget>,
) {
  const {
    target,
    label,
    interactive,
    onTargetClick,
    focusClassName,
    shape,
    ...shapeProps
  } = props;

  function activate() {
    if (interactive) {
      onTargetClick?.(target);
    }
  }

  function handleKeyDown(event: KeyboardEvent<SVGElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    activate();
  }

  const sharedProps = {
    role: interactive ? ("button" as const) : undefined,
    tabIndex: interactive ? 0 : undefined,
    "aria-label": interactive ? label : undefined,
    className: interactive ? focusClassName : undefined,
    onClick: activate,
    onKeyDown: handleKeyDown,
  };

  if (shape === "circle") {
    return (
      <circle
        {...(shapeProps as SVGProps<SVGCircleElement>)}
        {...sharedProps}
      />
    );
  }

  if (shape === "line") {
    return (
      <line
        {...(shapeProps as SVGProps<SVGLineElement>)}
        {...sharedProps}
      />
    );
  }

  return (
    <rect
      {...(shapeProps as SVGProps<SVGRectElement>)}
      {...sharedProps}
    />
  );
}
