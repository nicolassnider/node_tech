import { ProductModel } from "../models/product.model.js";

const mockProducts = [
  {
    name: "Smartphone Galaxy S23",
    price: 899.99,
    description: "Teléfono inteligente con cámara de alta resolución y pantalla AMOLED.",
    category: "Electrónica",
    stock: 50,
  },
  {
    name: "Notebook Pro 15",
    price: 1299.50,
    description: "Portátil de alto rendimiento ideal para desarrolladores y diseñadores.",
    category: "Computación",
    stock: 20,
  },
  {
    name: "Auriculares Inalámbricos SoundMax",
    price: 149.99,
    description: "Auriculares con cancelación de ruido activa y batería de larga duración.",
    category: "Audio",
    stock: 100,
  },
  {
    name: "Monitor UltraWide 34\"",
    price: 450.00,
    description: "Monitor curvo ideal para multitarea y gaming inmersivo.",
    category: "Periféricos",
    stock: 15,
  },
  {
    name: "Teclado Mecánico RGB",
    price: 89.90,
    description: "Teclado mecánico con switches red, ideal para gaming y escritura.",
    category: "Periféricos",
    stock: 80,
  }
];

const seedDatabase = async () => {
  console.log("Iniciando carga de datos iniciales...");
  const productModel = new ProductModel();

  try {
    for (const product of mockProducts) {
      await productModel.insertProduct(product);
      console.log(`Producto guardado: ${product.name}`);
    }
    console.log("¡Base de datos poblada exitosamente con productos de prueba!");
    process.exit(0);
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    process.exit(1);
  }
};

seedDatabase();
