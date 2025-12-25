const SkeletService = require('../services/skelet.service');
const { Skelet } = require('../../db/models');

class SkeletController {
  static async getAllSkelets(req, res) {
    try {
      const { user } = res.locals;
      const skelets = await SkeletService.getSkelets(user.id);

      return res.status(200).send(skelets);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getSkeletById(req, res) {
    try {
      const { id } = req.params;
      const skelet = await SkeletService.getSkeletById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');

      return res.status(200).send(skelet);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createSkelet(req, res) {
    try {
      if (!req.body) return res.status(400).send('Заполни данные');

      const { user } = res.locals;
      const { name, description, status } = req.body;
      const { isValid, err } = Skelet.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const newSkelet = await SkeletService.createSkelet({
        name,
        description,
        status,
        userId: user.id,
      });

      return res.status(201).send(newSkelet);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateSkelet(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const skelet = await SkeletService.getSkeletById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');
      if (user.id !== skelet.userId) return res.status(400).send('Это не ваш скелет');
      if (!req.body) return res.status(400).send('Заполни данные');
      const { name, description, status } = req.body;
      const { isValid, err } = Skelet.validate({ name, description, status });

      if (!isValid) return res.status(400).send(err);
      const updateSkelet = await SkeletService.updateSkelet(id, {
        name,
        description,
        status,
      });

      return res.status(200).json(updateSkelet);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async deleteSkelet(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const skelet = await SkeletService.getSkeletById(id);

      if (!skelet) return res.status(200).send('Такого скелета нет');
      if (user.id !== skelet.userId) return res.status(400).send('Это не ваш скелет');
      const deleteSkelet = await SkeletService.deleteSkelet(id);

      if (!deleteSkelet) return res.status(200).send('Скелет не удален');

      return res.status(204).send('Скелет удален');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = SkeletController;
