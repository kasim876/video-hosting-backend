const jwt = require('jsonwebtoken');

const generateJwt = (id, email, username) => {
  return jwt.sign({id, email, username}, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

module.exports = generateJwt;
