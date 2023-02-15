const {DataTypes} = require('sequelize');

const sequelize = require('../db');

const SubscriptionEntity = sequelize.define(
  'subscription',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = SubscriptionEntity;
