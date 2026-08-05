import { expect, test } from "@playwright/test";

const routes = [
  ["/", /Organic Chemistry Hub/i],
  ["/learn", /Learn/i],
  ["/learn/fundamentals/resonance", /Resonance/i],
  ["/lab", /Lab/i],
  ["/lab/sn2-mechanism", /SN2/i],
  ["/lab/hybridization", /Hybridization/i],
  ["/calculators/lewis-structure-builder", /Lewis/i],
] as const;

for (const [path, heading] of routes) {
  test(`${path} renders`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByText(heading).first()).toBeVisible();
  });
}
