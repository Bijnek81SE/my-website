"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import ElectrophilicAdditionReactionCanvas, {
  type ElectrophilicAdditionMechanismStep,
  type ElectrophilicAdditionPracticeTarget,
} from "./ElectrophilicAdditionReactionCanvas";
import { electrophilicAdditionQuestions } from "./MechanismQuestions";
import { electrophilicAdditionReactionData } from "./MechanismReactionData";

const steps: ElectrophilicAdditionMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "Identify the alkene π bond",
    description:
      "The carbon–carbon π bond is electron-rich and acts as the nucleophile. Its electrons are available to form a new bond to an electrophile.",
    note: "In electrophilic addition, the alkene π bond is the electron source.",
    highlight: "alkene",
    arrows: [],
  },
  {
    id: "protonation",
    title: "Predict where hydrogen adds",
    description:
      "The π bond attacks HBr. Hydrogen adds to the terminal carbon so the positive charge forms on the more substituted internal carbon.",
    note: "Choose the protonation direction that produces the more stable carbocation.",
    highlight: "protonation",
    arrows: [
      {
        id: "pi-to-hydrogen",
        start: { x: 318, y: 190 },
        control: { x: 415, y: 94 },
        end: { x: 542, y: 185 },
        colour: "#e11d48",
        label: "The alkene pi electrons attack hydrogen",
      },
      {
        id: "hbr-to-bromine",
        start: { x: 590, y: 198 },
        control: { x: 625, y: 128 },
        end: { x: 646, y: 182 },
        colour: "#dc2626",
        label: "The hydrogen bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "Predict the carbocation location",
    description:
      "After protonation, the positive charge is on the internal carbon. This secondary carbocation is more stable than the alternative primary carbocation.",
    note: "Carbocation stability determines the regioselectivity of HX addition.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "bromide-attack",
    title: "Predict where bromide attaches",
    description:
      "Bromide donates a lone pair to the positively charged internal carbon, forming the new carbon–bromine bond.",
    note: "The nucleophile attaches at the carbon that bears the positive charge.",
    highlight: "bromide-attack",
    arrows: [
      {
        id: "bromide-to-carbocation",
        start: { x: 566, y: 155 },
        control: { x: 480, y: 86 },
        end: { x: 382, y: 186 },
        colour: "#dc2626",
        label: "A bromide lone pair attacks the carbocation",
      },
    ],
  },
  {
    id: "products",
    title: "The Markovnikov product forms",
    description:
      "The reaction forms 2-bromopropane. Hydrogen adds to the carbon that already had more hydrogens, while bromine adds to the more substituted carbon.",
    note: "Overall: propene + HBr → 2-bromopropane.",
    highlight: "products",
    arrows: [],
  },
];

export default function ElectrophilicAdditionMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      ElectrophilicAdditionMechanismStep,
      ElectrophilicAdditionPracticeTarget
    >
      title="Electrophilic addition to alkenes"
      description="Follow Markovnikov addition of HBr to propene through protonation, carbocation formation, and bromide attack."
      accent="rose"
      steps={steps}
      questions={electrophilicAdditionQuestions}
      validation={{
        id: "electrophilic-addition",
        reactionData: electrophilicAdditionReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "carbocation"
              ? "carbocation"
              : step.highlight === "bromide-attack"
                ? "bromide-attack"
                : "reactants",
      }}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the Markovnikov product."
            : "You have identified the correct reactive feature."
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

        const practiceStep: ElectrophilicAdditionMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
        };

        return (
          <ElectrophilicAdditionReactionCanvas
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