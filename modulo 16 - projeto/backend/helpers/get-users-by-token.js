const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../constants/env');

const User  = require('../models/user');

const getUserByToken = async (token) => {
  if (!token) throw new Error('Acesso negado!')
  const decoded = jwt.verify(token, SECRET_TOKEN);
  const userId = decoded.id;
  
  const user = await User.findOne({ _id: userId });
  return user;
}

module.exports = getUserByToken;
