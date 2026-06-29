// Configuración centralizada de variables de entorno
export const settings = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "tu_secreto_aqui_para_desarrollo",
  JWT_EXPIRATION: "2h",
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
};

export const MOCK_USER = {
  email: "admin@gmail.com",
  password: "123456", 
  id: "user_123"
};

export const COLLECTIONS = {
  PRODUCTS: "products"
};
