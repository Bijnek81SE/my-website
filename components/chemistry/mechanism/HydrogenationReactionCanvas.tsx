import { hydrogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

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
  arrows: MechanismArrowData[];
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
  onTargetClick?: (target: HydrogenationPracticeTarget) => void;
};

export default function HydrogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydrogenationReactionCanvasProps) {
  const scene =
    step.highlight === "products"
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
      {step.highlight === "products" ? (
        showProductChoices ? (
          <>
            <text
              x="380"
              y="58"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#0f172a"
            >
              Choose the product of cyclohexene + H₂ / Pt
            </text>

            <g>
              <rect
                x="35"
                y="105"
                width="330"
                height="170"
                rx="22"
                fill="#ffffff"
                stroke="#10b981"
                strokeWidth="3"
              />
              <text
                x="200"
                y="165"
                textAnchor="middle"
                fontSize="27"
                fontWeight="700"
                fill="#0f172a"
              >
                cyclohexane
              </text>
              <text
                x="200"
                y="215"
                textAnchor="middle"
                fontSize="40"
                fontWeight="700"
                fill="#047857"
              >
                C₆H₁₂
              </text>
              <text
                x="200"
                y="250"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#047857"
              >
                Saturated alkane product
              </text>
            </g>

            <g>
              <rect
                x="395"
                y="105"
                width="330"
                height="170"
                rx="22"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="3"
              />
              <text
                x="560"
                y="165"
                textAnchor="middle"
                fontSize="27"
                fontWeight="700"
                fill="#0f172a"
              >
                cyclohexene
              </text>
              <text
                x="560"
                y="215"
                textAnchor="middle"
                fontSize="40"
                fontWeight="700"
                fill="#64748b"
              >
                C₆H₁₀
              </text>
              <text
                x="560"
                y="250"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="#64748b"
              >
                Unchanged starting alkene
              </text>
            </g>
          </>
        ) : (
          <>
            <rect
              x="125"
              y="108"
              width="510"
              height="175"
              rx="24"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="3"
            />
            <text
              x="380"
              y="170"
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
              fill="#0f172a"
            >
              cyclohexane
            </text>
            <text
              x="380"
              y="225"
              textAnchor="middle"
              fontSize="46"
              fontWeight="700"
              fill="#047857"
            >
              C₆H₁₂
            </text>
            <text
              x="380"
              y="260"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="#047857"
            >
              The C=C bond has been reduced to C–C
            </text>
          </>
        )
      ) : step.highlight === "hydrogen-activation" ? (
        <>
          <text
            x="245"
            y="175"
            textAnchor="middle"
            fontSize="38"
            fontWeight="700"
            fill="#0f172a"
          >
            cyclohexene
          </text>
          <line x1="185" y1="205" x2="305" y2="205" stroke="#0f172a" strokeWidth="5" />
          <line x1="185" y1="224" x2="305" y2="224" stroke="#059669" strokeWidth="5" />

          <line x1="85" y1="300" x2="675" y2="300" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
          <text x="380" y="340" textAnchor="middle" fontSize="18" fontWeight="700" fill="#475569">
            Pt catalyst surface
          </text>

          <text x="485" y="235" textAnchor="middle" fontSize="42" fontWeight="700" fill="#059669">
            H
          </text>
          <text x="585" y="235" textAnchor="middle" fontSize="42" fontWeight="700" fill="#059669">
            H
          </text>
          <line x1="485" y1="250" x2="485" y2="292" stroke="#059669" strokeWidth="4" />
          <line x1="585" y1="250" x2="585" y2="292" stroke="#059669" strokeWidth="4" />
          <text x="535" y="125" textAnchor="middle" fontSize="17" fontWeight="700" fill="#047857">
            H₂ dissociates into surface-bound H atoms
          </text>
        </>
      ) : step.highlight === "syn-addition" ? (
        <>
          <line x1="90" y1="315" x2="670" y2="315" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
          <text x="380" y="355" textAnchor="middle" fontSize="18" fontWeight="700" fill="#475569">
            Pt catalyst surface
          </text>

          <text x="380" y="182" textAnchor="middle" fontSize="40" fontWeight="700" fill="#0f172a">
            C = C
          </text>
          <text x="305" y="260" textAnchor="middle" fontSize="38" fontWeight="700" fill="#059669">
            H
          </text>
          <text x="455" y="260" textAnchor="middle" fontSize="38" fontWeight="700" fill="#059669">
            H
          </text>
          <line x1="305" y1="275" x2="305" y2="307" stroke="#059669" strokeWidth="4" />
          <line x1="455" y1="275" x2="455" y2="307" stroke="#059669" strokeWidth="4" />
          <text x="380" y="92" textAnchor="middle" fontSize="18" fontWeight="700" fill="#047857">
            Both hydrogens are delivered from the catalyst face
          </text>
        </>
      ) : (
        <>
          <text x="95" y="215" fontSize="42" fontWeight="700" fill="#0f172a">
            cyclohexene
          </text>
          <line x1="300" y1="187" x2="410" y2="187" stroke="#0f172a" strokeWidth="5" />
          <line x1="300" y1="207" x2="410" y2="207" stroke="#059669" strokeWidth="5" />
          <text x="450" y="215" fontSize="32" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="515" y="215" fontSize="42" fontWeight="700" fill="#059669">
            H–H
          </text>
          <text x="650" y="215" fontSize="28" fontWeight="700" fill="#475569">
            Pt
          </text>
          <text x="380" y="285" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">
            The alkene and hydrogen adsorb onto the metal catalyst
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
      >
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
