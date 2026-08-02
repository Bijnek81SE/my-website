import { hydrohalogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

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
  arrows: MechanismArrowData[];
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
  onTargetClick?: (target: HydrohalogenationPracticeTarget) => void;
};

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
              y="68"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
            >
              Choose the product of 2-methylpropene + HCl
            </text>

            <g>
              <rect
                x="35"
                y="110"
                width="330"
                height="160"
                rx="22"
                fill="#ffffff"
                stroke="#67e8f9"
                strokeWidth="3"
              />
              <text
                x="200"
                y="176"
                textAnchor="middle"
                fontSize="28"
                fontWeight="700"
                fill="#0f172a"
              >
                (CH₃)₃C–Cl
              </text>
              <text
                x="200"
                y="218"
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                fill="#475569"
              >
                2-chloro-2-methylpropane
              </text>
              <text
                x="200"
                y="244"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#0e7490"
              >
                Markovnikov product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="110"
                width="330"
                height="160"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />
              <text
                x="560"
                y="176"
                textAnchor="middle"
                fontSize="27"
                fontWeight="700"
                fill="#0f172a"
              >
                (CH₃)₂CH–CH₂Cl
              </text>
              <text
                x="560"
                y="218"
                textAnchor="middle"
                fontSize="16"
                fontWeight="600"
                fill="#475569"
              >
                1-chloro-2-methylpropane
              </text>
              <text
                x="560"
                y="244"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#64748b"
              >
                Less-favoured orientation
              </text>
            </g>

            <text
              x="380"
              y="315"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
            >
              Choose the product formed through the tertiary carbocation.
            </text>
          </>
        ) : (
          <>
            <rect
              x="145"
              y="115"
              width="470"
              height="160"
              rx="24"
              fill="#ecfeff"
              stroke="#06b6d4"
              strokeWidth="3"
            />
            <text
              x="380"
              y="190"
              textAnchor="middle"
              fontSize="40"
              fontWeight="700"
              fill="#0f172a"
            >
              (CH₃)₃C–Cl
            </text>
            <text
              x="380"
              y="238"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#0e7490"
            >
              2-chloro-2-methylpropane
            </text>
          </>
        )
      ) : carbocation ? (
        <>
          <circle
            cx="350"
            cy="198"
            r="92"
            fill="#cffafe"
            opacity="0.62"
          />
          <text
            x="350"
            y="214"
            textAnchor="middle"
            fontSize="43"
            fontWeight="700"
            fill="#0891b2"
          >
            (CH₃)₃C⁺
          </text>

          <text
            x="575"
            y="214"
            textAnchor="middle"
            fontSize="43"
            fontWeight="700"
            fill="#15803d"
          >
            Cl⁻
          </text>

          <circle cx="553" cy="160" r="5" fill="#15803d" />
          <circle cx="570" cy="151" r="5" fill="#15803d" />
          <circle cx="587" cy="160" r="5" fill="#15803d" />
          <circle cx="553" cy="235" r="5" fill="#15803d" />
          <circle cx="570" cy="244" r="5" fill="#15803d" />
          <circle cx="587" cy="235" r="5" fill="#15803d" />

          <text
            x="350"
            y="285"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#0e7490"
          >
            tertiary carbocation
          </text>
        </>
      ) : (
        <>
          <text
            x="92"
            y="205"
            fontSize="31"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₃
          </text>
          <line
            x1="160"
            y1="196"
            x2="255"
            y2="196"
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="275"
            y="210"
            fontSize="39"
            fontWeight="700"
            fill="#0f172a"
          >
            C
          </text>
          <line
            x1="300"
            y1="168"
            x2="255"
            y2="125"
            stroke="#0f172a"
            strokeWidth="4"
          />
          <text
            x="165"
            y="120"
            fontSize="29"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₃
          </text>
          <line
            x1="315"
            y1="184"
            x2="430"
            y2="184"
            stroke="#0891b2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="315"
            y1="205"
            x2="430"
            y2="205"
            stroke="#0891b2"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="444"
            y="210"
            fontSize="39"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₂
          </text>

          <text
            x="535"
            y="210"
            fontSize="37"
            fontWeight="700"
            fill="#dc2626"
          >
            H
          </text>
          <line
            x1="568"
            y1="196"
            x2="615"
            y2="196"
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="628"
            y="210"
            fontSize="37"
            fontWeight="700"
            fill="#15803d"
          >
            Cl
          </text>

          <text
            x="365"
            y="285"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
          >
            2-methylpropene + HCl
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
        y="355"
        textAnchor="middle"
        fontSize="17"
        fill="#475569"
      >
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
