const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');
const { obtenerCookieUsuario } = require('../helpers/cookies');
const { PRODUCTS } = require('../data/products');

test('TC04 - Empty cart API', async ({ page, request }) => {
  await page.goto('/');

  const cookie = await obtenerCookieUsuario(page);

  const tieneCarrito = await request.post(`${API}/viewcart`, {
    data: {
      cookie: cookie,
    },
  });
  await expect(tieneCarrito.status()).toBe(200);
  const response = await tieneCarrito.json();
  console.log('Che esta vacio? ', response.Items);

  expect(response.Items).toEqual([]);
});

test('TC04 - Add product to cart API, and delete it', async ({ page , request }) => {
  const productoID = PRODUCTS.SONY_XPERIA_Z5.id;
   await page.goto('/');

  const cookie = await obtenerCookieUsuario(page);
  
  const addToCartResponse = await request.post(`${API}/addtocart`, {
    data: {
      cookie: cookie,
      id: "8d725f3e-7651-2325-4cff-6345195cf43f", 
      prod_id: productoID,
      flag: false
    },
  });

  expect(addToCartResponse.status()).toBe(200);

  const response = await request.post(`${API}/deletecart`, {
    data: {
      cookie: cookie,
    },
  });

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('Item deleted');

  console.log(await response.json());
});
