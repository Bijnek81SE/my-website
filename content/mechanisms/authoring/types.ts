import type { MechanismArrow, MechanismPoint } from "@/components/chemistry/mechanism/types";

export type MechanismFamilyId = "sn2" | "e2" | "alkene-halogenation";

export type StructurePlacement = {
  structureId: string;
  x: number;
  y: number;
  scale: number;
};

export type SemanticAnchorRef =
  | {
      kind: "atom";
      placementId: string;
      atomId: string;
      offset?: MechanismPoint;
    }
  | {
      kind: "bond-midpoint";
      placementId: string;
      bondId: string;
      offset?: MechanismPoint;
    }
  | {
      kind: "lone-pair";
      placementId: string;
      atomId: string;
      lonePair: "upper-left" | "upper-right" | "left" | "right";
      distance?: number;
      offset?: MechanismPoint;
    };

export type SemanticArrowDefinition = {
  id: string;
  source: SemanticAnchorRef;
  target: SemanticAnchorRef;
  colour: string;
  label: string;
  bend: number;
  controlOffset?: MechanismPoint;
};

export type MechanismGeometryContract =
  | {
      type: "backside-attack";
      nucleophile: SemanticAnchorRef;
      center: SemanticAnchorRef;
      leavingGroup: SemanticAnchorRef;
      expectedDegrees: 180;
      toleranceDegrees: number;
    }
  | {
      type: "anti-periplanar";
      firstBond: SemanticAnchorRef;
      secondBond: SemanticAnchorRef;
      expectedDegrees: 180;
      toleranceDegrees: number;
    }
  | {
      type: "anti-addition";
      nucleophile: SemanticAnchorRef;
      attackedCenter: SemanticAnchorRef;
      bridgeAtom: SemanticAnchorRef;
      productRelationship: "opposite-faces";
    };

export type MechanismFamilyStep = {
  id: string;
  title: string;
  description: string;
  note: string;
  scene: string;
  arrows: MechanismArrow[];
};

export type CompiledMechanismDefinition = {
  mechanismId?: string;
  family: MechanismFamilyId;
  title: string;
  description: string;
  accent: "blue" | "orange" | "violet";
  playbackInterval: number;
  steps: readonly MechanismFamilyStep[];
  geometryContracts: readonly MechanismGeometryContract[];
};
