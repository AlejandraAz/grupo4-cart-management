const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');

test('POST - Validar que el producto está agregado al carrito', async ({
  request,
}) => {
  const catalogResponse = await request.get(`${API}/entries`);
  expect(catalogResponse.status()).toBe(200);

  const productos = await catalogResponse.json();
  expect(productos.Items.length).toBeGreaterThan(0);

  const productId = productos.Items[0].id;
  const productTitle = productos.Items[0].title;
  const productPrice = productos.Items[0].price;

  const addToCartResponse = await request.post(`${API}/addtocart`, {
    data: {
      id_product: productId,
      desc: productTitle,
    },
  });

  expect(addToCartResponse.status()).toBe(200);
  console.log('✓ Producto agregado:', productTitle);

  const addedData = await addToCartResponse.json();
  expect(addedData).toBeDefined();
 

  expect(productId).toBeGreaterThan(0);
  expect(productTitle).toBeTruthy();
  expect(productPrice).toBeGreaterThan(0);

  console.log(`Validación completada para: ${productTitle} - $${productPrice}`);
});
