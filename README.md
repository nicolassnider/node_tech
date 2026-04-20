# NODE_TECH

Una herramienta de línea de comandos en **Node.js** para interactuar con la [FakeStore API](https://fakestoreapi.com/). Permite consultar, crear y eliminar productos directamente desde la terminal usando ESModules y `fetch` nativo.

---

## Requisitos

- Node.js v18 o superior
- npm

---

## Instalación

```bash
# Clona o descarga el proyecto
cd NODE_TECH

# Instala las dependencias (si las hay)
npm install
```

---

## Configuración del proyecto

El proyecto usa **ESModules** y expone un único script de entrada:

```json
// package.json (fragmento)
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "node --test"
  }
}
```

El punto de entrada es `index.js`. Los argumentos se capturan con `process.argv`.

---

## Uso

Todos los comandos se ejecutan con `npm run start` seguido del método HTTP y el recurso.

### Obtener todos los productos

```bash
npm run start GET products
```

Devuelve la lista completa de productos disponibles en la API.

---

### Obtener un producto por ID

```bash
npm run start GET products/<productId>
```

**Ejemplo:**

```bash
npm run start GET products/15
```

Devuelve los datos del producto con el ID indicado.

---

### Crear un producto nuevo

```bash
npm run start POST products <title> <price> <category>
```

**Ejemplo:**

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Envía una petición `POST` a la API con los datos proporcionados y devuelve el `id` del producto creado.

---

### Eliminar un producto

```bash
npm run start DELETE products/<productId>
```

**Ejemplo:**

```bash
npm run start DELETE products/7
```

Envía una petición `DELETE` para eliminar el producto con el ID indicado y muestra la respuesta de la API.

---

## Tests

El proyecto incluye pruebas unitarias básicas utilizando el test runner nativo de Node.js (`node:test`). Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

> **Nota para usuarios de Windows:** Si experimentas problemas con las políticas de ejecución de PowerShell al usar `npm run test`, puedes ejecutar las pruebas directamente con el comando `node --test` en tu terminal.

---

## Estructura del proyecto

```
NODE_TECH/
├── index.js        # Punto de entrada, lógica principal
├── package.json    # Configuración del proyecto
├── README.md       # Este archivo
├── utils/          # Utilidades y lógica de la aplicación (api, args, etc.)
└── tests/          # Pruebas unitarias nativas
```

---

## Decisiones técnicas

Durante el desarrollo de este proyecto se buscó aplicar principios de **Clean Architecture** y **SOLID**. Esto se refleja en la fuerte separación de responsabilidades, aislando la lógica en módulos específicos dentro de la carpeta `utils/` (tales como `api.js`, `validators.js` y `requestBuilder.js`). Esta estructura ayuda a mantener el código desacoplado, testeable y escalable.

| Herramienta / Patrón | Motivo |
|---|---|
| ESModules (`"type": "module"`) | Sintaxis moderna de `import/export` |
| Top-level `await` | Código asíncrono limpio en el punto de entrada |
| `fetch` nativo | Disponible en Node.js 18+, sin dependencias externas |
| `node:test` nativo | Ejecución de pruebas unitarias sin librerías de terceros |
| `process.argv` | Captura de argumentos desde la terminal |
| Destructuring & spread | Manipulación concisa de objetos y arrays |

---

## API de referencia

Este proyecto consume la [FakeStore API](https://fakestoreapi.com/).

| Endpoint | Método | Descripción |
|---|---|---|
| `/products` | `GET` | Lista todos los productos |
| `/products/:id` | `GET` | Obtiene un producto por ID |
| `/products` | `POST` | Crea un producto nuevo |
| `/products/:id` | `DELETE` | Elimina un producto por ID |

> **Nota:** FakeStore es una API de prueba. Las operaciones de escritura (`POST`, `DELETE`) no persisten datos reales, pero devuelven respuestas simuladas válidas para desarrollo.

---

## Licencia

MIT
