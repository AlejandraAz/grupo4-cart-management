const { test, expect } = require('@playwright/test');
const { PRODUCTS } = require('../data/products');

test('TC05b - Validar total con dos productos', async ({ page }) => {
  const producto1 = PRODUCTS.SONY_XPERIA_Z5;
  const producto2 = PRODUCTS.NOKIA_LUMIA_1520;

  await page.goto('/');

  await page.getByRole('link', { name: producto1.name }).click();
  await expect(page.locator('.price-container')).toContainText(
    `${producto1.price}`,
  );

  const dialogPromise1 = page.waitForEvent('dialog');
  await page.getByRole('link', { name: 'Add to cart' }).click();
  const dialog1 = await dialogPromise1;
  expect(dialog1.message()).toContain('Product added');
  await dialog1.accept();

  await page.goto('/');

  await page.getByRole('link', { name: producto2.name }).click();
  await expect(page.locator('.price-container')).toContainText(
    `${producto2.price}`,
  );

  const dialogPromise2 = page.waitForEvent('dialog');
  await page.getByRole('link', { name: 'Add to cart' }).click();
  const dialog2 = await dialogPromise2;
  expect(dialog2.message()).toContain('Product added');
  await dialog2.accept();

  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page.locator('#totalp')).toBeVisible();

  const totalMostrado = Number(await page.locator('#totalp').textContent());
  const totalEsperado = producto1.price + producto2.price;
  expect(totalMostrado).toBe(totalEsperado);
});
