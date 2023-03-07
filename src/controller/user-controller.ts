import 'reflect-metadata';
import {Response} from 'express';
import {Body, JsonController, Post, Res} from 'routing-controllers';
import {hash, compareSync} from 'bcrypt';

import db from '../db';
import generateJwt from '../utils/generateJwt';

interface IRequestBody {
  email: string;
  password: string;
  name?: string;
}

@JsonController()
export class UserController {
  @Post('/users/registration')
  async registration(
    @Body() requestBody: IRequestBody,
    @Res() response: Response,
  ) {
    const {email, name, password} = requestBody;

    const candidateUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (candidateUser.rowCount) {
      return response
        .status(500)
        .json(`Пользователь с данным e-mail уже зарегестрирован`);
    }

    const hashPassword = await hash(password, 3);

    const user = await db.query(
      `INSERT INTO users (name, email, password, avatar) values ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashPassword, null],
    );

    const token = generateJwt(user.rows[0]);

    return response.json({token});
  }

  @Post('/users/login')
  async login(@Body() requestBody: IRequestBody, @Res() response: Response) {
    const {email, password} = requestBody;

    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (!user.rowCount) {
      return response
        .status(404)
        .json(`Пользователь с таким e-mail не зарегестрирован`);
    }

    const comparePassword = compareSync(password, user.rows[0].password);

    if (!comparePassword) {
      return response.status(404).json(`Неверный пароль`);
    }

    const subscriptions = await db.query(
      `
        SELECT users.id, users.name, users.avatar FROM users
        INNER JOIN subscriptions ON users.id = subscriptions.to_user_id
        WHERE from_user_id = $1
      `,
      [user.rows[0].id],
    );

    const token = generateJwt(user.rows[0]);

    return response.json({token: token, subscriptions: subscriptions.rows});
  }
}
