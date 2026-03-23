const express = require('express');
const PaymentService = require('../services/payment.service');
const { YooCheckout } = require("@a2seven/yoo-checkout");
const paymentRouter = express.Router();
require("dotenv").config();

const secretKey = process.env.YOO_SECRET_KEY;
const shopId = process.env.YOO_SHOP_ID;

const YouKassa = new YooCheckout({ shopId, secretKey });
const idempotenceKey = "02347fc4-a1f0-49db-807e-f0d67c2ed5a5";

paymentRouter.post("/", async (req, res) => {
    const { value } = req.body;
    const createPayload = {
      amount: {
        value: value,
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card",
      },
      capture: true, 
      confirmation: {
        type: "redirect",
        return_url: "https://glumly-prosperous-clingfish.cloudpub.ru/",
      },
    };
  
    try {
      const payment = await YouKassa.createPayment(
        createPayload,
        Date.now().toString(),
      );
  
      console.log(payment);
  
      // Сохраняем платёж в БД
      const paymentRecord = await PaymentService.createPaymentRecord(payment);
      res.json(paymentRecord);
      // res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании платежа" });
    }
  });
  
  paymentRouter.post("/notifications", async (req, res) => {
    try {
      const { object } = req.body;
      console.log(object);
      const updatedPayment = await PaymentService.updateStatus(object);
      res.json({status: "ok"})
    } catch (error) {
      console.log('Ошибка при получении уведомления о платеже');
    }
  })


module.exports = paymentRouter;