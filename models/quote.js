'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      models.Product.hasMany(Quote, {
        foreignKey: 'ProductsId'
      });
      Quote.belongsTo(models.SellerQuote);
    }
  };
  Quote.init({
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price_u: DataTypes.DECIMAL,
    total_products: DataTypes.DECIMAL,
    summary: DataTypes.TEXT,
    total_amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    date_expiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};