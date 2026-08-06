export function parsePositiveNumber(value: string, label: string): number {
  const parsed = Number(value);
  if (!value.trim() || !Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }
  if (parsed <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }
  return parsed;
}

export function parseNonNegativeNumber(value: string, label: string): number {
  const parsed = Number(value);
  if (!value.trim() || !Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }
  if (parsed < 0) {
    throw new Error(`${label} cannot be negative.`);
  }
  return parsed;
}

export function assertFinitePositive(value: number, message: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error(message);
  return value;
}
