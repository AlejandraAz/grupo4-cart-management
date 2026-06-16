const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');
const { obtenerCookieUsuario } = require('../helpers/cookies');

test('TC04 - Empty cart API', async ({ page, request }) => {

    await page.goto('/');

    const cookie = await obtenerCookieUsuario(page);

    const response = await request.post(`${API}/deletecart`, {
        data: {
            cookie,
        },
    });

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).toContain('Item deleted');
});