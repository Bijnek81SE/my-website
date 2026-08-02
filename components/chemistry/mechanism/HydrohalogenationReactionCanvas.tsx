import {
  IsobutylChlorideStructure,
  TertButylCarbocationStructure,
  TertButylChlorideStructure,
  TwoMethylpropeneStructure,
} from "../molecules";
import { hydrohalogenationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type HydrohalogenationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight: "alkene" | "protonation" | "carbocation" | "halide-attack" | "products";
  arrows: MechanismArrowData[];
};

export type HydrohalogenationPracticeTarget =
  | "pi-bond"
  | "electrophilic-hydrogen"
  | "terminal-carbon"
  | "tertiary-carbocation"
  | "chloride"
  | "markovnikov-product"
  | "wrong-product";

type Props = {
  step: HydrohalogenationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (target: HydrohalogenationPracticeTarget) => void;
};

export default function HydrohalogenationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: Props) {
  const products = step.highlight === "products";
  const carbocation = step.highlight === "carbocation" || step.highlight === "halide-attack";
  const scene = products
    ? "products"
    : step.highlight === "carbocation"
      ? "carbocation"
      : step.highlight === "halide-attack"
        ? "halide-attack"
        : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Hydrohalogenation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        showProductChoices ? (
          <>
            <text x="380" y="58" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Choose the product of 2-methylpropene + HCl</text>
            <g>
              <rect x="35" y="90" width="330" height="205" rx="22" fill="#ffffff" stroke="#67e8f9" strokeWidth="3" />
              <TertButylChlorideStructure x={195} y={180} scale={0.8} />
              <text x="200" y="260" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0e7490">2-chloro-2-methylpropane</text>
              <text x="200" y="283" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">Markovnikov product</text>
            </g>
            <g>
              <rect x="395" y="90" width="330" height="205" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
              <IsobutylChlorideStructure x={545} y={180} scale={0.8} />
              <text x="560" y="260" textAnchor="middle" fontSize="16" fontWeight="700" fill="#475569">1-chloro-2-methylpropane</text>
              <text x="560" y="283" textAnchor="middle" fontSize="14" fontWeight="700" fill="#64748b">Less-favoured orientation</text>
            </g>
          </>
        ) : (
          <>
            <rect x="145" y="95" width="470" height="205" rx="24" fill="#ecfeff" stroke="#06b6d4" strokeWidth="3" />
            <TertButylChlorideStructure x={370} y={190} scale={1} />
            <text x="380" y="270" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0e7490">2-chloro-2-methylpropane</text>
          </>
        )
      ) : carbocation ? (
        <>
          <circle cx="350" cy="198" r="105" fill="#cffafe" opacity="0.62" />
          <TertButylCarbocationStructure x={350} y={198} scale={0.95} />
          <text x="575" y="214" textAnchor="middle" fontSize="43" fontWeight="700" fill="#15803d">Cl⁻</text>
          <circle cx="553" cy="160" r="5" fill="#15803d" />
          <circle cx="570" cy="151" r="5" fill="#15803d" />
          <circle cx="587" cy="160" r="5" fill="#15803d" />
          <circle cx="553" cy="235" r="5" fill="#15803d" />
          <circle cx="570" cy="244" r="5" fill="#15803d" />
          <circle cx="587" cy="235" r="5" fill="#15803d" />
          <text x="350" y="300" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0e7490">tertiary carbocation</text>
        </>
      ) : (
        <>
          <TwoMethylpropeneStructure
            x={340}
            y={195}
            scale={0.95}
            highlightBond={step.highlight === "alkene" || step.highlight === "protonation"}
          />
          <text x="535" y="210" fontSize="37" fontWeight="700" fill="#dc2626">H</text>
          <line x1="568" y1="196" x2="615" y2="196" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <text x="630" y="210" fontSize="37" fontWeight="700" fill="#15803d">Cl</text>
          <text x="365" y="300" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">2-methylpropene + HCl</text>
        </>
      )}

      <ReactionHotspotLayer data={hydrohalogenationReactionData} scene={scene} interactive={interactive} onTargetClick={onTargetClick} />
      <text x="380" y="355" textAnchor="middle" fontSize="17" fill="#475569">{step.note}</text>
    </ReactionCanvasEngine>
  );
}
