"use client";

import HydrogenationReactionCanvas, {
  type HydrogenationMechanismStep,
  type HydrogenationPracticeTarget,
} from "./HydrogenationReactionCanvas";
import MechanismPlayerEngine from "./MechanismPlayerEngine";
import { hydrogenationQuestions } from "./MechanismQuestions";
import { hydrogenationReactionData } from "./MechanismReactionData";

const steps: HydrogenationMechanismStep[] = [
  {
    id: "identify-pi-bond",
    title: "The alkene adsorbs onto the catalyst",
    description:
      "Cyclohexene binds to the platinum surface through its π bond while H₂ approaches the catalyst.",
    note: "Catalytic hydrogenation occurs on the surface of Pt, Pd, or Ni.",
    highlight: "alkene",
    arrows: [],
  },
  {
    id: "activate-hydrogen",
    title: "Hydrogen is activated on the metal",
    description:
      "The H–H bond breaks on the platinum surface to give two metal-bound hydrogen atoms.",
    note: "The catalyst weakens and cleaves the H–H bond without forming a carbocation.",
    highlight: "hydrogen-activation",
    arrows: [],
  },
  {
    id: "syn-addition",
    title: "Both hydrogens add from the same face",
    description:
      "The two surface-bound hydrogens form new C–H bonds from the catalyst side while the C=C π bond becomes a C–C single bond.",
    note: "Surface delivery makes catalytic hydrogenation a syn addition.",
    highlight: "syn-addition",
    arrows: [
      {
        id: "left-hydrogen-delivery",
        start: { x: 315, y: 252 },
        control: { x: 310, y: 215 },
        end: { x: 350, y: 188 },
        colour: "#059669",
        label:
          "A surface hydrogen forms the first carbon hydrogen bond",
      },
      {
        id: "right-hydrogen-delivery",
        start: { x: 445, y: 252 },
        control: { x: 450, y: 215 },
        end: { x: 410, y: 188 },
        colour: "#059669",
        label:
          "A second surface hydrogen adds from the same face",
      },
    ],
  },
  {
    id: "products",
    title: "The saturated alkane leaves the catalyst",
    description:
      "Cyclohexane desorbs from the metal surface after the double bond has accepted one hydrogen at each carbon.",
    note: "Overall: cyclohexene + H₂ → cyclohexane.",
    highlight: "products",
    arrows: [],
  },
];

export default function HydrogenationMechanismPlayer() {
  return (
    <MechanismPlayerEngine<
      HydrogenationMechanismStep,
      HydrogenationPracticeTarget
    >
      title="Catalytic hydrogenation of alkenes"
      description="Follow alkene adsorption, H₂ activation, syn delivery, and reduction of cyclohexene to cyclohexane."
      accent="emerald"
      steps={steps}
      questions={hydrogenationQuestions}
      validation={{
        id: "hydrogenation",
        reactionData: hydrogenationReactionData,
        getSceneForStep: (step) =>
          step.highlight === "products"
            ? "products"
            : step.highlight === "hydrogen-activation"
              ? "activated-hydrogen"
              : step.highlight === "syn-addition"
                ? "syn-addition"
                : "reactants",
      }}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The same-face hydrogen delivery is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the saturated alkane product."
            : "You have identified the correct reactant or catalyst feature."
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

        const practiceStep: HydrogenationMechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer
              ? step.arrows
              : [],
        };

        return (
          <HydrogenationReactionCanvas
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