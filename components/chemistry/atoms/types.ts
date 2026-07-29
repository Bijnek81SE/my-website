export type ElementSymbol =
  | "H"
  | "B"
  | "C"
  | "N"
  | "O"
  | "F"
  | "Si"
  | "P"
  | "S"
  | "Cl"
  | "Br"
  | "I";

export type AtomPoint = {
  x: number;
  y: number;
};

export type AtomProps = {
  id?: string;
  element: ElementSymbol;
  x: number;
  y: number;
  charge?: number;
  lonePairs?: number;
  radius?: number;
  selected?: boolean;
  highlighted?: boolean;
  muted?: boolean;
  interactive?: boolean;
  showBackground?: boolean;
  labelColour?: string;
  fillColour?: string;
  strokeColour?: string;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: (id?: string) => void;
};