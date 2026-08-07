import {
  defaultWorkspaceSnapshot,
  getWorkspaceMolecule,
  workspaceTools,
  type WorkspaceDocument,
  type WorkspaceProject,
  type WorkspaceProjectCollection,
  type WorkspaceProjectExport,
  type WorkspaceSnapshot,
} from "@/content/workspace";

export const WORKSPACE_STORAGE_KEY = "organic-chemistry-hub:workspace:v2";
export const LEGACY_WORKSPACE_STORAGE_KEY = "organic-chemistry-hub:workspace:v1";
const MAX_HISTORY_ENTRIES = 80;

type ProjectHistory = {
  past: readonly WorkspaceSnapshot[];
  present: WorkspaceSnapshot;
  future: readonly WorkspaceSnapshot[];
};

type WorkspaceStore = {
  activeProjectId: string;
  projects: readonly WorkspaceProject[];
  histories: Readonly<Record<string, ProjectHistory>>;
};

const listeners = new Set<() => void>();
let hydrated = false;
let idCounter = 0;
let revision = 0;

function now(): string {
  return new Date().toISOString();
}

function createId(): string {
  idCounter += 1;
  return `workspace-${Date.now().toString(36)}-${idCounter.toString(36)}`;
}

function normalizeSnapshot(value: Partial<WorkspaceSnapshot> | undefined): WorkspaceSnapshot {
  const moleculeId = typeof value?.moleculeId === "string"
    ? getWorkspaceMolecule(value.moleculeId).id
    : defaultWorkspaceSnapshot.moleculeId;
  const activeTab = typeof value?.activeTab === "string" && workspaceTools.some((tool) => tool.id === value.activeTab)
    ? value.activeTab
    : "overview";

  return {
    moleculeId,
    activeTab,
    amountMmol: typeof value?.amountMmol === "number" && Number.isFinite(value.amountMmol)
      ? Math.max(0, value.amountMmol)
      : defaultWorkspaceSnapshot.amountMmol,
    notes: typeof value?.notes === "string" ? value.notes : "",
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : "",
  };
}

function createProject(name: string, snapshot = defaultWorkspaceSnapshot): WorkspaceProject {
  const timestamp = now();
  return {
    id: createId(),
    name: name.trim() || "Untitled project",
    createdAt: timestamp,
    updatedAt: timestamp,
    snapshot: normalizeSnapshot({ ...snapshot, updatedAt: timestamp }),
  };
}

function historyFor(snapshot: WorkspaceSnapshot): ProjectHistory {
  return { past: [], present: snapshot, future: [] };
}

const initialProject = createProject("My chemistry project");
let store: WorkspaceStore = {
  activeProjectId: initialProject.id,
  projects: [initialProject],
  histories: { [initialProject.id]: historyFor(initialProject.snapshot) },
};

function emit(): void {
  for (const listener of listeners) listener();
}

function collectionFromStore(): WorkspaceProjectCollection {
  return {
    version: 2,
    activeProjectId: store.activeProjectId,
    projects: store.projects,
  };
}

function persist(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(collectionFromStore()));
}

function setStore(next: WorkspaceStore, shouldPersist = true): void {
  store = next;
  revision += 1;
  if (shouldPersist) persist();
  emit();
}

function parseProject(value: unknown): WorkspaceProject | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<WorkspaceProject>;
  if (typeof candidate.id !== "string" || typeof candidate.name !== "string") return null;
  const timestamp = now();
  return {
    id: candidate.id,
    name: candidate.name.trim() || "Untitled project",
    createdAt: typeof candidate.createdAt === "string" ? candidate.createdAt : timestamp,
    updatedAt: typeof candidate.updatedAt === "string" ? candidate.updatedAt : timestamp,
    snapshot: normalizeSnapshot(candidate.snapshot),
  };
}

export function createWorkspaceDocument(snapshot: WorkspaceSnapshot): WorkspaceDocument {
  return { version: 1, ...normalizeSnapshot(snapshot), updatedAt: now() };
}

export function parseWorkspaceDocument(value: string | null): WorkspaceDocument {
  if (!value) return createWorkspaceDocument(defaultWorkspaceSnapshot);
  try {
    const parsed = JSON.parse(value) as Partial<WorkspaceDocument>;
    if (parsed.version !== 1) return createWorkspaceDocument(defaultWorkspaceSnapshot);
    return { version: 1, ...normalizeSnapshot(parsed) };
  } catch {
    return createWorkspaceDocument(defaultWorkspaceSnapshot);
  }
}

export function parseWorkspaceProjectCollection(value: string | null): WorkspaceProjectCollection {
  if (!value) {
    const project = createProject("My chemistry project");
    return { version: 2, activeProjectId: project.id, projects: [project] };
  }

  try {
    const parsed = JSON.parse(value) as Partial<WorkspaceProjectCollection>;
    if (parsed.version !== 2 || !Array.isArray(parsed.projects)) throw new Error("Invalid version");
    const projects = parsed.projects.map(parseProject).filter((project): project is WorkspaceProject => Boolean(project));
    if (projects.length === 0) throw new Error("No valid projects");
    const activeProjectId = projects.some((project) => project.id === parsed.activeProjectId)
      ? parsed.activeProjectId as string
      : projects[0].id;
    return { version: 2, activeProjectId, projects };
  } catch {
    const project = createProject("My chemistry project");
    return { version: 2, activeProjectId: project.id, projects: [project] };
  }
}

function migrateLegacyDocument(value: string | null): WorkspaceProjectCollection | null {
  if (!value) return null;
  const document = parseWorkspaceDocument(value);
  const project = createProject("Imported workspace", document);
  return { version: 2, activeProjectId: project.id, projects: [project] };
}

export function hydrateWorkspace(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const stored = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
  const collection = stored
    ? parseWorkspaceProjectCollection(stored)
    : migrateLegacyDocument(window.localStorage.getItem(LEGACY_WORKSPACE_STORAGE_KEY)) ?? parseWorkspaceProjectCollection(null);
  const histories = Object.fromEntries(collection.projects.map((project) => [project.id, historyFor(project.snapshot)]));
  setStore({ activeProjectId: collection.activeProjectId, projects: collection.projects, histories }, false);
  persist();
}

export function subscribeToWorkspace(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWorkspaceRevision(): number {
  return revision;
}

export function getWorkspaceServerRevision(): number {
  return 0;
}

export function getWorkspaceProjects(): readonly WorkspaceProject[] {
  return store.projects;
}

export function getActiveWorkspaceProject(): WorkspaceProject {
  return store.projects.find((project) => project.id === store.activeProjectId) ?? store.projects[0];
}

export function getWorkspaceSnapshot(): WorkspaceSnapshot {
  return store.histories[store.activeProjectId]?.present ?? getActiveWorkspaceProject().snapshot;
}

export function getWorkspaceServerSnapshot(): WorkspaceSnapshot {
  return defaultWorkspaceSnapshot;
}

export function canUndoWorkspace(): boolean {
  return (store.histories[store.activeProjectId]?.past.length ?? 0) > 0;
}

export function canRedoWorkspace(): boolean {
  return (store.histories[store.activeProjectId]?.future.length ?? 0) > 0;
}

export function updateWorkspace(changes: Partial<WorkspaceSnapshot>): void {
  const active = getActiveWorkspaceProject();
  const history = store.histories[active.id] ?? historyFor(active.snapshot);
  const nextSnapshot = normalizeSnapshot({ ...history.present, ...changes, updatedAt: now() });
  const nextHistory: ProjectHistory = {
    past: [...history.past, history.present].slice(-MAX_HISTORY_ENTRIES),
    present: nextSnapshot,
    future: [],
  };
  const projects = store.projects.map((project) => project.id === active.id
    ? { ...project, snapshot: nextSnapshot, updatedAt: nextSnapshot.updatedAt }
    : project);
  setStore({ ...store, projects, histories: { ...store.histories, [active.id]: nextHistory } });
}

export function undoWorkspace(): void {
  const active = getActiveWorkspaceProject();
  const history = store.histories[active.id];
  if (!history || history.past.length === 0) return;
  const present = history.past[history.past.length - 1];
  const nextHistory: ProjectHistory = {
    past: history.past.slice(0, -1),
    present,
    future: [history.present, ...history.future].slice(0, MAX_HISTORY_ENTRIES),
  };
  const projects = store.projects.map((project) => project.id === active.id ? { ...project, snapshot: present, updatedAt: now() } : project);
  setStore({ ...store, projects, histories: { ...store.histories, [active.id]: nextHistory } });
}

export function redoWorkspace(): void {
  const active = getActiveWorkspaceProject();
  const history = store.histories[active.id];
  if (!history || history.future.length === 0) return;
  const present = history.future[0];
  const nextHistory: ProjectHistory = {
    past: [...history.past, history.present].slice(-MAX_HISTORY_ENTRIES),
    present,
    future: history.future.slice(1),
  };
  const projects = store.projects.map((project) => project.id === active.id ? { ...project, snapshot: present, updatedAt: now() } : project);
  setStore({ ...store, projects, histories: { ...store.histories, [active.id]: nextHistory } });
}

export function resetWorkspace(): void {
  updateWorkspace({ ...defaultWorkspaceSnapshot, updatedAt: now() });
}

export function createWorkspaceProject(name = "Untitled project"): WorkspaceProject {
  const project = createProject(name);
  setStore({
    activeProjectId: project.id,
    projects: [...store.projects, project],
    histories: { ...store.histories, [project.id]: historyFor(project.snapshot) },
  });
  return project;
}

export function selectWorkspaceProject(projectId: string): void {
  if (!store.projects.some((project) => project.id === projectId) || projectId === store.activeProjectId) return;
  setStore({ ...store, activeProjectId: projectId });
}

export function renameWorkspaceProject(projectId: string, name: string): void {
  const normalized = name.trim();
  if (!normalized) return;
  const projects = store.projects.map((project) => project.id === projectId ? { ...project, name: normalized, updatedAt: now() } : project);
  setStore({ ...store, projects });
}

export function deleteWorkspaceProject(projectId: string): void {
  if (store.projects.length <= 1) return;
  const projects = store.projects.filter((project) => project.id !== projectId);
  if (projects.length === store.projects.length) return;
  const histories = Object.fromEntries(
    Object.entries(store.histories).filter(([id]) => id !== projectId),
  );
  const activeProjectId = store.activeProjectId === projectId ? projects[0].id : store.activeProjectId;
  setStore({ activeProjectId, projects, histories });
}

export function exportWorkspaceProject(projectId = store.activeProjectId): string {
  const project = store.projects.find((candidate) => candidate.id === projectId);
  if (!project) throw new Error(`Unknown workspace project id: ${projectId}`);
  const payload: WorkspaceProjectExport = {
    format: "organic-chemistry-hub-workspace",
    version: 1,
    exportedAt: now(),
    project,
  };
  return JSON.stringify(payload, null, 2);
}

export function importWorkspaceProject(value: string): WorkspaceProject {
  const parsed = JSON.parse(value) as Partial<WorkspaceProjectExport>;
  if (parsed.format !== "organic-chemistry-hub-workspace" || parsed.version !== 1) {
    throw new Error("Unsupported Workspace project file.");
  }
  const imported = parseProject(parsed.project);
  if (!imported) throw new Error("The Workspace project file is invalid.");
  const project: WorkspaceProject = {
    ...imported,
    id: createId(),
    name: `${imported.name} (imported)`,
    createdAt: now(),
    updatedAt: now(),
  };
  setStore({
    activeProjectId: project.id,
    projects: [...store.projects, project],
    histories: { ...store.histories, [project.id]: historyFor(project.snapshot) },
  });
  return project;
}
