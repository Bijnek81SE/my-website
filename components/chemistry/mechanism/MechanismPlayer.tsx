"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import Sn2ReactionCanvas, {
  type Sn2PracticeTarget,
} from "./Sn2ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";
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

const practiceQuestions: PracticeQuestion<Sn2PracticeTarget>[] = [
  {
    id: "identify-nucleophile",
    title: "Which species is the nucleophile?",
    description:
      "Identify the electron-rich species that donates an electron pair to the electrophilic carbon.",
    instruction:
      "Click the atom that belongs to the nucleophile.",
    correctTarget: "oxygen",
    incorrectFeedback:
      "Not quite. The nucleophile must be able to donate an electron pair.",
    correctExplanation:
      "Hydroxide is the nucleophile because oxygen donates a lone pair to the electrophilic carbon.",
  },
  {
    id: "identify-arrow-source",
    title: "Where does the first curved arrow start?",
    description:
      "Curved arrows begin at electrons, such as a lone pair or a bond.",
    instruction:
      "Click the atom whose lone pair supplies the electrons.",
    correctTarget: "oxygen",
    incorrectFeedback:
      "Not quite. Look for the atom that owns the donating lone pair.",
    correctExplanation:
      "The first curved arrow starts at the oxygen lone pair. Those electrons form the new carbon–oxygen bond.",
  },
  {
    id: "identify-breaking-bond",
    title: "Which bond breaks during the reaction?",
    description:
      "SN2 bond formation and bond breaking happen together in one concerted step.",
    instruction:
      "Click the bond whose electrons move onto the leaving group.",
    correctTarget: "carbon-bromine-bond",
    incorrectFeedback:
      "Not quite. Identify the bond connecting the electrophilic carbon to the leaving group.",
    correctExplanation:
      "The carbon–bromine bond breaks, and its electron pair moves onto bromine.",
  },
  {
    id: "identify-leaving-group-product",
    title: "Which product is the leaving group?",
    description:
      "The leaving group departs with the electron pair from its original bond.",
    instruction:
      "Click the leaving-group product.",
    correctTarget: "product-bromide",
    incorrectFeedback:
      "Not quite. The leaving group is the species that departed from carbon with the bonding electron pair.",
    correctExplanation:
      "Bromide is the leaving-group product. It leaves with the electron pair from the original C–Br bond.",
  },
];

export default function MechanismPlayer() {
  return (
    <MechanismPlayerEngine<MechanismStep, Sn2PracticeTarget>
      title="SN2 substitution"
      description="Follow the electron movement from nucleophile attack to leaving-group departure."
      accent="blue"
      steps={steps}
      questions={practiceQuestions}
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
