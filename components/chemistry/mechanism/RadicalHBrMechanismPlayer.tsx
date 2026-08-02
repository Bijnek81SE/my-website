"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { radicalHBrQuestions } from "./MechanismQuestions";
import { radicalHBrReactionData } from "./MechanismReactionData";
import RadicalHBrReactionCanvas, {
  type RadicalHBrMechanismStep,
  type RadicalHBrPracticeTarget,
} from "./RadicalHBrReactionCanvas";

const steps: RadicalHBrMechanismStep[] = [
  {
    id: "peroxide-initiation",
    title: "Peroxide homolysis starts the chain",
    description:
      "Heat or light breaks the weak oxygen–oxygen bond homolytically, producing two alkoxy radicals. Each oxygen receives one bonding electron.",
    note: "Radical initiators contain a weak O–O bond that undergoes homolysis.",
    highlight: "initiation",
    arrows: [
      {
        id: "peroxide-homolysis-left",
        start: { x: 365, y: 186 },
        control: { x: 320, y: 115 },
        end: { x: 275, y: 172 },
        colour: "#e11d48",
        label: "One electron moves to the left oxygen",
      },
      {
        id: "peroxide-homolysis-right",
        start: { x: 395, y: 186 },
        control: { x: 440, y: 115 },
        end: { x: 485, y: 172 },
        colour: "#e11d48",
        label: "One electron moves to the right oxygen",
      },
    ],
  },
  {
    id: "bromine-radical-generation",
    title: "An alkoxy radical generates Br•",
    description:
      "The alkoxy radical abstracts hydrogen from HBr. This forms an alcohol and a bromine radical, the chain-carrying species that adds to the alkene.",
    note: "Only HBr supports the peroxide effect efficiently; HCl and HI do not.",
    highlight: "bromine-radical",
    arrows: [
      {
        id: "alkoxy-to-hydrogen",
        start: { x: 255, y: 190 },
        control: { x: 325, y: 95 },
        end: { x: 405, y: 177 },
        colour: "#059669",
        label: "The alkoxy radical abstracts hydrogen",
      },
      {
        id: "hbr-homolysis",
        start: { x: 470, y: 190 },
        control: { x: 535, y: 110 },
        end: { x: 585, y: 176 },
        colour: "#dc2626",
        label: "The H Br bond supplies the bromine radical",
      },
    ],
  },
  {
    id: "bromine-addition",
    title: "Br• adds to the terminal carbon",
    description:
      "The bromine radical bonds to the less substituted alkene carbon. The other π electron remains on the internal carbon, producing the more stable secondary carbon radical.",
    note: "Radical stability controls the anti-Markovnikov regiochemistry.",
    highlight: "propagation-one",
    arrows: [
      {
        id: "bromine-to-terminal-carbon",
        start: { x: 555, y: 174 },
        control: { x: 465, y: 82 },
        end: { x: 345, y: 202 },
        colour: "#dc2626",
        label: "The bromine radical bonds to the terminal carbon",
      },
      {
        id: "pi-to-internal-radical",
        start: { x: 286, y: 190 },
        control: { x: 335, y: 112 },
        end: { x: 250, y: 160 },
        colour: "#7c3aed",
        label: "One pi electron remains on the internal carbon",
      },
    ],
  },
  {
    id: "secondary-radical",
    title: "A secondary carbon radical forms",
    description:
      "Bromine is now attached to the terminal carbon, while the unpaired electron is located on the more substituted internal carbon.",
    note: "Formation of the more stable secondary radical determines the product orientation.",
    highlight: "radical-intermediate",
    arrows: [],
  },
  {
    id: "hydrogen-abstraction",
    title: "The carbon radical abstracts H from HBr",
    description:
      "The secondary radical removes hydrogen from another HBr molecule. The C–H bond forms and Br• is regenerated, allowing the propagation cycle to continue.",
    note: "Propagation consumes HBr and regenerates the bromine radical.",
    highlight: "propagation-two",
    arrows: [
      {
        id: "radical-to-hydrogen",
        start: { x: 330, y: 170 },
        control: { x: 420, y: 75 },
        end: { x: 515, y: 180 },
        colour: "#059669",
        label: "The carbon radical abstracts hydrogen",
      },
      {
        id: "hbr-to-bromine-radical",
        start: { x: 570, y: 192 },
        control: { x: 620, y: 118 },
        end: { x: 655, y: 180 },
        colour: "#dc2626",
        label: "The H Br bond regenerates bromine radical",
      },
    ],
  },
  {
    id: "products",
    title: "The anti-Markovnikov bromide forms",
    description:
      "The product is 1-bromopropane. Bromine appears on the less substituted carbon because the chain pathway favors the more stable secondary radical intermediate.",
    note: "Overall: propene + HBr, ROOR → 1-bromopropane.",
    highlight: "products",
    arrows: [],
  },
];

export default function RadicalHBrMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      RadicalHBrMechanismStep,
      RadicalHBrPracticeTarget
    >
      title="Radical HBr addition to alkenes"
      description="Follow peroxide initiation, bromine-radical propagation, and anti-Markovnikov addition of HBr to propene."
      accent="rose"
      steps={steps}
      questions={radicalHBrQuestions}
      validation={{
        id: "radical-hbr-addition",
        reactionData: radicalHBrReactionData,
        getSceneForStep: (step) => step.highlight,
      }}
      playbackInterval={3200}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct single-electron movement is now shown."
          : index === steps.length - 1
            ? "You have identified the anti-Markovnikov product."
            : "You have identified the correct radical intermediate."
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
        const practiceStep = {
          ...step,
          arrows: mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <RadicalHBrReactionCanvas
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
