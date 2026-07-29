import { useId } from "react";
import type { MechanismArrow as MechanismArrowData } from "./types";

type MechanismArrowProps = MechanismArrowData & {
  animated?: boolean;
};

export default function MechanismArrow({
  start,
  control,
  end,
  colour = "#2563eb",
  label,
  animated = true,
}: MechanismArrowProps) {
  const markerId = useId().replace(/:/g, "");
  const path = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

  return (
    <g role="img" aria-label={label}>
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
        strokeWidth="4"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
        strokeDasharray={animated ? "11 9" : undefined}
        className={animated ? "mechanism-arrow-flow" : undefined}
      />
    </g>
  );
}
