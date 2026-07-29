import MechanismArrow from "./MechanismArrow";
import type { MechanismStep } from "./types";

type Props = {
  step: MechanismStep;
  animated: boolean;
};

const glow = "drop-shadow-[0_0_10px_rgba(124,58,237,0.35)]";

export default function Sn1ReactionCanvas({ step, animated }: Props) {
  const product = step.highlight === "product";
  const carbocation = ["carbocation", "nucleophile", "deprotonation"].includes(step.highlight);
  const oxonium = step.highlight === "deprotonation";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg viewBox="0 0 760 400" className="h-auto w-full" role="img" aria-label={`SN1 mechanism: ${step.title}`}>
        <rect width="760" height="400" fill="#f8fafc" />

        {product ? (
          <>
            <text x="190" y="220" fontSize="44" fontWeight="700" fill="#0f172a">(CH₃)₃COH</text>
            <text x="445" y="220" fontSize="30" fontWeight="700" fill="#64748b">+</text>
            <text x="500" y="220" fontSize="40" fontWeight="700" fill="#dc2626">Br⁻</text>
          </>
        ) : carbocation ? (
          <>
            {step.highlight === "nucleophile" && (
              <g className={glow}>
                <text x="82" y="205" fontSize="40" fontWeight="700" fill="#2563eb">H₂O</text>
                <circle cx="126" cy="154" r="5" fill="#2563eb" />
                <circle cx="143" cy="154" r="5" fill="#2563eb" />
              </g>
            )}

            {oxonium ? (
              <>
                <text x="315" y="215" fontSize="42" fontWeight="700" fill="#0f172a">(CH₃)₃C–OH₂⁺</text>
                <text x="80" y="285" fontSize="34" fontWeight="700" fill="#2563eb">H₂O</text>
              </>
            ) : (
              <text
                x="300"
                y="215"
                fontSize="46"
                fontWeight="700"
                fill="#7c3aed"
                className={step.highlight === "carbocation" ? glow : undefined}
              >
                (CH₃)₃C⁺
              </text>
            )}

            <text x="565" y="215" fontSize="40" fontWeight="700" fill="#dc2626">Br⁻</text>
          </>
        ) : (
          <>
            <text
              x="270"
              y="220"
              fontSize="44"
              fontWeight="700"
              fill={step.highlight === "substrate" ? "#7c3aed" : "#0f172a"}
              className={step.highlight === "substrate" ? glow : undefined}
            >
              (CH₃)₃C
            </text>
            <line
              x1="430"
              y1="205"
              x2="505"
              y2="205"
              stroke={step.highlight === "leaving-group" ? "#dc2626" : "#0f172a"}
              strokeWidth={step.highlight === "leaving-group" ? 7 : 5}
              strokeLinecap="round"
            />
            <text x="515" y="220" fontSize="44" fontWeight="700" fill="#dc2626">Br</text>
          </>
        )}

        {step.arrows.map((arrow) => (
          <MechanismArrow key={arrow.id} {...arrow} animated={animated} />
        ))}

        <text x="380" y="355" textAnchor="middle" fontSize="17" fill="#475569">{step.note}</text>
      </svg>
    </div>
  );
}
