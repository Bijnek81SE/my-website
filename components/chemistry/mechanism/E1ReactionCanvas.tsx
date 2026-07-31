import { e1ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type E1MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "substrate"
    | "ionisation"
    | "carbocation"
    | "deprotonation"
    | "products";
  arrows: MechanismArrowData[];
};

export type E1PracticeTarget =
  | "tertiary-substrate"
  | "carbon-bromine-bond"
  | "carbocation"
  | "beta-hydrogen"
  | "water-base"
  | "alkene-product"
  | "bromide-product";

type E1ReactionCanvasProps = {
  step: E1MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: E1PracticeTarget) => void;
};

export default function E1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E1ReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation = step.highlight === "carbocation";
  const deprotonation = step.highlight === "deprotonation";

  const scene = products
    ? "products"
    : carbocation || deprotonation
      ? "carbocation"
      : step.highlight === "substrate" || step.highlight === "ionisation"
        ? "substrate"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`E1 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        <>
          <text x="115" y="215" fontSize="34" fontWeight="700" fill="#0f172a">
            CH₂=C(CH₃)₂
          </text>
          <text x="365" y="215" fontSize="28" fontWeight="700" fill="#64748b">+</text>
          <text x="420" y="215" fontSize="34" fontWeight="700" fill="#2563eb">H₃O⁺</text>
          <text x="545" y="215" fontSize="28" fontWeight="700" fill="#64748b">+</text>
          <text x="610" y="215" fontSize="34" fontWeight="700" fill="#dc2626">Br⁻</text>
        </>
      ) : (
        <>
          <text x="75" y="115" fontSize="28" fontWeight="700" fill="#2563eb">H₂O</text>
          <text x="250" y="220" fontSize="34" fontWeight="700" fill="#0f172a">CH₃</text>
          <line x1="335" y1="205" x2="385" y2="205" stroke="#0f172a" strokeWidth="5" />
          <text x="397" y="220" fontSize="38" fontWeight="800" fill={carbocation || deprotonation ? "#7c3aed" : "#0f172a"}>
            C{carbocation || deprotonation ? "⁺" : ""}
          </text>
          <line x1="450" y1="195" x2="505" y2="155" stroke="#0f172a" strokeWidth="5" />
          <text x="520" y="160" fontSize="30" fontWeight="700" fill="#0f172a">CH₃</text>
          <line x1="450" y1="215" x2="505" y2="255" stroke="#0f172a" strokeWidth="5" />
          <text x="520" y="270" fontSize="30" fontWeight="700" fill="#0f172a">CH₃</text>
          {!carbocation && !deprotonation ? (
            <>
              <line x1="455" y1="205" x2="535" y2="205" stroke={step.highlight === "ionisation" ? "#dc2626" : "#0f172a"} strokeWidth={step.highlight === "ionisation" ? 7 : 5} />
              <text x="555" y="218" fontSize="34" fontWeight="700" fill="#dc2626">Br</text>
            </>
          ) : (
            <text x="610" y="218" fontSize="34" fontWeight="700" fill="#dc2626">Br⁻</text>
          )}
          <text x="360" y="105" fontSize="26" fontWeight="700" fill="#0f172a">H</text>
          <line x1="390" y1="120" x2="414" y2="174" stroke={deprotonation ? "#2563eb" : "#0f172a"} strokeWidth={deprotonation ? 7 : 5} />
        </>
      )}

      <ReactionHotspotLayer
        data={e1ReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />
    </ReactionCanvasEngine>
  );
}
