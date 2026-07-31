import MoleculeCanvas from "../MoleculeCanvas";
import { e2ReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";

type Point = {
  x: number;
  y: number;
};

type Arrow = {
  id: string;
  start: Point;
  control: Point;
  end: Point;
  colour?: string;
  label: string;
};

export type E2MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight: "alignment" | "concerted" | "products";
  arrows: Arrow[];
};

export type E2PracticeTarget =
  | "base"
  | "beta-hydrogen"
  | "carbon-hydrogen-bond"
  | "carbon-carbon-bond"
  | "carbon-bromine-bond"
  | "alkene-product"
  | "water-product"
  | "bromide-product";

type E2ReactionCanvasProps = {
  step: E2MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: E2PracticeTarget) => void;
};

const glow =
  "drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]";


export default function E2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E2ReactionCanvasProps) {
  const product = step.highlight === "products";
  const concerted = step.highlight === "concerted";

  const bonds = [
    {
      id: "beta-hydrogen-bond",
      from: { x: 331, y: 180 },
      to: { x: 385, y: 200 },
      stroke: "#0f172a",
      strokeWidth: 4,
    },
    {
      id: "carbon-carbon-bond",
      from: { x: 445, y: 202 },
      to: { x: 510, y: 202 },
      stroke: concerted ? "#7c3aed" : "#0f172a",
      strokeWidth: concerted ? 7 : 5,
    },
    {
      id: "carbon-bromine-bond",
      from: { x: 590, y: 202 },
      to: { x: 645, y: 202 },
      stroke: concerted ? "#dc2626" : "#0f172a",
      strokeWidth: concerted ? 7 : 5,
    },
  ];


  const scene = product ? "products" : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`E2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >

        {product ? (
          <>
            <text
              x="120"
              y="215"
              fontSize="38"
              fontWeight="700"
              fill="#2563eb"
              pointerEvents="none"
            >
              H–O–H
            </text>

            <text
              x="280"
              y="215"
              fontSize="30"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              +
            </text>

            <text
              x="330"
              y="215"
              fontSize="38"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              CH₃–CH=CH₂
            </text>

            <text
              x="590"
              y="215"
              fontSize="30"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              +
            </text>

            <text
              x="640"
              y="215"
              fontSize="38"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>
          </>
        ) : (
          <>
            <g className={concerted ? glow : undefined}>
              <text
                x="132"
                y="205"
                fontSize="38"
                fontWeight="700"
                fill="#2563eb"
                pointerEvents="none"
              >
                ⁻OH
              </text>

              <circle
                cx="181"
                cy="154"
                r="5"
                fill="#2563eb"
                pointerEvents="none"
              />

              <circle
                cx="199"
                cy="154"
                r="5"
                fill="#2563eb"
                pointerEvents="none"
              />
            </g>

            <text
              x="300"
              y="188"
              fontSize="34"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              H
            </text>

            <text
              x="375"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              CH₂
            </text>

            <text
              x="515"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              CH₂
            </text>

            <text
              x="658"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br
            </text>

            <MoleculeCanvas
              bonds={bonds}
            />

            <text
              x="370"
              y="266"
              fontSize="24"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              β-carbon
            </text>

            <text
              x="525"
              y="266"
              fontSize="24"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              α-carbon
            </text>

            {step.highlight === "alignment" ? (
              <>
                <line
                  x1="320"
                  y1="120"
                  x2="675"
                  y2="120"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeDasharray="10 8"
                  pointerEvents="none"
                />

                <text
                  x="497"
                  y="96"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#c2410c"
                  pointerEvents="none"
                >
                  H and Br aligned anti-periplanar
                </text>
              </>
            ) : null}
          </>
        )}


        <ReactionHotspotLayer
          data={e2ReactionData}
          scene={scene}
          interactive={interactive}
          onTargetClick={onTargetClick}
        />

        <text
          x="380"
          y="355"
          textAnchor="middle"
          fontSize="17"
          fill="#475569"
          pointerEvents="none"
        >
          {step.note}
        </text>
    </ReactionCanvasEngine>
  );
}
