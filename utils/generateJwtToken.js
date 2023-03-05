const jwt = require('jsonwebtoken');

const generateJwt = (id, email, name, avatarPath) => {
  return jwt.sign({id, email, name, avatarPath}, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

module.exports = generateJwt;
