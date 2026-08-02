import {
  MethanolStructure,
  MethylBromideStructure,
} from "../molecules";
import { sn2ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismStep } from "./types";

export type Sn2PracticeTarget =
  | "oxygen"
  | "carbon"
  | "bromine"
  | "carbon-bromine-bond"
  | "product-bromide";

type Sn2ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: Sn2PracticeTarget) => void;
};

const highlightClass =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

export default function Sn2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn2ReactionCanvasProps) {
  const showProduct = step.highlight === "product";
  const scene = showProduct ? "products" : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 390"
      ariaLabel={`SN2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {!showProduct ? (
        <>
          <g className={step.highlight === "nucleophile" ? highlightClass : undefined}>
            <text x="82" y="225" fontSize="42" fontWeight="700" fill="#2563eb" pointerEvents="none">⁻OH</text>
            <circle cx="112" cy="170" r="6" fill="#2563eb" opacity={step.highlight === "nucleophile" ? 1 : 0.45} pointerEvents="none" />
            <circle cx="130" cy="170" r="6" fill="#2563eb" opacity={step.highlight === "nucleophile" ? 1 : 0.45} pointerEvents="none" />
          </g>

          <g className={step.highlight === "leaving-group" ? highlightClass : undefined}>
            <MethylBromideStructure
              x={408}
              y={208}
              scale={1.05}
              highlightBond={step.highlight === "substrate"}
            />
          </g>
        </>
      ) : (
        <>
          <MethanolStructure x={300} y={205} scale={1.15} />
          <text x="410" y="220" fontSize="34" fontWeight="700" fill="#64748b" pointerEvents="none">+</text>
          <text x="478" y="220" fontSize="46" fontWeight="700" fill="#dc2626" pointerEvents="none">Br⁻</text>
          <text x="380" y="285" textAnchor="middle" fontSize="18" fill="#475569" pointerEvents="none">Substitution product and bromide leaving group</text>
        </>
      )}

      <ReactionHotspotLayer
        data={sn2ReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text x="380" y="350" textAnchor="middle" fontSize="17" fill="#475569" pointerEvents="none">{step.note}</text>
    </ReactionCanvasEngine>
  );
}
