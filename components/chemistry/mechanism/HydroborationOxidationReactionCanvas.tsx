import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { hydroborationOxidationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type HydroborationOxidationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "reactants"
    | "hydroboration"
    | "organoborane"
    | "oxidation"
    | "products";
  arrows: MechanismArrowData[];
};

export type HydroborationOxidationPracticeTarget =
  | "pi-bond"
  | "terminal-carbon"
  | "organoborane-intermediate"
  | "carbon-boron-bond"
  | "anti-markovnikov-alcohol"
  | "markovnikov-alcohol";

type Props = {
  step: HydroborationOxidationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (target: HydroborationOxidationPracticeTarget) => void;
};

function OrganoboraneStructure({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="-92,28 -34,-4 30,28"
        fill="none"
        stroke="#0f172a"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="30" y1="28" x2="80" y2="-4" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
      <text x="92" y="-22" textAnchor="middle" fontSize="27" fontWeight="700" fill="#0891b2">
        BH₂
      </text>
      <text x="-34" y="-36" textAnchor="middle" fontSize="22" fontWeight="700" fill="#059669">
        H
      </text>
    </g>
  );
}

export default function HydroborationOxidationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: Props) {
  const scene = step.highlight;

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Hydroboration oxidation mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "products" ? (
        showProductChoices ? (
          <>
            <text x="380" y="54" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
              Choose the major product after 1. BH₃·THF  2. H₂O₂, OH⁻
            </text>

            <g>
              <rect x="35" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#06b6d4" strokeWidth="3" />
              <AntiMarkovnikovPropaneStructure x={205} y={180} substituent="OH" scale={0.9} substituentStroke="#0891b2" />
              <text x="200" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0e7490">
                1-propanol · anti-Markovnikov
              </text>
            </g>

            <g>
              <rect x="395" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
              <MarkovnikovPropaneStructure x={560} y={180} substituent="OH" scale={0.9} substituentStroke="#64748b" />
              <text x="560" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
                2-propanol · wrong regiochemistry
              </text>
            </g>
          </>
        ) : (
          <>
            <rect x="135" y="102" width="490" height="185" rx="24" fill="#ecfeff" stroke="#06b6d4" strokeWidth="3" />
            <AntiMarkovnikovPropaneStructure x={395} y={192} substituent="OH" scale={1.15} substituentStroke="#0891b2" />
            <text x="380" y="263" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0e7490">
              1-propanol · anti-Markovnikov alcohol
            </text>
          </>
        )
      ) : step.highlight === "organoborane" ? (
        <>
          <circle cx="380" cy="195" r="118" fill="#cffafe" opacity="0.72" />
          <OrganoboraneStructure x={365} y={195} scale={1.25} />
          <text x="380" y="300" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0e7490">
            organoborane intermediate · B on the terminal carbon
          </text>
        </>
      ) : step.highlight === "oxidation" ? (
        <>
          <OrganoboraneStructure x={350} y={195} scale={1.15} />
          <text x="555" y="185" textAnchor="middle" fontSize="31" fontWeight="700" fill="#2563eb">
            H₂O₂
          </text>
          <text x="555" y="222" textAnchor="middle" fontSize="25" fontWeight="700" fill="#64748b">
            OH⁻
          </text>
          <text x="380" y="302" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0e7490">
            oxidation replaces the C–B bond with C–OH
          </text>
        </>
      ) : (
        <>
          <PropeneStructure
            x={270}
            y={180}
            scale={1.35}
            piStroke="#0891b2"
            showCarbonLabels={step.highlight === "hydroboration"}
          />
          <text x="460" y="208" textAnchor="middle" fontSize="31" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="568" y="208" textAnchor="middle" fontSize="37" fontWeight="700" fill="#0891b2">
            BH₃
          </text>
          <text x="620" y="208" textAnchor="middle" fontSize="20" fontWeight="700" fill="#64748b">
            THF
          </text>
          <text x="380" y="304" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">
            {step.highlight === "hydroboration"
              ? "B approaches the terminal carbon while H approaches the internal carbon"
              : "propene + borane–THF"}
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={hydroborationOxidationReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text x="380" y="368" textAnchor="middle" fontSize="16" fill="#475569">
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
