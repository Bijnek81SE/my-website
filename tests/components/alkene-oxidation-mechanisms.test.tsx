import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AntiDihydroxylationMechanismPlayer,
  EpoxidationMechanismPlayer,
  OxidativeCleavageMechanismPlayer,
  OzonolysisMechanismPlayer,
  SynDihydroxylationMechanismPlayer,
} from "@/components/chemistry/mechanism/AlkeneOxidationMechanismPlayer";

const players = [
  ["Epoxidation", EpoxidationMechanismPlayer, /Epoxidation graphical mechanism/i],
  ["Syn dihydroxylation", SynDihydroxylationMechanismPlayer, /Syn dihydroxylation graphical mechanism/i],
  ["Anti dihydroxylation", AntiDihydroxylationMechanismPlayer, /Anti dihydroxylation graphical mechanism/i],
  ["Ozonolysis", OzonolysisMechanismPlayer, /Ozonolysis graphical mechanism/i],
  ["Oxidative cleavage", OxidativeCleavageMechanismPlayer, /Oxidative cleavage graphical mechanism/i],
] as const;

describe("alkene oxidation mechanism graphics", () => {
  for (const [name, Player, graphicName] of players) {
    it(`renders and advances the ${name} graphical mechanism`, () => {
      render(<Player />);

      expect(screen.getByRole("img", { name: graphicName })).toBeVisible();
      expect(screen.getByText(/Graphical electron-flow view:/i)).toBeVisible();

      const next = screen.getByRole("button", { name: "Next step" });
      fireEvent.click(next);

      expect(screen.getByRole("img", { name: graphicName })).toBeVisible();
    });
  }
});
