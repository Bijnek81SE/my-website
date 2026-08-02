import {
  AntiMarkovnikovPropaneStructure,
  MarkovnikovPropaneStructure,
  PropeneStructure,
} from "../molecules";
import { radicalHBrReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type RadicalHBrMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "initiation"
    | "bromine-radical"
    | "propagation-one"
    | "radical-intermediate"
    | "propagation-two"
    | "products";
  arrows: MechanismArrowData[];
};

export type RadicalHBrPracticeTarget =
  | "peroxide-bond"
  | "bromine-radical"
  | "terminal-carbon"
  | "carbon-radical"
  | "hbr"
  | "anti-markovnikov-bromide"
  | "markovnikov-bromide";

type Props = {
  step: RadicalHBrMechanismStep;
  animated: boolean;
  interactive?: boolean;
  showProductChoices?: boolean;
  onTargetClick?: (target: RadicalHBrPracticeTarget) => void;
};

function RadicalDot({ x, y, colour = "#e11d48" }: { x: number; y: number; colour?: string }) {
  return <circle cx={x} cy={y} r="5" fill={colour} />;
}

function CarbonRadicalIntermediate({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
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
      <line x1="30" y1="28" x2="84" y2="-4" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
      <text x="112" y="-8" textAnchor="middle" fontSize="27" fontWeight="700" fill="#dc2626">
        Br
      </text>
      <RadicalDot x={-34} y={-30} />
      <text x="112" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="#be123c">
        secondary radical
      </text>
    </g>
  );
}

export default function RadicalHBrReactionCanvas({
  step,
  animated,
  interactive = false,
  showProductChoices = false,
  onTargetClick,
}: Props) {
  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Radical HBr addition mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {step.highlight === "initiation" ? (
        <>
          <text x="380" y="76" textAnchor="middle" fontSize="21" fontWeight="700" fill="#be123c">
            initiation · heat or light
          </text>
          <text x="260" y="205" textAnchor="middle" fontSize="36" fontWeight="700" fill="#0f172a">
            RO
          </text>
          <line x1="300" y1="190" x2="460" y2="190" stroke="#e11d48" strokeWidth="7" strokeLinecap="round" />
          <text x="500" y="205" textAnchor="middle" fontSize="36" fontWeight="700" fill="#0f172a">
            OR
          </text>
          <text x="380" y="288" textAnchor="middle" fontSize="18" fontWeight="700" fill="#be123c">
            homolytic cleavage of the peroxide O–O bond
          </text>
        </>
      ) : step.highlight === "bromine-radical" ? (
        <>
          <text x="235" y="205" textAnchor="middle" fontSize="34" fontWeight="700" fill="#059669">
            RO•
          </text>
          <text x="350" y="205" textAnchor="middle" fontSize="30" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="470" y="205" textAnchor="middle" fontSize="34" fontWeight="700" fill="#0f172a">
            H–Br
          </text>
          <text x="620" y="205" textAnchor="middle" fontSize="38" fontWeight="700" fill="#dc2626">
            Br•
          </text>
          <text x="380" y="290" textAnchor="middle" fontSize="18" fontWeight="700" fill="#be123c">
            the chain-carrying bromine radical is generated
          </text>
        </>
      ) : step.highlight === "propagation-one" ? (
        <>
          <PropeneStructure x={270} y={190} scale={1.35} piStroke="#7c3aed" showCarbonLabels />
          <text x="455" y="210" textAnchor="middle" fontSize="31" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="570" y="205" textAnchor="middle" fontSize="40" fontWeight="700" fill="#dc2626">
            Br•
          </text>
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#be123c">
            Br adds to the terminal carbon, leaving the radical internally
          </text>
        </>
      ) : step.highlight === "radical-intermediate" ? (
        <>
          <circle cx="309" cy="191" r="7" fill="#ffe4e6" opacity="0.72" />
          <CarbonRadicalIntermediate x={365} y={195} scale={1.3} />
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#be123c">
            the more stable secondary radical intermediate
          </text>
        </>
      ) : step.highlight === "propagation-two" ? (
        <>
          <CarbonRadicalIntermediate x={315} y={195} scale={1.1} />
          <text x="520" y="205" textAnchor="middle" fontSize="31" fontWeight="700" fill="#64748b">
            +
          </text>
          <text x="620" y="205" textAnchor="middle" fontSize="34" fontWeight="700" fill="#0f172a">
            H–Br
          </text>
          <text x="380" y="305" textAnchor="middle" fontSize="17" fontWeight="700" fill="#be123c">
            hydrogen abstraction forms product and regenerates Br•
          </text>
        </>
      ) : showProductChoices ? (
        <>
          <text x="380" y="54" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">
            Choose the major product of HBr addition in the presence of ROOR
          </text>
          <g>
            <rect x="35" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#f43f5e" strokeWidth="3" />
            <AntiMarkovnikovPropaneStructure x={205} y={180} substituent="Br" scale={0.9} substituentStroke="#e11d48" />
            <text x="200" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#be123c">
              1-bromopropane · anti-Markovnikov
            </text>
          </g>
          <g>
            <rect x="395" y="92" width="330" height="190" rx="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <MarkovnikovPropaneStructure x={560} y={180} substituent="Br" scale={0.9} substituentStroke="#64748b" />
            <text x="560" y="257" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">
              2-bromopropane · ionic product
            </text>
          </g>
        </>
      ) : (
        <>
          <rect x="135" y="102" width="490" height="185" rx="24" fill="#fff1f2" stroke="#f43f5e" strokeWidth="3" />
          <AntiMarkovnikovPropaneStructure x={395} y={192} substituent="Br" scale={1.15} substituentStroke="#e11d48" />
          <text x="380" y="263" textAnchor="middle" fontSize="18" fontWeight="700" fill="#be123c">
            1-bromopropane · anti-Markovnikov product
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={radicalHBrReactionData}
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
