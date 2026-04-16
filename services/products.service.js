import {
  fetchAllProducts,
  fetchProductById,
  insertProduct,
  removeProduct,
} from "../models/product.model.js";

export const getAllProducts = async () => {
  return await fetchAllProducts();
};

export const getProductById = async (id) => {
  return await fetchProductById(id);
};

export const createProduct = async (data) => {
  return await insertProduct(data);
};

export const deleteProduct = async (id) => {
  return await removeProduct(id);
};
