import { describe, expect, it } from "vitest";
import {
  createWorkspaceDocument,
  parseWorkspaceDocument,
  parseWorkspaceProjectCollection,
} from "@/lib/storage/workspace-document";

describe("workspace project system", () => {
  it("migrates and normalizes valid project collections", () => {
    const collection = parseWorkspaceProjectCollection(JSON.stringify({
      version: 2,
      activeProjectId: "project-a",
      projects: [
        {
          id: "project-a",
          name: "Carbonyl review",
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
          snapshot: {
            moleculeId: "acetone",
            activeTab: "spectra",
            amountMmol: 12.5,
            notes: "Compare the carbonyl signal.",
            updatedAt: "",
          },
        },
      ],
    }));

    expect(collection.activeProjectId).toBe("project-a");
    expect(collection.projects[0]).toMatchObject({
      name: "Carbonyl review",
      snapshot: {
        moleculeId: "acetone",
        activeTab: "spectra",
        amountMmol: 12.5,
      },
    });
  });

  it("falls back safely when a project collection is malformed", () => {
    const collection = parseWorkspaceProjectCollection("{");
    expect(collection.version).toBe(2);
    expect(collection.projects).toHaveLength(1);
    expect(collection.projects[0].snapshot.moleculeId).toBe("ethanol");
  });

  it("keeps backward-compatible version-one document parsing", () => {
    const document = createWorkspaceDocument({
      moleculeId: "propene",
      activeTab: "reaction",
      amountMmol: 25,
      notes: "test",
      updatedAt: "",
    });
    expect(parseWorkspaceDocument(JSON.stringify(document))).toMatchObject({
      moleculeId: "propene",
      activeTab: "reaction",
      amountMmol: 25,
      notes: "test",
    });
  });
});
