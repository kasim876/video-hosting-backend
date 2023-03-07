import 'reflect-metadata';
import {Body, Get, JsonController, Post, Res} from 'routing-controllers';
import {Response} from 'express';

import db from '../db';

interface IRequestBody {
  from_user_id: number;
  to_user_id: number;
}

@JsonController()
export class SubscriptionsController {
  @Post('/subscription')
  async subscribe(
    @Body() requestBody: IRequestBody,
    @Res() response: Response,
  ) {
    const {from_user_id, to_user_id} = requestBody;

    const isSubscribed = await db.query(
      `SELECT * FROM subscriptions WHERE from_user_id = $1 AND to_user_id = $2`,
      [from_user_id, to_user_id],
    );

    if (!isSubscribed.rowCount) {
      const subscribe = await db.query(
        `INSERT INTO subscriptions (from_user_id, to_user_id) VALUES ($1, $2) RETURNING *`,
        [from_user_id, to_user_id],
      );

      return response.json(subscribe.rows[0]);
    }

    const subscribe = await db.query(
      `DELETE FROM subscriptions WHERE from_user_id = $1 AND to_user_id = $2 RETURNING *`,
      [from_user_id, to_user_id],
    );

    return response.json(subscribe.rows[0]);
  }

  @Get('/subscription')
  async getSubscribers(
    @Body() requestBody: IRequestBody,
    @Res() response: Response,
  ) {
    const {to_user_id} = requestBody;

    const subscribers = await db.query(
      `
        SELECT users.id, users.name, users.avatar FROM users
        FULL JOIN subscriptions ON users.id = subscriptions.from_user_id
        WHERE to_user_id = $1
      `,
      [to_user_id],
    );

    return response.json(subscribers);
  }
}
