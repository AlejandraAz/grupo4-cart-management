import { test, expect } from '@playwright/test';
import { PRODUCTS } from '../data/products';

test('TC05 - Validar total actualizado correctamente', async ({ page }) => {
    const producto = PRODUCTS.SONY_XPERIA_Z5;

    await page.goto('/');

    // Verificar que el producto existe
    await expect(
        page.getByRole('link', { name: producto.name })
    ).toBeVisible();

    // Abrir detalle
    await page.getByRole('link', { name: producto.name }).click();

    // Verificar precio en detalle
    await expect(
        page.locator('.price-container')
    ).toContainText(`${producto.price}`);

    // Manejar alerta de agregado (mismo patrón que TC01, TC02, TC03)
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart' }).click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();

    // Ir al carrito
    await page.getByRole('link', {
        name: 'Cart',
        exact: true,
    }).click();

    // Verificar que el total mostrado coincide con el precio del producto
    const total = await page.locator('#totalp').textContent();
    expect(Number(total)).toBe(producto.price);
});