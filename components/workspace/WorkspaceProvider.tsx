"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { WorkspaceTab } from "@/content/workspace";
import {
  canUndoWorkspace,
  getWorkspaceServerSnapshot,
  getWorkspaceSnapshot,
  hydrateWorkspace,
  resetWorkspace,
  subscribeToWorkspace,
  undoWorkspace,
  updateWorkspace,
} from "@/lib/storage/workspace-document";

type WorkspaceContextValue = {
  snapshot: ReturnType<typeof getWorkspaceSnapshot>;
  canUndo: boolean;
  setMolecule: (moleculeId: string) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
  setAmountMmol: (amount: number) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
  undo: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToWorkspace,
    getWorkspaceSnapshot,
    getWorkspaceServerSnapshot,
  );

  useEffect(() => {
    hydrateWorkspace();
  }, []);

  const setMolecule = useCallback((moleculeId: string) => updateWorkspace({ moleculeId, activeTab: "overview" }), []);
  const setActiveTab = useCallback((activeTab: WorkspaceTab) => updateWorkspace({ activeTab }), []);
  const setAmountMmol = useCallback((amountMmol: number) => updateWorkspace({ amountMmol }), []);
  const setNotes = useCallback((notes: string) => updateWorkspace({ notes }), []);

  const value = useMemo<WorkspaceContextValue>(() => ({
    snapshot,
    canUndo: canUndoWorkspace(),
    setMolecule,
    setActiveTab,
    setAmountMmol,
    setNotes,
    reset: resetWorkspace,
    undo: undoWorkspace,
  }), [setActiveTab, setAmountMmol, setMolecule, setNotes, snapshot]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider.");
  return context;
}
