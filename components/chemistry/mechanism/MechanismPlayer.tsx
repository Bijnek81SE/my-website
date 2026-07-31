"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import Sn2ReactionCanvas, {
  type Sn2PracticeTarget,
} from "./Sn2ReactionCanvas";
import { sn2Questions } from "./MechanismQuestions";
import type { MechanismStep } from "./types";

const steps: MechanismStep[] = [
  {
    id: "identify-nucleophile",
    title: "Identify the nucleophile",
    description:
      "Hydroxide carries a negative charge and a lone pair, making it electron-rich and able to attack the electrophilic carbon.",
    note: "The lone pair on oxygen is the electron source.",
    highlight: "nucleophile",
    arrows: [],
  },
  {
    id: "backside-attack",
    title: "Backside attack begins",
    description:
      "The hydroxide lone pair attacks the carbon from the side opposite bromine. The new C–O bond begins forming.",
    note: "SN2 reactions use backside attack at the electrophilic carbon.",
    highlight: "substrate",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 176 },
        control: { x: 230, y: 58 },
        end: { x: 325, y: 190 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
    ],
  },
  {
    id: "bond-breaking",
    title: "The leaving-group bond breaks",
    description:
      "As the C–O bond forms, the C–Br bond electrons move onto bromine. Bond formation and bond breaking occur together.",
    note: "SN2 is concerted: both electron movements happen in one step.",
    highlight: "leaving-group",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 176 },
        control: { x: 230, y: 58 },
        end: { x: 325, y: 190 },
        colour: "#2563eb",
        label: "Hydroxide lone pair attacks the methyl carbon",
      },
      {
        id: "departure",
        start: { x: 420, y: 190 },
        control: { x: 490, y: 96 },
        end: { x: 532, y: 174 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "Products form",
    description:
      "Methanol is formed and bromide leaves with the electron pair from the original C–Br bond.",
    note: "Overall: HO⁻ + CH₃Br → CH₃OH + Br⁻",
    highlight: "product",
    arrows: [],
  },
];

export default function MechanismPlayer() {
  return (
    <MechanismPlayerEngine<MechanismStep, Sn2PracticeTarget>
      title="SN2 substitution"
      description="Follow the electron movement from nucleophile attack to leaving-group departure."
      accent="blue"
      steps={steps}
      questions={sn2Questions}
      playbackInterval={2600}
      getRevealMessage={(_step, index) =>
        index === steps.length - 1
          ? "You have identified the correct product."
          : "The correct electron movement is now shown on the reaction diagram."
      }
      renderCanvas={({
        step,
        index,
        mode,
        animated,
        answered,
        interactive,
        onTargetClick,
      }) => {
        const showAnswer = mode === "practice" && answered;
        const practiceStep: MechanismStep = {
          ...step,
          arrows: showAnswer
            ? index === 0
              ? steps[1].arrows
              : step.arrows
            : mode === "learn"
              ? step.arrows
              : [],
        };

        return (
          <Sn2ReactionCanvas
            step={practiceStep}
            animated={animated}
            interactive={interactive}
            onTargetClick={onTargetClick}
          />
        );
      }}
    />
  );
}
