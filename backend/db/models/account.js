'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {foreignKey: 'userId'});
      Account.hasMany(models.Holding, {foreignKey: 'accountId'});
    }
  }
  Account.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING,
    accountBalance: DataTypes.DECIMAL,
    currencyCode: DataTypes.STRING,
    manualFlag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};