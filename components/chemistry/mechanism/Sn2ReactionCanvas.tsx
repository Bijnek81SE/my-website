import MoleculeCanvas from "../MoleculeCanvas";
import type { MechanismStep } from "./types";

type Sn2AtomId = "oxygen" | "carbon" | "bromine";

type Sn2ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onAtomClick?: (atomId: Sn2AtomId) => void;
};

const highlightClass =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

export default function Sn2ReactionCanvas({
  step,
  animated,
  interactive = false,
  onAtomClick,
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

  const arrows = step.arrows.map((arrow) => ({
    id: arrow.id,
    start: arrow.start,
    control: arrow.control,
    end: arrow.end,
    colour: arrow.colour,
    animated,
    label: arrow.label,
  }));

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

  function selectAtom(atomId: Sn2AtomId) {
    if (!interactive) {
      return;
    }

    onAtomClick?.(atomId);
  }

  function handleAtomKeyDown(
    event: React.KeyboardEvent<SVGCircleElement>,
    atomId: Sn2AtomId,
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    selectAtom(atomId);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg
        viewBox="0 0 760 390"
        className="h-auto w-full"
        role="img"
        aria-label={`SN2 mechanism: ${step.title}`}
      >
        <rect
          width="760"
          height="390"
          fill="#f8fafc"
        />

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
                className={
                  interactive
                    ? "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]"
                    : undefined
                }
                onClick={() => selectAtom("oxygen")}
                onKeyDown={(event) =>
                  handleAtomKeyDown(event, "oxygen")
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
              className={
                interactive
                  ? "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]"
                  : undefined
              }
              onClick={() => selectAtom("carbon")}
              onKeyDown={(event) =>
                handleAtomKeyDown(event, "carbon")
              }
            />

            <MoleculeCanvas
              bonds={bonds}
              arrows={arrows}
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
                className={
                  interactive
                    ? "cursor-pointer outline-none focus-visible:stroke-blue-600 focus-visible:stroke-[4]"
                    : undefined
                }
                onClick={() => selectAtom("bromine")}
                onKeyDown={(event) =>
                  handleAtomKeyDown(event, "bromine")
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
            >
              CH₃OH
            </text>

            <text
              x="392"
              y="220"
              fontSize="34"
              fontWeight="700"
              fill="#64748b"
            >
              +
            </text>

            <text
              x="458"
              y="220"
              fontSize="46"
              fontWeight="700"
              fill="#dc2626"
            >
              Br⁻
            </text>

            <text
              x="380"
              y="285"
              textAnchor="middle"
              fontSize="18"
              fill="#475569"
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
        >
          {step.note}
        </text>
      </svg>
    </div>
  );
}