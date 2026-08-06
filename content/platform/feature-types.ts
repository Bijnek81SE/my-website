export type PlatformFeatureKind =
  | "site"
  | "lab"
  | "mechanism"
  | "calculator"
  | "reference";

export type PlatformSearchCategory =
  | "Mechanism"
  | "Lab"
  | "Calculator"
  | "Reference"
  | "Site";

export type PlatformSearchCapability = {
  category: PlatformSearchCategory;
  keywords: readonly string[];
};

export type PlatformSitemapCapability = {
  priority?: number;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
};

export type PlatformSmokeTestCapability = {
  expectedText: {
    source: string;
    flags?: string;
  };
};

export type PlatformFeature = {
  id: string;
  title: string;
  description: string;
  href: `/${string}` | "/";
  kind: PlatformFeatureKind;
  search?: PlatformSearchCapability;
  sitemap?: PlatformSitemapCapability;
  smokeTest?: PlatformSmokeTestCapability;
  tags?: readonly string[];
};
