const jwtConfig = {
  access: { expiresIn: 60 * 1000 },
  refresh: { expiresIn: 60 * 60 * 24 * 1000 },
};

module.exports = jwtConfig;
