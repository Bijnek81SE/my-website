import type { ReactNode } from "react";

type StructureProps = {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  highlightBond?: boolean;
  children?: ReactNode;
};

const defaultStroke = "#0f172a";

export function CyclohexeneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  highlightBond = false,
  children,
}: StructureProps) {
  const points = [
    [0, -62],
    [54, -31],
    [54, 31],
    [0, 62],
    [-54, 31],
    [-54, -31],
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points={points.map(([px, py]) => `${px},${py}`).join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line
        x1="-45"
        y1="-22"
        x2="-6"
        y2="-48"
        stroke={highlightBond ? "#059669" : stroke}
        strokeWidth={highlightBond ? 7 : 5}
        strokeLinecap="round"
      />
      {children}
    </g>
  );
}

export function CyclohexaneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  children,
}: StructureProps) {
  const points = [
    [0, -62],
    [54, -31],
    [54, 31],
    [0, 62],
    [-54, 31],
    [-54, -31],
    [0, -62],
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points={points.map(([px, py]) => `${px},${py}`).join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {children}
    </g>
  );
}

type PropeneStructureProps = {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  piStroke?: string;
  showCarbonLabels?: boolean;
};

export function PropeneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  piStroke,
  showCarbonLabels = false,
}: PropeneStructureProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="-92,24 -35,-8 28,24"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line
        x1="-29"
        y1="3"
        x2="24"
        y2="32"
        stroke={piStroke ?? stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {showCarbonLabels ? (
        <>
          <text x="-35" y="-30" textAnchor="middle" fontSize="15" fontWeight="700" fill="#64748b">
            internal C
          </text>
          <text x="30" y="58" textAnchor="middle" fontSize="15" fontWeight="700" fill="#64748b">
            terminal C
          </text>
        </>
      ) : null}
    </g>
  );
}

type SubstitutedPropaneProps = {
  x: number;
  y: number;
  substituent: "Br" | "OH";
  scale?: number;
  substituentStroke?: string;
};

export function MarkovnikovPropaneStructure({
  x,
  y,
  substituent,
  scale = 1,
  substituentStroke = substituent === "Br" ? "#dc2626" : "#2563eb",
}: SubstitutedPropaneProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="-92,28 -34,-4 30,28"
        fill="none"
        stroke={defaultStroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="-34" y1="-4" x2="-34" y2="-56" stroke={defaultStroke} strokeWidth="5" strokeLinecap="round" />
      <text x="-34" y="-70" textAnchor="middle" fontSize="27" fontWeight="700" fill={substituentStroke}>
        {substituent}
      </text>
    </g>
  );
}

export function AntiMarkovnikovPropaneStructure({
  x,
  y,
  substituent,
  scale = 1,
  substituentStroke = substituent === "Br" ? "#dc2626" : "#2563eb",
}: SubstitutedPropaneProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="-92,28 -34,-4 30,28"
        fill="none"
        stroke={defaultStroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="30" y1="28" x2="62" y2="-12" stroke={defaultStroke} strokeWidth="5" strokeLinecap="round" />
      <text x="80" y="-18" textAnchor="middle" fontSize="27" fontWeight="700" fill={substituentStroke}>
        {substituent}
      </text>
    </g>
  );
}
