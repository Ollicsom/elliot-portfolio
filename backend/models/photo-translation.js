'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class PhotoTranslation extends Model {
    static associate(models) {
      // define association here
    }
  }
  PhotoTranslation.init({
    languageISO: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'PhotoTranslation',
  });
  return PhotoTranslation;
};