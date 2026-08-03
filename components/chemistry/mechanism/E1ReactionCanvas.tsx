import {
  E1BetaHydrogenCarbocationStructure,
  TertButylBromideStructure,
  TertButylCarbocationStructure,
  TwoMethylpropeneStructure,
  WaterStructure,
} from "../molecules";
import { e1ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

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
  arrows: MechanismArrow[];
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
  onTargetClick?: (
    target: E1PracticeTarget,
  ) => void;
};

const waterGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

const carbocationGlow =
  "drop-shadow-[0_0_10px_rgba(5,150,105,0.3)]";

export default function E1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E1ReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation =
    step.highlight === "carbocation";
  const deprotonation =
    step.highlight === "deprotonation";

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
            x={250}
            y={195}
            scale={1.05}
            highlightBond
          />

          <text
            x="405"
            y="215"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="480"
            y="215"
            textAnchor="middle"
            fontSize="34"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H₃O⁺
          </text>

          <text
            x="565"
            y="215"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="630"
            y="215"
            textAnchor="middle"
            fontSize="35"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <text
            x="380"
            y="302"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            2-methylpropene, hydronium, and bromide
          </text>
        </>
      ) : (
        <>
          {deprotonation ? (
            <>
              <g className={waterGlow}>
                <WaterStructure
                  x={299}
                  y={125}
                  scale={1.05}
                >
                  <circle
                    cx="-9"
                    cy="-34"
                    r="5"
                    fill="#2563eb"
                  />

                  <circle
                    cx="9"
                    cy="-34"
                    r="5"
                    fill="#2563eb"
                  />
                </WaterStructure>
              </g>

              <E1BetaHydrogenCarbocationStructure
                x={405}
                y={205}
                scale={0.92}
              />
            </>
          ) : carbocation ? (
            <g className={carbocationGlow}>
              <TertButylCarbocationStructure
                x={390}
                y={205}
                scale={0.92}
              />
            </g>
          ) : (
            <TertButylBromideStructure
              x={390}
              y={205}
              scale={0.92}
              highlightBond={
                step.highlight === "ionisation"
              }
            />
          )}

          {carbocation || deprotonation ? (
            <text
              x="610"
              y="218"
              textAnchor="middle"
              fontSize="35"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
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
        pointerEvents="none"
      >
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}