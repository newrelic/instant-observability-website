import { test, expect } from '@playwright/test';

const LANDING_PAGE_URL_PATH = '/node-js/01fdea36-5a15-44b4-a864-c4c99866735b';

test.describe('Landing page', () => {
  test('Header links to newrelic home, platform, pricing, solutions, docs, help center, log in', async ({
    page,
  }) => {
    await page.goto(LANDING_PAGE_URL_PATH);

    // Using Xpaths here because the location of these elements should not change
    const nrLogoLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/a'
    );
    const platformLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[1]/a',
      { hasText: 'Platform' }
    );
    const pricingLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[2]/a',
      { hasText: 'Pricing' }
    );
    const solutionsLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[3]/a',
      { hasText: 'Solutions' }
    );
    const docsLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[4]/a',
      { hasText: 'Docs' }
    );
    const helpCenterLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[5]/a',
      { hasText: 'Help Center' }
    );
    const loginLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/ul/li/a',
      { hasText: 'Log in' }
    );

    expect(await nrLogoLink.getAttribute('href')).toEqual(
      'https://newrelic.com'
    );
    expect(await platformLink.getAttribute('href')).toEqual(
      'https://newrelic.com/platform'
    );
    expect(await pricingLink.getAttribute('href')).toEqual(
      'https://newrelic.com/pricing'
    );
    expect(await solutionsLink.getAttribute('href')).toEqual(
      'https://newrelic.com/devops'
    );
    expect(await docsLink.getAttribute('href')).toEqual(
      'https://docs.newrelic.com/'
    );
    expect(await helpCenterLink.getAttribute('href')).toEqual(
      'https://discuss.newrelic.com/'
    );
    expect(await loginLink.getAttribute('href')).toEqual(
      'https://one.newrelic.com'
    );
  });

  test('Get started is not in the header', async ({ page }) => {
    await page.goto(LANDING_PAGE_URL_PATH);

    const getStartedLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/ul/li[2]/a',
      { hasText: 'Get Started' }
    );

    expect(await getStartedLink.count()).toEqual(0);
  });

  test('Top CTA links to the signup page in a new tab', async ({
    page,
    context,
  }) => {
    await page.goto(LANDING_PAGE_URL_PATH);

    const cta = page.locator('a', { hasText: 'Install now' }).first();

    await cta.click();
    await page.waitForTimeout(500); // wait for the new tab to open
    const pages = context.pages();

    await expect(pages[1]).toHaveURL('https://newrelic.com/signup');
  });

  test('Bread crumb links back to catalogue page', async ({ page }) => {
    await page.goto(LANDING_PAGE_URL_PATH);

    const breadcrumb = page.locator('//*[@aria-label="breadcrumb"]/span/a');

    //const link = breadcrumb.locator('a');
    await breadcrumb.click();

    await expect(page).toHaveURL(/.+\/$/);
  });
});

test.describe('Landing page with `ajs_user_id` cookie set', () => {
  test('CTA links to the product for installation', async ({
    page,
    context,
  }) => {
    context.addCookies([
      {
        name: 'ajs_user_id',
        value: 'testcontent',
        url: 'http://localhost',
      },
    ]);

    await page.goto(LANDING_PAGE_URL_PATH);

    const cta = page.locator('a', { hasText: 'Install now' }).first();

    await cta.click();
    await page.waitForTimeout(1000); // wait for the new tab to open
    const pages = context.pages();

    // Since we are not logged into NR1, this will redirect to the login page
    await expect(pages[1]).toHaveURL(/https:\/\/login\.newrelic.com\/login/);
  });
});

test.describe('Landing page with `utm_medium` query parameter in url', () => {
  const utmQueryParameter = 'utm_medium="test-content"';
  const urlWithParam = `${LANDING_PAGE_URL_PATH}?${utmQueryParameter}`;

  test('Header links to login', async ({ page, context }) => {
    await page.goto(urlWithParam);

    const loginLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/ul/li/a',
      { hasText: 'Log in' }
    );

    await loginLink.click();
    await page.waitForTimeout(1000); // wait for the new tab to open
    const pages = context.pages();
    await expect(pages[1]).toHaveURL(/https:\/\/login\.newrelic.com\/login/);
  });

  test('New Relic logo is not clickable', async ({ page }) => {
    await page.goto(urlWithParam);

    const nrLogoLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/a'
    );

    // Try clicking the logo
    // `force` stops playwright from checking if the element
    // can be clicked before attempting the click
    await nrLogoLink.click({ force: true });
    // The page should not have changed
    await expect(page).toHaveURL(urlWithParam);
  });

  test('Platform, pricing, solutions, docs, and help center links are not visible', async ({
    page,
  }) => {
    await page.goto(urlWithParam);

    // Using Xpaths here because the location of these elements should not change
    const platformLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[1]/a',
      { hasText: 'Platform' }
    );
    const pricingLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[2]/a',
      { hasText: 'Pricing' }
    );
    const solutionsLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[3]/a',
      { hasText: 'Solutions' }
    );
    const docsLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[4]/a',
      { hasText: 'Docs' }
    );
    const helpCenterLink = page.locator(
      '//*[@id="gatsby-focus-wrapper"]/div[1]/div/nav/ul/li[5]/a',
      { hasText: 'Help Center' }
    );

    expect(await platformLink.count()).toEqual(0);
    expect(await pricingLink.count()).toEqual(0);
    expect(await solutionsLink.count()).toEqual(0);
    expect(await docsLink.count()).toEqual(0);
    expect(await helpCenterLink.count()).toEqual(0);
  });
});
