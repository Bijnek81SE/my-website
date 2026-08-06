import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { searchEntries } from "@/components/search/SearchIndex";
import { getKnowledgeNode } from "@/content/knowledge-graph";
import { requireWorkspaceMoleculeView } from "@/content/molecules";
import { getReagent, selectReagents } from "@/content/reagents";

const reagentId = "potassium-tert-butoxide";
const reagentRoute = "/reagents/potassium-tert-butoxide";

describe("canonical reagent extension contract", () => {
  it("publishes a newly registered reagent through generated integrations", () => {
    expect(getReagent(reagentId)?.name).toBe("Potassium tert-butoxide");
    expect(selectReagents({ reactionId: "e2" }).map((reagent) => reagent.id)).toContain(reagentId);
    expect(searchEntries.some((entry) => entry.href === reagentRoute)).toBe(true);
    expect(sitemap().some((entry) => entry.url.endsWith(reagentRoute))).toBe(true);
    expect(getKnowledgeNode(`reagent:${reagentId}`)?.href).toBe(reagentRoute);
  });

  it("discovers workspace reagent links from the reagent record without editing the molecule record", () => {
    const molecule = requireWorkspaceMoleculeView("2-bromopropane");

    expect(molecule.knowledge.reagents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: reagentId,
          href: reagentRoute,
        }),
      ]),
    );
  });
});
