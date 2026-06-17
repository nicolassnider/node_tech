# E-Commerce Product Management API

Una API RESTful robusta y escalable desarrollada en **Node.js** y **Express** para la gestión del catálogo de productos de una tienda oficial. Permite a los administradores realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre el inventario de manera segura.

Los datos se almacenan en la nube utilizando **Firebase Firestore**, garantizando alta disponibilidad y escalabilidad. Además, cuenta con un sistema de autenticación basado en **JSON Web Tokens (JWT)** para proteger los endpoints sensibles y un manejo integral de errores.

---

## Tecnologías

- **Entorno de ejecución:** Node.js (ESModules habilitado)
- **Framework Web:** Express.js
- **Base de Datos:** Firebase Firestore
- **Autenticación:** JSON Web Token (JWT)
- **Middlewares:** CORS, Body-Parser
- **Variables de Entorno:** dotenv

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (Gestor de paquetes de Node)
- Una cuenta en [Firebase](https://firebase.google.com/) con un proyecto de Firestore configurado.

---

## Instalación y Configuración Local

1. **Clona el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase y la clave secreta para JWT:

   ```env
   PORT=3000
   JWT_SECRET=tu_super_secreto_aqui
   FIREBASE_API_KEY=tu_api_key
   FIREBASE_AUTH_DOMAIN=tu_auth_domain
   FIREBASE_PROJECT_ID=tu_project_id
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   FIREBASE_APP_ID=tu_app_id
   ```

4. **Inicia el servidor**

   Para ejecutar el servidor en un entorno de desarrollo (con autorecarga usando nodemon):
   ```bash
   npm run dev
   ```
   
   Para ejecutar el servidor en producción:
   ```bash
   npm start
   ```

   El servidor estará corriendo por defecto en `http://localhost:3000`.

5. **Ejecutar Pruebas Automatizadas**
   La API incluye tests de integración desarrollados con el test runner nativo de Node.js y Supertest. Para validar que todo funciona correctamente:

   ```bash
   npm test
   ```

---

## Arquitectura y Estructura del Proyecto

El proyecto sigue una arquitectura basada en capas para mantener el código modular, fácil de mantener y escalable:

```text
/
├── config/         # Configuración de Firebase y variables de entorno
├── controllers/    # Lógica de manejo de peticiones y respuestas
├── middlewares/    # Interceptores (ej. Autenticación JWT, Manejo de errores 404 globales)
├── models/         # Lógica de acceso a datos e interacción directa con Firestore
├── routes/         # Definición de endpoints de la API (products.routes.js, auth.routes.js)
├── services/       # Lógica de negocio, intermediario entre controladores y modelos
├── package.json    # Dependencias y scripts
└── index.js        # Punto de entrada de la aplicación y configuración de Express/CORS
```

---

## Documentación de la API

### Autenticación

Todas las peticiones a rutas protegidas deben incluir el token en el header `Authorization` usando el esquema Bearer.

- **`POST /auth/login`**
  - **Descripción:** Autentica a un usuario administrador.
  - **Body:** Credenciales de acceso.
  - **Respuesta:** Devuelve un `Bearer Token` si las credenciales son válidas.

### Productos (Catálogo)

*Nota: Se requiere token JWT válido para realizar operaciones de escritura.*

- **`GET /api/products`**
  - **Descripción:** Obtiene la lista completa de todos los productos del catálogo.
  
- **`GET /api/products/:id`**
  - **Descripción:** Obtiene los detalles de un producto específico mediante su ID.

- **`POST /api/products/create`**
  - **Descripción:** Crea y guarda un nuevo producto en Firestore.
  - **Body:** Objeto JSON con la información del producto.

- **`DELETE /api/products/:id`**
  - **Descripción:** Elimina un producto específico del inventario mediante su ID.

---

## Manejo de Errores

La API implementa un manejo de estado HTTP estándar para ofrecer respuestas claras:

- **`200/201`**: Operación exitosa.
- **`400 Bad Request`**: La petición es incorrecta o contiene errores en los datos enviados.
- **`401 Unauthorized`**: Falta el token de autenticación o es inválido (Error de autenticación).
- **`403 Forbidden`**: El usuario no tiene permisos suficientes.
- **`404 Not Found`**: El recurso, producto o la ruta solicitada no están definidos.
- **`500 Internal Server Error`**: Error crítico del servidor o falta de respuesta de servicios externos (Firebase).
