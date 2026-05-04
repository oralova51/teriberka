const express = require('express');
const PaymentService = require('../services/payment.service');
const { YooCheckout } = require("@a2seven/yoo-checkout");
require("dotenv").config();

const paymentRouter = express.Router();

const secretKey = process.env.YOO_SECRET_KEY;
const shopId = process.env.YOO_SHOP_ID;

const YouKassa = new YooCheckout({ shopId, secretKey });

/**
 * ВАЖНО: логируем ВСЕ входящие запросы на этот роутер
 */
paymentRouter.use((req, res, next) => {
  console.log('\n=== [INCOMING REQUEST] ===');
  console.log('TIME:', new Date().toISOString());
  console.log('METHOD:', req.method);
  console.log('URL:', req.originalUrl);
  next();
});

/**
 * СОЗДАНИЕ ПЛАТЕЖА
 */
paymentRouter.post("/", async (req, res) => {
  console.log('\n=== [CREATE PAYMENT] ===');
  console.log('BODY:', req.body);

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
      return_url: "https://teriberka.onrender.com/",
    },
  };

  try {
    console.log('[STEP 1] Creating payment in YooKassa...');

    const payment = await YouKassa.createPayment(
      createPayload,
      Date.now().toString(),
    );

    console.log('[STEP 2] Payment created:', payment.id);

    await PaymentService.createPaymentRecord(payment);
    console.log('[STEP 3] Payment saved to DB');

    const confirmationUrl = payment?.confirmation?.confirmation_url;

    if (!confirmationUrl) {
      console.error('[ERROR] No confirmation_url');
      return res.status(502).json({
        error: "Платеж создан, но ссылка не получена",
      });
    }

    console.log('[STEP 4] Sending response to client');

    return res.json({
      payment_id: payment.id,
      confirmation_url: confirmationUrl,
    });

  } catch (error) {
    console.error('[FATAL ERROR][CREATE PAYMENT]', error);
    return res.status(500).json({
      error: "Ошибка при создании платежа",
    });
  }
});

/**
 * WEBHOOK (УВЕДОМЛЕНИЯ)
 */
paymentRouter.post("/notifications", async (req, res) => {
  console.log('\n=== [WEBHOOK RECEIVED] ===');

  try {
    /**
     * ШАГ 1: Проверяем, что вообще дошли
     */
    console.log('[STEP 1] Headers:');
    console.log(req.headers);

    /**
     * ШАГ 2: Проверяем body
     */
    console.log('[STEP 2] Raw body:');
    console.log(req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      console.warn('[WARNING] Empty body received');
    }

    /**
     * ШАГ 3: Проверка структуры webhook
     */
    const { event, object } = req.body;

    console.log('[STEP 3] Event:', event);

    if (!event || !object) {
      console.error('[ERROR] Invalid webhook structure');
      return res.sendStatus(200); // важно вернуть 200
    }

    /**
     * ШАГ 4: Логируем платеж
     */
    console.log('[STEP 4] Payment ID:', object.id);
    console.log('[STEP 4] Status:', object.status);

    /**
     * ШАГ 5: Обновляем статус
     */
    console.log('[STEP 5] Updating payment in DB...');

    const updatedPayment = await PaymentService.updateStatus(req.body);

    console.log('[STEP 6] Payment updated:', updatedPayment);

    /**
     * ШАГ 6: Успешный ответ
     */
    console.log('[STEP 7] Sending 200 to YooKassa');

    return res.sendStatus(200);

  } catch (error) {
    console.error('[FATAL ERROR][WEBHOOK]', error);

    /**
     * КРИТИЧНО: всегда возвращаем 200
     * иначе YooKassa будет ретраить
     */
    return res.sendStatus(200);
  }
});

console.log("PAYMENT ROUTE LOADED");

module.exports = paymentRouter;