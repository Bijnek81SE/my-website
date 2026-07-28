"use client";

import { useMemo, useState } from "react";
import {
  Molecule,
  type MoleculeAtom,
  type MoleculeBond,
} from "@/components/chemistry/molecules";

const structures: Record<string, { name: string; atoms: MoleculeAtom[]; bonds: MoleculeBond[] }> = {
  water: {
    name: "Water",
    atoms: [
      { id: "o", element: "O", x: 320, y: 150, lonePairs: 2 },
      { id: "h1", element: "H", x: 220, y: 240, radius: 21 },
      { id: "h2", element: "H", x: 420, y: 240, radius: 21 },
    ],
    bonds: [
      { id: "o-h1", from: "o", to: "h1", polarity: "reverse" },
      { id: "o-h2", from: "o", to: "h2", polarity: "forward" },
    ],
  },
  carbonyl: {
    name: "Formaldehyde",
    atoms: [
      { id: "c", element: "C", x: 300, y: 180 },
      { id: "o", element: "O", x: 440, y: 180, lonePairs: 2 },
      { id: "h1", element: "H", x: 190, y: 110, radius: 21 },
      { id: "h2", element: "H", x: 190, y: 250, radius: 21 },
    ],
    bonds: [
      { id: "c-o", from: "c", to: "o", order: 2, polarity: "forward" },
      { id: "c-h1", from: "c", to: "h1" },
      { id: "c-h2", from: "c", to: "h2" },
    ],
  },
  ammonium: {
    name: "Ammonium",
    atoms: [
      { id: "n", element: "N", x: 320, y: 180, charge: 1 },
      { id: "h1", element: "H", x: 320, y: 70, radius: 21 },
      { id: "h2", element: "H", x: 430, y: 180, radius: 21 },
      { id: "h3", element: "H", x: 320, y: 290, radius: 21 },
      { id: "h4", element: "H", x: 210, y: 180, radius: 21 },
    ],
    bonds: [
      { id: "n-h1", from: "n", to: "h1" },
      { id: "n-h2", from: "n", to: "h2" },
      { id: "n-h3", from: "n", to: "h3" },
      { id: "n-h4", from: "n", to: "h4" },
    ],
  },
};

export default function MoleculePlaygroundPage() {
  const [structureKey, setStructureKey] = useState("water");
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [selectedBondId, setSelectedBondId] = useState<string | null>(null);
  const [showBackgrounds, setShowBackgrounds] = useState(true);

  const structure = useMemo(() => structures[structureKey], [structureKey]);
  const selectedAtom = structure.atoms.find((atom) => atom.id === selectedAtomId);

  function changeStructure(key: string) {
    setStructureKey(key);
    setSelectedAtomId(null);
    setSelectedBondId(null);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Chemistry component library</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Molecule engine playground</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Compose reusable Atom and Bond components from a chemistry data model. Select atoms and bonds to test interaction states.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {Object.entries(structures).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => changeStructure(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  structureKey === key
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                }`}
              >
                {value.name}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
              <Molecule
                atoms={structure.atoms}
                bonds={structure.bonds}
                width={640}
                height={360}
                className="h-auto w-full"
                background="#020617"
                bondColour="#cbd5e1"
                selectedColour="#60a5fa"
                selectedAtomId={selectedAtomId}
                selectedBondId={selectedBondId}
                interactiveAtoms
                interactiveBonds
                showAtomBackgrounds={showBackgrounds}
                ariaLabel={`${structure.name} interactive molecule`}
                onAtomClick={(atom) => {
                  setSelectedAtomId((current) => (current === atom.id ? null : atom.id));
                  setSelectedBondId(null);
                }}
                onBondClick={(bond) => {
                  setSelectedBondId((current) => (current === bond.id ? null : bond.id ?? null));
                  setSelectedAtomId(null);
                }}
              />
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="font-bold text-slate-950">Selection</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedAtom
                    ? `${selectedAtom.element} atom (${selectedAtom.id})`
                    : selectedBondId
                      ? `Bond ${selectedBondId}`
                      : "Select an atom or bond in the diagram."}
                </p>
              </div>

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                Atom backgrounds
                <input
                  type="checkbox"
                  checked={showBackgrounds}
                  onChange={(event) => setShowBackgrounds(event.target.checked)}
                  className="h-5 w-5"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setSelectedAtomId(null);
                  setSelectedBondId(null);
                }}
                className="w-full rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Clear selection
              </button>
            </aside>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-100 p-5 font-mono text-sm leading-7 text-slate-800">
            {`<Molecule\n  atoms={molecule.atoms}\n  bonds={molecule.bonds}\n  interactiveAtoms\n  interactiveBonds\n/>`}
          </div>
        </div>
      </div>
    </main>
  );
}
