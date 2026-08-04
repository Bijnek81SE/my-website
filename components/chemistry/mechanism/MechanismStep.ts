import type {
  CurvedArrowInput,
} from "../arrows/CurvedArrowEngine";
import type {
  ResonanceMove,
} from "../graph/ResonanceEngine";
import type {
  SkeletalAnnotation,
  SkeletalAtom,
  SkeletalBond,
  SkeletalBondPolarity,
  SkeletalBondType,
  SkeletalPoint,
} from "../skeletal/types";

export type MechanismStepKind =
  | "electron-transfer"
  | "bond-formation"
  | "bond-cleavage"
  | "proton-transfer"
  | "resonance"
  | "rearrangement"
  | "addition"
  | "elimination"
  | "substitution"
  | "oxidation"
  | "reduction"
  | "custom";

export type MechanismStepConfidence =
  | "high"
  | "medium"
  | "low";

export type MechanismElectronMove = {
  id: string;
  move: ResonanceMove;
  arrow?: CurvedArrowInput;
  description?: string;
  required?: boolean;
};

export type MechanismAtomChangeType =
  | "add"
  | "remove"
  | "update"
  | "charge"
  | "radical"
  | "position"
  | "label";

export type MechanismAtomPatch = {
  element?: string;
  label?: string;
  showLabel?: boolean;
  colour?: string;
  charge?: number;
  radical?: boolean;
  position?: SkeletalPoint;
  labelOffset?: SkeletalPoint;
  fontSize?: number;
  maxValence?: number;
};

export type MechanismAtomChange = {
  id: string;
  type: MechanismAtomChangeType;
  atomId: string;
  atom?: SkeletalAtom;
  patch?: MechanismAtomPatch;
  chargeDelta?: number;
  radical?: boolean;
  description?: string;
};

export type MechanismBondChangeType =
  | "add"
  | "remove"
  | "update"
  | "increase-order"
  | "decrease-order"
  | "set-order"
  | "set-style"
  | "set-polarity";

export type MechanismBondPatch = {
  from?: string;
  to?: string;
  type?: SkeletalBondType;
  colour?: string;
  strokeWidth?: number;
  spacing?: number;
  parallelOffset?: number;
  highlighted?: boolean;
  selected?: boolean;
  muted?: boolean;
  animated?: boolean;
  interactive?: boolean;
  polarity?: SkeletalBondPolarity;
  ariaLabel?: string;
  editable?: boolean;
  maxOrder?: 1 | 2 | 3;
  canBecomeAromatic?: boolean;
  canBecomeWedge?: boolean;
  canBecomeDash?: boolean;
  canBecomeWavy?: boolean;
};

export type MechanismBondChange = {
  id: string;
  type: MechanismBondChangeType;
  bondId: string;
  bond?: SkeletalBond;
  fromAtomId?: string;
  toAtomId?: string;
  patch?: MechanismBondPatch;
  orderDelta?: -2 | -1 | 1 | 2;
  targetType?: SkeletalBondType;
  description?: string;
};

export type MechanismAnnotationChangeType =
  | "add"
  | "remove"
  | "update";

export type MechanismAnnotationChange = {
  id: string;
  type: MechanismAnnotationChangeType;
  annotationId: string;
  annotation?: SkeletalAnnotation;
  patch?: Partial<
    Omit<SkeletalAnnotation, "id">
  >;
};

export type MechanismPreconditionType =
  | "atom-exists"
  | "atom-missing"
  | "bond-exists"
  | "bond-missing"
  | "atom-charge"
  | "atom-radical"
  | "bond-type"
  | "atoms-connected"
  | "atoms-not-connected"
  | "maximum-valence"
  | "resonance-move-valid"
  | "custom";

export type MechanismPrecondition = {
  id: string;
  type: MechanismPreconditionType;
  atomId?: string;
  otherAtomId?: string;
  bondId?: string;
  expectedCharge?: number;
  expectedRadical?: boolean;
  expectedBondType?: SkeletalBondType;
  moveId?: string;
  message?: string;
  required?: boolean;
};

export type MechanismPostconditionType =
  | "atom-exists"
  | "atom-missing"
  | "bond-exists"
  | "bond-missing"
  | "atom-charge"
  | "atom-radical"
  | "bond-type"
  | "atoms-connected"
  | "atoms-not-connected"
  | "valid-valence"
  | "custom";

export type MechanismPostcondition = {
  id: string;
  type: MechanismPostconditionType;
  atomId?: string;
  otherAtomId?: string;
  bondId?: string;
  expectedCharge?: number;
  expectedRadical?: boolean;
  expectedBondType?: SkeletalBondType;
  message?: string;
  required?: boolean;
};

export type MechanismStepAnnotation = {
  id: string;
  title?: string;
  text: string;
  position?: SkeletalPoint;
  atomId?: string;
  bondId?: string;
  colour?: string;
  fontSize?: number;
};

export type MechanismStepIssueCode =
  | "duplicate-change-id"
  | "duplicate-electron-move-id"
  | "duplicate-precondition-id"
  | "duplicate-postcondition-id"
  | "missing-electron-source"
  | "missing-electron-target"
  | "invalid-electron-count"
  | "invalid-atom-change"
  | "invalid-bond-change"
  | "invalid-annotation-change"
  | "invalid-precondition"
  | "invalid-postcondition"
  | "empty-step";

export type MechanismStepIssue = {
  code: MechanismStepIssueCode;
  message: string;
  stepId: string;
  itemId?: string;
  atomId?: string;
  bondId?: string;
};

export type MechanismStepValidationResult = {
  valid: boolean;
  issues: readonly MechanismStepIssue[];
};

export type MechanismStepDefinition = {
  id: string;
  kind: MechanismStepKind;
  title: string;
  description?: string;
  note?: string;

  electronMoves:
    readonly MechanismElectronMove[];

  atomChanges:
    readonly MechanismAtomChange[];

  bondChanges:
    readonly MechanismBondChange[];

  annotationChanges:
    readonly MechanismAnnotationChange[];

  annotations:
    readonly MechanismStepAnnotation[];

  preconditions:
    readonly MechanismPrecondition[];

  postconditions:
    readonly MechanismPostcondition[];

  reversible?: boolean;
  concerted?: boolean;
  rateDetermining?: boolean;
  confidence?: MechanismStepConfidence;
  tags?: readonly string[];
};

export type MechanismStepInput = {
  id?: string;
  kind?: MechanismStepKind;
  title: string;
  description?: string;
  note?: string;

  electronMoves?:
    readonly MechanismElectronMove[];

  atomChanges?:
    readonly MechanismAtomChange[];

  bondChanges?:
    readonly MechanismBondChange[];

  annotationChanges?:
    readonly MechanismAnnotationChange[];

  annotations?:
    readonly MechanismStepAnnotation[];

  preconditions?:
    readonly MechanismPrecondition[];

  postconditions?:
    readonly MechanismPostcondition[];

  reversible?: boolean;
  concerted?: boolean;
  rateDetermining?: boolean;
  confidence?: MechanismStepConfidence;
  tags?: readonly string[];
};

function slugify(
  value: string,
): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "step";
}

function sortedUnique(
  values: readonly string[],
): string[] {
  return [...new Set(values)].sort(
    (left, right) =>
      left.localeCompare(right),
  );
}

function createDeterministicStepId(
  input: MechanismStepInput,
): string {
  const identifiers = sortedUnique([
    ...(input.electronMoves ?? []).map(
      (item) => item.id,
    ),
    ...(input.atomChanges ?? []).map(
      (item) => item.id,
    ),
    ...(input.bondChanges ?? []).map(
      (item) => item.id,
    ),
  ]);

  const suffix =
    identifiers.length > 0
      ? `-${identifiers.join("-")}`
      : "";

  return `mechanism-step-${slugify(
    input.title,
  )}${suffix}`;
}

function duplicateValues(
  values: readonly string[],
): string[] {
  const seen = new Set<string>();
  const duplicates =
    new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates].sort(
    (left, right) =>
      left.localeCompare(right),
  );
}

function validateElectronMove(
  stepId: string,
  electronMove: MechanismElectronMove,
): MechanismStepIssue[] {
  const issues: MechanismStepIssue[] = [];
  const { move } = electronMove;

  const hasSource =
    Boolean(move.sourceAtomId) ||
    Boolean(move.sourceBondId);

  const hasTarget =
    Boolean(move.targetAtomId) ||
    Boolean(move.targetBondId);

  if (!hasSource) {
    issues.push({
      code: "missing-electron-source",
      stepId,
      itemId: electronMove.id,
      message:
        `Electron move "${electronMove.id}" has no source atom or bond.`,
    });
  }

  if (!hasTarget) {
    issues.push({
      code: "missing-electron-target",
      stepId,
      itemId: electronMove.id,
      message:
        `Electron move "${electronMove.id}" has no target atom or bond.`,
    });
  }

  if (
    move.electronCount !== 1 &&
    move.electronCount !== 2
  ) {
    issues.push({
      code: "invalid-electron-count",
      stepId,
      itemId: electronMove.id,
      message:
        `Electron move "${electronMove.id}" must move one or two electrons.`,
    });
  }

  return issues;
}

function validateAtomChange(
  stepId: string,
  change: MechanismAtomChange,
): MechanismStepIssue[] {
  if (
    change.type === "add" &&
    !change.atom
  ) {
    return [
      {
        code: "invalid-atom-change",
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        message:
          `Atom change "${change.id}" must provide an atom when adding one.`,
      },
    ];
  }

  if (
    change.type === "update" &&
    !change.patch
  ) {
    return [
      {
        code: "invalid-atom-change",
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        message:
          `Atom change "${change.id}" must provide a patch when updating an atom.`,
      },
    ];
  }

  if (
    change.type === "charge" &&
    change.chargeDelta === undefined &&
    change.patch?.charge === undefined
  ) {
    return [
      {
        code: "invalid-atom-change",
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        message:
          `Atom change "${change.id}" must provide chargeDelta or patch.charge.`,
      },
    ];
  }

  if (
    change.type === "radical" &&
    change.radical === undefined &&
    change.patch?.radical === undefined
  ) {
    return [
      {
        code: "invalid-atom-change",
        stepId,
        itemId: change.id,
        atomId: change.atomId,
        message:
          `Atom change "${change.id}" must specify the radical state.`,
      },
    ];
  }

  return [];
}

function validateBondChange(
  stepId: string,
  change: MechanismBondChange,
): MechanismStepIssue[] {
  if (
    change.type === "add" &&
    !change.bond &&
    (
      !change.fromAtomId ||
      !change.toAtomId
    )
  ) {
    return [
      {
        code: "invalid-bond-change",
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        message:
          `Bond change "${change.id}" must provide a bond or both endpoint atom IDs.`,
      },
    ];
  }

  if (
    change.type === "update" &&
    !change.patch
  ) {
    return [
      {
        code: "invalid-bond-change",
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        message:
          `Bond change "${change.id}" must provide a patch.`,
      },
    ];
  }

  if (
    (
      change.type === "set-order" ||
      change.type === "set-style"
    ) &&
    !change.targetType
  ) {
    return [
      {
        code: "invalid-bond-change",
        stepId,
        itemId: change.id,
        bondId: change.bondId,
        message:
          `Bond change "${change.id}" must provide targetType.`,
      },
    ];
  }

  return [];
}

function validateAnnotationChange(
  stepId: string,
  change: MechanismAnnotationChange,
): MechanismStepIssue[] {
  if (
    change.type === "add" &&
    !change.annotation
  ) {
    return [
      {
        code: "invalid-annotation-change",
        stepId,
        itemId: change.id,
        message:
          `Annotation change "${change.id}" must provide an annotation.`,
      },
    ];
  }

  if (
    change.type === "update" &&
    !change.patch
  ) {
    return [
      {
        code: "invalid-annotation-change",
        stepId,
        itemId: change.id,
        message:
          `Annotation change "${change.id}" must provide a patch.`,
      },
    ];
  }

  return [];
}

function validatePrecondition(
  stepId: string,
  condition: MechanismPrecondition,
): MechanismStepIssue[] {
  const atomCondition =
    condition.type === "atom-exists" ||
    condition.type === "atom-missing" ||
    condition.type === "atom-charge" ||
    condition.type === "atom-radical" ||
    condition.type === "maximum-valence";

  const bondCondition =
    condition.type === "bond-exists" ||
    condition.type === "bond-missing" ||
    condition.type === "bond-type";

  const connectionCondition =
    condition.type === "atoms-connected" ||
    condition.type ===
      "atoms-not-connected";

  if (
    atomCondition &&
    !condition.atomId
  ) {
    return [
      {
        code: "invalid-precondition",
        stepId,
        itemId: condition.id,
        message:
          `Precondition "${condition.id}" requires atomId.`,
      },
    ];
  }

  if (
    bondCondition &&
    !condition.bondId
  ) {
    return [
      {
        code: "invalid-precondition",
        stepId,
        itemId: condition.id,
        message:
          `Precondition "${condition.id}" requires bondId.`,
      },
    ];
  }

  if (
    connectionCondition &&
    (
      !condition.atomId ||
      !condition.otherAtomId
    )
  ) {
    return [
      {
        code: "invalid-precondition",
        stepId,
        itemId: condition.id,
        message:
          `Precondition "${condition.id}" requires two atom IDs.`,
      },
    ];
  }

  if (
    condition.type ===
      "resonance-move-valid" &&
    !condition.moveId
  ) {
    return [
      {
        code: "invalid-precondition",
        stepId,
        itemId: condition.id,
        message:
          `Precondition "${condition.id}" requires moveId.`,
      },
    ];
  }

  return [];
}

function validatePostcondition(
  stepId: string,
  condition: MechanismPostcondition,
): MechanismStepIssue[] {
  const atomCondition =
    condition.type === "atom-exists" ||
    condition.type === "atom-missing" ||
    condition.type === "atom-charge" ||
    condition.type === "atom-radical" ||
    condition.type === "valid-valence";

  const bondCondition =
    condition.type === "bond-exists" ||
    condition.type === "bond-missing" ||
    condition.type === "bond-type";

  const connectionCondition =
    condition.type === "atoms-connected" ||
    condition.type ===
      "atoms-not-connected";

  if (
    atomCondition &&
    !condition.atomId
  ) {
    return [
      {
        code: "invalid-postcondition",
        stepId,
        itemId: condition.id,
        message:
          `Postcondition "${condition.id}" requires atomId.`,
      },
    ];
  }

  if (
    bondCondition &&
    !condition.bondId
  ) {
    return [
      {
        code: "invalid-postcondition",
        stepId,
        itemId: condition.id,
        message:
          `Postcondition "${condition.id}" requires bondId.`,
      },
    ];
  }

  if (
    connectionCondition &&
    (
      !condition.atomId ||
      !condition.otherAtomId
    )
  ) {
    return [
      {
        code: "invalid-postcondition",
        stepId,
        itemId: condition.id,
        message:
          `Postcondition "${condition.id}" requires two atom IDs.`,
      },
    ];
  }

  return [];
}

export function createMechanismStep(
  input: MechanismStepInput,
): MechanismStepDefinition {
  return {
    id:
      input.id ??
      createDeterministicStepId(input),
    kind:
      input.kind ??
      "electron-transfer",
    title: input.title,
    description:
      input.description,
    note: input.note,
    electronMoves: [
      ...(input.electronMoves ?? []),
    ],
    atomChanges: [
      ...(input.atomChanges ?? []),
    ],
    bondChanges: [
      ...(input.bondChanges ?? []),
    ],
    annotationChanges: [
      ...(input.annotationChanges ??
        []),
    ],
    annotations: [
      ...(input.annotations ?? []),
    ],
    preconditions: [
      ...(input.preconditions ?? []),
    ],
    postconditions: [
      ...(input.postconditions ?? []),
    ],
    reversible:
      input.reversible ?? false,
    concerted:
      input.concerted ?? false,
    rateDetermining:
      input.rateDetermining ?? false,
    confidence:
      input.confidence ?? "high",
    tags: sortedUnique(
      input.tags ?? [],
    ),
  };
}

export function validateMechanismStep(
  step: MechanismStepDefinition,
): MechanismStepValidationResult {
  const issues: MechanismStepIssue[] = [];

  const collections = [
    {
      code: "duplicate-electron-move-id",
      values:
        step.electronMoves.map(
          (item) => item.id,
        ),
    },
    {
      code: "duplicate-change-id",
      values: [
        ...step.atomChanges.map(
          (item) => item.id,
        ),
        ...step.bondChanges.map(
          (item) => item.id,
        ),
        ...step.annotationChanges.map(
          (item) => item.id,
        ),
      ],
    },
    {
      code: "duplicate-precondition-id",
      values:
        step.preconditions.map(
          (item) => item.id,
        ),
    },
    {
      code: "duplicate-postcondition-id",
      values:
        step.postconditions.map(
          (item) => item.id,
        ),
    },
  ] as const;

  for (const collection of collections) {
    for (
      const duplicate of
      duplicateValues(
        collection.values,
      )
    ) {
      issues.push({
        code: collection.code,
        stepId: step.id,
        itemId: duplicate,
        message:
          `Identifier "${duplicate}" occurs more than once in mechanism step "${step.id}".`,
      });
    }
  }

  for (
    const electronMove of
    step.electronMoves
  ) {
    issues.push(
      ...validateElectronMove(
        step.id,
        electronMove,
      ),
    );
  }

  for (
    const change of
    step.atomChanges
  ) {
    issues.push(
      ...validateAtomChange(
        step.id,
        change,
      ),
    );
  }

  for (
    const change of
    step.bondChanges
  ) {
    issues.push(
      ...validateBondChange(
        step.id,
        change,
      ),
    );
  }

  for (
    const change of
    step.annotationChanges
  ) {
    issues.push(
      ...validateAnnotationChange(
        step.id,
        change,
      ),
    );
  }

  for (
    const condition of
    step.preconditions
  ) {
    issues.push(
      ...validatePrecondition(
        step.id,
        condition,
      ),
    );
  }

  for (
    const condition of
    step.postconditions
  ) {
    issues.push(
      ...validatePostcondition(
        step.id,
        condition,
      ),
    );
  }

  const hasOperation =
    step.electronMoves.length > 0 ||
    step.atomChanges.length > 0 ||
    step.bondChanges.length > 0 ||
    step.annotationChanges.length >
      0;

  if (!hasOperation) {
    issues.push({
      code: "empty-step",
      stepId: step.id,
      message:
        `Mechanism step "${step.id}" contains no electron, atom, bond, or annotation changes.`,
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function mechanismStepToCurvedArrowInputs(
  step: MechanismStepDefinition,
): readonly CurvedArrowInput[] {
  return step.electronMoves.map(
    (electronMove) => {
      if (electronMove.arrow) {
        return {
          ...electronMove.arrow,
          id:
            electronMove.arrow.id ??
            `arrow-${electronMove.id}`,
        };
      }

      const { move } =
        electronMove;

      return {
        id: `arrow-${electronMove.id}`,
        sourceType:
          move.sourceType,
        sourceAtomId:
          move.sourceAtomId,
        sourceBondId:
          move.sourceBondId,
        targetType:
          move.targetType,
        targetAtomId:
          move.targetAtomId,
        targetBondId:
          move.targetBondId,
        electronCount:
          move.electronCount,
      };
    },
  );
}

export function getMechanismStepAtomIds(
  step: MechanismStepDefinition,
): readonly string[] {
  return sortedUnique([
    ...step.atomChanges.map(
      (change) =>
        change.atomId,
    ),
    ...step.bondChanges.flatMap(
      (change) => [
        change.fromAtomId,
        change.toAtomId,
      ],
    ),
    ...step.electronMoves.flatMap(
      ({ move }) => [
        move.sourceAtomId,
        move.targetAtomId,
      ],
    ),
    ...step.annotations.map(
      (annotation) =>
        annotation.atomId,
    ),
  ].filter(
    (
      value,
    ): value is string =>
      Boolean(value),
  ));
}

export function getMechanismStepBondIds(
  step: MechanismStepDefinition,
): readonly string[] {
  return sortedUnique([
    ...step.bondChanges.map(
      (change) =>
        change.bondId,
    ),
    ...step.electronMoves.flatMap(
      ({ move }) => [
        move.sourceBondId,
        move.targetBondId,
      ],
    ),
    ...step.annotations.map(
      (annotation) =>
        annotation.bondId,
    ),
  ].filter(
    (
      value,
    ): value is string =>
      Boolean(value),
  ));
}