import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  MercuriniumIonStructure,
  OrganomercuryAlcoholStructure,
  PropeneStructure,
} from "../molecules";
import { oxymercurationDemercurationReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type OxymercurationDemercurationMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "reactants"
    | "mercurinium"
    | "water-attack"
    | "organomercury"
    | "demercuration"
    | "products";
  arrows: MechanismArrowData[];
};

export type OxymercurationDemercurationPracticeTarget =
  | "pi-bond"
  | "mercurinium-ion"
  | "water-nucleophile"
  | "internal-carbon"
  | "carbon-mercury-bond"
  | "markovnikov-alcohol"
  | "anti-markovnikov-alcohol";

type Props = {
  step: OxymercurationDemercurationMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (
    target: OxymercurationDemercurationPracticeTarget,
  ) => void;
};

export default function OxymercurationDemercurationReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: Props) {
  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Oxymercuration demercuration mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "products" ? (
        showProductChoices ? (
          <>
            <text x="380" y="56" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
              Choose the major product after 1. Hg(OAc)₂, H₂O  2. NaBH₄
            </text>
            <g>
              <rect x="35" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
              <MarkovnikovPropaneStructure x={215} y={180} substituent="OH" scale={0.9} substituentStroke="#7c3aed" />
              <text x="200" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6d28d9">
                2-propanol · Markovnikov
              </text>
            </g>
            <g>
              <rect x="395" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
              <AntiMarkovnikovPropaneStructure x={550} y={180} substituent="OH" scale={0.9} substituentStroke="#64748b" />
              <text x="560" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
                1-propanol · wrong regiochemistry
              </text>
            </g>
          </>
        ) : (
          <>
            <rect x="130" y="110" width="500" height="175" rx="24" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="3" />
            <MarkovnikovPropaneStructure x={400} y={192} substituent="OH" scale={1.15} substituentStroke="#7c3aed" />
            <text x="380" y="258" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6d28d9">
              2-propanol · Markovnikov alcohol
            </text>
          </>
        )
      ) : step.highlight === "mercurinium" ? (
        <MercuriniumIonStructure x={350} y={195} scale={1.05} />
      ) : step.highlight === "water-attack" ? (
        <>
          <MercuriniumIonStructure x={350} y={195} scale={1.05} />
          <text x="575" y="190" textAnchor="middle" fontSize="36" fontWeight="700" fill="#2563eb">
            H₂O
          </text>
          <text x="380" y="310" textAnchor="middle" fontSize="17" fontWeight="700" fill="#6d28d9">
            water attacks the more substituted carbon from the backside
          </text>
        </>
      ) : step.highlight === "organomercury" ? (
        <>
          <circle cx="380" cy="195" r="125" fill="#ede9fe" opacity="0.72" />
          <OrganomercuryAlcoholStructure x={365} y={195} scale={1.1} />
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#6d28d9">
            organomercury alcohol · OH on the internal carbon
          </text>
        </>
      ) : step.highlight === "demercuration" ? (
        <>
          <OrganomercuryAlcoholStructure x={350} y={195} scale={1.05} />
          <text x="575" y="235" textAnchor="middle" fontSize="28" fontWeight="700" fill="#059669">
            NaBH₄
          </text>
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#6d28d9">
            reduction replaces C–HgOAc with C–H
          </text>
        </>
      ) : (
        <>
          <PropeneStructure x={260} y={185} scale={1.35} piStroke="#7c3aed" showCarbonLabels />
          <text x="450" y="210" textAnchor="middle" fontSize="31" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="570" y="183" textAnchor="middle" fontSize="29" fontWeight="700" fill="#7c3aed">
            Hg(OAc)₂
          </text>
          <text x="570" y="225" textAnchor="middle" fontSize="28" fontWeight="700" fill="#2563eb">
            H₂O
          </text>
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">
            propene + mercury(II) acetate in water
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={oxymercurationDemercurationReactionData}
        scene={step.highlight}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />

      <text x="380" y="368" textAnchor="middle" fontSize="16" fill="#475569">
        {step.note}
      </text>
    </ReactionCanvasEngine>
  );
}
