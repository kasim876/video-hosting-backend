const bcrypt = require('bcrypt');

const UserEntity = require('../models/user');

const generateJwt = require('../utils/generateJwtToken');

class UserController {
  async registration(req, res) {
    const {email, password, username} = req.body;

    const candidateEmail = await UserEntity.findOne({
      where: {email},
    });

    const candidateUsername = await UserEntity.findOne({
      username: {username},
    });

    if (candidateEmail || candidateUsername) {
      return res.status(404).json({
        error: 'Такой пользователь уже зарегестрирован',
      });
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await UserEntity.create({
      email,
      username,
      password: hashPassword,
    });

    const token = generateJwt(user.id, user.email, user.username);

    return res.json({token});
  }

  async login(req, res) {
    const {email, password} = req.body;

    const user = await UserEntity.findOne({
      where: {email},
    });

    if (!user) {
      return res.status(404).json({
        error: 'Такой пользователь не зарегестрирован',
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(404).json({
        error: 'Неверный пароль',
      });
    }

    const token = generateJwt(user.id, user.email, user.username);

    return res.json({token});
  }
}

module.exports = new UserController();
