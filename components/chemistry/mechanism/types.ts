export type MechanismPoint = {
  x: number;
  y: number;
};

export type MechanismArrow = {
  id: string;
  start: MechanismPoint;
  control: MechanismPoint;
  end: MechanismPoint;
  colour?: string;
  label: string;
};

export type MechanismHighlight =
  | "nucleophile"
  | "substrate"
  | "leaving-group"
  | "carbocation"
  | "deprotonation"
  | "product";

export type MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  arrows: MechanismArrow[];
  highlight: MechanismHighlight;
};