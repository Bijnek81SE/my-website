
import { ReactionHotspot } from "./ReactionCanvasEngine";

export type ReactionHotspotShape =
  | { shape: "rect"; x: number; y: number; width: number; height: number; rx?: number }
  | { shape: "circle"; cx: number; cy: number; r: number }
  | { shape: "line"; x1: number; y1: number; x2: number; y2: number; strokeWidth: number };

export type ReactionHotspotDefinition<TTarget extends string> = {
  id: string;
  target: TTarget;
  label: string;
  scenes: readonly string[];
  geometry: ReactionHotspotShape;
};

export type ReactionDataDefinition<TTarget extends string> = {
  id: string;
  focusClassName: string;
  hotspots: readonly ReactionHotspotDefinition<TTarget>[];
};

export function defineReactionData<TTarget extends string>(
  definition: ReactionDataDefinition<TTarget>,
): ReactionDataDefinition<TTarget> {
  const ids = new Set<string>();

  for (const hotspot of definition.hotspots) {
    if (ids.has(hotspot.id)) {
      throw new Error(`Duplicate reaction hotspot id: ${hotspot.id}`);
    }

    ids.add(hotspot.id);
  }

  return definition;
}

type ReactionHotspotLayerProps<TTarget extends string> = {
  data: ReactionDataDefinition<TTarget>;
  scene: string;
  interactive: boolean;
  onTargetClick?: (target: TTarget) => void;
};

export function ReactionHotspotLayer<TTarget extends string>({
  data,
  scene,
  interactive,
  onTargetClick,
}: ReactionHotspotLayerProps<TTarget>) {
  return (
    <>
      {data.hotspots
        .filter((hotspot) => hotspot.scenes.includes(scene))
        .map((hotspot) => {
          const common = {
            key: hotspot.id,
            target: hotspot.target,
            label: hotspot.label,
            interactive,
            onTargetClick,
            focusClassName: data.focusClassName,
            fill: "transparent",
          };

          if (hotspot.geometry.shape === "circle") {
            return (
              <ReactionHotspot
                {...common}
                shape="circle"
                cx={hotspot.geometry.cx}
                cy={hotspot.geometry.cy}
                r={hotspot.geometry.r}
              />
            );
          }

          if (hotspot.geometry.shape === "line") {
            return (
              <ReactionHotspot
                {...common}
                shape="line"
                x1={hotspot.geometry.x1}
                y1={hotspot.geometry.y1}
                x2={hotspot.geometry.x2}
                y2={hotspot.geometry.y2}
                stroke="transparent"
                strokeWidth={hotspot.geometry.strokeWidth}
              />
            );
          }

          return (
            <ReactionHotspot
              {...common}
              shape="rect"
              x={hotspot.geometry.x}
              y={hotspot.geometry.y}
              width={hotspot.geometry.width}
              height={hotspot.geometry.height}
              rx={hotspot.geometry.rx ?? 18}
            />
          );
        })}
    </>
  );
}
