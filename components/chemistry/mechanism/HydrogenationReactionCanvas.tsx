import {
  CyclohexaneStructure,
  CyclohexeneStructure,
} from "../molecules";
import { hydrogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow } from "./types";

export type HydrogenationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "hydrogen-activation"
    | "syn-addition"
    | "products";
  arrows: MechanismArrow[];
};

export type HydrogenationPracticeTarget =
  | "pi-bond"
  | "hydrogen-molecule"
  | "catalyst-surface"
  | "same-face-hydrogens"
  | "alkane-product"
  | "unchanged-alkene";

type HydrogenationReactionCanvasProps = {
  step: HydrogenationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: HydrogenationPracticeTarget,
  ) => void;
};

const alkeneGlow =
  "drop-shadow-[0_0_10px_rgba(5,150,105,0.3)]";

const hydrogenGlow =
  "drop-shadow-[0_0_10px_rgba(5,150,105,0.38)]";

export default function HydrogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydrogenationReactionCanvasProps) {
  const products = step.highlight === "products";

  const scene = products
    ? "products"
    : step.highlight === "hydrogen-activation"
      ? "activated-hydrogen"
      : step.highlight === "syn-addition"
        ? "syn-addition"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Catalytic hydrogenation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
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
              Choose the product of cyclohexene + H₂ / Pt
            </text>

            <g>
              <rect
                x="35"
                y="80"
                width="330"
                height="215"
                rx="22"
                fill="#ffffff"
                stroke="#10b981"
                strokeWidth="3"
              />

              <CyclohexaneStructure
                x={200}
                y={170}
                scale={0.9}
              />

              <text
                x="200"
                y="260"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#047857"
                pointerEvents="none"
              >
                cyclohexane
              </text>

              <text
                x="200"
                y="283"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#059669"
                pointerEvents="none"
              >
                saturated product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="80"
                width="330"
                height="215"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              <CyclohexeneStructure
                x={560}
                y={170}
                scale={0.9}
                stroke="#64748b"
              />

              <text
                x="560"
                y="260"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                cyclohexene
              </text>

              <text
                x="560"
                y="283"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#64748b"
                pointerEvents="none"
              >
                unchanged alkene
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
              Hydrogenation converts the C=C bond into a C–C bond.
            </text>
          </>
        ) : (
          <>
            <rect
              x="145"
              y="80"
              width="470"
              height="220"
              rx="24"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="3"
            />

            <CyclohexaneStructure
              x={380}
              y={165}
              scale={1.02}
            />

            <text
              x="380"
              y="265"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#047857"
              pointerEvents="none"
            >
              cyclohexane · saturated product
            </text>

            <text
              x="380"
              y="290"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              the C=C bond has been reduced to C–C
            </text>
          </>
        )
      ) : step.highlight === "hydrogen-activation" ? (
        <>
          <CyclohexeneStructure
            x={235}
            y={185}
            scale={0.9}
            highlightBond
          />

          <text
            x="235"
            y="275"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            adsorbed cyclohexene
          </text>

          <line
            x1="70"
            y1="310"
            x2="690"
            y2="310"
            stroke="#475569"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <text
            x="380"
            y="350"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            Pt catalyst surface
          </text>

          <g className={hydrogenGlow}>
            <text
              x="490"
              y="220"
              textAnchor="middle"
              fontSize="38"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              H
            </text>

            <text
              x="585"
              y="220"
              textAnchor="middle"
              fontSize="38"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              H
            </text>

            <line
              x1="490"
              y1="235"
              x2="490"
              y2="302"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              x1="585"
              y1="235"
              x2="585"
              y2="302"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          <text
            x="538"
            y="108"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#047857"
            pointerEvents="none"
          >
            H₂ dissociates into two surface-bound hydrogen atoms
          </text>
        </>
      ) : step.highlight === "syn-addition" ? (
        <>
          <text
            x="380"
            y="72"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#047857"
            pointerEvents="none"
          >
            Both hydrogens are delivered from the catalyst face
          </text>

          <CyclohexeneStructure
            x={380}
            y={170}
            scale={0.92}
            highlightBond
          />

          <g className={hydrogenGlow}>
            <text
              x="315"
              y="265"
              textAnchor="middle"
              fontSize="34"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              H
            </text>

            <text
              x="445"
              y="265"
              textAnchor="middle"
              fontSize="34"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              H
            </text>

            <line
              x1="315"
              y1="278"
              x2="315"
              y2="307"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <line
              x1="445"
              y1="278"
              x2="445"
              y2="307"
              stroke="#059669"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          <line
            x1="90"
            y1="315"
            x2="670"
            y2="315"
            stroke="#475569"
            strokeWidth="14"
            strokeLinecap="round"
          />

          <text
            x="380"
            y="355"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            Pt catalyst surface
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
              x={230}
              y={190}
              scale={1}
              highlightBond={
                step.highlight === "alkene"
              }
            />
          </g>

          <text
            x="230"
            y="285"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            cyclohexene
          </text>

          <text
            x="405"
            y="208"
            textAnchor="middle"
            fontSize="31"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <g className={hydrogenGlow}>
            <text
              x="520"
              y="208"
              textAnchor="middle"
              fontSize="42"
              fontWeight="700"
              fill="#059669"
              pointerEvents="none"
            >
              H–H
            </text>
          </g>

          <text
            x="645"
            y="208"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#475569"
            pointerEvents="none"
          >
            Pt
          </text>

          <text
            x="380"
            y="320"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            cyclohexene and hydrogen adsorb onto the metal catalyst
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={hydrogenationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text
        x="380"
        y="382"
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