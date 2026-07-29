type ChargeProps = {
  charge?: number;
  radius: number;
  colour: string;
};

export function formatCharge(charge: number) {
  if (charge === 0) return "";

  const magnitude = Math.abs(charge);
  const sign = charge > 0 ? "+" : "−";

  return magnitude === 1 ? sign : `${magnitude}${sign}`;
}

export default function Charge({
  charge = 0,
  radius,
  colour,
}: ChargeProps) {
  if (charge === 0) return null;

  return (
    <text
      x={radius * 0.72}
      y={-radius * 0.72}
      textAnchor="start"
      dominantBaseline="middle"
      fill={colour}
      fontSize={Math.max(12, radius * 0.5)}
      fontWeight="800"
      pointerEvents="none"
    >
      {formatCharge(charge)}
    </text>
  );
}