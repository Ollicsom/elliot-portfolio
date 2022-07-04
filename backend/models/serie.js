'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Serie.hasOne(models.SerieTranslation, { foreignKey: 'SerieId' }),
      models.Serie.hasMany(models.Photo, { foreignKey: 'SerieId' })
    }
  }
  Serie.init({
    main_photo_file: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Serie',
  });
  return Serie;
};