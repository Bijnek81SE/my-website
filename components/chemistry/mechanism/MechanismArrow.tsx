import CurvedArrow from "../CurvedArrow";
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
  return (
    <CurvedArrow
      start={start}
      control={control}
      end={end}
      colour={colour}
      width={4}
      label={label}
      ariaLabel={label}
      animated={animated}
    />
  );
}