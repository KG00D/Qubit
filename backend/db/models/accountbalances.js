'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccountBalances extends Model {
    static associate(models) {
      AccountBalances.belongsTo(models.Account,
        { foreignKey: 'accountId' });
    }
  }
  AccountBalances.init({
    accountId: DataTypes.INTEGER,
    accountBalance: DataTypes.DECIMAL,
    balanceDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AccountBalances',
  });
  return AccountBalances;
};