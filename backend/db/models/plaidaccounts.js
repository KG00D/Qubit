'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plaidAccount extends Model {
    static associate(models) {
      plaidAccount.hasMany(models.plaidHoldings, { foreignKey: 'accountId'})
      // Account.belongsTo(models.Item, { foreignKey: 'itemId' });
      plaidAccount.belongsTo(models.User, { foreignKey: 'id' });
    }
  }
  plaidAccount.init({
    accountId: DataTypes.STRING,
    userId: DataTypes.STRING,
    mask: DataTypes.STRING,
    name: DataTypes.STRING,
    officialName: DataTypes.STRING,
    subtype: DataTypes.STRING,
    type: DataTypes.STRING,
    availableBalance: DataTypes.DECIMAL,
    currentBalance: DataTypes.DECIMAL,
    isoCurrencyCode: DataTypes.STRING,
    limit: DataTypes.DECIMAL,
    unofficialCurrencyCode: DataTypes.STRING,
    manualFlag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'plaidAccount',
  });

  return plaidAccount;
};