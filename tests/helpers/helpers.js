/**
 * Helpers y constantes compartidas.
 * Importa esto en tus tests para no repetir codigo y usar los mismos valores.
 *
 * Ejemplo de uso:
 *   const { API, generarUsuario } = require('./helpers');
 */

// URLs base
const API = 'https://api.demoblaze.com';
const WEB = 'https://www.demoblaze.com';
import { page } from '@playwright/test';
/**
 * Genera un usuario unico usando la fecha actual.
 * Asi nunca choca con "usuario ya existe".
 */
function generarUsuario() {
  return {
    username: `alumno_${Date.now()}`,
    password: 'bootcamp123',
  };
}

/**
 * Crea un usuario por API. Devuelve las credenciales usadas.
 * Util para el setup de tests E2E.
 */
async function crearUsuarioPorAPI(request) {
  const usuario = generarUsuario();
  await request.post(`${API}/signup`, { data: usuario });
  return usuario;
}

// para iniciar sesion
async function loginUsuarioPorAPI(request, username, password) {
  const response = await request.post(`${API}/login`, {
    data: { username, password },
  });
  if (response.status() !== 200) {
    throw new Error(`Login failed: ${response.status()}`);
  }
  const text = await response.text();
  // Ejemplo de text: "Auth_token: YWx1bW5vXzE3ODE1..."
  const token = text.replace('Auth_token:', '').trim();
  return token;
}
async function enviarProductos(page,expect , productoName) {
  await page.goto(`${WEB}`);
  await page.getByRole('link', { name: productoName }).click();
  const dialogPromise1 = page.waitForEvent('dialog');
  await page.getByRole('link', { name: 'Add to cart' }).click();
  const dialog1 = await dialogPromise1;
  expect(dialog1.message()).toContain('Product added');
  await dialog1.accept();
}

module.exports = {
  API,
  WEB,
  loginUsuarioPorAPI,
  generarUsuario,
  crearUsuarioPorAPI,
  enviarProductos
};
