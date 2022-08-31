'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: "user",
    freezeTableName: true
  });
  return User;
};