import { describe, expect, it } from "vitest";
import {
  compileE2Mechanism,
  compileSn2Mechanism,
} from "@/content/mechanisms/authoring";

function expectWithin(
  actual: number,
  expected: number,
  tolerance = 1,
) {
  expect(
    Math.abs(actual - expected),
  ).toBeLessThanOrEqual(tolerance);
}

describe(
  "mechanism authoring semantic geometry",
  () => {
    it(
      "compiles SN2 arrows from semantic anchors close to the trusted reference geometry",
      () => {
        const mechanism =
          compileSn2Mechanism();

        const attack =
          mechanism.steps[1].arrows[0];

        const departure =
          mechanism.steps[2].arrows[1];

        expect(attack).toBeDefined();
        expect(departure).toBeDefined();

        if (!attack || !departure) {
          return;
        }

        /*
         * Trusted Sn2ReactionCanvas geometry:
         *
         * attack:
         *   (180,160) -> (373,187)
         *
         * departure:
         *   (440,188) -> (504,174)
         *
         * Semantic geometry is allowed up to 1 px
         * of numerical variation because coordinates
         * are derived from scaled molecule anchors.
         */

        expectWithin(
          attack.start.x,
          180,
        );

        expectWithin(
          attack.start.y,
          160,
        );

        expectWithin(
          attack.end.x,
          373,
        );

        expectWithin(
          attack.end.y,
          187,
        );

        expectWithin(
          departure.start.x,
          440,
        );

        expectWithin(
          departure.start.y,
          188,
        );

        expectWithin(
          departure.end.x,
          504,
        );

        expectWithin(
          departure.end.y,
          174,
        );

        const contract =
          mechanism.geometryContracts[0];

        expect(contract).toBeDefined();

        if (
          !contract ||
          contract.type !==
            "backside-attack"
        ) {
          return;
        }

        expect(contract.type).toBe(
          "backside-attack",
        );

        expect(
          contract.expectedDegrees,
        ).toBe(180);

        expect(
          contract.toleranceDegrees,
        ).toBeLessThanOrEqual(3);
      },
    );

    it(
      "compiles E2 arrows from molecular atom and bond anchors close to the trusted reference geometry",
      () => {
        const mechanism =
          compileE2Mechanism();

        const [
          baseToHydrogen,
          chToPi,
          cbrToBr,
        ] =
          mechanism.steps[1].arrows;

        expect(
          baseToHydrogen,
        ).toBeDefined();

        expect(chToPi).toBeDefined();
        expect(cbrToBr).toBeDefined();

        if (
          !baseToHydrogen ||
          !chToPi ||
          !cbrToBr
        ) {
          return;
        }

        /*
         * Trusted E2ReactionCanvas geometry:
         *
         * base -> H:
         *   (129,155) -> (326,104)
         *
         * C-H -> C-C:
         *   (342,145) -> (400,190)
         *
         * C-Br -> Br:
         *   (465,250) -> (480,289)
         *
         * Up to 1 px of numerical variation is
         * acceptable because these coordinates are
         * calculated from semantic atom/bond anchors.
         */

        expectWithin(
          baseToHydrogen.start.x,
          129,
        );

        expectWithin(
          baseToHydrogen.start.y,
          155,
        );

        expectWithin(
          baseToHydrogen.end.x,
          326,
        );

        expectWithin(
          baseToHydrogen.end.y,
          104,
        );

        expectWithin(
          chToPi.start.x,
          342,
        );

        expectWithin(
          chToPi.start.y,
          145,
        );

        expectWithin(
          chToPi.end.x,
          400,
        );

        expectWithin(
          chToPi.end.y,
          190,
        );

        expectWithin(
          cbrToBr.start.x,
          465,
        );

        expectWithin(
          cbrToBr.start.y,
          250,
        );

        expectWithin(
          cbrToBr.end.x,
          480,
        );

        expectWithin(
          cbrToBr.end.y,
          289,
        );

        const contract =
          mechanism.geometryContracts[0];

        expect(contract).toBeDefined();

        if (
          !contract ||
          contract.type !==
            "anti-periplanar"
        ) {
          return;
        }

        expect(contract.type).toBe(
          "anti-periplanar",
        );

        expect(
          contract.expectedDegrees,
        ).toBe(180);

        expect(
          contract.toleranceDegrees,
        ).toBeLessThanOrEqual(8);
      },
    );
  },
);