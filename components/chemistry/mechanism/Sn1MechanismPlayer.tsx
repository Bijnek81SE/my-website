"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import Sn1ReactionCanvas, {
  type Sn1PracticeTarget,
} from "./Sn1ReactionCanvas";
import { sn1Questions } from "./MechanismQuestions";
import { sn1ReactionData } from "./MechanismReactionData";
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
        start: { x: 444, y: 194 },
        control: { x: 478, y: 128 },
        end: { x: 499, y: 181 },
        colour: "#dc2626",
        label:
          "Carbon bromine bond electrons move to bromine",
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
        start: { x: 132, y: 154 },
        control: { x: 240, y: 92 },
        end: { x: 342, y: 190 },
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
    start: { x: 128, y: 238 },
    control: { x: 300, y: 262 },
    end: { x: 481, y: 161 },
    colour: "#2563eb",
    label: "Water removes a proton",
  },
  {
    id: "oh-bond",
    start: { x: 469, y: 183 },
    control: { x: 486, y: 207 },
    end: { x: 451, y: 204 },
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
    <MechanismPlayerEngine<
      MechanismStep,
      Sn1PracticeTarget
    >
      title="SN1 substitution"
      description="Follow ionisation, carbocation formation, nucleophile attack, and deprotonation."
      accent="violet"
      steps={steps}
      questions={sn1Questions}
      validation={{
        id: "sn1",
        reactionData: sn1ReactionData,
        getSceneForStep: (step) =>
          step.highlight === "product"
            ? "products"
            : step.highlight === "deprotonation"
              ? "deprotonation"
              : step.highlight === "nucleophile"
                ? "nucleophile"
                : step.highlight === "carbocation"
                  ? "carbocation"
                  : "substrate",
      }}
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
        const showAnswer =
          mode === "practice" && answered;

        const practiceStep: MechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
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