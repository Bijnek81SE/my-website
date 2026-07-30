import EngineCurvedArrow from "./CurvedArrow/CurvedArrow";
import type {
  CurvedArrowProps,
  CurvedArrowTone,
  Point,
} from "./CurvedArrow/types";

export type { CurvedArrowProps, CurvedArrowTone, Point };

type LegacyProps = {
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
}: LegacyProps) {
  return (
    <EngineCurvedArrow
      start={start}
      control={control}
      end={end}
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