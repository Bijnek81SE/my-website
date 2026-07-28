export type CurvedArrowTone = "default" | "accent" | "success" | "danger";

export interface Point {
  x: number;
  y: number;
}

export interface CurvedArrowProps {
  start: Point;
  control: Point;
  end: Point;
  tone?: CurvedArrowTone;
  width?: number;
  headSize?: number;
  dashed?: boolean;
  animated?: boolean;
  selected?: boolean;
  muted?: boolean;
  interactive?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
  className?: string;
}
