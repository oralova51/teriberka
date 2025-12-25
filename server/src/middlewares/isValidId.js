function isValidId(req, res, next) {
  const { id } = req.params;
  if (Number.isNaN(+id)) return res.status(400).send('Введи id числом');
  next();
}

module.exports = isValidId;
