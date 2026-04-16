import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ROUTE_NOT_FOUND } from "./config/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);

// Ruta no definida — 404
app.use((req, res) => {
  res.status(404).json({ message: ROUTE_NOT_FOUND });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
