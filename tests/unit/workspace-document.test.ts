import { describe, expect, it } from "vitest";
import { createWorkspaceDocument, parseWorkspaceDocument } from "@/lib/storage/workspace-document";

describe("workspace document storage", () => {
  it("round-trips a valid workspace document", () => {
    const document = createWorkspaceDocument({ moleculeId: "propene", activeTab: "reaction", amountMmol: 25, notes: "test", updatedAt: "" });
    expect(parseWorkspaceDocument(JSON.stringify(document))).toMatchObject({ moleculeId: "propene", activeTab: "reaction", amountMmol: 25, notes: "test" });
  });

  it("falls back safely for invalid JSON", () => {
    expect(parseWorkspaceDocument("{").moleculeId).toBe("ethanol");
  });
});
