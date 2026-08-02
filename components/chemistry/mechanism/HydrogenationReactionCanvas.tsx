import {
  CyclohexaneStructure,
  CyclohexeneStructure,
} from "../molecules";
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
            <text x="380" y="48" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
              Choose the product of cyclohexene + H₂ / Pt
            </text>

            <g>
              <rect x="35" y="82" width="330" height="205" rx="22" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
              <CyclohexaneStructure x={200} y={170} scale={0.92} />
              <text x="200" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#047857">
                cyclohexane · saturated product
              </text>
            </g>

            <g>
              <rect x="395" y="82" width="330" height="205" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
              <CyclohexeneStructure x={560} y={170} scale={0.92} stroke="#64748b" />
              <text x="560" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
                unchanged cyclohexene
              </text>
            </g>
          </>
        ) : (
          <>
            <rect x="155" y="75" width="450" height="225" rx="24" fill="#ecfdf5" stroke="#10b981" strokeWidth="3" />
            <CyclohexaneStructure x={380} y={174} scale={1.12} />
            <text x="380" y="275" textAnchor="middle" fontSize="18" fontWeight="700" fill="#047857">
              cyclohexane · the C=C bond has been reduced to C–C
            </text>
          </>
        )
      ) : step.highlight === "hydrogen-activation" ? (
        <>
          <CyclohexeneStructure x={235} y={190} scale={0.9} highlightBond />
          <text x="235" y="278" textAnchor="middle" fontSize="16" fontWeight="700" fill="#475569">
            adsorbed cyclohexene
          </text>

          <line x1="75" y1="310" x2="685" y2="310" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
          <text x="380" y="350" textAnchor="middle" fontSize="18" fontWeight="700" fill="#475569">
            Pt catalyst surface
          </text>

          <text x="490" y="225" textAnchor="middle" fontSize="38" fontWeight="700" fill="#059669">H</text>
          <text x="585" y="225" textAnchor="middle" fontSize="38" fontWeight="700" fill="#059669">H</text>
          <line x1="490" y1="240" x2="490" y2="302" stroke="#059669" strokeWidth="4" />
          <line x1="585" y1="240" x2="585" y2="302" stroke="#059669" strokeWidth="4" />
          <text x="538" y="112" textAnchor="middle" fontSize="17" fontWeight="700" fill="#047857">
            H₂ dissociates into surface-bound hydrogen atoms
          </text>
        </>
      ) : step.highlight === "syn-addition" ? (
        <>
          <text x="380" y="72" textAnchor="middle" fontSize="18" fontWeight="700" fill="#047857">
            Both hydrogens are delivered from the catalyst face
          </text>
          <CyclohexeneStructure x={380} y={175} scale={0.95} highlightBond />
          <text x="305" y="260" textAnchor="middle" fontSize="34" fontWeight="700" fill="#059669">H</text>
          <text x="455" y="260" textAnchor="middle" fontSize="34" fontWeight="700" fill="#059669">H</text>
          <line x1="305" y1="274" x2="305" y2="307" stroke="#059669" strokeWidth="4" />
          <line x1="455" y1="274" x2="455" y2="307" stroke="#059669" strokeWidth="4" />
          <line x1="90" y1="315" x2="670" y2="315" stroke="#475569" strokeWidth="14" strokeLinecap="round" />
          <text x="380" y="355" textAnchor="middle" fontSize="18" fontWeight="700" fill="#475569">
            Pt catalyst surface
          </text>
        </>
      ) : (
        <>
          <CyclohexeneStructure
            x={230}
            y={195}
            scale={1.05}
            highlightBond={step.highlight === "alkene"}
          />
          <text x="230" y="292" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">
            cyclohexene
          </text>

          <text x="405" y="210" textAnchor="middle" fontSize="32" fontWeight="700" fill="#64748b">+</text>
          <text x="520" y="210" textAnchor="middle" fontSize="42" fontWeight="700" fill="#059669">H–H</text>
          <text x="645" y="210" textAnchor="middle" fontSize="28" fontWeight="700" fill="#475569">Pt</text>
          <text x="380" y="322" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">
            Alkene and hydrogen adsorb onto the metal catalyst
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={hydrogenationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text x="380" y="382" textAnchor="middle" fontSize="16" fill="#475569">
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
