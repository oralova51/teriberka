const OrderService = require("../services/order.service");

class OrderController {
  static async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.body);
      return res.status(201).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  }

  static async findOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderService.findOrder(id);
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const updatedOrder = await OrderService.updateOrderStatus(id, req.body);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
  }
}

module.exports = OrderController;
