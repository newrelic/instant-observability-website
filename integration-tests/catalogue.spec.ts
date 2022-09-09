import { test, expect } from '@playwright/test';

test.describe('Catalogue page', () => {
  test('select guided install', async ({ page }) => {
    await page.goto('/');

    // create a locator
    const installNR = page.locator('button', { hasText: 'Install New Relic' });

    // Click the get started link.
    await installNR.first().click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL('https://newrelic.com/signup');
  });

  test('select a category', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Instant Observability/);

    // create a locator
    const apmCategory = page.locator(
      'button >> text=Application monitoring >> visible=true'
    );

    // Click the get started link.
    await apmCategory.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.+?category=application-monitoring/);
  });

  test('enter a search term, hit enter', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Instant Observability/);

    // create a locator
    const searchInput = page.locator('input#catalogueSearch');

    // Click the get started link.
    await searchInput.fill('python');
    await searchInput.press('Enter');

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.+?search=python/);
  });
});
