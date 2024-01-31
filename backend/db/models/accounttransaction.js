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
    securityName: DataTypes.STRING,
    holdingName: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    fees: DataTypes.DECIMAL,
    transactionDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.FLOAT,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accountTransaction',
  });

  return accountTransaction;
};