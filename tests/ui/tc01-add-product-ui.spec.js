import { test, expect } from '@playwright/test';
import { PRODUCTS } from '../data/products';

test('TC01 - Add product a cart', async ({ page }) => {
    const producto = PRODUCTS.SONY_XPERIA_Z5;
    // Ir al home
    await page.goto('/');

    // Verificar que el producto existe
    await expect(
        page.getByRole('link', { name: producto.name })
    ).toBeVisible();

    // Abrir detalle
    await page.getByRole('link', { name: producto.name }).click();

    // Verificar que estamos en el detalle
    await expect(
        page.locator('.price-container')
    ).toContainText(`${producto.price}`);

    // Esperar el alert antes del click
    const dialogPromise = page.waitForEvent('dialog');

    // Agregar al carrito
    await page.getByRole('link', { name: 'Add to cart' }).click();

    // Validar alert
    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Product added');

    await dialog.accept();

    // Ir al carrito
    await page.getByRole('link', {
        name: 'Cart',
        exact: true,
    }).click();

    // Verificar que el producto está en el carrito
    await expect(
        page.locator('tbody')
    ).toContainText(producto.name);
});