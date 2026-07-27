"use client";

import { useState } from "react";
import Atom from "./Atom";
import Bond from "./Bond";
import ChemistryCanvas from "./ChemistryCanvas";
import CurvedArrow from "./CurvedArrow";
import LonePair from "./LonePair";
import ResonanceArrow from "./ResonanceArrow";

type View = "contributors" | "hybrid";

type ContributorProps = {
  mirrored?: boolean;
  xOffset?: number;
  showElectronFlow?: boolean;
};

function Contributor({
  mirrored = false,
  xOffset = 0,
  showElectronFlow = false,
}: ContributorProps) {
  const left = { x: 62, y: 150 };
  const carbon = { x: 200, y: 150 };
  const right = { x: 338, y: 150 };
  const negativeOxygen = mirrored ? left : right;

  return (
    <g transform={`translate(${xOffset} 0)`}>
      <Bond from={left} to={carbon} order={mirrored ? 1 : 2} />
      <Bond from={carbon} to={right} order={mirrored ? 2 : 1} />

      <Atom x={left.x} y={left.y} element="O" charge={mirrored ? "−" : undefined} tone="oxygen" />
      <Atom x={carbon.x} y={carbon.y} element="C" />
      <Atom x={right.x} y={right.y} element="O" charge={mirrored ? undefined : "−"} tone="oxygen" />

      <LonePair x={negativeOxygen.x} y={103} />
      <LonePair x={negativeOxygen.x} y={197} />
      <LonePair x={negativeOxygen.x} y={218} />

      {showElectronFlow && !mirrored ? (
        <>
          <CurvedArrow
            start={{ x: 329, y: 113 }}
            control={{ x: 270, y: 78 }}
            end={{ x: 257, y: 139 }}
            label="A lone pair on the negatively charged oxygen forms a pi bond to carbon"
          />
          <CurvedArrow
            start={{ x: 145, y: 139 }}
            control={{ x: 102, y: 88 }}
            end={{ x: 73, y: 112 }}
            label="The existing carbon oxygen pi electrons move onto the other oxygen"
          />
        </>
      ) : null}
    </g>
  );
}

export default function ResonanceCarboxylateInteractive() {
  const [view, setView] = useState<View>("contributors");
  const [showElectronFlow, setShowElectronFlow] = useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-violet-700">
            Interactive figure
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">Carboxylate resonance</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {view === "contributors" ? (
            <button
              type="button"
              aria-pressed={showElectronFlow}
              onClick={() => setShowElectronFlow((current) => !current)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                showElectronFlow
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {showElectronFlow ? "Hide electron flow" : "Show electron flow"}
            </button>
          ) : null}

          <div className="inline-flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Choose resonance view">
            <button
              type="button"
              onClick={() => setView("contributors")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                view === "contributors"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Contributors
            </button>
            <button
              type="button"
              onClick={() => setView("hybrid")}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                view === "hybrid"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Real hybrid
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
        {view === "contributors" ? (
          <ChemistryCanvas
            id="carboxylate-contributors"
            title="Two equivalent carboxylate resonance contributors"
            description="The atom positions remain fixed while the pi bond and negative charge exchange sides. Optional arrows show electron movement from a lone pair and a pi bond."
          >
            <Contributor xOffset={25} showElectronFlow={showElectronFlow} />
            <ResonanceArrow x={430} y={150} />
            <Contributor mirrored xOffset={460} />
            <text x="215" y="270" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">
              Contributor A
            </text>
            <text x="675" y="270" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">
              Contributor B
            </text>
          </ChemistryCanvas>
        ) : (
          <ChemistryCanvas
            id="carboxylate-hybrid"
            title="Carboxylate resonance hybrid"
            description="Both carbon oxygen bonds are equivalent and the negative charge is distributed over both oxygen atoms."
          >
            <defs>
              <linearGradient id="electron-cloud" x1="0" x2="1">
                <stop offset="0" stopColor="#c4b5fd" stopOpacity="0.25" />
                <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="1" stopColor="#c4b5fd" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <ellipse cx="430" cy="150" rx="300" ry="78" fill="url(#electron-cloud)" />
            <Bond from={{ x: 275, y: 150 }} to={{ x: 430, y: 150 }} dashed />
            <Bond from={{ x: 430, y: 150 }} to={{ x: 585, y: 150 }} dashed />
            <Atom x={275} y={150} element="O" charge="δ−" tone="oxygen" />
            <Atom x={430} y={150} element="C" charge="δ+" />
            <Atom x={585} y={150} element="O" charge="δ−" tone="oxygen" />
            <text x="352" y="235" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6d28d9">
              bond order ≈ 1.5
            </text>
            <text x="508" y="235" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6d28d9">
              bond order ≈ 1.5
            </text>
          </ChemistryCanvas>
        )}
      </div>

      <div className="border-t border-slate-200 px-5 py-4 text-sm leading-6 text-slate-600 sm:px-6">
        {view === "contributors"
          ? showElectronFlow
            ? "Arrow tails begin at the electron source: a lone pair and the existing π bond. Arrowheads point to the new electron destination."
            : "The two drawings use identical atom positions. Only the π electrons and formal charge change location."
          : "The real ion has two equivalent C–O bonds and a negative charge delocalised over both oxygen atoms."}
      </div>
    </section>
  );
}
