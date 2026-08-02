"use client";

import HydrationReactionCanvas, {
  type HydrationMechanismStep,
  type HydrationPracticeTarget,
} from "./HydrationReactionCanvas";
import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { hydrationQuestions } from "./MechanismQuestions";
import { hydrationReactionData } from "./MechanismReactionData";

const steps: HydrationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene π bond is the nucleophile",
    description:
      "Propene contains an electron-rich π bond. It begins acid-catalysed hydration by attacking a proton from hydronium.",
    note: "Acid-catalysed hydration adds H and OH across an alkene.",
    highlight: "alkene",
    arrows: [],
  },
  {
    id: "protonation",
    title: "Hydrogen adds to the terminal carbon",
    description:
      "The π bond attacks hydrogen while the O–H bond electrons return to oxygen. Protonation occurs in the direction that forms a secondary carbocation.",
    note: "Markovnikov protonation produces the more stable carbocation.",
    highlight: "protonation",
    arrows: [
      {
        id: "pi-to-hydrogen",
        start: { x: 250, y: 179 },
        control: { x: 365, y: 80 },
        end: { x: 488, y: 181 },
        colour: "#2563eb",
        label: "The alkene pi electrons attack hydrogen",
      },
      {
        id: "oh-to-oxygen",
        start: { x: 520, y: 193 },
        control: { x: 565, y: 115 },
        end: { x: 596, y: 176 },
        colour: "#0891b2",
        label: "The oxygen hydrogen bond electrons return to oxygen",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A secondary carbocation forms",
    description:
      "Hydrogen adds to the terminal carbon, placing the positive charge on the internal carbon. The secondary carbocation is preferred over a primary alternative.",
    note: "Carbocation stability controls the hydration regiochemistry.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "water-attack",
    title: "Water attacks the carbocation",
    description:
      "A lone pair on water attacks the positively charged carbon and forms a new carbon–oxygen bond.",
    note: "Water acts as the nucleophile in the second bond-forming step.",
    highlight: "water-attack",
    arrows: [
      {
        id: "water-to-carbocation",
        start: { x: 565, y: 165 },
        control: { x: 480, y: 78 },
        end: { x: 390, y: 176 },
        colour: "#0891b2",
        label: "A water lone pair attacks the secondary carbocation",
      },
    ],
  },
  {
    id: "oxonium",
    title: "A protonated alcohol forms",
    description:
      "Water attack gives an oxonium ion. Oxygen has three bonds and therefore carries a positive formal charge.",
    note: "The carbon–oxygen bond has formed, but oxygen must still be deprotonated.",
    highlight: "oxonium",
    arrows: [],
  },
  {
    id: "deprotonation",
    title: "Water removes the extra proton",
    description:
      "A second water molecule acts as a base and removes a proton from the oxonium ion. The O–H bond electrons remain on the alcohol oxygen.",
    note: "Deprotonation regenerates hydronium, so the acid is a catalyst.",
    highlight: "deprotonation",
    arrows: [
      {
        id: "water-to-proton",
        start: { x: 112, y: 168 },
        control: { x: 205, y: 88 },
        end: { x: 300, y: 174 },
        colour: "#0891b2",
        label: "Water removes a proton from the oxonium ion",
      },
      {
        id: "oh-to-oxygen",
        start: { x: 332, y: 188 },
        control: { x: 372, y: 118 },
        end: { x: 407, y: 174 },
        colour: "#2563eb",
        label: "The oxygen hydrogen bond electrons remain on oxygen",
      },
    ],
  },
  {
    id: "products",
    title: "The Markovnikov alcohol forms",
    description:
      "The product is 2-propanol. Hydrogen adds to the terminal carbon and OH appears on the more substituted internal carbon.",
    note: "Overall: propene + water → 2-propanol, with acid regenerated.",
    highlight: "products",
    arrows: [],
  },
];

export default function HydrationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<HydrationMechanismStep, HydrationPracticeTarget>
      title="Acid-catalysed hydration of alkenes"
      description="Follow Markovnikov hydration of propene through protonation, carbocation formation, water attack, and deprotonation."
      accent="blue"
      steps={steps}
      questions={hydrationQuestions}
      validation={{
        id: "hydration",
        reactionData: hydrationReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "carbocation"
              ? "carbocation"
              : step.highlight === "water-attack"
                ? "water-attack"
                : step.highlight === "oxonium"
                  ? "oxonium"
                  : step.highlight === "deprotonation"
                    ? "deprotonation"
                    : "reactants",
      }}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the Markovnikov alcohol product."
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
        const practiceStep: HydrationMechanismStep = {
          ...step,
          arrows: mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <HydrationReactionCanvas
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
