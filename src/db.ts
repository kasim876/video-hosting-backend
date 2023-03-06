import {Client} from 'pg';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

const connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

const db = new Client(connectionString);

db.connect(err => {
  if (err) {
    console.error('connection to database error', err.stack);
  } else {
    console.log('connected to database success');
  }
});

export default db;
