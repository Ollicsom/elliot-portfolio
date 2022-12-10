'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
    }
  }
  Language.init({
    name: DataTypes.STRING,
    LanguageISO: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Language',
    tableName: "language",
    freezeTableName: true
  });
  return Language;
};