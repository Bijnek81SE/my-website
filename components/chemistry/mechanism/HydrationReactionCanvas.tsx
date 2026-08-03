import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
  WaterStructure,
} from "../molecules";
import { hydrationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type HydrationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "protonation"
    | "carbocation"
    | "water-attack"
    | "oxonium"
    | "deprotonation"
    | "products";
  arrows: MechanismArrow[];
};

export type HydrationPracticeTarget =
  | "pi-bond"
  | "terminal-carbon"
  | "secondary-carbocation"
  | "water-nucleophile"
  | "oxonium-ion"
  | "water-base"
  | "markovnikov-alcohol"
  | "wrong-alcohol";

type HydrationReactionCanvasProps = {
  step: HydrationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: HydrationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.32)]";

const intermediateGlow =
  "drop-shadow-[0_0_12px_rgba(37,99,235,0.28)]";

const waterGlow =
  "drop-shadow-[0_0_10px_rgba(8,145,178,0.32)]";

export default function HydrationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydrationReactionCanvasProps) {
  const products = step.highlight === "products";

  const carbocation =
    step.highlight === "carbocation" ||
    step.highlight === "water-attack";

  const oxonium =
    step.highlight === "oxonium" ||
    step.highlight === "deprotonation";

  const scene = products
    ? "products"
    : step.highlight === "carbocation"
      ? "carbocation"
      : step.highlight === "water-attack"
        ? "water-attack"
        : step.highlight === "oxonium"
          ? "oxonium"
          : step.highlight === "deprotonation"
            ? "deprotonation"
            : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Acid-catalysed hydration mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="64"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              Choose the major product of propene + H₃O⁺
            </text>

            <g>
              <rect
                x="35"
                y="100"
                width="330"
                height="185"
                rx="22"
                fill="#ffffff"
                stroke="#3b82f6"
                strokeWidth="3"
              />

              <MarkovnikovPropaneStructure
                x={205}
                y={182}
                substituent="OH"
                scale={0.92}
              />

              <text
                x="200"
                y="252"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#1d4ed8"
                pointerEvents="none"
              >
                2-propanol
              </text>

              <text
                x="200"
                y="275"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#2563eb"
                pointerEvents="none"
              >
                Markovnikov product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="100"
                width="330"
                height="185"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <AntiMarkovnikovPropaneStructure
                x={555}
                y={182}
                substituent="OH"
                scale={0.92}
                substituentStroke="#64748b"
              />

              <text
                x="560"
                y="252"
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
                y="275"
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
              y="322"
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fill="#475569"
              pointerEvents="none"
            >
              Choose the alcohol formed through the secondary carbocation.
            </text>
          </>
        ) : (
          <>
            <rect
              x="135"
              y="105"
              width="490"
              height="185"
              rx="24"
              fill="#eff6ff"
              stroke="#3b82f6"
              strokeWidth="3"
            />

            <MarkovnikovPropaneStructure
              x={390}
              y={200}
              substituent="OH"
              scale={1.08}
            />

            <text
              x="380"
              y="263"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#1d4ed8"
              pointerEvents="none"
            >
              2-propanol · Markovnikov alcohol
            </text>
          </>
        )
      ) : oxonium ? (
        <>
          <g
            className={
              step.highlight === "oxonium"
                ? intermediateGlow
                : undefined
            }
          >
            <circle
              cx="390"
              cy="195"
              r="112"
              fill="#dbeafe"
              opacity="0.72"
            />

            <text
              x="390"
              y="208"
              textAnchor="middle"
              fontSize="38"
              fontWeight="700"
              fill="#1d4ed8"
              pointerEvents="none"
            >
              CH₃–CH(OH₂⁺)–CH₃
            </text>

            <text
              x="390"
              y="292"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#1e40af"
              pointerEvents="none"
            >
              protonated alcohol · oxonium ion
            </text>
          </g>

          {step.highlight === "deprotonation" ? (
            <g className={waterGlow}>
              <WaterStructure
                x={112}
                y={205}
                scale={1.08}
              >
                <circle
                  cx="-9"
                  cy="-34"
                  r="5"
                  fill="#0891b2"
                />

                <circle
                  cx="9"
                  cy="-34"
                  r="5"
                  fill="#0891b2"
                />
              </WaterStructure>
            </g>
          ) : null}
        </>
      ) : carbocation ? (
        <>
          <g
            className={
              step.highlight === "carbocation"
                ? intermediateGlow
                : undefined
            }
          >
            <circle
              cx="350"
              cy="195"
              r="94"
              fill="#dbeafe"
              opacity="0.68"
            />

            <text
              x="350"
              y="210"
              textAnchor="middle"
              fontSize="42"
              fontWeight="700"
              fill="#2563eb"
              pointerEvents="none"
            >
              CH₃–C⁺H–CH₃
            </text>

            <text
              x="350"
              y="286"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#1d4ed8"
              pointerEvents="none"
            >
              secondary carbocation
            </text>
          </g>

          {step.highlight === "water-attack" ? (
            <g className={waterGlow}>
              <WaterStructure
                x={585}
                y={195}
                scale={1.08}
              >
                <circle
                  cx="-9"
                  cy="-34"
                  r="5"
                  fill="#0891b2"
                />

                <circle
                  cx="9"
                  cy="-34"
                  r="5"
                  fill="#0891b2"
                />
              </WaterStructure>
            </g>
          ) : null}
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
            <PropeneStructure
              x={270}
              y={195}
              scale={1.35}
              piStroke={
                step.highlight === "alkene" ||
                step.highlight === "protonation"
                  ? "#2563eb"
                  : undefined
              }
              showCarbonLabels={
                step.highlight === "protonation"
              }
            />
          </g>

          {step.highlight === "protonation" ? (
            <text
              x="370"
              y="112"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#1d4ed8"
              pointerEvents="none"
            >
              terminal carbon receives H
            </text>
          ) : null}

          <text
            x="445"
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
            x="495"
            y="212"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            H
          </text>

          <line
            x1="522"
            y1="198"
            x2="564"
            y2="198"
            stroke={
              step.highlight === "protonation"
                ? "#0891b2"
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
            x="625"
            y="212"
            textAnchor="middle"
            fontSize="37"
            fontWeight="700"
            fill="#0891b2"
            pointerEvents="none"
          >
            OH₂⁺
          </text>

          <text
            x="380"
            y="310"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            propene + hydronium
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={hydrationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="360"
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