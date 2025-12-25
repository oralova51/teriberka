const express = require('express');
require('dotenv').config();
const serverConfig = require('./configs/server.config');
const apiRouter = require('./routes/api.route');

const app = express();

serverConfig(app);

app.use('/api', apiRouter);

const { PORT } = process.env || 3001;

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
