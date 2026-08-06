import { describe, expect, it } from "vitest";
import { findMechanismByNameOrAlias, getMechanismByRoute, mechanisms, requireMechanism, selectMechanisms } from "@/content/mechanisms";
import { hasMechanismPlayer } from "@/components/chemistry/mechanism";

describe("canonical mechanism registry", () => {
  it("indexes mechanisms by id, route, and alias", () => {
    expect(requireMechanism("sn2").reactionId).toBe("sn2");
    expect(getMechanismByRoute("/lab/hydrohalogenation")?.id).toBe("hydrohalogenation");
    expect(findMechanismByNameOrAlias("peroxide effect")?.id).toBe("radical-hbr");
  });

  it("selects mechanisms by capability and class", () => {
    expect(selectMechanisms({ mechanismClass: "Radical" }).map((item) => item.id)).toEqual(["radical-hbr"]);
    expect(selectMechanisms({ capability: "practice" })).toHaveLength(mechanisms.length);
  });

  it("has a registered player for every mechanism", () => {
    expect(mechanisms.every((mechanism) => hasMechanismPlayer(mechanism.playerId))).toBe(true);
  });
});
