import { wedgePoints, hashTicks } from "./bondHelpers";

const CARBON = { x: 50, y: 50 };
const H_PLAIN_LEFT = { x: 26, y: 20 };
const H_PLAIN_RIGHT = { x: 74, y: 20 };
const H_WEDGE = { x: 78, y: 80 };
const H_DASH = { x: 22, y: 80 };

const atomInfo = [
  { pos: H_PLAIN_LEFT, label: "H", tooltip: "Hydrogen · in the plane of the page" },
  { pos: H_PLAIN_RIGHT, label: "H", tooltip: "Hydrogen · in the plane of the page" },
  { pos: H_WEDGE, label: "H", tooltip: "Hydrogen · pointing toward you" },
  { pos: H_DASH, label: "H", tooltip: "Hydrogen · pointing away from you" },
];

export default function MethaneDiagram() {
  const ticks = hashTicks(CARBON.x, CARBON.y, H_DASH.x, H_DASH.y);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* plain in-plane bonds */}
        <line x1={CARBON.x} y1={CARBON.y} x2={H_PLAIN_LEFT.x} y2={H_PLAIN_LEFT.y} stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
        <line x1={CARBON.x} y1={CARBON.y} x2={H_PLAIN_RIGHT.x} y2={H_PLAIN_RIGHT.y} stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />

        {/* solid wedge bond: coming toward the viewer */}
        <polygon points={wedgePoints(CARBON.x, CARBON.y, H_WEDGE.x, H_WEDGE.y)} fill="#334155" />

        {/* dashed/hashed bond: going away from the viewer */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
        ))}
      </svg>

      {/* central carbon */}
      <div
        className="group/c absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white shadow-lg ring-4 ring-white animate-soft-pulse"
        style={{ left: `${CARBON.x}%`, top: `${CARBON.y}%` }}
      >
        C
        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/c:opacity-100">
          Carbon · four bonds, tetrahedral
        </span>
      </div>

      {/* hydrogens */}
      {atomInfo.map((atom, i) => (
        <div
          key={i}
          className="group/h absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md ring-4 ring-white transition-transform duration-300 hover:z-10 hover:scale-125"
          style={{ left: `${atom.pos.x}%`, top: `${atom.pos.y}%` }}
        >
          {atom.label}
          <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/h:opacity-100">
            {atom.tooltip}
          </span>
        </div>
      ))}
    </div>
  );
}
