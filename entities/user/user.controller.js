const db = require('../../db');
const bcrypt = require('bcrypt');

const generateJwt = require('../../utils/generateJwtToken');

class UserController {
  async registration(req, res) {
    const {email, password, name} = req.body;

    const candidateUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (candidateUser.rows.length) {
      return res.status(404).json('Пользователь существует');
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = await db.query(
      `INSERT INTO users (name, email, password, avatar_path) values ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashPassword, ''],
    );

    const token = generateJwt(
      newUser.rows[0].id,
      newUser.rows[0].email,
      newUser.rows[0].name,
      newUser.rows[0].avatar_path,
    );

    return res.json(token);
  }

  async login(req, res) {
    const {email, password} = req.body;

    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(404).json('Пользователь не зарегестрирован');
    }

    const comparePassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!comparePassword) {
      return res.status(404).json('Пароль неверный');
    }

    const token = generateJwt(
      user.rows[0].id,
      user.rows[0].email,
      user.rows[0].name,
      user.rows[0].avatar_path,
    );

    return res.json(token);
  }
}

module.exports = new UserController();
