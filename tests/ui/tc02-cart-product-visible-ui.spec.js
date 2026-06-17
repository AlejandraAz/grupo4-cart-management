import { test, expect } from '@playwright/test';
import { PRODUCTS } from '../data/products';

test('TC02 - Product visible in cart', async ({ page }) => {
  const producto = PRODUCTS.SONY_XPERIA_Z5;

  await page.goto('/');

  await page
    .getByRole('link', {
      name: producto.name,
    })
    .click();

  const dialogPromise = page.waitForEvent('dialog');

  await page
    .getByRole('link', {
      name: 'Add to cart',
    })
    .click();

  const dialog = await dialogPromise;

  expect(dialog.message()).toContain('Product added');

  await dialog.accept();

  await page
    .getByRole('link', {
      name: 'Cart',
      exact: true,
    })
    .click();

  const filaProducto = page.getByRole('row').filter({
    hasText: producto.name,
  });

  await expect(filaProducto).toBeVisible();

  await expect(filaProducto).toContainText(producto.name);

  await expect(filaProducto).toContainText(`${producto.price}`);

  await expect(page.getByRole('link', { name: 'Delete' })).toBeVisible();
});
