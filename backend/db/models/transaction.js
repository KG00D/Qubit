'use strict';
const { Model, STRING } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Holding, {
          foreignKey: 'holdingId',
      });
      Transaction.belongsTo(models.Account, {
          foreignKey: 'accountId',
      });
  }
}
  Transaction.init({
    accountId: DataTypes.INTEGER,
    holdingId: DataTypes.INTEGER,
    securityName: DataTypes.STRING,
    holdingName: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATEONLY,
    fees: DataTypes.DECIMAL,
    transactionDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.FLOAT,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING,
    currencyCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};