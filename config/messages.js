const PRODUCT_MESSAGES = {
  GET_PRODUCTS_ERROR: "Error al obtener los productos",
  GET_PRODUCT_ERROR: "Error al obtener el producto",
  CREATE_PRODUCT_ERROR: "Error al crear el producto",
  DELETE_PRODUCT_ERROR: "Error al eliminar el producto",
  BODY_EMPTY: "El body no puede estar vacío",
  NOT_FOUND: (id) => `Producto con ID ${id} no encontrado`,
  DELETE_SUCCESS: (id) => `Producto con ID ${id} eliminado correctamente`,
};

const ROUTE_NOT_FOUND = "Ruta no encontrada";

export { PRODUCT_MESSAGES, ROUTE_NOT_FOUND };
