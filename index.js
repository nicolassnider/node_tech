import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import listEndpoints from "express-list-endpoints";

import productRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { ROUTE_NOT_FOUND, SERVER_MESSAGES } from "./config/messages.js";
import { settings } from "./config/settings.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

import { errorHandler } from "./middlewares/errorHandler.js";

// Logger de peticiones básico
app.use((req, res, next) => {
  console.info(`[Info] ${req.method} request a ${req.url}`);
  next();
});

// Rutas
app.get("/", (req, res) => {
  res.json({ message: SERVER_MESSAGES.WELCOME, status: SERVER_MESSAGES.STATUS_ONLINE });
});
app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);

// Ruta no definida — 404
app.use((req, res, next) => {
  const error = new Error(ROUTE_NOT_FOUND);
  error.status = 404;
  next(error);
});

// Manejador global de errores
app.use(errorHandler);

// Inicio del servidor (solo si no estamos en test)
if (process.env.NODE_ENV !== "test") {
  app.listen(settings.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${settings.PORT}`);
    console.log("\n--- Rutas Registradas ---");
    console.table(listEndpoints(app));
    console.log("-------------------------\n");
  });
}

export default app;
