import CurvedArrow from "./CurvedArrow";
import type { CurvedArrowProps } from "./types";

export interface CurvedArrowPairProps {
  forward: CurvedArrowProps;
  reverse: CurvedArrowProps;
}

export default function CurvedArrowPair({ forward, reverse }: CurvedArrowPairProps) {
  return (
    <>
      <CurvedArrow {...forward} />
      <CurvedArrow {...reverse} />
    </>
  );
}
