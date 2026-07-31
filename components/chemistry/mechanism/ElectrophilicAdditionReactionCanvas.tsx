import { electrophilicAdditionReactionData } from "./MechanismReactionData";
import ReactionCanvasEngine from "./ReactionCanvasEngine";
import { ReactionHotspotLayer } from "./ReactionDataEngine";
import type { MechanismArrow as MechanismArrowData } from "./types";

export type ElectrophilicAdditionMechanismStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  highlight:
    | "alkene"
    | "protonation"
    | "carbocation"
    | "bromide-attack"
    | "products";
  arrows: MechanismArrowData[];
};

export type ElectrophilicAdditionPracticeTarget =
  | "pi-bond"
  | "electrophilic-hydrogen"
  | "carbocation"
  | "bromide"
  | "markovnikov-product";

type ElectrophilicAdditionReactionCanvasProps = {
  step: ElectrophilicAdditionMechanismStep;
  animated: boolean;
  interactive?: boolean;
  onTargetClick?: (
    target: ElectrophilicAdditionPracticeTarget,
  ) => void;
};

export default function ElectrophilicAdditionReactionCanvas({
  step,
  animated,
  interactive = false,
  onTargetClick,
}: ElectrophilicAdditionReactionCanvasProps) {
  const products = step.highlight === "products";
  const carbocation =
    step.highlight === "carbocation" ||
    step.highlight === "bromide-attack";

  const scene = products
    ? "products"
    : carbocation
      ? "carbocation"
      : "reactants";

  return (
    <ReactionCanvasEngine
      viewBox="0 0 760 400"
      ariaLabel={`Electrophilic addition mechanism: ${step.title}`}
      arrows={step.arrows}
      animated={animated}
    >
      {products ? (
        <>
          <text
            x="220"
            y="215"
            fontSize="44"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₃–CH(Br)–CH₃
          </text>

          <text
            x="380"
            y="285"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
          >
            2-bromopropane — the Markovnikov product
          </text>
        </>
      ) : carbocation ? (
        <>
          <text
            x="190"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#7c3aed"
          >
            CH₃–C⁺H–CH₃
          </text>

          <text
            x="540"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#dc2626"
          >
            Br⁻
          </text>

          <circle cx="570" cy="152" r="5" fill="#dc2626" />
          <circle cx="588" cy="152" r="5" fill="#dc2626" />

          <text
            x="380"
            y="285"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
          >
            Secondary carbocation intermediate
          </text>
        </>
      ) : (
        <>
          <text
            x="120"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₃–CH
          </text>

          <line
            x1="300"
            y1="193"
            x2="390"
            y2="193"
            stroke={
              step.highlight === "alkene" ||
              step.highlight === "protonation"
                ? "#e11d48"
                : "#0f172a"
            }
            strokeWidth="5"
          />
          <line
            x1="300"
            y1="211"
            x2="390"
            y2="211"
            stroke={
              step.highlight === "alkene" ||
              step.highlight === "protonation"
                ? "#e11d48"
                : "#0f172a"
            }
            strokeWidth="5"
          />

          <text
            x="405"
            y="215"
            fontSize="42"
            fontWeight="700"
            fill="#0f172a"
          >
            CH₂
          </text>

          <text
            x="535"
            y="215"
            fontSize="40"
            fontWeight="700"
            fill="#2563eb"
          >
            H
          </text>
          <line
            x1="570"
            y1="202"
            x2="620"
            y2="202"
            stroke={
              step.highlight === "protonation"
                ? "#dc2626"
                : "#0f172a"
            }
            strokeWidth={
              step.highlight === "protonation" ? 7 : 5
            }
          />
          <text
            x="635"
            y="215"
            fontSize="40"
            fontWeight="700"
            fill="#dc2626"
          >
            Br
          </text>

          <text
            x="380"
            y="285"
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill="#475569"
          >
            Propene + hydrogen bromide
          </text>
        </>
      )}

      <ReactionHotspotLayer
        data={electrophilicAdditionReactionData}
        scene={scene}
        interactive={interactive}
        onTargetClick={onTargetClick}
      />
    </ReactionCanvasEngine>
  );
}
