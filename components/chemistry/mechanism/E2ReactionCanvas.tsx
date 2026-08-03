import {
  But2EneStructure,
  E2AntiPeriplanarSubstrate,
  HydroxideStructure,
  WaterStructure,
} from "../molecules";
import { e2ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type E2MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight: "alignment" | "concerted" | "products";
  arrows: MechanismArrow[];
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
  onTargetClick?: (
    target: E2PracticeTarget,
  ) => void;
};

const baseGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]";

const substrateGlow =
  "drop-shadow-[0_0_10px_rgba(234,88,12,0.3)]";

export default function E2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E2ReactionCanvasProps) {
  const product = step.highlight === "products";
  const concerted = step.highlight === "concerted";

  const scene = product
    ? "products"
    : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`E2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {product ? (
        <>
          <WaterStructure
            x={115}
            y={198}
            scale={1.15}
          />

          <text
            x="205"
            y="213"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <But2EneStructure
            x={390}
            y={192}
            scale={1.35}
            piStroke="#7c3aed"
          />

          <text
            x="390"
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
            x="565"
            y="213"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="635"
            y="215"
            textAnchor="middle"
            fontSize="39"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <text
            x="380"
            y="308"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="#64748b"
            pointerEvents="none"
          >
            base removes β-H as the alkene forms and bromide leaves
          </text>
        </>
      ) : (
        <>
          <g
            className={
              concerted
                ? baseGlow
                : undefined
            }
          >
            <HydroxideStructure
              x={120}
              y={198}
              scale={1.15}
            >
              <circle
                cx="-9"
                cy="-37"
                r="5"
                fill="#2563eb"
                opacity={
                  concerted
                    ? 1
                    : 0.62
                }
              />

              <circle
                cx="9"
                cy="-37"
                r="5"
                fill="#2563eb"
                opacity={
                  concerted
                    ? 1
                    : 0.62
                }
              />
            </HydroxideStructure>
          </g>

          <g
            className={
              concerted
                ? substrateGlow
                : undefined
            }
          >
            <E2AntiPeriplanarSubstrate
              x={-6}
              y={0}
              scale={1}
              highlightBreakingBonds={concerted}
              highlightFormingBond={concerted}
              showLabels
            />
          </g>

          {concerted ? (
            <text
              x="380"
              y="82"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#c2410c"
              pointerEvents="none"
            >
              all three electron movements occur together
            </text>
          ) : (
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
                d="M 332 126 C 372 96, 452 100, 488 284"
                fill="none"
                stroke="#ea580c"
                strokeWidth="3"
                strokeDasharray="9 8"
                strokeLinecap="round"
                pointerEvents="none"
              />
            </>
          )}
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