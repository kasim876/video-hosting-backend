const sequelize = require('../../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscribers_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  avatar_path: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
