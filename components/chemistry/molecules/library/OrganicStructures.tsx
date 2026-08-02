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
    [0, -62],
  ];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points={points
          .map(([px, py]) => `${px},${py}`)
          .join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <line
        x1="-43"
        y1="25"
        x2="-6"
        y2="48"
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
        points={points
          .map(([px, py]) => `${px},${py}`)
          .join(" ")}
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


type E2AntiPeriplanarSubstrateProps = {
  x?: number;
  y?: number;
  scale?: number;
  stroke?: string;
  highlightBreakingBonds?: boolean;
  highlightFormingBond?: boolean;
  showLabels?: boolean;
};

export function E2AntiPeriplanarSubstrate({
  x = 0,
  y = 0,
  scale = 1,
  stroke = defaultStroke,
  highlightBreakingBonds = false,
  highlightFormingBond = false,
  showLabels = false,
}: E2AntiPeriplanarSubstrateProps) {
  const betaCarbon = { x: 360, y: 205 };
  const alphaCarbon = { x: 455, y: 205 };
  const betaHydrogen = { x: 338, y: 118 };
  const bromine = { x: 486, y: 294 };

  const breakingHydrogenColour = highlightBreakingBonds
    ? "#2563eb"
    : stroke;
  const breakingBromineColour = highlightBreakingBonds
    ? "#dc2626"
    : stroke;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="245,236 300,188 360,205 455,205 520,166"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <polygon
        points="360,205 346,145 330,126"
        fill={breakingHydrogenColour}
      />

      <text
        x={betaHydrogen.x}
        y={betaHydrogen.y}
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill={stroke}
        pointerEvents="none"
      >
        H
      </text>

      {[0, 1, 2, 3, 4].map((index) => {
        const progress = (index + 1) / 6;
        const centerX = alphaCarbon.x +
          (bromine.x - alphaCarbon.x) * progress;
        const centerY = alphaCarbon.y +
          (bromine.y - alphaCarbon.y) * progress;
        const halfWidth = 2 + index * 1.6;

        return (
          <line
            key={index}
            x1={centerX - halfWidth}
            y1={centerY}
            x2={centerX + halfWidth}
            y2={centerY}
            stroke={breakingBromineColour}
            strokeWidth="4"
            strokeLinecap="round"
          />
        );
      })}

      <text
        x={bromine.x}
        y={bromine.y + 18}
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill="#dc2626"
        pointerEvents="none"
      >
        Br
      </text>

      {highlightFormingBond ? (
        <line
          x1="368"
          y1="194"
          x2="447"
          y2="194"
          stroke="#7c3aed"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ) : null}

      {showLabels ? (
        <>
          <text
            x={betaCarbon.x}
            y="262"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            β-carbon
          </text>

          <text
            x={alphaCarbon.x}
            y="262"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#64748b"
            pointerEvents="none"
          >
            α-carbon
          </text>
        </>
      ) : null}
    </g>
  );
}

export function But2EneStructure({
  x,
  y,
  scale = 1,
  stroke = defaultStroke,
  piStroke,
}: {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
  piStroke?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <polyline
        points="-92,28 -35,-4 35,-4 92,28"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <line
        x1="-31"
        y1="8"
        x2="31"
        y2="8"
        stroke={piStroke ?? stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
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
          <text
            x="-35"
            y="-30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#64748b"
          >
            internal C
          </text>

          <text
            x="30"
            y="58"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#64748b"
          >
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

      <line
        x1="-34"
        y1="-4"
        x2="-34"
        y2="-56"
        stroke={defaultStroke}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="-34"
        y="-70"
        textAnchor="middle"
        fontSize="27"
        fontWeight="700"
        fill={substituentStroke}
      >
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

      <line
        x1="30"
        y1="28"
        x2="62"
        y2="-12"
        stroke={defaultStroke}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <text
        x="80"
        y="-18"
        textAnchor="middle"
        fontSize="27"
        fontWeight="700"
        fill={substituentStroke}
      >
        {substituent}
      </text>
    </g>
  );
}