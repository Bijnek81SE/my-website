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

type Props = {
  step: E2MechanismStep;
  animated: boolean;
};

const glow =
  "drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]";

export default function E2ReactionCanvas({
  step,
  animated,
}: Props) {
  const product = step.highlight === "products";
  const concerted = step.highlight === "concerted";

  const bonds = [
    {
      id: "beta-hydrogen-bond",
      from: { x: 306, y: 180 },
      to: { x: 360, y: 200 },
      stroke: "#0f172a",
      strokeWidth: 4,
    },
    {
      id: "carbon-carbon-bond",
      from: { x: 420, y: 202 },
      to: { x: 485, y: 202 },
      stroke: concerted ? "#7c3aed" : "#0f172a",
      strokeWidth: concerted ? 7 : 5,
    },
    {
      id: "carbon-bromine-bond",
      from: { x: 565, y: 202 },
      to: { x: 620, y: 202 },
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
    >
      H–O–H
    </text>

    <text
      x="280"
      y="215"
      fontSize="30"
      fontWeight="700"
      fill="#64748b"
    >
      +
    </text>

    <text
      x="330"
      y="215"
      fontSize="38"
      fontWeight="700"
      fill="#0f172a"
    >
      CH₃–CH=CH₂
    </text>

    <text
      x="590"
      y="215"
      fontSize="30"
      fontWeight="700"
      fill="#64748b"
    >
      +
    </text>

    <text
      x="640"
      y="215"
      fontSize="38"
      fontWeight="700"
      fill="#dc2626"
    >
      Br⁻
    </text>
  </>
) : (
          <>
            <g className={concerted ? glow : undefined}>
              <text
                x="72"
                y="205"
                fontSize="38"
                fontWeight="700"
                fill="#2563eb"
              >
                ⁻OH
              </text>

              <circle
                cx="121"
                cy="154"
                r="5"
                fill="#2563eb"
              />

              <circle
                cx="139"
                cy="154"
                r="5"
                fill="#2563eb"
              />
            </g>

            <text
              x="270"
              y="205"
              fontSize="34"
              fontWeight="700"
              fill="#0f172a"
            >
              H
            </text>

            <text
              x="350"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#0f172a"
            >
              CH₂
            </text>

            <text
              x="490"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#0f172a"
            >
              CH₂
            </text>

            <text
              x="635"
              y="220"
              fontSize="38"
              fontWeight="700"
              fill="#dc2626"
            >
              Br
            </text>

            <MoleculeCanvas
              bonds={bonds}
              arrows={arrows}
            />

            <text
              x="345"
              y="276"
              fontSize="24"
              fontWeight="700"
              fill="#64748b"
            >
              β-carbon
            </text>

            <text
              x="500"
              y="276"
              fontSize="24"
              fontWeight="700"
              fill="#64748b"
            >
              α-carbon
            </text>

            {step.highlight === "alignment" ? (
              <>
                <line
                  x1="295"
                  y1="120"
                  x2="650"
                  y2="120"
                  stroke="#ea580c"
                  strokeWidth="3"
                  strokeDasharray="10 8"
                />

                <text
                  x="472"
                  y="96"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="#c2410c"
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
        >
          {step.note}
        </text>
      </svg>
    </div>
  );
}