import { describe, expect, it } from "vitest";
import { importContent, importCsvRecords, importJcampDx, importJsonRecords } from "@/lib/content-import";

describe("content import pipeline", () => {
  it("imports JSON and CSV records", () => {
    expect(importJsonRecords('[{"id":"ethanol"}]').records[0]).toMatchObject({ id: "ethanol" });
    expect(importCsvRecords('id,name\nethanol,Ethanol').records[0]).toMatchObject({ id: "ethanol", name: "Ethanol" });
  });
  it("imports basic JCAMP-DX peak data", () => {
    const result = importJcampDx('##TITLE=Ethanol\n##DATATYPE=INFRARED SPECTRUM\n##XYDATA=(X++(Y..Y))\n1000 25\n1100 40\n##END=');
    expect(result.records[0].title).toBe("Ethanol");
    expect(result.records[0].points).toHaveLength(2);
    expect(result.diagnostics.some((item) => item.level === "error")).toBe(false);
  });
  it("dispatches by format", () => { expect(importContent('{"id":"x"}', "json").format).toBe("json"); });
});
