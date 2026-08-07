import { describe, expect, it } from "vitest";
import {
  importCanonicalContent,
  importContent,
  importCsvRecords,
  importJcampDx,
  importJsonRecords,
  importYamlRecords,
} from "@/lib/content-import";

describe("content import pipeline", () => {
  it("imports JSON, YAML, and quoted CSV records", () => {
    expect(importJsonRecords('[{"id":"ethanol"}]').records[0]).toMatchObject({ id: "ethanol" });
    expect(importYamlRecords('- id: ethanol\n  name: Ethanol\n  aliases:\n    - ethyl alcohol').records[0]).toMatchObject({
      id: "ethanol",
      name: "Ethanol",
      aliases: ["ethyl alcohol"],
    });
    expect(importCsvRecords('id,name,summary\nethanol,Ethanol,"line one\nline two"').records[0]).toMatchObject({
      id: "ethanol",
      name: "Ethanol",
      summary: "line one\nline two",
    });
  });

  it("imports packed JCAMP-DX XYDATA with scaling metadata", () => {
    const result = importJcampDx([
      "##TITLE=Ethanol IR",
      "##DATATYPE=INFRARED SPECTRUM",
      "##FIRSTX=1000",
      "##LASTX=1200",
      "##NPOINTS=3",
      "##YFACTOR=0.5",
      "##XYDATA=(X++(Y..Y))",
      "1000 20 40 60",
      "##END=",
    ].join("\n"));
    expect(result.records[0].points).toEqual([
      { x: 1000, y: 10 },
      { x: 1100, y: 20 },
      { x: 1200, y: 30 },
    ]);
    expect(result.diagnostics.some((item) => item.level === "error")).toBe(false);
  });

  it("normalizes and validates a new canonical reagent without modifying other registries", () => {
    const source = JSON.stringify({
      id: "sodium-ethoxide",
      slug: "sodium-ethoxide",
      name: "Sodium ethoxide",
      aliases: ["NaOEt"],
      formula: "C2H5ONa",
      category: "Base",
      summary: "A strong alkoxide base and nucleophile.",
      purpose: "Promotes elimination and nucleophilic substitution depending on substrate and conditions.",
      selectivity: "Secondary substrates under heated basic conditions commonly favor E2.",
      conditions: ["Polar protic solvent or ethanol", "Heat when elimination is desired"],
      limitations: ["Competes with substitution on less hindered substrates"],
      safety: "Corrosive and moisture sensitive; handle using appropriate laboratory controls.",
      alternativeNames: ["sodium ethanolate"],
      reactionIds: ["e2"],
      mechanismIds: ["e2"],
      moleculeIds: ["2-bromopropane"],
      lessonIds: ["hybridization"],
      keywords: ["alkoxide", "base", "E2"],
      capabilities: {
        reference: true,
        workspace: true,
        reactionExplorer: true,
        prediction: true,
        retrosynthesis: true,
      },
    });
    const result = importCanonicalContent(source, {
      entityKind: "reagent",
      format: "json",
    });
    expect(result.valid).toBe(true);
    expect(result.actions).toContainEqual({ entityKind: "reagent", id: "sodium-ethoxide", action: "add" });
    expect(result.records[0]).toMatchObject({ kind: "reagent", id: "sodium-ethoxide" });
  });

  it("turns JCAMP-DX into a mergeable canonical spectroscopy trace", () => {
    const source = [
      "##TITLE=Experimental ethanol IR",
      "##DATATYPE=INFRARED SPECTRUM",
      "##XUNITS=1/CM",
      "##PEAK TABLE=(XY..XY)",
      "1050,80 3350,45",
      "##END=",
    ].join("\n");
    const result = importCanonicalContent(source, {
      entityKind: "spectroscopy",
      format: "jcamp-dx",
      conflictPolicy: "merge",
      jcamp: { moleculeId: "ethanol", traceId: "ethanol-ir-experimental" },
    });
    expect(result.valid).toBe(true);
    expect(result.actions).toContainEqual({ entityKind: "spectroscopy", id: "ethanol", action: "merge" });
    expect(result.records[0]).toMatchObject({ moleculeId: "ethanol" });
    expect((result.records[0] as { rawSpectra?: readonly { id: string }[] }).rawSpectra).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "ethanol-ir-experimental" })]),
    );
  });

  it("reports canonical relationship errors before content is accepted", () => {
    const source = JSON.stringify({
      id: "broken-reagent",
      slug: "broken-reagent",
      name: "Broken reagent",
      aliases: [],
      formula: "X",
      category: "Base",
      summary: "Test record.",
      purpose: "Test record.",
      selectivity: "Test record.",
      conditions: [],
      limitations: [],
      safety: "Test only.",
      alternativeNames: [],
      reactionIds: ["does-not-exist"],
      mechanismIds: [],
      moleculeIds: [],
      lessonIds: [],
      keywords: ["test"],
      capabilities: { reference: true, workspace: false, reactionExplorer: false, prediction: false, retrosynthesis: false },
    });
    const result = importCanonicalContent(source, { entityKind: "reagent", format: "json" });
    expect(result.valid).toBe(false);
    expect(result.diagnostics).toEqual(expect.arrayContaining([expect.objectContaining({ code: "missing-reaction" })]));
  });

  it("dispatches by format", () => {
    expect(importContent('{"id":"x"}', "json").format).toBe("json");
    expect(importContent('id\nvalue', "csv").format).toBe("csv");
    expect(importContent('- id: x', "yaml").format).toBe("yaml");
  });
});
