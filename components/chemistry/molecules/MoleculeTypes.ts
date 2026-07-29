import type { ReactNode } from "react";

export type MoleculePoint = {
  x: number;
  y: number;
};

export type MoleculeAtom = {
  id: string;
  element: string;
  label?: string;
  position: MoleculePoint;
  charge?: number;
  lonePairs?: number;
  radius?: number;
  selected?: boolean;
  highlighted?: boolean;
  muted?: boolean;
};

export type MoleculeBondOrder = 1 | 2 | 3 | 1.5;

export type MoleculeBondType =
  | "normal"
  | "wedge"
  | "dash"
  | "aromatic";

export type MoleculeBond = {
  id: string;
  from: string;
  to: string;
  order?: MoleculeBondOrder;
  type?: MoleculeBondType;
  selected?: boolean;
  highlighted?: boolean;
  muted?: boolean;
};

export type MoleculeData = {
  id: string;
  name?: string;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
};

export type MoleculeSelection = {
  atomId: string | null;
  bondId: string | null;
};

export type MoleculeProps = {
  molecule: MoleculeData;
  width?: number;
  height?: number;
  className?: string;
  interactive?: boolean;
  selectedAtomId?: string | null;
  selectedBondId?: string | null;
  onAtomSelect?: (atom: MoleculeAtom) => void;
  onBondSelect?: (bond: MoleculeBond) => void;
  children?: ReactNode;
};