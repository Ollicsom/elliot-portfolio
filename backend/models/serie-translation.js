'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class SerieTranslation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.SerieTranslation.belongsTo(models.Serie, { foreignKey: 'id' })
    }
  }
  SerieTranslation.init({
    LanguageISO: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'SerieTranslation',
    tableName: 'serie_translation'
  });
  return SerieTranslation;
};