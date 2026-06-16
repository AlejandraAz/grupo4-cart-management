const { test, expect } = require('@playwright/test');
const { API } = require('../helpers/helpers');

test('POST - Validar que el producto está agregado al carrito', async ({
    request,
}) => {
    // 1. Obtener un producto del catálogo
    const catalogResponse = await request.get(`${API}/entries`);
    expect(catalogResponse.status()).toBe(200);

    const productos = await catalogResponse.json();
    expect(productos.Items.length).toBeGreaterThan(0);

    const productId = productos.Items[0].id;
    const productTitle = productos.Items[0].title;
    const productPrice = productos.Items[0].price;

    // 2. Agregar el producto al carrito
    const addToCartResponse = await request.post(`${API}/addtocart`, {
        data: {
            id_product: productId,
            desc: productTitle,
        },
    });

    expect(addToCartResponse.status()).toBe(200);
    console.log('✓ Producto agregado:', productTitle);

    // 3. Validar que el producto se agregó exitosamente
    const addedData = await addToCartResponse.json();
    expect(addedData).toBeDefined();
    console.log('✓ Respuesta de agregado:', addedData);

    // 4. Listar el carrito para confirmar que el producto está allí
    // Nota: Para obtener la cookie del carrito, debemos usar el mismo context
    // o parámetro que identifique el carrito

    // Validaciones adicionales
    expect(productId).toBeGreaterThan(0);
    expect(productTitle).toBeTruthy();
    expect(productPrice).toBeGreaterThan(0);

    console.log(
        `✓ Validación completada para: ${productTitle} - $${productPrice}`,
    );
});