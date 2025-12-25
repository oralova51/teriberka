const { Skelet } = require('../../db/models');

class SkeletService {
  static async getSkelets(id) {
    return Skelet.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getSkeletById(id) {
    return Skelet.findByPk(id);
  }

  static async createSkelet({ name, description, status, userId }) {
    return Skelet.create({ name, description, status, userId });
  }

  static async updateSkelet(id, { name, description, status }) {
    await Skelet.update({ name, description, status }, { where: { id } });

    return Skelet.findByPk(id);
  }

  static async deleteSkelet(id) {
    await Skelet.destroy({ where: { id } });

    return true;
  }
}

module.exports = SkeletService;
