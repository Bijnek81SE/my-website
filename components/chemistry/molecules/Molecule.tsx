"use client";

import { useMemo } from "react";
import { Atom, type ElementSymbol } from "../atoms";
import {
  Bond,
  type BondOrder,
  type BondPolarity,
  type BondType,
  type Point,
} from "../bonds";

export type MoleculeAtom = {
  id: string;
  element: ElementSymbol;
  x: number;
  y: number;
  charge?: number;
  lonePairs?: number;
  radius?: number;
};

export type MoleculeBond = {
  id?: string;
  from: string;
  to: string;
  order?: BondOrder;
  type?: BondType;
  polarity?: BondPolarity;
  animated?: boolean;
};

export type MoleculeProps = {
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
  width?: number;
  height?: number;
  selectedAtomId?: string | null;
  selectedBondId?: string | null;
  interactiveAtoms?: boolean;
  interactiveBonds?: boolean;
  showAtomBackgrounds?: boolean;
  background?: string;
  bondColour?: string;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;
  onAtomClick?: (atom: MoleculeAtom) => void;
  onBondClick?: (bond: MoleculeBond) => void;
};

function shortenLine(start: Point, end: Point, startRadius: number, endRadius: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  return {
    start: {
      x: start.x + ux * startRadius,
      y: start.y + uy * startRadius,
    },
    end: {
      x: end.x - ux * endRadius,
      y: end.y - uy * endRadius,
    },
  };
}

export default function Molecule({
  atoms,
  bonds,
  width = 640,
  height = 360,
  selectedAtomId = null,
  selectedBondId = null,
  interactiveAtoms = false,
  interactiveBonds = false,
  showAtomBackgrounds = true,
  background = "transparent",
  bondColour = "#475569",
  selectedColour = "#2563eb",
  className,
  ariaLabel = "Molecular structure",
  onAtomClick,
  onBondClick,
}: MoleculeProps) {
  const atomMap = useMemo(() => new Map(atoms.map((atom) => [atom.id, atom])), [atoms]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <rect width={width} height={height} fill={background} />

      <g aria-label="Bonds">
        {bonds.map((bond, index) => {
          const startAtom = atomMap.get(bond.from);
          const endAtom = atomMap.get(bond.to);
          if (!startAtom || !endAtom) return null;

          const bondId = bond.id ?? `${bond.from}-${bond.to}-${index}`;
          const shortened = shortenLine(
            { x: startAtom.x, y: startAtom.y },
            { x: endAtom.x, y: endAtom.y },
            showAtomBackgrounds ? startAtom.radius ?? 25 : 5,
            showAtomBackgrounds ? endAtom.radius ?? 25 : 5,
          );

          return (
            <Bond
              key={bondId}
              start={shortened.start}
              end={shortened.end}
              order={bond.order}
              type={bond.type}
              polarity={bond.polarity}
              animated={bond.animated}
              selected={selectedBondId === bondId}
              interactive={interactiveBonds}
              colour={bondColour}
              selectedColour={selectedColour}
              ariaLabel={`${bond.order ?? 1} order bond from ${startAtom.element} to ${endAtom.element}`}
              onClick={onBondClick ? () => onBondClick({ ...bond, id: bondId }) : undefined}
            />
          );
        })}
      </g>

      <g aria-label="Atoms">
        {atoms.map((atom) => (
          <Atom
            key={atom.id}
            id={atom.id}
            element={atom.element}
            x={atom.x}
            y={atom.y}
            charge={atom.charge}
            lonePairs={atom.lonePairs}
            radius={atom.radius}
            selected={selectedAtomId === atom.id}
            interactive={interactiveAtoms}
            showBackground={showAtomBackgrounds}
            selectedColour={selectedColour}
            onClick={onAtomClick ? () => onAtomClick(atom) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
