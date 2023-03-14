const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../constants/env');

const checkToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Acesso negado!' });

  try {
    const verified = jwt.verify(token, SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'O Token é inválido!' });
  }
};

module.exports = checkToken;