const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');

test('POST - add product to cart', async ({ request }) => {
  const catalogResponse = await request.get(`${API}/entries`);
  const productos = await catalogResponse.json();
  const productId = productos.Items[0].id;
  const productTitle = productos.Items[0].title;

  const addToCartResponse = await request.post(`${API}/addtocart`, {
    data: {
      id_product: productId,
      desc: productTitle,
    },
  });

  expect(addToCartResponse.status()).toBe(200);
  console.log('Producto agregado exitosamente:', productTitle);
});
