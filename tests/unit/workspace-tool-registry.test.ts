import { describe, expect, it } from "vitest";
import { getAvailableWorkspaceTools, getWorkspaceMolecule, validateWorkspaceTools, workspaceTools } from "@/content/workspace";

describe("workspace tool registry", () => {
  it("validates unique plugin metadata", () => { expect(validateWorkspaceTools(workspaceTools)).toEqual([]); });
  it("discovers tools from molecule capabilities", () => {
    const ethanol = getWorkspaceMolecule("ethanol");
    expect(getAvailableWorkspaceTools(ethanol).map((tool) => tool.id)).toContain("spectra");
  });
});
