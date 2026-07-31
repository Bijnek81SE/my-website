"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import Sn1ReactionCanvas, {
  type Sn1PracticeTarget,
} from "./Sn1ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";
import type { MechanismStep } from "./types";

const steps: MechanismStep[] = [
  {
    id: "substrate",
    title: "Identify the tertiary substrate",
    description:
      "tert-Butyl bromide contains a tertiary carbon attached to a good leaving group. The polar C–Br bond can ionise in a polar protic solvent.",
    note: "Tertiary carbocations are stabilised by alkyl substitution and hyperconjugation.",
    highlight: "substrate",
    arrows: [],
  },
  {
    id: "ionisation",
    title: "The leaving group departs",
    description:
      "The C–Br bond breaks heterolytically. Both bonding electrons move onto bromine, producing bromide and a tertiary carbocation.",
    note: "This slow ionisation step controls the SN1 reaction rate.",
    highlight: "leaving-group",
    arrows: [
      {
        id: "departure",
        start: { x: 462, y: 205 },
        control: { x: 495, y: 94 },
        end: { x: 545, y: 172 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A carbocation intermediate forms",
    description:
      "The carbon is now positively charged and trigonal planar. Because it is planar, a nucleophile can attack from either face.",
    note: "SN1 reactions proceed through a discrete carbocation intermediate.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "nucleophile-attack",
    title: "Water attacks the carbocation",
    description:
      "A lone pair on water attacks the electron-deficient carbocation, forming a new C–O bond and an oxonium ion.",
    note: "The nucleophile attacks after the rate-determining ionisation step.",
    highlight: "nucleophile",
    arrows: [
      {
        id: "attack",
        start: { x: 132, y: 174 },
        control: { x: 235, y: 58 },
        end: { x: 338, y: 188 },
        colour: "#2563eb",
        label: "Water lone pair attacks the carbocation",
      },
    ],
  },
  {
    id: "deprotonation",
    title: "Deprotonation gives the alcohol",
    description:
      "A second water molecule removes a proton from the oxonium ion. The O–H bond electrons remain on oxygen, producing tert-butanol.",
    note: "A fast proton-transfer step neutralises the oxonium intermediate.",
    highlight: "deprotonation",
    arrows: [
      {
        id: "base",
        start: { x: 142, y: 252 },
        control: { x: 230, y: 312 },
        end: { x: 328, y: 246 },
        colour: "#2563eb",
        label: "Water removes a proton",
      },
      {
        id: "oh-bond",
        start: { x: 390, y: 228 },
        control: { x: 438, y: 282 },
        end: { x: 470, y: 214 },
        colour: "#7c3aed",
        label: "O H bond electrons return to oxygen",
      },
    ],
  },
  {
    id: "products",
    title: "The substitution product forms",
    description:
      "tert-Butanol is produced together with hydronium and bromide. The nucleophile has replaced the leaving group.",
    note: "Overall: (CH₃)₃CBr + H₂O → (CH₃)₃COH + H₃O⁺ + Br⁻",
    highlight: "product",
    arrows: [],
  },
];

const practiceQuestions: PracticeQuestion<Sn1PracticeTarget>[] = [
  {
    id: "identify-tertiary-substrate",
    title: "Which structure is the tertiary substrate?",
    description:
      "Identify the carbon skeleton containing the carbon bonded to bromine.",
    instruction:
      "Click the tert-butyl portion of the substrate.",
    correctTarget: "tertiary-substrate",
    incorrectFeedback:
      "Not quite. Look for the carbon attached to three methyl groups and the leaving group.",
    correctExplanation:
      "tert-Butyl bromide is a tertiary substrate because the carbon bonded to bromine is attached to three carbon groups.",
  },
  {
    id: "identify-ionising-bond",
    title: "Which bond breaks during ionisation?",
    description:
      "The rate-determining step begins when the leaving-group bond breaks heterolytically.",
    instruction:
      "Click the bond whose electrons move onto bromine.",
    correctTarget: "carbon-bromine-bond",
    incorrectFeedback:
      "Not quite. Select the bond between the tertiary carbon and bromine.",
    correctExplanation:
      "The carbon–bromine bond breaks heterolytically, and both bonding electrons move onto bromine.",
  },
  {
    id: "identify-carbocation",
    title: "Which species is the reaction intermediate?",
    description:
      "SN1 reactions contain a discrete, positively charged intermediate.",
    instruction:
      "Click the carbocation intermediate.",
    correctTarget: "carbocation",
    incorrectFeedback:
      "Not quite. Look for the positively charged carbon species.",
    correctExplanation:
      "The tertiary carbocation is the intermediate formed after bromide leaves.",
  },
  {
    id: "identify-nucleophile",
    title: "Which species attacks the carbocation?",
    description:
      "The nucleophile donates a lone pair to the electron-deficient carbon.",
    instruction:
      "Click the water molecule acting as the nucleophile.",
    correctTarget: "water-nucleophile",
    incorrectFeedback:
      "Not quite. Look for the neutral species with a lone pair that can attack the carbocation.",
    correctExplanation:
      "Water acts as the nucleophile by donating a lone pair to the carbocation.",
  },
  {
    id: "identify-base",
    title: "Which species removes the proton?",
    description:
      "The oxonium intermediate must lose a proton to form the neutral alcohol.",
    instruction:
      "Click the water molecule acting as a base.",
    correctTarget: "base-water",
    incorrectFeedback:
      "Not quite. Select the second water molecule that accepts the proton.",
    correctExplanation:
      "A second water molecule acts as a base and removes a proton from the oxonium intermediate.",
  },
  {
    id: "identify-product",
    title: "Which species is the substitution product?",
    description:
      "Identify the neutral alcohol formed after deprotonation.",
    instruction:
      "Click the tert-butanol product.",
    correctTarget: "alcohol-product",
    incorrectFeedback:
      "Not quite. The substitution product is the alcohol formed when OH replaces bromine.",
    correctExplanation:
      "tert-Butanol is the substitution product because the hydroxyl group has replaced bromine.",
  },
];

export default function Sn1MechanismPlayer() {
  return (
    <MechanismPlayerEngine<MechanismStep, Sn1PracticeTarget>
      title="SN1 substitution"
      description="Follow ionisation, carbocation formation, nucleophile attack, and deprotonation."
      accent="violet"
      steps={steps}
      questions={practiceQuestions}
      playbackInterval={2800}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the substitution product."
            : "You have identified the correct species."
      }
      renderCanvas={({
        step,
        mode,
        animated,
        answered,
        interactive,
        onTargetClick,
      }) => {
        const showAnswer = mode === "practice" && answered;
        const practiceStep: MechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <Sn1ReactionCanvas
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
