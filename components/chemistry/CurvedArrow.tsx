import { useId } from "react";

type Point = { x: number; y: number };

type CurvedArrowProps = {
  start: Point;
  control: Point;
  end: Point;
  colour?: string;
  width?: number;
  label?: string;
};

export default function CurvedArrow({
  start,
  control,
  end,
  colour = "#2563eb",
  width = 3,
  label,
}: CurvedArrowProps) {
  const markerId = useId().replace(/:/g, "");
  const path = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

  return (
    <g aria-label={label} role={label ? "img" : undefined}>
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
          <path d="M 0 0 L 7 3.5 L 0 7 z" fill={colour} />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={colour}
        strokeWidth={width}
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />
    </g>
  );
}
