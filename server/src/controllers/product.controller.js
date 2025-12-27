const ProductService = require('../services/Product.service');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const Products = await ProductService.getProducts();
      return res.status(200).send(Products);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = ProductController;
