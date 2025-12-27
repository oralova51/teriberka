const express = require('express');
const OrderController = require('../controllers/order.controller');

const router = express.Router();

router.get('/updateorder/:id', OrderController.findOrder);
router.post('/neworder', OrderController.createOrder);
router.patch('/updateorder/:id', OrderController.updateOrderStatus);

module.exports = router;