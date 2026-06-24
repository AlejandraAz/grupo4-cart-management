import { test, expect } from '@playwright/test';
import { PRODUCTS } from '../data/products';
import { obtenerCookieUsuario } from '../helpers/cookies';
import { API } from '../helpers/helpers';

test('E2E - Cart Management Flow', async ({ page, request }) => {

    const producto1 = PRODUCTS.SONY_XPERIA_Z5;
    const producto2 = PRODUCTS.NOKIA_LUMIA_1520;



    await page.goto('/');

    const cookie = await obtenerCookieUsuario(page);

    const deleteResponse = await request.post(
        `${API}/deletecart`,
        {
            data: {
                cookie,
            },
        }
    );

    expect(deleteResponse.status()).toBe(200);



    await page.goto('/');

    await page.getByRole('link', {
        name: producto1.name,
    }).click();

    let dialogPromise = page.waitForEvent('dialog');

    await page.getByRole('link', {
        name: 'Add to cart',
    }).click();

    let dialog = await dialogPromise;

    expect(dialog.message()).toContain('Product added');

    await dialog.accept();



    await page.getByRole('link', {
        name: 'Home (current)',
    }).click();

    await page.getByRole('link', {
        name: producto2.name,
    }).click();

    dialogPromise = page.waitForEvent('dialog');

    await page.getByRole('link', {
        name: 'Add to cart',
    }).click();

    dialog = await dialogPromise;

    expect(dialog.message()).toContain('Product added');

    await dialog.accept();

    

    await page.getByRole('link', {
        name: 'Cart',
        exact: true,
    }).click();

    await expect(
        page.locator('tbody')
    ).toContainText(producto1.name);

    await expect(
        page.locator('tbody')
    ).toContainText(producto2.name);

    

    const totalEsperado =
        producto1.price +
        producto2.price;

    await expect(
        page.locator('#totalp')
    ).toHaveText(String(totalEsperado));
});