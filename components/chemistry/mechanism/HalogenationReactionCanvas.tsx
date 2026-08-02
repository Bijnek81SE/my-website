import {
  CyclohexeneStructure,
  DibromocyclohexaneStructure,
} from "../molecules";
import { halogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

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
  arrows: MechanismArrowData[];
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

export default function HalogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HalogenationReactionCanvasProps) {
  const scene =
    step.highlight === "products"
      ? "products"
      : step.highlight === "bromonium"
        ? "bromonium"
        : step.highlight === "bromide-attack"
          ? "bromide-attack"
          : "reactants";

  const bromonium =
    step.highlight === "bromonium" ||
    step.highlight === "bromide-attack";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Halogenation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "products" ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="48"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
            >
              Choose the stereochemical product of cyclohexene + Br₂
            </text>

            <g>
              <rect
                x="35"
                y="70"
                width="330"
                height="225"
                rx="22"
                fill="#ffffff"
                stroke="#8b5cf6"
                strokeWidth="3"
              />

              <DibromocyclohexaneStructure
                x={180}
                y={170}
                scale={0.78}
                stereochemistry="trans"
              />

              <text
                x="200"
                y="264"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#0f172a"
              >
                trans-1,2-dibromocyclohexane
              </text>

              <text
                x="200"
                y="286"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#5b21b6"
              >
                Anti addition
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="70"
                width="330"
                height="225"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <DibromocyclohexaneStructure
                x={540}
                y={170}
                scale={0.78}
                stereochemistry="cis"
                muted
              />

              <text
                x="560"
                y="264"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#475569"
              >
                cis-1,2-dibromocyclohexane
              </text>

              <text
                x="560"
                y="286"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#64748b"
              >
                Syn addition
              </text>
            </g>
          </>
        ) : (
          <>
            <rect
              x="125"
              y="70"
              width="510"
              height="235"
              rx="24"
              fill="#f5f3ff"
              stroke="#8b5cf6"
              strokeWidth="3"
            />

            <DibromocyclohexaneStructure
              x={350}
              y={178}
              scale={1.05}
              stereochemistry="trans"
            />

            <text
              x="380"
              y="274"
              textAnchor="middle"
              fontSize="22"
              fontWeight="700"
              fill="#0f172a"
            >
              trans-1,2-dibromocyclohexane
            </text>

            <text
              x="380"
              y="298"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#5b21b6"
            >
              Anti vicinal dibromide
            </text>
          </>
        )
      ) : bromonium ? (
        <>
          <text
            x="255"
            y="228"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#0f172a"
          >
            C — C
          </text>

          <path
            d="M 205 190 Q 255 115 305 190"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="6"
          />

          <text
            x="255"
            y="132"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#7c3aed"
          >
            Br⁺
          </text>

          <text
            x="575"
            y="215"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#b91c1c"
          >
            Br⁻
          </text>

          {step.highlight === "bromide-attack" ? (
            <text
              x="380"
              y="285"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#475569"
            >
              Bromide attacks from the face opposite the bridging
              bromine
            </text>
          ) : null}
        </>
      ) : (
        <>
          <CyclohexeneStructure
            x={255}
            y={195}
            scale={1.25}
            highlightBond={
              step.highlight === "alkene" ||
              step.highlight === "bromonium-formation"
            }
          />

          <text
            x="255"
            y="305"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#475569"
          >
            cyclohexene
          </text>

          <text
            x="455"
            y="210"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fill="#64748b"
          >
            +
          </text>

          <text
            x="535"
            y="210"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#b91c1c"
          >
            Br
          </text>

          <line
            x1="572"
            y1="195"
            x2="620"
            y2="195"
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <text
            x="657"
            y="210"
            textAnchor="middle"
            fontSize="42"
            fontWeight="700"
            fill="#b91c1c"
          >
            Br
          </text>

          <circle cx="513" cy="155" r="5" fill="#b91c1c" />
          <circle cx="530" cy="146" r="5" fill="#b91c1c" />
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