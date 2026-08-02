import {
  But2EneStructure,
  E2AntiPeriplanarSubstrate,
} from "../molecules/library";
import { e2ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";

type Point = {
  x: number;
  y: number;
};

type Arrow = {
  id: string;
  start: Point;
  control: Point;
  end: Point;
  colour?: string;
  label: string;
};

export type E2MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight: "alignment" | "concerted" | "products";
  arrows: Arrow[];
};

export type E2PracticeTarget =
  | "base"
  | "beta-hydrogen"
  | "carbon-hydrogen-bond"
  | "carbon-carbon-bond"
  | "carbon-bromine-bond"
  | "alkene-product"
  | "water-product"
  | "bromide-product";

type E2ReactionCanvasProps = {
  step: E2MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: E2PracticeTarget) => void;
};

const glow =
  "drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]";

export default function E2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E2ReactionCanvasProps) {
  const product = step.highlight === "products";
  const concerted = step.highlight === "concerted";
  const scene = product ? "products" : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`E2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {product ? (
        <>
          <text
            x="92"
            y="210"
            fontSize="34"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H₂O
          </text>

          <text
            x="220"
            y="210"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <But2EneStructure
            x={410}
            y={190}
            scale={1.35}
            piStroke="#7c3aed"
          />

          <text
            x="410"
            y="275"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            2-butene
          </text>

          <text
            x="575"
            y="210"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="630"
            y="210"
            fontSize="38"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>
        </>
      ) : (
        <>
          <g className={concerted ? glow : undefined}>
            <text
              x="82"
              y="208"
              fontSize="38"
              fontWeight="700"
              fill="#2563eb"
              pointerEvents="none"
            >
              ⁻OH
            </text>

            <circle
              cx="132"
              cy="158"
              r="5"
              fill="#2563eb"
              pointerEvents="none"
            />

            <circle
              cx="150"
              cy="158"
              r="5"
              fill="#2563eb"
              pointerEvents="none"
            />
          </g>

          <E2AntiPeriplanarSubstrate
            x={0}
            y={0}
            highlightBreakingBonds={concerted}
            highlightFormingBond={concerted}
            showLabels
          />

          {step.highlight === "alignment" ? (
            <>
              <text
                x="410"
                y="72"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#c2410c"
                pointerEvents="none"
              >
                β-H and Br are anti-periplanar
              </text>

              <path
                d="M 338 134 C 370 108, 452 108, 486 276"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3"
                strokeDasharray="9 8"
                strokeLinecap="round"
                pointerEvents="none"
              />
            </>
          ) : null}
        </>
      )}

      <ReactionHotspotLayer
        data={e2ReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="355"
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
