import { PRODUCT_MESSAGES } from "../config/messages.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = asyncHandler(async (req, res) => {
    const products = await this.productService.getAllProducts();
    res.status(200).json(products);
  });

  getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new Error(PRODUCT_MESSAGES.NOT_FOUND(id));
    }

    res.status(200).json(product);
  });

  createProduct = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      throw new Error(PRODUCT_MESSAGES.BODY_EMPTY);
    }

    const newProduct = await this.productService.createProduct(data);
    res.status(201).json(newProduct);
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await this.productService.deleteProduct(id);
    res.status(200).json({ message: PRODUCT_MESSAGES.DELETE_SUCCESS(id) });
  });
}
