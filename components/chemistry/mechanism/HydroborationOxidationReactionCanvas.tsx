import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  OrganoboraneStructure,
  PropeneStructure,
} from "../molecules";
import { hydroborationOxidationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type HydroborationOxidationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "reactants"
    | "hydroboration"
    | "organoborane"
    | "oxidation"
    | "products";
  arrows: MechanismArrow[];
};

export type HydroborationOxidationPracticeTarget =
  | "pi-bond"
  | "terminal-carbon"
  | "organoborane-intermediate"
  | "carbon-boron-bond"
  | "anti-markovnikov-alcohol"
  | "markovnikov-alcohol";

type HydroborationOxidationReactionCanvasProps = {
  step: HydroborationOxidationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: HydroborationOxidationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(8,145,178,0.32)]";

const intermediateGlow =
  "drop-shadow-[0_0_12px_rgba(8,145,178,0.3)]";

export default function HydroborationOxidationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydroborationOxidationReactionCanvasProps) {
  const scene = step.highlight;

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Hydroboration oxidation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "products" ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="54"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              Choose the major product after 1. BH₃·THF 2. H₂O₂, OH⁻
            </text>

            <g>
              <rect
                x="35"
                y="88"
                width="330"
                height="205"
                rx="22"
                fill="#ffffff"
                stroke="#06b6d4"
                strokeWidth="3"
              />

              <AntiMarkovnikovPropaneStructure
                x={205}
                y={178}
                substituent="OH"
                scale={0.9}
                substituentStroke="#0891b2"
              />

              <text
                x="200"
                y="254"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0e7490"
                pointerEvents="none"
              >
                1-propanol
              </text>

              <text
                x="200"
                y="278"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#0891b2"
                pointerEvents="none"
              >
                anti-Markovnikov alcohol
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="88"
                width="330"
                height="205"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <MarkovnikovPropaneStructure
                x={560}
                y={178}
                substituent="OH"
                scale={0.9}
                substituentStroke="#64748b"
              />

              <text
                x="560"
                y="254"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                2-propanol
              </text>

              <text
                x="560"
                y="278"
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
              y="326"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
              pointerEvents="none"
            >
              The carbon bonded to boron becomes the alcohol carbon.
            </text>
          </>
        ) : (
          <>
            <rect
              x="135"
              y="100"
              width="490"
              height="190"
              rx="24"
              fill="#ecfeff"
              stroke="#06b6d4"
              strokeWidth="3"
            />

            <AntiMarkovnikovPropaneStructure
              x={390}
              y={172}
              substituent="OH"
              scale={1.02}
              substituentStroke="#0891b2"
            />

            <text
              x="380"
              y="264"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#0e7490"
              pointerEvents="none"
            >
              1-propanol · anti-Markovnikov alcohol
            </text>
          </>
        )
      ) : step.highlight === "organoborane" ? (
        <>
          <g className={intermediateGlow}>
            <circle
              cx="380"
              cy="192"
              r="118"
              fill="#cffafe"
              opacity="0.72"
            />

            <OrganoboraneStructure
              x={365}
              y={190}
              scale={1.15}
            />
          </g>

          <text
            x="380"
            y="300"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#0e7490"
            pointerEvents="none"
          >
            organoborane intermediate
          </text>

          <text
            x="380"
            y="324"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            boron is attached to the terminal carbon
          </text>
        </>
      ) : step.highlight === "oxidation" ? (
        <>
          <OrganoboraneStructure
            x={315}
            y={190}
            scale={1.08}
          />

          <text
            x="515"
            y="208"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="590"
            y="180"
            textAnchor="middle"
            fontSize="31"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H₂O₂
          </text>

          <text
            x="590"
            y="222"
            textAnchor="middle"
            fontSize="25"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            OH⁻
          </text>

          <text
            x="380"
            y="304"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#0e7490"
            pointerEvents="none"
          >
            oxidation replaces the C–B bond with C–OH
          </text>
        </>
      ) : (
        <>
          <g
            className={
              step.highlight === "reactants"
                ? alkeneGlow
                : undefined
            }
          >
            <PropeneStructure
              x={255}
              y={190}
              scale={1.3}
              piStroke="#0891b2"
              showCarbonLabels={
                step.highlight === "hydroboration"
              }
            />
          </g>

          <text
            x="435"
            y="208"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="535"
            y="208"
            textAnchor="middle"
            fontSize="37"
            fontWeight="700"
            fill="#0891b2"
            pointerEvents="none"
          >
            BH₃
          </text>

          <text
            x="625"
            y="208"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            THF
          </text>

          {step.highlight === "hydroboration" ? (
            <>
              <text
                x="354"
                y="104"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#0e7490"
                pointerEvents="none"
              >
                B approaches the terminal carbon
              </text>

              <text
                x="380"
                y="307"
                textAnchor="middle"
                fontSize="17"
                fontWeight="700"
                fill="#475569"
                pointerEvents="none"
              >
                B and H add together from the same face
              </text>
            </>
          ) : (
            <text
              x="380"
              y="307"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#475569"
              pointerEvents="none"
            >
              propene + borane–THF
            </text>
          )}
        </>
      )}

      <ReactionHotspotLayer
        data={hydroborationOxidationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="368"
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