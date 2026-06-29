import jwt from "jsonwebtoken";
import { settings, MOCK_USER } from "../config/settings.js";
import { AUTH_MESSAGES } from "../config/messages.js";

export class AuthService {
  async authenticateUser(email, password) {
    console.info(`[Auth] Intento de inicio de sesión para el usuario: ${email}`);

    // Simulamos operación asíncrona
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
      console.warn(`[Auth] Fallo de inicio de sesión para: ${email} - Credenciales inválidas`);
      throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    console.info(`[Auth] Inicio de sesión exitoso para: ${email}`);

    return this.generateToken({ id: MOCK_USER.id, email: MOCK_USER.email });
  }

  generateToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        settings.JWT_SECRET,
        { expiresIn: settings.JWT_EXPIRATION },
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  }
}
