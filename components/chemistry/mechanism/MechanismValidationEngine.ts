import type { PracticeQuestion } from "./PracticeTypes";
import type {
  ReactionDataDefinition,
  ReactionHotspotDefinition,
  ReactionHotspotShape,
} from "./ReactionDataEngine";

export type MechanismValidationSeverity = "error" | "warning";

export type MechanismValidationIssue = {
  code: string;
  severity: MechanismValidationSeverity;
  message: string;
  path: string;
};

export type MechanismValidationReport = {
  mechanismId: string;
  valid: boolean;
  issues: MechanismValidationIssue[];
  errors: MechanismValidationIssue[];
  warnings: MechanismValidationIssue[];
};

export type ValidatableMechanismArrow = {
  id: string;
  label?: string;
  start?: { x: number; y: number };
  control?: { x: number; y: number };
  end?: { x: number; y: number };
};

export type ValidatableMechanismStep = {
  id: string;
  title: string;
  description: string;
  arrows?: readonly ValidatableMechanismArrow[];
};

export type MechanismValidationDefinition<
  TStep extends ValidatableMechanismStep,
  TTarget extends string,
> = {
  id: string;
  title: string;
  steps: readonly TStep[];
  questions: readonly PracticeQuestion<TTarget>[];
  reactionData: ReactionDataDefinition<TTarget>;
  getSceneForStep: (step: TStep, index: number) => string;
};

export class MechanismValidationError extends Error {
  readonly report: MechanismValidationReport;

  constructor(report: MechanismValidationReport) {
    const details = report.errors
      .map(
        (issue) =>
          `- [${issue.code}] ${issue.path}: ${issue.message}`,
      )
      .join("\n");

    super(
      `Mechanism validation failed for "${report.mechanismId}":\n${details}`,
    );

    this.name = "MechanismValidationError";
    this.report = report;
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function pushIssue(
  issues: MechanismValidationIssue[],
  issue: MechanismValidationIssue,
): void {
  issues.push(issue);
}

function validatePoint(
  issues: MechanismValidationIssue[],
  point: { x: number; y: number } | undefined,
  path: string,
): void {
  if (!point) {
    return;
  }

  if (!isFiniteNumber(point.x) || !isFiniteNumber(point.y)) {
    pushIssue(issues, {
      code: "INVALID_ARROW_POINT",
      severity: "error",
      path,
      message: "Arrow coordinates must be finite numbers.",
    });
  }
}

function validateGeometry(
  issues: MechanismValidationIssue[],
  geometry: ReactionHotspotShape,
  path: string,
): void {
  if (geometry.shape === "circle") {
    if (
      !isFiniteNumber(geometry.cx) ||
      !isFiniteNumber(geometry.cy) ||
      !isFiniteNumber(geometry.r) ||
      geometry.r <= 0
    ) {
      pushIssue(issues, {
        code: "INVALID_HOTSPOT_GEOMETRY",
        severity: "error",
        path,
        message:
          "Circle hotspots require finite cx/cy values and a positive radius.",
      });
    }

    return;
  }

  if (geometry.shape === "line") {
    if (
      !isFiniteNumber(geometry.x1) ||
      !isFiniteNumber(geometry.y1) ||
      !isFiniteNumber(geometry.x2) ||
      !isFiniteNumber(geometry.y2) ||
      !isFiniteNumber(geometry.strokeWidth) ||
      geometry.strokeWidth <= 0
    ) {
      pushIssue(issues, {
        code: "INVALID_HOTSPOT_GEOMETRY",
        severity: "error",
        path,
        message:
          "Line hotspots require finite endpoints and a positive stroke width.",
      });
    }

    return;
  }

  if (
    !isFiniteNumber(geometry.x) ||
    !isFiniteNumber(geometry.y) ||
    !isFiniteNumber(geometry.width) ||
    !isFiniteNumber(geometry.height) ||
    geometry.width <= 0 ||
    geometry.height <= 0 ||
    (geometry.rx !== undefined &&
      (!isFiniteNumber(geometry.rx) || geometry.rx < 0))
  ) {
    pushIssue(issues, {
      code: "INVALID_HOTSPOT_GEOMETRY",
      severity: "error",
      path,
      message:
        "Rectangle hotspots require finite coordinates and positive dimensions.",
    });
  }
}

function validateHotspot<TTarget extends string>(
  issues: MechanismValidationIssue[],
  hotspot: ReactionHotspotDefinition<TTarget>,
  index: number,
): void {
  const path = `reactionData.hotspots[${index}]`;

  if (!isNonEmptyString(hotspot.id)) {
    pushIssue(issues, {
      code: "MISSING_HOTSPOT_ID",
      severity: "error",
      path: `${path}.id`,
      message: "Every hotspot requires a non-empty id.",
    });
  }

  if (!isNonEmptyString(hotspot.target)) {
    pushIssue(issues, {
      code: "MISSING_HOTSPOT_TARGET",
      severity: "error",
      path: `${path}.target`,
      message: "Every hotspot requires a non-empty target.",
    });
  }

  if (!isNonEmptyString(hotspot.label)) {
    pushIssue(issues, {
      code: "MISSING_HOTSPOT_LABEL",
      severity: "error",
      path: `${path}.label`,
      message: "Every hotspot requires an accessible label.",
    });
  }

  if (hotspot.scenes.length === 0) {
    pushIssue(issues, {
      code: "MISSING_HOTSPOT_SCENE",
      severity: "error",
      path: `${path}.scenes`,
      message: "Every hotspot must be available in at least one scene.",
    });
  }

  if (new Set(hotspot.scenes).size !== hotspot.scenes.length) {
    pushIssue(issues, {
      code: "DUPLICATE_HOTSPOT_SCENE",
      severity: "warning",
      path: `${path}.scenes`,
      message: "The hotspot lists the same scene more than once.",
    });
  }

  validateGeometry(issues, hotspot.geometry, `${path}.geometry`);
}

export function validateMechanismDefinition<
  TStep extends ValidatableMechanismStep,
  TTarget extends string,
>(
  definition: MechanismValidationDefinition<TStep, TTarget>,
): MechanismValidationReport {
  const issues: MechanismValidationIssue[] = [];

  if (!isNonEmptyString(definition.id)) {
    pushIssue(issues, {
      code: "MISSING_MECHANISM_ID",
      severity: "error",
      path: "id",
      message: "A mechanism requires a non-empty id.",
    });
  }

  if (!isNonEmptyString(definition.title)) {
    pushIssue(issues, {
      code: "MISSING_MECHANISM_TITLE",
      severity: "error",
      path: "title",
      message: "A mechanism requires a non-empty title.",
    });
  }

  if (definition.reactionData.id !== definition.id) {
    pushIssue(issues, {
      code: "REACTION_DATA_ID_MISMATCH",
      severity: "error",
      path: "reactionData.id",
      message: `Expected reaction data id "${definition.id}" but received "${definition.reactionData.id}".`,
    });
  }

  if (definition.steps.length === 0) {
    pushIssue(issues, {
      code: "MISSING_STEPS",
      severity: "error",
      path: "steps",
      message: "A mechanism requires at least one step.",
    });
  }

  if (definition.questions.length === 0) {
    pushIssue(issues, {
      code: "MISSING_QUESTIONS",
      severity: "error",
      path: "questions",
      message: "A mechanism requires at least one question.",
    });
  }

  if (definition.steps.length !== definition.questions.length) {
    pushIssue(issues, {
      code: "STEP_QUESTION_COUNT_MISMATCH",
      severity: "error",
      path: "questions",
      message: `Expected one question per step, but found ${definition.steps.length} steps and ${definition.questions.length} questions.`,
    });
  }

  const stepIds = new Set<string>();
  const scenes = new Set<string>();

  definition.steps.forEach((step, stepIndex) => {
    const stepPath = `steps[${stepIndex}]`;

    if (!isNonEmptyString(step.id)) {
      pushIssue(issues, {
        code: "MISSING_STEP_ID",
        severity: "error",
        path: `${stepPath}.id`,
        message: "Every step requires a non-empty id.",
      });
    } else if (stepIds.has(step.id)) {
      pushIssue(issues, {
        code: "DUPLICATE_STEP_ID",
        severity: "error",
        path: `${stepPath}.id`,
        message: `Duplicate step id "${step.id}".`,
      });
    } else {
      stepIds.add(step.id);
    }

    if (!isNonEmptyString(step.title)) {
      pushIssue(issues, {
        code: "MISSING_STEP_TITLE",
        severity: "error",
        path: `${stepPath}.title`,
        message: "Every step requires a title.",
      });
    }

    if (!isNonEmptyString(step.description)) {
      pushIssue(issues, {
        code: "MISSING_STEP_DESCRIPTION",
        severity: "error",
        path: `${stepPath}.description`,
        message: "Every step requires a description.",
      });
    }

    const scene = definition.getSceneForStep(step, stepIndex);

    if (!isNonEmptyString(scene)) {
      pushIssue(issues, {
        code: "MISSING_STEP_SCENE",
        severity: "error",
        path: stepPath,
        message: "Every step must resolve to a non-empty reaction scene.",
      });
    } else {
      scenes.add(scene);
    }

    const stepArrowIds = new Set<string>();

    (step.arrows ?? []).forEach((arrow, arrowIndex) => {
      const arrowPath = `${stepPath}.arrows[${arrowIndex}]`;

      if (!isNonEmptyString(arrow.id)) {
        pushIssue(issues, {
          code: "MISSING_ARROW_ID",
          severity: "error",
          path: `${arrowPath}.id`,
          message: "Every arrow requires a non-empty id.",
        });
      } else if (stepArrowIds.has(arrow.id)) {
        pushIssue(issues, {
          code: "DUPLICATE_ARROW_ID",
          severity: "error",
          path: `${arrowPath}.id`,
          message: `Duplicate arrow id "${arrow.id}".`,
        });
      } else {
        stepArrowIds.add(arrow.id);
      }

      if (arrow.label !== undefined && !isNonEmptyString(arrow.label)) {
        pushIssue(issues, {
          code: "MISSING_ARROW_LABEL",
          severity: "error",
          path: `${arrowPath}.label`,
          message: "Arrow labels must not be empty.",
        });
      }

      validatePoint(issues, arrow.start, `${arrowPath}.start`);
      validatePoint(issues, arrow.control, `${arrowPath}.control`);
      validatePoint(issues, arrow.end, `${arrowPath}.end`);
    });
  });

  const hotspotIds = new Set<string>();
  const hotspotTargets = new Set<string>();

  definition.reactionData.hotspots.forEach((hotspot, index) => {
    validateHotspot(issues, hotspot, index);

    if (hotspotIds.has(hotspot.id)) {
      pushIssue(issues, {
        code: "DUPLICATE_HOTSPOT_ID",
        severity: "error",
        path: `reactionData.hotspots[${index}].id`,
        message: `Duplicate hotspot id "${hotspot.id}".`,
      });
    } else {
      hotspotIds.add(hotspot.id);
    }

    hotspotTargets.add(hotspot.target);

    hotspot.scenes.forEach((scene) => {
      if (!scenes.has(scene)) {
        pushIssue(issues, {
          code: "UNUSED_HOTSPOT_SCENE",
          severity: "warning",
          path: `reactionData.hotspots[${index}].scenes`,
          message: `Scene "${scene}" is not produced by any mechanism step.`,
        });
      }
    });
  });

  const questionIds = new Set<string>();

  definition.questions.forEach((question, questionIndex) => {
    const questionPath = `questions[${questionIndex}]`;

    if (!isNonEmptyString(question.id)) {
      pushIssue(issues, {
        code: "MISSING_QUESTION_ID",
        severity: "error",
        path: `${questionPath}.id`,
        message: "Every question requires a non-empty id.",
      });
    } else if (questionIds.has(question.id)) {
      pushIssue(issues, {
        code: "DUPLICATE_QUESTION_ID",
        severity: "error",
        path: `${questionPath}.id`,
        message: `Duplicate question id "${question.id}".`,
      });
    } else {
      questionIds.add(question.id);
    }

    if (!isNonEmptyString(question.topic)) {
      pushIssue(issues, {
        code: "MISSING_REVIEW_TOPIC",
        severity: "error",
        path: `${questionPath}.topic`,
        message: "Every question requires an explicit review topic.",
      });
    }

    if (!hotspotTargets.has(question.correctTarget)) {
      pushIssue(issues, {
        code: "UNKNOWN_QUESTION_TARGET",
        severity: "error",
        path: `${questionPath}.correctTarget`,
        message: `Target "${question.correctTarget}" does not exist in reaction data.`,
      });
    }

    const step = definition.steps[questionIndex];

    if (!step) {
      return;
    }

    const scene = definition.getSceneForStep(step, questionIndex);
    const targetAvailableInScene = definition.reactionData.hotspots.some(
      (hotspot) =>
        hotspot.target === question.correctTarget &&
        hotspot.scenes.includes(scene),
    );

    if (!targetAvailableInScene) {
      pushIssue(issues, {
        code: "QUESTION_TARGET_NOT_IN_STEP_SCENE",
        severity: "error",
        path: `${questionPath}.correctTarget`,
        message: `Target "${question.correctTarget}" is not interactive in scene "${scene}" for step "${step.id}".`,
      });
    }
  });

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter(
    (issue) => issue.severity === "warning",
  );

  return {
    mechanismId: definition.id,
    valid: errors.length === 0,
    issues,
    errors,
    warnings,
  };
}

export function assertValidMechanismDefinition<
  TStep extends ValidatableMechanismStep,
  TTarget extends string,
>(
  definition: MechanismValidationDefinition<TStep, TTarget>,
): MechanismValidationReport {
  const report = validateMechanismDefinition(definition);

  if (!report.valid) {
    throw new MechanismValidationError(report);
  }

  return report;
}
