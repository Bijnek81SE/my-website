"use client";

import HydroborationOxidationReactionCanvas, {
  type HydroborationOxidationMechanismStep,
  type HydroborationOxidationPracticeTarget,
} from "./HydroborationOxidationReactionCanvas";
import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { hydroborationOxidationQuestions } from "./MechanismQuestions";
import { hydroborationOxidationReactionData } from "./MechanismReactionData";

const steps: HydroborationOxidationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene π bond reacts with borane",
    description:
      "Propene uses its electron-rich π bond to interact with electron-deficient boron in BH₃. Boron is the electrophilic end of the B–H bond.",
    note: "Hydroboration begins with concerted addition of B and H across the alkene.",
    highlight: "reactants",
    arrows: [],
  },
  {
    id: "concerted-hydroboration",
    title: "Boron adds to the less substituted carbon",
    description:
      "The π bond donates toward boron while a B–H bond delivers hydrogen to the more substituted carbon. Both bonds form together from the same face.",
    note: "Hydroboration is concerted, syn, and anti-Markovnikov.",
    highlight: "hydroboration",
    arrows: [
      {
        id: "pi-to-boron",
        start: { x: 280, y: 180 },
        control: { x: 375, y: 78 },
        end: { x: 520, y: 178 },
        colour: "#0891b2",
        label: "The alkene pi electrons form a bond to boron",
      },
      {
        id: "bh-to-carbon",
        start: { x: 518, y: 218 },
        control: { x: 450, y: 286 },
        end: { x: 310, y: 220 },
        colour: "#059669",
        label:
          "A boron hydrogen bond delivers hydrogen to the internal carbon",
      },
    ],
  },
  {
    id: "organoborane",
    title: "A syn organoborane intermediate forms",
    description:
      "Boron is attached to the terminal carbon while hydrogen is attached to the internal carbon. Their same-face delivery records the syn stereochemistry.",
    note: "The C–B bond marks the carbon that will later receive OH.",
    highlight: "organoborane",
    arrows: [],
  },
  {
    id: "oxidation",
    title: "Oxidation replaces boron with hydroxyl",
    description:
      "Hydrogen peroxide in hydroxide converts the carbon–boron bond into a carbon–oxygen bond while preserving the regiochemistry established during hydroboration.",
    note: "Oxidation replaces B with OH without moving the carbon skeleton.",
    highlight: "oxidation",
    arrows: [
      {
        id: "peroxide-to-boron",
        start: { x: 578, y: 150 },
        control: { x: 505, y: 88 },
        end: { x: 441, y: 170 },
        colour: "#2563eb",
        label: "Peroxide attacks boron during oxidation",
      },
    ],
  },
  {
    id: "products",
    title: "The anti-Markovnikov alcohol forms",
    description:
      "The product is 1-propanol. OH appears on the less substituted terminal carbon, while hydrogen has added to the internal carbon.",
    note: "Overall: propene → 1-propanol by anti-Markovnikov, syn hydration.",
    highlight: "products",
    arrows: [],
  },
];

export default function HydroborationOxidationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      HydroborationOxidationMechanismStep,
      HydroborationOxidationPracticeTarget
    >
      title="Hydroboration–oxidation of alkenes"
      description="Follow concerted syn hydroboration of propene and oxidation to the anti-Markovnikov alcohol."
      accent="cyan"
      steps={steps}
      questions={hydroborationOxidationQuestions}
      validation={{
        id: "hydroboration-oxidation",
        reactionData: hydroborationOxidationReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "hydroboration"
              ? "hydroboration"
              : step.highlight === "organoborane"
                ? "organoborane"
                : step.highlight === "oxidation"
                  ? "oxidation"
                  : "reactants",
      }}
      playbackInterval={3100}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct concerted electron movement is now shown."
          : index === steps.length - 1
            ? "You have identified the anti-Markovnikov alcohol product."
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
        const showAnswer =
          mode === "practice" && answered;

        const practiceStep: HydroborationOxidationMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
        };

        return (
          <HydroborationOxidationReactionCanvas
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