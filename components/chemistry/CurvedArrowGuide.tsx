export default function CurvedArrowGuide() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <svg viewBox="0 0 1000 430" role="img" aria-labelledby="arrow-title arrow-desc" className="h-auto w-full bg-slate-50">
        <title id="arrow-title">Correct curved-arrow origins and destinations</title>
        <desc id="arrow-desc">A curved arrow starts at a lone pair or pi bond and ends at a bond or atom.</desc>
        <defs>
          <marker id="arrow-head" markerWidth="8" markerHeight="8" refX="6.5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L7,3 z" fill="#2563eb" />
          </marker>
        </defs>

        <g transform="translate(45 40)">
          <rect width="430" height="320" rx="24" fill="white" stroke="#cbd5e1" />
          <text x="215" y="46" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">Lone pair → bond</text>
          <text x="120" y="190" textAnchor="middle" fontSize="42" fontWeight="700" fill="#0f172a">O⁻</text>
          <circle cx="110" cy="128" r="4" fill="#2563eb" /><circle cx="122" cy="128" r="4" fill="#2563eb" />
          <line x1="160" y1="180" x2="270" y2="180" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <text x="315" y="195" textAnchor="middle" fontSize="42" fontWeight="700" fill="#0f172a">C</text>
          <path d="M116 128 C150 78, 230 88, 267 151" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow-head)" />
          <circle cx="116" cy="128" r="9" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
          <text x="215" y="275" textAnchor="middle" fontSize="16" fill="#475569">Tail touches the electron pair.</text>
        </g>

        <g transform="translate(525 40)">
          <rect width="430" height="320" rx="24" fill="white" stroke="#cbd5e1" />
          <text x="215" y="46" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">π bond → atom</text>
          <text x="105" y="195" textAnchor="middle" fontSize="42" fontWeight="700" fill="#0f172a">C</text>
          <line x1="145" y1="169" x2="270" y2="169" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <line x1="145" y1="188" x2="270" y2="188" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
          <text x="315" y="195" textAnchor="middle" fontSize="42" fontWeight="700" fill="#0f172a">O</text>
          <path d="M207 178 C225 105, 309 105, 320 148" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow-head)" />
          <circle cx="207" cy="178" r="9" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
          <text x="215" y="275" textAnchor="middle" fontSize="16" fill="#475569">Tail begins at the π bond.</text>
        </g>
      </svg>
      <figcaption className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600">
        The tail identifies the electrons that move; the arrowhead identifies their new location.
      </figcaption>
    </figure>
  );
}
