import {
  E1BetaHydrogenCarbocationStructure,
  TertButylBromideStructure,
  TertButylCarbocationStructure,
  TwoMethylpropeneStructure,
} from "../molecules";
import { e1ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type E1MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "substrate"
    | "ionisation"
    | "carbocation"
    | "deprotonation"
    | "products";
  arrows: MechanismArrowData[];
};

export type E1PracticeTarget =
  | "tertiary-substrate"
  | "carbon-bromine-bond"
  | "carbocation"
  | "beta-hydrogen"
  | "water-base"
  | "alkene-product"
  | "bromide-product";

type E1ReactionCanvasProps = {
  step: E1MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: E1PracticeTarget) => void;
};

export default function E1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E1ReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation = step.highlight === "carbocation";
  const deprotonation = step.highlight === "deprotonation";

  const scene = products
    ? "products"
    : carbocation
      ? "carbocation"
      : deprotonation
        ? "deprotonation"
        : "substrate";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`E1 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        <>
          <TwoMethylpropeneStructure
            x={245}
            y={195}
            scale={1.05}
            highlightBond
          />

          <text
            x="400"
            y="215"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
          >
            +
          </text>

          <text
            x="455"
            y="215"
            fontSize="34"
            fontWeight="700"
            fill="#2563eb"
          >
            H₃O⁺
          </text>

          <text
            x="565"
            y="215"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
          >
            +
          </text>

          <text
            x="620"
            y="215"
            fontSize="34"
            fontWeight="700"
            fill="#dc2626"
          >
            Br⁻
          </text>
        </>
      ) : (
        <>
          {deprotonation ? (
            <>
              {/* Water is placed close to the β-hydrogen. */}
              <g>
                <text
                  x="239"
                  y="125"
                  fontSize="30"
                  fontWeight="700"
                  fill="#2563eb"
                >
                  H₂O
                </text>

                {/* Oxygen lone pairs */}
                <circle
                  cx="282"
                  cy="83"
                  r="5"
                  fill="#2563eb"
                />
                <circle
                  cx="300"
                  cy="83"
                  r="5"
                  fill="#2563eb"
                />
              </g>

              <E1BetaHydrogenCarbocationStructure
                x={405}
                y={205}
                scale={0.92}
              />
            </>
          ) : carbocation ? (
            <TertButylCarbocationStructure
              x={405}
              y={205}
              scale={0.92}
            />
          ) : (
            <TertButylBromideStructure
              x={405}
              y={205}
              scale={0.92}
              highlightBond={step.highlight === "ionisation"}
            />
          )}

          {carbocation || deprotonation ? (
            <text
              x="610"
              y="218"
              fontSize="34"
              fontWeight="700"
              fill="#dc2626"
            >
              Br⁻
            </text>
          ) : null}
        </>
      )}

      <ReactionHotspotLayer
        data={e1ReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="350"
        textAnchor="middle"
        fontSize="17"
        fill="#475569"
      >
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}