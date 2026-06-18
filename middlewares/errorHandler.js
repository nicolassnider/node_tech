import { PRODUCT_MESSAGES, AUTH_MESSAGES, SERVER_MESSAGES } from "../config/messages.js";

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url} - ${err.message}`);

  // Handle Auth Errors
  if (err.message === AUTH_MESSAGES.INVALID_CREDENTIALS) {
    return res.status(401).json({ message: err.message });
  }

  if (err.message === AUTH_MESSAGES.TOKEN_MISSING || err.message === AUTH_MESSAGES.TOKEN_INVALID) {
    return res.status(401).json({ message: err.message });
  }

  // Handle generic bad requests or validation errors (we can map specific errors here if needed)
  if (err.message === PRODUCT_MESSAGES.BODY_EMPTY) {
    return res.status(400).json({ message: err.message });
  }

  // Handle Product Not Found
  if (err.message && err.message.includes("no encontrado")) {
    return res.status(404).json({ message: err.message });
  }

  // Default Fallback
  res.status(500).json({ 
    message: SERVER_MESSAGES.INTERNAL_ERROR, 
    error: err.message 
  });
};
