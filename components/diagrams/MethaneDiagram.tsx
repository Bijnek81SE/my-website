import {
  AccessibleChemistryFigure,
  StructureDiagram,
} from "@/components/chemistry";

const atoms = [
  { id: "carbon", element: "C" as const, position: { x: 50, y: 50 }, radius: 9 },
  { id: "hydrogen-1", element: "H" as const, position: { x: 26, y: 20 }, radius: 7 },
  { id: "hydrogen-2", element: "H" as const, position: { x: 74, y: 20 }, radius: 7 },
  { id: "hydrogen-3", element: "H" as const, position: { x: 78, y: 80 }, radius: 7 },
  { id: "hydrogen-4", element: "H" as const, position: { x: 22, y: 80 }, radius: 7 },
] as const;

const bonds = [
  { id: "c-h-1", from: "carbon", to: "hydrogen-1", strokeWidth: 2 },
  { id: "c-h-2", from: "carbon", to: "hydrogen-2", strokeWidth: 2 },
  { id: "c-h-3", from: "carbon", to: "hydrogen-3", type: "wedge" as const, strokeWidth: 2 },
  { id: "c-h-4", from: "carbon", to: "hydrogen-4", type: "dash" as const, strokeWidth: 2 },
] as const;

export default function MethaneDiagram() {
  return (
    <AccessibleChemistryFigure
      title="Tetrahedral methane"
      description="A carbon atom bonded to four hydrogen atoms. Two bonds lie in the page, one wedge points toward the viewer, and one dashed bond points away."
      className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-slate-50"
    >
      <StructureDiagram
        title="Tetrahedral methane structure"
        description="Carbon with four single carbon-hydrogen bonds in a tetrahedral arrangement."
        atoms={atoms}
        bonds={bonds}
        viewBox="0 0 100 100"
        className="aspect-square h-auto w-full p-3"
      />
    </AccessibleChemistryFigure>
  );
}
