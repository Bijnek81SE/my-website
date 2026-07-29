"use client";

import type {
  KeyboardEvent,
  ReactNode,
  SVGProps,
} from "react";

type MoleculeCanvasProps = {
  width: number;
  height: number;
  className?: string;
  label?: string;
  children: ReactNode;
} & Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "children"
>;

export default function MoleculeCanvas({
  width,
  height,
  className = "",
  label = "Molecular structure",
  children,
  ...props
}: MoleculeCanvasProps) {
  function handleKeyDown(
    event: KeyboardEvent<SVGSVGElement>,
  ) {
    if (event.key === "Escape") {
      event.currentTarget.blur();
    }
  }

  return (
    <svg
      {...props}
      viewBox={`0 0 ${width} ${height}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={label}
      onKeyDown={handleKeyDown}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}