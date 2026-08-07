import {
  compileE2Mechanism,
  compileSn2Mechanism,
} from "./compiler";

export {
  compileE2Mechanism,
  compileSn2Mechanism,
};

export {
  compileMechanismRequest,
  resolveMechanismFamily,
} from "./mechanism-family-recipes";
export {
  validateCompiledMechanism,
} from "./mechanism-authoring-validation";

export {
  compileSemanticArrow,
  evaluateGeometryContract,
} from "./family-geometry-engine";

export {
  getAuthoringStructure,
  resolveSemanticAnchor,
} from "./semantic-anchor-registry";

/**
 * Reference authoring examples used by the experimental
 * generated player.
 *
 * These are compiled through the new semantic-geometry
 * layer while the older request/resolver API remains
 * available independently.
 */
export const mechanismAuthoringExamples = {
  sn2: compileSn2Mechanism(),
  e2: compileE2Mechanism(),
} as const;

export type {
  CompiledMechanismDefinition,
  MechanismFamilyId,
  MechanismFamilyStep,
  MechanismGeometryContract,
  SemanticAnchorRef,
  SemanticArrowDefinition,
  StructurePlacement,
} from "./types";

export type {
  MechanismAuthoringRequest,
  SupportedMechanismFamily,
} from "./mechanism-authoring-types";