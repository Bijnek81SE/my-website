"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type {
  MoleculeAtom,
  MoleculeBond,
  MoleculeData,
} from "./MoleculeTypes";

type MoleculeContextValue = {
  molecule: MoleculeData;
  atomsById: Map<string, MoleculeAtom>;
  bondsById: Map<string, MoleculeBond>;
  getAtom: (id: string) => MoleculeAtom | undefined;
  getBond: (id: string) => MoleculeBond | undefined;
};

const MoleculeContext = createContext<MoleculeContextValue | null>(null);

type MoleculeProviderProps = {
  molecule: MoleculeData;
  children: ReactNode;
};

export function MoleculeProvider({
  molecule,
  children,
}: MoleculeProviderProps) {
  const value = useMemo<MoleculeContextValue>(() => {
    const atomsById = new Map(
      molecule.atoms.map((atom) => [atom.id, atom]),
    );

    const bondsById = new Map(
      molecule.bonds.map((bond) => [bond.id, bond]),
    );

    return {
      molecule,
      atomsById,
      bondsById,
      getAtom: (id) => atomsById.get(id),
      getBond: (id) => bondsById.get(id),
    };
  }, [molecule]);

  return (
    <MoleculeContext.Provider value={value}>
      {children}
    </MoleculeContext.Provider>
  );
}

export function useMolecule() {
  const context = useContext(MoleculeContext);

  if (!context) {
    throw new Error(
      "useMolecule must be used inside MoleculeProvider.",
    );
  }

  return context;
}