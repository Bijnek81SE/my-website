import {
  HydroxideStructure,
  MethanolStructure,
  MethylBromideStructure,
} from "../molecules";
import { sn2ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismStep } from "./types";

export type Sn2PracticeTarget =
  | "oxygen"
  | "carbon"
  | "bromine"
  | "carbon-bromine-bond"
  | "product-bromide";

type Sn2ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: Sn2PracticeTarget) => void;
};

const nucleophileGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]";

const leavingGroupGlow =
  "drop-shadow-[0_0_10px_rgba(220,38,38,0.35)]";

export default function Sn2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn2ReactionCanvasProps) {
  const showProduct = step.highlight === "product";

  const showAttack =
    step.highlight === "substrate" ||
    step.highlight === "leaving-group";

  const scene = showProduct
    ? "products"
    : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 390"
      ariaLabel={`SN2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {!showProduct ? (
        <>
          <g
            className={
              step.highlight === "nucleophile"
                ? nucleophileGlow
                : undefined
            }
          >
            <HydroxideStructure
              x={170}
              y={198}
              scale={1.15}
            >
              <circle
                cx="-9"
                cy="-37"
                r="5"
                fill="#2563eb"
                opacity={
                  step.highlight === "nucleophile"
                    ? 1
                    : 0.55
                }
              />

              <circle
                cx="9"
                cy="-37"
                r="5"
                fill="#2563eb"
                opacity={
                  step.highlight === "nucleophile"
                    ? 1
                    : 0.55
                }
              />
            </HydroxideStructure>
          </g>

          {showAttack ? (
            <line
              x1="207"
              y1="198"
              x2="365"
              y2="198"
              stroke="#2563eb"
              strokeWidth="4"
              strokeDasharray="10 9"
              strokeLinecap="round"
              opacity="0.42"
              pointerEvents="none"
            />
          ) : null}

          <g
            className={
              step.highlight === "leaving-group"
                ? leavingGroupGlow
                : undefined
            }
          >
            <MethylBromideStructure
              x={430}
              y={198}
              scale={1.05}
              highlightBond={
                step.highlight === "substrate" ||
                step.highlight === "leaving-group"
              }
            />
          </g>

          {showAttack ? (
            <text
              x="300"
              y="248"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#475569"
              pointerEvents="none"
            >
              backside approach
            </text>
          ) : null}
        </>
      ) : (
        <>
          <MethanolStructure
            x={310}
            y={198}
            scale={1.15}
          />

          <text
            x="420"
            y="214"
            fontSize="32"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="500"
            y="214"
            textAnchor="middle"
            fontSize="43"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <text
            x="380"
            y="278"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            methanol and bromide
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={sn2ReactionData}
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