export type SupportedMechanismFamily = "sn2" | "e2" | "alkene-halogenation";

export type MechanismParticipantRole =
  | "substrate"
  | "nucleophile"
  | "base"
  | "product"
  | "conjugate-acid"
  | "leaving-group"
  | "electrophile";

export type MechanismStructureId =
  | "methyl-bromide"
  | "hydroxide"
  | "methanol"
  | "e2-anti-periplanar-substrate"
  | "water"
  | "2-butene"
  | "cyclohexene"
  | "bromine"
  | "trans-1-2-dibromocyclohexane";

export type MechanismAuthoringRequest = {
  substrateClass: "primary-alkyl-halide" | "secondary-alkyl-halide" | "alkene";
  reagentClass: "strong-nucleophile" | "strong-base" | "halogen";
  productClass: "substitution-product" | "alkene" | "vicinal-dihalide";
  nucleophileId?: "hydroxide";
  leavingGroupId?: "bromide";
};

export type MechanismParticipant = {
  role: MechanismParticipantRole;
  structureId?: MechanismStructureId;
  label?: string;
};

export type AuthoredMechanismArrow = {
  id: string;
  start: { x: number; y: number };
  control: { x: number; y: number };
  end: { x: number; y: number };
  colour?: string;
  label: string;
};

export type MechanismFamilyStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  scene: string;
  arrows: AuthoredMechanismArrow[];
};

export type CompiledMechanismDefinition = {
  id: string;
  family: SupportedMechanismFamily;
  title: string;
  description: string;
  accent: "blue" | "orange" | "violet";
  playbackInterval: number;
  participants: readonly MechanismParticipant[];
  geometry: {
    backsideAttackDegrees?: number;
    antiPeriplanarDihedralDegrees?: number;
    antiAddition?: boolean;
  };
  steps: readonly MechanismFamilyStep[];
};
