"use client";

import { useMemo, useState } from "react";
import Atom from "./Atom";
import Bond from "./Bond";
import ChemistryCanvas from "./ChemistryCanvas";
import LonePair from "./LonePair";

type Point = { x: number; y: number };
type MoleculeKey = "water" | "ammonia" | "carbon-dioxide";
type AtomId = "central" | "terminal-0" | "terminal-1" | "terminal-2";

type AtomDefinition = {
  id: AtomId;
  element: "H" | "C" | "N" | "O";
  position: Point;
  valenceElectrons: number;
  targetShell: 2 | 8;
  tone?: "default" | "oxygen" | "nitrogen";
};

type MoleculeDefinition = {
  key: MoleculeKey;
  name: string;
  formula: string;
  prompt: string;
  atoms: AtomDefinition[];
  bonds: Array<{ from: AtomId; to: AtomId }>;
  targetBondOrders: number[];
  targetLonePairs: Record<AtomId, number>;
};

const moleculeDefinitions: Record<MoleculeKey, MoleculeDefinition> = {
  water: {
    key: "water",
    name: "Water",
    formula: "H₂O",
    prompt: "Build water using two O–H bonds and the correct number of lone pairs.",
    atoms: [
      {
        id: "central",
        element: "O",
        position: { x: 430, y: 150 },
        valenceElectrons: 6,
        targetShell: 8,
        tone: "oxygen",
      },
      {
        id: "terminal-0",
        element: "H",
        position: { x: 255, y: 150 },
        valenceElectrons: 1,
        targetShell: 2,
      },
      {
        id: "terminal-1",
        element: "H",
        position: { x: 605, y: 150 },
        valenceElectrons: 1,
        targetShell: 2,
      },
    ],
    bonds: [
      { from: "central", to: "terminal-0" },
      { from: "central", to: "terminal-1" },
    ],
    targetBondOrders: [1, 1],
    targetLonePairs: {
      central: 2,
      "terminal-0": 0,
      "terminal-1": 0,
      "terminal-2": 0,
    },
  },
  ammonia: {
    key: "ammonia",
    name: "Ammonia",
    formula: "NH₃",
    prompt: "Build ammonia using three N–H bonds and one lone pair on nitrogen.",
    atoms: [
      {
        id: "central",
        element: "N",
        position: { x: 430, y: 165 },
        valenceElectrons: 5,
        targetShell: 8,
        tone: "nitrogen",
      },
      {
        id: "terminal-0",
        element: "H",
        position: { x: 250, y: 165 },
        valenceElectrons: 1,
        targetShell: 2,
      },
      {
        id: "terminal-1",
        element: "H",
        position: { x: 610, y: 165 },
        valenceElectrons: 1,
        targetShell: 2,
      },
      {
        id: "terminal-2",
        element: "H",
        position: { x: 430, y: 35 },
        valenceElectrons: 1,
        targetShell: 2,
      },
    ],
    bonds: [
      { from: "central", to: "terminal-0" },
      { from: "central", to: "terminal-1" },
      { from: "central", to: "terminal-2" },
    ],
    targetBondOrders: [1, 1, 1],
    targetLonePairs: {
      central: 1,
      "terminal-0": 0,
      "terminal-1": 0,
      "terminal-2": 0,
    },
  },
  "carbon-dioxide": {
    key: "carbon-dioxide",
    name: "Carbon dioxide",
    formula: "CO₂",
    prompt: "Build carbon dioxide so every atom has a complete octet and the formal charges are minimised.",
    atoms: [
      {
        id: "central",
        element: "C",
        position: { x: 430, y: 150 },
        valenceElectrons: 4,
        targetShell: 8,
      },
      {
        id: "terminal-0",
        element: "O",
        position: { x: 245, y: 150 },
        valenceElectrons: 6,
        targetShell: 8,
        tone: "oxygen",
      },
      {
        id: "terminal-1",
        element: "O",
        position: { x: 615, y: 150 },
        valenceElectrons: 6,
        targetShell: 8,
        tone: "oxygen",
      },
    ],
    bonds: [
      { from: "central", to: "terminal-0" },
      { from: "central", to: "terminal-1" },
    ],
    targetBondOrders: [2, 2],
    targetLonePairs: {
      central: 0,
      "terminal-0": 2,
      "terminal-1": 2,
      "terminal-2": 0,
    },
  },
};

const atomIds: AtomId[] = ["central", "terminal-0", "terminal-1", "terminal-2"];

function createInitialLonePairs(): Record<AtomId, number> {
  return {
    central: 0,
    "terminal-0": 0,
    "terminal-1": 0,
    "terminal-2": 0,
  };
}

function lonePairPositions(atom: AtomDefinition, count: number): Array<Point & { direction: "horizontal" | "vertical" }> {
  const x = atom.position.x;
  const y = atom.position.y;
  const positions: Array<Point & { direction: "horizontal" | "vertical" }> = [
    { x, y: y - 47, direction: "horizontal" },
    { x, y: y + 47, direction: "horizontal" },
    { x: x - 47, y, direction: "vertical" },
    { x: x + 47, y, direction: "vertical" },
  ];

  return positions.slice(0, count);
}

export default function LewisStructureBuilder() {
  const [moleculeKey, setMoleculeKey] = useState<MoleculeKey>("water");
  const [bondOrders, setBondOrders] = useState<number[]>([1, 1]);
  const [lonePairs, setLonePairs] = useState<Record<AtomId, number>>(createInitialLonePairs());
  const [selectedAtomId, setSelectedAtomId] = useState<AtomId>("central");
  const [showHint, setShowHint] = useState(false);

  const molecule = moleculeDefinitions[moleculeKey];
  const selectedAtom = molecule.atoms.find((atom) => atom.id === selectedAtomId) ?? molecule.atoms[0];

  const atomMap = useMemo(
    () => new Map(molecule.atoms.map((atom) => [atom.id, atom])),
    [molecule.atoms],
  );

  const totalValenceElectrons = molecule.atoms.reduce(
    (total, atom) => total + atom.valenceElectrons,
    0,
  );
  const bondingElectrons = bondOrders.reduce((total, order) => total + order * 2, 0);
  const nonbondingElectrons = molecule.atoms.reduce(
    (total, atom) => total + lonePairs[atom.id] * 2,
    0,
  );
  const electronsUsed = bondingElectrons + nonbondingElectrons;
  const electronsRemaining = totalValenceElectrons - electronsUsed;

  const atomResults = molecule.atoms.map((atom) => {
    const bondOrderSum = molecule.bonds.reduce((total, bond, index) => {
      if (bond.from === atom.id || bond.to === atom.id) return total + bondOrders[index];
      return total;
    }, 0);
    const nonbonding = lonePairs[atom.id] * 2;
    const shellElectrons = nonbonding + bondOrderSum * 2;
    const formalCharge = atom.valenceElectrons - nonbonding - bondOrderSum;

    return {
      atom,
      bondOrderSum,
      shellElectrons,
      formalCharge,
      shellComplete: shellElectrons === atom.targetShell,
    };
  });

  const exactSolution =
    bondOrders.length === molecule.targetBondOrders.length &&
    bondOrders.every((order, index) => order === molecule.targetBondOrders[index]) &&
    atomIds.every((id) => lonePairs[id] === molecule.targetLonePairs[id]);

  const electronCountCorrect = electronsRemaining === 0;
  const allShellsComplete = atomResults.every((result) => result.shellComplete);
  const isComplete = exactSolution && electronCountCorrect && allShellsComplete;

  function reset(nextKey: MoleculeKey = moleculeKey) {
    const next = moleculeDefinitions[nextKey];
    setMoleculeKey(nextKey);
    setBondOrders(next.bonds.map(() => 1));
    setLonePairs(createInitialLonePairs());
    setSelectedAtomId("central");
    setShowHint(false);
  }

  function cycleBond(index: number) {
    setBondOrders((current) =>
      current.map((order, currentIndex) =>
        currentIndex === index ? (order >= 3 ? 1 : order + 1) : order,
      ),
    );
  }

  function changeLonePair(delta: number) {
    setLonePairs((current) => ({
      ...current,
      [selectedAtom.id]: Math.max(0, Math.min(4, current[selectedAtom.id] + delta)),
    }));
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
              Interactive chemistry
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Lewis structure builder
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Click a bond to change its order. Select an atom, then add or remove lone pairs. The electron count, octets, and formal charges update automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          >
            Reset structure
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose a molecule">
          {(Object.keys(moleculeDefinitions) as MoleculeKey[]).map((key) => {
            const definition = moleculeDefinitions[key];
            const active = moleculeKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => reset(key)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
                }`}
              >
                {definition.formula} · {definition.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)]">
        <div className="min-w-0 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-5">
            <ChemistryCanvas
              id="lewis-builder-canvas"
              title={`Lewis structure builder for ${molecule.name}`}
              description="An editable Lewis structure. Bonds can change order and lone pairs can be added to selected atoms."
              viewBox="0 0 860 300"
            >
              {molecule.bonds.map((bond, index) => {
                const from = atomMap.get(bond.from);
                const to = atomMap.get(bond.to);
                if (!from || !to) return null;

                const midpoint = {
                  x: (from.position.x + to.position.x) / 2,
                  y: (from.position.y + to.position.y) / 2,
                };

                return (
                  <g key={`${bond.from}-${bond.to}`}>
                    <Bond
                      from={from.position}
                      to={to.position}
                      order={bondOrders[index] as 1 | 2 | 3}
                    />
                    <circle
                      cx={midpoint.x}
                      cy={midpoint.y}
                      r="27"
                      fill="transparent"
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Change bond order. Current order ${bondOrders[index]}`}
                      onClick={() => cycleBond(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") cycleBond(index);
                      }}
                    />
                    <text
                      x={midpoint.x}
                      y={midpoint.y - 25}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="700"
                      fill="#64748b"
                      pointerEvents="none"
                    >
                      click bond
                    </text>
                  </g>
                );
              })}

              {molecule.atoms.flatMap((atom) =>
                lonePairPositions(atom, lonePairs[atom.id]).map((position, index) => (
                  <LonePair
                    key={`${atom.id}-pair-${index}`}
                    x={position.x}
                    y={position.y}
                    direction={position.direction}
                  />
                )),
              )}

              {molecule.atoms.map((atom) => {
                const result = atomResults.find((entry) => entry.atom.id === atom.id);
                const selected = selectedAtom.id === atom.id;
                return (
                  <g
                    key={atom.id}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${atom.element} atom`}
                    onClick={() => setSelectedAtomId(atom.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") setSelectedAtomId(atom.id);
                    }}
                  >
                    
                    <Atom
  x={atom.position.x}
  y={atom.position.y}
  element={atom.element}
  charge={result?.formalCharge ?? 0}
  selected={selected}
  strokeColour={selected ? "#10b981" : undefined}
  selectedColour="#10b981"
/>
                    
                  </g>
                );
              })}
            </ChemistryCanvas>
          </div>

          <div className={`mt-5 rounded-2xl border p-5 ${
            isComplete
              ? "border-emerald-300 bg-emerald-50"
              : electronsRemaining < 0
                ? "border-rose-300 bg-rose-50"
                : "border-blue-200 bg-blue-50"
          }`}>
            <p className={`font-semibold ${
              isComplete ? "text-emerald-900" : electronsRemaining < 0 ? "text-rose-900" : "text-blue-900"
            }`}>
              {isComplete
                ? `Correct — you built ${molecule.formula}.`
                : electronsRemaining < 0
                  ? "Too many electrons are shown."
                  : molecule.prompt}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {isComplete
                ? "The total valence-electron count is correct, every atom has its expected shell, and the formal charges are minimised."
                : "Use all available valence electrons, then check the duet rule for hydrogen and the octet rule for the other atoms."}
            </p>
          </div>
        </div>

        <aside className="p-5 sm:p-7">
          <h3 className="text-lg font-bold text-slate-950">Builder controls</h3>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Selected atom</p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {selectedAtom.element} · {selectedAtom.id === "central" ? "central atom" : "terminal atom"}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => changeLonePair(-1)}
                disabled={lonePairs[selectedAtom.id] === 0}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Remove pair
              </button>
              <button
                type="button"
                onClick={() => changeLonePair(1)}
                disabled={lonePairs[selectedAtom.id] === 4}
                className="flex-1 rounded-xl bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add lone pair
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Lone pairs on selected atom: <strong>{lonePairs[selectedAtom.id]}</strong>
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <h4 className="font-bold text-slate-950">Electron accounting</h4>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Available</dt>
                <dd className="font-bold text-slate-950">{totalValenceElectrons} e⁻</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Used in bonds</dt>
                <dd className="font-bold text-slate-950">{bondingElectrons} e⁻</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-600">Used in lone pairs</dt>
                <dd className="font-bold text-slate-950">{nonbondingElectrons} e⁻</dd>
              </div>
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between gap-4">
                <dt className="font-semibold text-slate-700">Remaining</dt>
                <dd className={`font-bold ${electronsRemaining === 0 ? "text-emerald-700" : electronsRemaining < 0 ? "text-rose-700" : "text-blue-700"}`}>
                  {electronsRemaining} e⁻
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <h4 className="font-bold text-slate-950">Atom checks</h4>
            <div className="mt-3 space-y-3">
              {atomResults.map((result, index) => (
                <div key={result.atom.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm">
                  <span className="font-semibold text-slate-800">
                    {result.atom.element}{index + 1}
                  </span>
                  <span className={result.shellComplete ? "text-emerald-700" : "text-amber-700"}>
                    {result.shellElectrons}/{result.atom.targetShell} shell e⁻
                  </span>
                  <span className="font-semibold text-violet-700">
                    FC {result.formalCharge > 0 ? `+${result.formalCharge}` : result.formalCharge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            className="mt-5 w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>

          {showHint ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <strong>Hint:</strong> target bond orders are {molecule.targetBondOrders.join(" and ")}. Select each atom to compare its lone pairs with the expected structure.
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
