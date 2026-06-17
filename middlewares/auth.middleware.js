import jwt from "jsonwebtoken";
import { settings } from "../config/settings.js";
import { AUTH_MESSAGES } from "../config/messages.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: AUTH_MESSAGES.TOKEN_MISSING });
    }

    const token = authHeader.split(" ")[1];

    // Verificación asíncrona del token JWT usando Promesas
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, settings.JWT_SECRET || "tu_secreto_aqui_para_desarrollo", (err, decodedData) => {
        if (err) reject(err);
        else resolve(decodedData);
      });
    });

    // Guardamos la información del usuario en el request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: AUTH_MESSAGES.TOKEN_INVALID });
  }
};
