"use client";

import type { SpectroscopyCompound } from "@/components/chemistry/spectroscopy";

type Props = {
  compound: SpectroscopyCompound;
  activeAtomIds: readonly string[];
  onAtomSelect: (atomId: string) => void;
};

function bondLines(order: 1 | 2 | 3 = 1, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const ox = (-dy / length) * 3;
  const oy = (dx / length) * 3;
  const offsets = order === 1 ? [0] : order === 2 ? [-1, 1] : [-2, 0, 2];
  return offsets.map((offset) => ({
    x1: x1 + ox * offset,
    y1: y1 + oy * offset,
    x2: x2 + ox * offset,
    y2: y2 + oy * offset,
  }));
}

export default function MoleculeSpectrumLink({ compound, activeAtomIds, onAtomSelect }: Props) {
  const atomMap = new Map(compound.atoms.map((atom) => [atom.id, atom]));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Structure link</p>
          <h2 className="mt-1 text-lg font-bold text-slate-950">{compound.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{compound.formula}</p>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800">Click atoms</span>
      </div>
      <svg viewBox="-10 -70 320 235" className="mt-5 h-56 w-full" role="img" aria-label={`${compound.name} structure with selectable atom environments`}>
        {compound.bonds.flatMap((bond) => {
          const from = atomMap.get(bond.from);
          const to = atomMap.get(bond.to);
          if (!from || !to) return [];
          return bondLines(bond.order, from.x, from.y, to.x, to.y).map((line, index) => (
            <line key={`${bond.id}-${index}`} {...line} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          ));
        })}
        {compound.atoms.map((atom) => {
          const active = activeAtomIds.includes(atom.id);
          return (
            <g
              key={atom.id}
              role="button"
              tabIndex={0}
              aria-label={`${atom.label ?? atom.element} atom environment`}
              aria-pressed={active}
              onClick={() => onAtomSelect(atom.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onAtomSelect(atom.id);
                }
              }}
              className="cursor-pointer outline-none"
            >
              <circle cx={atom.x} cy={atom.y} r={active ? 24 : 20} fill={active ? "#ddd6fe" : "#ffffff"} stroke={active ? "#7c3aed" : "#94a3b8"} strokeWidth={active ? 4 : 2} />
              <text x={atom.x} y={atom.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="700" fill="#0f172a">
                {atom.label ?? atom.element}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm leading-6 text-slate-600">Select an atom environment to highlight every spectrum assignment connected to it.</p>
    </div>
  );
}
