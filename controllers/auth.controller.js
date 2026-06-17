import { AUTH_MESSAGES } from "../config/messages.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Credenciales incompletas" });
    }

    const token = await this.authService.authenticateUser(email, password);
    res.status(200).json({ token });
  });
}
