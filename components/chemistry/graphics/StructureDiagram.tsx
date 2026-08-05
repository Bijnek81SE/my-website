import { Atom } from "../atoms";
import { Bond } from "../bonds";
import type { BondOrder, BondType, Point } from "../bonds";
import ChemistryCanvas from "../ChemistryCanvas";
import { chemistryGraphicTokens } from "./tokens";

export type StructureDiagramAtom = {
  id: string;
  element: Parameters<typeof Atom>[0]["element"];
  position: Point;
  charge?: number;
  lonePairs?: number;
  radius?: number;
  showBackground?: boolean;
  fillColour?: string;
  strokeColour?: string;
  labelColour?: string;
  ariaLabel?: string;
};

export type StructureDiagramBond = {
  id: string;
  from: string;
  to: string;
  order?: BondOrder;
  type?: BondType;
  colour?: string;
  strokeWidth?: number;
  spacing?: number;
  ariaLabel?: string;
};

type StructureDiagramProps = {
  title: string;
  description: string;
  atoms: readonly StructureDiagramAtom[];
  bonds: readonly StructureDiagramBond[];
  viewBox?: string;
  className?: string;
};

export default function StructureDiagram({
  title,
  description,
  atoms,
  bonds,
  viewBox = "0 0 100 100",
  className = "h-auto w-full",
}: StructureDiagramProps) {
  const atomById = new Map(atoms.map((atom) => [atom.id, atom]));

  return (
    <ChemistryCanvas
      title={title}
      description={description}
      viewBox={viewBox}
      className={className}
    >
      {bonds.map((bond) => {
        const from = atomById.get(bond.from);
        const to = atomById.get(bond.to);

        if (!from || !to) return null;

        return (
          <Bond
            key={bond.id}
            id={bond.id}
            start={from.position}
            end={to.position}
            order={bond.order}
            type={bond.type}
            colour={bond.colour ?? chemistryGraphicTokens.colours.bond}
            strokeWidth={bond.strokeWidth ?? chemistryGraphicTokens.bond.strokeWidth}
            spacing={bond.spacing ?? chemistryGraphicTokens.bond.spacing}
            ariaLabel={bond.ariaLabel}
          />
        );
      })}

      {atoms.map((atom) => (
        <Atom
          key={atom.id}
          id={atom.id}
          element={atom.element}
          x={atom.position.x}
          y={atom.position.y}
          charge={atom.charge}
          lonePairs={atom.lonePairs}
          radius={atom.radius}
          showBackground={atom.showBackground}
          fillColour={atom.fillColour}
          strokeColour={atom.strokeColour}
          labelColour={atom.labelColour}
          ariaLabel={atom.ariaLabel}
        />
      ))}
    </ChemistryCanvas>
  );
}
