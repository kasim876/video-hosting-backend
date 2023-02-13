const sequelize = require('../../db');
const {DataTypes} = require('sequelize');
const User = require('../user');

const Subscriptions = sequelize.define('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  from_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Subscriptions;
