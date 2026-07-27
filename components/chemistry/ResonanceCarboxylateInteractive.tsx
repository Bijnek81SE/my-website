"use client";

import { useState } from "react";

type View = "contributors" | "hybrid";

function AtomLabel({ x, y, label, charge }: { x: number; y: number; label: string; charge?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="31" fill="white" stroke="#cbd5e1" strokeWidth="2" />
      <text x={x} y={y + 9} textAnchor="middle" fontSize="28" fontWeight="700" fill="#0f172a">{label}</text>
      {charge ? <text x={x + 25} y={y - 23} textAnchor="middle" fontSize="20" fontWeight="700" fill="#7c3aed">{charge}</text> : null}
    </g>
  );
}

function Bond({ x1, y1, x2, y2, order = 1, dashed = false }: { x1: number; y1: number; x2: number; y2: number; order?: 1 | 2; dashed?: boolean }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const offset = order === 2 ? 5 : 0;
  const common = { stroke: "#0f172a", strokeWidth: 4, strokeLinecap: "round" as const, strokeDasharray: dashed ? "10 9" : undefined };
  return (
    <g>
      <line x1={x1 + nx * offset} y1={y1 + ny * offset} x2={x2 + nx * offset} y2={y2 + ny * offset} {...common} />
      {order === 2 ? <line x1={x1 - nx * offset} y1={y1 - ny * offset} x2={x2 - nx * offset} y2={y2 - ny * offset} {...common} /> : null}
    </g>
  );
}

function LonePair({ x, y }: { x: number; y: number }) {
  return <g fill="#2563eb"><circle cx={x - 4} cy={y} r="3.5" /><circle cx={x + 4} cy={y} r="3.5" /></g>;
}

function Contributor({ mirrored = false, xOffset = 0 }: { mirrored?: boolean; xOffset?: number }) {
  const leftOrder = mirrored ? 1 : 2;
  const rightOrder = mirrored ? 2 : 1;
  return (
    <g transform={`translate(${xOffset} 0)`}>
      <Bond x1={92} y1={150} x2={175} y2={150} order={leftOrder as 1 | 2} />
      <Bond x1={225} y1={150} x2={308} y2={150} order={rightOrder as 1 | 2} />
      <AtomLabel x={62} y={150} label="O" charge={mirrored ? "−" : undefined} />
      <AtomLabel x={200} y={150} label="C" />
      <AtomLabel x={338} y={150} label="O" charge={mirrored ? undefined : "−"} />
      {mirrored ? <><LonePair x={62} y={103} /><LonePair x={62} y={197} /><LonePair x={62} y={218} /></> : <><LonePair x={338} y={103} /><LonePair x={338} y={197} /><LonePair x={338} y={218} /></>}
    </g>
  );
}

export default function ResonanceCarboxylateInteractive() {
  const [view, setView] = useState<View>("contributors");

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">Interactive figure</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">Carboxylate resonance</h3>
        </div>
        <div className="inline-flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Choose resonance view">
          <button type="button" onClick={() => setView("contributors")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${view === "contributors" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>Contributors</button>
          <button type="button" onClick={() => setView("hybrid")} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${view === "hybrid" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>Real hybrid</button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
        {view === "contributors" ? (
          <svg viewBox="0 0 860 300" role="img" aria-labelledby="contributors-title contributors-desc" className="h-auto w-full">
            <title id="contributors-title">Two equivalent carboxylate resonance contributors</title>
            <desc id="contributors-desc">The atom positions remain fixed while the double bond and negative charge exchange sides.</desc>
            <Contributor xOffset={25} />
            <text x="430" y="160" textAnchor="middle" fontSize="48" fill="#475569">↔</text>
            <Contributor mirrored xOffset={460} />
            <text x="215" y="260" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">Contributor A</text>
            <text x="675" y="260" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">Contributor B</text>
          </svg>
        ) : (
          <svg viewBox="0 0 860 300" role="img" aria-labelledby="hybrid-title hybrid-desc" className="h-auto w-full">
            <title id="hybrid-title">Carboxylate resonance hybrid</title>
            <desc id="hybrid-desc">Both carbon oxygen bonds are equivalent and the negative charge is distributed over both oxygen atoms.</desc>
            <defs>
              <linearGradient id="electron-cloud" x1="0" x2="1">
                <stop offset="0" stopColor="#c4b5fd" stopOpacity="0.25" />
                <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <ellipse cx="430" cy="150" rx="300" ry="78" fill="url(#electron-cloud)" />
            <Bond x1={305} y1={150} x2={405} y2={150} dashed />
            <Bond x1={455} y1={150} x2={555} y2={150} dashed />
            <AtomLabel x={275} y={150} label="O" charge="δ−" />
            <AtomLabel x={430} y={150} label="C" charge="δ+" />
            <AtomLabel x={585} y={150} label="O" charge="δ−" />
            <text x="352" y="235" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6d28d9">bond order ≈ 1.5</text>
            <text x="508" y="235" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6d28d9">bond order ≈ 1.5</text>
          </svg>
        )}
      </div>

      <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600 sm:px-6">
        {view === "contributors"
          ? "The two drawings use identical atom positions. Only the π electrons and formal charge change location."
          : "The real ion has two equivalent C–O bonds and a negative charge delocalised over both oxygen atoms."}
      </div>
    </section>
  );
}
