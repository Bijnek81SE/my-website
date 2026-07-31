import type { KeyboardEvent } from "react";
import MoleculeCanvas from "../MoleculeCanvas";

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

const interactiveClass =
  "cursor-pointer outline-none focus-visible:stroke-orange-600 focus-visible:stroke-[4]";

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

  const arrows = step.arrows.map((arrow) => ({
    id: arrow.id,
    start: arrow.start,
    control: arrow.control,
    end: arrow.end,
    colour: arrow.colour,
    animated,
    label: arrow.label,
  }));

  function selectTarget(target: E2PracticeTarget) {
    if (!interactive) {
      return;
    }

    onTargetClick?.(target);
  }

  function handleTargetKeyDown(
    event: KeyboardEvent<SVGElement>,
    target: E2PracticeTarget,
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    selectTarget(target);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full"
        role="img"
        aria-label={`E2 mechanism: ${step.title}`}
      >
        <rect
          width="760"
          height="400"
          fill="#f8fafc"
        />

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

            <rect
              x="100"
              y="165"
              width="145"
              height="80"
              rx="18"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the water product"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("water-product")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "water-product",
                )
              }
            />

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

            <rect
              x="315"
              y="165"
              width="245"
              height="80"
              rx="18"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the alkene product"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("alkene-product")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "alkene-product",
                )
              }
            />

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

            <rect
              x="625"
              y="165"
              width="105"
              height="80"
              rx="18"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the bromide product"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("bromide-product")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "bromide-product",
                )
              }
            />
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

              <circle
                cx="170"
                cy="190"
                r="58"
                fill="transparent"
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={
                  interactive
                    ? "Select the hydroxide base"
                    : undefined
                }
                className={
                  interactive ? interactiveClass : undefined
                }
                onClick={() => selectTarget("base")}
                onKeyDown={(event) =>
                  handleTargetKeyDown(event, "base")
                }
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

            <circle
              cx="315"
              cy="172"
              r="38"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the beta hydrogen"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("beta-hydrogen")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "beta-hydrogen",
                )
              }
            />

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
              arrows={arrows}
            />

            <line
              x1="331"
              y1="180"
              x2="385"
              y2="200"
              stroke="transparent"
              strokeWidth="32"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the beta carbon hydrogen bond"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("carbon-hydrogen-bond")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "carbon-hydrogen-bond",
                )
              }
            />

            <line
              x1="445"
              y1="202"
              x2="510"
              y2="202"
              stroke="transparent"
              strokeWidth="34"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the carbon carbon bond"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("carbon-carbon-bond")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "carbon-carbon-bond",
                )
              }
            />

            <line
              x1="590"
              y1="202"
              x2="645"
              y2="202"
              stroke="transparent"
              strokeWidth="34"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the carbon bromine bond"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("carbon-bromine-bond")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "carbon-bromine-bond",
                )
              }
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

        {product ? (
          <MoleculeCanvas arrows={arrows} />
        ) : null}

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
      </svg>
    </div>
  );
}