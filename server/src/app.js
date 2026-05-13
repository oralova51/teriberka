const express = require('express');
require('dotenv').config();
const serverConfig = require('./configs/server.config');
const apiRouter = require('./routes/api.route');
const PaymentService = require('./services/payment.service');
const sendTelegramMessage = require("./utils/sendTelegramMessage")

const app = express();
const yookassaRawJson = express.raw({ type: 'application/json' });

const handleYookassaWebhook = async (req, res) => {
  try {
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const { event, object } = payload;

    if (!event || !object) {
      console.error('[ERROR][WEBHOOK] Invalid payload structure', {
        event,
        hasObject: Boolean(object),
      });
      return res.sendStatus(200);
    }

    if (!object?.id || typeof object.id !== 'string') {
      console.error('[ERROR][WEBHOOK] Invalid object.id', {
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200);
    }

    if (!object?.status || typeof object.status !== 'string') {
      console.error('[ERROR][WEBHOOK] Invalid object.status', {
        status: object?.status,
        payment_id: object?.id,
        event,
      });
      return res.sendStatus(200);
    }

    console.log('[WEBHOOK RECEIVED] event:', event, 'payment_id:', object.id);

    const updatedRows = await PaymentService.updateStatus(object);
    console.log('[WEBHOOK] updatedRows:', updatedRows);

    if (updatedRows === 0) {
      console.warn('[WARNING][WEBHOOK] Payment not found in DB', {
        payment_id: object.id,
        status: object.status,
        event,
      });
    }
    await sendTelegramMessage(`Поступила оплатка: ${object.id}! Это какой-то ивент: ${event}`)

    return res.sendStatus(200);
  } catch (error) {
    console.error('[FATAL ERROR][WEBHOOK]', {
      message: error?.message,
      stack: error?.stack,
    });
    const isDbConnectionRefused =
      error?.name === 'SequelizeConnectionRefusedError' ||
      error?.code === 'ECONNREFUSED' ||
      error?.original?.code === 'ECONNREFUSED';

    if (isDbConnectionRefused) {
      console.warn('[WARNING][WEBHOOK] DB connection refused. Returning 500 to trigger YooKassa retry.');
      return res.sendStatus(500);
    }

    if (error instanceof SyntaxError) {
      console.error('[ERROR][WEBHOOK] Invalid JSON body');
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  }
};

/**
 * YooKassa webhook endpoint.
 * Используем raw body только на этом маршруте, чтобы при необходимости
 * можно было валидировать подпись/сырое тело без потери данных.
 */
app.post('/api/payment/notifications', yookassaRawJson, handleYookassaWebhook);
app.post('/', yookassaRawJson, handleYookassaWebhook);

serverConfig(app);

/**
 * Render/uptime checks часто бьют в `/`, поэтому делаем явный health endpoint.
 * Это убирает шумные 404 для GET/HEAD /.
 */
app.get('/', (_req, res) => res.status(200).send('ok'));
app.head('/', (_req, res) => res.sendStatus(200));

app.use('/api', apiRouter);

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
console.log("APP.JS LOADED");
