import { test, expect } from '@playwright/test';

test('Bijan homepage remains separate', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('video')).toBeVisible();
  await expect(page.locator('.brand')).toHaveCount(0);
});

test('catalog search, persistent cart and comparison', async ({ page }) => {
  await page.goto('/mobiltronic/catalog');
  await page.getByLabel('جست‌وجوی محصول').fill('PNC560');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.getByRole('button', { name: /افزودن به سبد استعلام/ }).click();
  await page.goto('/mobiltronic/cart');
  await page.getByLabel('تعداد pnc560').fill('12');
  await page.reload();
  await expect(page.getByLabel('تعداد pnc560')).toHaveValue('12');
  await page.goto('/mobiltronic/compare');
  await page.getByLabel('PNC560', { exact: true }).check();
  await page.getByLabel('PNC380', { exact: true }).check();
  await expect(page.getByRole('table')).toContainText('۵۰۴۰');
  await expect(page.getByRole('table')).toContainText('۴۰۰۰');
});

test('checkout is disabled for an empty cart', async ({ page }) => {
  await page.goto('/mobiltronic/checkout');
  await expect(page.getByRole('button', { name: 'ثبت درخواست استعلام' })).toBeDisabled();
});

test('mobile RTL layout and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/mobiltronic');
  await expect(page.locator('[dir="rtl"]').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.locator('.mobile-menu summary').click();
  await expect(page.locator('.mobile-menu nav')).toBeVisible();
  await page.screenshot({ path: 'test-results/mobiltronic-mobile.png', fullPage: true });
});
