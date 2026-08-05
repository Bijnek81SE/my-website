import { describe, expect, it } from "vitest";
import {
  createMechanismTimeline,
  getMechanismTimelineSnapshot,
  moveMechanismTimelineNext,
  moveMechanismTimelinePrevious,
} from "@/components/chemistry/mechanism/MechanismTimeline";

describe("MechanismTimeline", () => {
  it("moves through during and after states", () => {
    const start = createMechanismTimeline({ stepCount: 2 });
    const afterFirst = moveMechanismTimelineNext(start, 2);
    const second = moveMechanismTimelineNext(afterFirst, 2);
    expect(afterFirst).toMatchObject({ stepIndex: 0, phase: "after" });
    expect(second).toMatchObject({ stepIndex: 1, phase: "during" });
    expect(moveMechanismTimelinePrevious(second, 2)).toMatchObject({ stepIndex: 0, phase: "after" });
  });

  it("stops playback at the end", () => {
    let state = createMechanismTimeline({ stepCount: 1, playing: true });
    state = moveMechanismTimelineNext(state, 1);
    state = moveMechanismTimelineNext(state, 1);
    expect(getMechanismTimelineSnapshot(state, 1).isAtEnd).toBe(true);
    expect(state.playing).toBe(false);
  });
});
