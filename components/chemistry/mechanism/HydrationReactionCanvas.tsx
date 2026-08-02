import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { hydrationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

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
  arrows: MechanismArrowData[];
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
  onTargetClick?: (target: HydrationPracticeTarget) => void;
};

export default function HydrationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: HydrationReactionCanvasProps) {
  const scene =
    step.highlight === "products"
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

  const products = step.highlight === "products";
  const carbocation =
    step.highlight === "carbocation" || step.highlight === "water-attack";
  const oxonium =
    step.highlight === "oxonium" || step.highlight === "deprotonation";

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
            <text x="380" y="66" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
              Choose the major product of propene + H₃O⁺
            </text>

            <g>
              <rect x="35" y="108" width="330" height="165" rx="22" fill="#ffffff" stroke="#93c5fd" strokeWidth="3" />
              <MarkovnikovPropaneStructure x={220} y={188} substituent="OH" scale={0.9} />
              <text x="200" y="246" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1d4ed8">
                2-propanol · Markovnikov product
              </text>
            </g>

            <g>
              <rect x="395" y="108" width="330" height="165" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
              <AntiMarkovnikovPropaneStructure x={540} y={188} substituent="OH" scale={0.9} />
              <text x="560" y="246" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
                1-propanol · wrong regiochemistry
              </text>
            </g>
          </>
        ) : (
          <>
            <rect x="130" y="115" width="500" height="165" rx="24" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
            <MarkovnikovPropaneStructure x={400} y={194} substituent="OH" scale={1.15} />
            <text x="380" y="255" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1d4ed8">
              2-propanol · Markovnikov alcohol
            </text>
          </>
        )
      ) : oxonium ? (
        <>
          <circle cx="370" cy="198" r="112" fill="#dbeafe" opacity="0.72" />
          <text x="370" y="212" textAnchor="middle" fontSize="38" fontWeight="700" fill="#1d4ed8">
            CH₃–CH(OH₂⁺)–CH₃
          </text>
          <text x="105" y="212" textAnchor="middle" fontSize="34" fontWeight="700" fill="#0891b2">
            H₂O
          </text>
          <circle cx="86" cy="164" r="5" fill="#0891b2" />
          <circle cx="103" cy="154" r="5" fill="#0891b2" />
          <circle cx="120" cy="164" r="5" fill="#0891b2" />
          <text x="370" y="292" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1e40af">
            protonated alcohol (oxonium ion)
          </text>
        </>
      ) : carbocation ? (
        <>
          <circle cx="355" cy="198" r="92" fill="#dbeafe" opacity="0.68" />
          <text x="355" y="214" textAnchor="middle" fontSize="43" fontWeight="700" fill="#2563eb">
            CH₃–C⁺H–CH₃
          </text>
          <text x="585" y="214" textAnchor="middle" fontSize="38" fontWeight="700" fill="#0891b2">
            H₂O
          </text>
          <circle cx="565" cy="161" r="5" fill="#0891b2" />
          <circle cx="582" cy="151" r="5" fill="#0891b2" />
          <circle cx="599" cy="161" r="5" fill="#0891b2" />
          <text x="355" y="286" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1d4ed8">
            secondary carbocation
          </text>
        </>
      ) : (
        <>
          <PropeneStructure
            x={270}
            y={198}
            scale={1.35}
            piStroke="#2563eb"
          />
          <text x="485" y="212" fontSize="37" fontWeight="700" fill="#dc2626">H</text>
          <line x1="518" y1="197" x2="560" y2="197" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <text x="574" y="212" fontSize="37" fontWeight="700" fill="#0891b2">OH₂⁺</text>
          <text x="310" y="286" textAnchor="middle" fontSize="17" fontWeight="600" fill="#475569">
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

      <text x="380" y="355" textAnchor="middle" fontSize="17" fill="#475569">
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
