import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { ProductService } from "../services/products.service.js";
import { ProductController } from "../controllers/products.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Inyección de Dependencias
const productModel = new ProductModel();
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/create", authMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;
