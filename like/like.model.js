const {DataTypes} = require('sequelize');

const sequelize = require('../db');

const LikeEntity = sequelize.define(
  'like',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    video_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
