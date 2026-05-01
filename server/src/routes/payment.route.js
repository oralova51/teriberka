const express = require('express');
const PaymentService = require('../services/payment.service');
const { YooCheckout } = require("@a2seven/yoo-checkout");
const paymentRouter = express.Router();
require("dotenv").config();

const secretKey = process.env.YOO_SECRET_KEY;
const shopId = process.env.YOO_SHOP_ID;

const YouKassa = new YooCheckout({ shopId, secretKey });

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
        return_url: "https://decidedly-restful-planthopper.cloudpub.ru/",
      },
    };
  
    try {
      const payment = await YouKassa.createPayment(
        createPayload,
        Date.now().toString(),
      );
  
      console.log(payment);
  
      // Сохраняем платёж в БД и возвращаем фронту ссылку оплаты один раз.
      await PaymentService.createPaymentRecord(payment);

      const confirmationUrl = payment?.confirmation?.confirmation_url;
      if (!confirmationUrl) {
        return res
          .status(502)
          .json({ error: "Платеж создан, но ссылка на оплату не получена" });
      }

      return res.json({
        payment_id: payment.id,
        confirmation_url: confirmationUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ошибка при создании платежа" });
    }
  });
  
paymentRouter.post("/notifications", async (req, res) => {
    try {
      console.log('HEADERS:', req.headers)
      console.log('!!!!!!!!!>>>>>>>>>>>.',req.body);
      // const updatedPayment = await PaymentService.updateStatus(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error('Ошибка при получении уведомления о платеже', error);
    }
  })




module.exports = paymentRouter;