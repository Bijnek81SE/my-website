import EngineBond, {
  type BondOrder,
  type BondPolarity,
  type BondType,
  type Point,
} from "./bonds/Bond";

type LegacyBondProps = {
  from: Point;
  to: Point;
  order?: BondOrder;
  atomRadius?: number;
  gap?: number;
  dashed?: boolean;
  stroke?: string;
  strokeWidth?: number;
  spacing?: number;
  selected?: boolean;
  muted?: boolean;
  animated?: boolean;
  interactive?: boolean;
  polarity?: BondPolarity;
  type?: BondType;
  selectedColour?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

function insetBond(
  from: Point,
  to: Point,
  inset: number,
): {
  start: Point;
  end: Point;
} | null {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return null;
  }

  const usableInset = Math.min(inset, length / 2);
  const ux = dx / length;
  const uy = dy / length;

  return {
    start: {
      x: from.x + ux * usableInset,
      y: from.y + uy * usableInset,
    },
    end: {
      x: to.x - ux * usableInset,
      y: to.y - uy * usableInset,
    },
  };
}

export default function Bond({
  from,
  to,
  order = 1,
  atomRadius = 31,
  gap = 5,
  dashed = false,
  stroke = "#0f172a",
  strokeWidth = 4,
  spacing = 6,
  selected = false,
  muted = false,
  animated = false,
  interactive = false,
  polarity = "none",
  type,
  selectedColour = "#2563eb",
  className,
  ariaLabel = "Chemical bond",
  onClick,
}: LegacyBondProps) {
  const coordinates = insetBond(from, to, atomRadius + gap);

  if (!coordinates) {
    return null;
  }

  return (
    <EngineBond
      start={coordinates.start}
      end={coordinates.end}
      order={order}
      type={type ?? (dashed ? "aromatic" : "line")}
      polarity={polarity}
      selected={selected}
      muted={muted}
      animated={animated}
      interactive={interactive}
      strokeWidth={strokeWidth}
      spacing={spacing}
      colour={stroke}
      selectedColour={selectedColour}
      className={className}
      ariaLabel={ariaLabel}
      onClick={onClick}
    />
  );
}