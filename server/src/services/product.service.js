const { Product } = require('../../db/models');

class ProductService {
  static async getProducts() {
    return Product.findAll();
  }
}

module.exports = ProductService;
