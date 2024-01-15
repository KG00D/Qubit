'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {foreignKey: 'userId'});
      Account.hasMany(models.assetHolding, {foreignKey: 'accountId'});
      Account.hasMany(models.debtHolding, {foreignKey: 'accountId'});
    }
  }
  Account.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    subType: DataTypes.STRING,
    type: DataTypes.STRING,
    accountBalance: DataTypes.DECIMAL,
    manualFlag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};