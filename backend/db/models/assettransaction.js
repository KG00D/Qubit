'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class assetTransaction extends Model {
    static associate(models) {
      assetTransaction.belongsTo(models.assetHolding, {
          foreignKey: 'holdingId',
      });
      assetTransaction.belongsTo(models.Account, {
          foreignKey: 'accountId',
      });
  }
}
assetTransaction.init({
    holdingId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    securityName: DataTypes.STRING,
    holdingName: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATEONLY,
    fees: DataTypes.DECIMAL,
    transactionDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.FLOAT,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'assetTransaction',
  });

  return assetTransaction;
};