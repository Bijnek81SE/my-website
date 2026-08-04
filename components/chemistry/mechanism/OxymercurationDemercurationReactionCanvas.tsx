import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  MercuriniumIonStructure,
  OrganomercuryAlcoholStructure,
  PropeneStructure,
  WaterStructure,
} from "../molecules";
import { oxymercurationDemercurationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type OxymercurationDemercurationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "reactants"
    | "mercurinium"
    | "water-attack"
    | "organomercury"
    | "demercuration"
    | "products";
  arrows: MechanismArrow[];
};

export type OxymercurationDemercurationPracticeTarget =
  | "pi-bond"
  | "mercurinium-ion"
  | "water-nucleophile"
  | "internal-carbon"
  | "carbon-mercury-bond"
  | "markovnikov-alcohol"
  | "anti-markovnikov-alcohol";

type OxymercurationDemercurationReactionCanvasProps = {
  step: OxymercurationDemercurationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: OxymercurationDemercurationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]";

const intermediateGlow =
  "drop-shadow-[0_0_12px_rgba(124,58,237,0.32)]";

const waterGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.34)]";

export default function OxymercurationDemercurationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: OxymercurationDemercurationReactionCanvasProps) {
  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Oxymercuration demercuration mechanism: ${step.title}`}
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
              Choose the major product after 1. Hg(OAc)₂, H₂O 2. NaBH₄
            </text>

            <g>
              <rect
                x="35"
                y="88"
                width="330"
                height="205"
                rx="22"
                fill="#ffffff"
                stroke="#8b5cf6"
                strokeWidth="3"
              />

              <MarkovnikovPropaneStructure
                x={205}
                y={178}
                substituent="OH"
                scale={0.9}
                substituentStroke="#7c3aed"
              />

              <text
                x="200"
                y="254"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#6d28d9"
                pointerEvents="none"
              >
                2-propanol
              </text>

              <text
                x="200"
                y="278"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#7c3aed"
                pointerEvents="none"
              >
                Markovnikov alcohol
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

              <AntiMarkovnikovPropaneStructure
                x={555}
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
                1-propanol
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
              Water attacks the more substituted carbon of the bridged ion.
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
              fill="#f5f3ff"
              stroke="#8b5cf6"
              strokeWidth="3"
            />

            <MarkovnikovPropaneStructure
              x={390}
              y={172}
              substituent="OH"
              scale={1.02}
              substituentStroke="#7c3aed"
            />

            <text
              x="380"
              y="264"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#6d28d9"
              pointerEvents="none"
            >
              2-propanol · Markovnikov alcohol
            </text>
          </>
        )
      ) : step.highlight === "mercurinium" ? (
        <>
          <g className={intermediateGlow}>
            <circle
              cx="365"
              cy="192"
              r="118"
              fill="#ede9fe"
              opacity="0.72"
            />

            <MercuriniumIonStructure
              x={365}
              y={190}
              scale={1.06}
            />
          </g>

          <text
            x="380"
            y="310"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#6d28d9"
            pointerEvents="none"
          >
            bridged mercurinium ion
          </text>

          <text
            x="380"
            y="333"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            no free carbocation is formed
          </text>
        </>
      ) : step.highlight === "water-attack" ? (
        <>
          <MercuriniumIonStructure
            x={340}
            y={190}
            scale={1.04}
          />

          <g className={waterGlow}>
            <WaterStructure
              x={585}
              y={192}
              scale={1.08}
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

          <text
            x="380"
            y="310"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#6d28d9"
            pointerEvents="none"
          >
            water attacks the more substituted carbon from the backside
          </text>
        </>
      ) : step.highlight === "organomercury" ? (
        <>
          <g className={intermediateGlow}>
            <circle
              cx="380"
              cy="192"
              r="125"
              fill="#ede9fe"
              opacity="0.72"
            />

            <OrganomercuryAlcoholStructure
              x={365}
              y={190}
              scale={1.06}
            />
          </g>

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#6d28d9"
            pointerEvents="none"
          >
            organomercury alcohol
          </text>

          <text
            x="380"
            y="329"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            OH is attached to the internal carbon
          </text>
        </>
      ) : step.highlight === "demercuration" ? (
        <>
          <OrganomercuryAlcoholStructure
            x={320}
            y={190}
            scale={1.04}
          />

          <text
            x="505"
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
            x="600"
            y="210"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#059669"
            pointerEvents="none"
          >
            NaBH₄
          </text>

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#6d28d9"
            pointerEvents="none"
          >
            reduction replaces C–HgOAc with C–H
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
              x={250}
              y={190}
              scale={1.3}
              piStroke="#7c3aed"
              showCarbonLabels={false}
            />
          </g>

          <text
            x="430"
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
            x="570"
            y="180"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#7c3aed"
            pointerEvents="none"
          >
            Hg(OAc)₂
          </text>

          <text
            x="570"
            y="225"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H₂O
          </text>

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            propene + mercury(II) acetate in water
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={oxymercurationDemercurationReactionData}
        scene={step.highlight}
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