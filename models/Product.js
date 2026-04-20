class Product {
  constructor({ id, title, price, category, description, image, rating }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description || "Sin descripción";
    this.image = image || null;
    if (rating) {
      this.rating = rating;
    }
  }

  // Opcional: un método para mostrar el producto de forma amigable en la consola
  toString() {
    return `[ID: ${this.id}] ${this.title} - $${this.price} (${this.category})`;
  }
}

export { Product };
