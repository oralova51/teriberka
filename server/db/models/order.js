"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  Order.init(
    {
      product_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      accses_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
