const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const AuthService = require('../services/auth.service');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');

class AuthController {
  static async signUp(req, res) {
    const { email, password, name } = req.body;
    const { isValid, err } = User.validateSignUpData({ email, password, name });

    if (!isValid) return res.status(400).send(err);
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { user, created } = await AuthService.signUp({
        name,
        email,
        password: hashedPassword,
      });

      if (!created)
        return res
          .status(400)
          .send('Такой пользователь уже существует/User already exists');
      const plainUser = user.get();

      delete plainUser.password;
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({
          message: 'Успешная регистрация/Registration successful',
          user: plainUser,
          accessToken,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const { isValid, err } = User.validateLoginData({ email, password });

    if (!isValid) return res.status(400).send(err);
    try {
      const user = await AuthService.getUserByEmail(email);

      if (!user) return res.status(400).send('Пользователь не найден/User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res
          .status(400)
          .send('Неправильный e-mail или пароль/Invalid email or password');
      const plainUser = user.get();

      delete plainUser.password;
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({
          message: 'Вход выполнен/Login successful',
          user: plainUser,
          accessToken,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async logout(req, res) {
    try {
      return res
        .clearCookie('refreshToken', cookieConfig.refresh)
        .status(200)
        .send('Выход выполнен/Logout success');
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async refreshToken(req, res) {
    try {
      const { user } = res.locals;
      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .status(200)
        .send({ message: 'Успешно/Success', user, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = AuthController;
