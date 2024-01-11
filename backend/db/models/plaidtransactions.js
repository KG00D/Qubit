'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plaidTransaction extends Model {
    static associate(models) {
      // Associations can be defined here
      plaidTransaction.belongsTo(models.Account, { foreignKey: 'accountId' });
    }
  }
  plaidTransaction.init({
    accountId: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    cancelTransactionId: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    fees: DataTypes.DECIMAL,
    investmentTransactionId: DataTypes.STRING,
    isoCurrencyCode: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.FLOAT,
    securityId: DataTypes.STRING,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING,
    unofficialCurrencyCode: DataTypes.STRING,
    manualFlag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'plaidTransaction',
  });

  return plaidTransaction;
};