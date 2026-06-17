import jwt from "jsonwebtoken";
import { settings } from "../config/settings.js";
import { AUTH_MESSAGES } from "../config/messages.js";

const mockUser = {
  email: "admin@tienda.com",
  password: "password123", 
  id: "user_123"
};

export class AuthService {
  async authenticateUser(email, password) {
    console.info(`[Auth] Intento de inicio de sesión para el usuario: ${email}`);

    // Simulamos operación asíncrona
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email !== mockUser.email || password !== mockUser.password) {
      console.warn(`[Auth] Fallo de inicio de sesión para: ${email} - Credenciales inválidas`);
      throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    console.info(`[Auth] Inicio de sesión exitoso para: ${email}`);

    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: mockUser.id, email: mockUser.email },
        settings.JWT_SECRET || "tu_secreto_aqui_para_desarrollo",
        { expiresIn: "2h" },
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  }
}
