"use client";

import MechanismPlayerEngine from "./MechanismPlayerEngine";
import E2ReactionCanvas, {
  type E2MechanismStep,
  type E2PracticeTarget,
} from "./E2ReactionCanvas";
import type { PracticeQuestion } from "./PracticeTypes";

const steps: E2MechanismStep[] = [
  {
    id: "alignment",
    title: "Find an anti-periplanar β-hydrogen",
    description:
      "The strong base must remove a β-hydrogen that is anti-periplanar to the leaving group. This alignment allows the C–H σ bond to overlap with the developing π bond as the C–Br bond breaks.",
    note: "E2 stereochemistry is controlled by the anti-periplanar arrangement.",
    highlight: "alignment",
    arrows: [],
  },
  {
    id: "concerted",
    title: "Three electron movements occur together",
    description:
      "The base removes the β-hydrogen, the C–H bond electrons form the C=C π bond, and the C–Br bond electrons move onto bromine. All three changes occur in one concerted step.",
    note: "E2 has one transition state and no carbocation intermediate.",
    highlight: "concerted",
    arrows: [
      {
        id: "base-to-hydrogen",
        start: { x: 187, y: 150 },
        control: { x: 230, y: 72 },
        end: { x: 300, y: 170 },
        colour: "#2563eb",
        label: "Base lone pair removes the beta hydrogen",
      },
      {
        id: "ch-to-pi",
        start: { x: 355, y: 167 },
        control: { x: 407, y: 88 },
        end: { x: 445, y: 183 },
        colour: "#7c3aed",
        label: "Carbon hydrogen bond electrons form the pi bond",
      },
      {
        id: "cbr-to-br",
        start: { x: 525, y: 202 },
        control: { x: 597, y: 112 },
        end: { x: 645, y: 184 },
        colour: "#dc2626",
        label: "Carbon bromine bond electrons move to bromine",
      },
    ],
  },
  {
    id: "products",
    title: "The alkene forms",
    description:
      "The reaction produces an alkene, the conjugate acid of the base, and bromide. The leaving group and β-hydrogen are removed from adjacent carbons.",
    note: "Overall: strong base + alkyl bromide → alkene + conjugate acid + Br⁻",
    highlight: "products",
    arrows: [],
  },
];

const practiceQuestions: PracticeQuestion<E2PracticeTarget>[] = [
  {
    id: "identify-beta-hydrogen",
    title: "Which hydrogen can the base remove?",
    description:
      "The removable hydrogen must be on the β-carbon and anti-periplanar to the leaving group.",
    instruction:
      "Click the correctly aligned β-hydrogen.",
    correctTarget: "beta-hydrogen",
    incorrectFeedback:
      "Not quite. Look for the hydrogen on the carbon adjacent to the carbon bearing bromine.",
    correctExplanation:
      "This β-hydrogen is anti-periplanar to bromine, allowing the required orbital overlap for E2 elimination.",
  },
  {
    id: "identify-base",
    title: "Which species removes the β-hydrogen?",
    description:
      "E2 reactions require a base that can abstract the β-hydrogen.",
    instruction:
      "Click the species acting as the base.",
    correctTarget: "base",
    incorrectFeedback:
      "Not quite. Select the electron-rich species that accepts the proton.",
    correctExplanation:
      "Hydroxide acts as the base by donating a lone pair to the β-hydrogen.",
  },
  {
    id: "identify-alkene-product",
    title: "Which product contains the new π bond?",
    description:
      "The E2 reaction forms an alkene as the β-hydrogen and leaving group are removed.",
    instruction:
      "Click the alkene product.",
    correctTarget: "alkene-product",
    incorrectFeedback:
      "Not quite. Look for the product containing a carbon–carbon double bond.",
    correctExplanation:
      "The alkene is the elimination product formed when the new carbon–carbon π bond is created.",
  },
];

export default function E2MechanismPlayer() {
  return (
    <MechanismPlayerEngine<E2MechanismStep, E2PracticeTarget>
      title="E2 elimination"
      description="Follow β-hydrogen abstraction, π-bond formation, and leaving-group departure in one concerted step."
      accent="orange"
      steps={steps}
      questions={practiceQuestions}
      playbackInterval={3000}
      getRevealMessage={(step, index) =>
        step.arrows.length > 0
          ? "The three concerted electron movements are now shown on the reaction diagram."
          : index === steps.length - 1
            ? "You have identified the alkene product."
            : "You have identified the correctly aligned β-hydrogen."
      }
      renderCanvas={({
        step,
        index,
        mode,
        animated,
        answered,
        interactive,
        onTargetClick,
      }) => {
        const showAnswer = mode === "practice" && answered;
        const practiceStep: E2MechanismStep = {
          ...step,
          arrows:
            mode === "learn"
              ? step.arrows
              : showAnswer
                ? index === 0
                  ? steps[1].arrows
                  : step.arrows
                : [],
        };

        return (
          <E2ReactionCanvas
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
