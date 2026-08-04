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
        start: { x: 365, y: 190 },
        control: { x: 320, y: 112 },
        end: { x: 270, y: 177 },
        colour: "#e11d48",
        label: "One electron moves to the left oxygen",
      },
      {
        id: "peroxide-homolysis-right",
        start: { x: 395, y: 190 },
        control: { x: 440, y: 112 },
        end: { x: 490, y: 177 },
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
        start: { x: 210, y: 180 },
        control: { x: 300, y: 88 },
        end: { x: 402, y: 178 },
        colour: "#059669",
        label: "The alkoxy radical abstracts hydrogen",
      },
      {
        id: "hbr-homolysis",
        start: { x: 452, y: 192 },
        control: { x: 535, y: 108 },
        end: { x: 625, y: 178 },
        colour: "#dc2626",
        label: "The hydrogen bromine bond supplies the bromine radical",
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
        end: { x: 327, y: 215 },
        colour: "#dc2626",
        label: "The bromine radical bonds to the terminal carbon",
      },
      {
        id: "pi-to-internal-radical",
        start: { x: 276, y: 180 },
        control: { x: 325, y: 110 },
        end: { x: 230, y: 158 },
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
        start: { x: 290, y: 165 },
        control: { x: 415, y: 74 },
        end: { x: 573, y: 180 },
        colour: "#059669",
        label: "The carbon radical abstracts hydrogen",
      },
      {
        id: "hbr-to-bromine-radical",
        start: { x: 600, y: 192 },
        control: { x: 660, y: 122 },
        end: { x: 670, y: 178 },
        colour: "#dc2626",
        label: "The hydrogen bromine bond regenerates bromine radical",
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
        const showAnswer =
          mode === "practice" && answered;

        const practiceStep: RadicalHBrMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
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