import {
  IsobutylChlorideStructure,
  TertButylCarbocationStructure,
  TertButylChlorideStructure,
  TwoMethylpropeneStructure,
} from "../molecules";
import { hydrohalogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type HydrohalogenationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "protonation"
    | "carbocation"
    | "halide-attack"
    | "products";
  arrows: MechanismArrow[];
};

export type HydrohalogenationPracticeTarget =
  | "pi-bond"
  | "electrophilic-hydrogen"
  | "terminal-carbon"
  | "tertiary-carbocation"
  | "chloride"
  | "markovnikov-product"
  | "wrong-product";

type HydrohalogenationReactionCanvasProps = {
  step: HydrohalogenationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: HydrohalogenationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(8,145,178,0.32)]";

const carbocationGlow =
  "drop-shadow-[0_0_12px_rgba(8,145,178,0.3)]";

export default function HydrohalogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydrohalogenationReactionCanvasProps) {
  const products = step.highlight === "products";

  const carbocation =
    step.highlight === "carbocation" ||
    step.highlight === "halide-attack";

  const scene = products
    ? "products"
    : step.highlight === "carbocation"
      ? "carbocation"
      : step.highlight === "halide-attack"
        ? "halide-attack"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Hydrohalogenation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="60"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              Choose the product of 2-methylpropene + HCl
            </text>

            <g>
              <rect
                x="35"
                y="92"
                width="330"
                height="200"
                rx="22"
                fill="#ffffff"
                stroke="#06b6d4"
                strokeWidth="3"
              />

              <TertButylChlorideStructure
                x={195}
                y={184}
                scale={0.78}
              />

              <text
                x="200"
                y="257"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0e7490"
                pointerEvents="none"
              >
                2-chloro-2-methylpropane
              </text>

              <text
                x="200"
                y="280"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#0891b2"
                pointerEvents="none"
              >
                Markovnikov product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="92"
                width="330"
                height="200"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <IsobutylChlorideStructure
                x={545}
                y={184}
                scale={0.82}
              />

              <text
                x="560"
                y="257"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#475569"
                pointerEvents="none"
              >
                1-chloro-2-methylpropane
              </text>

              <text
                x="560"
                y="280"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                wrong regiochemistry
              </text>
            </g>

            <text
              x="380"
              y="325"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
              pointerEvents="none"
            >
              Choose the product formed through the tertiary carbocation.
            </text>
          </>
        ) : (
          <>
            <rect
              x="145"
              y="105"
              width="470"
              height="185"
              rx="24"
              fill="#ecfeff"
              stroke="#06b6d4"
              strokeWidth="3"
            />

            <TertButylChlorideStructure
              x={370}
              y={184}
              scale={0.88}
            />

            <text
              x="380"
              y="280"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#0e7490"
              pointerEvents="none"
            >
              2-chloro-2-methylpropane
            </text>
          </>
        )
      ) : carbocation ? (
        <>
          <g
            className={
              step.highlight === "carbocation"
                ? carbocationGlow
                : undefined
            }
          >
            <circle
              cx="350"
              cy="198"
              r="108"
              fill="#cffafe"
              opacity="0.62"
            />

            <TertButylCarbocationStructure
              x={350}
              y={198}
              scale={0.92}
            />

            <text
              x="350"
              y="307"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#0e7490"
              pointerEvents="none"
            >
              tertiary carbocation
            </text>
          </g>

          <text
            x="585"
            y="214"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#15803d"
            pointerEvents="none"
          >
            Cl⁻
          </text>

          <circle
            cx="565"
            cy="155"
            r="5"
            fill="#15803d"
            pointerEvents="none"
          />

          <circle
            cx="583"
            cy="146"
            r="5"
            fill="#15803d"
            pointerEvents="none"
          />

          <circle
            cx="601"
            cy="155"
            r="5"
            fill="#15803d"
            pointerEvents="none"
          />

          <text
            x="380"
            y="330"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            chloride attacks the positively charged tertiary carbon
          </text>
        </>
      ) : (
        <>
          <g
            className={
              step.highlight === "alkene"
                ? alkeneGlow
                : undefined
            }
          >
            <TwoMethylpropeneStructure
              x={320}
              y={195}
              scale={0.95}
              highlightBond={
                step.highlight === "alkene" ||
                step.highlight === "protonation"
              }
            />
          </g>

          {step.highlight === "protonation" ? (
            <text
              x="425"
              y="112"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#0e7490"
              pointerEvents="none"
            >
              terminal carbon receives H
            </text>
          ) : null}

          <text
            x="500"
            y="212"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="550"
            y="212"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            H
          </text>

          <line
            x1="575"
            y1="198"
            x2="620"
            y2="198"
            stroke={
              step.highlight === "protonation"
                ? "#15803d"
                : "#0f172a"
            }
            strokeWidth={
              step.highlight === "protonation"
                ? 7
                : 5
            }
            strokeLinecap="round"
          />

          <text
            x="650"
            y="212"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#15803d"
            pointerEvents="none"
          >
            Cl
          </text>

          <text
            x="380"
            y="315"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            2-methylpropene + hydrogen chloride
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={hydrohalogenationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="365"
        textAnchor="middle"
        fontSize="16"
        fill="#475569"
        pointerEvents="none"
      >
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}