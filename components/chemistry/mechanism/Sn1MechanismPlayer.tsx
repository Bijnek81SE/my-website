"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import Sn1ReactionCanvas, {
  type Sn1PracticeTarget,
} from "./Sn1ReactionCanvas";
import { sn1Questions } from "./MechanismQuestions";
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

export default function Sn1MechanismPlayer() {
  return (
    <MechanismPlayerEngine<MechanismStep, Sn1PracticeTarget>
      title="SN1 substitution"
      description="Follow ionisation, carbocation formation, nucleophile attack, and deprotonation."
      accent="violet"
      steps={steps}
      questions={sn1Questions}
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
