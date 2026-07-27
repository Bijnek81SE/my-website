type LonePairProps = {
  x: number;
  y: number;
  direction?: "horizontal" | "vertical";
  colour?: string;
};

export default function LonePair({
  x,
  y,
  direction = "horizontal",
  colour = "#2563eb",
}: LonePairProps) {
  const horizontal = direction === "horizontal";

  return (
    <g fill={colour} aria-hidden="true">
      <circle cx={x + (horizontal ? -4 : 0)} cy={y + (horizontal ? 0 : -4)} r="3.5" />
      <circle cx={x + (horizontal ? 4 : 0)} cy={y + (horizontal ? 0 : 4)} r="3.5" />
    </g>
  );
}
