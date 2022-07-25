'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      // define association here
      models.Photo.belongsTo(models.Serie, { foreignKey: 'id' }),
      models.Photo.hasMany(models.PhotoTranslation, { foreignKey: 'PhotoId', sourceKey: 'id', })
    }
  }
  Photo.init({
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: "photo",
    freezeTableName: true
  });
  return Photo;
};