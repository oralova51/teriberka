const { Order } = require('../../db/models');

class OrderService {
  static async createOrder({ product_id, email, access_token }) {
    const order = await Order.create({
      product_id,
      email,
      access_token,
    });

    return order;
  }

  static async findOrder(id) {
    return await Order.findByPk(id);
  }

  static async updateOrderStatus(id, { status }) {
    await Order.update({ status }, { where: { id } });
    return Order.findByPk(id);
  }
}

module.exports = OrderService;
