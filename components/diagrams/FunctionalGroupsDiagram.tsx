import {
  StructureDiagram,
  chemistryGraphicTokens,
  type StructureDiagramAtom,
  type StructureDiagramBond,
} from "@/components/chemistry";

type Group = {
  name: string;
  formula: string;
  example: string;
  atoms: readonly StructureDiagramAtom[];
  bonds: readonly StructureDiagramBond[];
};

const compactRadius = chemistryGraphicTokens.atom.compactRadius;
const compactStroke = chemistryGraphicTokens.bond.compactStrokeWidth;

const groups: readonly Group[] = [
  {
    name: "Hydroxyl",
    formula: "R−OH",
    example: "Ethanol, cholesterol",
    atoms: [
      { id: "c", element: "C", position: { x: 14, y: 20 }, radius: compactRadius },
      { id: "o", element: "O", position: { x: 27, y: 20 }, radius: compactRadius },
      { id: "h", element: "H", position: { x: 40, y: 20 }, radius: compactRadius },
    ],
    bonds: [
      { id: "c-o", from: "c", to: "o", strokeWidth: compactStroke },
      { id: "o-h", from: "o", to: "h", strokeWidth: compactStroke },
    ],
  },
  {
    name: "Carbonyl",
    formula: "C=O",
    example: "Acetone, formaldehyde",
    atoms: [
      { id: "c", element: "C", position: { x: 14, y: 24 }, radius: compactRadius },
      { id: "o", element: "O", position: { x: 32, y: 14 }, radius: compactRadius },
    ],
    bonds: [
      { id: "c-o", from: "c", to: "o", order: 2, strokeWidth: compactStroke, spacing: 2.2 },
    ],
  },
  {
    name: "Amine",
    formula: "R−NH₂",
    example: "Amino acids, amphetamine",
    atoms: [
      { id: "c", element: "C", position: { x: 14, y: 20 }, radius: compactRadius },
      { id: "n", element: "N", position: { x: 31, y: 20 }, radius: compactRadius, lonePairs: 1 },
    ],
    bonds: [
      { id: "c-n", from: "c", to: "n", strokeWidth: compactStroke },
    ],
  },
  {
    name: "Carboxylic acid",
    formula: "−COOH",
    example: "Acetic acid, citric acid",
    atoms: [
      { id: "c", element: "C", position: { x: 13, y: 22 }, radius: compactRadius },
      { id: "o-1", element: "O", position: { x: 28, y: 11 }, radius: compactRadius },
      { id: "o-2", element: "O", position: { x: 28, y: 31 }, radius: compactRadius },
      { id: "h", element: "H", position: { x: 42, y: 31 }, radius: compactRadius },
    ],
    bonds: [
      { id: "c-o-1", from: "c", to: "o-1", order: 2, strokeWidth: compactStroke, spacing: 2.2 },
      { id: "c-o-2", from: "c", to: "o-2", strokeWidth: compactStroke },
      { id: "o-h", from: "o-2", to: "h", strokeWidth: compactStroke },
    ],
  },
];

export default function FunctionalGroupsDiagram() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {groups.map((group) => (
        <div
          key={group.name}
          className="group/card relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100 motion-reduce:transform-none motion-reduce:transition-none"
        >
          <StructureDiagram
            title={`${group.name} functional group`}
            description={`${group.formula}. Examples include ${group.example}.`}
            atoms={group.atoms}
            bonds={group.bonds}
            viewBox="0 0 48 42"
            className="h-14 w-full"
          />

          <p className="mt-3 text-sm font-bold text-emerald-700">{group.name}</p>
          <p className="text-xs text-slate-500">{group.formula}</p>
          <p className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-600">
            e.g. {group.example}
          </p>
        </div>
      ))}
    </div>
  );
}
