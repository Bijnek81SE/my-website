import type { KeyboardEvent } from "react";
import MoleculeCanvas from "../MoleculeCanvas";
import type { MechanismStep } from "./types";

export type Sn1PracticeTarget =
  | "tertiary-substrate"
  | "carbon-bromine-bond"
  | "carbocation"
  | "water-nucleophile"
  | "base-water"
  | "alcohol-product"
  | "bromide-product";

type Sn1ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: Sn1PracticeTarget) => void;
};

const glow =
  "drop-shadow-[0_0_10px_rgba(124,58,237,0.35)]";

const interactiveClass =
  "cursor-pointer outline-none focus-visible:stroke-violet-600 focus-visible:stroke-[4]";

export default function Sn1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn1ReactionCanvasProps) {
  const product = step.highlight === "product";

  const carbocation = [
    "carbocation",
    "nucleophile",
    "deprotonation",
  ].includes(step.highlight);

  const oxonium = step.highlight === "deprotonation";

  const bonds = [
    {
      id: "carbon-bromine-bond",
      from: { x: 430, y: 205 },
      to: { x: 505, y: 205 },
      stroke:
        step.highlight === "leaving-group"
          ? "#dc2626"
          : "#0f172a",
      strokeWidth:
        step.highlight === "leaving-group" ? 7 : 5,
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

  function selectTarget(target: Sn1PracticeTarget) {
    if (!interactive) {
      return;
    }

    onTargetClick?.(target);
  }

  function handleTargetKeyDown(
    event: KeyboardEvent<SVGElement>,
    target: Sn1PracticeTarget,
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
        aria-label={`SN1 mechanism: ${step.title}`}
      >
        <rect
          width="760"
          height="400"
          fill="#f8fafc"
        />

        {product ? (
          <>
            <text
              x="190"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              (CH₃)₃COH
            </text>

            <rect
              x="170"
              y="165"
              width="245"
              height="85"
              rx="18"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the tert-butanol product"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("alcohol-product")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "alcohol-product",
                )
              }
            />

            <text
              x="445"
              y="220"
              fontSize="30"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              +
            </text>

            <text
              x="500"
              y="220"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>

            <rect
              x="485"
              y="170"
              width="105"
              height="75"
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
        ) : carbocation ? (
          <>
            {step.highlight === "nucleophile" ? (
              <g className={glow}>
                <text
                  x="82"
                  y="205"
                  fontSize="40"
                  fontWeight="700"
                  fill="#2563eb"
                  pointerEvents="none"
                >
                  H₂O
                </text>

                <circle
                  cx="126"
                  cy="154"
                  r="5"
                  fill="#2563eb"
                  pointerEvents="none"
                />

                <circle
                  cx="143"
                  cy="154"
                  r="5"
                  fill="#2563eb"
                  pointerEvents="none"
                />

                <circle
                  cx="120"
                  cy="190"
                  r="62"
                  fill="transparent"
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-label={
                    interactive
                      ? "Select the water nucleophile"
                      : undefined
                  }
                  className={
                    interactive ? interactiveClass : undefined
                  }
                  onClick={() =>
                    selectTarget("water-nucleophile")
                  }
                  onKeyDown={(event) =>
                    handleTargetKeyDown(
                      event,
                      "water-nucleophile",
                    )
                  }
                />
              </g>
            ) : null}

            {oxonium ? (
              <>
                <text
                  x="315"
                  y="215"
                  fontSize="42"
                  fontWeight="700"
                  fill="#0f172a"
                  pointerEvents="none"
                >
                  (CH₃)₃C–OH₂⁺
                </text>

                <text
                  x="80"
                  y="285"
                  fontSize="34"
                  fontWeight="700"
                  fill="#2563eb"
                  pointerEvents="none"
                >
                  H₂O
                </text>

                <circle
                  cx="120"
                  cy="270"
                  r="58"
                  fill="transparent"
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-label={
                    interactive
                      ? "Select the water acting as a base"
                      : undefined
                  }
                  className={
                    interactive ? interactiveClass : undefined
                  }
                  onClick={() =>
                    selectTarget("base-water")
                  }
                  onKeyDown={(event) =>
                    handleTargetKeyDown(
                      event,
                      "base-water",
                    )
                  }
                />
              </>
            ) : (
              <>
                <text
                  x="300"
                  y="215"
                  fontSize="46"
                  fontWeight="700"
                  fill="#7c3aed"
                  pointerEvents="none"
                  className={
                    step.highlight === "carbocation"
                      ? glow
                      : undefined
                  }
                >
                  (CH₃)₃C⁺
                </text>

                <rect
                  x="280"
                  y="160"
                  width="230"
                  height="90"
                  rx="18"
                  fill="transparent"
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  aria-label={
                    interactive
                      ? "Select the tertiary carbocation"
                      : undefined
                  }
                  className={
                    interactive ? interactiveClass : undefined
                  }
                  onClick={() =>
                    selectTarget("carbocation")
                  }
                  onKeyDown={(event) =>
                    handleTargetKeyDown(
                      event,
                      "carbocation",
                    )
                  }
                />
              </>
            )}

            <text
              x="565"
              y="215"
              fontSize="40"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>
          </>
        ) : (
          <>
            <text
              x="270"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill={
                step.highlight === "substrate"
                  ? "#7c3aed"
                  : "#0f172a"
              }
              pointerEvents="none"
              className={
                step.highlight === "substrate"
                  ? glow
                  : undefined
              }
            >
              (CH₃)₃C
            </text>

            <rect
              x="250"
              y="160"
              width="215"
              height="95"
              rx="18"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the tertiary substrate"
                  : undefined
              }
              className={
                interactive ? interactiveClass : undefined
              }
              onClick={() =>
                selectTarget("tertiary-substrate")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "tertiary-substrate",
                )
              }
            />

            <MoleculeCanvas bonds={bonds} />

            <line
              x1="430"
              y1="205"
              x2="505"
              y2="205"
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
              x="515"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br
            </text>
          </>
        )}

        <MoleculeCanvas arrows={arrows} />

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