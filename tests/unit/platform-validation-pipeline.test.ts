import { describe, expect, it } from "vitest";
import { validateCanonicalPlatform } from "@/content/validation";

describe("canonical platform validation pipeline", () => {
  it("validates all registered domains together", () => {
    const report = validateCanonicalPlatform();
    expect(report.issues).toEqual([]);
    expect(report.valid).toBe(true);
  });
});
