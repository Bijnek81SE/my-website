import type { KeyboardEvent } from "react";
import MechanismArrow from "./MechanismArrow";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type E1MechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "substrate"
    | "ionisation"
    | "carbocation"
    | "deprotonation"
    | "products";
  arrows: MechanismArrowData[];
};

export type E1PracticeTarget =
  | "tertiary-substrate"
  | "carbon-bromine-bond"
  | "carbocation"
  | "beta-hydrogen"
  | "water-base"
  | "alkene-product"
  | "bromide-product";

type E1ReactionCanvasProps = {
  step: E1MechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (target: E1PracticeTarget) => void;
};

const interactiveClass =
  "cursor-pointer outline-none focus-visible:stroke-emerald-600 focus-visible:stroke-[4]";

export default function E1ReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: E1ReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation = step.highlight === "carbocation";
  const deprotonation = step.highlight === "deprotonation";

  function selectTarget(target: E1PracticeTarget) {
    if (interactive) {
      onTargetClick?.(target);
    }
  }

  function handleTargetKeyDown(
    event: KeyboardEvent<SVGElement>,
    target: E1PracticeTarget,
  ) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    selectTarget(target);
  }

  function hotspot(
    target: E1PracticeTarget,
    label: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="16"
        fill="transparent"
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? label : undefined}
        className={interactive ? interactiveClass : undefined}
        onClick={() => selectTarget(target)}
        onKeyDown={(event) => handleTargetKeyDown(event, target)}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <svg
        viewBox="0 0 760 400"
        className="h-auto w-full"
        role="img"
        aria-label={`E1 mechanism: ${step.title}`}
      >
        <rect width="760" height="400" fill="#f8fafc" />

        {products ? (
          <>
            <text x="115" y="215" fontSize="34" fontWeight="700" fill="#0f172a">
              CH₂=C(CH₃)₂
            </text>
            {hotspot(
              "alkene-product",
              "Select the alkene product",
              90,
              160,
              250,
              85,
            )}

            <text x="365" y="215" fontSize="28" fontWeight="700" fill="#64748b">
              +
            </text>

            <text x="420" y="215" fontSize="34" fontWeight="700" fill="#2563eb">
              H₃O⁺
            </text>

            <text x="545" y="215" fontSize="28" fontWeight="700" fill="#64748b">
              +
            </text>

            <text x="610" y="215" fontSize="34" fontWeight="700" fill="#dc2626">
              Br⁻
            </text>
            {hotspot(
              "bromide-product",
              "Select the bromide product",
              590,
              160,
              100,
              85,
            )}
          </>
        ) : (
          <>
            <text x="75" y="115" fontSize="28" fontWeight="700" fill="#2563eb">
              H₂O
            </text>
            {hotspot(
              "water-base",
              "Select the water molecule acting as a base",
              50,
              75,
              100,
              65,
            )}

            <text x="250" y="220" fontSize="34" fontWeight="700" fill="#0f172a">
              CH₃
            </text>
            {hotspot(
              "tertiary-substrate",
              "Select the tertiary substrate",
              225,
              125,
              420,
              175,
            )}
            <line x1="335" y1="205" x2="385" y2="205" stroke="#0f172a" strokeWidth="5" />
            <text
              x="397"
              y="220"
              fontSize="38"
              fontWeight="800"
              fill={carbocation || deprotonation ? "#7c3aed" : "#0f172a"}
            >
              C{carbocation || deprotonation ? "⁺" : ""}
            </text>
            <line x1="450" y1="195" x2="505" y2="155" stroke="#0f172a" strokeWidth="5" />
            <text x="520" y="160" fontSize="30" fontWeight="700" fill="#0f172a">
              CH₃
            </text>
            <line x1="450" y1="215" x2="505" y2="255" stroke="#0f172a" strokeWidth="5" />
            <text x="520" y="270" fontSize="30" fontWeight="700" fill="#0f172a">
              CH₃
            </text>

            {!carbocation && !deprotonation ? (
              <>
                <line
                  x1="455"
                  y1="205"
                  x2="535"
                  y2="205"
                  stroke={step.highlight === "ionisation" ? "#dc2626" : "#0f172a"}
                  strokeWidth={step.highlight === "ionisation" ? 7 : 5}
                />
                <text x="555" y="218" fontSize="34" fontWeight="700" fill="#dc2626">
                  Br
                </text>
                {hotspot(
                  "carbon-bromine-bond",
                  "Select the carbon bromine bond",
                  450,
                  178,
                  115,
                  55,
                )}
              </>
            ) : (
              <text x="610" y="218" fontSize="34" fontWeight="700" fill="#dc2626">
                Br⁻
              </text>
            )}

            <text x="360" y="105" fontSize="26" fontWeight="700" fill="#0f172a">
              H
            </text>
            <line
              x1="390"
              y1="120"
              x2="414"
              y2="174"
              stroke={deprotonation ? "#2563eb" : "#0f172a"}
              strokeWidth={deprotonation ? 7 : 5}
            />
            {hotspot(
              "beta-hydrogen",
              "Select the beta hydrogen",
              335,
              70,
              85,
              70,
            )}

            {hotspot(
              "carbocation",
              "Select the carbocation intermediate",
              375,
              170,
              100,
              85,
            )}
          </>
        )}

        {step.arrows.map((arrow) => (
          <MechanismArrow
            key={arrow.id}
            {...arrow}
            animated={animated}
          />
        ))}
      </svg>
    </div>
  );
}
