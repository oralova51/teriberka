const express = require('express');
const PaymentService = require('../services/payment.service');
const { YooCheckout } = require("@a2seven/yoo-checkout");
const sendTelegramMessage = require("../utils/sendTelegramMessage")
require("dotenv").config();

const paymentRouter = express.Router();

const secretKey = process.env.YOO_SECRET_KEY;
const shopId = process.env.YOO_SHOP_ID;

const YouKassa = new YooCheckout({ shopId, secretKey });
const YOOKASSA_REQUEST_TIMEOUT_MS = 15000;

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        const timeoutError = new Error(`YooKassa request timeout after ${timeoutMs}ms`);
        timeoutError.code = 'REQUEST_TIMEOUT';
        reject(timeoutError);
      }, timeoutMs);
    }),
  ]);

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

  const rawValue = req.body?.value;

  if (!rawValue) {
    return res.status(400).json({
      error: "Поле value обязательно",
    });
  }

  const normalizedValue = Number(rawValue);

  if (!Number.isFinite(normalizedValue) || normalizedValue <= 0) {
    return res.status(400).json({
      error: "Некорректная сумма платежа",
    });
  }

  const value = normalizedValue.toFixed(2);

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

    const payment = await withTimeout(
      YouKassa.createPayment(
        createPayload,
        Date.now().toString(),
      ),
      YOOKASSA_REQUEST_TIMEOUT_MS,
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

    const isTimeout =
      error?.code === 'REQUEST_TIMEOUT' ||
      error?.code === 'ETIMEDOUT' ||
      error?.code === 'ECONNABORTED';

    if (isTimeout) {
      return res.status(504).json({
        error: "Платежный провайдер не ответил вовремя, попробуйте снова",
      });
    }

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

    if (!object?.id || typeof object.id !== 'string') {
      console.error('[ERROR][WEBHOOK] Invalid object.id', {
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200); // чтобы YooKassa не ретраила бесконечно
    }

    if (!object?.status || typeof object.status !== 'string') {
      console.error('[ERROR][WEBHOOK] Invalid object.status', {
        status: object?.status,
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200);
    }

    /**
     * ШАГ 5: Обновляем статус
     */
    console.log('[STEP 5] Updating payment in DB...');

    const updatedRows = await PaymentService.updateStatus(object);

    console.log('[STEP 6] Payment updated. affectedRows:', updatedRows);

    if (updatedRows === 0) {
      console.warn('[WARNING][WEBHOOK] Payment not found in DB', {
        payment_id: object?.id,
        status: object?.status,
        event,
      });
    }

    /**
     * ШАГ 6: Успешный ответ
     */
    console.log('[STEP 7] Sending 200 to YooKassa');
    sendTelegramMessage(`Поступила оплатка: ${object.id}! Это какой-то ивент: ${event}`)

    return res.sendStatus(200);

  } catch (error) {
    console.error('[FATAL ERROR][WEBHOOK]', {
      message: error?.message,
      stack: error?.stack,
      event: req.body?.event,
      payment_id: req.body?.object?.id,
      status: req.body?.object?.status,
    });

    const isDbConnectionRefused =
      error?.name === 'SequelizeConnectionRefusedError' ||
      error?.code === 'ECONNREFUSED' ||
      error?.original?.code === 'ECONNREFUSED';

    if (isDbConnectionRefused) {
      console.warn('[WARNING][WEBHOOK] DB connection refused. Returning 500 to trigger YooKassa retry.', {
        payment_id: req.body?.object?.id,
        status: req.body?.object?.status,
        event: req.body?.event,
      });
      return res.sendStatus(500);
    }

    // Для остальных ошибок/валидации payload возвращаем 200,
    // чтобы YooKassa не ретраила бесконечно.
    return res.sendStatus(200);
  }
});

console.log("PAYMENT ROUTE LOADED");

module.exports = paymentRouter;