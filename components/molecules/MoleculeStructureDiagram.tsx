import type { MoleculeDefinition } from "@/content/molecules";

function bondOffsets(order: 1 | 2 | 3): readonly number[] {
  if (order === 1) return [0];
  if (order === 2) return [-3, 3];
  return [-5, 0, 5];
}

export default function MoleculeStructureDiagram({ molecule }: { molecule: MoleculeDefinition }) {
  const atomMap = new Map(molecule.structure.atoms.map((atom) => [atom.id, atom]));

  return (
    <svg viewBox="0 0 300 170" role="img" aria-label={`${molecule.name} skeletal structure`} className="h-auto w-full max-w-lg">
      <rect x="1" y="1" width="298" height="168" rx="20" fill="#f8fafc" stroke="#cbd5e1" />
      {molecule.structure.bonds.flatMap((bond) => {
        const from = atomMap.get(bond.from);
        const to = atomMap.get(bond.to);
        if (!from || !to) return [];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.hypot(dx, dy) || 1;
        const nx = -dy / length;
        const ny = dx / length;
        return bondOffsets(bond.order).map((offset, index) => (
          <line
            key={`${bond.id}-${index}`}
            x1={from.x + nx * offset}
            y1={from.y + ny * offset}
            x2={to.x + nx * offset}
            y2={to.y + ny * offset}
            stroke="#0f172a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ));
      })}
      {molecule.structure.atoms.map((atom) => (
        <g key={atom.id}>
          <circle cx={atom.x} cy={atom.y} r="17" fill="#ffffff" stroke="#94a3b8" />
          <text x={atom.x} y={atom.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">
            {atom.label ?? atom.element}
          </text>
        </g>
      ))}
    </svg>
  );
}
