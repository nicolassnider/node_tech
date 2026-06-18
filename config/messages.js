const PRODUCT_MESSAGES = {
  BODY_EMPTY: "El body no puede estar vacío",
  NOT_FOUND: (id) => `Producto con ID ${id} no encontrado`,
  DELETE_SUCCESS: (id) => `Producto con ID ${id} eliminado correctamente`,
};

const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Credenciales inválidas",
  TOKEN_MISSING: "Token no proporcionado o formato incorrecto",
  TOKEN_INVALID: "Token inválido o expirado",
};

const ROUTE_NOT_FOUND = "Ruta no encontrada";

const SERVER_MESSAGES = {
  INTERNAL_ERROR: "Error interno del servidor",
  WELCOME: "Bienvenido a la API de E-Commerce",
  STATUS_ONLINE: "online",
};

export { PRODUCT_MESSAGES, AUTH_MESSAGES, ROUTE_NOT_FOUND, SERVER_MESSAGES };
