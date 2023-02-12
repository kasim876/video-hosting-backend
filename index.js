require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const port = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`server started on port: ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
