export const siteConfig = {
  name: "Organic Chemistry Hub",
  shortName: "OC Hub",
  description:
    "Clear organic chemistry lessons, interactive mechanism labs, trusted reference guides, and practical chemistry tools.",
  origin: "https://bijan.se",
  locale: "en_US",
  language: "en",
  creator: "Organic Chemistry Hub",
  keywords: [
    "organic chemistry",
    "chemistry lessons",
    "reaction mechanisms",
    "curved arrows",
    "functional groups",
    "named reactions",
    "chemistry calculators",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.origin).toString();
}
