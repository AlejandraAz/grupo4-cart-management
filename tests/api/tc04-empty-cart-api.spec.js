const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');
const { obtenerCookieUsuario } = require('../helpers/cookies');

test('TC04 - Empty cart API', async ({ page, request }) => {
  await page.goto('/');

  const cookie = await obtenerCookieUsuario(page);

  const tieneCarrito = await request.post(`${API}/viewcart`, {
    data: {
      cookie: 'cookies',
    },
  });
  await expect(tieneCarrito.status()).toBe(200);
  const response = await tieneCarrito.json();
  console.log('Che esta vacio? ', response.Items);

  expect(response.Items).toEqual([]);
});

test('TC04 - Add product to cart API, and delete it', async ({ request }) => {
  const productoID = PRODUCTS.SONY_XPERIA_Z5.id;
  const tieneCarrito = await cargarCarrito(request, productoID);

  expect(tieneCarrito.status()).toBe(200);

  const response = await request.post(`${API}/deletecart`, {
    data: {
      cookie: 'cookie',
    },
  });

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('Item deleted');

  console.log(await response.json());
});
