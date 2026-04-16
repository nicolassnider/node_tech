import {
  getAllProducts,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  deleteProduct as deleteProductService,
} from "../services/products.service.js";
import { PRODUCT_MESSAGES } from "../config/messages.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        message: PRODUCT_MESSAGES.GET_PRODUCTS_ERROR,
        error: error.message,
      });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: PRODUCT_MESSAGES.NOT_FOUND(id) });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: PRODUCT_MESSAGES.GET_PRODUCT_ERROR, error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: PRODUCT_MESSAGES.BODY_EMPTY });
    }

    const newProduct = await createProductService(data);
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: PRODUCT_MESSAGES.CREATE_PRODUCT_ERROR, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    res
      .status(200)
      .json({ message: PRODUCT_MESSAGES.DELETE_SUCCESS(id) });
  } catch (error) {
    res
      .status(500)
      .json({ message: PRODUCT_MESSAGES.DELETE_PRODUCT_ERROR, error: error.message });
  }
};
