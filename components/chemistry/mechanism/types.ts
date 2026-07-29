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

export type MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  arrows: MechanismArrow[];
  highlight: "nucleophile" | "substrate" | "leaving-group" | "product";
};
