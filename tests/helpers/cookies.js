export async function obtenerCookieUsuario(page) {
    const cookies = await page.context().cookies();

    const userCookie = cookies.find(
        cookie => cookie.name === 'user'
    );

    if (!userCookie) {
        throw new Error('No se encontró la cookie user');
    }

    return `user=${userCookie.value}`;
}