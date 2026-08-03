import {
  CyclohexeneStructure,
  DibromocyclohexaneStructure,
} from "../molecules";
import { halogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type HalogenationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "bromonium-formation"
    | "bromonium"
    | "bromide-attack"
    | "products";
  arrows: MechanismArrow[];
};

export type HalogenationPracticeTarget =
  | "pi-bond"
  | "electrophilic-bromine"
  | "bromonium-ion"
  | "bromide"
  | "backside-carbon"
  | "anti-product"
  | "syn-product";

type HalogenationReactionCanvasProps = {
  step: HalogenationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: HalogenationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]";

const bromoniumGlow =
  "drop-shadow-[0_0_12px_rgba(124,58,237,0.32)]";

export default function HalogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HalogenationReactionCanvasProps) {
  const products = step.highlight === "products";

  const bromonium =
    step.highlight === "bromonium" ||
    step.highlight === "bromide-attack";

  const scene = products
    ? "products"
    : step.highlight === "bromonium"
      ? "bromonium"
      : step.highlight === "bromide-attack"
        ? "bromide-attack"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Halogenation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="52"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              Choose the stereochemical product of cyclohexene + Br₂
            </text>

            <g>
              <rect
                x="35"
                y="78"
                width="330"
                height="220"
                rx="22"
                fill="#ffffff"
                stroke="#8b5cf6"
                strokeWidth="3"
              />

              <DibromocyclohexaneStructure
                x={180}
                y={168}
                scale={0.76}
                stereochemistry="trans"
              />

              <text
                x="200"
                y="258"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0f172a"
                pointerEvents="none"
              >
                trans-1,2-dibromocyclohexane
              </text>

              <text
                x="200"
                y="282"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#5b21b6"
                pointerEvents="none"
              >
                anti addition
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="78"
                width="330"
                height="220"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <DibromocyclohexaneStructure
                x={540}
                y={168}
                scale={0.76}
                stereochemistry="cis"
                muted
              />

              <text
                x="560"
                y="258"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#475569"
                pointerEvents="none"
              >
                cis-1,2-dibromocyclohexane
              </text>

              <text
                x="560"
                y="282"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                syn addition
              </text>
            </g>

            <text
              x="380"
              y="330"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
              pointerEvents="none"
            >
              Backside attack gives the trans vicinal dibromide.
            </text>
          </>
        ) : (
          <>
            <rect
              x="125"
              y="78"
              width="510"
              height="220"
              rx="24"
              fill="#f5f3ff"
              stroke="#8b5cf6"
              strokeWidth="3"
            />

            <DibromocyclohexaneStructure
              x={350}
              y={165}
              scale={0.94}
              stereochemistry="trans"
            />

            <text
              x="380"
              y="262"
              textAnchor="middle"
              fontSize="21"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              trans-1,2-dibromocyclohexane
            </text>

            <text
              x="380"
              y="288"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#5b21b6"
              pointerEvents="none"
            >
              anti vicinal dibromide
            </text>
          </>
        )
      ) : bromonium ? (
        <>
          <g
            className={
              step.highlight === "bromonium"
                ? bromoniumGlow
                : undefined
            }
          >
            <circle
              cx="285"
              cy="198"
              r="105"
              fill="#ede9fe"
              opacity="0.68"
            />

            <line
              x1="225"
              y1="220"
              x2="345"
              y2="220"
              stroke="#0f172a"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <path
              d="M 225 220 Q 285 105 345 220"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="7"
              strokeLinecap="round"
            />

            <text
              x="285"
              y="125"
              textAnchor="middle"
              fontSize="38"
              fontWeight="700"
              fill="#7c3aed"
              pointerEvents="none"
            >
              Br⁺
            </text>

            <text
              x="225"
              y="252"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#475569"
              pointerEvents="none"
            >
              C
            </text>

            <text
              x="345"
              y="252"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#475569"
              pointerEvents="none"
            >
              C
            </text>
          </g>

          <text
            x="585"
            y="214"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#b91c1c"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <circle
            cx="565"
            cy="155"
            r="5"
            fill="#b91c1c"
            pointerEvents="none"
          />

          <circle
            cx="583"
            cy="146"
            r="5"
            fill="#b91c1c"
            pointerEvents="none"
          />

          <circle
            cx="601"
            cy="155"
            r="5"
            fill="#b91c1c"
            pointerEvents="none"
          />

          <text
            x="380"
            y="305"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            {step.highlight === "bromide-attack"
              ? "Bromide attacks from the face opposite the bridging bromine"
              : "The bridging bromine blocks attack from its own face"}
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
            <CyclohexeneStructure
              x={245}
              y={190}
              scale={1.12}
              highlightBond={
                step.highlight === "alkene" ||
                step.highlight === "bromonium-formation"
              }
            />
          </g>

          <text
            x="245"
            y="292"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            cyclohexene
          </text>

          <text
            x="430"
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
            x="515"
            y="208"
            textAnchor="middle"
            fontSize="41"
            fontWeight="700"
            fill="#b91c1c"
            pointerEvents="none"
          >
            Br
          </text>

          <line
            x1="552"
            y1="194"
            x2="605"
            y2="194"
            stroke={
              step.highlight === "bromonium-formation"
                ? "#dc2626"
                : "#0f172a"
            }
            strokeWidth={
              step.highlight === "bromonium-formation"
                ? 7
                : 5
            }
            strokeLinecap="round"
          />

          <text
            x="645"
            y="208"
            textAnchor="middle"
            fontSize="41"
            fontWeight="700"
            fill="#b91c1c"
            pointerEvents="none"
          >
            Br
          </text>

          <circle
            cx="495"
            cy="150"
            r="5"
            fill="#b91c1c"
            pointerEvents="none"
          />

          <circle
            cx="513"
            cy="141"
            r="5"
            fill="#b91c1c"
            pointerEvents="none"
          />

          <text
            x="380"
            y="320"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            cyclohexene + bromine
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={halogenationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="362"
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