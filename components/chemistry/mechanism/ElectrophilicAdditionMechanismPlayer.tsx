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
    title: "The π bond attacks hydrogen",
    description:
      "The alkene π electrons form a bond to the electrophilic hydrogen of HBr. At the same time, the H–Br bond electrons move onto bromine.",
    note: "Protonation occurs so that the more stable secondary carbocation forms.",
    highlight: "protonation",
    arrows: [
      {
        id: "pi-to-hydrogen",
        start: { x: 350, y: 190 },
        control: { x: 440, y: 95 },
        end: { x: 545, y: 180 },
        colour: "#e11d48",
        label: "The alkene pi electrons attack hydrogen",
      },
      {
        id: "hbr-to-bromine",
        start: { x: 585, y: 195 },
        control: { x: 625, y: 125 },
        end: { x: 650, y: 180 },
        colour: "#dc2626",
        label: "The hydrogen bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A secondary carbocation forms",
    description:
      "Hydrogen adds to the terminal carbon, leaving the positive charge on the more substituted internal carbon. This secondary carbocation is more stable than the alternative primary carbocation.",
    note: "Carbocation stability explains the Markovnikov orientation.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "bromide-attack",
    title: "Bromide attacks the carbocation",
    description:
      "Bromide donates a lone pair to the positively charged carbon, forming the new carbon–bromine bond.",
    note: "The nucleophile attacks the planar carbocation intermediate.",
    highlight: "bromide-attack",
    arrows: [
      {
        id: "bromide-to-carbocation",
        start: { x: 565, y: 158 },
        control: { x: 475, y: 90 },
        end: { x: 365, y: 185 },
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
            : step.highlight === "carbocation" ||
                step.highlight === "bromide-attack"
              ? "carbocation"
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
        const showAnswer = mode === "practice" && answered;
        const practiceStep: ElectrophilicAdditionMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <ElectrophilicAdditionReactionCanvas
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
