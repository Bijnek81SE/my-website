import {
  AntiMarkovnikovPropaneStructure,
  CarbonRadicalIntermediateStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { radicalHBrReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type RadicalHBrMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "initiation"
    | "bromine-radical"
    | "propagation-one"
    | "radical-intermediate"
    | "propagation-two"
    | "products";
  arrows: MechanismArrow[];
};

export type RadicalHBrPracticeTarget =
  | "peroxide-bond"
  | "bromine-radical"
  | "terminal-carbon"
  | "carbon-radical"
  | "hbr"
  | "anti-markovnikov-bromide"
  | "markovnikov-bromide";

type RadicalHBrReactionCanvasProps = {
  step: RadicalHBrMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: RadicalHBrPracticeTarget,
  ) => void;
};

const radicalGlow =
  "drop-shadow-[0_0_10px_rgba(225,29,72,0.34)]";

const intermediateGlow =
  "drop-shadow-[0_0_12px_rgba(225,29,72,0.28)]";

function RadicalDot({
  x,
  y,
  colour = "#e11d48",
}: {
  x: number;
  y: number;
  colour?: string;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r="5"
      fill={colour}
      pointerEvents="none"
    />
  );
}

export default function RadicalHBrReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: RadicalHBrReactionCanvasProps) {
  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Radical HBr addition mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "initiation" ? (
        <>
          <text
            x="380"
            y="72"
            textAnchor="middle"
            fontSize="21"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            initiation · heat or light
          </text>

          <text
            x="245"
            y="208"
            textAnchor="middle"
            fontSize="36"
            fontWeight="700"
            fill="#0f172a"
            pointerEvents="none"
          >
            RO
          </text>

          <line
            x1="285"
            y1="193"
            x2="475"
            y2="193"
            stroke="#e11d48"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <text
            x="515"
            y="208"
            textAnchor="middle"
            fontSize="36"
            fontWeight="700"
            fill="#0f172a"
            pointerEvents="none"
          >
            OR
          </text>

          <text
            x="380"
            y="285"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            homolytic cleavage of the peroxide O–O bond
          </text>
        </>
      ) : step.highlight === "bromine-radical" ? (
        <>
          <g className={radicalGlow}>
            <text
              x="195"
              y="208"
              textAnchor="middle"
              fontSize="35"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              RO•
            </text>
          </g>

          <text
            x="315"
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
            x="430"
            y="208"
            textAnchor="middle"
            fontSize="35"
            fontWeight="700"
            fill="#0f172a"
            pointerEvents="none"
          >
            H–Br
          </text>

          <text
            x="535"
            y="208"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            →
          </text>

          <g className={radicalGlow}>
            <text
              x="635"
              y="208"
              textAnchor="middle"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br•
            </text>
          </g>

          <text
            x="380"
            y="292"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            the chain-carrying bromine radical is generated
          </text>
        </>
      ) : step.highlight === "propagation-one" ? (
        <>
          <PropeneStructure
            x={250}
            y={190}
            scale={1.3}
            piStroke="#7c3aed"
            showCarbonLabels
          />

          <text
            x="430"
            y="210"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <g className={radicalGlow}>
            <text
              x="570"
              y="205"
              textAnchor="middle"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br•
            </text>
          </g>

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            Br adds to the terminal carbon, leaving the radical internally
          </text>
        </>
      ) : step.highlight === "radical-intermediate" ? (
        <>
          <g className={intermediateGlow}>
            <circle
              cx="365"
              cy="192"
              r="118"
              fill="#ffe4e6"
              opacity="0.62"
            />

            <CarbonRadicalIntermediateStructure
              x={365}
              y={192}
              scale={1.18}
            />
          </g>

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            more stable secondary carbon radical
          </text>
        </>
      ) : step.highlight === "propagation-two" ? (
        <>
          <CarbonRadicalIntermediateStructure
            x={295}
            y={192}
            scale={1.04}
          />

          <text
            x="490"
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
            x="610"
            y="208"
            textAnchor="middle"
            fontSize="35"
            fontWeight="700"
            fill="#0f172a"
            pointerEvents="none"
          >
            H–Br
          </text>

          <RadicalDot
            x={654}
            y={166}
            colour="#dc2626"
          />

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            hydrogen abstraction forms product and regenerates Br•
          </text>
        </>
      ) : showProductChoices ? (
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
            Choose the major product of HBr addition with ROOR
          </text>

          <g>
            <rect
              x="35"
              y="88"
              width="330"
              height="205"
              rx="22"
              fill="#ffffff"
              stroke="#f43f5e"
              strokeWidth="3"
            />

            <AntiMarkovnikovPropaneStructure
              x={205}
              y={178}
              substituent="Br"
              scale={0.9}
              substituentStroke="#e11d48"
            />

            <text
              x="200"
              y="254"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#be123c"
              pointerEvents="none"
            >
              1-bromopropane
            </text>

            <text
              x="200"
              y="278"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#e11d48"
              pointerEvents="none"
            >
              anti-Markovnikov product
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
              substituent="Br"
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
              2-bromopropane
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
              ionic Markovnikov product
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
            The pathway that forms the secondary radical controls the product.
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
            fill="#fff1f2"
            stroke="#f43f5e"
            strokeWidth="3"
          />

          <AntiMarkovnikovPropaneStructure
            x={390}
            y={172}
            substituent="Br"
            scale={1.02}
            substituentStroke="#e11d48"
          />

          <text
            x="380"
            y="264"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#be123c"
            pointerEvents="none"
          >
            1-bromopropane · anti-Markovnikov product
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={radicalHBrReactionData}
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