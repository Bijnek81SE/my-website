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

test("global search opens and navigates to a result", async ({ page }) => {
  await page.goto("/");

  const searchButton = page
    .getByRole("button", { name: /search organic chemistry hub/i })
    .first();

  await expect(searchButton).toBeVisible();
  await page.waitForFunction(
    () => document.documentElement.dataset.searchReady === "true",
  );
  await searchButton.click();

  const search = page.getByRole("combobox", {
    name: /search organic chemistry hub/i,
  });

  await expect(search).toBeVisible();
  await search.fill("resonance");

  const result = page.getByRole("option", { name: /Resonance/i });
  await expect(result).toBeVisible();
  await result.click();

  await expect(page).toHaveURL(/\/learn\/fundamentals\/resonance$/);
  await expect(page.getByText(/Resonance/i).first()).toBeVisible();
});
