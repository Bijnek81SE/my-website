"use client";

import { useState } from "react";
import { Bond, type BondOrder, type BondPolarity, type BondType } from "@/components/chemistry/bonds";

const atomStyle = "fill-white stroke-slate-300 [stroke-width:2]";

export default function BondPlaygroundPage() {
  const [order, setOrder] = useState<BondOrder>(1);
  const [type, setType] = useState<BondType>("line");
  const [polarity, setPolarity] = useState<BondPolarity>("none");
  const [selected, setSelected] = useState(false);
  const [animated, setAnimated] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Chemistry component library</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Bond playground</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Test the reusable SVG bond component before using it in lessons, labs, and molecule diagrams.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
              <svg viewBox="0 0 640 360" className="h-auto w-full" aria-label="Interactive chemical bond preview">
                <defs>
                  <radialGradient id="preview-bg" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="640" height="360" fill="#020617" />
                <rect width="640" height="360" fill="url(#preview-bg)" />

                <Bond
                  start={{ x: 190, y: 180 }}
                  end={{ x: 450, y: 180 }}
                  order={order}
                  type={type}
                  polarity={polarity}
                  selected={selected}
                  animated={animated}
                  interactive
                  colour="#cbd5e1"
                  selectedColour="#60a5fa"
                  strokeWidth={5}
                  spacing={13}
                  ariaLabel="Preview bond. Select to toggle highlight."
                  onClick={() => setSelected((current) => !current)}
                />

                <circle cx="160" cy="180" r="34" className={atomStyle} />
                <circle cx="480" cy="180" r="34" className={atomStyle} />
                <text x="160" y="190" textAnchor="middle" className="fill-slate-900 text-2xl font-bold">C</text>
                <text x="480" y="190" textAnchor="middle" className="fill-slate-900 text-2xl font-bold">O</text>
              </svg>
            </div>

            <div className="space-y-6">
              <Control label="Bond order">
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 3] as BondOrder[]).map((value) => (
                    <Choice key={value} active={order === value} onClick={() => setOrder(value)}>{value}</Choice>
                  ))}
                </div>
              </Control>

              <Control label="Bond type">
                <div className="grid grid-cols-2 gap-2">
                  {(["line", "wedge", "dash", "aromatic"] as BondType[]).map((value) => (
                    <Choice key={value} active={type === value} onClick={() => setType(value)}>{value}</Choice>
                  ))}
                </div>
              </Control>

              <Control label="Dipole">
                <div className="grid grid-cols-3 gap-2">
                  {(["none", "forward", "reverse"] as BondPolarity[]).map((value) => (
                    <Choice key={value} active={polarity === value} onClick={() => setPolarity(value)}>{value}</Choice>
                  ))}
                </div>
              </Control>

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                Animated
                <input type="checkbox" checked={animated} onChange={(event) => setAnimated(event.target.checked)} className="h-5 w-5" />
              </label>

              <button
                type="button"
                onClick={() => setSelected((current) => !current)}
                className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {selected ? "Clear selection" : "Select bond"}
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-100 p-5 font-mono text-sm leading-7 text-slate-800">
            {`<Bond\n  start={{ x: 190, y: 180 }}\n  end={{ x: 450, y: 180 }}\n  order={${order}}\n  type="${type}"\n  polarity="${polarity}"\n  selected={${selected}}\n  animated={${animated}}\n/>`}
          </div>
        </div>
      </div>
    </main>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-slate-950">{label}</legend>
      {children}
    </fieldset>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}
