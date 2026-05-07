const express = require('express');
require('dotenv').config();
const serverConfig = require('./configs/server.config');
const apiRouter = require('./routes/api.route');
const PaymentService = require('./services/payment.service');

const app = express();

serverConfig(app);

/**
 * Совместимость: YooKassa иногда шлёт Payment Notification на корневой URL (`POST /`)
 * вместо `POST /api/payment/notifications`.
 * Если payload похож на notification — обновляем статус и возвращаем 200,
 * чтобы YooKassa не ретраила.
 */
app.post('/', async (req, res) => {
  try {
    const { event, object } = req.body || {};

    if (!event || !object) {
      return res.sendStatus(404);
    }

    if (!object?.id || typeof object.id !== 'string') {
      console.error('[ERROR][WEBHOOK @ /] Invalid object.id', {
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200);
    }

    if (!object?.status || typeof object.status !== 'string') {
      console.error('[ERROR][WEBHOOK @ /] Invalid object.status', {
        status: object?.status,
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200);
    }

    console.log('[WEBHOOK RECEIVED @ /] event:', event, 'payment_id:', object.id);

    const updatedRows = await PaymentService.updateStatus(object);
    console.log('[WEBHOOK @ /] updatedRows:', updatedRows);

    if (updatedRows === 0) {
      console.warn('[WARNING][WEBHOOK @ /] Payment not found in DB', {
        payment_id: object.id,
        status: object.status,
        event,
      });
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error('[FATAL ERROR][WEBHOOK @ /]', {
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
      console.warn('[WARNING][WEBHOOK @ /] DB connection refused. Returning 500 to trigger YooKassa retry.', {
        payment_id: req.body?.object?.id,
        status: req.body?.object?.status,
        event: req.body?.event,
      });
      return res.sendStatus(500);
    }

    return res.sendStatus(200);
  }
});

app.use('/api', apiRouter);

const { PORT } = process.env || 3001;

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
console.log("APP.JS LOADED");
