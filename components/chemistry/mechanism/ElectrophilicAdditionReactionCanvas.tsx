import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { electrophilicAdditionReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

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
  arrows: MechanismArrow[];
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

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(225,29,72,0.3)]";

const carbocationGlow =
  "drop-shadow-[0_0_12px_rgba(124,58,237,0.32)]";

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
              y="66"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              Choose the product of propene + HBr
            </text>

            <g>
              <rect
                x="35"
                y="105"
                width="330"
                height="175"
                rx="22"
                fill="#ffffff"
                stroke="#fb7185"
                strokeWidth="3"
              />

              <MarkovnikovPropaneStructure
                x={205}
                y={185}
                substituent="Br"
                scale={0.92}
              />

              <text
                x="200"
                y="250"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#be123c"
                pointerEvents="none"
              >
                2-bromopropane
              </text>

              <text
                x="200"
                y="272"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#e11d48"
                pointerEvents="none"
              >
                Markovnikov product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="105"
                width="330"
                height="175"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <AntiMarkovnikovPropaneStructure
                x={555}
                y={185}
                substituent="Br"
                scale={0.92}
                substituentStroke="#64748b"
              />

              <text
                x="560"
                y="250"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                1-bromopropane
              </text>

              <text
                x="560"
                y="272"
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
              y="320"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
              pointerEvents="none"
            >
              Choose the product formed through the secondary carbocation.
            </text>
          </>
        ) : (
          <>
            <rect
              x="145"
              y="110"
              width="470"
              height="180"
              rx="24"
              fill="#fff1f2"
              stroke="#fb7185"
              strokeWidth="3"
            />

            <MarkovnikovPropaneStructure
              x={390}
              y={190}
              substituent="Br"
              scale={1.15}
            />

            <text
              x="380"
              y="258"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#be123c"
              pointerEvents="none"
            >
              2-bromopropane · Markovnikov product
            </text>
          </>
        )
      ) : carbocation ? (
        <>
          <g
            className={
              step.highlight === "carbocation"
                ? carbocationGlow
                : undefined
            }
          >
            <circle
              cx="350"
              cy="195"
              r="92"
              fill="#ede9fe"
              opacity="0.72"
            />

            <text
              x="350"
              y="208"
              textAnchor="middle"
              fontSize="40"
              fontWeight="700"
              fill="#7c3aed"
              pointerEvents="none"
            >
              CH₃–C⁺H–CH₃
            </text>

            <text
              x="350"
              y="132"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#6d28d9"
              pointerEvents="none"
            >
              secondary carbocation
            </text>
          </g>

          <text
            x="585"
            y="210"
            textAnchor="middle"
            fontSize="41"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <circle
            cx="565"
            cy="155"
            r="5"
            fill="#dc2626"
            pointerEvents="none"
          />

          <circle
            cx="583"
            cy="146"
            r="5"
            fill="#dc2626"
            pointerEvents="none"
          />

          <circle
            cx="601"
            cy="155"
            r="5"
            fill="#dc2626"
            pointerEvents="none"
          />

          <text
            x="380"
            y="300"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            Bromide attacks the positively charged internal carbon
          </text>
        </>
      ) : (
        <>
          {step.highlight === "protonation" ? (
            <>
              <circle
                cx="372"
                cy="222"
                r="52"
                fill="#fff1f2"
                stroke="#fb7185"
                strokeWidth="3"
              />

              <text
                x="372"
                y="118"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#be123c"
                pointerEvents="none"
              >
                terminal carbon receives H
              </text>
            </>
          ) : null}

          <g
            className={
              step.highlight === "alkene"
                ? alkeneGlow
                : undefined
            }
          >
            <PropeneStructure
              x={300}
              y={195}
              scale={1.35}
              piStroke={
                step.highlight === "alkene" ||
                step.highlight === "protonation"
                  ? "#e11d48"
                  : undefined
              }
              showCarbonLabels={
                step.highlight === "protonation"
              }
            />
          </g>

          <text
            x="495"
            y="212"
            textAnchor="middle"
            fontSize="29"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="550"
            y="212"
            textAnchor="middle"
            fontSize="39"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H
          </text>

          <line
            x1="575"
            y1="198"
            x2="620"
            y2="198"
            stroke={
              step.highlight === "protonation"
                ? "#dc2626"
                : "#0f172a"
            }
            strokeWidth={
              step.highlight === "protonation"
                ? 7
                : 5
            }
            strokeLinecap="round"
          />

          <text
            x="650"
            y="212"
            textAnchor="middle"
            fontSize="39"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br
          </text>

          <text
            x="380"
            y="315"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            propene + hydrogen bromide
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={electrophilicAdditionReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="365"
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