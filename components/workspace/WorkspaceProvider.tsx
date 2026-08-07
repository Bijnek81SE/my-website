"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { WorkspaceProject, WorkspaceTab } from "@/content/workspace";
import {
  canRedoWorkspace,
  canUndoWorkspace,
  createWorkspaceProject,
  deleteWorkspaceProject,
  exportWorkspaceProject,
  getActiveWorkspaceProject,
  getWorkspaceProjects,
  getWorkspaceRevision,
  getWorkspaceServerRevision,
  getWorkspaceSnapshot,
  hydrateWorkspace,
  importWorkspaceProject,
  redoWorkspace,
  renameWorkspaceProject,
  resetWorkspace,
  selectWorkspaceProject,
  subscribeToWorkspace,
  undoWorkspace,
  updateWorkspace,
} from "@/lib/storage/workspace-document";

type WorkspaceContextValue = {
  snapshot: ReturnType<typeof getWorkspaceSnapshot>;
  projects: readonly WorkspaceProject[];
  activeProject: WorkspaceProject;
  canUndo: boolean;
  canRedo: boolean;
  setMolecule: (moleculeId: string) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
  setAmountMmol: (amount: number) => void;
  setNotes: (notes: string) => void;
  createProject: (name?: string) => void;
  selectProject: (projectId: string) => void;
  renameProject: (projectId: string, name: string) => void;
  deleteProject: (projectId: string) => void;
  exportProject: () => string;
  importProject: (value: string) => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  useSyncExternalStore(
    subscribeToWorkspace,
    getWorkspaceRevision,
    getWorkspaceServerRevision,
  );

  useEffect(() => {
    hydrateWorkspace();
  }, []);

  const snapshot = getWorkspaceSnapshot();
  const projects = getWorkspaceProjects();
  const activeProject = getActiveWorkspaceProject();

  const setMolecule = useCallback(
    (moleculeId: string) => updateWorkspace({ moleculeId, activeTab: "overview" }),
    [],
  );
  const setActiveTab = useCallback(
    (activeTab: WorkspaceTab) => updateWorkspace({ activeTab }),
    [],
  );
  const setAmountMmol = useCallback(
    (amountMmol: number) => updateWorkspace({ amountMmol }),
    [],
  );
  const setNotes = useCallback(
    (notes: string) => updateWorkspace({ notes }),
    [],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      snapshot,
      projects,
      activeProject,
      canUndo: canUndoWorkspace(),
      canRedo: canRedoWorkspace(),
      setMolecule,
      setActiveTab,
      setAmountMmol,
      setNotes,
      createProject: (name) => {
        createWorkspaceProject(name);
      },
      selectProject: selectWorkspaceProject,
      renameProject: renameWorkspaceProject,
      deleteProject: deleteWorkspaceProject,
      exportProject: exportWorkspaceProject,
      importProject: (value) => {
        importWorkspaceProject(value);
      },
      reset: resetWorkspace,
      undo: undoWorkspace,
      redo: redoWorkspace,
    }),
    [activeProject, projects, setActiveTab, setAmountMmol, setMolecule, setNotes, snapshot],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider.");
  }
  return context;
}
