import {
  compileE2Mechanism,
  compileSn2Mechanism,
} from "./compiler";
import { compileAlkeneHalogenationMechanism } from "./families/alkene-halogenation";

export {
  compileE2Mechanism,
  compileSn2Mechanism,
  compileAlkeneHalogenationMechanism,
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
  halogenation: compileAlkeneHalogenationMechanism(),
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