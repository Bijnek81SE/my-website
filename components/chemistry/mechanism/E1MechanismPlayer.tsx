"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import E1ReactionCanvas, {
  type E1MechanismStep,
  type E1PracticeTarget,
} from "./E1ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";

const steps: E1MechanismStep[] = [
  {
    id: "substrate",
    title: "Identify the tertiary substrate",
    description:
      "tert-Butyl bromide is a tertiary alkyl halide. In a polar protic solvent, the carbon–bromine bond can ionise to form a stable tertiary carbocation.",
    note: "E1 and SN1 reactions begin with the same slow ionisation step.",
    highlight: "substrate",
    arrows: [],
  },
  {
    id: "ionisation",
    title: "The leaving group departs",
    description:
      "The carbon–bromine bond breaks heterolytically. Both bonding electrons move onto bromine, producing bromide and a tertiary carbocation.",
    note: "This unimolecular ionisation is the rate-determining step.",
    highlight: "ionisation",
    arrows: [
      {
        id: "departure",
        start: { x: 485, y: 192 },
        control: { x: 535, y: 115 },
        end: { x: 575, y: 180 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "carbocation",
    title: "A tertiary carbocation forms",
    description:
      "The positively charged carbon is trigonal planar. The carbocation can undergo substitution or lose a β-hydrogen to form an alkene.",
    note: "Competition between E1 and SN1 occurs after carbocation formation.",
    highlight: "carbocation",
    arrows: [],
  },
  {
    id: "deprotonation",
    title: "Water removes a β-hydrogen",
    description:
      "A water molecule acts as a weak base and removes a β-hydrogen. The carbon–hydrogen bond electrons form the new carbon–carbon π bond.",
    note: "Unlike E2, E1 deprotonation occurs after the carbocation has formed.",
    highlight: "deprotonation",
    arrows: [
      {
        id: "base-to-hydrogen",
        start: { x: 110, y: 105 },
        control: { x: 225, y: 40 },
        end: { x: 365, y: 92 },
        colour: "#2563eb",
        label: "Water removes the beta hydrogen",
      },
      {
        id: "ch-to-pi",
        start: { x: 398, y: 145 },
        control: { x: 345, y: 170 },
        end: { x: 365, y: 205 },
        colour: "#7c3aed",
        label: "Carbon hydrogen bond electrons form the pi bond",
      },
    ],
  },
  {
    id: "products",
    title: "The alkene forms",
    description:
      "2-Methylpropene forms together with hydronium and bromide. The elimination product contains the new carbon–carbon π bond.",
    note: "Heat commonly favours elimination over competing SN1 substitution.",
    highlight: "products",
    arrows: [],
  },
];

const practiceQuestions: PracticeQuestion<E1PracticeTarget>[] = [
  {
    id: "identify-tertiary-substrate",
    title: "Which structure is the tertiary substrate?",
    description:
      "Identify the alkyl halide whose carbon bearing bromine is attached to three carbon groups.",
    instruction: "Click the tertiary substrate.",
    correctTarget: "tertiary-substrate",
    incorrectFeedback:
      "Not quite. Look for the carbon bonded to bromine and three methyl groups.",
    correctExplanation:
      "tert-Butyl bromide is tertiary, so ionisation produces a relatively stable tertiary carbocation.",
  },
  {
    id: "identify-ionising-bond",
    title: "Which bond breaks during ionisation?",
    description:
      "The slow first step forms the carbocation and the leaving-group anion.",
    instruction: "Click the bond that breaks heterolytically.",
    correctTarget: "carbon-bromine-bond",
    incorrectFeedback:
      "Not quite. Select the bond between the tertiary carbon and bromine.",
    correctExplanation:
      "The carbon–bromine bond breaks, and both bonding electrons move onto bromine.",
  },
  {
    id: "identify-carbocation",
    title: "Which species is the E1 intermediate?",
    description:
      "E1 elimination proceeds through a discrete positively charged intermediate.",
    instruction: "Click the carbocation intermediate.",
    correctTarget: "carbocation",
    incorrectFeedback:
      "Not quite. Look for the positively charged carbon after bromide leaves.",
    correctExplanation:
      "The tertiary carbocation is the intermediate shared by competing E1 and SN1 pathways.",
  },
  {
    id: "identify-beta-hydrogen",
    title: "Which hydrogen is removed?",
    description:
      "The base removes a hydrogen from a carbon adjacent to the carbocation.",
    instruction: "Click the β-hydrogen.",
    correctTarget: "beta-hydrogen",
    incorrectFeedback:
      "Not quite. Choose a hydrogen on a carbon next to the positively charged carbon.",
    correctExplanation:
      "Removal of the β-hydrogen allows the C–H bond electrons to form the alkene π bond.",
  },
  {
    id: "identify-alkene-product",
    title: "Which species is the elimination product?",
    description:
      "Identify the product containing the new carbon–carbon double bond.",
    instruction: "Click the alkene product.",
    correctTarget: "alkene-product",
    incorrectFeedback:
      "Not quite. Look for the neutral product containing a C=C bond.",
    correctExplanation:
      "2-Methylpropene is the E1 product formed after β-deprotonation of the carbocation.",
  },
];

export default function E1MechanismPlayer() {
  return (
    <MechanismPlayerEngine<E1MechanismStep, E1PracticeTarget>
      title="E1 elimination"
      description="Follow ionisation, carbocation formation, β-deprotonation, and alkene formation in a stepwise elimination."
      accent="emerald"
      steps={steps}
      questions={practiceQuestions}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The correct electron movement is now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the alkene product."
            : "You have identified the correct species."
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
        const practiceStep: E1MechanismStep = {
          ...step,
          arrows:
            mode === "learn" || showAnswer ? step.arrows : [],
        };

        return (
          <E1ReactionCanvas
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
