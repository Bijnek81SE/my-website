import { ReactionHotspot } from "./ReactionCanvasEngine";

export type ReactionHotspotShape =
  | {
      shape: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      rx?: number;
    }
  | {
      shape: "circle";
      cx: number;
      cy: number;
      r: number;
    }
  | {
      shape: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      strokeWidth: number;
    };

export type ReactionHotspotDefinition<
  TTarget extends string,
> = {
  id: string;
  target: TTarget;
  label: string;
  scenes: readonly string[];
  geometry: ReactionHotspotShape;
};

export type ReactionDataDefinition<
  TTarget extends string,
> = {
  id: string;
  focusClassName: string;
  hotspots: readonly ReactionHotspotDefinition<TTarget>[];
};

export function defineReactionData<
  TTarget extends string,
>(
  definition: ReactionDataDefinition<TTarget>,
): ReactionDataDefinition<TTarget> {
  const ids = new Set<string>();

  for (const hotspot of definition.hotspots) {
    if (ids.has(hotspot.id)) {
      throw new Error(
        `Duplicate reaction hotspot id: ${hotspot.id}`,
      );
    }

    ids.add(hotspot.id);
  }

  return definition;
}

type ReactionHotspotLayerProps<
  TTarget extends string,
> = {
  data: ReactionDataDefinition<TTarget>;
  scene: string;
  interactive: boolean;
  onTargetClick?: (target: TTarget) => void;
};

export function ReactionHotspotLayer<
  TTarget extends string,
>({
  data,
  scene,
  interactive,
  onTargetClick,
}: ReactionHotspotLayerProps<TTarget>) {
  return (
    <>
      {data.hotspots
        .filter((hotspot) =>
          hotspot.scenes.includes(scene),
        )
        .map((hotspot) => {
          const common = {
            target: hotspot.target,
            label: hotspot.label,
            interactive,
            onTargetClick,
            focusClassName: data.focusClassName,
            fill: "transparent",
          };

          const geometry = hotspot.geometry;

          if (geometry.shape === "circle") {
            return (
              <ReactionHotspot
                key={hotspot.id}
                {...common}
                shape="circle"
                cx={geometry.cx}
                cy={geometry.cy}
                r={geometry.r}
              />
            );
          }

          if (geometry.shape === "rect") {
            return (
              <ReactionHotspot
                key={hotspot.id}
                {...common}
                shape="rect"
                x={geometry.x}
                y={geometry.y}
                width={geometry.width}
                height={geometry.height}
                rx={geometry.rx}
              />
            );
          }

          return (
            <ReactionHotspot
              key={hotspot.id}
              {...common}
              shape="line"
              x1={geometry.x1}
              y1={geometry.y1}
              x2={geometry.x2}
              y2={geometry.y2}
              strokeWidth={geometry.strokeWidth}
            />
          );
        })}
    </>
  );
}