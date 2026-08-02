"use client";

import HalogenationReactionCanvas, {
  type HalogenationMechanismStep,
  type HalogenationPracticeTarget,
} from "./HalogenationReactionCanvas";
import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { halogenationQuestions } from "./MechanismQuestions";
import { halogenationReactionData } from "./MechanismReactionData";

const steps: HalogenationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene π bond is the nucleophile",
    description:
      "The electron-rich π bond of cyclohexene polarises bromine and attacks the electrophilic end of Br₂.",
    note: "Halogenation begins when the alkene π bond donates electrons to Br₂.",
    highlight: "alkene",
    arrows: [],
  },
  {
    id: "bromonium-formation",
    title: "A cyclic bromonium ion forms",
    description:
      "The π bond attacks one bromine, the Br–Br bond breaks, and the attached bromine bridges both alkene carbons.",
    note: "No free carbocation forms; the positive charge is held in a three-membered bromonium ion.",
    highlight: "bromonium-formation",
    arrows: [
      {
        id: "pi-to-bromine",
        start: { x: 338, y: 196 },
        control: { x: 410, y: 92 },
        end: { x: 500, y: 184 },
        colour: "#7c3aed",
        label: "The alkene pi electrons attack bromine",
      },
      {
        id: "brbr-to-bromine",
        start: { x: 548, y: 198 },
        control: { x: 600, y: 112 },
        end: { x: 640, y: 184 },
        colour: "#dc2626",
        label: "The bromine bromine bond electrons move to bromide",
      },
    ],
  },
  {
    id: "bromonium",
    title: "The bromonium ion blocks one face",
    description:
      "The bridging bromine is bonded to both carbons. This prevents bromide from attacking from the same face.",
    note: "The cyclic bromonium ion explains why halogenation gives anti addition.",
    highlight: "bromonium",
    arrows: [],
  },
  {
    id: "bromide-attack",
    title: "Bromide opens the bromonium ion",
    description:
      "Bromide attacks one carbon from the opposite face and breaks the carbon–bromine bridge bond.",
    note: "Backside attack opens the bromonium ion and places the two bromines on opposite faces.",
    highlight: "bromide-attack",
    arrows: [
      {
        id: "bromide-to-carbon",
        start: { x: 545, y: 190 },
        control: { x: 430, y: 300 },
        end: { x: 300, y: 215 },
        colour: "#dc2626",
        label: "Bromide attacks from the opposite face",
      },
      {
        id: "bridge-to-bromine",
        start: { x: 290, y: 165 },
        control: { x: 275, y: 110 },
        end: { x: 255, y: 140 },
        colour: "#7c3aed",
        label: "The carbon bromine bridge bond opens",
      },
    ],
  },
  {
    id: "products",
    title: "The anti vicinal dibromide forms",
    description:
      "The two bromine atoms end up on adjacent carbons and opposite faces of the ring, giving trans-1,2-dibromocyclohexane.",
    note: "Overall: cyclohexene + Br₂ → trans-1,2-dibromocyclohexane.",
    highlight: "products",
    arrows: [],
  },
];

export default function HalogenationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<HalogenationMechanismStep, HalogenationPracticeTarget>
      title="Halogenation of alkenes"
      description="Follow bromination of cyclohexene through bromonium-ion formation, backside attack, and anti addition."
      accent="violet"
      steps={steps}
      questions={halogenationQuestions}
      validation={{
        id: "halogenation",
        reactionData: halogenationReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "bromonium"
              ? "bromonium"
              : step.highlight === "bromide-attack"
                ? "bromide-attack"
                : "reactants",
      }}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the anti-addition product."
            : "You have identified the correct intermediate or reactive feature."
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
        const practiceStep: HalogenationMechanismStep = {
          ...step,
          arrows: mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <HalogenationReactionCanvas
            step={practiceStep}
            animated={animated}
            interactive={interactive}
            showProductChoices={
              step.highlight === "products" &&
              mode !== "learn" &&
              !(mode === "practice" && answered)
            }
            onTargetClick={onTargetClick}
          />
        );
      }}
    />
  );
}
