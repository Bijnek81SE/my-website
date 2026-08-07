export type SupportedMechanismFamily = "sn2" | "e2";

export type MechanismParticipantRole =
  | "substrate"
  | "nucleophile"
  | "base"
  | "product"
  | "conjugate-acid"
  | "leaving-group";

export type MechanismStructureId =
  | "methyl-bromide"
  | "hydroxide"
  | "methanol"
  | "e2-anti-periplanar-substrate"
  | "water"
  | "2-butene";

export type MechanismAuthoringRequest = {
  substrateClass: "primary-alkyl-halide" | "secondary-alkyl-halide";
  reagentClass: "strong-nucleophile" | "strong-base";
  productClass: "substitution-product" | "alkene";
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
  accent: "blue" | "orange";
  playbackInterval: number;
  participants: readonly MechanismParticipant[];
  geometry: {
    backsideAttackDegrees?: number;
    antiPeriplanarDihedralDegrees?: number;
  };
  steps: readonly MechanismFamilyStep[];
};
