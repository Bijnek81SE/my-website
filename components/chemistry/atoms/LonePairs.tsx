type LonePairsProps = {
  count?: number;
  radius: number;
  colour: string;
};

function lonePairPositions(count: number, radius: number) {
  const distance = radius + 13;

  const placements = [
    { x: 0, y: -distance, rotation: 0 },
    { x: distance, y: 0, rotation: 90 },
    { x: 0, y: distance, rotation: 0 },
    { x: -distance, y: 0, rotation: 90 },
  ];

  return placements.slice(0, Math.min(4, Math.max(0, count)));
}

export default function LonePairs({
  count = 0,
  radius,
  colour,
}: LonePairsProps) {
  if (count <= 0) return null;

  return (
    <>
      {lonePairPositions(count, radius).map((pair, index) => (
        <g
          key={index}
          transform={`translate(${pair.x} ${pair.y}) rotate(${pair.rotation})`}
          aria-hidden="true"
          pointerEvents="none"
        >
          <circle cx="-3" cy="0" r="2.1" fill={colour} />
          <circle cx="3" cy="0" r="2.1" fill={colour} />
        </g>
      ))}
    </>
  );
}