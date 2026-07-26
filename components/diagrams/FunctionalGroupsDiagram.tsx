type Group = {
  name: string;
  formula: string;
  color: string;
  ring: string;
  example: string;
  atoms: Array<{ label: string; fill: string; x: number; y: number }>;
  bonds: Array<{ x1: number; y1: number; x2: number; y2: number; double?: boolean }>;
};

const groups: Group[] = [
  {
    name: "Hydroxyl",
    formula: "R\u2212OH",
    color: "text-emerald-700",
    ring: "hover:border-emerald-300 hover:shadow-emerald-100",
    example: "Ethanol, cholesterol",
    atoms: [
      { label: "C", fill: "#0F172A", x: 14, y: 20 },
      { label: "O", fill: "#EF4444", x: 27, y: 20 },
      { label: "H", fill: "#2563EB", x: 37, y: 20 },
    ],
    bonds: [{ x1: 17, y1: 20, x2: 24, y2: 20 }, { x1: 30, y1: 20, x2: 34, y2: 20 }],
  },
  {
    name: "Carbonyl",
    formula: "C=O",
    color: "text-emerald-700",
    ring: "hover:border-emerald-300 hover:shadow-emerald-100",
    example: "Acetone, formaldehyde",
    atoms: [
      { label: "C", fill: "#0F172A", x: 16, y: 20 },
      { label: "O", fill: "#EF4444", x: 30, y: 12 },
    ],
    bonds: [{ x1: 19, y1: 19, x2: 27, y2: 13, double: true }],
  },
  {
    name: "Amine",
    formula: "R\u2212NH\u2082",
    color: "text-emerald-700",
    ring: "hover:border-emerald-300 hover:shadow-emerald-100",
    example: "Amino acids, amphetamine",
    atoms: [
      { label: "C", fill: "#0F172A", x: 14, y: 20 },
      { label: "N", fill: "#7C3AED", x: 28, y: 20 },
    ],
    bonds: [{ x1: 17, y1: 20, x2: 25, y2: 20 }],
  },
  {
    name: "Carboxylic acid",
    formula: "\u2212COOH",
    color: "text-emerald-700",
    ring: "hover:border-emerald-300 hover:shadow-emerald-100",
    example: "Acetic acid, citric acid",
    atoms: [
      { label: "C", fill: "#0F172A", x: 14, y: 22 },
      { label: "O", fill: "#EF4444", x: 27, y: 12 },
      { label: "O", fill: "#EF4444", x: 27, y: 30 },
      { label: "H", fill: "#2563EB", x: 38, y: 30 },
    ],
    bonds: [
      { x1: 16, y1: 20, x2: 24, y2: 13, double: true },
      { x1: 16, y1: 24, x2: 24, y2: 29 },
      { x1: 30, y1: 30, x2: 35, y2: 30 },
    ],
  },
];

export default function FunctionalGroupsDiagram() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {groups.map((group) => (
        <div
          key={group.name}
          className={`group/card relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${group.ring}`}
        >
          <svg viewBox="0 0 46 40" className="h-12 w-full">
            {group.bonds.map((b, i) =>
              b.double ? (
                <g key={i} stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round">
                  <line x1={b.x1} y1={b.y1 - 1} x2={b.x2} y2={b.y2 - 1} />
                  <line x1={b.x1} y1={b.y1 + 1} x2={b.x2} y2={b.y2 + 1} />
                </g>
              ) : (
                <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
              )
            )}
            {group.atoms.map((a, i) => (
              <g key={i} className="transition-transform duration-300 group-hover/card:scale-110" style={{ transformOrigin: `${a.x}px ${a.y}px` }}>
                <circle cx={a.x} cy={a.y} r="6.5" fill={a.fill} />
                <text x={a.x} y={a.y + 2.5} textAnchor="middle" fill="white" fontSize="6.5" fontWeight="700" fontFamily="Arial, sans-serif">
                  {a.label}
                </text>
              </g>
            ))}
          </svg>

          <p className={`mt-3 text-sm font-bold ${group.color}`}>{group.name}</p>
          <p className="text-xs text-slate-500">{group.formula}</p>

          <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover/card:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-600">
                e.g. {group.example}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
