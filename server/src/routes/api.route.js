const express = require('express');

const orderRouter = require('./order.route');
const productRouter = require('./product.route');

const router = express.Router();


router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;
