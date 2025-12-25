const cookieConfig = require('../configs/cookie.config');
const UserService = require('../services/user.service');
const generateTokens = require('../utils/generateTokens');

class UserController {
  static async updateUserInfo(req, res) {
    try {
      const { user } = res.locals;
      const { name } = req.body;

      if (!req.body) return res.status(400).send('Заполни данные');
      const updateUser = await UserService.updateUser(user.id, { name });
      const { accessToken, refreshToken } = generateTokens({ user: updateUser });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .status(200)
        .json({
          message: 'Успешнo/Success',
          user: updateUser,
          accessToken,
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = UserController;
