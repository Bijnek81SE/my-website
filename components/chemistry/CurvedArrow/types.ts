export type CurvedArrowTone =
  | "default"
  | "accent"
  | "success"
  | "danger";

export type CurvedArrowHead =
  | "pair"
  | "fishhook";

export interface Point {
  x: number;
  y: number;
}

export interface CurvedArrowProps {
  start: Point;
  control: Point;
  end: Point;

  tone?: CurvedArrowTone;
  head?: CurvedArrowHead;

  colour?: string;
  width?: number;
  headSize?: number;

  dashed?: boolean;
  animated?: boolean;

  selected?: boolean;
  muted?: boolean;

  interactive?: boolean;

  label?: string;
  ariaLabel?: string;

  onClick?: () => void;
  className?: string;
}