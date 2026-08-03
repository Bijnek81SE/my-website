import {
  TertButanolStructure,
  TertButylBromideStructure,
  TertButylCarbocationStructure,
  TertButylOxoniumStructure,
  WaterStructure,
} from "../molecules";
import { sn1ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismStep } from "./types";

export type Sn1PracticeTarget =
  | "tertiary-substrate"
  | "carbon-bromine-bond"
  | "carbocation"
  | "water-nucleophile"
  | "base-water"
  | "alcohol-product"
  | "bromide-product";

type Sn1ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (
    target: Sn1PracticeTarget,
  ) => void;
};

const carbocationGlow =
  "drop-shadow-[0_0_10px_rgba(124,58,237,0.35)]";

const waterGlow =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

export default function Sn1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn1ReactionCanvasProps) {
  const product = step.highlight === "product";
  const nucleophile =
    step.highlight === "nucleophile";
  const deprotonation =
    step.highlight === "deprotonation";

  const showCarbocation =
    step.highlight === "carbocation" ||
    nucleophile ||
    deprotonation;

  const scene = product
    ? "products"
    : deprotonation
      ? "deprotonation"
      : nucleophile
        ? "nucleophile"
        : showCarbocation
          ? "carbocation"
          : "substrate";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`SN1 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {product ? (
        <>
          <TertButanolStructure
            x={275}
            y={205}
            scale={0.84}
          />

          <text
            x="430"
            y="218"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="505"
            y="218"
            textAnchor="middle"
            fontSize="35"
            fontWeight="700"
            fill="#2563eb"
            pointerEvents="none"
          >
            H₃O⁺
          </text>

          <text
            x="575"
            y="218"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            +
          </text>

          <text
            x="640"
            y="218"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>

          <text
            x="380"
            y="304"
            textAnchor="middle"
            fontSize="17"
            fontWeight="600"
            fill="#475569"
            pointerEvents="none"
          >
            tert-butanol, hydronium, and bromide
          </text>
        </>
      ) : showCarbocation ? (
        <>
          {nucleophile ? (
            <g className={waterGlow}>
              <WaterStructure
                x={122}
                y={195}
                scale={1.15}
              >
                <circle
                  cx="-9"
                  cy="-36"
                  r="5"
                  fill="#2563eb"
                />

                <circle
                  cx="9"
                  cy="-36"
                  r="5"
                  fill="#2563eb"
                />
              </WaterStructure>
            </g>
          ) : null}

          {deprotonation ? (
            <>
              <TertButylOxoniumStructure
                x={345}
                y={205}
                scale={0.84}
              />

              <g className={waterGlow}>
                <WaterStructure
                  x={118}
                  y={274}
                  scale={1.05}
                >
                  <circle
                    cx="-9"
                    cy="-34"
                    r="5"
                    fill="#2563eb"
                  />

                  <circle
                    cx="9"
                    cy="-34"
                    r="5"
                    fill="#2563eb"
                  />
                </WaterStructure>
              </g>
            </>
          ) : (
            <g
              className={
                step.highlight === "carbocation"
                  ? carbocationGlow
                  : undefined
              }
            >
              <TertButylCarbocationStructure
                x={365}
                y={205}
                scale={0.88}
              />
            </g>
          )}

          <text
            x="610"
            y="218"
            textAnchor="middle"
            fontSize="39"
            fontWeight="700"
            fill="#dc2626"
            pointerEvents="none"
          >
            Br⁻
          </text>
        </>
      ) : (
        <g
          className={
            step.highlight === "substrate"
              ? carbocationGlow
              : undefined
          }
        >
          <TertButylBromideStructure
            x={390}
            y={205}
            scale={0.95}
            highlightBond={
              step.highlight === "leaving-group"
            }
          />
        </g>
      )}

      <ReactionHotspotLayer
        data={sn1ReactionData}
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