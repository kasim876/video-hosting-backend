const {DataTypes} = require('sequelize');

const sequelize = require('../db');

const VideoEntity = sequelize.define(
  'video',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = VideoEntity;
