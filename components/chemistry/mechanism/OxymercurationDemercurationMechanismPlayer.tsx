"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { oxymercurationDemercurationQuestions } from "./MechanismQuestions";
import { oxymercurationDemercurationReactionData } from "./MechanismReactionData";
import OxymercurationDemercurationReactionCanvas, {
  type OxymercurationDemercurationMechanismStep,
  type OxymercurationDemercurationPracticeTarget,
} from "./OxymercurationDemercurationReactionCanvas";

const steps: OxymercurationDemercurationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene π bond reacts with mercury(II)",
    description:
      "The electron-rich π bond of propene attacks electrophilic mercury(II) acetate. This starts addition without forming a free carbocation.",
    note: "Oxymercuration gives Markovnikov hydration without carbocation rearrangement.",
    highlight: "reactants",
    arrows: [],
  },
  {
    id: "mercurinium-formation",
    title: "A bridged mercurinium ion forms",
    description:
      "Mercury bonds to both alkene carbons, producing a three-membered bridged intermediate. Positive charge is shared rather than localized in a free carbocation.",
    note: "The bridged intermediate prevents hydride and alkyl shifts.",
    highlight: "mercurinium",
    arrows: [
      {
        id: "pi-to-mercury",
        start: { x: 274, y: 181 },
        control: { x: 375, y: 78 },
        end: { x: 530, y: 170 },
        colour: "#7c3aed",
        label: "The alkene pi electrons attack mercury",
      },
    ],
  },
  {
    id: "water-attack",
    title: "Water attacks the more substituted carbon",
    description:
      "Water opens the mercurinium ion at the more substituted carbon. Backside attack gives anti opening of the bridged intermediate.",
    note: "Regioselectivity is Markovnikov, but no free carbocation is formed.",
    highlight: "water-attack",
    arrows: [
      {
        id: "water-to-internal-carbon",
        start: { x: 576, y: 158 },
        control: { x: 505, y: 82 },
        end: { x: 376, y: 184 },
        colour: "#2563eb",
        label: "Water attacks the more substituted carbon",
      },
      {
        id: "bridge-to-mercury",
        start: { x: 356, y: 171 },
        control: { x: 338, y: 126 },
        end: { x: 321, y: 144 },
        colour: "#7c3aed",
        label: "The carbon mercury bridge bond opens",
      },
    ],
  },
  {
    id: "organomercury",
    title: "An organomercury alcohol forms",
    description:
      "After proton transfer, OH is attached to the internal carbon and HgOAc remains attached to the terminal carbon.",
    note: "The carbon–oxygen bond fixes the Markovnikov orientation.",
    highlight: "organomercury",
    arrows: [],
  },
  {
    id: "demercuration",
    title: "NaBH₄ removes mercury",
    description:
      "Sodium borohydride reduces the carbon–mercury bond and replaces HgOAc with hydrogen without changing the alcohol position.",
    note: "Demercuration converts the organomercury intermediate into the neutral alcohol.",
    highlight: "demercuration",
    arrows: [
      {
        id: "hydride-to-carbon",
        start: { x: 585, y: 206 },
        control: { x: 500, y: 286 },
        end: { x: 404, y: 225 },
        colour: "#059669",
        label: "Hydride replaces the carbon mercury bond",
      },
    ],
  },
  {
    id: "products",
    title: "The Markovnikov alcohol forms",
    description:
      "The product is 2-propanol. OH appears on the more substituted carbon, and the reaction avoids carbocation rearrangements.",
    note: "Overall: propene → 2-propanol by Markovnikov hydration without rearrangement.",
    highlight: "products",
    arrows: [],
  },
];

export default function OxymercurationDemercurationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      OxymercurationDemercurationMechanismStep,
      OxymercurationDemercurationPracticeTarget
    >
      title="Oxymercuration–demercuration of alkenes"
      description="Follow Markovnikov hydration through a bridged mercurinium ion, water attack, and reductive demercuration."
      accent="violet"
      steps={steps}
      questions={oxymercurationDemercurationQuestions}
      validation={{
        id: "oxymercuration-demercuration",
        reactionData: oxymercurationDemercurationReactionData,
        getSceneForStep: (step) => step.highlight,
      }}
      playbackInterval={3100}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown."
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
        const showAnswer =
          mode === "practice" && answered;

        const practiceStep: OxymercurationDemercurationMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
        };

        return (
          <OxymercurationDemercurationReactionCanvas
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