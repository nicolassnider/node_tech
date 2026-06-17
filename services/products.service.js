export class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async getAllProducts() {
    return await this.productModel.fetchAllProducts();
  }

  async getProductById(id) {
    return await this.productModel.fetchProductById(id);
  }

  async createProduct(data) {
    return await this.productModel.insertProduct(data);
  }

  async deleteProduct(id) {
    return await this.productModel.removeProduct(id);
  }

  async updateProduct(id, data) {
    return await this.productModel.modifyProduct(id, data);
  }
}

