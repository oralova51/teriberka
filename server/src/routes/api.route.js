const express = require('express');
const router = express.Router();

const orderRouter = require('./order.route');
const productRouter = require('./product.route');
const paymentRouter = require('./payment.route');
const aiRouter = require('./ai.route');
const ragRouter = require('./rag.route');



router.use('/payment', paymentRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/ai', aiRouter);
router.use('/rag', ragRouter);

module.exports = router;
