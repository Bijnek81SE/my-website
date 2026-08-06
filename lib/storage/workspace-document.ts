import { defaultWorkspaceSnapshot, type WorkspaceDocument, type WorkspaceSnapshot } from "@/content/workspace";

export const WORKSPACE_STORAGE_KEY = "organic-chemistry-hub:workspace:v1";

let history: WorkspaceSnapshot[] = [defaultWorkspaceSnapshot];
let hydrated = false;
const listeners = new Set<() => void>();

export function createWorkspaceDocument(snapshot: WorkspaceSnapshot): WorkspaceDocument {
  return { version: 1, ...snapshot, updatedAt: new Date().toISOString() };
}

export function parseWorkspaceDocument(value: string | null): WorkspaceDocument {
  if (!value) return createWorkspaceDocument(defaultWorkspaceSnapshot);

  try {
    const parsed = JSON.parse(value) as Partial<WorkspaceDocument>;
    if (parsed.version !== 1 || typeof parsed.moleculeId !== "string") {
      return createWorkspaceDocument(defaultWorkspaceSnapshot);
    }
    return {
      version: 1,
      moleculeId: parsed.moleculeId,
      activeTab: parsed.activeTab ?? "overview",
      amountMmol: typeof parsed.amountMmol === "number" ? parsed.amountMmol : 10,
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return createWorkspaceDocument(defaultWorkspaceSnapshot);
  }
}

function emit(): void {
  for (const listener of listeners) listener();
}

function persist(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(createWorkspaceDocument(getWorkspaceSnapshot())));
}

export function hydrateWorkspace(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  history = [{ ...parseWorkspaceDocument(window.localStorage.getItem(WORKSPACE_STORAGE_KEY)) }];
  emit();
}

export function subscribeToWorkspace(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWorkspaceSnapshot(): WorkspaceSnapshot {
  return history[history.length - 1];
}

export function getWorkspaceServerSnapshot(): WorkspaceSnapshot {
  return defaultWorkspaceSnapshot;
}

export function canUndoWorkspace(): boolean {
  return history.length > 1;
}

export function updateWorkspace(changes: Partial<WorkspaceSnapshot>): void {
  history = [
    ...history,
    { ...getWorkspaceSnapshot(), ...changes, updatedAt: new Date().toISOString() },
  ].slice(-40);
  persist();
  emit();
}

export function undoWorkspace(): void {
  if (history.length <= 1) return;
  history = history.slice(0, -1);
  persist();
  emit();
}

export function resetWorkspace(): void {
  history = [{ ...defaultWorkspaceSnapshot, updatedAt: new Date().toISOString() }];
  persist();
  emit();
}
