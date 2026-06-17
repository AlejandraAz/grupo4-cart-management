const { test, expect } = require('@playwright/test');
const { PRODUCTS } = require('../data/products');

test('TC01 - Add product a cart', async ({ page }) => {
  const producto = PRODUCTS.SONY_XPERIA_Z5;
  await page.goto('/');

  await expect(page.getByRole('link', { name: producto.name })).toBeVisible();

  await page.getByRole('link', { name: producto.name }).click();

  await expect(page.locator('.price-container')).toContainText(
    `${producto.price}`,
  );

  const dialogPromise = page.waitForEvent('dialog');

  await page.getByRole('link', { name: 'Add to cart' }).click();

  const dialog = await dialogPromise;

  expect(dialog.message()).toContain('Product added');

  await dialog.accept();

  await page
    .getByRole('link', {
      name: 'Cart',
      exact: true,
    })
    .click();

  await expect(page.locator('tbody')).toContainText(producto.name);
});
