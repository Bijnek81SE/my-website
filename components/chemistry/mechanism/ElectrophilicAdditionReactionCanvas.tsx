import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { electrophilicAdditionReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type ElectrophilicAdditionMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "protonation"
    | "carbocation"
    | "bromide-attack"
    | "products";
  arrows: MechanismArrowData[];
};

export type ElectrophilicAdditionPracticeTarget =
  | "pi-bond"
  | "electrophilic-hydrogen"
  | "terminal-carbon"
  | "internal-carbon"
  | "internal-carbocation"
  | "bromide"
  | "markovnikov-product"
  | "anti-markovnikov-product";

type ElectrophilicAdditionReactionCanvasProps = {
  step: ElectrophilicAdditionMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: ElectrophilicAdditionPracticeTarget,
  ) => void;
};

export default function ElectrophilicAdditionReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: ElectrophilicAdditionReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation =
    step.highlight === "carbocation" ||
    step.highlight === "bromide-attack";

  const scene = products
    ? "products"
    : step.highlight === "carbocation"
      ? "carbocation"
      : step.highlight === "bromide-attack"
        ? "bromide-attack"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Electrophilic addition mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="72"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
            >
              Choose the product of propene + HBr
            </text>

            <g>
              <rect
                x="35"
                y="115"
                width="330"
                height="150"
                rx="22"
                fill="#ffffff"
                stroke="#fda4af"
                strokeWidth="3"
              />
              <MarkovnikovPropaneStructure x={220} y={188} substituent="Br" scale={0.9} />
              <text x="200" y="240" textAnchor="middle" fontSize="16" fontWeight="700" fill="#be123c">
                2-bromopropane · Markovnikov product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="115"
                width="330"
                height="150"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />
              <AntiMarkovnikovPropaneStructure x={540} y={188} substituent="Br" scale={0.9} />
              <text x="560" y="240" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
                1-bromopropane · wrong regiochemistry
              </text>
            </g>

            <text
              x="380"
              y="310"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
            >
              Apply Markovnikov regioselectivity before choosing.
            </text>
          </>
        ) : (
          <>
            <rect
              x="160"
              y="120"
              width="440"
              height="150"
              rx="24"
              fill="#fff1f2"
              stroke="#fb7185"
              strokeWidth="3"
            />
            <MarkovnikovPropaneStructure x={400} y={194} substituent="Br" scale={1.15} />
            <text x="380" y="255" textAnchor="middle" fontSize="18" fontWeight="700" fill="#be123c">
              2-bromopropane · Markovnikov product
            </text>
          </>
        )
      ) : carbocation ? (
        <>
          <circle
            cx="345"
            cy="198"
            r="70"
            fill={
              step.highlight === "carbocation" ||
              step.highlight === "bromide-attack"
                ? "#ede9fe"
                : "transparent"
            }
            opacity="0.9"
          />

          <text
            x="190"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#7c3aed"
          >
            CH₃–C⁺H–CH₃
          </text>

          <text
            x="345"
            y="118"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#6d28d9"
          >
            internal carbon
          </text>

          <text
            x="540"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#dc2626"
          >
            Br⁻
          </text>

          <circle cx="570" cy="152" r="5" fill="#dc2626" />
          <circle cx="588" cy="152" r="5" fill="#dc2626" />

          <text
            x="380"
            y="285"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
          >
            Secondary carbocation: Br⁻ attacks the charged internal carbon
          </text>
        </>
      ) : (
        <>
          {step.highlight === "protonation" ? (
            <>
              <circle
                cx="368"
                cy="220"
                r="62"
                fill="#fff1f2"
                stroke="#fb7185"
                strokeWidth="3"
              />
              <text
                x="368"
                y="118"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#be123c"
              >
                H adds here
              </text>
            </>
          ) : null}

          <PropeneStructure
            x={330}
            y={198}
            scale={1.35}
            piStroke={
              step.highlight === "alkene" || step.highlight === "protonation"
                ? "#e11d48"
                : undefined
            }
            showCarbonLabels
          />

          <text
            x="535"
            y="215"
            fontSize="40"
            fontWeight="700"
            fill="#2563eb"
          >
            H
          </text>
          <line
            x1="570"
            y1="202"
            x2="620"
            y2="202"
            stroke={
              step.highlight === "protonation"
                ? "#dc2626"
                : "#0f172a"
            }
            strokeWidth={
              step.highlight === "protonation" ? 7 : 5
            }
          />
          <text
            x="635"
            y="215"
            fontSize="40"
            fontWeight="700"
            fill="#dc2626"
          >
            Br
          </text>

          <text
            x="380"
            y="330"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
          >
            Propene + hydrogen bromide
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={electrophilicAdditionReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />
    </ReactionCanvasEngine>
  );
}
