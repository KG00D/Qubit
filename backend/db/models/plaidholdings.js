'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plaidHolding extends Model {
    static associate(models) {
      plaidHolding.belongsTo(models.Account, { foreignKey: 'accountId' });
      // Holding.hasMany(models.Transactions, { foreignKey: 'investmentTransactionId'})
    }
  }
  plaidHolding.init({
    accountId: DataTypes.INTEGER,
    costBasis: DataTypes.DECIMAL,
    institutionPrice: DataTypes.DECIMAL,
    institutionPriceAsOf: DataTypes.DECIMAL,
    institutionPriceDatetime: DataTypes.STRING,
    institutionValue: DataTypes.DECIMAL,
    isoCurrencyCode: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    securityId: DataTypes.STRING,
    unofficialCurrencyCode: DataTypes.STRING,
    manualFlag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Holding',
  });
  return plaidHolding;
};
