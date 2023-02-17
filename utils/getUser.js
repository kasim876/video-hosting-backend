const {UserEntity} = require('../models');

const generateJwt = require('./generateJwtToken');

const getUser = async id => {
  const user = await UserEntity.findOne({where: id});

  const token = generateJwt(user.id, user.email, user.username);

  return token;
};

module.exports = getUser;
