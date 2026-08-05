import type { MetadataRoute } from "next";
import { lessons } from "@/content/lesson-registry";
import { functionalGroups, reagents } from "@/content/references";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/about",
  "/calculators",
  "/calculators/lewis-structure-builder",
  "/contact",
  "/editorial-policy",
  "/functional-groups",
  "/lab",
  "/lab/bond-playground",
  "/lab/curved-arrow-designer",
  "/lab/curved-arrow-playground",
  "/lab/e1-mechanism",
  "/lab/e2-mechanism",
  "/lab/electrophilic-addition",
  "/lab/functional-groups",
  "/lab/halogenation",
  "/lab/hybridization",
  "/lab/hydration",
  "/lab/hydroboration-oxidation",
  "/lab/hydrogenation",
  "/lab/hydrohalogenation",
  "/lab/lewis-structure-builder",
  "/lab/molecular-geometry",
  "/lab/molecular-polarity",
  "/lab/molecule-playground",
  "/lab/oxymercuration-demercuration",
  "/lab/radical-hbr-addition",
  "/lab/skeletal-molecule-builder",
  "/lab/sn1-mechanism",
  "/lab/sn2-mechanism",
  "/learn",
  "/named-reactions",
  "/reactions",
  "/reagents",
  "/resources",
  "/study",
] as const;

function priorityForRoute(route: string): number {
  if (route === "/") return 1;
  if (route === "/learn" || route === "/lab") return 0.9;
  if (route.startsWith("/learn/fundamentals/")) return 0.8;
  if (route.startsWith("/lab/")) return 0.7;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...lessons.map((lesson) => lesson.href),
    ...functionalGroups.map((entry) => `/functional-groups/${entry.slug}`),
    ...reagents.map((entry) => `/reagents/${entry.slug}`),
  ];
  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((route) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      route.startsWith("/learn/") ? "monthly" : "weekly";

    return {
      url: absoluteUrl(route),
      changeFrequency,
      priority: priorityForRoute(route),
    };
  });
}
