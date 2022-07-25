'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class PhotoTranslation extends Model {
    static associate(models) {
      // define association here
      models.PhotoTranslation.belongsTo(models.Photo, { foreignKey: 'PhotoId', targetKey: 'id' })
    }
  }
  PhotoTranslation.init({
    languageISO: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'PhotoTranslation',
    tableName: 'photo_translation'
  });
  return PhotoTranslation;
};