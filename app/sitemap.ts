import type { MetadataRoute } from "next";
import { lessons } from "@/content/lessons";
import { getSitemapPlatformFeatures } from "@/content/platform";
import { reagents } from "@/content/reagents";
import { functionalGroups } from "@/content/references";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const platform = getSitemapPlatformFeatures().map((feature) => ({ route: feature.href, priority: feature.sitemap?.priority ?? 0.6, changeFrequency: feature.sitemap?.changeFrequency ?? "weekly" }));
  const content = [
    ...lessons.filter((lesson) => lesson.capabilities.sitemap).map((lesson) => ({ route: lesson.href, priority: 0.8, changeFrequency: "monthly" as const })),
    ...functionalGroups.map((entry) => ({ route: `/functional-groups/${entry.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    ...reagents.filter((entry) => entry.capabilities.reference).map((entry) => ({ route: `/reagents/${entry.slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
  ];
  const byRoute = new Map<string, { route: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }>();
  for (const item of [...platform, ...content]) byRoute.set(item.route, item);
  return [...byRoute.values()].map((item) => ({ url: absoluteUrl(item.route), priority: item.priority, changeFrequency: item.changeFrequency }));
}
