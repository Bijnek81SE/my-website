import { expect, test } from "@playwright/test";

const routes = [
  ["/", /Organic Chemistry Hub/i],
  ["/learn", /Learn/i],
  ["/study", /Study dashboard/i],
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

test("Resonance lesson hydrates without semantic HTML errors", async ({ page }) => {
  const hydrationErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;

    const text = message.text();
    if (
      text.includes("cannot be a descendant of") ||
      text.includes("cannot contain a nested") ||
      text.includes("Hydration failed")
    ) {
      hydrationErrors.push(text);
    }
  });

  page.on("pageerror", (error) => {
    if (error.message.includes("Hydration failed")) {
      hydrationErrors.push(error.message);
    }
  });

  await page.goto("/learn/fundamentals/resonance");
  await expect(page.getByRole("main")).toBeVisible();
  await page.waitForLoadState("networkidle");

  expect(hydrationErrors).toEqual([]);
});


test("lesson exposes canonical and learning-resource structured data", async ({ page }) => {
  await page.goto("/learn/fundamentals/resonance");

  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute(
    "href",
    "https://bijan.se/learn/fundamentals/resonance",
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  expect(jsonLd.some((value) => value.includes('"LearningResource"'))).toBe(true);
  expect(jsonLd.some((value) => value.includes('"BreadcrumbList"'))).toBe(true);
});

test("sitemap, robots, and manifest are published", async ({ request }) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    "https://bijan.se/learn/fundamentals/resonance",
  );

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain("Sitemap: https://bijan.se/sitemap.xml");

  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.ok()).toBe(true);
  expect(await manifestResponse.text()).toContain("Organic Chemistry Hub");
});

test("lesson progress is saved locally", async ({ page }) => {
  await page.goto("/learn/fundamentals/resonance");

  const completeButton = page.getByRole("button", {
    name: /mark lesson complete/i,
  });
  await expect(completeButton).toBeVisible();
  await completeButton.click();

  await expect(page.getByRole("heading", { name: "Completed" })).toBeVisible();
  const stored = await page.evaluate(() =>
    window.localStorage.getItem("organic-chemistry-hub:learning-progress:v1"),
  );
  expect(stored).toContain("lesson:resonance");
});


test("study dashboard reflects locally saved lesson progress", async ({ page }) => {
  await page.goto("/learn/fundamentals/resonance");
  await page.getByRole("button", { name: /mark lesson complete/i }).click();

  await page.goto("/study");
  await expect(page.getByRole("heading", { name: /study dashboard/i })).toBeVisible();
  await expect(page.getByText("Resonance").first()).toBeVisible();
  await expect(page.getByText(/1 of 7 lessons completed/i)).toBeVisible();
});
