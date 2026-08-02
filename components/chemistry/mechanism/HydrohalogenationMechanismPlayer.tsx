"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import HydrohalogenationReactionCanvas, {
  type HydrohalogenationMechanismStep,
  type HydrohalogenationPracticeTarget,
} from "./HydrohalogenationReactionCanvas";
import { hydrohalogenationQuestions } from "./MechanismQuestions";
import { hydrohalogenationReactionData } from "./MechanismReactionData";

const steps: HydrohalogenationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene is the nucleophile",
    description:
      "The π bond of 2-methylpropene is electron-rich. It donates electron density to the hydrogen of HCl and begins hydrohalogenation.",
    note: "Hydrohalogenation adds H and X across an alkene double bond.",
    highlight: "alkene",
    arrows: [],
  },
  {
    id: "protonation",
    title: "Hydrogen adds to the terminal carbon",
    description:
      "The π bond attacks hydrogen while the H–Cl bond breaks. Hydrogen adds to the terminal CH₂ carbon so the positive charge develops on the more substituted carbon.",
    note: "The favoured protonation direction forms the most stable carbocation.",
    highlight: "protonation",
    arrows: [
      {
        id: "pi-to-hydrogen",
        start: { x: 374, y: 180 },
        control: { x: 455, y: 92 },
        end: { x: 542, y: 180 },
        colour: "#0891b2",
        label: "The alkene pi electrons attack hydrogen",
      },
      {
        id: "hcl-to-chlorine",
        start: { x: 580, y: 195 },
        control: { x: 620, y: 125 },
        end: { x: 646, y: 180 },
        colour: "#15803d",
        label: "The hydrogen chlorine bond electrons move to chlorine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A tertiary carbocation forms",
    description:
      "Protonation produces the tert-butyl carbocation. Its positive charge is stabilised by three neighbouring methyl groups, making it strongly preferred over a primary carbocation.",
    note: "Carbocation stability controls Markovnikov regioselectivity.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "chloride-attack",
    title: "Chloride attacks the carbocation",
    description:
      "Chloride donates a lone pair to the positively charged carbon. This forms the new carbon–chlorine bond and completes the addition.",
    note: "The halide ion attacks the carbon that carries the positive charge.",
    highlight: "halide-attack",
    arrows: [
      {
        id: "chloride-to-carbocation",
        start: { x: 553, y: 167 },
        control: { x: 472, y: 92 },
        end: { x: 386, y: 178 },
        colour: "#15803d",
        label: "A chloride lone pair attacks the tertiary carbocation",
      },
    ],
  },
  {
    id: "products",
    title: "The Markovnikov chloroalkane forms",
    description:
      "The product is 2-chloro-2-methylpropane. Hydrogen adds to the carbon with more hydrogens, and chlorine adds to the more substituted carbon.",
    note: "Overall: 2-methylpropene + HCl → 2-chloro-2-methylpropane.",
    highlight: "products",
    arrows: [],
  },
];

export default function HydrohalogenationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      HydrohalogenationMechanismStep,
      HydrohalogenationPracticeTarget
    >
      title="Hydrohalogenation of alkenes"
      description="Follow Markovnikov addition of HCl to 2-methylpropene through protonation, tertiary carbocation formation, and chloride attack."
      accent="cyan"
      steps={steps}
      questions={hydrohalogenationQuestions}
      validation={{
        id: "hydrohalogenation",
        reactionData: hydrohalogenationReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "carbocation"
              ? "carbocation"
              : step.highlight === "halide-attack"
                ? "halide-attack"
                : "reactants",
      }}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the Markovnikov chloroalkane product."
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
        const practiceStep: HydrohalogenationMechanismStep = {
          ...step,
          arrows: mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <HydrohalogenationReactionCanvas
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
