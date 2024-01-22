'use strict';
const { Model, DECIMAL, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accountHolding extends Model {
    static associate(models) {
      accountHolding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
        accountHolding.hasMany(models.accountTransaction, { 
        foreignKey: 'holdingId'
      });
    }
}

accountHolding.init({
    accountId: DataTypes.INTEGER,
    holdingName: DataTypes.STRING,
    holdingIdentifier: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    averagePricePaid: DataTypes.DECIMAL,
    positionOpenDate: DataTypes.DATE,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accountHolding',
  });
  return accountHolding;
};
