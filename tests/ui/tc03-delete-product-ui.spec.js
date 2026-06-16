import { test, expect } from '@playwright/test';
import { PRODUCTS } from '../data/products';

test('TC03 - Delete product from cart ', async ({ page }) => {
    const producto = PRODUCTS.SONY_XPERIA_Z5;
    await page.goto('/');
    await page.getByRole('link', {
        name: producto.name,
    }).click();
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', {
        name: 'Add to cart',
    }).click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
    await page.getByRole('link', {
        name: 'Cart',
        exact: true,
    }).click();

    // Localizar la fila del producto
    const filaProducto = page.getByRole('row').filter({
        hasText: producto.name,
    });

    // Verificar que existe antes de eliminarlo
    await expect(filaProducto).toBeVisible();
    await expect(filaProducto).toContainText(producto.name);
    await expect(filaProducto).toContainText(`${producto.price}`);

    // Eliminar producto
    await page.getByRole('link', {
        name: 'Delete',
    }).click();

    // Verificar que desapareció del carrito
    await expect(
        page.locator('tbody')
    ).not.toContainText(producto.name);
});