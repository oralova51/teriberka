const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    res.locals.user = user;
    
    return next();
  } catch (error) {
    console.log('Некорректный токен доступа/Invalid access token', error);
    return res.status(403).send('Запрещено/Forbidden');
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('Некорректный токен обновления/Invalid refresh token', error);
    return res
      .clearCookie('refreshToken')
      .status(401)
      .send('Не авторизован/Unauthorized');
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
