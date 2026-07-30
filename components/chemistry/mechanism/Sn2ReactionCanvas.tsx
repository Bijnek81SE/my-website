import MoleculeCanvas from "../MoleculeCanvas";
import type { MechanismStep } from "./types";

type Sn2ReactionCanvasProps = {
  step: MechanismStep;
  animated: boolean;
};

const highlightClass =
  "drop-shadow-[0_0_10px_rgba(37,99,235,0.35)]";

export default function Sn2ReactionCanvas({
  step,
  animated,
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
              />
            </g>

            <text
              x="286"
              y="225"
              fontSize="42"
              fontWeight="700"
              fill="#0f172a"
            >
              H₃C
            </text>

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