const sequelize = require('../../db');
const {DataTypes} = require('sequelize');

const Video = sequelize.define('video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  video_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Video;
