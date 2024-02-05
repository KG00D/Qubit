'use strict';
const { Model, FLOAT, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accountHolding extends Model {
    static associate(models) {
      accountHolding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
      accountHolding.hasMany(models.accountTransaction, { 
          foreignKey: 'holdingId',
          onDelete: 'CASCADE'
      });
    }
}

accountHolding.init({
    accountId: DataTypes.INTEGER,
    securityName: DataTypes.STRING,
    holdingName: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    averagePricePaid: DataTypes.FLOAT,
    totalCost: DataTypes.FLOAT,
    positionOpenDate: DataTypes.DATE,
    currentValue: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'accountHolding',
  });
  return accountHolding;
};
