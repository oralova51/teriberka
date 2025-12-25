"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: "product_id" });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
