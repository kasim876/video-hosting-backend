require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const sequelize = require('./db');
const models = require('./models');
const router = require('./router');

const port = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static/thumbnail')));
app.use(express.static(path.resolve(__dirname, 'static/video')));
app.use(fileUpload({}));
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    app.listen(port, () => console.log(`server started on port: ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
