import MechanismArrow from "./MechanismArrow";

type Point = { x: number; y: number };

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

const glow = "drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]";

export default function E2ReactionCanvas({ step, animated }: Props) {
  const product = step.highlight === "products";
  const concerted = step.highlight === "concerted";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full"
        role="img"
        aria-label={`E2 mechanism: ${step.title}`}
      >
        <rect width="760" height="400" fill="#f8fafc" />

        {product ? (
          <>
            <text x="165" y="215" fontSize="38" fontWeight="700" fill="#2563eb">
              H–O–H
            </text>
            <text x="315" y="215" fontSize="30" fontWeight="700" fill="#64748b">
              +
            </text>
            <text x="365" y="215" fontSize="42" fontWeight="700" fill="#0f172a">
              CH₃–CH=CH₂
            </text>
            <text x="600" y="215" fontSize="30" fontWeight="700" fill="#64748b">
              +
            </text>
            <text x="645" y="215" fontSize="40" fontWeight="700" fill="#dc2626">
              Br⁻
            </text>
          </>
        ) : (
          <>
            <g className={concerted ? glow : undefined}>
              <text x="72" y="205" fontSize="38" fontWeight="700" fill="#2563eb">
                ⁻OH
              </text>
              <circle cx="121" cy="154" r="5" fill="#2563eb" />
              <circle cx="139" cy="154" r="5" fill="#2563eb" />
            </g>

            <text x="270" y="205" fontSize="34" fontWeight="700" fill="#0f172a">
              H
            </text>
            <line
              x1="306"
              y1="180"
              x2="360"
              y2="200"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <text x="350" y="220" fontSize="38" fontWeight="700" fill="#0f172a">
              CH₂
            </text>
            <line
              x1="420"
              y1="202"
              x2="485"
              y2="202"
              stroke={concerted ? "#7c3aed" : "#0f172a"}
              strokeWidth={concerted ? 7 : 5}
              strokeLinecap="round"
            />
            <text x="490" y="220" fontSize="38" fontWeight="700" fill="#0f172a">
              CH₂
            </text>
            <line
              x1="565"
              y1="202"
              x2="620"
              y2="202"
              stroke={concerted ? "#dc2626" : "#0f172a"}
              strokeWidth={concerted ? 7 : 5}
              strokeLinecap="round"
            />
            <text x="635" y="220" fontSize="38" fontWeight="700" fill="#dc2626">
              Br
            </text>

            <text x="345" y="276" fontSize="24" fontWeight="700" fill="#64748b">
              β-carbon
            </text>
            <text x="500" y="276" fontSize="24" fontWeight="700" fill="#64748b">
              α-carbon
            </text>

            {step.highlight === "alignment" && (
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
            )}
          </>
        )}

        {step.arrows.map((arrow) => (
          <MechanismArrow key={arrow.id} {...arrow} animated={animated} />
        ))}

        <text x="380" y="355" textAnchor="middle" fontSize="17" fill="#475569">
          {step.note}
        </text>
      </svg>
    </div>
  );
}
