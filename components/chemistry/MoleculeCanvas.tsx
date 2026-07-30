"use client";

import type { ReactNode } from "react";
import Atom from "./Atom";
import Bond from "./Bond";
import CurvedArrow from "./CurvedArrow";
import type { ElementSymbol } from "./atoms";

export type MoleculeAtom = {
  id: string;
  x: number;
  y: number;
  element: ElementSymbol;
  charge?: number;
  radius?: number;
  labelColour?: string;
  showBackground?: boolean;
};

export type MoleculeBond = {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  order?: 1 | 2 | 3;
  stroke?: string;
  strokeWidth?: number;
};

export type MoleculeArrow = {
  id: string;
  start: { x: number; y: number };
  control: { x: number; y: number };
  end: { x: number; y: number };
  colour?: string;
  animated?: boolean;
  label?: string;
};

type MoleculeCanvasProps = {
  atoms?: MoleculeAtom[];
  bonds?: MoleculeBond[];
  arrows?: MoleculeArrow[];
  children?: ReactNode;
};

export default function MoleculeCanvas({
  atoms = [],
  bonds = [],
  arrows = [],
  children,
}: MoleculeCanvasProps) {
  return (
    <>
      {bonds.map((bond) => (
        <Bond
          key={bond.id}
          from={bond.from}
          to={bond.to}
          order={bond.order}
          atomRadius={0}
          gap={0}
          stroke={bond.stroke}
          strokeWidth={bond.strokeWidth}
        />
      ))}

      {arrows.map((arrow) => (
        <CurvedArrow
          key={arrow.id}
          start={arrow.start}
          control={arrow.control}
          end={arrow.end}
          colour={arrow.colour}
          animated={arrow.animated}
          label={arrow.label}
        />
      ))}

      {atoms.map((atom) => (
        <Atom
          key={atom.id}
          x={atom.x}
          y={atom.y}
          element={atom.element}
          charge={atom.charge}
          radius={atom.radius}
          labelColour={atom.labelColour}
          showBackground={atom.showBackground}
        />
      ))}

      {children}
    </>
  );
}