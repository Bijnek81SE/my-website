import EngineCurvedArrow from "./CurvedArrow/CurvedArrow";
import type {
  CurvedArrowHead,
  CurvedArrowProps,
  CurvedArrowTone,
  Point,
} from "./CurvedArrow/types";

export type {
  CurvedArrowHead,
  CurvedArrowProps,
  CurvedArrowTone,
  Point,
};

type LegacyProps = {
  start: Point;
  control: Point;
  end: Point;
  head?: CurvedArrowHead;
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

export default function CurvedArrow({
  start,
  control,
  end,
  head = "pair",
  colour,
  width = 3,
  label,
  ariaLabel,
  tone = "default",
  animated = false,
  selected = false,
  interactive = false,
  onClick,
}: LegacyProps) {
  return (
    <EngineCurvedArrow
      start={start}
      control={control}
      end={end}
      head={head}
      colour={colour}
      width={width}
      label={label}
      ariaLabel={ariaLabel}
      tone={tone}
      animated={animated}
      selected={selected}
      interactive={interactive}
      onClick={onClick}
    />
  );
}