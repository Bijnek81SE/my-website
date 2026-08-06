import { describe, expect, it } from "vitest";
import { getLessonBySlug, getLessonsByCapability, lessons, selectLessons, validateLessons } from "@/content/lessons";

describe("canonical lesson registry", () => {
  it("validates and derives navigation", () => {
    expect(validateLessons(lessons)).toEqual([]);
    expect(getLessonBySlug("atomic-structure").previous?.title).toBe("What Is Organic Chemistry?");
    expect(getLessonBySlug("atomic-structure").next?.title).toBe("Chemical Bonding");
  });
  it("selects lessons by chemistry relationship and capability", () => {
    expect(selectLessons({ moleculeId: "propene" }).map((lesson) => lesson.id)).toContain("hybridization");
    expect(getLessonsByCapability("searchable")).toHaveLength(lessons.length);
  });
});
