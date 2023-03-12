import 'reflect-metadata';
import {DataSource} from 'typeorm';

import {CommentEntity} from './entity/comment-entity';
import {SubscriptionEntity} from './entity/subscription-entity';
import {UserEntity} from './entity/user-entity';
import {VideoEntity} from './entity/video-entity';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const port = +process.env.DB_PORT;

export const db = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  database: database,
  username: username,
  password: password,
  synchronize: true,
  entities: [CommentEntity, SubscriptionEntity, UserEntity, VideoEntity],
});

db.initialize()
  .then(() => {
    console.log('database connecting success');
  })
  .catch(error => console.log(error));
