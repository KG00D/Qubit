'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accountTransaction extends Model {
    static associate(models) {
      accountTransaction.belongsTo(models.accountHolding, {
          foreignKey: 'holdingId',
      });
      accountTransaction.belongsTo(models.Account, {
          foreignKey: 'accountId',
      });
  }
}
accountTransaction.init({
    holdingId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    transactionType: DataTypes.STRING,
    securityName: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    fees: DataTypes.DECIMAL,
    transactionDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    value: DataTypes.DECIMAL,
    quantity: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'accountTransaction',
  });

  return accountTransaction;
};