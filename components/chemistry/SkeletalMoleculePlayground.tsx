"use client";

import { useMemo, useState } from "react";
import {
  SkeletalMoleculeEngine,
  skeletalMoleculePresets,
} from "./skeletal";

export default function SkeletalMoleculePlayground() {
  const [presetId, setPresetId] = useState("cyclohexene");
  const [scale, setScale] = useState(1.45);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [showCarbons, setShowCarbons] = useState(false);

  const molecule = useMemo(
    () =>
      skeletalMoleculePresets.find((preset) => preset.id === presetId) ??
      skeletalMoleculePresets[0],
    [presetId],
  );

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Skeletal Molecule Engine
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Build consistent line-angle structures
        </h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          Preview reusable molecule definitions rendered from atom and bond data.
          The same engine supports double bonds, wedges, hashed wedges, charges,
          radicals, labels, and automatic geometry helpers.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-800">Molecule preset</span>
            <select
              value={presetId}
              onChange={(event) => setPresetId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900"
            >
              {skeletalMoleculePresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="flex items-center justify-between text-sm font-semibold text-slate-800">
              Scale <span>{scale.toFixed(2)}×</span>
            </span>
            <input
              type="range"
              min="0.75"
              max="2"
              step="0.05"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="mt-3 w-full"
            />
          </label>

          <label className="block">
            <span className="flex items-center justify-between text-sm font-semibold text-slate-800">
              Bond width <span>{strokeWidth}px</span>
            </span>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={strokeWidth}
              onChange={(event) => setStrokeWidth(Number(event.target.value))}
              className="mt-3 w-full"
            />
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-800">
            <input
              type="checkbox"
              checked={showCarbons}
              onChange={(event) => setShowCarbons(event.target.checked)}
            />
            Show carbon labels
          </label>
        </aside>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <svg viewBox="0 0 760 400" className="h-auto w-full" role="img" aria-label={molecule.name}>
            <rect width="760" height="400" fill="#f8fafc" />
            <SkeletalMoleculeEngine
              molecule={molecule}
              x={380}
              y={190}
              scale={scale}
              strokeWidth={strokeWidth}
              showCarbons={showCarbons}
            />
            <text x="380" y="350" textAnchor="middle" fontSize="18" fontWeight="700" fill="#475569">
              {molecule.name}
            </text>
          </svg>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-sm text-slate-100">
        <p className="font-bold text-emerald-300">Definition preview</p>
        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap leading-6">
          {JSON.stringify(molecule, null, 2)}
        </pre>
      </div>
    </section>
  );
}
