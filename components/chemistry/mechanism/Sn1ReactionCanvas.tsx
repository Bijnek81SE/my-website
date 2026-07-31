import MoleculeCanvas from "../MoleculeCanvas";
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
  onTargetClick?: (target: Sn1PracticeTarget) => void;
};

const glow =
  "drop-shadow-[0_0_10px_rgba(124,58,237,0.35)]";


export default function Sn1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn1ReactionCanvasProps) {
  const product = step.highlight === "product";

  const carbocation = [
    "carbocation",
    "nucleophile",
    "deprotonation",
  ].includes(step.highlight);

  const oxonium = step.highlight === "deprotonation";

  const bonds = [
    {
      id: "carbon-bromine-bond",
      from: { x: 430, y: 205 },
      to: { x: 505, y: 205 },
      stroke:
        step.highlight === "leaving-group"
          ? "#dc2626"
          : "#0f172a",
      strokeWidth:
        step.highlight === "leaving-group" ? 7 : 5,
    },
  ];


  const scene = product ? "products" : oxonium ? "deprotonation" : step.highlight === "nucleophile" ? "nucleophile" : carbocation ? "carbocation" : "substrate";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`SN1 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >

        {product ? (
          <>
            <text
              x="190"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              (CH₃)₃COH
            </text>

            <text
              x="445"
              y="220"
              fontSize="30"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              +
            </text>

            <text
              x="500"
              y="220"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>
          </>
        ) : carbocation ? (
          <>
            {step.highlight === "nucleophile" ? (
              <g className={glow}>
                <text
                  x="82"
                  y="205"
                  fontSize="40"
                  fontWeight="700"
                  fill="#2563eb"
                  pointerEvents="none"
                >
                  H₂O
                </text>

                <circle
                  cx="126"
                  cy="154"
                  r="5"
                  fill="#2563eb"
                  pointerEvents="none"
                />

                <circle
                  cx="143"
                  cy="154"
                  r="5"
                  fill="#2563eb"
                  pointerEvents="none"
                />
              </g>
            ) : null}

            {oxonium ? (
              <>
                <text
                  x="315"
                  y="215"
                  fontSize="42"
                  fontWeight="700"
                  fill="#0f172a"
                  pointerEvents="none"
                >
                  (CH₃)₃C–OH₂⁺
                </text>

                <text
                  x="80"
                  y="285"
                  fontSize="34"
                  fontWeight="700"
                  fill="#2563eb"
                  pointerEvents="none"
                >
                  H₂O
                </text>
              </>
            ) : (
              <>
                <text
                  x="300"
                  y="215"
                  fontSize="46"
                  fontWeight="700"
                  fill="#7c3aed"
                  pointerEvents="none"
                  className={
                    step.highlight === "carbocation"
                      ? glow
                      : undefined
                  }
                >
                  (CH₃)₃C⁺
                </text>
              </>
            )}

            <text
              x="565"
              y="215"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>
          </>
        ) : (
          <>
            <text
              x="270"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill={
                step.highlight === "substrate"
                  ? "#7c3aed"
                  : "#0f172a"
              }
              pointerEvents="none"
              className={
                step.highlight === "substrate"
                  ? glow
                  : undefined
              }
            >
              (CH₃)₃C
            </text>

            <MoleculeCanvas bonds={bonds} />

            <text
              x="515"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br
            </text>
          </>
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
