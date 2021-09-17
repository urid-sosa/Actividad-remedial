'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellerQuote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SellerQuote.belongsTo(models.User);
      SellerQuote.hasMany(models.Quote, {
        foreignKey: 'QuotesId'
      });
    }
  };
  SellerQuote.init({
    QuotesId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SellerQuote',
  });
  return SellerQuote;
};