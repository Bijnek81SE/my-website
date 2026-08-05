import {
  applyResonanceMove,
  validateResonanceMove,
} from "../graph/ResonanceEngine";
import {
  createMolecularGraph,
} from "../graph/MolecularGraph";
import {
  bondTypeOrderContribution,
  getMaximumValence,
  totalBondOrderForAtom,
} from "../bonds/validation";
import type {
  SkeletalAnnotation,
  SkeletalAtom,
  SkeletalBond,
  SkeletalBondType,
  SkeletalMoleculeDefinition,
} from "../skeletal/types";
import {
  validateMechanismStep,
} from "./MechanismStep";
import type {
  MechanismAnnotationChange,
  MechanismAtomChange,
  MechanismBondChange,
  MechanismPostcondition,
  MechanismPrecondition,
  MechanismStepDefinition,
} from "./MechanismStep";

export type MechanismExecutionIssueCode =
  | "invalid-step"
  | "precondition-failed"
  | "electron-move-invalid"
  | "electron-move-failed"
  | "atom-already-exists"
  | "atom-not-found"
  | "bond-already-exists"
  | "bond-not-found"
  | "annotation-already-exists"
  | "annotation-not-found"
  | "bond-endpoint-not-found"
  | "duplicate-connection"
  | "invalid-bond-order"
  | "change-failed"
  | "graph-invalid"
  | "postcondition-failed";

export type MechanismExecutionIssue = {
  code: MechanismExecutionIssueCode;
  message: string;
  stepId: string;
  itemId?: string;
  atomId?: string;
  bondId?: string;
  required: boolean;
};

export type MechanismExecutionOptions = {
  applyElectronMoves?: boolean;
  validateElectronMoves?: boolean;
  validateResultingGraph?: boolean;
};

export type MechanismExecutionResult = {
  success: boolean;
  molecule: SkeletalMoleculeDefinition;
  issues: readonly MechanismExecutionIssue[];
  appliedElectronMoveIds: readonly string[];
  appliedChangeIds: readonly string[];
};

type MutableMolecule = {
  id: string;
  name: string;
  atoms: SkeletalAtom[];
  bonds: SkeletalBond[];
  annotations: SkeletalAnnotation[];
};

function cloneMolecule(
  molecule: SkeletalMoleculeDefinition,
): MutableMolecule {
  return {
    id: molecule.id,
    name: molecule.name,
    atoms: molecule.atoms.map(
      (atom) => ({
        ...atom,
        position: { ...atom.position },
        labelOffset: atom.labelOffset
          ? { ...atom.labelOffset }
          : undefined,
      }),
    ),
    bonds: molecule.bonds.map(
      (bond) => ({ ...bond }),
    ),
    annotations: (
      molecule.annotations ?? []
    ).map((annotation) => ({
      ...annotation,
      position: { ...annotation.position },
    })),
  };
}

function toDefinition(
  molecule: MutableMolecule,
): SkeletalMoleculeDefinition {
  return {
    id: molecule.id,
    name: molecule.name,
    atoms: molecule.atoms,
    bonds: molecule.bonds,
    annotations: molecule.annotations,
  };
}

function replaceFromDefinition(
  target: MutableMolecule,
  source: SkeletalMoleculeDefinition,
): void {
  const cloned = cloneMolecule(source);

  target.id = cloned.id;
  target.name = cloned.name;
  target.atoms = cloned.atoms;
  target.bonds = cloned.bonds;
  target.annotations = cloned.annotations;
}

function findBondBetween(
  molecule: SkeletalMoleculeDefinition,
  firstAtomId: string,
  secondAtomId: string,
): SkeletalBond | undefined {
  return molecule.bonds.find(
    (bond) =>
      (bond.from === firstAtomId &&
        bond.to === secondAtomId) ||
      (bond.from === secondAtomId &&
        bond.to === firstAtomId),
  );
}

function typeForOrder(
  order: number,
  currentType: SkeletalBondType = "single",
): SkeletalBondType | null {
  if (order === 1) {
    if (
      currentType === "wedge" ||
      currentType === "dash" ||
      currentType === "wavy"
    ) {
      return currentType;
    }

    return "single";
  }

  if (order === 2) {
    return "double";
  }

  if (order === 3) {
    return "triple";
  }

  return null;
}

function hasValidValence(
  molecule: SkeletalMoleculeDefinition,
  atomId: string,
): boolean {
  const atom = molecule.atoms.find(
    (candidate) => candidate.id === atomId,
  );

  if (!atom) {
    return false;
  }

  const maximumValence =
    getMaximumValence(atom);

  if (maximumValence === undefined) {
    return true;
  }

  return (
    totalBondOrderForAtom(
      molecule,
      atomId,
    ) <= maximumValence
  );
}

function evaluatePrecondition(
  molecule: SkeletalMoleculeDefinition,
  step: MechanismStepDefinition,
  condition: MechanismPrecondition,
): boolean {
  const atom = condition.atomId
    ? molecule.atoms.find(
        (candidate) =>
          candidate.id === condition.atomId,
      )
    : undefined;

  const bond = condition.bondId
    ? molecule.bonds.find(
        (candidate) =>
          candidate.id === condition.bondId,
      )
    : undefined;

  switch (condition.type) {
    case "atom-exists":
      return atom !== undefined;

    case "atom-missing":
      return atom === undefined;

    case "bond-exists":
      return bond !== undefined;

    case "bond-missing":
      return bond === undefined;

    case "atom-charge":
      return (
        atom !== undefined &&
        (atom.charge ?? 0) ===
          condition.expectedCharge
      );

    case "atom-radical":
      return (
        atom !== undefined &&
        (atom.radical ?? false) ===
          condition.expectedRadical
      );

    case "bond-type":
      return (
        bond !== undefined &&
        (bond.type ?? "single") ===
          condition.expectedBondType
      );

    case "atoms-connected":
      return Boolean(
        condition.atomId &&
          condition.otherAtomId &&
          findBondBetween(
            molecule,
            condition.atomId,
            condition.otherAtomId,
          ),
      );

    case "atoms-not-connected":
      return Boolean(
        condition.atomId &&
          condition.otherAtomId &&
          !findBondBetween(
            molecule,
            condition.atomId,
            condition.otherAtomId,
          ),
      );

    case "maximum-valence":
      return Boolean(
        condition.atomId &&
          hasValidValence(
            molecule,
            condition.atomId,
          ),
      );

    case "resonance-move-valid": {
      const electronMove =
        step.electronMoves.find(
          (candidate) =>
            candidate.id ===
            condition.moveId,
        );

      return Boolean(
        electronMove &&
          validateResonanceMove(
            createMolecularGraph(molecule),
            electronMove.move,
          ).valid,
      );
    }

    case "custom":
      return true;

    default:
      return false;
  }
}

function evaluatePostcondition(
  molecule: SkeletalMoleculeDefinition,
  condition: MechanismPostcondition,
): boolean {
  const atom = condition.atomId
    ? molecule.atoms.find(
        (candidate) =>
          candidate.id === condition.atomId,
      )
    : undefined;

  const bond = condition.bondId
    ? molecule.bonds.find(
        (candidate) =>
          candidate.id === condition.bondId,
      )
    : undefined;

  switch (condition.type) {
    case "atom-exists":
      return atom !== undefined;

    case "atom-missing":
      return atom === undefined;

    case "bond-exists":
      return bond !== undefined;

    case "bond-missing":
      return bond === undefined;

    case "atom-charge":
      return (
        atom !== undefined &&
        (atom.charge ?? 0) ===
          condition.expectedCharge
      );

    case "atom-radical":
      return (
        atom !== undefined &&
        (atom.radical ?? false) ===
          condition.expectedRadical
      );

    case "bond-type":
      return (
        bond !== undefined &&
        (bond.type ?? "single") ===
          condition.expectedBondType
      );

    case "atoms-connected":
      return Boolean(
        condition.atomId &&
          condition.otherAtomId &&
          findBondBetween(
            molecule,
            condition.atomId,
            condition.otherAtomId,
          ),
      );

    case "atoms-not-connected":
      return Boolean(
        condition.atomId &&
          condition.otherAtomId &&
          !findBondBetween(
            molecule,
            condition.atomId,
            condition.otherAtomId,
          ),
      );

    case "valid-valence":
      return Boolean(
        condition.atomId &&
          hasValidValence(
            molecule,
            condition.atomId,
          ),
      );

    case "custom":
      return true;

    default:
      return false;
  }
}

function applyAtomChange(
  molecule: MutableMolecule,
  stepId: string,
  change: MechanismAtomChange,
): MechanismExecutionIssue | null {
  const atomIndex = molecule.atoms.findIndex(
    (atom) => atom.id === change.atomId,
  );

  if (change.type === "add") {
    if (atomIndex >= 0) {
      return {
        code: "atom-already-exists",
        message: `Atom "${change.atomId}" already exists.`,
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        required: true,
      };
    }

    if (!change.atom) {
      return {
        code: "change-failed",
        message: `Atom change "${change.id}" does not provide an atom.`,
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        required: true,
      };
    }

    molecule.atoms.push({
      ...change.atom,
      id: change.atomId,
      position: { ...change.atom.position },
      labelOffset: change.atom.labelOffset
        ? { ...change.atom.labelOffset }
        : undefined,
    });

    return null;
  }

  if (atomIndex < 0) {
    return {
      code: "atom-not-found",
      message: `Atom "${change.atomId}" was not found.`,
      stepId,
      itemId: change.id,
      atomId: change.atomId,
      required: true,
    };
  }

  if (change.type === "remove") {
    molecule.atoms.splice(atomIndex, 1);
    molecule.bonds = molecule.bonds.filter(
      (bond) =>
        bond.from !== change.atomId &&
        bond.to !== change.atomId,
    );

    return null;
  }

  const currentAtom = molecule.atoms[atomIndex];

  if (!currentAtom) {
    return null;
  }

  switch (change.type) {
    case "update":
      molecule.atoms[atomIndex] = {
        ...currentAtom,
        ...change.patch,
        id: currentAtom.id,
        position: change.patch?.position
          ? { ...change.patch.position }
          : currentAtom.position,
        labelOffset: change.patch?.labelOffset
          ? { ...change.patch.labelOffset }
          : currentAtom.labelOffset,
      };
      break;

    case "charge":
      molecule.atoms[atomIndex] = {
        ...currentAtom,
        charge:
          change.patch?.charge ??
          (currentAtom.charge ?? 0) +
            (change.chargeDelta ?? 0),
      };
      break;

    case "radical":
      molecule.atoms[atomIndex] = {
        ...currentAtom,
        radical:
          change.radical ??
          change.patch?.radical ??
          false,
      };
      break;

    case "position":
      if (!change.patch?.position) {
        return {
          code: "change-failed",
          message: `Atom change "${change.id}" does not provide patch.position.`,
          stepId,
          itemId: change.id,
          atomId: change.atomId,
          required: true,
        };
      }

      molecule.atoms[atomIndex] = {
        ...currentAtom,
        position: {
          ...change.patch.position,
        },
      };
      break;

    case "label":
      molecule.atoms[atomIndex] = {
        ...currentAtom,
        label: change.patch?.label,
        showLabel:
          change.patch?.showLabel ??
          currentAtom.showLabel,
        labelOffset:
          change.patch?.labelOffset
            ? {
                ...change.patch.labelOffset,
              }
            : currentAtom.labelOffset,
        fontSize:
          change.patch?.fontSize ??
          currentAtom.fontSize,
      };
      break;

    default:
      return {
        code: "change-failed",
        message: `Unsupported atom change "${change.id}".`,
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        required: true,
      };
  }

  return null;
}

function applyBondChange(
  molecule: MutableMolecule,
  stepId: string,
  change: MechanismBondChange,
): MechanismExecutionIssue | null {
  const bondIndex = molecule.bonds.findIndex(
    (bond) => bond.id === change.bondId,
  );

  if (change.type === "add") {
    if (bondIndex >= 0) {
      return {
        code: "bond-already-exists",
        message: `Bond "${change.bondId}" already exists.`,
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        required: true,
      };
    }

    const bond: SkeletalBond | undefined =
      change.bond
        ? {
            ...change.bond,
            id: change.bondId,
          }
        : change.fromAtomId &&
            change.toAtomId
          ? {
              id: change.bondId,
              from: change.fromAtomId,
              to: change.toAtomId,
              type:
                change.targetType ??
                change.patch?.type ??
                "single",
              ...change.patch,
            }
          : undefined;

    if (!bond) {
      return {
        code: "change-failed",
        message: `Bond change "${change.id}" does not provide bond endpoints.`,
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        required: true,
      };
    }

    const fromExists = molecule.atoms.some(
      (atom) => atom.id === bond.from,
    );
    const toExists = molecule.atoms.some(
      (atom) => atom.id === bond.to,
    );

    if (!fromExists || !toExists) {
      return {
        code: "bond-endpoint-not-found",
        message: `Bond "${change.bondId}" references an atom that does not exist.`,
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        required: true,
      };
    }

    if (
      findBondBetween(
        toDefinition(molecule),
        bond.from,
        bond.to,
      )
    ) {
      return {
        code: "duplicate-connection",
        message: `Atoms "${bond.from}" and "${bond.to}" are already connected.`,
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        required: true,
      };
    }

    molecule.bonds.push(bond);
    return null;
  }

  if (bondIndex < 0) {
    return {
      code: "bond-not-found",
      message: `Bond "${change.bondId}" was not found.`,
      stepId,
      itemId: change.id,
      bondId: change.bondId,
      required: true,
    };
  }

  if (change.type === "remove") {
    molecule.bonds.splice(bondIndex, 1);
    return null;
  }

  const currentBond = molecule.bonds[bondIndex];

  if (!currentBond) {
    return null;
  }

  if (change.type === "update") {
    const nextBond = {
      ...currentBond,
      ...change.patch,
      id: currentBond.id,
    };

    const fromExists = molecule.atoms.some(
      (atom) => atom.id === nextBond.from,
    );
    const toExists = molecule.atoms.some(
      (atom) => atom.id === nextBond.to,
    );

    if (!fromExists || !toExists) {
      return {
        code: "bond-endpoint-not-found",
        message: `Bond "${change.bondId}" references an atom that does not exist.`,
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        required: true,
      };
    }

    molecule.bonds[bondIndex] = nextBond;
    return null;
  }

  if (change.type === "set-polarity") {
    molecule.bonds[bondIndex] = {
      ...currentBond,
      polarity:
        change.patch?.polarity ??
        "none",
    };
    return null;
  }

  let targetType: SkeletalBondType | null = null;

  if (
    change.type === "set-order" ||
    change.type === "set-style"
  ) {
    targetType = change.targetType ?? null;
  } else if (
    change.type === "increase-order" ||
    change.type === "decrease-order"
  ) {
    const direction =
      change.type === "increase-order"
        ? 1
        : -1;
    const delta =
      change.orderDelta ?? direction;
    const nextOrder =
      bondTypeOrderContribution(
        currentBond.type,
      ) + delta;

    targetType = typeForOrder(
      nextOrder,
      currentBond.type,
    );
  }

  if (!targetType) {
    return {
      code: "invalid-bond-order",
      message: `Bond change "${change.id}" produces an unsupported bond order.`,
      stepId,
      itemId: change.id,
      bondId: change.bondId,
      required: true,
    };
  }

  molecule.bonds[bondIndex] = {
    ...currentBond,
    type: targetType,
  };

  return null;
}

function applyAnnotationChange(
  molecule: MutableMolecule,
  stepId: string,
  change: MechanismAnnotationChange,
): MechanismExecutionIssue | null {
  const annotationIndex =
    molecule.annotations.findIndex(
      (annotation) =>
        annotation.id ===
        change.annotationId,
    );

  if (change.type === "add") {
    if (annotationIndex >= 0) {
      return {
        code: "annotation-already-exists",
        message: `Annotation "${change.annotationId}" already exists.`,
        stepId,
        itemId: change.id,
        required: true,
      };
    }

    if (!change.annotation) {
      return {
        code: "change-failed",
        message: `Annotation change "${change.id}" does not provide an annotation.`,
        stepId,
        itemId: change.id,
        required: true,
      };
    }

    molecule.annotations.push({
      ...change.annotation,
      id: change.annotationId,
      position: {
        ...change.annotation.position,
      },
    });

    return null;
  }

  if (annotationIndex < 0) {
    return {
      code: "annotation-not-found",
      message: `Annotation "${change.annotationId}" was not found.`,
      stepId,
      itemId: change.id,
      required: true,
    };
  }

  if (change.type === "remove") {
    molecule.annotations.splice(
      annotationIndex,
      1,
    );
    return null;
  }

  const currentAnnotation =
    molecule.annotations[annotationIndex];

  if (!currentAnnotation) {
    return null;
  }

  molecule.annotations[annotationIndex] = {
    ...currentAnnotation,
    ...change.patch,
    id: currentAnnotation.id,
    position: change.patch?.position
      ? { ...change.patch.position }
      : currentAnnotation.position,
  };

  return null;
}

function conditionMessage(
  fallback: string,
  customMessage?: string,
): string {
  return customMessage?.trim() || fallback;
}

export function executeMechanismStep(
  molecule: SkeletalMoleculeDefinition,
  step: MechanismStepDefinition,
  options: MechanismExecutionOptions = {},
): MechanismExecutionResult {
  const applyElectronMoves =
    options.applyElectronMoves ??
    (step.atomChanges.length === 0 &&
      step.bondChanges.length === 0);
  const validateElectronMoves =
    options.validateElectronMoves ?? true;
  const validateResultingGraph =
    options.validateResultingGraph ?? true;

  const issues: MechanismExecutionIssue[] = [];
  const appliedElectronMoveIds: string[] = [];
  const appliedChangeIds: string[] = [];

  const stepValidation =
    validateMechanismStep(step);

  if (!stepValidation.valid) {
    return {
      success: false,
      molecule,
      issues: stepValidation.issues.map(
        (issue) => ({
          code: "invalid-step",
          message: issue.message,
          stepId: step.id,
          itemId: issue.itemId,
          atomId: issue.atomId,
          bondId: issue.bondId,
          required: true,
        }),
      ),
      appliedElectronMoveIds,
      appliedChangeIds,
    };
  }

  for (const condition of step.preconditions) {
    const passed = evaluatePrecondition(
      molecule,
      step,
      condition,
    );

    if (!passed) {
      const required =
        condition.required ?? true;

      issues.push({
        code: "precondition-failed",
        message: conditionMessage(
          `Precondition "${condition.id}" failed.`,
          condition.message,
        ),
        stepId: step.id,
        itemId: condition.id,
        atomId: condition.atomId,
        bondId: condition.bondId,
        required,
      });
    }
  }

  if (issues.some((issue) => issue.required)) {
    return {
      success: false,
      molecule,
      issues,
      appliedElectronMoveIds,
      appliedChangeIds,
    };
  }

  const working = cloneMolecule(molecule);

  for (const electronMove of step.electronMoves) {
    const required =
      electronMove.required ?? true;
    const currentMolecule =
      toDefinition(working);
    const graph = createMolecularGraph(
      currentMolecule,
    );

    if (validateElectronMoves) {
      const validation =
        validateResonanceMove(
          graph,
          electronMove.move,
        );

      if (!validation.valid) {
        issues.push({
          code: "electron-move-invalid",
          message:
            validation.issues
              .map((issue) => issue.message)
              .join(" ") ||
            `Electron move "${electronMove.id}" is invalid.`,
          stepId: step.id,
          itemId: electronMove.id,
          atomId:
            electronMove.move.sourceAtomId ??
            electronMove.move.targetAtomId,
          bondId:
            electronMove.move.sourceBondId ??
            electronMove.move.targetBondId,
          required,
        });

        if (required) {
          return {
            success: false,
            molecule,
            issues,
            appliedElectronMoveIds,
            appliedChangeIds,
          };
        }

        continue;
      }
    }

    if (!applyElectronMoves) {
      continue;
    }

    const nextMolecule = applyResonanceMove(
      graph,
      electronMove.move,
    );

    if (!nextMolecule) {
      issues.push({
        code: "electron-move-failed",
        message:
          electronMove.description ??
          `Electron move "${electronMove.id}" could not be applied.`,
        stepId: step.id,
        itemId: electronMove.id,
        atomId:
          electronMove.move.sourceAtomId ??
          electronMove.move.targetAtomId,
        bondId:
          electronMove.move.sourceBondId ??
          electronMove.move.targetBondId,
        required,
      });

      if (required) {
        return {
          success: false,
          molecule,
          issues,
          appliedElectronMoveIds,
          appliedChangeIds,
        };
      }

      continue;
    }

    replaceFromDefinition(
      working,
      nextMolecule,
    );
    appliedElectronMoveIds.push(
      electronMove.id,
    );
  }

  for (const change of step.atomChanges) {
    const issue = applyAtomChange(
      working,
      step.id,
      change,
    );

    if (issue) {
      return {
        success: false,
        molecule,
        issues: [...issues, issue],
        appliedElectronMoveIds,
        appliedChangeIds,
      };
    }

    appliedChangeIds.push(change.id);
  }

  for (const change of step.bondChanges) {
    const issue = applyBondChange(
      working,
      step.id,
      change,
    );

    if (issue) {
      return {
        success: false,
        molecule,
        issues: [...issues, issue],
        appliedElectronMoveIds,
        appliedChangeIds,
      };
    }

    appliedChangeIds.push(change.id);
  }

  for (
    const change of step.annotationChanges
  ) {
    const issue = applyAnnotationChange(
      working,
      step.id,
      change,
    );

    if (issue) {
      return {
        success: false,
        molecule,
        issues: [...issues, issue],
        appliedElectronMoveIds,
        appliedChangeIds,
      };
    }

    appliedChangeIds.push(change.id);
  }

  const resultMolecule =
    toDefinition(working);

  if (validateResultingGraph) {
    const graphValidation =
      createMolecularGraph(
        resultMolecule,
      ).validate();

    if (!graphValidation.valid) {
      return {
        success: false,
        molecule,
        issues: [
          ...issues,
          ...graphValidation.issues.map(
            (issue): MechanismExecutionIssue => ({
              code: "graph-invalid",
              message: issue.message,
              stepId: step.id,
              atomId: issue.atomId,
              bondId: issue.bondId,
              required: true,
            }),
          ),
        ],
        appliedElectronMoveIds,
        appliedChangeIds,
      };
    }
  }

  for (const condition of step.postconditions) {
    const passed = evaluatePostcondition(
      resultMolecule,
      condition,
    );

    if (!passed) {
      const required =
        condition.required ?? true;

      issues.push({
        code: "postcondition-failed",
        message: conditionMessage(
          `Postcondition "${condition.id}" failed.`,
          condition.message,
        ),
        stepId: step.id,
        itemId: condition.id,
        atomId: condition.atomId,
        bondId: condition.bondId,
        required,
      });
    }
  }

  if (issues.some((issue) => issue.required)) {
    return {
      success: false,
      molecule,
      issues,
      appliedElectronMoveIds,
      appliedChangeIds,
    };
  }

  return {
    success: true,
    molecule: resultMolecule,
    issues,
    appliedElectronMoveIds,
    appliedChangeIds,
  };
}