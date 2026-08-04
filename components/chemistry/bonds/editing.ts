import type {
  BondOrder,
  BondType,
} from "./Bond";

export type EditableBondStyle =
  | "single"
  | "double"
  | "triple"
  | "wedge"
  | "dash"
  | "aromatic"
  | "wavy";

export type BondRenderingState = {
  type: BondType;
  order: BondOrder;
};

const ORDER_SEQUENCE: readonly BondOrder[] = [
  1,
  2,
  3,
];

export function nextBondOrder(
  order: BondOrder,
): BondOrder {
  const index =
    ORDER_SEQUENCE.indexOf(order);

  return ORDER_SEQUENCE[
    (index + 1) % ORDER_SEQUENCE.length
  ];
}

export function previousBondOrder(
  order: BondOrder,
): BondOrder {
  const index =
    ORDER_SEQUENCE.indexOf(order);

  return ORDER_SEQUENCE[
    (index -
      1 +
      ORDER_SEQUENCE.length) %
      ORDER_SEQUENCE.length
  ];
}

export function bondStyleToRendering(
  style: EditableBondStyle,
): BondRenderingState {
  switch (style) {
    case "double":
      return {
        type: "line",
        order: 2,
      };

    case "triple":
      return {
        type: "line",
        order: 3,
      };

    case "wedge":
      return {
        type: "wedge",
        order: 1,
      };

    case "dash":
      return {
        type: "dash",
        order: 1,
      };

    case "aromatic":
      return {
        type: "aromatic",
        order: 1,
      };

    case "wavy":
      return {
        type: "wavy",
        order: 1,
      };

    case "single":
    default:
      return {
        type: "line",
        order: 1,
      };
  }
}

export function renderingToBondStyle({
  type,
  order,
}: BondRenderingState): EditableBondStyle {
  if (type === "wedge") {
    return "wedge";
  }

  if (type === "dash") {
    return "dash";
  }

  if (type === "aromatic") {
    return "aromatic";
  }

  if (type === "wavy") {
    return "wavy";
  }

  if (order === 2) {
    return "double";
  }

  if (order === 3) {
    return "triple";
  }

  return "single";
}

export function cycleBondStyle(
  style: EditableBondStyle,
): EditableBondStyle {
  switch (style) {
    case "single":
      return "double";

    case "double":
      return "triple";

    case "triple":
      return "single";

    case "wedge":
      return "dash";

    case "dash":
      return "wavy";

    case "wavy":
      return "wedge";

    case "aromatic":
      return "single";
  }
}