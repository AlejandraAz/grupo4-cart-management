# QA Automation - DemoBlaze Cart Management

Trabajo Práctico Final QA Automation Bootcamp - Grupo 4

Playwright + DemoBlaze | Cart Management

## 📌 Descripción del Proyecto

Este repositorio contiene la solución de automatización desarrollada para el Trabajo Final del QA Automation Bootcamp de Rolling Code School.

El objetivo del proyecto es construir una suite de pruebas automatizadas sobre la plataforma DemoBlaze, una tienda online que permite validar funcionalidades tanto desde la interfaz de usuario (UI) como desde su API pública.

Este repositorio corresponde al **Grupo 4 – Cart Management**, enfocado en la gestión del carrito de compras.

---

## 👥 Equipo

**Grupo 4 – Cart Management**

| Integrante |
|------------|
|Alejandra Alaniz|
| Aldana Ojea Delgado |
| Milena Guitian |
| Macarena Santana |

### Epic

Shopping Cart

### User Story

> Como usuario, quiero administrar mi carrito para controlar los productos seleccionados.

### Alcance Funcional

* Agregar productos al carrito.
* Visualizar productos agregados.
* Eliminar productos del carrito.
* Vaciar completamente el carrito.
* Validar la actualización correcta del total.
* Validar el comportamiento del carrito vacío.

---

## 🧪 Casos de Prueba Automatizados

| ID   | Caso de Prueba                          | Alcance  |
| ---- | --------------------------------------- | -------- |
| TC01 | Agregar producto al carrito             | API + UI |
| TC02 | Validar producto visible en carrito     | API + UI |
| TC03 | Eliminar un producto del carrito        | UI       |
| TC04 | Vaciar el carrito completo              | API      |
| TC05 | Validar total actualizado correctamente | UI       |

### Nota Técnica

DemoBlaze únicamente expone un endpoint para eliminar completamente el carrito:

```http
POST /deletecart
```

Por este motivo:

* La eliminación individual de productos se valida mediante la interfaz de usuario.
* El vaciado completo del carrito se valida mediante API.

---

## 🚀 Tecnologías Utilizadas

* Playwright
* Playwright Codegen
* JavaScript
* Node.js
* ESLint
* Prettier
* Git
* GitHub
* GitHub Copilot
* VS Code Snippets

---

## 📂 Estructura del Proyecto

```text
qa-automation-demoblaze-cart-management/
│
├── tests/
│   ├── api/
│   │   └── cart.api.spec.js
│   │
│   ├── ui/
│   │   └── cart.ui.spec.js
│   │
│   └── e2e/
│       └── cart.e2e.spec.js
│
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```
### Organización de las pruebas

- **API Tests (`*.api.spec.js`)**
  - Utilizan únicamente `request`.
  - Validan la lógica del backend y los endpoints.

- **UI Tests (`*.ui.spec.js`)**
  - Utilizan únicamente `page`.
  - Validan la interfaz de usuario y la experiencia visual.

- **E2E Tests (`*.e2e.spec.js`)**
  - Combinan `request` y `page`.
  - Simulan flujos completos de usuario.

### Independencia de los tests

Cada prueba genera sus propios datos utilizando valores únicos, evitando dependencias entre tests y permitiendo la ejecución individual o conjunta de toda la suite.



## ⚙️ Instalación

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### Instalar dependencias

```bash
npm install
```

### Instalar navegadores de Playwright

```bash
npx playwright install
```

---

## ▶️ Ejecución de Tests

### Ejecutar toda la suite

```bash
npx playwright test
```

### Ejecutar únicamente pruebas UI

```bash
npx playwright test tests/ui
```

### Ejecutar únicamente pruebas API

```bash
npx playwright test tests/api
```

### Ejecutar en modo visual

```bash
npx playwright test --headed
```

### Abrir reporte

```bash
npx playwright show-report
```

---

## 🛠 Buenas Prácticas Aplicadas

* Separación de pruebas UI y API.
* Código formateado con Prettier.
* Validaciones estáticas con ESLint.
* Uso de snippets para acelerar el desarrollo.
* Generación inicial de locators mediante Playwright Codegen.
* Apoyo de GitHub Copilot para asistencia en el desarrollo.
* Control de versiones mediante Git y GitHub.

---

## 🎯 Objetivos de Aprendizaje

Este proyecto integra los principales conceptos trabajados durante el bootcamp:

* Locators
* Assertions
* Debugging
* API Testing
* UI Testing
* End-to-End Testing
* Playwright
* ESLint
* Prettier
* Git
* GitHub
* Automatización Full Stack

---

## 🏫 Contexto Académico

Proyecto desarrollado como Trabajo Final del:

**QA Automation Bootcamp**
Rolling Code School – Tucumán

El propósito es aplicar de manera práctica los conocimientos adquiridos durante el programa, construyendo una suite de automatización mantenible, escalable y alineada con buenas prácticas de testing.

## ✅ Estado del Proyecto

Trabajo final completado para el QA Automation Bootcamp.

Cobertura implementada:

- API Testing
- UI Testing
- End-to-End Testing
- Gestión de carrito de compras
