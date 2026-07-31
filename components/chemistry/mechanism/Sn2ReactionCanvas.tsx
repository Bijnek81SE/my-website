import MoleculeCanvas from "../MoleculeCanvas";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import type { MechanismStep } from "./types";

export type Sn2PracticeTarget =
  | "oxygen"
  | "carbon"
  | "bromine"
  | "carbon-bromine-bond"
  | "product-bromide";

type Sn2ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: Sn2PracticeTarget) => void;
};

const highlightClass =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

export default function Sn2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: Sn2ReactionCanvasProps) {
  const showProduct = step.highlight === "product";

  const bonds = [
    {
      id: "carbon-bromine-bond",
      from: { x: 374, y: 208 },
      to: { x: 488, y: 208 },
      stroke:
        step.highlight === "substrate"
          ? "#2563eb"
          : "#0f172a",
      strokeWidth:
        step.highlight === "substrate" ? 7 : 5,
    },
  ];


  const bromineAtoms = [
    {
      id: "bromine-leaving-group",
      x: 535,
      y: 208,
      element: "Br" as const,
      radius: 46,
      showBackground: false,
      labelColour:
        step.highlight === "leaving-group"
          ? "#dc2626"
          : "#b91c1c",
    },
  ];

  function selectTarget(target: Sn2PracticeTarget) {
    if (!interactive) {
      return;
    }

    onTargetClick?.(target);
  }

  function handleTargetKeyDown(
    event: React.KeyboardEvent<SVGElement>,
    target: Sn2PracticeTarget,
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    selectTarget(target);
  }

  const interactiveClass = interactive
    ? "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]"
    : undefined;

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 390"
      ariaLabel={`SN2 mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >

        {!showProduct ? (
          <>
            <g
              className={
                step.highlight === "nucleophile"
                  ? highlightClass
                  : undefined
              }
            >
              <text
                x="82"
                y="225"
                fontSize="42"
                fontWeight="700"
                fill="#2563eb"
                pointerEvents="none"
              >
                ⁻OH
              </text>

              <circle
                cx="112"
                cy="170"
                r="6"
                fill="#2563eb"
                opacity={
                  step.highlight === "nucleophile"
                    ? 1
                    : 0.45
                }
                pointerEvents="none"
              />

              <circle
                cx="130"
                cy="170"
                r="6"
                fill="#2563eb"
                opacity={
                  step.highlight === "nucleophile"
                    ? 1
                    : 0.45
                }
                pointerEvents="none"
              />

              <circle
                cx="118"
                cy="198"
                r="58"
                fill="transparent"
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={
                  interactive
                    ? "Select the hydroxide oxygen"
                    : undefined
                }
                className={interactiveClass}
                onClick={() => selectTarget("oxygen")}
                onKeyDown={(event) =>
                  handleTargetKeyDown(event, "oxygen")
                }
              />
            </g>

            <text
              x="286"
              y="225"
              fontSize="42"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              H₃C
            </text>

            <circle
              cx="338"
              cy="208"
              r="54"
              fill="transparent"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the electrophilic carbon"
                  : undefined
              }
              className={interactiveClass}
              onClick={() => selectTarget("carbon")}
              onKeyDown={(event) =>
                handleTargetKeyDown(event, "carbon")
              }
            />

            <MoleculeCanvas
              bonds={bonds}
            />

            <line
              x1="374"
              y1="208"
              x2="488"
              y2="208"
              stroke="transparent"
              strokeWidth="34"
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={
                interactive
                  ? "Select the carbon bromine bond"
                  : undefined
              }
              className={interactiveClass}
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

            <g
              className={
                step.highlight === "leaving-group"
                  ? highlightClass
                  : undefined
              }
            >
              <MoleculeCanvas atoms={bromineAtoms} />

              <circle
                cx="535"
                cy="208"
                r="54"
                fill="transparent"
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={
                  interactive
                    ? "Select the bromine leaving group"
                    : undefined
                }
                className={interactiveClass}
                onClick={() => selectTarget("bromine")}
                onKeyDown={(event) =>
                  handleTargetKeyDown(event, "bromine")
                }
              />
            </g>
          </>
        ) : (
          <>
            <text
              x="205"
              y="220"
              fontSize="46"
              fontWeight="700"
              fill="#0f172a"
              pointerEvents="none"
            >
              CH₃OH
            </text>

            <text
              x="392"
              y="220"
              fontSize="34"
              fontWeight="700"
              fill="#64748b"
              pointerEvents="none"
            >
              +
            </text>

            <text
              x="458"
              y="220"
              fontSize="46"
              fontWeight="700"
              fill="#dc2626"
              pointerEvents="none"
            >
              Br⁻
            </text>

            <rect
              x="445"
              y="165"
              width="115"
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
              className={interactiveClass}
              onClick={() =>
                selectTarget("product-bromide")
              }
              onKeyDown={(event) =>
                handleTargetKeyDown(
                  event,
                  "product-bromide",
                )
              }
            />

            <text
              x="380"
              y="285"
              textAnchor="middle"
              fontSize="18"
              fill="#475569"
              pointerEvents="none"
            >
              Substitution product and bromide leaving group
            </text>
          </>
        )}

        <text
          x="380"
          y="350"
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
