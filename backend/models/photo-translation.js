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
    LanguageISO: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    PhotoId: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'PhotoTranslation',
    tableName: 'photo_translation'
  });
  return PhotoTranslation;
};