const { User } = require('../../db/models');

class UserService {
  static async updateUser(id, { name }) {
    await User.update({ name }, { where: { id } });

    return User.findByPk(id);
  }
}

module.exports = UserService;
