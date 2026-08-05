"use client";

import { useMemo, useState } from "react";
import { LabWorkspaceShell } from "@/components/lab";
import {
  Molecule,
  type MoleculeAtom,
  type MoleculeBond,
  type MoleculeData,
} from "@/components/chemistry/molecules";

type Structure = {
  name: string;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
};

const structures: Record<string, Structure> = {
  water: {
    name: "Water",
    atoms: [
      {
        id: "o",
        element: "O",
        position: { x: 320, y: 145 },
        lonePairs: 2,
      },
      {
        id: "h1",
        element: "H",
        position: { x: 225, y: 240 },
        radius: 21,
      },
      {
        id: "h2",
        element: "H",
        position: { x: 415, y: 240 },
        radius: 21,
      },
    ],
    bonds: [
      {
        id: "o-h1",
        from: "o",
        to: "h1",
      },
      {
        id: "o-h2",
        from: "o",
        to: "h2",
      },
    ],
  },

  carbonyl: {
    name: "Formaldehyde",
    atoms: [
      {
        id: "c",
        element: "C",
        position: { x: 300, y: 180 },
      },
      {
        id: "o",
        element: "O",
        position: { x: 445, y: 180 },
        lonePairs: 2,
      },
      {
        id: "h1",
        element: "H",
        position: { x: 185, y: 110 },
        radius: 21,
      },
      {
        id: "h2",
        element: "H",
        position: { x: 185, y: 250 },
        radius: 21,
      },
    ],
    bonds: [
      {
        id: "c-o",
        from: "c",
        to: "o",
        order: 2,
      },
      {
        id: "c-h1",
        from: "c",
        to: "h1",
      },
      {
        id: "c-h2",
        from: "c",
        to: "h2",
      },
    ],
  },

  ammonium: {
    name: "Ammonium",
    atoms: [
      {
        id: "n",
        element: "N",
        position: { x: 320, y: 180 },
        charge: 1,
      },
      {
        id: "h1",
        element: "H",
        position: { x: 320, y: 70 },
        radius: 21,
      },
      {
        id: "h2",
        element: "H",
        position: { x: 430, y: 180 },
        radius: 21,
      },
      {
        id: "h3",
        element: "H",
        position: { x: 320, y: 290 },
        radius: 21,
      },
      {
        id: "h4",
        element: "H",
        position: { x: 210, y: 180 },
        radius: 21,
      },
    ],
    bonds: [
      {
        id: "n-h1",
        from: "n",
        to: "h1",
      },
      {
        id: "n-h2",
        from: "n",
        to: "h2",
      },
      {
        id: "n-h3",
        from: "n",
        to: "h3",
      },
      {
        id: "n-h4",
        from: "n",
        to: "h4",
      },
    ],
  },
};

export default function MoleculePlaygroundPage() {
  const [structureKey, setStructureKey] = useState("water");
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);
  const [selectedBondId, setSelectedBondId] = useState<string | null>(null);

  const structure = useMemo(
    () => structures[structureKey],
    [structureKey],
  );

  const molecule = useMemo<MoleculeData>(
    () => ({
      id: structureKey,
      name: structure.name,
      atoms: structure.atoms,
      bonds: structure.bonds,
    }),
    [structure, structureKey],
  );

  const selectedAtom = structure.atoms.find(
    (atom) => atom.id === selectedAtomId,
  );

  const selectedBond = structure.bonds.find(
    (bond) => bond.id === selectedBondId,
  );

  function changeStructure(key: string) {
    setStructureKey(key);
    setSelectedAtomId(null);
    setSelectedBondId(null);
  }

  return (
    <LabWorkspaceShell accent="blue" maxWidth="6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Chemistry component library
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Molecule engine playground
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Render atoms and bonds from a reusable chemistry data model.
            Select atoms and bonds to inspect the engine&apos;s interaction
            states.
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
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <Molecule
                molecule={molecule}
                width={640}
                height={360}
                className="h-auto w-full"
                interactive
                selectedAtomId={selectedAtomId}
                selectedBondId={selectedBondId}
                onAtomSelect={(atom) => {
                  setSelectedAtomId((current) =>
                    current === atom.id ? null : atom.id,
                  );
                  setSelectedBondId(null);
                }}
                onBondSelect={(bond) => {
                  setSelectedBondId((current) =>
                    current === bond.id ? null : bond.id,
                  );
                  setSelectedAtomId(null);
                }}
              />
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="font-bold text-slate-950">
                  Selection
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedAtom
                    ? `${selectedAtom.label ?? selectedAtom.element} atom (${selectedAtom.id})`
                    : selectedBond
                      ? `Bond ${selectedBond.id}: ${selectedBond.from} → ${selectedBond.to}`
                      : "Select an atom or bond in the diagram."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="font-bold text-slate-950">
                  Current structure
                </h2>

                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between gap-4">
                    <dt>Atoms</dt>
                    <dd className="font-semibold text-slate-950">
                      {structure.atoms.length}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt>Bonds</dt>
                    <dd className="font-semibold text-slate-950">
                      {structure.bonds.length}
                    </dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt>Name</dt>
                    <dd className="font-semibold text-slate-950">
                      {structure.name}
                    </dd>
                  </div>
                </dl>
              </div>

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

          <div className="mt-8 overflow-x-auto rounded-3xl bg-slate-100 p-5 font-mono text-sm leading-7 text-slate-800">
            <pre>{`<Molecule
  molecule={molecule}
  interactive
  selectedAtomId={selectedAtomId}
  selectedBondId={selectedBondId}
  onAtomSelect={handleAtomSelect}
  onBondSelect={handleBondSelect}
/>`}</pre>
          </div>
        </div>
    </LabWorkspaceShell>
  );
}