const express = require('express');
const router = express.Router();

const orderRouter = require('./order.route');
const productRouter = require('./product.route');
const paymentRouter = require('./payment.route');



router.use('/payment', paymentRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;
