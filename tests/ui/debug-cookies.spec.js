const { test } = require('@playwright/test');

test('Ver cookies de DemoBlaze', async ({ page }) => {
  await page.goto('/');

  const cookies = await page.context().cookies();

  console.log(cookies);
});
