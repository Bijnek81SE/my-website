export type SkeletalPoint = {
  x: number;
  y: number;
};

export type SkeletalBondType =
  | "single"
  | "double"
  | "triple"
  | "wedge"
  | "dash"
  | "aromatic"
  | "wavy";

export type SkeletalBondPolarity =
  | "none"
  | "forward"
  | "reverse";

export type SkeletalAtom = {
  id: string;
  position: SkeletalPoint;
  element?: string;
  label?: string;
  showLabel?: boolean;
  colour?: string;
  charge?: number;
  radical?: boolean;
  labelOffset?: SkeletalPoint;
  fontSize?: number;

  maxValence?: number;
};

export type SkeletalBond = {
  id: string;
  from: string;
  to: string;
  type?: SkeletalBondType;
  colour?: string;
  strokeWidth?: number;
  spacing?: number;
  parallelOffset?: number;
  highlighted?: boolean;
  selected?: boolean;
  muted?: boolean;
  animated?: boolean;
  interactive?: boolean;
  polarity?: SkeletalBondPolarity;
  ariaLabel?: string;

  editable?: boolean;
  maxOrder?: 1 | 2 | 3;
  canBecomeAromatic?: boolean;
  canBecomeWedge?: boolean;
  canBecomeDash?: boolean;
  canBecomeWavy?: boolean;
};

export type SkeletalAnnotation = {
  id: string;
  position: SkeletalPoint;
  text: string;
  colour?: string;
  fontSize?: number;
  fontWeight?: number;
  anchor?: "start" | "middle" | "end";
};

export type SkeletalMoleculeDefinition = {
  id: string;
  name: string;
  atoms: readonly SkeletalAtom[];
  bonds: readonly SkeletalBond[];
  annotations?: readonly SkeletalAnnotation[];
};