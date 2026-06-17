import { Router } from "express";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();

// Inyección de dependencias
const authService = new AuthService();
const authController = new AuthController(authService);

// Endpoint de login
router.post("/login", authController.login);

export default router;
